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
  Timestamp,
  connectFirestoreEmulator,
  enableNetwork,
  disableNetwork,
  onSnapshot,
  QuerySnapshot,
  DocumentData
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
  private retryCount = 3;
  private retryDelay = 1000;
  private listeners: Array<() => void> = [];

  // Real-time listener for orders - THIS FIXES THE SYNC ISSUE!
  subscribeToOrders(callback: (orders: FirebaseOrder[]) => void): () => void {
    console.log('🔄 Setting up real-time Firebase listener...');
    
    try {
      // Try with orderBy first
      const q = query(this.ordersCollection, orderBy('createdAt', 'desc'));
      
      const unsubscribe = onSnapshot(q, 
        (snapshot: QuerySnapshot<DocumentData>) => {
          console.log('🔥 Real-time update received from Firebase!');
          const orders: FirebaseOrder[] = [];
          
          snapshot.forEach((doc) => {
            orders.push({ id: doc.id, ...doc.data() } as FirebaseOrder);
          });
          
          console.log(`📊 Real-time sync: ${orders.length} orders loaded`);
          callback(orders);
        },
        (error) => {
          console.error('❌ Real-time listener error:', error);
          
          // Fallback to simple query without orderBy
          console.log('🔄 Trying fallback real-time listener...');
          const fallbackQuery = query(this.ordersCollection);
          
          const fallbackUnsubscribe = onSnapshot(fallbackQuery,
            (snapshot: QuerySnapshot<DocumentData>) => {
              console.log('🔥 Fallback real-time update received!');
              const orders: FirebaseOrder[] = [];
              
              snapshot.forEach((doc) => {
                orders.push({ id: doc.id, ...doc.data() } as FirebaseOrder);
              });
              
              // Sort manually
              orders.sort((a, b) => {
                const aTime = a.createdAt?.toMillis() || 0;
                const bTime = b.createdAt?.toMillis() || 0;
                return bTime - aTime;
              });
              
              console.log(`📊 Fallback real-time sync: ${orders.length} orders loaded`);
              callback(orders);
            },
            (fallbackError) => {
              console.error('❌ Fallback listener also failed:', fallbackError);
              // Use manual refresh as last resort
              this.getAllOrders().then(result => {
                if (result.success) {
                  callback(result.orders);
                }
              });
            }
          );
          
          return fallbackUnsubscribe;
        }
      );
      
      this.listeners.push(unsubscribe);
      return unsubscribe;
      
    } catch (error) {
      console.error('❌ Failed to set up real-time listener:', error);
      
      // Fallback to polling every 5 seconds
      console.log('🔄 Setting up polling fallback...');
      const interval = setInterval(async () => {
        const result = await this.getAllOrders();
        if (result.success) {
          callback(result.orders);
        }
      }, 5000);
      
      const cleanup = () => {
        clearInterval(interval);
      };
      
      this.listeners.push(cleanup);
      return cleanup;
    }
  }

  // Clean up all listeners
  unsubscribeAll() {
    console.log('🧹 Cleaning up Firebase listeners...');
    this.listeners.forEach(unsubscribe => unsubscribe());
    this.listeners = [];
  }

  // Retry mechanism for network issues
  private async retryOperation<T>(operation: () => Promise<T>, retries = this.retryCount): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      if (retries > 0 && (error.code === 'unavailable' || error.code === 'deadline-exceeded')) {
        console.log(`Retrying operation... ${retries} attempts left`);
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
        return this.retryOperation(operation, retries - 1);
      }
      throw error;
    }
  }

  // Create new order with comprehensive error handling
  async createOrder(orderData: Omit<FirebaseOrder, 'id' | 'createdAt' | 'updatedAt' | 'timestamp'> & { timestamp: string }) {
    return this.retryOperation(async () => {
      try {
        console.log('Creating order in Firebase:', orderData);
        
        // Validate required fields
        if (!orderData.orderId || !orderData.customerDetails.name || !orderData.customerDetails.phone) {
          throw new Error('Missing required order fields');
        }
        
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
        console.error('Error code:', error.code);
        
        // Handle specific Firebase errors
        let errorMessage = error.message;
        switch (error.code) {
          case 'permission-denied':
            errorMessage = 'Database access denied. Please check Firestore rules.';
            break;
          case 'not-found':
            errorMessage = 'Database not found. Please check Firebase configuration.';
            break;
          case 'unavailable':
            errorMessage = 'Database temporarily unavailable. Please try again.';
            break;
          case 'deadline-exceeded':
            errorMessage = 'Request timeout. Please check your internet connection.';
            break;
          default:
            errorMessage = `Database error: ${error.message}`;
        }
        
        return { success: false, error: errorMessage };
      }
    });
  }

  // Get all orders with comprehensive error handling and fallbacks
  async getAllOrders() {
    return this.retryOperation(async () => {
      try {
        console.log('🔍 Fetching orders from Firebase...');
        console.log('📍 Collection path: orders');
        console.log('🔧 Database instance:', db.app.name);
        
        // Try multiple query strategies
        let orders: FirebaseOrder[] = [];
        
        try {
          // Strategy 1: Query with orderBy
          console.log('📋 Trying query with orderBy...');
          const q = query(this.ordersCollection, orderBy('createdAt', 'desc'));
          const querySnapshot = await getDocs(q);
          
          querySnapshot.forEach((doc) => {
            console.log('📄 Processing document:', doc.id);
            orders.push({ id: doc.id, ...doc.data() } as FirebaseOrder);
          });
          
        } catch (orderByError) {
          console.warn('OrderBy query failed, trying simple query:', orderByError);
          
          // Strategy 2: Simple query without orderBy
          console.log('📋 Trying simple query...');
          const querySnapshot = await getDocs(this.ordersCollection);
          
          querySnapshot.forEach((doc) => {
            console.log('📄 Processing document:', doc.id);
            orders.push({ id: doc.id, ...doc.data() } as FirebaseOrder);
          });
          
          // Sort manually
          orders.sort((a, b) => {
            const aTime = a.createdAt?.toMillis() || 0;
            const bTime = b.createdAt?.toMillis() || 0;
            return bTime - aTime;
          });
        }
        
        console.log(`✅ Successfully fetched ${orders.length} orders`);
        return { success: true, orders };
        
      } catch (error) {
        console.error('❌ Error fetching orders:', error);
        console.error('❌ Error code:', error.code);
        console.error('❌ Error message:', error.message);
        
        // Handle specific Firebase errors
        let errorMessage = error.message;
        switch (error.code) {
          case 'permission-denied':
            errorMessage = 'Access denied. Please check Firestore security rules.';
            break;
          case 'not-found':
            errorMessage = 'Orders collection not found.';
            break;
          case 'unavailable':
            errorMessage = 'Firebase service unavailable. Please try again later.';
            break;
          case 'deadline-exceeded':
            errorMessage = 'Request timeout. Please check your internet connection.';
            break;
          case 'failed-precondition':
            errorMessage = 'Database index missing. Please create required indexes.';
            break;
          default:
            errorMessage = `Database error: ${error.message}`;
        }
        
        return { success: false, error: errorMessage, orders: [] };
      }
    });
  }

  // Get orders by phone number with error handling
  async getOrdersByPhone(phone: string) {
    return this.retryOperation(async () => {
      try {
        const q = query(
          this.ordersCollection, 
          where('customerDetails.phone', '==', phone)
        );
        const querySnapshot = await getDocs(q);
        
        const orders: FirebaseOrder[] = [];
        querySnapshot.forEach((doc) => {
          orders.push({ id: doc.id, ...doc.data() } as FirebaseOrder);
        });
        
        // Sort manually since we can't use orderBy with where
        orders.sort((a, b) => {
          const aTime = a.createdAt?.toMillis() || 0;
          const bTime = b.createdAt?.toMillis() || 0;
          return bTime - aTime;
        });
        
        return { success: true, orders };
      } catch (error) {
        console.error('Error fetching orders by phone:', error);
        return { success: false, error: error.message, orders: [] };
      }
    });
  }

  // Get single order by order ID with error handling
  async getOrderByOrderId(orderId: string) {
    return this.retryOperation(async () => {
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
    });
  }

  // Update order status with error handling
  async updateOrderStatus(orderId: string, status: FirebaseOrder['status']) {
    return this.retryOperation(async () => {
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
    });
  }

  // Update payment status with error handling
  async updatePaymentStatus(orderId: string, paymentStatus: FirebaseOrder['paymentStatus']) {
    return this.retryOperation(async () => {
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
    });
  }

  // Test Firebase connection
  async testConnection() {
    try {
      console.log('🧪 Testing Firebase connection...');
      
      // Test 1: Basic collection access
      console.log('Test 1: Basic collection access');
      const testQuery = query(this.ordersCollection);
      await getDocs(testQuery);
      console.log('✅ Basic collection access: SUCCESS');
      
      // Test 2: Count documents
      console.log('Test 2: Document count');
      const snapshot = await getDocs(this.ordersCollection);
      console.log(`✅ Document count: ${snapshot.size} orders found`);
      
      // Test 3: Network status
      console.log('Test 3: Network status');
      await enableNetwork(db);
      console.log('✅ Network status: ENABLED');
      
      return { 
        success: true, 
        message: `Firebase connection successful. Found ${snapshot.size} orders.`,
        orderCount: snapshot.size
      };
      
    } catch (error) {
      console.error('❌ Firebase connection test failed:', error);
      return { 
        success: false, 
        error: error.message,
        code: error.code 
      };
    }
  }
}

export const orderService = new OrderService();