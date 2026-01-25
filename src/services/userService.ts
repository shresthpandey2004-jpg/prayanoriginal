import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy,
  Timestamp,
  deleteDoc
} from 'firebase/firestore';
import { db } from '@/config/firebase';

// User Service for managing user data with Firebase
export interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  address?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  createdAt: string;
  lastLogin: string;
  isActive: boolean;
  totalOrders: number;
  totalSpent: number;
}

const USERS_COLLECTION = 'users';

export class UserService {
  // Get all users from Firebase
  static async getAllUsers(): Promise<UserData[]> {
    try {
      const usersRef = collection(db, USERS_COLLECTION);
      const q = query(usersRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const users: UserData[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        users.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
          lastLogin: data.lastLogin?.toDate?.()?.toISOString() || data.lastLogin,
        } as UserData);
      });
      
      console.log(`✅ Loaded ${users.length} users from Firebase`);
      return users;
    } catch (error) {
      console.error('❌ Error loading users from Firebase:', error);
      // Fallback to localStorage for backward compatibility
      return this.getAllUsersFromLocalStorage();
    }
  }

  // Fallback method for localStorage (backward compatibility)
  private static getAllUsersFromLocalStorage(): UserData[] {
    try {
      // Try new key first
      let users = localStorage.getItem('prayan-users-database');
      if (users) {
        console.log('📦 Found users in new localStorage key');
        return JSON.parse(users);
      }
      
      // Try old key
      users = localStorage.getItem('prayan-users');
      if (users) {
        console.log('📦 Found users in old localStorage key');
        return JSON.parse(users);
      }
      
      console.log('📦 No users found in localStorage');
      return [];
    } catch (error) {
      console.error('Error loading users from localStorage:', error);
      return [];
    }
  }

  // Save user data to Firebase
  static async saveUser(userData: UserData): Promise<boolean> {
    try {
      const userRef = doc(db, USERS_COLLECTION, userData.id);
      
      // Convert dates to Firestore Timestamps
      const firestoreData = {
        ...userData,
        createdAt: Timestamp.fromDate(new Date(userData.createdAt)),
        lastLogin: Timestamp.fromDate(new Date(userData.lastLogin)),
      };
      
      await setDoc(userRef, firestoreData);
      
      // Also save to localStorage as backup
      this.saveUserToLocalStorage(userData);
      
      console.log('✅ User saved to Firebase:', userData.name);
      return true;
    } catch (error) {
      console.error('❌ Error saving user to Firebase:', error);
      
      // Fallback to localStorage
      return this.saveUserToLocalStorage(userData);
    }
  }

  // Fallback method for localStorage
  private static saveUserToLocalStorage(userData: UserData): boolean {
    try {
      const users = this.getAllUsersFromLocalStorage();
      
      // Check if user already exists
      const existingIndex = users.findIndex(u => u.email === userData.email);
      
      if (existingIndex >= 0) {
        users[existingIndex] = { ...users[existingIndex], ...userData };
      } else {
        users.push(userData);
      }

      localStorage.setItem('prayan-users-database', JSON.stringify(users));
      localStorage.setItem('prayan-users-backup', JSON.stringify(users));
      
      console.log('✅ User saved to localStorage (fallback):', userData.name);
      return true;
    } catch (error) {
      console.error('❌ Error saving user to localStorage:', error);
      return false;
    }
  }

  // Get user by email from Firebase
  static async getUserByEmail(email: string): Promise<UserData | null> {
    try {
      const usersRef = collection(db, USERS_COLLECTION);
      const q = query(usersRef, where('email', '==', email.toLowerCase()));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
          lastLogin: data.lastLogin?.toDate?.()?.toISOString() || data.lastLogin,
        } as UserData;
      }
      
      return null;
    } catch (error) {
      console.error('❌ Error getting user by email from Firebase:', error);
      
      // Fallback to localStorage
      const users = this.getAllUsersFromLocalStorage();
      return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
    }
  }

  // Get user by phone from Firebase
  static async getUserByPhone(phone: string): Promise<UserData | null> {
    try {
      const usersRef = collection(db, USERS_COLLECTION);
      const q = query(usersRef, where('phone', '==', phone));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
          lastLogin: data.lastLogin?.toDate?.()?.toISOString() || data.lastLogin,
        } as UserData;
      }
      
      return null;
    } catch (error) {
      console.error('❌ Error getting user by phone from Firebase:', error);
      
      // Fallback to localStorage
      const users = this.getAllUsersFromLocalStorage();
      return users.find(u => u.phone === phone) || null;
    }
  }

  // Update user data in Firebase
  static async updateUser(email: string, updateData: Partial<UserData>): Promise<boolean> {
    try {
      const user = await this.getUserByEmail(email);
      if (!user) {
        console.error('User not found for update:', email);
        return false;
      }
      
      const userRef = doc(db, USERS_COLLECTION, user.id);
      
      // Convert dates to Firestore Timestamps if they exist
      const firestoreUpdateData: any = { ...updateData };
      if (updateData.lastLogin) {
        firestoreUpdateData.lastLogin = Timestamp.fromDate(new Date(updateData.lastLogin));
      }
      if (updateData.createdAt) {
        firestoreUpdateData.createdAt = Timestamp.fromDate(new Date(updateData.createdAt));
      }
      
      await updateDoc(userRef, firestoreUpdateData);
      
      console.log('✅ User updated in Firebase:', email);
      return true;
    } catch (error) {
      console.error('❌ Error updating user in Firebase:', error);
      
      // Fallback to localStorage
      try {
        const users = this.getAllUsersFromLocalStorage();
        const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (userIndex >= 0) {
          users[userIndex] = { ...users[userIndex], ...updateData };
          localStorage.setItem('prayan-users-database', JSON.stringify(users));
          localStorage.setItem('prayan-users-backup', JSON.stringify(users));
          return true;
        }
        return false;
      } catch (localError) {
        console.error('Error updating user in localStorage:', localError);
        return false;
      }
    }
  }

  // Get user statistics from Firebase
  static async getUserStats() {
    try {
      const users = await this.getAllUsers();
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      
      return {
        totalUsers: users.length,
        activeUsers: users.filter(u => u.isActive).length,
        newUsersThisMonth: users.filter(u => new Date(u.createdAt) > thirtyDaysAgo).length,
        totalRevenue: users.reduce((sum, u) => sum + (u.totalSpent || 0), 0)
      };
    } catch (error) {
      console.error('Error getting user stats:', error);
      return {
        totalUsers: 0,
        activeUsers: 0,
        newUsersThisMonth: 0,
        totalRevenue: 0
      };
    }
  }

  // Export users data (for backup)
  static async exportUsers(): Promise<string> {
    try {
      const users = await this.getAllUsers();
      return JSON.stringify(users, null, 2);
    } catch (error) {
      console.error('Error exporting users:', error);
      return '[]';
    }
  }

  // Clear all user data (admin only) - Firebase + localStorage
  static async clearAllUsers(): Promise<boolean> {
    try {
      // Clear from Firebase
      const users = await this.getAllUsers();
      const deletePromises = users.map(user => 
        deleteDoc(doc(db, USERS_COLLECTION, user.id))
      );
      await Promise.all(deletePromises);
      
      // Clear from localStorage
      localStorage.removeItem('prayan-users-database');
      localStorage.removeItem('prayan-users-backup');
      
      console.log('✅ All users cleared from Firebase and localStorage');
      return true;
    } catch (error) {
      console.error('❌ Error clearing users:', error);
      return false;
    }
  }

  // Migrate localStorage users to Firebase (one-time migration)
  static async migrateLocalStorageToFirebase(): Promise<boolean> {
    try {
      // Check both old and new localStorage keys
      const oldUsers = JSON.parse(localStorage.getItem('prayan-users') || '[]');
      const newUsers = JSON.parse(localStorage.getItem('prayan-users-database') || '[]');
      
      // Combine and deduplicate users
      const allLocalUsers = [...oldUsers, ...newUsers];
      const uniqueUsers = allLocalUsers.filter((user, index, self) => 
        index === self.findIndex(u => u.email === user.email)
      );
      
      if (uniqueUsers.length === 0) {
        console.log('No users to migrate from localStorage');
        return true;
      }
      
      console.log(`🔄 Migrating ${uniqueUsers.length} unique users to Firebase...`);
      console.log('Users to migrate:', uniqueUsers);
      
      const migrationPromises = uniqueUsers.map(user => {
        // Ensure user has all required fields
        const completeUser: UserData = {
          id: user.id || 'user-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
          name: user.name || 'Unknown User',
          email: user.email,
          phone: user.phone || '',
          password: user.password || 'temp123',
          createdAt: user.createdAt || new Date().toISOString(),
          lastLogin: user.lastLogin || new Date().toISOString(),
          isActive: user.isActive !== undefined ? user.isActive : true,
          totalOrders: user.totalOrders || 0,
          totalSpent: user.totalSpent || 0,
          address: user.address
        };
        
        return this.saveUser(completeUser);
      });
      
      const results = await Promise.all(migrationPromises);
      
      const successCount = results.filter(result => result).length;
      console.log(`✅ Successfully migrated ${successCount}/${uniqueUsers.length} users to Firebase`);
      
      return successCount === uniqueUsers.length;
    } catch (error) {
      console.error('❌ Error migrating users to Firebase:', error);
      return false;
    }
  }
}

export default UserService;