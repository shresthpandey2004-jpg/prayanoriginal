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
  Coins,
  ShoppingBag,
  RefreshCw,
  Target,
  CheckCircle
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Loyalty = () => {
  const { user, isAuthenticated } = useAuth();
  const { 
    userPoints, 
    userTier, 
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

  useEffect(() => {
    const interval = setInterval(() => {
      refreshLoyaltyData();
    }, 30000);
    return () => clearInterval(interval);
  }, [refreshLoyaltyData]);

  const handleRedeemReward = async (rewardId: string) => {
    const reward = availableRewards.find(r => r.id === rewardId);
    if (!reward) return;

    if (!canRedeem(reward.pointsCost)) {
      toast({
        title: "Need more points",
        description: `You need ${reward.pointsCost} points to redeem this.`,
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
        description: `Coupon code: ${coupon.code}`,
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-sm mx-auto">
          <CardContent className="text-center p-6">
            <Crown className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-3">Login Required</h2>
            <p className="text-gray-600 mb-6 text-sm">Please login to access loyalty rewards.</p>
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-4 px-4">
      <div className="max-w-md mx-auto">
        {/* Simple Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="p-2"
              style={{ WebkitTapHighlightColor: 'transparent', outline: 'none', border: 'none' }}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-gray-800">Loyalty Rewards</h1>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => refreshLoyaltyData()}
            disabled={isLoading}
            className="p-2"
            style={{ WebkitTapHighlightColor: 'transparent', outline: 'none', border: 'none' }}
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        {/* Main Status Card - Super Simple */}
        <Card className="mb-6 overflow-hidden">
          <div className={`${userTier.color} text-white p-4`}>
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
          
          {/* Progress to Next Tier - Simple */}
          {nextTier && (
            <CardContent className="p-4 bg-white">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-orange-600" />
                  <span className="font-medium text-sm">Next: {nextTier.name}</span>
                  <span className="text-lg">{nextTier.icon}</span>
                </div>
                <span className="text-xs text-gray-600">
                  {progress.current} / {progress.required}
                </span>
              </div>
              <Progress value={progress.percentage} className="h-2 mb-2" />
              <p className="text-xs text-gray-600 text-center">
                {(progress.required - progress.current)} more points needed
              </p>
            </CardContent>
          )}
        </Card>

        {/* Available Rewards - Super Simple */}
        <Card className="mb-6">
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

        {/* Your Benefits - Simple */}
        <Card className="mb-6">
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

        {/* How to Earn - Simple */}
        <Card className="mb-6">
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

        {/* Quick Action */}
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
    </div>
  );
};

export default Loyalty;