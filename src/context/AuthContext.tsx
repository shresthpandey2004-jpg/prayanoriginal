import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { checkForDuplicateUser, generateUserId, sanitizeUserData } from '@/utils/authUtils';
import UserService, { UserData } from '@/services/userService';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  preferences?: {
    favoriteCategories: string[];
    dietaryRestrictions: string[];
  };
  createdAt: string;
  lastLogin: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  isLoading: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session
    const savedUser = localStorage.getItem('prayan-user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        localStorage.removeItem('prayan-user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call - In real app, this would be an actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check existing users using UserService (now async)
      const existingUser = await UserService.getUserByEmail(email);
      
      if (existingUser && existingUser.password === password) {
        const { password: _, ...userWithoutPassword } = existingUser;
        const updatedUser = {
          ...userWithoutPassword,
          lastLogin: new Date().toISOString()
        };
        
        setUser(updatedUser);
        localStorage.setItem('prayan-user', JSON.stringify(updatedUser));
        
        // Update user's last login using UserService (now async)
        await UserService.updateUser(email, { lastLogin: updatedUser.lastLogin });
        
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('❌ Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sanitize user data
      const sanitizedData = sanitizeUserData(userData);
      
      // Check for duplicates using UserService (now async)
      const existingUserByEmail = await UserService.getUserByEmail(sanitizedData.email);
      const existingUserByPhone = await UserService.getUserByPhone(sanitizedData.phone);
      
      if (existingUserByEmail) {
        console.log(`❌ Duplicate email:`, sanitizedData.email);
        setIsLoading(false);
        return { 
          success: false, 
          error: 'An account with this email already exists. Please use a different email or try logging in.' 
        };
      }
      
      if (existingUserByPhone) {
        console.log(`❌ Duplicate phone:`, sanitizedData.phone);
        setIsLoading(false);
        return { 
          success: false, 
          error: 'An account with this phone number already exists. Please use a different phone number or try logging in.' 
        };
      }
      
      console.log('✅ Email and phone number are unique, creating new user...');
      
      // Create new user with unique ID
      const newUser: User = {
        id: generateUserId(),
        name: sanitizedData.name,
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      
      // Create UserData object for UserService
      const newUserData: UserData = {
        id: newUser.id,
        name: sanitizedData.name,
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        password: sanitizedData.password,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        isActive: true,
        totalOrders: 0,
        totalSpent: 0
      };
      
      // Save user using UserService (now async)
      const saveSuccess = await UserService.saveUser(newUserData);
      
      if (!saveSuccess) {
        console.error('❌ Failed to save user with UserService');
        setIsLoading(false);
        return { 
          success: false, 
          error: 'Failed to create account. Please try again.' 
        };
      }
      
      console.log('✅ User saved successfully with Firebase + UserService');
      
      // Set current user (without password)
      setUser(newUser);
      localStorage.setItem('prayan-user', JSON.stringify(newUser));
      
      setIsLoading(false);
      return { success: true };
    } catch (error) {
      console.error('❌ Registration error:', error);
      setIsLoading(false);
      return { 
        success: false, 
        error: 'Something went wrong during registration. Please try again.' 
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('prayan-user');
  };

  const updateProfile = async (userData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('prayan-user', JSON.stringify(updatedUser));
    
    // Update using UserService (now async)
    try {
      await UserService.updateUser(user.email, userData);
      console.log('✅ Profile updated in Firebase');
    } catch (error) {
      console.error('❌ Error updating profile:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};