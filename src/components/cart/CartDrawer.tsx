import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2, Tag, Percent } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCoupons } from '@/context/CouponContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const CartDrawer: React.FC = () => {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  const { appliedCoupon, applyCoupon, removeCoupon, calculateDiscount, getAvailableCoupons } = useCoupons();
  const { user } = useAuth();
  
  const [couponCode, setCouponCode] = useState('');
  const [showAvailableCoupons, setShowAvailableCoupons] = useState(false);

  const isFirstTimeUser = !user || user.createdAt === user.lastLogin;
  const availableCoupons = getAvailableCoupons(totalPrice, isFirstTimeUser);
  const discount = appliedCoupon ? calculateDiscount(appliedCoupon, totalPrice) : 0;
  const finalTotal = totalPrice - discount;

  if (!isCartOpen) return null;

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast({
        title: "Enter coupon code",
        description: "Please enter a valid coupon code.",
        variant: "destructive"
      });
      return;
    }

    const result = applyCoupon(couponCode.trim(), totalPrice, isFirstTimeUser);
    
    if (result.success) {
      toast({
        title: "Coupon applied! 🎉",
        description: result.message,
      });
      setCouponCode('');
      setShowAvailableCoupons(false);
    } else {
      toast({
        title: "Coupon not applied",
        description: result.message,
        variant: "destructive"
      });
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    toast({
      title: "Coupon removed",
      description: "Coupon has been removed from your order.",
    });
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity",
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Cart Drawer */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col",
        "md:max-w-lg",
        isCartOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-orange-500" />
            <h2 className="text-lg font-semibold">
              Shopping Cart
              {totalItems > 0 && (
                <Badge className="ml-2 bg-orange-500 text-white">
                  {totalItems}
                </Badge>
              )}
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Content */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Add some delicious spices to get started!</p>
            <Button 
              onClick={() => setIsCartOpen(false)}
              className="bg-orange-500 hover:bg-orange-600"
            >
              <Link to="/shop" className="flex items-center gap-2">
                Continue Shopping
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-gray-900 truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500 mb-2">{item.weight}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        
                        <span className="w-8 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Section */}
            <div className="border-t border-gray-200 p-4 space-y-3">
              {!appliedCoupon ? (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="flex-1 text-sm"
                    />
                    <Button
                      onClick={handleApplyCoupon}
                      size="sm"
                      variant="outline"
                      className="px-4"
                    >
                      Apply
                    </Button>
                  </div>
                  
                  {availableCoupons.length > 0 && (
                    <div>
                      <button
                        onClick={() => setShowAvailableCoupons(!showAvailableCoupons)}
                        className="text-sm text-orange-500 hover:text-orange-600 flex items-center gap-1"
                      >
                        <Tag size={14} />
                        View available coupons ({availableCoupons.length})
                      </button>
                      
                      {showAvailableCoupons && (
                        <div className="mt-2 space-y-2 max-h-32 overflow-y-auto">
                          {availableCoupons.map((coupon) => (
                            <div
                              key={coupon.code}
                              className="p-2 bg-green-50 border border-green-200 rounded-md cursor-pointer hover:bg-green-100 transition-colors"
                              onClick={() => {
                                setCouponCode(coupon.code);
                                handleApplyCoupon();
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-sm text-green-700">
                                  {coupon.code}
                                </span>
                                <span className="text-xs text-green-600">
                                  {coupon.type === 'percentage' ? `${coupon.value}% OFF` : `₹${coupon.value} OFF`}
                                </span>
                              </div>
                              <p className="text-xs text-green-600 mt-1">
                                {coupon.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Percent size={16} className="text-green-600" />
                    <div>
                      <span className="font-medium text-sm text-green-700">
                        {appliedCoupon.code}
                      </span>
                      <p className="text-xs text-green-600">
                        Saved ₹{discount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-red-500 hover:text-red-600 p-1"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="border-t border-gray-200 p-4 space-y-3 bg-gray-50">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Delivery charges</span>
                  <span className="text-green-600 font-medium">FREE 🎉</span>
                </div>
                
                <div className="border-t border-gray-300 pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
                🎉 FREE delivery on all orders!
              </div>

              <Button
                asChild
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3"
                onClick={() => setIsCartOpen(false)}
              >
                <Link to="/checkout" className="flex items-center justify-center gap-2">
                  Proceed to Checkout
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
