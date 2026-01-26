import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, LogOut, ArrowLeft } from 'lucide-react';

const Account = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-8">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Please Login</h2>
            <p className="text-gray-600 mb-6">You need to login to access your account.</p>
            <div className="space-y-4">
              <Button 
                onClick={() => navigate('/auth')} 
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 px-6 rounded-xl font-semibold text-base min-h-[48px] shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ WebkitTapHighlightColor: 'transparent', outline: 'none', border: 'none' }}
              >
                Login / Register
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/')} 
                className="w-full py-3 px-6 rounded-xl font-semibold text-base min-h-[48px] bg-white hover:bg-gray-50 text-gray-700 shadow-md hover:shadow-lg transition-all duration-300"
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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8 account-page">
      <div className="container mx-auto px-4 max-w-2xl">
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
          <h1 className="text-3xl font-bold text-gray-800">My Account</h1>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <CardTitle>{user?.name}</CardTitle>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-4 mb-6">
              <Button 
                onClick={() => navigate('/my-orders')} 
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 px-6 rounded-xl font-semibold text-base min-h-[48px] shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ WebkitTapHighlightColor: 'transparent', outline: 'none', border: 'none' }}
              >
                My Orders
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/shop')} 
                className="w-full py-3 px-6 rounded-xl font-semibold text-base min-h-[48px] bg-white hover:bg-gray-50 text-gray-700 shadow-md hover:shadow-lg transition-all duration-300"
                style={{ WebkitTapHighlightColor: 'transparent', outline: 'none', border: 'none' }}
              >
                Continue Shopping
              </Button>
            </div>
            
            <div className="pt-4">
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-base min-h-[48px] bg-white hover:bg-gray-50 text-gray-700 shadow-md hover:shadow-lg transition-all duration-300"
                style={{ WebkitTapHighlightColor: 'transparent', outline: 'none', border: 'none' }}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Account;