import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import {
  LoyaltyTransaction,
  LoyaltyTier,
  LoyaltyReward,
  LOYALTY_TIERS,
  LOYALTY_REWARDS,
  getUserLoyaltyStats,
  canRedeemPoints,
  redeemLoyaltyPoints,
  redeemCustomPoints,
  awardOrderPoints,
  awardBonusPoints,
  expireOldPoints,
  getAvailableRewards,
  generateLoyaltyCoupon,
  calculatePointsValue,
  addLoyaltyTransaction
} from '@/utils/loyaltyUtils';

interface LoyaltyContextType {
  // Current user data
  userPoints: number;
  userTier: LoyaltyTier;
  transactions: LoyaltyTransaction[];
  lifetimeEarned: number;
  totalRedeemed: number;
  pointsValue: number;
  
  // Tier progression
  nextTier: LoyaltyTier | null;
  progress: {
    current: number;
    required: number;
    percentage: number;
  };
  
  // Available rewards
  availableRewards: LoyaltyReward[];
  
  // Actions
  earnPointsFromOrder: (orderId: string, orderAmount: number) => number;
  redeemPoints: (rewardId: string, orderId?: string) => boolean;
  redeemCustomPoints: (points: number, discountValue: number, orderId?: string) => boolean;
  awardBonus: (points: number, reason: string) => void;
  refreshLoyaltyData: () => void;
  
  // Utilities
  canRedeem: (points: number) => boolean;
  getPointsValue: (points: number) => number;
  createLoyaltyCoupon: (rewardId: string) => any;
  
  // Real-time updates
  isLoading: boolean;
}

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined);

export const LoyaltyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [loyaltyData, setLoyaltyData] = useState(() => {
    if (user?.id) {
      return getUserLoyaltyStats(user.id);
    }
    return {
      totalPoints: 0,
      currentTier: LOYALTY_TIERS[0],
      lifetimeEarned: 0,
      totalRedeemed: 0,
      transactions: [],
      progress: { current: 0, required: 0, percentage: 0 },
      nextTier: null,
      pointsValue: 0
    };
  });

  // Real-time data refresh when user changes or localStorage updates
  useEffect(() => {
    if (user?.id) {
      console.log('🔄 Refreshing loyalty data for user:', user.id);
      
      // Expire old points first
      expireOldPoints(user.id);
      
      // Get fresh data
      const freshData = getUserLoyaltyStats(user.id);
      setLoyaltyData(freshData);
      
      console.log('💎 Loyalty data refreshed:', freshData);
    } else {
      // Reset data when no user
      setLoyaltyData({
        totalPoints: 0,
        currentTier: LOYALTY_TIERS[0],
        lifetimeEarned: 0,
        totalRedeemed: 0,
        transactions: [],
        progress: { current: 0, required: 0, percentage: 0 },
        nextTier: null,
        pointsValue: 0
      });
    }
  }, [user?.id]);

  // Listen for localStorage changes (real-time updates)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'prayan-loyalty-transactions' && user?.id) {
        console.log('🔄 Loyalty transactions updated, refreshing data...');
        const freshData = getUserLoyaltyStats(user.id);
        setLoyaltyData(freshData);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [user?.id]);

  // Auto-refresh every 30 seconds to check for expired points
  useEffect(() => {
    if (!user?.id) return;

    const interval = setInterval(() => {
      const expiredCount = expireOldPoints(user.id);
      if (expiredCount > 0) {
        const freshData = getUserLoyaltyStats(user.id);
        setLoyaltyData(freshData);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [user?.id]);

  const earnPointsFromOrder = (orderId: string, orderAmount: number): number => {
    if (!user?.id) return 0;
    
    setIsLoading(true);
    try {
      const pointsEarned = awardOrderPoints(user.id, orderId, orderAmount);
      
      // Refresh data immediately
      const freshData = getUserLoyaltyStats(user.id);
      setLoyaltyData(freshData);
      
      console.log(`✅ Earned ${pointsEarned} points from order ${orderId}`);
      return pointsEarned;
    } finally {
      setIsLoading(false);
    }
  };

  const redeemPoints = (rewardId: string, orderId?: string): boolean => {
    if (!user?.id) return false;
    
    const reward = LOYALTY_REWARDS.find(r => r.id === rewardId);
    if (!reward) return false;
    
    setIsLoading(true);
    try {
      const success = redeemLoyaltyPoints(user.id, reward.pointsCost, rewardId, orderId);
      
      if (success) {
        // Refresh data immediately
        const freshData = getUserLoyaltyStats(user.id);
        setLoyaltyData(freshData);
        
        console.log(`✅ Redeemed ${reward.pointsCost} points for ${reward.name}`);
      }
      
      return success;
    } finally {
      setIsLoading(false);
    }
  };

  const redeemCustomPointsFunc = (points: number, discountValue: number, orderId?: string): boolean => {
    if (!user?.id) return false;
    
    setIsLoading(true);
    try {
      const success = redeemCustomPoints(user.id, points, discountValue, orderId);
      
      if (success) {
        // Refresh data immediately
        const freshData = getUserLoyaltyStats(user.id);
        setLoyaltyData(freshData);
        
        console.log(`✅ Redeemed ${points} points for ₹${discountValue} discount`);
      }
      
      return success;
    } finally {
      setIsLoading(false);
    }
  };
    if (!user?.id) return;
    
    setIsLoading(true);
    try {
      awardBonusPoints(user.id, points, reason);
      
      // Refresh data immediately
      const freshData = getUserLoyaltyStats(user.id);
      setLoyaltyData(freshData);
      
      console.log(`✅ Awarded ${points} bonus points: ${reason}`);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshLoyaltyData = (): void => {
    if (!user?.id) return;
    
    setIsLoading(true);
    try {
      // Expire old points first
      expireOldPoints(user.id);
      
      // Get fresh data
      const freshData = getUserLoyaltyStats(user.id);
      setLoyaltyData(freshData);
      
      console.log('🔄 Loyalty data manually refreshed');
    } finally {
      setIsLoading(false);
    }
  };

  const canRedeemPointsCheck = (points: number): boolean => {
    return user?.id ? canRedeemPoints(user.id, points) : false;
  };

  const createLoyaltyCoupon = (rewardId: string): any => {
    if (!user?.id) return null;
    
    const reward = LOYALTY_REWARDS.find(r => r.id === rewardId);
    if (!reward) return null;
    
    return generateLoyaltyCoupon(reward, user.id);
  };

  // Get available rewards based on current points
  const availableRewards = getAvailableRewards(loyaltyData.totalPoints);

  return (
    <LoyaltyContext.Provider
      value={{
        // Current user data
        userPoints: loyaltyData.totalPoints,
        userTier: loyaltyData.currentTier,
        transactions: loyaltyData.transactions,
        lifetimeEarned: loyaltyData.lifetimeEarned,
        totalRedeemed: loyaltyData.totalRedeemed,
        pointsValue: loyaltyData.pointsValue,
        
        // Tier progression
        nextTier: loyaltyData.nextTier,
        progress: loyaltyData.progress,
        
        // Available rewards
        availableRewards,
        
        // Actions
        earnPointsFromOrder,
        redeemPoints,
        redeemCustomPoints: redeemCustomPointsFunc,
        awardBonus,
        refreshLoyaltyData,
        
        // Utilities
        canRedeem: canRedeemPointsCheck,
        getPointsValue: calculatePointsValue,
        createLoyaltyCoupon,
        
        // Real-time updates
        isLoading,
      }}
    >
      {children}
    </LoyaltyContext.Provider>
  );
};

export const useLoyalty = () => {
  const context = useContext(LoyaltyContext);
  if (!context) {
    throw new Error('useLoyalty must be used within a LoyaltyProvider');
  }
  return context;
};