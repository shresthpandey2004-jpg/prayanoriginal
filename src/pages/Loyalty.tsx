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

  const handleBonusCode = () => {
    const validCodes = {
      'WELCOME50': 50,
      'BIRTHDAY100': 100,
      'REVIEW25': 25,
      'SOCIAL20': 20
    };

    const points = validCodes[bonusCode.toUpperCase()];
    if (points) {
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-sm mx-auto md:max-w-md">
          <CardContent className="text-center p-6 md:p-8">
            <Crown className="w-12 h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Login Required</h2>
            <p className="text-gray-600 mb-6 text-sm md:text-base">Please login to access your loyalty rewards.</p>
            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/auth')} 
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 py-3"
                style={{ WebkitTapHighlightColor: 'transparent', outline: 'none', border: 'none' }}
              >
                Login / Register
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/')} 
                className="w-full py-3"
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-4 px-4 md:py-8 loyalty-page">
      <div className="max-w-md mx-auto md:max-w-6xl md:container md:mx-auto md:px-4">
        {/* Header - Mobile simple, Desktop enhanced */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div className="flex items-center gap-3 md:gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="p-2 md:flex md:items-center md:gap-2"
              style={{ WebkitTapHighlightColor: 'transparent', outline: 'none', border: 'none' }}
            >
              <ArrowLeft className="w-5 h-5 md:w-4 md:h-4" />
              <span className="hidden md:inline">Back</span>
            </Button>
            <h1 className="text-xl font-bold text-gray-800 md:text-3xl">Loyalty Rewards</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleManualRefresh}
              disabled={isLoading}
              className="p-2 md:flex md:items-center md:gap-2"
              style={{ WebkitTapHighlightColor: 'transparent', outline: 'none', border: 'none' }}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden md:inline">Refresh</span>
            </Button>
            <Badge variant="outline" className="text-xs hidden md:inline-flex">
              Last updated: {new Date(lastRefresh).toLocaleTimeString()}
            </Badge>
          </div>
        </div>

        {/* Main Status Card - Mobile simple, Desktop enhanced */}
        <Card className="mb-6 md:mb-8 overflow-hidden relative">
          <div className={`${userTier.color} text-white p-4 md:p-6 relative`}>
            {/* Animated background elements - Desktop only */}
            <div className="absolute inset-0 opacity-10 hidden md:block">
              <div className="absolute top-4 right-4 text-6xl">{userTier.icon}</div>
              <Sparkles className="absolute bottom-4 left-4 w-8 h-8 animate-pulse" />
            </div>

            <div className="relative z-10">
              {/* Mobile Layout */}
              <div className="md:hidden">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">{userTier.icon}</span>
                  </div>
                  <h2 className="text-lg font-bold mb-1">{userTier.name} Member</h2>
                  <p className="text-white/90 text-sm mb-3">Welcome back, {user?.name}!</p>
                  
                  <div className="bg-white/10 rounded-lg p-3 mb-3">
                    <div className="text-2xl font-bold flex items-center justify-center gap-2">
                      <Coins className="w-5 h-5" />
                      {userPoints.toLocaleString()}
                    </div>
                    <div className="text-white/90 text-sm">Points Available</div>
                    <div className="text-xs bg-white/20 rounded-full px-2 py-1 mt-1 inline-block">
                      Worth ₹{pointsValue}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-white/10 rounded-lg p-2">
                      <div className="text-sm font-bold">{lifetimeEarned}</div>
                      <div className="text-xs text-white/80">Earned</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-2">
                      <div className="text-sm font-bold">{totalRedeemed}</div>
                      <div className="text-xs text-white/80">Used</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-2">
                      <div className="text-sm font-bold">{userTier.pointsMultiplier}x</div>
                      <div className="text-xs text-white/80">Multiplier</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:block">
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

                {/* Desktop Quick Stats */}
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
          </div>
          
          {/* Progress to Next Tier */}
          {nextTier && (
            <CardContent className="p-4 md:p-6 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />
                  <span className="font-medium text-sm md:text-base">
                    <span className="md:hidden">Next: {nextTier.name}</span>
                    <span className="hidden md:inline">Progress to {nextTier.name}</span>
                  </span>
                  <span className="text-lg md:text-2xl">{nextTier.icon}</span>
                </div>
                <span className="text-xs md:text-sm text-gray-600 font-medium">
                  {progress.current.toLocaleString()} / {progress.required.toLocaleString()} pts
                </span>
              </div>
              <Progress value={progress.percentage} className="h-2 md:h-4 mb-2 md:mb-3" />
              <div className="flex items-center justify-between text-xs md:text-sm">
                <p className="text-gray-600">
                  <span className="md:hidden">{(progress.required - progress.current)} more points needed</span>
                  <span className="hidden md:inline">Earn {(progress.required - progress.current).toLocaleString()} more points to unlock {nextTier.name} benefits</span>
                </p>
                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 hidden md:inline-flex">
                  {Math.round(progress.percentage)}% Complete
                </Badge>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Mobile Layout - Single Column */}
        <div className="md:hidden space-y-6">
          {/* Available Rewards - Mobile */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Gift className="w-5 h-5 text-purple-500" />
                Available Rewards
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {availableRewards.length > 0 ? (
                <div className="space-y-3">
                  {availableRewards.slice(0, 2).map((reward) => (
                    <div key={reward.id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1 pr-3">
                          <h4 className="font-semibold text-sm mb-1 leading-tight">{reward.name}</h4>
                          <p className="text-xs text-gray-600 mb-2 leading-tight">{reward.description}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs px-2 py-1">
                              {reward.pointsCost} pts
                            </Badge>
                            <span className="text-xs text-gray-500">₹{reward.value}</span>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleRedeemReward(reward.id)}
                          disabled={!canRedeem(reward.pointsCost) || isLoading}
                          size="sm"
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-xs px-3 py-2 h-auto whitespace-nowrap"
                          style={{ WebkitTapHighlightColor: 'transparent', outline: 'none', border: 'none' }}
                        >
                          {canRedeem(reward.pointsCost) ? 'Redeem' : 'Need More'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Gift className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">No rewards yet</h3>
                  <p className="text-gray-600 text-sm mb-4">Earn more points to unlock rewards!</p>
                  <Button 
                    onClick={() => navigate('/shop')}
                    size="sm"
                    style={{ WebkitTapHighlightColor: 'transparent', outline: 'none', border: 'none' }}
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Start Shopping
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Your Benefits - Mobile */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Your {userTier.name} Benefits
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {userTier.benefits.slice(0, 3).map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-green-800 leading-tight">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* How to Earn - Mobile */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">How to Earn Points</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <ShoppingBag className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Shop & Earn</h4>
                    <p className="text-xs text-gray-600">
                      {userTier.pointsMultiplier}x points per ₹10 spent
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Write Reviews</h4>
                    <p className="text-xs text-gray-600">50 points per review</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Action - Mobile */}
          <div className="text-center">
            <Button 
              onClick={() => navigate('/shop')}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 py-3"
              style={{ WebkitTapHighlightColor: 'transparent', outline: 'none', border: 'none' }}
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Start Shopping to Earn Points
            </Button>
          </div>
        </div>

        {/* Desktop Layout - 3 Column Grid */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-8">
          {/* Main Content - 2 Columns */}
          <div className="md:col-span-2 space-y-6">
            {/* Available Rewards - Desktop */}
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
                            style={{ WebkitTapHighlightColor: 'transparent', outline: 'none', border: 'none' }}
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

            {/* Tier Benefits - Desktop */}
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

            {/* Points History - Desktop */}
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

          {/* Sidebar - Desktop Only */}
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
                  style={{ WebkitTapHighlightColor: 'transparent', outline: 'none', border: 'none' }}
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
                  onClick={() => navigate('/shop')}
                  variant="outline"
                  className="w-full justify-start"
                  style={{ WebkitTapHighlightColor: 'transparent', outline: 'none', border: 'none' }}
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Shop Now
                </Button>

                <Button
                  onClick={() => navigate('/my-orders')}
                  variant="outline"
                  className="w-full justify-start"
                  style={{ WebkitTapHighlightColor: 'transparent', outline: 'none', border: 'none' }}
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