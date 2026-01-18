import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useOrders } from '@/context/OrderContext';
import { BUSINESS_CONFIG } from '@/config/business';
import { calculateDeliveryCharge, getEstimatedDeliveryDate } from '@/utils/delivery';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Phone, MapPin, User, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  paymentMethod: 'cod' | 'online';
  notes: string;
}

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({ charge: 0, isFree: false, area: '', estimatedDays: '' });
  
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'cod',
    notes: ''
  });

  const [errors, setErrors] = useState<Partial<CustomerDetails>>({});

  // Calculate delivery charges when pincode changes
  useEffect(() => {
    if (customerDetails.pincode && /^\d{6}$/.test(customerDetails.pincode)) {
      const delivery = calculateDeliveryCharge(customerDetails.pincode, totalPrice);
      setDeliveryInfo(delivery);
    } else {
      setDeliveryInfo({ charge: 0, isFree: false, area: '', estimatedDays: '' });
    }
  }, [customerDetails.pincode, totalPrice]);

  const validateForm = () => {
    const newErrors: Partial<CustomerDetails> = {};
    
    if (!customerDetails.name.trim()) newErrors.name = 'Name is required';
    if (!customerDetails.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!/^[6-9]\d{9}$/.test(customerDetails.phone)) newErrors.phone = 'Enter valid 10-digit phone number';
    if (!customerDetails.address.trim()) newErrors.address = 'Address is required';
    if (!customerDetails.city.trim()) newErrors.city = 'City is required';
    if (!customerDetails.pincode.trim()) newErrors.pincode = 'Pincode is required';
    if (!/^\d{6}$/.test(customerDetails.pincode)) newErrors.pincode = 'Enter valid 6-digit pincode';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateOrderId = () => {
    return 'PM' + Date.now().toString().slice(-8);
  };

  const generateWhatsAppMessage = (orderId: string) => {
    const itemsList = items.map(item => 
      `• ${item.name} (${item.weight}) - ₹${item.price} x ${item.quantity} = ₹${item.price * item.quantity}`
    ).join('\n');

    return `🌶️ *नया ऑर्डर - प्रयाण मसाले*

📋 *Order ID:* ${orderId}

👤 *Customer Details:*
Name: ${customerDetails.name}
Phone: ${customerDetails.phone}
Email: ${customerDetails.email || 'Not provided'}

📍 *Delivery Address:*
${customerDetails.address}
${customerDetails.city}, ${customerDetails.pincode}

🛒 *Order Items:*
${itemsList}

💰 *Total Amount:* ₹${totalPrice}
💳 *Payment Method:* ${customerDetails.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}

📝 *Special Notes:* ${customerDetails.notes || 'None'}

---
कृपया इस ऑर्डर की पुष्टि करें। धन्यवाद! 🙏`;
  };

  const handleInputChange = (field: keyof CustomerDetails, value: string) => {
    setCustomerDetails(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      toast({
        title: "Please fill all required fields",
        description: "Check the highlighted fields and try again.",
        variant: "destructive"
      });
      return;
    }

    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart first.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const orderId = generateOrderId();
      
      // Store order using OrderContext
      const order = {
        id: orderId,
        items: [...items],
        customerDetails: { ...customerDetails },
        totalPrice: totalPrice + deliveryInfo.charge,
        deliveryCharge: deliveryInfo.charge,
        timestamp: new Date().toISOString(),
        status: 'confirmed' as const,
        paymentStatus: customerDetails.paymentMethod === 'cod' ? 'pending' : 'completed'
      };
      
      addOrder(order);

      // Clear cart
      clearCart();

      // Show success message
      toast({
        title: "Order placed successfully! 🎉",
        description: `Order ID: ${orderId}. You will receive confirmation shortly.`,
      });

      // Navigate to order confirmation
      navigate(`/order-confirmation/${orderId}`);

    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">Cart is Empty</h2>
            <p className="text-gray-600 mb-6">Add some delicious spices to your cart first!</p>
            <Button onClick={() => navigate('/shop')} className="w-full">
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
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
          <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Customer Details Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={customerDetails.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={customerDetails.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="10-digit mobile number"
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerDetails.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Full Address *</Label>
                  <Textarea
                    id="address"
                    value={customerDetails.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="House/Flat No., Street, Landmark"
                    className={errors.address ? 'border-red-500' : ''}
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={customerDetails.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Your city"
                      className={errors.city ? 'border-red-500' : ''}
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      value={customerDetails.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value)}
                      placeholder="6-digit pincode"
                      className={errors.pincode ? 'border-red-500' : ''}
                    />
                    {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={customerDetails.paymentMethod}
                  onValueChange={(value) => handleInputChange('paymentMethod', value as 'cod' | 'online')}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod">Cash on Delivery (COD)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="online" id="online" />
                    <Label htmlFor="online">Online Payment (UPI/Card)</Label>
                  </div>
                </RadioGroup>
                
                <div className="mt-4">
                  <Label htmlFor="notes">Special Instructions (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={customerDetails.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Any special instructions for delivery..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.weight} × {item.quantity}</p>
                    </div>
                    <p className="font-medium">₹{item.price * item.quantity}</p>
                  </div>
                ))}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    {deliveryInfo.isFree ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      <span>₹{deliveryInfo.charge}</span>
                    )}
                  </div>
                  {deliveryInfo.area && (
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Delivery Area</span>
                      <span>{deliveryInfo.area}</span>
                    </div>
                  )}
                  {customerDetails.pincode && deliveryInfo.estimatedDays && (
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Estimated Delivery</span>
                      <span>{getEstimatedDeliveryDate(customerDetails.pincode)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{totalPrice + deliveryInfo.charge}</span>
                  </div>
                </div>

                <Button 
                  onClick={handlePlaceOrder}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  size="lg"
                >
                  {isLoading ? 'Placing Order...' : `Place Order - ₹${totalPrice + deliveryInfo.charge}`}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By placing this order, you agree to our terms and conditions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;