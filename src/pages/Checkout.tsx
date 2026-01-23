import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useOrders } from '@/context/OrderContext';
import { BUSINESS_CONFIG } from '@/config/business';
import { calculateDeliveryCharge, getEstimatedDeliveryDate } from '@/utils/delivery';
import { razorpayService } from '@/services/razorpayService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Phone, MapPin, User, CreditCard, Wallet, Tag, Gift, Percent } from 'lucide-react';
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
  const { 
    items, 
    totalPrice, 
    finalPrice, 
    discountCode, 
    discountAmount, 
    applyDiscountCode, 
    removeDiscountCode, 
    isFreeShipping, 
    clearCart 
  } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({ charge: 0, isFree: false, area: '', estimatedDays: '' });
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  
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
      const delivery = calculateDeliveryCharge(customerDetails.pincode, finalPrice);
      // Override delivery charge if free shipping is unlocked
      if (isFreeShipping) {
        setDeliveryInfo({ ...delivery, charge: 0, isFree: true });
      } else {
        setDeliveryInfo(delivery);
      }
    } else {
      setDeliveryInfo({ charge: 0, isFree: false, area: '', estimatedDays: '' });
    }
  }, [customerDetails.pincode, finalPrice, isFreeShipping]);

  const handleApplyPromoCode = () => {
    if (!promoCode.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }

    const success = applyDiscountCode(promoCode.trim());
    if (success) {
      setPromoError('');
      setPromoCode('');
      toast({
        title: "Promo code applied! 🎉",
        description: `You saved ₹${discountAmount} with code ${promoCode.toUpperCase()}`,
      });
    } else {
      setPromoError('Invalid promo code or minimum amount not met');
    }
  };

  const handleRemovePromoCode = () => {
    removeDiscountCode();
    setPromoError('');
    toast({
      title: "Promo code removed",
      description: "You can apply a different code if you have one",
    });
  };

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

    const finalAmount = finalPrice + deliveryInfo.charge;

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

💰 *Pricing Details:*
Subtotal: ₹${totalPrice}${discountAmount > 0 ? `
Discount (${discountCode}): -₹${discountAmount}` : ''}
Delivery: ${deliveryInfo.isFree || isFreeShipping ? 'FREE 🎉' : `₹${deliveryInfo.charge}`}
*Final Amount: ₹${finalAmount}*

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
      const totalAmount = finalPrice + deliveryInfo.charge;

      // Handle payment based on method
      if (customerDetails.paymentMethod === 'online') {
        // Process online payment with Razorpay
        const paymentResult = await razorpayService.initiatePayment({
          orderId,
          amount: totalAmount,
          currency: 'INR',
          customerDetails: {
            name: customerDetails.name,
            email: customerDetails.email,
            phone: customerDetails.phone,
            address: `${customerDetails.address}, ${customerDetails.city}, ${customerDetails.pincode}`
          },
          items: items.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
          }))
        });

        if (!paymentResult.success) {
          toast({
            title: "Payment Failed",
            description: paymentResult.error || "Payment was cancelled or failed",
            variant: "destructive"
          });
          setIsLoading(false);
          return;
        }

        // Payment successful - create order
        const order = {
          id: orderId,
          items: [...items],
          customerDetails: { ...customerDetails },
          totalPrice: totalAmount,
          deliveryCharge: deliveryInfo.charge,
          timestamp: new Date().toISOString(),
          status: 'confirmed' as const,
          paymentStatus: 'completed' as const
        };
        
        const success = await addOrder(order);
        clearCart();

        toast({
          title: "Payment Successful! 🎉",
          description: `Order ID: ${orderId}. Payment completed successfully.`,
        });

        navigate(`/order-confirmation/${orderId}`);

      } else {
        // Handle COD order
        const order = {
          id: orderId,
          items: [...items],
          customerDetails: { ...customerDetails },
          totalPrice: totalAmount,
          deliveryCharge: deliveryInfo.charge,
          timestamp: new Date().toISOString(),
          status: 'confirmed' as const,
          paymentStatus: 'pending' as const
        };
        
        const success = await addOrder(order);
        clearCart();

        if (success) {
          toast({
            title: "Order placed successfully! 🎉",
            description: `Order ID: ${orderId}. Your order has been confirmed.`,
          });
        } else {
          toast({
            title: "Order saved locally 📱",
            description: `Order ID: ${orderId}. We'll sync it when connection is restored.`,
          });
        }

        navigate(`/order-confirmation/${orderId}`);
      }

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
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="online" id="online" />
                    <Label htmlFor="online" className="flex items-center gap-2 cursor-pointer flex-1">
                      <Wallet className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="font-medium">Online Payment</p>
                        <p className="text-sm text-gray-600">UPI, Cards, Net Banking via Razorpay</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer flex-1">
                      <CreditCard className="w-4 h-4 text-green-600" />
                      <div>
                        <p className="font-medium">Cash on Delivery (COD)</p>
                        <p className="text-sm text-gray-600">Pay when your order arrives</p>
                      </div>
                    </Label>
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
                  
                  {/* Discount Section */}
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span className="flex items-center gap-1">
                        <Percent className="w-4 h-4" />
                        Discount ({discountCode})
                      </span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    {deliveryInfo.isFree || isFreeShipping ? (
                      <span className="text-green-600 flex items-center gap-1">
                        <Gift className="w-4 h-4" />
                        FREE
                      </span>
                    ) : (
                      <span>₹{deliveryInfo.charge}</span>
                    )}
                  </div>
                  
                  {isFreeShipping && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>🎉 Free shipping unlocked!</span>
                      <span>You saved ₹{deliveryInfo.charge || 50}</span>
                    </div>
                  )}
                  
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
                    <span>₹{finalPrice + deliveryInfo.charge}</span>
                  </div>
                  
                  {/* Promo Code Section */}
                  <div className="pt-4 border-t border-gray-200">
                    {!discountCode ? (
                      <div className="space-y-3">
                        <Label className="text-sm font-medium flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          Have a promo code?
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter code (e.g., PRAYAN10)"
                            value={promoCode}
                            onChange={(e) => {
                              setPromoCode(e.target.value.toUpperCase());
                              setPromoError('');
                            }}
                            className="flex-1"
                          />
                          <Button 
                            variant="outline" 
                            onClick={handleApplyPromoCode}
                            disabled={!promoCode.trim()}
                          >
                            Apply
                          </Button>
                        </div>
                        {promoError && (
                          <p className="text-red-500 text-sm">{promoError}</p>
                        )}
                        <div className="text-xs text-gray-500">
                          💡 Try: PRAYAN10 for 10% off
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 text-green-700">
                          <Gift className="w-4 h-4" />
                          <span className="font-medium">{discountCode} applied!</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={handleRemovePromoCode}
                          className="text-green-700 hover:text-green-800"
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <Button 
                  onClick={handlePlaceOrder}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  size="lg"
                >
                  {isLoading ? (
                    customerDetails.paymentMethod === 'online' ? 'Processing Payment...' : 'Placing Order...'
                  ) : (
                    customerDetails.paymentMethod === 'online' 
                      ? `Pay ₹${finalPrice + deliveryInfo.charge} - Razorpay`
                      : `Place Order - ₹${finalPrice + deliveryInfo.charge}`
                  )}
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