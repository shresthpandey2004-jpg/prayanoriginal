import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useOrders } from '@/context/OrderContext';
import { useLoyalty } from '@/context/LoyaltyContext';
import { useAuth } from '@/context/AuthContext';
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
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Phone, MapPin, User, CreditCard, Wallet, Tag, Gift, Percent, Coins, Star } from 'lucide-react';
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
  // Guest checkout system - allows orders without mandatory login
  // This provides optimal user experience and higher conversion rates
  const { 
    items, 
    totalPrice, 
    finalPrice, 
    discountCode, 
    discountAmount, 
    applyDiscountCode, 
    removeDiscountCode, 
    isFreeShipping, 
    deliveryCharge,
    isFirstOrder,
    clearCart 
  } = useCart();
  const { addOrder } = useOrders();
  const { user } = useAuth();
  const { 
    userPoints, 
    userTier, 
    canRedeem, 
    getPointsValue,
    redeemCustomPoints
  } = useLoyalty();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({ charge: 0, isFree: false, area: '', estimatedDays: '' });
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [loyaltyPointsToUse, setLoyaltyPointsToUse] = useState(0);
  const [useLoyaltyPoints, setUseLoyaltyPoints] = useState(false);
  
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
      const delivery = calculateDeliveryCharge(customerDetails.pincode, finalPrice, isFirstOrder);
      setDeliveryInfo(delivery);
    } else {
      setDeliveryInfo({ charge: 0, isFree: false, area: '', estimatedDays: '' });
    }
  }, [customerDetails.pincode, finalPrice, isFirstOrder]);

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
      const loyaltyDiscount = useLoyaltyPoints ? getPointsValue(loyaltyPointsToUse) : 0;
      const totalAmount = finalPrice + deliveryInfo.charge - loyaltyDiscount;

      // Validate loyalty points usage
      if (useLoyaltyPoints && loyaltyPointsToUse > 0) {
        if (!canRedeem(loyaltyPointsToUse)) {
          toast({
            title: "Insufficient loyalty points",
            description: "You don't have enough points for this redemption.",
            variant: "destructive"
          });
          setIsLoading(false);
          return;
        }
        
        if (loyaltyPointsToUse < 100) {
          toast({
            title: "Minimum points required",
            description: "You need at least 100 points to redeem.",
            variant: "destructive"
          });
          setIsLoading(false);
          return;
        }
      }

      // Handle payment based on method
      if (customerDetails.paymentMethod === 'online') {
        // Process online payment with Razorpay - ONLY CREATE ORDER AFTER SUCCESSFUL PAYMENT
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
            description: paymentResult.error || "Payment was cancelled or failed. No money was charged.",
            variant: "destructive"
          });
          setIsLoading(false);
          return;
        }

        // ✅ PAYMENT SUCCESSFUL - NOW CREATE ORDER
        console.log('Payment successful, creating order...', paymentResult);
        
        const order = {
          id: orderId,
          items: [...items],
          customerDetails: { ...customerDetails },
          totalPrice: totalAmount,
          deliveryCharge: deliveryInfo.charge,
          timestamp: new Date().toISOString(),
          status: 'confirmed' as const,
          paymentStatus: 'completed' as const,
          paymentId: paymentResult.paymentId || 'razorpay_payment',
          paymentMethod: 'online'
        };
        
        const success = await addOrder(order);
        
        // Redeem loyalty points if used
        if (useLoyaltyPoints && loyaltyPointsToUse > 0 && user?.id) {
          const redeemSuccess = redeemCustomPoints(loyaltyPointsToUse, loyaltyDiscount, orderId);
          if (redeemSuccess) {
            toast({
              title: `${loyaltyPointsToUse} loyalty points redeemed! 💎`,
              description: `You saved ₹${loyaltyDiscount} with your loyalty points.`,
            });
          }
        }
        
        clearCart();

        toast({
          title: "Payment Successful! 🎉",
          description: `Order ID: ${orderId}. Payment of ₹${totalAmount} completed successfully.`,
        });

        navigate(`/order-confirmation/${orderId}`);

      } else {
        // ✅ HANDLE COD ORDER - CREATE IMMEDIATELY (NO PAYMENT REQUIRED)
        console.log('Creating COD order...');
        
        const order = {
          id: orderId,
          items: [...items],
          customerDetails: { ...customerDetails },
          totalPrice: totalAmount,
          deliveryCharge: deliveryInfo.charge,
          timestamp: new Date().toISOString(),
          status: 'confirmed' as const,
          paymentStatus: 'pending' as const,
          paymentMethod: 'cod'
        };
        
        const success = await addOrder(order);
        
        // Redeem loyalty points if used
        if (useLoyaltyPoints && loyaltyPointsToUse > 0 && user?.id) {
          const redeemSuccess = redeemCustomPoints(loyaltyPointsToUse, loyaltyDiscount, orderId);
          if (redeemSuccess) {
            toast({
              title: `${loyaltyPointsToUse} loyalty points redeemed! 💎`,
              description: `You saved ₹${loyaltyDiscount} with your loyalty points.`,
            });
          }
        }
        
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-4 sm:py-8 pb-20 md:pb-8 checkout-page">
      <div className="container mx-auto px-3 sm:px-4 max-w-6xl checkout-form">
        {/* Header */}
        <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 p-3 min-h-[44px] min-w-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Customer Details Form */}
          <div className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium mb-2 block">Full Name *</Label>
                    <Input
                      id="name"
                      value={customerDetails.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      className={`h-12 text-base px-4 ${errors.name ? 'border-red-500' : ''}`}
                      style={{ fontSize: '16px' }} // Prevents zoom on iOS
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium mb-2 block">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={customerDetails.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="10-digit mobile number"
                      className={`h-12 text-base px-4 ${errors.phone ? 'border-red-500' : ''}`}
                      style={{ fontSize: '16px' }}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium mb-2 block">Email (Optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerDetails.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      className="h-12 text-base px-4"
                      style={{ fontSize: '16px' }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address" className="text-sm font-medium mb-2 block">Full Address *</Label>
                  <Textarea
                    id="address"
                    value={customerDetails.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="House/Flat No., Street, Landmark"
                    className={`min-h-[100px] text-base px-4 py-3 ${errors.address ? 'border-red-500' : ''}`}
                    style={{ fontSize: '16px' }}
                    rows={3}
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-sm font-medium mb-2 block">City *</Label>
                    <Input
                      id="city"
                      value={customerDetails.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Your city"
                      className={`h-12 text-base px-4 ${errors.city ? 'border-red-500' : ''}`}
                      style={{ fontSize: '16px' }}
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <Label htmlFor="pincode" className="text-sm font-medium mb-2 block">Pincode *</Label>
                    <Input
                      id="pincode"
                      type="tel"
                      value={customerDetails.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value)}
                      placeholder="6-digit pincode"
                      className={`h-12 text-base px-4 ${errors.pincode ? 'border-red-500' : ''}`}
                      style={{ fontSize: '16px' }}
                    />
                    {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={customerDetails.paymentMethod}
                  onValueChange={(value) => handleInputChange('paymentMethod', value as 'cod' | 'online')}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer min-h-[60px]">
                    <RadioGroupItem value="online" id="online" className="flex-shrink-0" />
                    <Label htmlFor="online" className="flex items-center gap-3 cursor-pointer flex-1">
                      <Wallet className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-base">Online Payment</p>
                        <p className="text-sm text-gray-600">UPI, Cards, Net Banking</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer min-h-[60px]">
                    <RadioGroupItem value="cod" id="cod" className="flex-shrink-0" />
                    <Label htmlFor="cod" className="flex items-center gap-3 cursor-pointer flex-1">
                      <CreditCard className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-base">Cash on Delivery</p>
                        <p className="text-sm text-gray-600">Pay when order arrives</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
                
                <div className="mt-4">
                  <Label htmlFor="notes" className="text-sm font-medium mb-2 block">Special Instructions (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={customerDetails.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Any special instructions for delivery..."
                    className="text-base px-4 py-3"
                    style={{ fontSize: '16px' }}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="lg:sticky lg:top-8">
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
                  
                  {/* Loyalty Points Section */}
                  {user && userPoints > 0 && (
                    <div className="border rounded-lg p-4 bg-gradient-to-r from-purple-50 to-pink-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Coins className="w-4 h-4 text-purple-600" />
                          <span className="font-medium text-purple-800 text-sm sm:text-base">Use Loyalty Points</span>
                        </div>
                        <div className="text-xs sm:text-sm text-purple-600">
                          {userPoints} points available (₹{getPointsValue(userPoints)})
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 mb-3">
                        <Checkbox
                          id="use-loyalty-points"
                          checked={useLoyaltyPoints}
                          onCheckedChange={(checked) => {
                            setUseLoyaltyPoints(checked as boolean);
                            if (!checked) {
                              setLoyaltyPointsToUse(0);
                            } else {
                              // Auto-set to maximum usable points
                              const maxUsablePoints = Math.min(userPoints, Math.floor(finalPrice * 10)); // Max 100% of order value
                              const roundedPoints = Math.floor(maxUsablePoints / 100) * 100; // Round to nearest 100
                              setLoyaltyPointsToUse(Math.max(100, roundedPoints)); // Minimum 100 points
                            }
                          }}
                          className="w-5 h-5"
                        />
                        <Label htmlFor="use-loyalty-points" className="text-sm flex-1">
                          Apply loyalty points discount
                        </Label>
                      </div>
                      
                      {useLoyaltyPoints && (
                        <div className="space-y-3">
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                            <Input
                              type="number"
                              min="100"
                              max={Math.min(userPoints, Math.floor(finalPrice * 10))}
                              step="100"
                              value={loyaltyPointsToUse}
                              onChange={(e) => {
                                const points = parseInt(e.target.value) || 0;
                                const maxPoints = Math.min(userPoints, Math.floor(finalPrice * 10));
                                setLoyaltyPointsToUse(Math.min(points, maxPoints));
                              }}
                              className="flex-1 text-sm h-10"
                              placeholder="Points to use"
                              style={{ fontSize: '16px' }}
                            />
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const maxPoints = Math.min(userPoints, Math.floor(finalPrice * 10));
                                const roundedPoints = Math.floor(maxPoints / 100) * 100;
                                setLoyaltyPointsToUse(Math.max(100, roundedPoints));
                              }}
                              className="h-10 px-4 min-w-[60px]"
                            >
                              Max
                            </Button>
                          </div>
                          
                          {loyaltyPointsToUse > 0 && (
                            <div className="flex justify-between text-sm">
                              <span className="text-purple-600">
                                Loyalty Discount ({loyaltyPointsToUse} points)
                              </span>
                              <span className="text-purple-600 font-medium">
                                -₹{getPointsValue(loyaltyPointsToUse)}
                              </span>
                            </div>
                          )}
                          
                          <div className="text-xs text-gray-600 space-y-1">
                            <div>• Minimum 100 points required</div>
                            <div>• 1 point = ₹0.10 discount</div>
                            <div>• Maximum {Math.floor(finalPrice * 10)} points can be used</div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    {isFirstOrder ? (
                      <span className="text-green-600 flex items-center gap-1">
                        <Gift className="w-4 h-4" />
                        FREE (First Order)
                      </span>
                    ) : deliveryInfo.charge === 0 ? (
                      <span className="text-green-600 flex items-center gap-1">
                        <Gift className="w-4 h-4" />
                        FREE
                      </span>
                    ) : (
                      <span>₹{deliveryInfo.charge}</span>
                    )}
                  </div>
                  
                  {/* No need for free shipping message since all orders are free */}
                  
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
                    <span>₹{finalPrice + deliveryInfo.charge - (useLoyaltyPoints ? getPointsValue(loyaltyPointsToUse) : 0)}</span>
                  </div>
                  
                  {/* Promo Code Section */}
                  <div className="pt-4 border-t border-gray-200">
                    {!discountCode ? (
                      <div className="space-y-3">
                        <Label className="text-sm font-medium flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          Have a promo code?
                        </Label>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Input
                            placeholder="Enter code (e.g., PRAYAN10)"
                            value={promoCode}
                            onChange={(e) => {
                              setPromoCode(e.target.value.toUpperCase());
                              setPromoError('');
                            }}
                            className="flex-1 h-12 text-base px-4"
                            style={{ fontSize: '16px' }}
                          />
                          <Button 
                            variant="outline" 
                            onClick={handleApplyPromoCode}
                            disabled={!promoCode.trim()}
                            className="h-12 px-6 min-w-[100px]"
                          >
                            Apply
                          </Button>
                        </div>
                        {promoError && (
                          <p className="text-red-500 text-sm error-message">{promoError}</p>
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
                          className="text-green-700 hover:text-green-800 h-8"
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
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 h-12 text-base font-semibold"
                  size="lg"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {customerDetails.paymentMethod === 'online' ? 'Processing Payment...' : 'Placing Order...'}
                    </div>
                  ) : (
                    customerDetails.paymentMethod === 'online' 
                      ? `Pay ₹${finalPrice + deliveryInfo.charge - (useLoyaltyPoints ? getPointsValue(loyaltyPointsToUse) : 0)} - Razorpay`
                      : `Place Order - ₹${finalPrice + deliveryInfo.charge - (useLoyaltyPoints ? getPointsValue(loyaltyPointsToUse) : 0)}`
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center px-4">
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