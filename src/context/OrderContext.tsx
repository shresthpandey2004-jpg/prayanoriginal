import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  addOrder: (order: Order) => void;
  getOrder: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: Order['status']) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('prayan-orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('prayan-orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  const getOrder = (id: string) => {
    return orders.find(order => order.id === id);
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === id ? { ...order, status } : order
      )
    );
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        getOrder,
        updateOrderStatus,
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