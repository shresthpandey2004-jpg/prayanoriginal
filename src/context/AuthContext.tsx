import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { checkForDuplicateUser, generateUserId, sanitizeUserData } from '@/utils/authUtils';

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
  referralCode?: string;
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
      
      // Check existing users (case-insensitive email)
      const users = JSON.parse(localStorage.getItem('prayan-users') || '[]');
      const existingUser = users.find((u: any) => 
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      
      if (existingUser) {
        const { password: _, ...userWithoutPassword } = existingUser;
        const updatedUser = {
          ...userWithoutPassword,
          lastLogin: new Date().toISOString()
        };
        
        setUser(updatedUser);
        localStorage.setItem('prayan-user', JSON.stringify(updatedUser));
        
        // Update user in users array
        const updatedUsers = users.map((u: any) => 
          u.email.toLowerCase() === email.toLowerCase() ? { ...u, lastLogin: updatedUser.lastLogin } : u
        );
        localStorage.setItem('prayan-users', JSON.stringify(updatedUsers));
        
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
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
      
      // Check for duplicates with detailed error messages
      const duplicateCheck = checkForDuplicateUser(sanitizedData.email, sanitizedData.phone);
      
      if (duplicateCheck.isDuplicate) {
        console.log(`❌ Duplicate ${duplicateCheck.duplicateType}:`, sanitizedData[duplicateCheck.duplicateType!]);
        setIsLoading(false);
        return { 
          success: false, 
          error: duplicateCheck.message 
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
      
      // Generate unique referral code for new user
      const generateUniqueReferralCode = (): string => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = 'PRAYAN';
        
        // Add timestamp-based uniqueness
        const timestamp = Date.now().toString().slice(-4);
        result += timestamp;
        
        // Add random characters
        for (let i = 0; i < 2; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        
        // Ensure uniqueness by checking existing codes
        const users = JSON.parse(localStorage.getItem('prayan-users') || '[]');
        const existingCodes = users.map((u: any) => 
          localStorage.getItem(`prayan-referral-code-${u.id}`)
        ).filter(Boolean);
        
        // If code already exists, generate a new one
        let attempts = 0;
        while (existingCodes.includes(result) && attempts < 10) {
          result = 'PRAYAN' + (Date.now() + attempts * 1000).toString().slice(-4);
          for (let i = 0; i < 2; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
          }
          attempts++;
        }
        
        return result;
      };
      
      // Generate and save referral code for new user
      const referralCode = generateUniqueReferralCode();
      localStorage.setItem(`prayan-referral-code-${newUser.id}`, referralCode);
      console.log(`🎉 Generated referral code for new user ${newUser.id}: ${referralCode}`);
      
      // Save user with password to users array
      const users = JSON.parse(localStorage.getItem('prayan-users') || '[]');
      const userWithPassword = { ...newUser, password: sanitizedData.password };
      users.push(userWithPassword);
      localStorage.setItem('prayan-users', JSON.stringify(users));
      console.log('💾 Saved new user to localStorage');
      
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

  const updateProfile = (userData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('prayan-user', JSON.stringify(updatedUser));
    
    // Update in users array too
    const users = JSON.parse(localStorage.getItem('prayan-users') || '[]');
    const updatedUsers = users.map((u: any) => 
      u.id === user.id ? { ...u, ...userData } : u
    );
    localStorage.setItem('prayan-users', JSON.stringify(updatedUsers));
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