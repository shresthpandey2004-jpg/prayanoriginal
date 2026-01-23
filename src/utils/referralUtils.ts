// Referral Utility Functions
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

export const processReferralRegistration = (
  referralCode: string, 
  newUserId: string, 
  newUserName: string, 
  newUserEmail: string
): boolean => {
  console.log('🔄 Processing referral registration:', { referralCode, newUserId, newUserName, newUserEmail });
  
  // Find the referrer by their referral code
  const allUsers = JSON.parse(localStorage.getItem('prayan-users') || '[]');
  let referrer = null;
  
  console.log('👥 All users:', allUsers);
  
  // Search through all users to find who has this referral code
  for (const user of allUsers) {
    const userCode = localStorage.getItem(`prayan-referral-code-${user.id}`);
    console.log(`🔍 Checking user ${user.id} (${user.name}) with code: ${userCode}`);
    if (userCode === referralCode) {
      referrer = user;
      console.log('✅ Found referrer:', referrer);
      break;
    }
  }

  if (!referrer) {
    console.log('❌ No referrer found for code:', referralCode);
    return false;
  }

  if (referrer.id === newUserId) {
    console.log('❌ Self-referral not allowed');
    return false;
  }

  // Check if this user was already referred
  const currentReferrals = JSON.parse(localStorage.getItem('prayan-referrals') || '[]');
  const existingReferral = currentReferrals.find((r: any) => r.referredUserId === newUserId);
  if (existingReferral) {
    console.log('❌ User already referred');
    return false;
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

  console.log('✅ Creating new referral:', newReferral);

  // Update localStorage
  const updatedReferrals = [...currentReferrals, newReferral];
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
  
  console.log('🎉 Referral processed successfully!');
  console.log('💾 Updated referrals in localStorage:', updatedReferrals);
  
  return true;
};

export const getReferralStats = (userId: string) => {
  const allReferrals = JSON.parse(localStorage.getItem('prayan-referrals') || '[]');
  const userReferrals = allReferrals.filter((r: any) => r.referrerId === userId);
  
  return {
    totalReferrals: userReferrals.length,
    completedReferrals: userReferrals.filter((r: any) => r.status === 'completed').length,
    pendingReferrals: userReferrals.filter((r: any) => r.status === 'pending').length,
    totalEarnings: userReferrals
      .filter((r: any) => r.status === 'completed')
      .reduce((sum: number, r: any) => sum + r.rewardAmount, 0)
  };
};