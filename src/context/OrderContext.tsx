import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { orderService, FirebaseOrder } from '@/services/orderService';
import { toast } from '@/hooks/use-toast';

export interface TrackingInfo {
  courierPartner: string;
  trackingNumber: string;
  currentLocation: string;
  estimatedDelivery: string;
  trackingUrl: string;
  lastUpdated: string;
}

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
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled';
  paymentStatus?: 'pending' | 'completed' | 'failed';
  trackingInfo?: TrackingInfo;
  statusHistory: Array<{
    status: string;
    timestamp: string;
    message: string;
    location?: string;
  }>;
  estimatedDeliveryDate?: string;
  actualDeliveryDate?: string;
  notifications: {
    sms: boolean;
    email: boolean;
    whatsapp: boolean;
  };
}

interface OrderContextType {
  orders: Order[];
  loading: boolean;
  addOrder: (order: Order) => Promise<boolean>;
  getOrder: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: Order['status'], message?: string, location?: string) => Promise<boolean>;
  updateTrackingInfo: (id: string, trackingInfo: TrackingInfo) => Promise<boolean>;
  refreshOrders: () => Promise<void>;
  sendNotification: (orderId: string, type: 'sms' | 'email' | 'whatsapp', message: string) => Promise<boolean>;
  getEstimatedDeliveryDate: (pincode: string) => string;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Delivery time estimation based on pincode
const getDeliveryEstimate = (pincode: string): number => {
  const pin = parseInt(pincode);
  
  // Metro cities (1-2 days)
  const metroCities = [110000, 400000, 700000, 600000, 500000, 560000, 411000, 380000];
  if (metroCities.some(metro => Math.abs(pin - metro) < 100)) {
    return 2;
  }
  
  // Tier 1 cities (2-3 days)
  if (pin >= 100000 && pin <= 999999) {
    return 3;
  }
  
  // Remote areas (4-5 days)
  return 5;
};

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

  // Real-time order status listener - THIS FIXES THE SYNC ISSUE!
  useEffect(() => {
    console.log('🔄 Setting up real-time order sync for customers...');
    
    // Set up real-time listener for order updates
    const unsubscribe = orderService.subscribeToOrders((updatedOrders) => {
      console.log('📱 Customer real-time orders update received:', updatedOrders.length);
      
      const convertedOrders = updatedOrders.map(convertFirebaseOrder);
      
      // Check for status changes and notify
      const currentOrders = orders;
      convertedOrders.forEach(newOrder => {
        const existingOrder = currentOrders.find(o => o.id === newOrder.id);
        if (existingOrder && existingOrder.status !== newOrder.status) {
          toast({
            title: "Order Status Updated! 📦",
            description: `Order ${newOrder.id} is now ${newOrder.status.replace('_', ' ')}`,
          });
        }
      });
      
      setOrders(convertedOrders);
      
      // Update localStorage
      localStorage.setItem('prayan-orders', JSON.stringify(convertedOrders));
      
      console.log('✅ Customer orders synced in real-time!');
    });

    // Cleanup listener on unmount
    return () => {
      console.log('🧹 Cleaning up customer real-time listener...');
      unsubscribe();
    };
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
    paymentStatus: fbOrder.paymentStatus,
    trackingInfo: fbOrder.trackingInfo,
    statusHistory: fbOrder.statusHistory || [{
      status: fbOrder.status,
      timestamp: fbOrder.timestamp.toDate().toISOString(),
      message: 'Order placed successfully'
    }],
    estimatedDeliveryDate: fbOrder.estimatedDeliveryDate,
    actualDeliveryDate: fbOrder.actualDeliveryDate,
    notifications: fbOrder.notifications || { sms: true, email: true, whatsapp: true }
  });

  // Get estimated delivery date
  const getEstimatedDeliveryDate = (pincode: string): string => {
    const days = getDeliveryEstimate(pincode);
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + days);
    return deliveryDate.toISOString().split('T')[0];
  };

  // Send notification
  const sendNotification = async (orderId: string, type: 'sms' | 'email' | 'whatsapp', message: string): Promise<boolean> => {
    try {
      const order = orders.find(o => o.id === orderId);
      if (!order) return false;

      // Simulate notification sending (in real app, integrate with SMS/Email services)
      console.log(`Sending ${type} notification for order ${orderId}:`, message);
      
      if (type === 'whatsapp') {
        const whatsappMessage = `🌶️ *PRAYAN MASALE - Order Update*

Order ID: ${orderId}
${message}

Track your order: ${window.location.origin}/my-orders

Thank you for choosing Prayan Masale! 🙏`;
        
        const whatsappUrl = `https://wa.me/${order.customerDetails.phone.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;
        // In real app, use WhatsApp Business API
        console.log('WhatsApp URL:', whatsappUrl);
      }

      toast({
        title: `${type.toUpperCase()} notification sent!`,
        description: `Customer notified about order ${orderId}`,
      });

      return true;
    } catch (error) {
      console.error('Error sending notification:', error);
      return false;
    }
  };

  // Add order to Firebase with enhanced tracking
  const addOrder = async (order: Order): Promise<boolean> => {
    setLoading(true);
    try {
      console.log('Adding order to Firebase:', order);
      
      // Add estimated delivery date
      const estimatedDelivery = getEstimatedDeliveryDate(order.customerDetails.pincode);
      
      const enhancedOrder = {
        ...order,
        estimatedDeliveryDate: estimatedDelivery,
        statusHistory: [{
          status: 'pending',
          timestamp: new Date().toISOString(),
          message: 'Order placed successfully',
          location: 'Online'
        }],
        notifications: { sms: true, email: true, whatsapp: true }
      };
      
      // Add to Firebase FIRST (this is the main database)
      const result = await orderService.createOrder({
        orderId: enhancedOrder.id,
        items: enhancedOrder.items,
        customerDetails: enhancedOrder.customerDetails,
        totalPrice: enhancedOrder.totalPrice,
        deliveryCharge: enhancedOrder.deliveryCharge || 0,
        timestamp: enhancedOrder.timestamp,
        status: enhancedOrder.status,
        paymentStatus: enhancedOrder.paymentStatus || 'pending',
        estimatedDeliveryDate: estimatedDelivery,
        statusHistory: enhancedOrder.statusHistory,
        notifications: enhancedOrder.notifications
      });

      if (result.success) {
        console.log('Order saved to Firebase successfully');
        
        // Add to local state for immediate UI update
        setOrders(prev => [enhancedOrder, ...prev]);
        
        // Also save to localStorage as backup only
        const updatedOrders = [enhancedOrder, ...orders];
        localStorage.setItem('prayan-orders', JSON.stringify(updatedOrders));
        
        // Send welcome notification
        await sendNotification(enhancedOrder.id, 'whatsapp', `Your order has been placed successfully! Estimated delivery: ${new Date(estimatedDelivery).toLocaleDateString('en-IN')}`);
        
        toast({
          title: "Order placed successfully! 🎉",
          description: "Your order has been saved and you'll receive updates via WhatsApp.",
        });
        
        return true;
      } else {
        console.error('Firebase save failed:', result.error);
        
        // If Firebase fails, still save locally as fallback
        setOrders(prev => [enhancedOrder, ...prev]);
        localStorage.setItem('prayan-orders', JSON.stringify([enhancedOrder, ...orders]));
        
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
      const enhancedOrder = {
        ...order,
        estimatedDeliveryDate: getEstimatedDeliveryDate(order.customerDetails.pincode),
        statusHistory: [{
          status: 'pending',
          timestamp: new Date().toISOString(),
          message: 'Order placed successfully',
          location: 'Online'
        }],
        notifications: { sms: true, email: true, whatsapp: true }
      };
      
      setOrders(prev => [enhancedOrder, ...prev]);
      localStorage.setItem('prayan-orders', JSON.stringify([enhancedOrder, ...orders]));
      
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

  // Update order status with enhanced tracking
  const updateOrderStatus = async (id: string, status: Order['status'], message?: string, location?: string): Promise<boolean> => {
    setLoading(true);
    try {
      const order = orders.find(o => o.id === id);
      if (!order) return false;

      const statusUpdate = {
        status,
        timestamp: new Date().toISOString(),
        message: message || `Order ${status.replace('_', ' ')}`,
        location: location || 'Processing Center'
      };

      const result = await orderService.updateOrderStatus(id, status);
      
      if (result.success) {
        setOrders(prev =>
          prev.map(order =>
            order.id === id ? { 
              ...order, 
              status,
              statusHistory: [...(order.statusHistory || []), statusUpdate],
              actualDeliveryDate: status === 'delivered' ? new Date().toISOString().split('T')[0] : order.actualDeliveryDate
            } : order
          )
        );

        // Send notification for status update
        const notificationMessage = `Your order status has been updated to: ${status.replace('_', ' ').toUpperCase()}. ${message || ''}`;
        await sendNotification(id, 'whatsapp', notificationMessage);

        toast({
          title: "Order status updated!",
          description: `Order ${id} is now ${status.replace('_', ' ')}`,
        });

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

  // Update tracking information
  const updateTrackingInfo = async (id: string, trackingInfo: TrackingInfo): Promise<boolean> => {
    setLoading(true);
    try {
      setOrders(prev =>
        prev.map(order =>
          order.id === id ? { ...order, trackingInfo } : order
        )
      );

      // Send tracking notification
      const message = `Your order is now with ${trackingInfo.courierPartner}. Tracking number: ${trackingInfo.trackingNumber}. Current location: ${trackingInfo.currentLocation}`;
      await sendNotification(id, 'whatsapp', message);

      return true;
    } catch (error) {
      console.error('Error updating tracking info:', error);
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
        
        // Check for status changes and notify
        const currentOrders = orders;
        convertedOrders.forEach(newOrder => {
          const existingOrder = currentOrders.find(o => o.id === newOrder.id);
          if (existingOrder && existingOrder.status !== newOrder.status) {
            toast({
              title: "Order Status Updated! 📦",
              description: `Order ${newOrder.id} is now ${newOrder.status.replace('_', ' ')}`,
            });
          }
        });
        
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
        updateTrackingInfo,
        refreshOrders,
        sendNotification,
        getEstimatedDeliveryDate,
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