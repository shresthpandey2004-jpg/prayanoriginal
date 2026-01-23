import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { orderService, FirebaseOrder } from '@/services/orderService';
import { toast } from '@/hooks/use-toast';

export interface Order {
  id: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    weight: string;
    image: string;
  }>;
  customerDetails: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    pincode: string;
    paymentMethod: 'cod' | 'online';
    notes: string;
  };
  totalPrice: number;
  deliveryCharge?: number;
  timestamp: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus?: 'pending' | 'completed' | 'failed';
}

interface OrderContextType {
  orders: Order[];
  loading: boolean;
  addOrder: (order: Order) => Promise<boolean>;
  getOrder: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: Order['status']) => Promise<boolean>;
  refreshOrders: () => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  // Load orders from localStorage initially (for backward compatibility)
  useEffect(() => {
    const loadInitialOrders = () => {
      const saved = localStorage.getItem('prayan-orders');
      if (saved) {
        try {
          const localOrders = JSON.parse(saved);
          setOrders(localOrders);
        } catch (error) {
          console.error('Error loading local orders:', error);
        }
      }
    };

    loadInitialOrders();
  }, []);

  // Convert Firebase order to local order format
  const convertFirebaseOrder = (fbOrder: FirebaseOrder): Order => ({
    id: fbOrder.orderId,
    items: fbOrder.items,
    customerDetails: fbOrder.customerDetails,
    totalPrice: fbOrder.totalPrice,
    deliveryCharge: fbOrder.deliveryCharge,
    timestamp: fbOrder.timestamp.toDate().toISOString(),
    status: fbOrder.status,
    paymentStatus: fbOrder.paymentStatus
  });

  // Add order to Firebase
  const addOrder = async (order: Order): Promise<boolean> => {
    setLoading(true);
    try {
      console.log('Adding order to Firebase:', order);
      
      // Add to Firebase FIRST (this is the main database)
      const result = await orderService.createOrder({
        orderId: order.id,
        items: order.items,
        customerDetails: order.customerDetails,
        totalPrice: order.totalPrice,
        deliveryCharge: order.deliveryCharge || 0,
        timestamp: order.timestamp,
        status: order.status,
        paymentStatus: order.paymentStatus || 'pending'
      });

      if (result.success) {
        console.log('Order saved to Firebase successfully');
        
        // Add to local state for immediate UI update
        setOrders(prev => [order, ...prev]);
        
        // Also save to localStorage as backup only
        const updatedOrders = [order, ...orders];
        localStorage.setItem('prayan-orders', JSON.stringify(updatedOrders));
        
        toast({
          title: "Order placed successfully! 🎉",
          description: "Your order has been saved to our database.",
        });
        
        return true;
      } else {
        console.error('Firebase save failed:', result.error);
        
        // If Firebase fails, still save locally as fallback
        setOrders(prev => [order, ...prev]);
        localStorage.setItem('prayan-orders', JSON.stringify([order, ...orders]));
        
        toast({
          title: "Order saved locally",
          description: "Order saved on your device. We'll sync it when connection is restored.",
          variant: "destructive"
        });
        
        return false;
      }
    } catch (error) {
      console.error('Error adding order:', error);
      
      // Fallback to localStorage
      setOrders(prev => [order, ...prev]);
      localStorage.setItem('prayan-orders', JSON.stringify([order, ...orders]));
      
      toast({
        title: "Order saved locally",
        description: "Order saved on your device. We'll sync it when connection is restored.",
        variant: "destructive"
      });
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Get order by ID
  const getOrder = (id: string): Order | undefined => {
    return orders.find(order => order.id === id);
  };

  // Update order status
  const updateOrderStatus = async (id: string, status: Order['status']): Promise<boolean> => {
    setLoading(true);
    try {
      const result = await orderService.updateOrderStatus(id, status);
      
      if (result.success) {
        setOrders(prev =>
          prev.map(order =>
            order.id === id ? { ...order, status } : order
          )
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating order status:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Refresh orders from Firebase
  const refreshOrders = async () => {
    setLoading(true);
    try {
      const result = await orderService.getAllOrders();
      
      if (result.success) {
        const convertedOrders = result.orders.map(convertFirebaseOrder);
        setOrders(convertedOrders);
        
        // Update localStorage
        localStorage.setItem('prayan-orders', JSON.stringify(convertedOrders));
      }
    } catch (error) {
      console.error('Error refreshing orders:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        addOrder,
        getOrder,
        updateOrderStatus,
        refreshOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};