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
      return saved || '';
    }
    return '';
  });

  useEffect(() => {
    localStorage.setItem('prayan-referrals', JSON.stringify(referrals));
  }, [referrals]);

  useEffect(() => {
    if (user) {
      const existingCode = localStorage.getItem(`prayan-referral-code-${user.id}`);
      if (existingCode) {
        // User already has a code, use it
        console.log(`Using existing referral code for user ${user.id}: ${existingCode}`);
        setUserReferralCode(existingCode);
      } else {
        // User doesn't have a code, generate new one
        const newCode = generateReferralCode();
        console.log(`Generated new referral code for user ${user.id}: ${newCode}`);
        setUserReferralCode(newCode);
        localStorage.setItem(`prayan-referral-code-${user.id}`, newCode);
      }
    } else {
      // No user logged in, clear the code
      setUserReferralCode('');
    }
  }, [user?.id]); // Only depend on user.id, not the entire user object

  function generateReferralCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'PRAYAN';
    
    // Add timestamp-based uniqueness (use current timestamp)
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
    
    // If code already exists, generate a new one with different timestamp
    let attempts = 0;
    while (existingCodes.includes(result) && attempts < 10) {
      const newTimestamp = (Date.now() + attempts).toString().slice(-4);
      result = 'PRAYAN' + newTimestamp;
      for (let i = 0; i < 2; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      attempts++;
    }
    
    return result;
  }

  const processReferral = (referralCode: string, newUserId: string, newUserName: string, newUserEmail: string): boolean => {
    console.log('Processing referral:', { referralCode, newUserId, newUserName, newUserEmail });
    
    // Find the referrer by their referral code
    const allUsers = JSON.parse(localStorage.getItem('prayan-users') || '[]');
    let referrer = null;
    
    // Search through all users to find who has this referral code
    for (const user of allUsers) {
      const userCode = localStorage.getItem(`prayan-referral-code-${user.id}`);
      console.log(`Checking user ${user.id} with code: ${userCode}`);
      if (userCode === referralCode) {
        referrer = user;
        console.log('Found referrer:', referrer);
        break;
      }
    }

    if (!referrer || referrer.id === newUserId) {
      console.log('Invalid referral code or self-referral');
      return false; // Invalid referral code or self-referral
    }

    // Check if this user was already referred
    const currentReferrals = JSON.parse(localStorage.getItem('prayan-referrals') || '[]');
    const existingReferral = currentReferrals.find((r: any) => r.referredUserId === newUserId);
    if (existingReferral) {
      console.log('User already referred');
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

    console.log('Creating new referral:', newReferral);

    // Update both state and localStorage
    const updatedReferrals = [...currentReferrals, newReferral];
    setReferrals(updatedReferrals);
    localStorage.setItem('prayan-referrals', JSON.stringify(updatedReferrals));
    
    // Also give the new user a discount coupon
    const coupons = JSON.parse(localStorage.getItem('prayan-coupons') || '[]');
    const newUserCoupon = {
      id: `welcome_${newUserId}`,
      code: `WELCOME${referralCode.slice(-4)}`,
      type: 'fixed',
      value: 50,
      minOrderValue: 199, // Updated to match new free shipping threshold
      maxUses: 1,
      usedCount: 0,
      validFrom: new Date().toISOString(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      description: 'Welcome discount for new user',
      userId: newUserId
    };
    coupons.push(newUserCoupon);
    localStorage.setItem('prayan-coupons', JSON.stringify(coupons));
    
    console.log('Referral processed successfully');
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
    // Always get fresh data from localStorage to ensure accuracy
    const allReferrals = JSON.parse(localStorage.getItem('prayan-referrals') || '[]');
    const userReferrals = allReferrals.filter((r: any) => r.referrerId === user?.id);
    
    console.log('Calculating stats for user:', user?.id);
    console.log('All referrals:', allReferrals);
    console.log('User referrals:', userReferrals);
    
    return {
      totalReferrals: userReferrals.length,
      completedReferrals: userReferrals.filter((r: any) => r.status === 'completed').length,
      pendingReferrals: userReferrals.filter((r: any) => r.status === 'pending').length,
      totalEarnings: userReferrals
        .filter((r: any) => r.status === 'completed')
        .reduce((sum: number, r: any) => sum + r.rewardAmount, 0)
    };
  };

  const stats = getReferralStats();
  const totalEarnings = stats.totalEarnings;
  
  // Get fresh referrals for current user
  const allReferrals = JSON.parse(localStorage.getItem('prayan-referrals') || '[]');
  const userReferrals = allReferrals.filter((r: any) => r.referrerId === user?.id);
  const pendingRewards = userReferrals
    .filter((r: any) => r.status === 'completed')
    .reduce((sum: number, r: any) => sum + r.rewardAmount, 0);

  return (
    <ReferralContext.Provider
      value={{
        referrals: userReferrals,
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