import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useReferrals } from '@/context/ReferralContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { processReferralRegistration } from '@/utils/referralUtils';
import { completeReferralOnOrder } from '@/utils/orderUtils';

const TestReferral = () => {
  const { user } = useAuth();
  const { userReferralCode, getReferralStats } = useReferrals();
  const [testCode, setTestCode] = useState('');
  const [testUserId, setTestUserId] = useState('');
  const [testUserName, setTestUserName] = useState('');
  const [testUserEmail, setTestUserEmail] = useState('');
  const [orderAmount, setOrderAmount] = useState('500');

  const handleTestReferral = () => {
    if (!testCode || !testUserId || !testUserName || !testUserEmail) {
      alert('Please fill all fields');
      return;
    }

    const result = processReferralRegistration(testCode, testUserId, testUserName, testUserEmail);
    alert(result ? 'Referral processed successfully!' : 'Referral processing failed!');
    
    // Refresh the page to see updated stats
    window.location.reload();
  };

  const handleCompleteReferral = () => {
    if (!testUserId || !orderAmount) {
      alert('Please provide user ID and order amount');
      return;
    }

    const result = completeReferralOnOrder(testUserId, parseFloat(orderAmount));
    alert(result ? 'Referral completed successfully!' : 'No pending referral found or order too small!');
    
    // Refresh the page to see updated stats
    window.location.reload();
  };

  const clearAllData = () => {
    localStorage.removeItem('prayan-referrals');
    localStorage.removeItem('prayan-coupons');
    alert('All referral data cleared!');
    window.location.reload();
  };

  const stats = getReferralStats();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Referral System Test</h1>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Current User Info */}
          <Card>
            <CardHeader>
              <CardTitle>Current User Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p><strong>User ID:</strong> {user?.id || 'Not logged in'}</p>
                <p><strong>Name:</strong> {user?.name || 'Not logged in'}</p>
                <p><strong>Email:</strong> {user?.email || 'Not logged in'}</p>
                <p><strong>Referral Code:</strong> {userReferralCode || 'Not generated'}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded">
                  <p className="text-xl font-bold text-blue-600">{stats.totalReferrals}</p>
                  <p className="text-sm text-blue-600">Total</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded">
                  <p className="text-xl font-bold text-green-600">{stats.completedReferrals}</p>
                  <p className="text-sm text-green-600">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Test Referral Processing */}
          <Card>
            <CardHeader>
              <CardTitle>Test Referral Processing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Referral Code</label>
                <Input
                  value={testCode}
                  onChange={(e) => setTestCode(e.target.value)}
                  placeholder="Enter referral code to test"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Test User ID</label>
                <Input
                  value={testUserId}
                  onChange={(e) => setTestUserId(e.target.value)}
                  placeholder="e.g., 1234567890"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Test User Name</label>
                <Input
                  value={testUserName}
                  onChange={(e) => setTestUserName(e.target.value)}
                  placeholder="e.g., John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Test User Email</label>
                <Input
                  value={testUserEmail}
                  onChange={(e) => setTestUserEmail(e.target.value)}
                  placeholder="e.g., john@example.com"
                />
              </div>
              
              <Button onClick={handleTestReferral} className="w-full">
                Process Test Referral
              </Button>
            </CardContent>
          </Card>

          {/* Test Order Completion */}
          <Card>
            <CardHeader>
              <CardTitle>Test Order Completion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">User ID (who placed order)</label>
                <Input
                  value={testUserId}
                  onChange={(e) => setTestUserId(e.target.value)}
                  placeholder="Same as test user ID above"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Order Amount (₹)</label>
                <Input
                  value={orderAmount}
                  onChange={(e) => setOrderAmount(e.target.value)}
                  placeholder="e.g., 500"
                  type="number"
                />
              </div>
              
              <Button onClick={handleCompleteReferral} className="w-full">
                Complete Referral (Simulate Order)
              </Button>
            </CardContent>
          </Card>

          {/* Debug Info */}
          <Card>
            <CardHeader>
              <CardTitle>Debug Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm">
                <p><strong>All Users:</strong></p>
                <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-32">
                  {JSON.stringify(JSON.parse(localStorage.getItem('prayan-users') || '[]'), null, 2)}
                </pre>
              </div>
              
              <div className="text-sm">
                <p><strong>All Referrals:</strong></p>
                <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-32">
                  {JSON.stringify(JSON.parse(localStorage.getItem('prayan-referrals') || '[]'), null, 2)}
                </pre>
              </div>
              
              <Button onClick={clearAllData} variant="destructive" className="w-full">
                Clear All Referral Data
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TestReferral;