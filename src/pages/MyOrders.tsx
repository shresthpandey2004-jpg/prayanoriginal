import React, { useState, useEffect } from 'react';
import { useOrders } from '@/context/OrderContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Search, Package, Clock, CheckCircle, Truck, X, MapPin, Phone, ExternalLink, Bell, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const MyOrders = () => {
  const { orders, refreshOrders, loading } = useOrders();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Auto-refresh orders every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshOrders();
    }, 30000);

    return () => clearInterval(interval);
  }, [refreshOrders]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshOrders();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

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

  const getStatusProgress = (status: string): number => {
    switch (status) {
      case 'pending': return 10;
      case 'confirmed': return 25;
      case 'processing': return 50;
      case 'shipped': return 75;
      case 'out_for_delivery': return 90;
      case 'delivered': return 100;
      case 'cancelled': return 0;
      default: return 0;
    }
  };

  const getDeliveryStatus = (order: any) => {
    if (order.status === 'delivered') {
      return {
        message: `Delivered on ${new Date(order.actualDeliveryDate || order.timestamp).toLocaleDateString('en-IN')}`,
        color: 'text-green-600'
      };
    }
    
    if (order.estimatedDeliveryDate) {
      const estimatedDate = new Date(order.estimatedDeliveryDate);
      const today = new Date();
      const diffTime = estimatedDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 0) {
        return {
          message: `Delivery was expected ${Math.abs(diffDays)} days ago`,
          color: 'text-red-600'
        };
      } else if (diffDays === 0) {
        return {
          message: 'Expected delivery today',
          color: 'text-orange-600'
        };
      } else if (diffDays === 1) {
        return {
          message: 'Expected delivery tomorrow',
          color: 'text-blue-600'
        };
      } else {
        return {
          message: `Expected delivery in ${diffDays} days`,
          color: 'text-gray-600'
        };
      }
    }
    
    return {
      message: 'Delivery date will be updated soon',
      color: 'text-gray-500'
    };
  };

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerDetails.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const TrackingTimeline = ({ order }: { order: any }) => {
    const statusHistory = order.statusHistory || [];
    
    return (
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-800 mb-3">Order Timeline</h4>
        <div className="relative">
          {statusHistory.map((event: any, index: number) => (
            <div key={index} className="flex items-start gap-3 pb-4">
              <div className={`w-3 h-3 rounded-full mt-1 ${
                index === 0 ? 'bg-green-500' : 'bg-gray-300'
              }`} />
              <div className="flex-1">
                <p className="font-medium text-sm">{event.message}</p>
                <p className="text-xs text-gray-500">
                  {new Date(event.timestamp).toLocaleString('en-IN')}
                  {event.location && ` • ${event.location}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

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
            <h1 className="text-3xl font-bold text-gray-800">Track Your Orders</h1>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by Order ID or Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Real-time Status Indicator */}
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-green-700 font-medium">
              Real-time tracking active • Last updated: {new Date().toLocaleTimeString('en-IN')}
            </span>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="text-center p-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Orders Found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm ? 'No orders match your search.' : "You haven't placed any orders yet."}
              </p>
              <Button onClick={() => navigate('/shop')}>
                Start Shopping
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const deliveryStatus = getDeliveryStatus(order);
              const progress = getStatusProgress(order.status);
              
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 order-card">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            Order #{order.id}
                            {order.trackingInfo && (
                              <Badge variant="outline" className="text-xs">
                                <Truck className="w-3 h-3 mr-1" />
                                {order.trackingInfo.courierPartner}
                              </Badge>
                            )}
                          </CardTitle>
                          <p className="text-sm text-gray-600">
                            {new Date(order.timestamp).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                          {getStatusIcon(order.status)}
                          {order.status.replace('_', ' ').charAt(0).toUpperCase() + order.status.replace('_', ' ').slice(1)}
                        </Badge>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-700">Order Progress</span>
                          <span className="text-sm text-gray-500">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                      
                      {/* Delivery Status */}
                      <div className="mt-2">
                        <p className={`text-sm font-medium ${deliveryStatus.color}`}>
                          {deliveryStatus.message}
                        </p>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="order-card-content">
                      <div className="grid lg:grid-cols-3 gap-6 order-details-grid lg:order-details-grid-desktop">
                        {/* Order Items */}
                        <div>
                          <h4 className="font-medium mb-2">Items ({order.items.length})</h4>
                          <div className="space-y-1">
                            {order.items.slice(0, 3).map((item, index) => (
                              <p key={index} className="text-sm text-gray-600">
                                {item.name} ({item.weight}) × {item.quantity}
                              </p>
                            ))}
                            {order.items.length > 3 && (
                              <p className="text-sm text-gray-500">
                                +{order.items.length - 3} more items
                              </p>
                            )}
                          </div>
                        </div>
                        
                        {/* Delivery Details */}
                        <div>
                          <h4 className="font-medium mb-2">Delivery Details</h4>
                          <p className="text-sm text-gray-600">{order.customerDetails.name}</p>
                          <p className="text-sm text-gray-600">
                            {order.customerDetails.city}, {order.customerDetails.pincode}
                          </p>
                          <p className="text-sm text-gray-600">{order.customerDetails.phone}</p>
                        </div>
                        
                        {/* Tracking Info */}
                        <div>
                          {order.trackingInfo ? (
                            <div>
                              <h4 className="font-medium mb-2">Tracking Details</h4>
                              <p className="text-sm text-gray-600">
                                <strong>Tracking #:</strong> {order.trackingInfo.trackingNumber}
                              </p>
                              <p className="text-sm text-gray-600">
                                <strong>Current Location:</strong> {order.trackingInfo.currentLocation}
                              </p>
                              <p className="text-sm text-gray-600">
                                <strong>Last Updated:</strong> {new Date(order.trackingInfo.lastUpdated).toLocaleString('en-IN')}
                              </p>
                              {order.trackingInfo.trackingUrl && (
                                <Button
                                  variant="link"
                                  size="sm"
                                  className="p-0 h-auto text-blue-600"
                                  onClick={() => window.open(order.trackingInfo!.trackingUrl, '_blank')}
                                >
                                  <ExternalLink className="w-3 h-3 mr-1" />
                                  Track on Courier Website
                                </Button>
                              )}
                            </div>
                          ) : (
                            <div>
                              <h4 className="font-medium mb-2">Tracking</h4>
                              <p className="text-sm text-gray-500">
                                Tracking details will be available once shipped
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Expanded Details */}
                      <AnimatePresence>
                        {selectedOrder === order.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-6 pt-6 border-t border-gray-200"
                          >
                            <TrackingTimeline order={order} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      <div className="mt-6 pt-4 border-t space-y-4">
                        {/* Total Amount - Full width on mobile */}
                        <div className="flex justify-between items-center sm:justify-start">
                          <div className="flex-1">
                            <p className="text-sm text-gray-600">Total Amount</p>
                            <p className="text-xl sm:text-2xl font-bold text-green-600">₹{order.totalPrice}</p>
                          </div>
                        </div>
                        
                        {/* Action Buttons - Stack on mobile, inline on desktop */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                            className="w-full sm:w-auto"
                          >
                            {selectedOrder === order.id ? 'Hide Timeline' : 'View Timeline'}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/order-confirmation/${order.id}`)}
                            className="w-full sm:w-auto"
                          >
                            Full Details
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => {
                              const message = `Hi! I want to check the status of my order ${order.id}. Current status: ${order.status}. Please update me. Thank you!`;
                              const whatsappUrl = `https://wa.me/918866658919?text=${encodeURIComponent(message)}`;
                              window.open(whatsappUrl, '_blank');
                            }}
                            className="w-full sm:w-auto"
                          >
                            <Phone className="w-4 h-4 mr-1" />
                            Contact Us
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;