import React, { useState, useEffect } from 'react';
import { useOrders } from '@/context/OrderContext';
import UserService, { UserData } from '@/services/userService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Package, 
  TrendingUp, 
  Users, 
  IndianRupee,
  Search,
  Download,
  Eye,
  Phone,
  MessageCircle,
  Gift,
  BarChart3,
  Award,
  Loader2
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { orders, updateOrderStatus } = useOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Firebase state
  const [allUsers, setAllUsers] = useState<UserData[]>([]);
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newUsersThisMonth: 0,
    totalRevenue: 0
  });
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

  // Load users from Firebase on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setIsLoadingUsers(true);
      console.log('🔄 Loading users from Firebase...');
      
      const users = await UserService.getAllUsers();
      const stats = await UserService.getUserStats();
      
      setAllUsers(users);
      setUserStats(stats);
      
      console.log(`✅ Loaded ${users.length} users from Firebase:`, users);
      console.log('📊 User stats:', stats);
      
      // If no users in Firebase, check localStorage for migration
      if (users.length === 0) {
        const localUsers = JSON.parse(localStorage.getItem('prayan-users') || '[]');
        const localUsersNew = JSON.parse(localStorage.getItem('prayan-users-database') || '[]');
        console.log('📦 LocalStorage users (old key):', localUsers.length);
        console.log('📦 LocalStorage users (new key):', localUsersNew.length);
        
        if (localUsers.length > 0 || localUsersNew.length > 0) {
          console.log('🔄 Found local users, suggesting migration...');
        }
      }
    } catch (error) {
      console.error('❌ Error loading users:', error);
      toast({
        title: "Error",
        description: "Failed to load users from database",
        variant: "destructive"
      });
    } finally {
      setIsLoadingUsers(false);
    }
  };

  // Calculate statistics
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const completedOrders = orders.filter(order => order.status === 'delivered').length;
  const totalUsers = allUsers.length;

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerDetails.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerDetails.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = (orderId: string, newStatus: any) => {
    updateOrderStatus(orderId, newStatus);
    toast({
      title: "Order Updated",
      description: `Order ${orderId} status changed to ${newStatus}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-purple-100 text-purple-800';
      case 'shipped': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const contactCustomer = (order: any, method: 'phone' | 'whatsapp') => {
    if (method === 'phone') {
      window.open(`tel:${order.customerDetails.phone}`);
    } else {
      const message = `Hi ${order.customerDetails.name}, this is regarding your order ${order.id}. How can I help you?`;
      const whatsappUrl = `https://wa.me/${order.customerDetails.phone.replace('+', '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your e-commerce business</p>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-3xl font-bold text-gray-900">{totalOrders}</p>
                  <p className="text-xs text-green-600">+{pendingOrders} pending</p>
                </div>
                <Package className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</p>
                  <p className="text-xs text-green-600">All time</p>
                </div>
                <IndianRupee className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">{totalUsers}</p>
                  <p className="text-xs text-blue-600">{userStats.activeUsers} active</p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed Orders</p>
                  <p className="text-3xl font-bold text-gray-900">{completedOrders}</p>
                  <p className="text-xs text-green-600">Successfully delivered</p>
                </div>
                <Award className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Admin Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{order.customerDetails.name}</p>
                          <p className="text-xs text-gray-600">Order #{order.id.slice(-6)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{order.totalPrice}</p>
                          <Badge className={getStatusColor(order.status)} variant="secondary">
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* User Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle>User Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium">Total Users</span>
                      <span className="text-xl font-bold text-purple-600">{userStats.totalUsers}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">Active Users</span>
                      <span className="text-lg font-bold text-blue-600">{userStats.activeUsers}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">New This Month</span>
                      <span className="text-lg font-bold text-green-600">{userStats.newUsersThisMonth}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <CardTitle>Order Management</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search by Order ID, Customer Name, or Phone..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Orders</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Orders Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium">Order ID</th>
                        <th className="text-left p-4 font-medium">Customer</th>
                        <th className="text-left p-4 font-medium">Items</th>
                        <th className="text-left p-4 font-medium">Amount</th>
                        <th className="text-left p-4 font-medium">Status</th>
                        <th className="text-left p-4 font-medium">Date</th>
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="p-4 font-mono text-sm">{order.id}</td>
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{order.customerDetails.name}</p>
                              <p className="text-sm text-gray-600">{order.customerDetails.phone}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <p className="text-sm">{order.items.length} items</p>
                            <p className="text-xs text-gray-600">
                              {order.items.slice(0, 2).map(item => item.name).join(', ')}
                              {order.items.length > 2 && '...'}
                            </p>
                          </td>
                          <td className="p-4 font-semibold">₹{order.totalPrice}</td>
                          <td className="p-4">
                            <Select
                              value={order.status}
                              onValueChange={(value) => handleStatusUpdate(order.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <Badge className={getStatusColor(order.status)}>
                                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </Badge>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="p-4 text-sm">
                            {new Date(order.timestamp).toLocaleDateString('en-IN')}
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedOrder(order)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => contactCustomer(order, 'phone')}
                              >
                                <Phone className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => contactCustomer(order, 'whatsapp')}
                              >
                                <MessageCircle className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredOrders.length === 0 && (
                  <div className="text-center py-8">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No orders found</h3>
                    <p className="text-gray-600">
                      {searchTerm || statusFilter !== 'all' 
                        ? 'Try adjusting your search or filters.' 
                        : 'No orders have been placed yet.'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>User Management</CardTitle>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={async () => {
                        try {
                          console.log('🧪 Testing Firebase connection...');
                          const testUser = {
                            id: 'test-' + Date.now(),
                            name: 'Test User',
                            email: 'test@firebase.com',
                            phone: '9999999999',
                            password: 'test123',
                            createdAt: new Date().toISOString(),
                            lastLogin: new Date().toISOString(),
                            isActive: true,
                            totalOrders: 0,
                            totalSpent: 0
                          };
                          
                          const success = await UserService.saveUser(testUser);
                          if (success) {
                            toast({
                              title: "Firebase Test Successful",
                              description: "Test user saved to Firebase!",
                            });
                            loadUsers();
                          } else {
                            toast({
                              title: "Firebase Test Failed",
                              description: "Could not save test user to Firebase",
                              variant: "destructive"
                            });
                          }
                        } catch (error) {
                          console.error('Firebase test error:', error);
                          toast({
                            title: "Firebase Connection Error",
                            description: "Check console for details",
                            variant: "destructive"
                          });
                        }
                      }}
                    >
                      🧪 Test Firebase
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={loadUsers}
                      disabled={isLoadingUsers}
                    >
                      {isLoadingUsers ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Download className="w-4 h-4 mr-2" />
                      )}
                      Refresh
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isLoadingUsers ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                    <span className="ml-2 text-gray-600">Loading users from Firebase...</span>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4 font-medium">Name</th>
                          <th className="text-left p-4 font-medium">Email</th>
                          <th className="text-left p-4 font-medium">Phone</th>
                          <th className="text-left p-4 font-medium">Orders</th>
                          <th className="text-left p-4 font-medium">Status</th>
                          <th className="text-left p-4 font-medium">Joined</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allUsers.map((user) => {
                          const userOrders = orders.filter(order => order.customerDetails.email === user.email);
                          return (
                            <tr key={user.id} className="border-b hover:bg-gray-50">
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm font-bold">
                                      {user.name?.charAt(0).toUpperCase()}
                                    </span>
                                  </div>
                                  <p className="font-medium">{user.name}</p>
                                </div>
                              </td>
                              <td className="p-4 text-sm">{user.email}</td>
                              <td className="p-4 text-sm">{user.phone || 'N/A'}</td>
                              <td className="p-4">
                                <Badge variant="outline">{userOrders.length} orders</Badge>
                              </td>
                              <td className="p-4">
                                <Badge 
                                  variant={user.isActive ? "default" : "secondary"}
                                  className={user.isActive ? "bg-green-100 text-green-800" : ""}
                                >
                                  {user.isActive ? 'Active' : 'Inactive'}
                                </Badge>
                              </td>
                              <td className="p-4 text-sm">
                                {new Date(user.createdAt || Date.now()).toLocaleDateString('en-IN')}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

                {!isLoadingUsers && allUsers.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No users in Firebase yet</h3>
                    <p className="text-gray-600 mb-4">Users will appear here after Firebase migration.</p>
                    
                    <div className="space-y-3">
                      <Button 
                        variant="default" 
                        className="w-full"
                        onClick={async () => {
                          try {
                            console.log('🔄 Starting migration...');
                            const success = await UserService.migrateLocalStorageToFirebase();
                            if (success) {
                              toast({
                                title: "Migration Successful",
                                description: "Users migrated to Firebase successfully!",
                              });
                              loadUsers(); // Reload users after migration
                            } else {
                              toast({
                                title: "Migration Error",
                                description: "Some users failed to migrate. Check console.",
                                variant: "destructive"
                              });
                            }
                          } catch (error) {
                            console.error('Migration error:', error);
                            toast({
                              title: "Migration Failed",
                              description: "Error migrating users. Check console for details.",
                              variant: "destructive"
                            });
                          }
                        }}
                      >
                        🔄 Migrate LocalStorage Users to Firebase
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          const oldUsers = JSON.parse(localStorage.getItem('prayan-users') || '[]');
                          const newUsers = JSON.parse(localStorage.getItem('prayan-users-database') || '[]');
                          console.log('📦 Old localStorage users:', oldUsers);
                          console.log('📦 New localStorage users:', newUsers);
                          alert(`Found ${oldUsers.length} old users and ${newUsers.length} new users in localStorage. Check console for details.`);
                        }}
                      >
                        🔍 Check LocalStorage Users
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Order Details - {selectedOrder.id}</CardTitle>
                  <Button variant="ghost" onClick={() => setSelectedOrder(null)}>
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Customer Info */}
                <div>
                  <h3 className="font-semibold mb-2">Customer Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Name:</strong> {selectedOrder.customerDetails.name}</p>
                    <p><strong>Phone:</strong> {selectedOrder.customerDetails.phone}</p>
                    <p><strong>Email:</strong> {selectedOrder.customerDetails.email || 'Not provided'}</p>
                    <p><strong>Address:</strong> {selectedOrder.customerDetails.address}, {selectedOrder.customerDetails.city}, {selectedOrder.customerDetails.pincode}</p>
                    <p><strong>Payment:</strong> {selectedOrder.customerDetails.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</p>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="font-semibold mb-2">Order Items</h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">{item.weight} × {item.quantity}</p>
                        </div>
                        <p className="font-semibold">₹{item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total Amount:</span>
                      <span className="text-xl font-bold text-green-600">₹{selectedOrder.totalPrice}</span>
                    </div>
                  </div>
                </div>

                {/* Special Notes */}
                {selectedOrder.customerDetails.notes && (
                  <div>
                    <h3 className="font-semibold mb-2">Special Instructions</h3>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p>{selectedOrder.customerDetails.notes}</p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <Button 
                    onClick={() => contactCustomer(selectedOrder, 'whatsapp')}
                    className="flex-1"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp Customer
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => contactCustomer(selectedOrder, 'phone')}
                    className="flex-1"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Customer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;