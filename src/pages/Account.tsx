import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useOrders } from '@/context/OrderContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Package, 
  Heart, 
  Settings, 
  LogOut,
  Edit,
  Save,
  X,
  ArrowLeft,
  Calendar,
  ShoppingBag
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Account = () => {
  const { user, logout, updateProfile, isAuthenticated } = useAuth();
  const { orders } = useOrders();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: {
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      pincode: user?.address?.pincode || ''
    }
  });

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

  const userOrders = orders.filter(order => order.customerDetails.email === user?.email);
  const recentOrders = userOrders.slice(0, 5);

  const handleSaveProfile = () => {
    updateProfile({
      name: editData.name,
      phone: editData.phone,
      address: editData.address
    });
    setIsEditing(false);
    toast({
      title: "Profile updated!",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8 account-page">
      <div className="container mx-auto px-4 max-w-6xl">
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
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
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">{userOrders.length}</p>
                    <p className="text-sm text-gray-600">Total Orders</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{userOrders.reduce((sum, order) => sum + order.totalPrice, 0)}
                    </p>
                    <p className="text-sm text-gray-600">Total Spent</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Member since {new Date(user?.createdAt || '').toLocaleDateString('en-IN')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>Last login: {new Date(user?.lastLogin || '').toLocaleDateString('en-IN')}</span>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="w-5 h-5" />
                        Profile Information
                      </CardTitle>
                      {!isEditing ? (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setIsEditing(true)}
                          className="flex items-center gap-2"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </Button>
                      ) : (
                        <div className="flex gap-2">
                          <Button 
                            size="sm"
                            onClick={handleSaveProfile}
                            className="flex items-center gap-2"
                          >
                            <Save className="w-4 h-4" />
                            Save
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setIsEditing(false)}
                            className="flex items-center gap-2"
                          >
                            <X className="w-4 h-4" />
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            id="name"
                            value={isEditing ? editData.name : user?.name}
                            onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                            disabled={!isEditing}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            id="phone"
                            value={isEditing ? editData.phone : user?.phone}
                            onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                            disabled={!isEditing}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="email"
                          value={user?.email}
                          disabled
                          className="pl-10 bg-gray-50"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </div>

                    <div>
                      <Label>Address</Label>
                      <div className="grid md:grid-cols-2 gap-4 mt-2">
                        <div>
                          <Input
                            placeholder="Street Address"
                            value={isEditing ? editData.address.street : user?.address?.street || ''}
                            onChange={(e) => setEditData(prev => ({ 
                              ...prev, 
                              address: { ...prev.address, street: e.target.value }
                            }))}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <Input
                            placeholder="City"
                            value={isEditing ? editData.address.city : user?.address?.city || ''}
                            onChange={(e) => setEditData(prev => ({ 
                              ...prev, 
                              address: { ...prev.address, city: e.target.value }
                            }))}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <Input
                            placeholder="State"
                            value={isEditing ? editData.address.state : user?.address?.state || ''}
                            onChange={(e) => setEditData(prev => ({ 
                              ...prev, 
                              address: { ...prev.address, state: e.target.value }
                            }))}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <Input
                            placeholder="Pincode"
                            value={isEditing ? editData.address.pincode : user?.address?.pincode || ''}
                            onChange={(e) => setEditData(prev => ({ 
                              ...prev, 
                              address: { ...prev.address, pincode: e.target.value }
                            }))}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Recent Orders
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {recentOrders.length === 0 ? (
                      <div className="text-center py-8">
                        <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                        <p className="text-gray-600 mb-6 px-4">Start shopping to see your orders here!</p>
                        <Button 
                          onClick={() => navigate('/shop')}
                          className="w-full max-w-xs mx-auto bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 px-6 rounded-xl font-semibold text-base min-h-[48px] shadow-lg hover:shadow-xl transition-all duration-300"
                          style={{ WebkitTapHighlightColor: 'transparent', outline: 'none', border: 'none' }}
                        >
                          Continue Shopping
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {recentOrders.map((order) => (
                          <div key={order.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-semibold">Order #{order.id}</h4>
                                <p className="text-sm text-gray-600">
                                  {new Date(order.timestamp).toLocaleDateString('en-IN')}
                                </p>
                              </div>
                              <Badge className={
                                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                order.status === 'confirmed' ? 'bg-purple-100 text-purple-800' :
                                'bg-yellow-100 text-yellow-800'
                              }>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {order.items.length} items • ₹{order.totalPrice}
                            </p>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => navigate(`/order-confirmation/${order.id}`)}
                            >
                              View Details
                            </Button>
                          </div>
                        ))}
                        
                        {userOrders.length > 5 && (
                          <Button 
                            variant="outline" 
                            onClick={() => navigate('/my-orders')}
                            className="w-full"
                          >
                            View All Orders ({userOrders.length})
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5" />
                      Shopping Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Favorite Categories</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {['Pure Spices', 'Blended Spices', 'Whole Spices', 'Combo Packs'].map(category => (
                            <Badge key={category} variant="outline" className="cursor-pointer">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <Label>Dietary Preferences</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {['Vegetarian', 'Vegan', 'Organic Only', 'No Artificial Colors'].map(pref => (
                            <Badge key={pref} variant="outline" className="cursor-pointer">
                              {pref}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4">
                        <Button className="w-full">Save Preferences</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;