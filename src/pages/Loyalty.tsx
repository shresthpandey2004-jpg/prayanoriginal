import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLoyalty } from '@/context/LoyaltyContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft,
  Star,
  Gift,
  Crown,
  TrendingUp,
  Award,
  Coins,
  ShoppingBag,
  RefreshCw,
  Target,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Loyalty = () => {
  const { user, isAuthenticated } = useAuth();
  const { 
    userPoints, 
    userTier, 
    transactions, 
    lifetimeEarned,
    totalRedeemed,
    pointsValue,
    nextTier, 
    progress,
    availableRewards,
    redeemPoints,
    refreshLoyaltyData,
    canRedeem,
    createLoyaltyCoupon,
    isLoading
  } = useLoyalty();
  const navigate = useNavigate();
  const [lastRefresh, setLastRefresh] = useState(Date.now());

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshLoyaltyData();
      setLastRefresh(Date.now());
    }, 30000);

    return () => clearInterval(interval);
  }, [refreshLoyaltyData]);

  const handleRedeemReward = async (rewardId: string) => {
    const reward = availableRewards.find(r => r.id === rewardId);
    if (!reward) return;

    if (!canRedeem(reward.pointsCost)) {
      toast({
        title: "Insufficient points",
        description: `You need ${reward.pointsCost} points to redeem this reward.`,
        variant: "destructive"
      });
      return;
    }

    const success = redeemPoints(rewardId);
    if (success) {
      const coupon = createLoyaltyCoupon(rewardId);
      
      const existingCoupons = JSON.parse(localStorage.getItem('prayan-coupons') || '[]');
      existingCoupons.push(coupon);
      localStorage.setItem('prayan-coupons', JSON.stringify(existingCoupons));

      toast({
        title: "Reward redeemed! 🎉",
        description: `Your ${reward.name} coupon code: ${coupon.code}`,
      });
    } else {
      toast({
        title: "Redemption failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleManualRefresh = () => {
    refreshLoyaltyData();
    setLastRefresh(Date.now());
    toast({
      title: "Data refreshed! 🔄",
      description: "Your loyalty data has been updated.",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-8">
            <Crown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Login Required</h2>
            <p className="text-gray-600 mb-6">Please login to access your loyalty rewards.</p>
            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/auth')} 
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                style={{ WebkitTapHighlightColor: 'transparent', outline: 'none', border: 'none' }}
              >
                Login / Register
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/')} 
                className="w-full"
                style={{ WebkitTapHighlightColor: 'transparent', outline: 'none', border: 'none' }}
              >
                Continue Shopping
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-4 sm:py-8 loyalty-page">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Clean Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 p-2"
              style={{ WebkitTapHighlightColor: 'transparent', outline: 'none', border: 'none' }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Loyalty Rewards</h1>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleManualRefresh}
            disabled={isLoading}
            className="flex items-center gap-2"
            style={{ WebkitTapHighlightColor: 'transparent', outline: 'none', border: 'none' }}
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Main Status Card - Clean & Simple */}
        <Card className="mb-6 overflow-hidden">
          <div className={`${userTier.color} text-white p-6`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">{userTier.icon}</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold">{userTier.name} Member</h2>
                  <p className="text-white/90">Welcome back, {user?.name}!</p>
                  <Badge className="mt-1 bg-white/20 text-white">
                    {userTier.pointsMultiplier}x Points Multiplier
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold flex items-center gap-2">
                  <Coins className="w-6 h-6" />
                  {userPoints.toLocaleString()}
                </div>
                <div className="text-white/90">Points Available</div>
                <div className="text-sm bg-white/20 rounded-full px-3 py-1 mt-1">
                  Worth ₹{pointsValue}
                </div>
              </div>
            </div>
            
            {/* Simple Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">{lifetimeEarned.toLocaleString()}</div>
                <div className="text-xs text-white/80">Lifetime Earned</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">{totalRedeemed.toLocaleString()}</div>
                <div className="text-xs text-white/80">Total Redeemed</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <div className="text-lg font-bold">{transactions.length}</div>
                <div className="text-xs text-white/80">Transactions</div>
              </div>
            </div>
          </div>
          
          {/* Progress to Next Tier */}
          {nextTier && (
            <CardContent className="p-4 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-orange-600" />
                  <span className="font-medium text-sm">Progress to {nextTier.name}</span>
                  <span className="text-lg">{nextTier.icon}</span>
                </div>
                <span className="text-xs text-gray-600 font-medium">
                  {progress.current.toLocaleString()} / {progress.required.toLocaleString()} points
                </span>
              </div>
              <Progress value={progress.percentage} className="h-3 mb-2" />
              <div className="flex items-center justify-between text-xs">
                <p className="text-gray-600">
                  Earn {(progress.required - progress.current).toLocaleString()} more points to unlock {nextTier.name} benefits
                </p>
                <Badge variant="outline" className="bg-orange-50 text-orange-700">
                  {Math.round(progress.percentage)}% Complete
                </Badge>
              </div>
            </CardContent>
          )}
        </Card>

        <div className="space-y-6">
          {/* Available Rewards - Simplified */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Gift className="w-5 h-5 text-purple-500" />
                Available Rewards
                <Badge className="bg-purple-100 text-purple-700">
                  {availableRewards.length} Available
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {availableRewards.length > 0 ? (
                <div className="space-y-4">
                  {availableRewards.slice(0, 3).map((reward) => (
                    <div key={reward.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{reward.name}</h4>
                        <p className="text-sm text-gray-600">{reward.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge variant="outline">{reward.pointsCost} points</Badge>
                          <span className="text-sm text-gray-500">Worth ₹{reward.value}</span>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleRedeemReward(reward.id)}
                        disabled={!canRedeem(reward.pointsCost) || isLoading}
                        className="ml-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        style={{ WebkitTapHighlightColor: 'transparent', outline: 'none', border: 'none' }}
                      >
                        {canRedeem(reward.pointsCost) ? 'Redeem' : `Need ${reward.pointsCost - userPoints} more`}
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No rewards available</h3>
                  <p className="text-gray-600 mb-4">Earn more points to unlock rewards!</p>
                  <Button 
                    onClick={() => navigate('/shop')}
                    style={{ WebkitTapHighlightColor: 'transparent', outline: 'none', border: 'none' }}
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Start Shopping
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Your Benefits - Simplified */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Award className="w-5 h-5 text-orange-500" />
                Your {userTier.name} Benefits
                <span className="text-xl ml-2">{userTier.icon}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {userTier.benefits.slice(0, 4).map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-green-800">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* How to Earn Points - Simplified */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">How to Earn Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Shop & Earn</h4>
                    <p className="text-sm text-gray-600">
                      Earn {userTier.pointsMultiplier}x points per ₹10 spent
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Write Reviews</h4>
                    <p className="text-sm text-gray-600">Get 50 points for each product review</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Special Events</h4>
                    <p className="text-sm text-gray-600">Bonus points during festivals and promotions</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions - Simplified */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Coins className="w-5 h-5 text-blue-500" />
                Recent Activity
                <Badge variant="outline">{transactions.length} transactions</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {transactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        transaction.type === 'earned' ? 'bg-green-100' : 
                        transaction.type === 'bonus' ? 'bg-blue-100' :
                        'bg-red-100'
                      }`}>
                        {transaction.type === 'earned' ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : transaction.type === 'bonus' ? (
                          <Sparkles className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Gift className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{transaction.description}</p>
                        <p className="text-xs text-gray-600">
                          {new Date(transaction.timestamp).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    </div>
                    <div className={`font-bold ${
                      transaction.type === 'earned' || transaction.type === 'bonus' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'earned' || transaction.type === 'bonus' ? '+' : '-'}{transaction.points} pts
                    </div>
                  </div>
                ))}
                
                {transactions.length === 0 && (
                  <div className="text-center py-8">
                    <Coins className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No transactions yet</h3>
                    <p className="text-gray-600 mb-4">Start shopping to earn your first points!</p>
                    <Button 
                      onClick={() => navigate('/shop')}
                      style={{ WebkitTapHighlightColor: 'transparent', outline: 'none', border: 'none' }}
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Start Shopping
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Loyalty;