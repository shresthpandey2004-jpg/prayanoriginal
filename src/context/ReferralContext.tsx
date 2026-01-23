import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface Referral {
  id: string;
  referrerId: string;
  referredUserId: string;
  referredUserName: string;
  referredUserEmail: string;
  referralCode: string;
  status: 'pending' | 'completed' | 'rewarded';
  rewardAmount: number;
  createdAt: string;
  completedAt?: string;
}

interface ReferralContextType {
  referrals: Referral[];
  userReferralCode: string;
  totalEarnings: number;
  pendingRewards: number;
  generateReferralCode: () => string;
  processReferral: (referralCode: string, newUserId: string, newUserName: string, newUserEmail: string) => boolean;
  completeReferral: (referralId: string) => void;
  getReferralStats: () => {
    totalReferrals: number;
    completedReferrals: number;
    pendingReferrals: number;
    totalEarnings: number;
  };
}

const ReferralContext = createContext<ReferralContextType | undefined>(undefined);

export const ReferralProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [referrals, setReferrals] = useState<Referral[]>(() => {
    const saved = localStorage.getItem('prayan-referrals');
    return saved ? JSON.parse(saved) : [];
  });

  const [userReferralCode, setUserReferralCode] = useState(() => {
    if (user) {
      const saved = localStorage.getItem(`prayan-referral-code-${user.id}`);
      return saved || generateReferralCode();
    }
    return '';
  });

  useEffect(() => {
    localStorage.setItem('prayan-referrals', JSON.stringify(referrals));
  }, [referrals]);

  useEffect(() => {
    if (user && !userReferralCode) {
      const code = generateReferralCode();
      setUserReferralCode(code);
      localStorage.setItem(`prayan-referral-code-${user.id}`, code);
    }
  }, [user]);

  function generateReferralCode(): string {
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
    const allUsers = JSON.parse(localStorage.getItem('prayan-users') || '[]');
    const existingCodes = allUsers.map((u: any) => 
      localStorage.getItem(`prayan-referral-code-${u.id}`)
    ).filter(Boolean);
    
    // If code already exists, generate a new one
    while (existingCodes.includes(result)) {
      result = 'PRAYAN' + Date.now().toString().slice(-4);
      for (let i = 0; i < 2; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
    }
    
    return result;
  }

  const processReferral = (referralCode: string, newUserId: string, newUserName: string, newUserEmail: string): boolean => {
    // Find the referrer by their referral code
    const allUsers = JSON.parse(localStorage.getItem('prayan-users') || '[]');
    let referrer = null;
    
    // Search through all users to find who has this referral code
    for (const user of allUsers) {
      const userCode = localStorage.getItem(`prayan-referral-code-${user.id}`);
      if (userCode === referralCode) {
        referrer = user;
        break;
      }
    }

    if (!referrer || referrer.id === newUserId) {
      return false; // Invalid referral code or self-referral
    }

    // Check if this user was already referred
    const existingReferral = referrals.find(r => r.referredUserId === newUserId);
    if (existingReferral) {
      return false; // User already referred
    }

    // Create new referral
    const newReferral: Referral = {
      id: `ref_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      referrerId: referrer.id,
      referredUserId: newUserId,
      referredUserName: newUserName,
      referredUserEmail: newUserEmail,
      referralCode: referralCode,
      status: 'pending',
      rewardAmount: 50, // ₹50 reward for successful referral
      createdAt: new Date().toISOString()
    };

    setReferrals(prev => [...prev, newReferral]);
    
    // Also give the new user a discount coupon
    const coupons = JSON.parse(localStorage.getItem('prayan-coupons') || '[]');
    const newUserCoupon = {
      id: `welcome_${newUserId}`,
      code: `WELCOME${referralCode.slice(-4)}`,
      type: 'fixed',
      value: 50,
      minOrderValue: 299,
      maxUses: 1,
      usedCount: 0,
      validFrom: new Date().toISOString(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      description: 'Welcome discount for new user',
      userId: newUserId
    };
    coupons.push(newUserCoupon);
    localStorage.setItem('prayan-coupons', JSON.stringify(coupons));
    
    return true;
  };

  const completeReferral = (referralId: string) => {
    setReferrals(prev => prev.map(referral => 
      referral.id === referralId 
        ? { 
            ...referral, 
            status: 'completed' as const,
            completedAt: new Date().toISOString()
          }
        : referral
    ));
  };

  const getReferralStats = () => {
    const userReferrals = referrals.filter(r => r.referrerId === user?.id);
    
    return {
      totalReferrals: userReferrals.length,
      completedReferrals: userReferrals.filter(r => r.status === 'completed').length,
      pendingReferrals: userReferrals.filter(r => r.status === 'pending').length,
      totalEarnings: userReferrals
        .filter(r => r.status === 'completed')
        .reduce((sum, r) => sum + r.rewardAmount, 0)
    };
  };

  const stats = getReferralStats();
  const totalEarnings = stats.totalEarnings;
  const pendingRewards = referrals
    .filter(r => r.referrerId === user?.id && r.status === 'completed')
    .reduce((sum, r) => sum + r.rewardAmount, 0);

  return (
    <ReferralContext.Provider
      value={{
        referrals: referrals.filter(r => r.referrerId === user?.id),
        userReferralCode,
        totalEarnings,
        pendingRewards,
        generateReferralCode,
        processReferral,
        completeReferral,
        getReferralStats,
      }}
    >
      {children}
    </ReferralContext.Provider>
  );
};

export const useReferrals = () => {
  const context = useContext(ReferralContext);
  if (!context) {
    throw new Error('useReferrals must be used within a ReferralProvider');
  }
  return context;
};