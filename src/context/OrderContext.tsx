import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { orderService, FirebaseOrder } from '@/services/orderService';
import { toast } from '@/hooks/use-toast';
import { useAuth } from './AuthContext';
import { awardOrderPoints } from '@/utils/loyaltyUtils';

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
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  // Load orders from localStorage initially (USER-SPECIFIC)
  useEffect(() => {
    if (!user?.phone) {
      setOrders([]);
      return;
    }

    const loadInitialOrders = () => {
      const userSpecificKey = `prayan-orders-${user.phone}`;
      const saved = localStorage.getItem(userSpecificKey);
      if (saved) {
        try {
          const localOrders = JSON.parse(saved);
          setOrders(localOrders);
          console.log(`📱 Loaded ${localOrders.length} orders for user:`, user.phone);
        } catch (error) {
          console.error('Error loading user orders:', error);
        }
      }
    };

    loadInitialOrders();
  }, [user?.phone]);

  // Real-time order status listener - USER-SPECIFIC ORDERS ONLY! - HARDCORE FIX
  useEffect(() => {
    if (!user?.phone) {
      console.log('🔒 No user phone - clearing orders for security');
      setOrders([]);
      return;
    }

    console.log('🔄 HARDCORE FIX: Setting up user-specific orders for:', user.phone);
    
    // IMMEDIATE FIX: Filter orders by current user's phone
    const filterUserOrders = (allOrders: any[]) => {
      const userSpecificOrders = allOrders.filter(order => {
        const orderPhone = order.customerDetails?.phone;
        const currentUserPhone = user.phone;
        
        console.log('🔍 Filtering order:', order.id, 'Order phone:', orderPhone, 'User phone:', currentUserPhone);
        
        // Strict phone number matching
        return orderPhone === currentUserPhone;
      });
      
      console.log(`🔒 SECURITY: Filtered ${allOrders.length} orders to ${userSpecificOrders.length} for user ${user.phone}`);
      return userSpecificOrders;
    };

    // Set up real-time listener for USER'S ORDERS ONLY
    const unsubscribe = orderService.subscribeToUserOrders(user.phone, (updatedOrders) => {
      console.log('📱 User-specific real-time orders update received:', updatedOrders.length);
      
      const convertedOrders = updatedOrders.map(convertFirebaseOrder);
      
      // DOUBLE SECURITY CHECK: Filter again to be 100% sure
      const secureOrders = filterUserOrders(convertedOrders);
      
      // Check for status changes and notify
      const currentOrders = orders;
      secureOrders.forEach(newOrder => {
        const existingOrder = currentOrders.find(o => o.id === newOrder.id);
        if (existingOrder && existingOrder.status !== newOrder.status) {
          toast({
            title: "Order Status Updated! 📦",
            description: `Order ${newOrder.id} is now ${newOrder.status.replace('_', ' ')}`,
          });
        }
      });
      
      setOrders(secureOrders);
      
      // Update localStorage with user-specific key
      localStorage.setItem(`prayan-orders-${user.phone}`, JSON.stringify(secureOrders));
      
      console.log('✅ SECURE: User-specific orders synced in real-time!');
    });

    // Cleanup listener on unmount
    return () => {
      console.log('🧹 Cleaning up user-specific real-time listener...');
      unsubscribe();
    };
  }, [user?.phone]); // Depend on user phone

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
        
        // Also save to localStorage as backup with user-specific key
        const userSpecificKey = user?.phone ? `prayan-orders-${user.phone}` : 'prayan-orders-guest';
        const updatedOrders = [enhancedOrder, ...orders];
        localStorage.setItem(userSpecificKey, JSON.stringify(updatedOrders));
        
        // Send welcome notification
        await sendNotification(enhancedOrder.id, 'whatsapp', `Your order has been placed successfully! Estimated delivery: ${new Date(estimatedDelivery).toLocaleDateString('en-IN')}`);
        
        // Award loyalty points for the order
        if (user?.id) {
          console.log('💎 Awarding loyalty points for order:', enhancedOrder.id);
          const pointsEarned = awardOrderPoints(user.id, enhancedOrder.id, enhancedOrder.totalPrice);
          
          if (pointsEarned > 0) {
            toast({
              title: `Earned ${pointsEarned} loyalty points! 💎`,
              description: `You earned ${pointsEarned} points from this order. Keep shopping to unlock more rewards!`,
            });
          }
        }
        
        toast({
          title: "Order placed successfully! 🎉",
          description: "Your order has been saved and you'll receive updates via WhatsApp.",
        });
        
        return true;
      } else {
        console.error('Firebase save failed:', result.error);
        
        // If Firebase fails, still save locally as fallback with user-specific key
        setOrders(prev => [enhancedOrder, ...prev]);
        const userSpecificKey = user?.phone ? `prayan-orders-${user.phone}` : 'prayan-orders-guest';
        localStorage.setItem(userSpecificKey, JSON.stringify([enhancedOrder, ...orders]));
        
        // Award loyalty points even for offline orders
        if (user?.id) {
          console.log('💎 Awarding loyalty points for offline order:', enhancedOrder.id);
          const pointsEarned = awardOrderPoints(user.id, enhancedOrder.id, enhancedOrder.totalPrice);
          
          if (pointsEarned > 0) {
            toast({
              title: `Earned ${pointsEarned} loyalty points! 💎`,
              description: `You earned ${pointsEarned} points from this order.`,
            });
          }
        }
        
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
      const userSpecificKey = user?.phone ? `prayan-orders-${user.phone}` : 'prayan-orders-guest';
      localStorage.setItem(userSpecificKey, JSON.stringify([enhancedOrder, ...orders]));
      
      // Award loyalty points for fallback orders too
      if (user?.id) {
        console.log('💎 Awarding loyalty points for fallback order:', enhancedOrder.id);
        const pointsEarned = awardOrderPoints(user.id, enhancedOrder.id, enhancedOrder.totalPrice);
        
        if (pointsEarned > 0) {
          toast({
            title: `Earned ${pointsEarned} loyalty points! 💎`,
            description: `You earned ${pointsEarned} points from this order.`,
          });
        }
      }
      
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

  // Refresh orders from Firebase - USER-SPECIFIC - HARDCORE SECURITY
  const refreshOrders = async () => {
    if (!user?.phone) {
      console.log('🔒 SECURITY: No user phone - cannot refresh orders');
      setOrders([]);
      return;
    }

    setLoading(true);
    try {
      console.log('🔄 HARDCORE REFRESH: Getting orders for user:', user.phone);
      
      const result = await orderService.getOrdersByPhone(user.phone);
      
      if (result.success) {
        const convertedOrders = result.orders.map(convertFirebaseOrder);
        
        // TRIPLE SECURITY CHECK: Ensure only user's orders
        const secureOrders = convertedOrders.filter(order => {
          const orderPhone = order.customerDetails?.phone;
          const match = orderPhone === user.phone;
          
          if (!match) {
            console.warn('🚨 SECURITY ALERT: Blocked order from different user:', order.id, orderPhone);
          }
          
          return match;
        });
        
        console.log(`🔒 SECURITY REFRESH: ${convertedOrders.length} total → ${secureOrders.length} secure orders for ${user.phone}`);
        
        // Check for status changes and notify
        const currentOrders = orders;
        secureOrders.forEach(newOrder => {
          const existingOrder = currentOrders.find(o => o.id === newOrder.id);
          if (existingOrder && existingOrder.status !== newOrder.status) {
            toast({
              title: "Order Status Updated! 📦",
              description: `Order ${newOrder.id} is now ${newOrder.status.replace('_', ' ')}`,
            });
          }
        });
        
        setOrders(secureOrders);
        
        // Update localStorage with user-specific key
        const userSpecificKey = `prayan-orders-${user.phone}`;
        localStorage.setItem(userSpecificKey, JSON.stringify(secureOrders));
        
        console.log(`✅ SECURE REFRESH: ${secureOrders.length} orders loaded for user:`, user.phone);
      }
    } catch (error) {
      console.error('Error refreshing user orders:', error);
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