// Enhanced Loyalty System Utilities
export interface LoyaltyTransaction {
  id: string;
  userId: string;
  type: 'earned' | 'redeemed' | 'bonus' | 'expired';
  points: number;
  orderId?: string;
  description: string;
  timestamp: string;
  expiryDate?: string;
  metadata?: {
    orderAmount?: number;
    rewardType?: string;
    bonusReason?: string;
  };
}

export interface LoyaltyTier {
  name: string;
  minPoints: number;
  benefits: string[];
  discountPercentage: number;
  color: string;
  icon: string;
  pointsMultiplier: number;
  freeShippingThreshold: number;
}

export interface LoyaltyReward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  value: number;
  type: 'discount' | 'freeShipping' | 'product' | 'cashback';
  minOrderValue?: number;
  maxUses?: number;
  validityDays: number;
  isActive: boolean;
}

// Enhanced loyalty tiers with more benefits
export const LOYALTY_TIERS: LoyaltyTier[] = [
  {
    name: 'Bronze',
    minPoints: 0,
    benefits: [
      '1 point per ₹10 spent',
      'Birthday special discount',
      'Basic customer support'
    ],
    discountPercentage: 1,
    color: 'bg-gradient-to-r from-amber-600 to-amber-700',
    icon: '🥉',
    pointsMultiplier: 1,
    freeShippingThreshold: 499
  },
  {
    name: 'Silver',
    minPoints: 500,
    benefits: [
      '1.5 points per ₹10 spent',
      'Free shipping on ₹299+',
      'Early access to sales',
      'Priority customer support',
      '5% birthday discount'
    ],
    discountPercentage: 2,
    color: 'bg-gradient-to-r from-gray-400 to-gray-500',
    icon: '🥈',
    pointsMultiplier: 1.5,
    freeShippingThreshold: 299
  },
  {
    name: 'Gold',
    minPoints: 1500,
    benefits: [
      '2 points per ₹10 spent',
      'Free shipping always',
      'Exclusive products access',
      'Premium customer support',
      '10% birthday discount',
      'Monthly bonus points'
    ],
    discountPercentage: 3,
    color: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
    icon: '🥇',
    pointsMultiplier: 2,
    freeShippingThreshold: 0
  },
  {
    name: 'Platinum',
    minPoints: 3000,
    benefits: [
      '3 points per ₹10 spent',
      'Free express shipping',
      'Personal spice consultant',
      'VIP customer support',
      '15% birthday discount',
      'Weekly bonus points',
      'Exclusive events access'
    ],
    discountPercentage: 5,
    color: 'bg-gradient-to-r from-purple-600 to-purple-700',
    icon: '💎',
    pointsMultiplier: 3,
    freeShippingThreshold: 0
  }
];

// Available loyalty rewards
export const LOYALTY_REWARDS: LoyaltyReward[] = [
  {
    id: 'discount_50',
    name: '₹50 Discount',
    description: 'Get ₹50 off on orders above ₹299',
    pointsCost: 500,
    value: 50,
    type: 'discount',
    minOrderValue: 299,
    maxUses: 1,
    validityDays: 30,
    isActive: true
  },
  {
    id: 'discount_100',
    name: '₹100 Discount',
    description: 'Get ₹100 off on orders above ₹599',
    pointsCost: 1000,
    value: 100,
    type: 'discount',
    minOrderValue: 599,
    maxUses: 1,
    validityDays: 30,
    isActive: true
  },
  {
    id: 'discount_200',
    name: '₹200 Discount',
    description: 'Get ₹200 off on orders above ₹999',
    pointsCost: 2000,
    value: 200,
    type: 'discount',
    minOrderValue: 999,
    maxUses: 1,
    validityDays: 30,
    isActive: true
  },
  {
    id: 'free_shipping',
    name: 'Free Shipping',
    description: 'Free shipping on any order',
    pointsCost: 200,
    value: 50,
    type: 'freeShipping',
    minOrderValue: 0,
    maxUses: 1,
    validityDays: 15,
    isActive: true
  },
  {
    id: 'cashback_5',
    name: '5% Cashback',
    description: 'Get 5% cashback as points on next order',
    pointsCost: 1500,
    value: 5,
    type: 'cashback',
    minOrderValue: 500,
    maxUses: 1,
    validityDays: 45,
    isActive: true
  }
];

// Constants
export const POINTS_PER_RUPEE_BASE = 0.1; // Base: 1 point per ₹10 spent
export const RUPEES_PER_POINT = 0.1; // 1 point = ₹0.10
export const POINTS_EXPIRY_MONTHS = 12; // Points expire after 12 months
export const REVIEW_POINTS = 50; // Points for writing a review
export const REFERRAL_POINTS = 100; // Points for successful referral

// Utility Functions

export const calculatePointsEarned = (orderAmount: number, userTier: LoyaltyTier): number => {
  const basePoints = Math.floor(orderAmount * POINTS_PER_RUPEE_BASE);
  return Math.floor(basePoints * userTier.pointsMultiplier);
};

export const calculatePointsValue = (points: number): number => {
  return Math.floor(points * RUPEES_PER_POINT);
};

export const getUserTier = (totalPoints: number): LoyaltyTier => {
  return LOYALTY_TIERS
    .slice()
    .reverse()
    .find(tier => totalPoints >= tier.minPoints) || LOYALTY_TIERS[0];
};

export const getNextTier = (currentTier: LoyaltyTier): LoyaltyTier | null => {
  const currentIndex = LOYALTY_TIERS.findIndex(tier => tier.name === currentTier.name);
  return currentIndex < LOYALTY_TIERS.length - 1 ? LOYALTY_TIERS[currentIndex + 1] : null;
};

export const getProgressToNextTier = (totalPoints: number, currentTier: LoyaltyTier) => {
  const nextTier = getNextTier(currentTier);
  if (!nextTier) {
    return { current: totalPoints, required: currentTier.minPoints, percentage: 100 };
  }

  const current = totalPoints - currentTier.minPoints;
  const required = nextTier.minPoints - currentTier.minPoints;
  const percentage = Math.min((current / required) * 100, 100);

  return { current: totalPoints, required: nextTier.minPoints, percentage };
};

export const addLoyaltyTransaction = (
  userId: string,
  type: LoyaltyTransaction['type'],
  points: number,
  description: string,
  orderId?: string,
  metadata?: LoyaltyTransaction['metadata']
): LoyaltyTransaction => {
  const transaction: LoyaltyTransaction = {
    id: `loyalty_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    type,
    points,
    description,
    timestamp: new Date().toISOString(),
    orderId,
    metadata
  };

  // Add expiry date for earned points
  if (type === 'earned' || type === 'bonus') {
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + POINTS_EXPIRY_MONTHS);
    transaction.expiryDate = expiryDate.toISOString();
  }

  // Get existing transactions
  const existingTransactions = JSON.parse(localStorage.getItem('prayan-loyalty-transactions') || '[]');
  const updatedTransactions = [...existingTransactions, transaction];
  
  // Save to localStorage
  localStorage.setItem('prayan-loyalty-transactions', JSON.stringify(updatedTransactions));
  
  console.log('💎 Loyalty transaction added:', transaction);
  return transaction;
};

export const getUserLoyaltyStats = (userId: string) => {
  const allTransactions = JSON.parse(localStorage.getItem('prayan-loyalty-transactions') || '[]');
  const userTransactions = allTransactions.filter((t: LoyaltyTransaction) => t.userId === userId);
  
  // Calculate total points (earned - redeemed)
  const totalPoints = userTransactions.reduce((total: number, transaction: LoyaltyTransaction) => {
    switch (transaction.type) {
      case 'earned':
      case 'bonus':
        return total + transaction.points;
      case 'redeemed':
      case 'expired':
        return total - transaction.points;
      default:
        return total;
    }
  }, 0);

  // Get current tier
  const currentTier = getUserTier(totalPoints);
  
  // Calculate lifetime earned points
  const lifetimeEarned = userTransactions
    .filter((t: LoyaltyTransaction) => t.type === 'earned' || t.type === 'bonus')
    .reduce((total: number, t: LoyaltyTransaction) => total + t.points, 0);
  
  // Calculate total redeemed points
  const totalRedeemed = userTransactions
    .filter((t: LoyaltyTransaction) => t.type === 'redeemed')
    .reduce((total: number, t: LoyaltyTransaction) => total + t.points, 0);

  // Get progress to next tier
  const progress = getProgressToNextTier(totalPoints, currentTier);

  return {
    totalPoints,
    currentTier,
    lifetimeEarned,
    totalRedeemed,
    transactions: userTransactions,
    progress,
    nextTier: getNextTier(currentTier),
    pointsValue: calculatePointsValue(totalPoints)
  };
};

export const canRedeemPoints = (userId: string, points: number): boolean => {
  const stats = getUserLoyaltyStats(userId);
  return stats.totalPoints >= points && points >= 100; // Minimum 100 points to redeem
};

export const redeemLoyaltyPoints = (
  userId: string,
  points: number,
  rewardId: string,
  orderId?: string
): boolean => {
  if (!canRedeemPoints(userId, points)) {
    console.log('❌ Cannot redeem points: insufficient balance');
    return false;
  }

  const reward = LOYALTY_REWARDS.find(r => r.id === rewardId);
  if (!reward) {
    console.log('❌ Reward not found');
    return false;
  }

  // Add redemption transaction
  addLoyaltyTransaction(
    userId,
    'redeemed',
    points,
    `Redeemed ${reward.name}`,
    orderId,
    { rewardType: reward.type }
  );

  console.log('✅ Points redeemed successfully');
  return true;
};

export const redeemCustomPoints = (
  userId: string,
  points: number,
  discountValue: number,
  orderId?: string
): boolean => {
  if (!canRedeemPoints(userId, points)) {
    console.log('❌ Cannot redeem points: insufficient balance');
    return false;
  }

  // Add redemption transaction
  addLoyaltyTransaction(
    userId,
    'redeemed',
    points,
    `Redeemed ${points} points for ₹${discountValue} discount`,
    orderId,
    { rewardType: 'custom_discount', discountValue }
  );

  console.log('✅ Custom points redeemed successfully');
  return true;
};

export const awardOrderPoints = (
  userId: string,
  orderId: string,
  orderAmount: number
): number => {
  const stats = getUserLoyaltyStats(userId);
  const pointsEarned = calculatePointsEarned(orderAmount, stats.currentTier);
  
  if (pointsEarned > 0) {
    addLoyaltyTransaction(
      userId,
      'earned',
      pointsEarned,
      `Earned ${pointsEarned} points from order #${orderId.slice(-6)}`,
      orderId,
      { orderAmount }
    );
  }

  console.log(`💎 Awarded ${pointsEarned} points for order ${orderId}`);
  return pointsEarned;
};

export const awardBonusPoints = (
  userId: string,
  points: number,
  reason: string
): void => {
  addLoyaltyTransaction(
    userId,
    'bonus',
    points,
    `Bonus: ${reason}`,
    undefined,
    { bonusReason: reason }
  );

  console.log(`🎁 Awarded ${points} bonus points: ${reason}`);
};

export const expireOldPoints = (userId: string): number => {
  const allTransactions = JSON.parse(localStorage.getItem('prayan-loyalty-transactions') || '[]');
  const now = new Date();
  let expiredPoints = 0;

  // Find expired points
  const expiredTransactions = allTransactions.filter((t: LoyaltyTransaction) => 
    t.userId === userId && 
    (t.type === 'earned' || t.type === 'bonus') &&
    t.expiryDate &&
    new Date(t.expiryDate) < now
  );

  // Add expiry transactions
  expiredTransactions.forEach((t: LoyaltyTransaction) => {
    addLoyaltyTransaction(
      userId,
      'expired',
      t.points,
      `Points expired from ${new Date(t.timestamp).toLocaleDateString()}`,
      undefined,
      { originalTransactionId: t.id }
    );
    expiredPoints += t.points;
  });

  if (expiredPoints > 0) {
    console.log(`⏰ Expired ${expiredPoints} points for user ${userId}`);
  }

  return expiredPoints;
};

export const getAvailableRewards = (userPoints: number): LoyaltyReward[] => {
  return LOYALTY_REWARDS.filter(reward => 
    reward.isActive && userPoints >= reward.pointsCost
  );
};

export const generateLoyaltyCoupon = (reward: LoyaltyReward, userId: string): any => {
  const couponCode = `LOYALTY${reward.id.toUpperCase()}${Date.now().toString().slice(-4)}`;
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + reward.validityDays);

  return {
    id: `loyalty_${userId}_${Date.now()}`,
    code: couponCode,
    type: reward.type === 'discount' ? 'fixed' : reward.type,
    value: reward.value,
    minOrderValue: reward.minOrderValue || 0,
    maxUses: reward.maxUses || 1,
    usedCount: 0,
    validFrom: new Date().toISOString(),
    validUntil: expiryDate.toISOString(),
    description: `Loyalty reward: ${reward.description}`,
    userId: userId,
    isLoyaltyReward: true
  };
};