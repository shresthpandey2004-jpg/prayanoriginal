import React, { useState, useEffect } from 'react';
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
  Calendar,
  IndianRupee,
  Clock,
  CheckCircle,
  Truck,
  X
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AdminOrders = () => {
  const [orders, setOrders] = useState<FirebaseOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Load orders from Firebase
  const loadOrders = async () => {
    setLoading(true);
    try {
      const result = await orderService.getAllOrders();
      if (result.success) {
        setOrders(result.orders);
      } else {
        toast({
          title: "Error loading orders",
          description: result.error,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Connection error",
        description: "Unable to load orders. Please check your internet connection.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // Update order status
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
        toast({
          title: "Status updated",
          description: `Order ${orderId} status changed to ${newStatus}`,
        });
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
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Order Management</h1>
            <p className="text-gray-600">Manage all customer orders</p>
          </div>
          <Button onClick={loadOrders} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold">{orders.length}</p>
                </div>
                <Package className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {orders.filter(o => o.status === 'pending').length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Processing</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {orders.filter(o => o.status === 'processing').length}
                  </p>
                </div>
                <Package className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Delivered</p>
                  <p className="text-2xl font-bold text-green-600">
                    {orders.filter(o => o.status === 'delivered').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by Order ID, Name, or Phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        {loading ? (
          <Card>
            <CardContent className="p-12 text-center">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">Loading orders...</p>
            </CardContent>
          </Card>
        ) : filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Orders Found</h3>
              <p className="text-gray-600">
                {searchTerm || statusFilter !== 'all' 
                  ? 'No orders match your filters.' 
                  : 'No orders have been placed yet.'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        Order #{order.orderId}
                        <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                          {getStatusIcon(order.status)}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {order.timestamp.toDate().toLocaleDateString('en-IN')}
                        </div>
                        <div className="flex items-center gap-1">
                          <IndianRupee className="w-4 h-4" />
                          ₹{order.totalPrice}
                        </div>
                      </div>
                    </div>
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
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Customer Details */}
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Customer Details
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p><strong>Name:</strong> {order.customerDetails.name}</p>
                        <p><strong>Phone:</strong> {order.customerDetails.phone}</p>
                        <p><strong>Email:</strong> {order.customerDetails.email || 'Not provided'}</p>
                        <p><strong>Payment:</strong> {order.customerDetails.paymentMethod.toUpperCase()}</p>
                      </div>
                    </div>

                    {/* Delivery Address */}
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Delivery Address
                      </h4>
                      <div className="text-sm text-gray-600">
                        <p>{order.customerDetails.address}</p>
                        <p>{order.customerDetails.city}, {order.customerDetails.pincode}</p>
                        {order.customerDetails.notes && (
                          <p className="mt-2"><strong>Notes:</strong> {order.customerDetails.notes}</p>
                        )}
                      </div>
                    </div>

                    {/* Order Items */}
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        Items ({order.items.length})
                      </h4>
                      <div className="space-y-1 text-sm">
                        {order.items.map((item, index) => (
                          <p key={index} className="text-gray-600">
                            {item.name} ({item.weight}) × {item.quantity} = ₹{item.price * item.quantity}
                          </p>
                        ))}
                        <div className="pt-2 border-t">
                          <p className="font-medium">Total: ₹{order.totalPrice}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4 pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const phone = order.customerDetails.phone;
                        const message = `Hi ${order.customerDetails.name}! Your order ${order.orderId} status: ${order.status}. Thank you for choosing Prayan Masale!`;
                        const whatsappUrl = `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`;
                        window.open(whatsappUrl, '_blank');
                      }}
                    >
                      WhatsApp Customer
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const phone = order.customerDetails.phone;
                        window.open(`tel:+91${phone}`, '_self');
                      }}
                    >
                      Call Customer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;