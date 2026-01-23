import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { getReferralStats as getStatsFromUtils, processReferralRegistration } from '@/utils/referralUtils';

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
    if (user?.id) {
      const existingCode = localStorage.getItem(`prayan-referral-code-${user.id}`);
      if (existingCode) {
        // User already has a code, use it
        console.log(`✅ Using existing referral code for user ${user.id}: ${existingCode}`);
        setUserReferralCode(existingCode);
      } else {
        // User doesn't have a code, generate new one ONLY if they don't have one
        console.log(`⚠️ No existing code found for user ${user.id}, generating new one...`);
        const newCode = generateReferralCode();
        console.log(`✅ Generated new referral code for user ${user.id}: ${newCode}`);
        setUserReferralCode(newCode);
        localStorage.setItem(`prayan-referral-code-${user.id}`, newCode);
      }
    } else {
      // No user logged in, clear the code
      console.log('🚪 No user logged in, clearing referral code');
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
    
    console.log('🔍 Existing codes:', existingCodes);
    console.log('🎲 Generated code:', result);
    
    // If code already exists, generate a new one with different timestamp
    let attempts = 0;
    while (existingCodes.includes(result) && attempts < 10) {
      console.log(`⚠️ Code ${result} already exists, generating new one...`);
      const newTimestamp = (Date.now() + attempts * 1000).toString().slice(-4);
      result = 'PRAYAN' + newTimestamp;
      for (let i = 0; i < 2; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      attempts++;
      console.log(`🎲 New attempt ${attempts}: ${result}`);
    }
    
    console.log(`✅ Final unique code: ${result}`);
    return result;
  }

  const processReferral = (referralCode: string, newUserId: string, newUserName: string, newUserEmail: string): boolean => {
    return processReferralRegistration(referralCode, newUserId, newUserName, newUserEmail);
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
    if (!user?.id) {
      console.log('⚠️ No user ID available for stats');
      return {
        totalReferrals: 0,
        completedReferrals: 0,
        pendingReferrals: 0,
        totalEarnings: 0
      };
    }
    
    console.log('📊 Getting stats for user:', user.id);
    return getStatsFromUtils(user.id);
  };

  // Refresh referrals when user changes
  useEffect(() => {
    if (user?.id) {
      const allReferrals = JSON.parse(localStorage.getItem('prayan-referrals') || '[]');
      const userReferrals = allReferrals.filter((r: any) => r.referrerId === user.id);
      setReferrals(userReferrals);
      console.log('🔄 Refreshed referrals for user:', user.id, userReferrals);
    } else {
      setReferrals([]);
    }
  }, [user?.id]);

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