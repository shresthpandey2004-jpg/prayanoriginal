import { useState, useEffect } from 'react';
import { orderService, FirebaseOrder } from '@/services/orderService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Package, 
  Search, 
  RefreshCw, 
  Phone, 
  MapPin,
  IndianRupee,
  Clock,
  CheckCircle,
  Truck,
  X,
  LogOut,
  ArrowLeft,
  MessageCircle,
  Bell
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import AdminProtection from '@/components/AdminProtection';

const AdminOrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<FirebaseOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('prayan_admin_session');
    localStorage.removeItem('prayan_admin_login_time');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of admin panel",
    });
    navigate('/admin/login');
  };

  // Test Firebase connection
  const testFirebaseConnection = async () => {
    try {
      const result = await orderService.testConnection();
      
      if (result.success) {
        toast({
          title: "Firebase Connected ✅",
          description: `Found ${result.orderCount} orders in database`,
        });
        loadOrders();
      } else {
        toast({
          title: "Firebase Error ❌",
          description: `${result.error}`,
          variant: "destructive"
        });
      }
    } catch (error: any) {
      toast({
        title: "Firebase Connection Failed ❌",
        description: `Error: ${error.message}`,
        variant: "destructive"
      });
    }
  };

  // Load orders from Firebase
  const loadOrders = async () => {
    setLoading(true);
    try {
      const result = await orderService.getAllOrders();
      
      if (result.success) {
        setOrders(result.orders);
        
        if (result.orders.length === 0) {
          toast({
            title: "No Orders Found",
            description: "No orders have been placed yet.",
          });
        }
      } else {
        toast({
          title: "Error Loading Orders",
          description: result.error,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to load orders. Please check your internet connection.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('🚀 Setting up real-time order sync...');
    
    // Set up real-time listener instead of manual loading
    const unsubscribe = orderService.subscribeToOrders((updatedOrders) => {
      console.log('📱 Real-time orders update received:', updatedOrders.length);
      setOrders(updatedOrders);
      setLoading(false);
      
      if (updatedOrders.length === 0) {
        toast({
          title: "No Orders Found",
          description: "No orders have been placed yet.",
        });
      } else {
        console.log('✅ Orders synced across all devices!');
      }
    });

    // Cleanup listener on component unmount
    return () => {
      console.log('🧹 Cleaning up real-time listener...');
      unsubscribe();
    };
  }, []);

  // Update order status with notification
  const updateStatus = async (orderId: string, newStatus: FirebaseOrder['status']) => {
    try {
      const result = await orderService.updateOrderStatus(orderId, newStatus);
      if (result.success) {
        setOrders(prev => 
          prev.map(order => 
            order.orderId === orderId 
              ? { ...order, status: newStatus }
              : order
          )
        );
        
        // Send WhatsApp notification to customer
        const order = orders.find(o => o.orderId === orderId);
        if (order) {
          const message = `🌶️ *PRAYAN MASALE - Order Update*

Order ID: ${orderId}
Status: ${newStatus.toUpperCase()}

Your order status has been updated. Thank you for choosing Prayan Masale! 🙏

Track your order: ${window.location.origin}/my-orders`;
          
          const whatsappUrl = `https://wa.me/${order.customerDetails.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
          
          toast({
            title: "Status Updated & Customer Notified! 🎉",
            description: `Order ${orderId} updated to ${newStatus}`,
            action: (
              <Button size="sm" onClick={() => window.open(whatsappUrl, '_blank')}>
                <MessageCircle className="w-4 h-4 mr-1" />
                View WhatsApp
              </Button>
            )
          });
        }
      } else {
        toast({
          title: "Update failed",
          description: result.error,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive"
      });
    }
  };

  // Send notification to customer
  const sendNotification = (order: FirebaseOrder) => {
    const message = `🌶️ *PRAYAN MASALE - Order Update*

Hi ${order.customerDetails.name}!

Order ID: ${order.orderId}
Current Status: ${order.status.toUpperCase()}
Order Value: ₹${order.totalPrice}

Items:
${order.items.map(item => `• ${item.name} (${item.weight}) × ${item.quantity}`).join('\n')}

Delivery Address:
${order.customerDetails.address}
${order.customerDetails.city}, ${order.customerDetails.pincode}

Thank you for choosing Prayan Masale! 🙏

Track your order: ${window.location.origin}/my-orders`;

    const whatsappUrl = `https://wa.me/${order.customerDetails.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "WhatsApp Notification Sent! 📱",
      description: `Customer ${order.customerDetails.name} notified`,
    });
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerDetails.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerDetails.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'processing': return <Package className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'out_for_delivery': return <MapPin className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <X className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-purple-100 text-purple-800';
      case 'shipped': return 'bg-orange-100 text-orange-800';
      case 'out_for_delivery': return 'bg-indigo-100 text-indigo-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOrderStats = () => {
    return {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      processing: orders.filter(o => o.status === 'processing').length,
      shipped: orders.filter(o => o.status === 'shipped').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      revenue: orders.reduce((sum, order) => sum + order.totalPrice, 0)
    };
  };

  const stats = getOrderStats();

  return (
    <AdminProtection>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/admin')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Advanced Order Management</h1>
                <p className="text-gray-600">Real-time tracking • Auto-notifications • Status updates</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={testFirebaseConnection} variant="outline">
                Test Firebase
              </Button>
              <Button 
                onClick={loadOrders} 
                disabled={loading}
                variant="secondary"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button onClick={handleLogout} variant="destructive">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Real-time Status Indicator */}
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-green-700 font-medium">
                🔥 Real-time Firebase sync ACTIVE • Orders sync instantly across all devices • Last updated: {new Date().toLocaleTimeString('en-IN')}
              </span>
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600">Total Orders</p>
                    <p className="text-xl font-bold">{stats.total}</p>
                  </div>
                  <Package className="w-6 h-6 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600">Pending</p>
                    <p className="text-xl font-bold text-yellow-600">{stats.pending}</p>
                  </div>
                  <Clock className="w-6 h-6 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600">Processing</p>
                    <p className="text-xl font-bold text-purple-600">{stats.processing}</p>
                  </div>
                  <Package className="w-6 h-6 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600">Shipped</p>
                    <p className="text-xl font-bold text-orange-600">{stats.shipped}</p>
                  </div>
                  <Truck className="w-6 h-6 text-orange-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600">Delivered</p>
                    <p className="text-xl font-bold text-green-600">{stats.delivered}</p>
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600">Revenue</p>
                    <p className="text-lg font-bold text-green-600">₹{stats.revenue}</p>
                  </div>
                  <IndianRupee className="w-6 h-6 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by Order ID, Name, or Phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Orders List */}
          {loading ? (
            <div className="text-center py-12">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-orange-500" />
              <p className="text-gray-600">Loading orders...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="text-center p-12">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Orders Found</h3>
                <p className="text-gray-600">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'No orders match your filters.' 
                    : 'No orders have been placed yet.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Card key={order.orderId} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          Order #{order.orderId}
                          <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                            {getStatusIcon(order.status)}
                            {order.status.replace('_', ' ').charAt(0).toUpperCase() + order.status.replace('_', ' ').slice(1)}
                          </Badge>
                        </CardTitle>
                        <p className="text-sm text-gray-600">
                          {new Date(order.timestamp.toDate()).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Select
                          value={order.status}
                          onValueChange={(value) => updateStatus(order.orderId, value as FirebaseOrder['status'])}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => sendNotification(order)}
                        >
                          <Bell className="w-4 h-4 mr-1" />
                          Notify
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid lg:grid-cols-4 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Customer</h4>
                        <p className="text-sm text-gray-600">{order.customerDetails.name}</p>
                        <p className="text-sm text-gray-600">{order.customerDetails.phone}</p>
                        <p className="text-sm text-gray-600">{order.customerDetails.email}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Delivery Address</h4>
                        <p className="text-sm text-gray-600">
                          {order.customerDetails.address}
                        </p>
                        <p className="text-sm text-gray-600">
                          {order.customerDetails.city}, {order.customerDetails.pincode}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Items ({order.items.length})</h4>
                        <div className="space-y-1">
                          {order.items.slice(0, 2).map((item, index) => (
                            <p key={index} className="text-sm text-gray-600">
                              {item.name} × {item.quantity}
                            </p>
                          ))}
                          {order.items.length > 2 && (
                            <p className="text-sm text-gray-500">+{order.items.length - 2} more</p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Order Value</h4>
                        <p className="text-lg font-bold text-green-600">₹{order.totalPrice}</p>
                        <p className="text-sm text-gray-600">
                          {order.customerDetails.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4 pt-4 border-t">
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => sendNotification(order)}
                        >
                          <MessageCircle className="w-4 h-4 mr-1" />
                          WhatsApp Customer
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            window.open(`tel:+91${order.customerDetails.phone.replace(/\D/g, '')}`, '_self');
                          }}
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          Call Customer
                        </Button>
                      </div>
                      
                      <div className="text-sm text-gray-500">
                        🔥 Real-time sync: ACTIVE • Instant updates across all devices
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminProtection>
  );
};

export default AdminOrdersPage;