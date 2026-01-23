// Order utility functions for referral completion
export const completeReferralOnOrder = (userId: string, orderAmount: number): boolean => {
  console.log('🛒 Checking for referral completion on order:', { userId, orderAmount });
  
  // Get all referrals
  const allReferrals = JSON.parse(localStorage.getItem('prayan-referrals') || '[]');
  
  // Find pending referral for this user (as referred user)
  const pendingReferral = allReferrals.find((r: any) => 
    r.referredUserId === userId && r.status === 'pending'
  );
  
  if (!pendingReferral) {
    console.log('ℹ️ No pending referral found for user:', userId);
    return false;
  }
  
  // Check if order meets minimum requirement (₹299)
  if (orderAmount < 299) {
    console.log('⚠️ Order amount too low for referral completion:', orderAmount);
    return false;
  }
  
  // Complete the referral
  const updatedReferrals = allReferrals.map((r: any) => 
    r.id === pendingReferral.id 
      ? { 
          ...r, 
          status: 'completed',
          completedAt: new Date().toISOString()
        }
      : r
  );
  
  localStorage.setItem('prayan-referrals', JSON.stringify(updatedReferrals));
  
  console.log('✅ Referral completed successfully:', pendingReferral);
  return true;
};

export const getUserReferralHistory = (userId: string) => {
  const allReferrals = JSON.parse(localStorage.getItem('prayan-referrals') || '[]');
  return allReferrals.filter((r: any) => r.referrerId === userId);
};