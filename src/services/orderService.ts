import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  query, 
  orderBy, 
  where,
  getDoc,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/config/firebase';

export interface FirebaseOrder {
  id?: string;
  orderId: string;
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
  deliveryCharge: number;
  timestamp: Timestamp;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'completed' | 'failed';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

class OrderService {
  private ordersCollection = collection(db, 'orders');

  // Create new order with better error handling
  async createOrder(orderData: Omit<FirebaseOrder, 'id' | 'createdAt' | 'updatedAt' | 'timestamp'> & { timestamp: string }) {
    try {
      console.log('Creating order in Firebase:', orderData);
      
      const now = Timestamp.now();
      const order: Omit<FirebaseOrder, 'id'> = {
        ...orderData,
        timestamp: Timestamp.fromDate(new Date(orderData.timestamp)),
        createdAt: now,
        updatedAt: now
      };

      console.log('Processed order data:', order);
      
      const docRef = await addDoc(this.ordersCollection, order);
      console.log('Order created with ID:', docRef.id);
      
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error creating order:', error);
      console.error('Error details:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Get all orders with detailed error logging
  async getAllOrders() {
    try {
      console.log('🔍 Fetching orders from Firebase...');
      console.log('📍 Collection path: orders');
      
      const q = query(this.ordersCollection, orderBy('createdAt', 'desc'));
      console.log('📋 Query created successfully');
      
      const querySnapshot = await getDocs(q);
      console.log('📊 Query executed, processing results...');
      
      const orders: FirebaseOrder[] = [];
      querySnapshot.forEach((doc) => {
        console.log('📄 Processing document:', doc.id);
        orders.push({ id: doc.id, ...doc.data() } as FirebaseOrder);
      });
      
      console.log(`✅ Successfully fetched ${orders.length} orders`);
      return { success: true, orders };
    } catch (error) {
      console.error('❌ Error fetching orders:', error);
      console.error('❌ Error code:', error.code);
      console.error('❌ Error message:', error.message);
      return { success: false, error: error.message, orders: [] };
    }
  }

  // Get orders by phone number (for customer tracking)
  async getOrdersByPhone(phone: string) {
    try {
      const q = query(
        this.ordersCollection, 
        where('customerDetails.phone', '==', phone),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      const orders: FirebaseOrder[] = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() } as FirebaseOrder);
      });
      
      return { success: true, orders };
    } catch (error) {
      console.error('Error fetching orders by phone:', error);
      return { success: false, error: error.message, orders: [] };
    }
  }

  // Get single order by order ID
  async getOrderByOrderId(orderId: string) {
    try {
      const q = query(this.ordersCollection, where('orderId', '==', orderId));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return { success: false, error: 'Order not found' };
      }

      const doc = querySnapshot.docs[0];
      const order = { id: doc.id, ...doc.data() } as FirebaseOrder;
      
      return { success: true, order };
    } catch (error) {
      console.error('Error fetching order:', error);
      return { success: false, error: error.message };
    }
  }

  // Update order status
  async updateOrderStatus(orderId: string, status: FirebaseOrder['status']) {
    try {
      const q = query(this.ordersCollection, where('orderId', '==', orderId));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return { success: false, error: 'Order not found' };
      }

      const docRef = doc(db, 'orders', querySnapshot.docs[0].id);
      await updateDoc(docRef, {
        status,
        updatedAt: Timestamp.now()
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error updating order status:', error);
      return { success: false, error: error.message };
    }
  }

  // Update payment status
  async updatePaymentStatus(orderId: string, paymentStatus: FirebaseOrder['paymentStatus']) {
    try {
      const q = query(this.ordersCollection, where('orderId', '==', orderId));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return { success: false, error: 'Order not found' };
      }

      const docRef = doc(db, 'orders', querySnapshot.docs[0].id);
      await updateDoc(docRef, {
        paymentStatus,
        updatedAt: Timestamp.now()
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error updating payment status:', error);
      return { success: false, error: error.message };
    }
  }
}

export const orderService = new OrderService();