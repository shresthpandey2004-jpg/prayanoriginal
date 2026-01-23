import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLoyalty } from '@/context/LoyaltyContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft,
  Star,
  Gift,
  Crown,
  TrendingUp,
  Calendar,
  Award,
  Coins,
  ShoppingBag,
  RefreshCw,
  Zap,
  Target,
  Trophy,
  Sparkles,
  Clock,
  CheckCircle
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { LOYALTY_REWARDS } from '@/utils/loyaltyUtils';

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
    getPointsValue,
    createLoyaltyCoupon,
    isLoading
  } = useLoyalty();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [bonusCode, setBonusCode] = useState('');
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
    const reward = LOYALTY_REWARDS.find(r => r.id === rewardId);
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
      // Create coupon
      const coupon = createLoyaltyCoupon(rewardId);
      
      // Save coupon to localStorage
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

  const handleBonusCode = () => {
    // Simulate bonus code validation
    const validCodes = {
      'WELCOME50': 50,
      'BIRTHDAY100': 100,
      'REVIEW25': 25,
      'SOCIAL20': 20
    };

    const points = validCodes[bonusCode.toUpperCase()];
    if (points) {
      // This would normally be handled by the backend
      toast({
        title: "Bonus code applied! 🎁",
        description: `You earned ${points} bonus points!`,
      });
      setBonusCode('');
    } else {
      toast({
        title: "Invalid code",
        description: "Please check your bonus code and try again.",
        variant: "destructive"
      });
    }
  };
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-8">
            <Crown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Login Required</h2>
            <p className="text-gray-600 mb-6">Please login to access your loyalty rewards.</p>
            <div className="space-y-3">
              <Button onClick={() => navigate('/auth')} className="w-full">
                Login / Register
              </Button>
              <Button variant="outline" onClick={() => navigate('/')} className="w-full">
                Continue Shopping
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAuthenticated) {

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-gray-800">Loyalty Rewards</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleManualRefresh}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Badge variant="outline" className="text-xs">
              Last updated: {new Date(lastRefresh).toLocaleTimeString()}
            </Badge>
          </div>
        </div>

        {/* Loyalty Status Card */}
        <Card className="mb-8 overflow-hidden relative">
          <div className={`${userTier.color} text-white p-6 relative`}>
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 text-6xl">{userTier.icon}</div>
              <Sparkles className="absolute bottom-4 left-4 w-8 h-8 animate-pulse" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-2xl">{userTier.icon}</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{userTier.name} Member</h2>
                    <p className="text-white/90">Welcome back, {user?.name}!</p>
                    <Badge className="mt-1 bg-white/20 text-white border-white/30">
                      {userTier.pointsMultiplier}x Points Multiplier
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold flex items-center gap-2">
                    <Coins className="w-8 h-8" />
                    {userPoints.toLocaleString()}
                  </div>
                  <div className="text-white/90 text-lg">Points Available</div>
                  <div className="text-sm bg-white/20 rounded-full px-3 py-1 mt-1">
                    Worth ₹{pointsValue}
                  </div>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm">
                  <div className="text-xl font-bold">{lifetimeEarned.toLocaleString()}</div>
                  <div className="text-xs text-white/80">Lifetime Earned</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm">
                  <div className="text-xl font-bold">{totalRedeemed.toLocaleString()}</div>
                  <div className="text-xs text-white/80">Total Redeemed</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm">
                  <div className="text-xl font-bold">{transactions.length}</div>
                  <div className="text-xs text-white/80">Transactions</div>
                </div>
              </div>
            </div>
          </div>
          
          {nextTier && (
            <CardContent className="p-6 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-orange-600" />
                  <span className="font-medium">Progress to {nextTier.name}</span>
                  <span className="text-2xl">{nextTier.icon}</span>
                </div>
                <span className="text-sm text-gray-600 font-medium">
                  {progress.current.toLocaleString()} / {progress.required.toLocaleString()} points
                </span>
              </div>
              <Progress value={progress.percentage} className="h-4 mb-3" />
              <div className="flex items-center justify-between text-sm">
                <p className="text-gray-600">
                  Earn {(progress.required - progress.current).toLocaleString()} more points to unlock {nextTier.name} benefits
                </p>
                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                  {Math.round(progress.percentage)}% Complete
                </Badge>
              </div>
            </CardContent>
          )}
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Available Rewards */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-purple-500" />
                  Available Rewards
                  <Badge className="ml-2 bg-purple-100 text-purple-700">
                    {availableRewards.length} Available
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {availableRewards.length > 0 ? (
                  <div className="grid gap-4">
                    {availableRewards.map((reward) => (
                      <div key={reward.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-lg">{reward.name}</h4>
                            <p className="text-gray-600 text-sm">{reward.description}</p>
                            {reward.minOrderValue && (
                              <p className="text-xs text-orange-600 mt-1">
                                Min order: ₹{reward.minOrderValue}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className="mb-2">
                              {reward.pointsCost} points
                            </Badge>
                            <div className="text-sm text-gray-500">
                              Worth ₹{reward.value}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            Valid for {reward.validityDays} days
                          </div>
                          <Button
                            onClick={() => handleRedeemReward(reward.id)}
                            disabled={!canRedeem(reward.pointsCost) || isLoading}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                          >
                            {canRedeem(reward.pointsCost) ? 'Redeem Now' : `Need ${reward.pointsCost - userPoints} more`}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No rewards available</h3>
                    <p className="text-gray-600 mb-4">Earn more points to unlock rewards!</p>
                    <Button onClick={() => navigate('/shop')}>
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Start Shopping
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tier Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-orange-500" />
                  Your {userTier.name} Benefits
                  <span className="text-2xl ml-2">{userTier.icon}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userTier.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="font-medium text-green-800">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Points History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-blue-500" />
                  Points History
                  <Badge variant="outline" className="ml-2">
                    {transactions.length} transactions
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {transactions.slice(0, 20).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          transaction.type === 'earned' ? 'bg-green-100' : 
                          transaction.type === 'bonus' ? 'bg-blue-100' :
                          transaction.type === 'redeemed' ? 'bg-red-100' : 'bg-gray-100'
                        }`}>
                          {transaction.type === 'earned' ? (
                            <TrendingUp className="w-6 h-6 text-green-600" />
                          ) : transaction.type === 'bonus' ? (
                            <Zap className="w-6 h-6 text-blue-600" />
                          ) : transaction.type === 'redeemed' ? (
                            <Gift className="w-6 h-6 text-red-600" />
                          ) : (
                            <Clock className="w-6 h-6 text-gray-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            {new Date(transaction.timestamp).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                          {transaction.expiryDate && (
                            <div className="text-xs text-orange-600 mt-1">
                              Expires: {new Date(transaction.expiryDate).toLocaleDateString('en-IN')}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className={`font-bold text-lg ${
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
                      <Button onClick={() => navigate('/shop')}>
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Start Shopping
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Bonus Code Entry */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  Bonus Code
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Input
                    value={bonusCode}
                    onChange={(e) => setBonusCode(e.target.value.toUpperCase())}
                    placeholder="Enter bonus code"
                    className="font-mono"
                  />
                </div>
                <Button 
                  onClick={handleBonusCode}
                  disabled={!bonusCode.trim() || isLoading}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Apply Code
                </Button>
                <div className="text-xs text-gray-500 space-y-1">
                  <p>• WELCOME50 - 50 points</p>
                  <p>• BIRTHDAY100 - 100 points</p>
                  <p>• REVIEW25 - 25 points</p>
                </div>
              </CardContent>
            </Card>

            {/* How to Earn Points */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How to Earn Points</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <ShoppingBag className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Shop & Earn</h4>
                    <p className="text-sm text-gray-600">
                      Earn {userTier.pointsMultiplier}x points per ₹10 spent ({userTier.name} tier)
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Write Reviews</h4>
                    <p className="text-sm text-gray-600">Get 50 points for each product review</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Gift className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Refer Friends</h4>
                    <p className="text-sm text-gray-600">Earn 100 points for each successful referral</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Special Events</h4>
                    <p className="text-sm text-gray-600">Bonus points during festivals and promotions</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => navigate('/referrals')}
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <Gift className="w-4 h-4 mr-2" />
                  Refer Friends
                </Button>
                
                <Button 
                  onClick={() => navigate('/shop')}
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Shop Now
                </Button>
                
                <Button 
                  onClick={() => navigate('/my-orders')}
                  variant="outline" 
                  className="w-full justify-start"
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  My Orders
                </Button>
              </CardContent>
            </Card>

            {/* All Tiers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">All Tiers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: 'Bronze', points: '0+', color: 'bg-gradient-to-r from-amber-600 to-amber-700', icon: '🥉', multiplier: '1x' },
                  { name: 'Silver', points: '500+', color: 'bg-gradient-to-r from-gray-400 to-gray-500', icon: '🥈', multiplier: '1.5x' },
                  { name: 'Gold', points: '1,500+', color: 'bg-gradient-to-r from-yellow-500 to-yellow-600', icon: '🥇', multiplier: '2x' },
                  { name: 'Platinum', points: '3,000+', color: 'bg-gradient-to-r from-purple-600 to-purple-700', icon: '💎', multiplier: '3x' }
                ].map((tier) => (
                  <div key={tier.name} className={`p-4 rounded-lg text-white ${tier.color} ${
                    userTier.name === tier.name ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-100' : ''
                  } transition-all duration-300`}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{tier.icon}</span>
                        <span className="font-medium">{tier.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm">{tier.points} pts</div>
                        <div className="text-xs opacity-80">{tier.multiplier} points</div>
                      </div>
                    </div>
                    {userTier.name === tier.name && (
                      <Badge className="bg-white/20 text-white border-white/30">
                        <Crown className="w-3 h-3 mr-1" />
                        Current Tier
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loyalty;