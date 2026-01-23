import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLoyalty } from '@/context/LoyaltyContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  awardOrderPoints, 
  awardBonusPoints, 
  getUserLoyaltyStats,
  LOYALTY_REWARDS,
  LOYALTY_TIERS
} from '@/utils/loyaltyUtils';
import { Coins, Gift, Zap, Trophy, ShoppingBag, Star } from 'lucide-react';

const TestLoyalty = () => {
  const { user } = useAuth();
  const { 
    userPoints, 
    userTier, 
    transactions, 
    lifetimeEarned,
    totalRedeemed,
    earnPointsFromOrder,
    redeemPoints,
    awardBonus,
    refreshLoyaltyData
  } = useLoyalty();
  
  const [orderAmount, setOrderAmount] = useState('500');
  const [bonusPoints, setBonusPoints] = useState('50');
  const [bonusReason, setBonusReason] = useState('Test bonus');

  const handleEarnPoints = () => {
    if (!user?.id || !orderAmount) {
      alert('Please login and enter order amount');
      return;
    }

    const orderId = `TEST_${Date.now()}`;
    const points = earnPointsFromOrder(orderId, parseFloat(orderAmount));
    alert(`Earned ${points} points from order ${orderId}!`);
  };

  const handleAwardBonus = () => {
    if (!user?.id || !bonusPoints || !bonusReason) {
      alert('Please fill all fields');
      return;
    }

    awardBonus(parseInt(bonusPoints), bonusReason);
    alert(`Awarded ${bonusPoints} bonus points for: ${bonusReason}`);
  };

  const handleRedeemReward = (rewardId: string) => {
    const success = redeemPoints(rewardId);
    if (success) {
      alert('Reward redeemed successfully!');
    } else {
      alert('Failed to redeem reward. Check your points balance.');
    }
  };

  const clearAllData = () => {
    localStorage.removeItem('prayan-loyalty-transactions');
    alert('All loyalty data cleared!');
    window.location.reload();
  };

  const simulateMultipleOrders = () => {
    if (!user?.id) {
      alert('Please login first');
      return;
    }

    const orders = [
      { amount: 299, id: 'ORDER_1' },
      { amount: 599, id: 'ORDER_2' },
      { amount: 999, id: 'ORDER_3' },
      { amount: 1499, id: 'ORDER_4' }
    ];

    orders.forEach((order, index) => {
      setTimeout(() => {
        earnPointsFromOrder(order.id, order.amount);
      }, index * 500);
    });

    alert('Simulating 4 orders with different amounts...');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Loyalty System Test</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Current User Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Current Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p><strong>User:</strong> {user?.name || 'Not logged in'}</p>
                <p><strong>User ID:</strong> {user?.id || 'N/A'}</p>
              </div>
              
              <div className={`p-4 rounded-lg text-white ${userTier.color}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{userTier.icon}</span>
                  <span className="font-bold">{userTier.name}</span>
                </div>
                <p className="text-sm opacity-90">{userTier.pointsMultiplier}x Points Multiplier</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded">
                  <p className="text-2xl font-bold text-blue-600">{userPoints}</p>
                  <p className="text-sm text-blue-600">Current Points</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded">
                  <p className="text-2xl font-bold text-green-600">{lifetimeEarned}</p>
                  <p className="text-sm text-green-600">Lifetime Earned</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded">
                  <p className="text-2xl font-bold text-purple-600">{totalRedeemed}</p>
                  <p className="text-sm text-purple-600">Total Redeemed</p>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded">
                  <p className="text-2xl font-bold text-orange-600">{transactions.length}</p>
                  <p className="text-sm text-orange-600">Transactions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Test Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-500" />
                Test Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Earn Points from Order */}
              <div>
                <h4 className="font-medium mb-2">Simulate Order</h4>
                <div className="space-y-2">
                  <Input
                    value={orderAmount}
                    onChange={(e) => setOrderAmount(e.target.value)}
                    placeholder="Order amount (₹)"
                    type="number"
                  />
                  <Button onClick={handleEarnPoints} className="w-full">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Earn Points from Order
                  </Button>
                </div>
              </div>

              {/* Award Bonus Points */}
              <div>
                <h4 className="font-medium mb-2">Award Bonus Points</h4>
                <div className="space-y-2">
                  <Input
                    value={bonusPoints}
                    onChange={(e) => setBonusPoints(e.target.value)}
                    placeholder="Bonus points"
                    type="number"
                  />
                  <Input
                    value={bonusReason}
                    onChange={(e) => setBonusReason(e.target.value)}
                    placeholder="Reason for bonus"
                  />
                  <Button onClick={handleAwardBonus} className="w-full" variant="outline">
                    <Gift className="w-4 h-4 mr-2" />
                    Award Bonus Points
                  </Button>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h4 className="font-medium mb-2">Quick Actions</h4>
                <div className="space-y-2">
                  <Button onClick={simulateMultipleOrders} className="w-full" variant="outline">
                    <Star className="w-4 h-4 mr-2" />
                    Simulate Multiple Orders
                  </Button>
                  <Button onClick={refreshLoyaltyData} className="w-full" variant="outline">
                    <Coins className="w-4 h-4 mr-2" />
                    Refresh Data
                  </Button>
                  <Button onClick={clearAllData} variant="destructive" className="w-full">
                    Clear All Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Rewards */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-purple-500" />
                Test Rewards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {LOYALTY_REWARDS.slice(0, 4).map((reward) => (
                <div key={reward.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h5 className="font-medium text-sm">{reward.name}</h5>
                      <p className="text-xs text-gray-600">{reward.description}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {reward.pointsCost} pts
                    </Badge>
                  </div>
                  <Button
                    onClick={() => handleRedeemReward(reward.id)}
                    disabled={userPoints < reward.pointsCost}
                    size="sm"
                    className="w-full"
                  >
                    {userPoints >= reward.pointsCost ? 'Redeem' : `Need ${reward.pointsCost - userPoints} more`}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* All Tiers Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>All Loyalty Tiers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              {LOYALTY_TIERS.map((tier) => (
                <div key={tier.name} className={`p-4 rounded-lg text-white ${tier.color}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{tier.icon}</span>
                    <span className="font-bold">{tier.name}</span>
                  </div>
                  <p className="text-sm opacity-90 mb-2">{tier.minPoints}+ points</p>
                  <p className="text-xs opacity-80">{tier.pointsMultiplier}x multiplier</p>
                  <div className="mt-2 space-y-1">
                    {tier.benefits.slice(0, 2).map((benefit, index) => (
                      <p key={index} className="text-xs opacity-90">• {benefit}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Debug Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Debug Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Recent Transactions</h4>
                <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-40">
                  {JSON.stringify(transactions.slice(0, 5), null, 2)}
                </pre>
              </div>
              <div>
                <h4 className="font-medium mb-2">All Loyalty Data</h4>
                <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-40">
                  {JSON.stringify(JSON.parse(localStorage.getItem('prayan-loyalty-transactions') || '[]'), null, 2)}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TestLoyalty;