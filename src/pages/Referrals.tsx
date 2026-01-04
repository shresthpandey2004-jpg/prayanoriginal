import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useReferrals } from '@/context/ReferralContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Share2, 
  Copy, 
  Gift, 
  Users, 
  IndianRupee, 
  ArrowLeft,
  MessageCircle,
  Mail,
  CheckCircle
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Referrals = () => {
  const { user, isAuthenticated } = useAuth();
  const { userReferralCode, getReferralStats } = useReferrals();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-8">
            <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Login Required</h2>
            <p className="text-gray-600 mb-6">Please login to access your referral program.</p>
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

  const stats = getReferralStats();
  const referralLink = `https://prayanmasale.vercel.app/?ref=${userReferralCode}`;

  const copyReferralCode = () => {
    navigator.clipboard.writeText(userReferralCode);
    setCopied(true);
    toast({
      title: "Referral code copied! 📋",
      description: "Share this code with your friends to earn rewards.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Referral link copied! 🔗",
      description: "Share this link with your friends to earn rewards.",
    });
  };

  const shareWhatsApp = () => {
    const message = `🌶️ Hey! I found this amazing spice store - Prayan Masale! 

They have premium quality Indian spices with authentic taste. 

Use my referral code: *${userReferralCode}* and get special discount on your first order!

Shop here: ${referralLink}

Trust me, their spices are amazing! 😋`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
    window.open(url, '_blank');
  };

  const shareTwitter = () => {
    const text = `Check out Prayan Masale - Premium Indian Spices! Use my referral code ${userReferralCode} for special discount. ${referralLink}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const shareEmail = () => {
    const subject = 'Try Prayan Masale - Premium Indian Spices!';
    const body = `Hi!

I wanted to share this amazing spice store I discovered - Prayan Masale!

They have premium quality Indian spices sourced directly from farmers. The taste is absolutely authentic and fresh.

Use my referral code: ${userReferralCode}
Or click this link: ${referralLink}

You'll get a special discount on your first order, and I'll earn some rewards too! 😊

Happy cooking!
${user?.name}`;

    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Refer & Earn</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* How it Works */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-orange-500" />
                  How Referral Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Share Your Code</h4>
                    <p className="text-sm text-gray-600">Share your unique referral code with friends and family.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Friend Places Order</h4>
                    <p className="text-sm text-gray-600">Your friend uses your code and places their first order.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Both Get Rewards!</h4>
                    <p className="text-sm text-gray-600">You earn ₹100 credit, your friend gets 10% discount!</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Referral Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  Your Referral Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{stats.totalReferrals}</p>
                    <p className="text-sm text-blue-600">Total Referrals</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">₹{stats.totalEarnings}</p>
                    <p className="text-sm text-green-600">Total Earned</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">{stats.completedReferrals}</p>
                    <p className="text-sm text-purple-600">Successful</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">{stats.pendingReferrals}</p>
                    <p className="text-sm text-orange-600">Pending</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Share Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-green-500" />
                  Share & Earn ₹100
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Referral Code */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Your Referral Code</label>
                  <div className="flex gap-2">
                    <Input 
                      value={userReferralCode} 
                      readOnly 
                      className="font-mono text-lg font-bold text-center bg-gray-50"
                    />
                    <Button 
                      onClick={copyReferralCode}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                </div>

                {/* Referral Link */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Your Referral Link</label>
                  <div className="flex gap-2">
                    <Input 
                      value={referralLink} 
                      readOnly 
                      className="text-sm bg-gray-50"
                    />
                    <Button 
                      onClick={copyReferralLink}
                      variant="outline"
                      size="sm"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Share Buttons */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Share with Friends</label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      onClick={shareWhatsApp}
                      className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </Button>
                    
                    <Button 
                      onClick={shareFacebook}
                      className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                    >
                      <Share2 className="w-4 h-4" />
                      Facebook
                    </Button>
                    
                    <Button 
                      onClick={shareTwitter}
                      className="bg-sky-500 hover:bg-sky-600 text-white flex items-center gap-2"
                    >
                      <Share2 className="w-4 h-4" />
                      Twitter
                    </Button>
                    
                    <Button 
                      onClick={shareEmail}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Email
                    </Button>
                  </div>
                </div>

                {/* Reward Info */}
                <div className="bg-gradient-to-r from-orange-100 to-red-100 p-4 rounded-lg border border-orange-200">
                  <div className="flex items-center gap-2 mb-2">
                    <IndianRupee className="w-5 h-5 text-orange-600" />
                    <h4 className="font-semibold text-orange-800">Earn ₹100 per Referral!</h4>
                  </div>
                  <p className="text-sm text-orange-700">
                    For every friend who places their first order using your code, you earn ₹100 credit 
                    that can be used on your next purchase!
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Terms */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Terms & Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Referral reward is credited after friend's first successful order</li>
                  <li>• Minimum order value of ₹299 required for referral to be valid</li>
                  <li>• Reward credits expire after 6 months if unused</li>
                  <li>• Self-referrals are not allowed</li>
                  <li>• Maximum 10 referrals per month per user</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referrals;