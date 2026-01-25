// User Service for managing user data
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

const USERS_STORAGE_KEY = 'prayan-users-database';
const BACKUP_STORAGE_KEY = 'prayan-users-backup';

export class UserService {
  // Get all users
  static getAllUsers(): UserData[] {
    try {
      const users = localStorage.getItem(USERS_STORAGE_KEY);
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error('Error loading users:', error);
      return [];
    }
  }

  // Save user data with backup
  static saveUser(userData: UserData): boolean {
    try {
      const users = this.getAllUsers();
      
      // Check if user already exists
      const existingIndex = users.findIndex(u => u.email === userData.email);
      
      if (existingIndex >= 0) {
        // Update existing user
        users[existingIndex] = { ...users[existingIndex], ...userData };
      } else {
        // Add new user
        users.push(userData);
      }

      // Save to main storage
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
      
      // Create backup
      localStorage.setItem(BACKUP_STORAGE_KEY, JSON.stringify(users));
      
      console.log('✅ User saved successfully:', userData.name);
      return true;
    } catch (error) {
      console.error('❌ Error saving user:', error);
      return false;
    }
  }

  // Get user by email
  static getUserByEmail(email: string): UserData | null {
    const users = this.getAllUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  // Get user by phone
  static getUserByPhone(phone: string): UserData | null {
    const users = this.getAllUsers();
    return users.find(u => u.phone === phone) || null;
  }

  // Update user data
  static updateUser(email: string, updateData: Partial<UserData>): boolean {
    try {
      const users = this.getAllUsers();
      const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (userIndex >= 0) {
        users[userIndex] = { ...users[userIndex], ...updateData };
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
        localStorage.setItem(BACKUP_STORAGE_KEY, JSON.stringify(users));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating user:', error);
      return false;
    }
  }

  // Get user statistics
  static getUserStats() {
    const users = this.getAllUsers();
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    return {
      totalUsers: users.length,
      activeUsers: users.filter(u => u.isActive).length,
      newUsersThisMonth: users.filter(u => new Date(u.createdAt) > thirtyDaysAgo).length,
      totalRevenue: users.reduce((sum, u) => sum + (u.totalSpent || 0), 0)
    };
  }

  // Export users data (for backup)
  static exportUsers(): string {
    const users = this.getAllUsers();
    return JSON.stringify(users, null, 2);
  }

  // Import users data (from backup)
  static importUsers(jsonData: string): boolean {
    try {
      const users = JSON.parse(jsonData);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
      localStorage.setItem(BACKUP_STORAGE_KEY, JSON.stringify(users));
      return true;
    } catch (error) {
      console.error('Error importing users:', error);
      return false;
    }
  }

  // Clear all user data (admin only)
  static clearAllUsers(): boolean {
    try {
      localStorage.removeItem(USERS_STORAGE_KEY);
      localStorage.removeItem(BACKUP_STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing users:', error);
      return false;
    }
  }
}

export default UserService;