import React from 'react';
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const CartDrawer: React.FC = () => {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  if (!isCartOpen) return null;

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
        "fixed top-0 right-0 h-full bg-gradient-to-b from-orange-50 to-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col cart-drawer",
        // Mobile: Full width with max constraints
        "w-full max-w-sm",
        // Tablet: Slightly wider
        "sm:max-w-md",
        // Desktop: Much smaller, more compact
        "lg:max-w-sm xl:max-w-md 2xl:max-w-lg",
        // Desktop positioning - smaller and more compact
        "lg:w-96 xl:w-[420px] 2xl:w-[480px]",
        isCartOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 lg:p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white flex-shrink-0">
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="p-1.5 lg:p-2 bg-white/20 rounded-full">
              <ShoppingBag size={16} className="text-white lg:w-5 lg:h-5" />
            </div>
            <div>
              <h2 className="text-base lg:text-lg font-bold">
                Shopping Cart
              </h2>
              {totalItems > 0 && (
                <p className="text-orange-100 text-xs lg:text-sm">
                  {totalItems} item{totalItems > 1 ? 's' : ''} in cart
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 lg:p-2 hover:bg-white/20 rounded-full transition-colors"
            style={{ WebkitTapHighlightColor: 'transparent', outline: 'none', border: 'none' }}
          >
            <X size={16} className="lg:w-5 lg:h-5" />
          </button>
        </div>

        {/* Cart Content */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-6 text-center">
            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mb-4 lg:mb-6 shadow-lg">
              <ShoppingBag size={24} className="text-orange-500 lg:w-8 lg:h-8" />
            </div>
            <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-2 lg:mb-3">Your cart is empty</h3>
            <p className="text-gray-600 mb-6 lg:mb-8 max-w-xs text-sm lg:text-base">
              Add some delicious spices to get started on your culinary journey!
            </p>
            <Button 
              onClick={() => setIsCartOpen(false)}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-sm lg:text-base"
              style={{ WebkitTapHighlightColor: 'transparent', outline: 'none', border: 'none' }}
            >
              <Link to="/shop" className="flex items-center gap-2">
                <Sparkles size={16} />
                Continue Shopping
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-4 space-y-3 lg:space-y-3 cart-drawer-content">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-xl lg:rounded-lg p-3 lg:p-3 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 lg:w-14 lg:h-14 object-cover rounded-lg shadow-md"
                      />
                      <div className="absolute -top-1 -right-1 w-5 h-5 lg:w-5 lg:h-5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{item.quantity}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-800 text-xs lg:text-sm truncate">
                        {item.name}
                      </h4>
                      <p className="text-orange-600 text-xs lg:text-xs font-medium mb-1 lg:mb-2">{item.weight}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 lg:gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className="w-6 h-6 lg:w-7 lg:h-7 rounded-full bg-orange-100 hover:bg-orange-200 flex items-center justify-center transition-colors"
                            disabled={item.quantity <= 1}
                            style={{ WebkitTapHighlightColor: 'transparent', outline: 'none', border: 'none' }}
                          >
                            <Minus size={12} className="text-orange-600" />
                          </button>
                          
                          <span className="w-6 lg:w-7 text-center text-xs lg:text-sm font-bold text-gray-800">
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 lg:w-7 lg:h-7 rounded-full bg-orange-100 hover:bg-orange-200 flex items-center justify-center transition-colors"
                            style={{ WebkitTapHighlightColor: 'transparent', outline: 'none', border: 'none' }}
                          >
                            <Plus size={12} className="text-orange-600" />
                          </button>
                        </div>
                        
                        <div className="flex items-center gap-1 lg:gap-2">
                          <span className="font-bold text-sm lg:text-base text-gray-800">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 lg:p-1.5 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            style={{ WebkitTapHighlightColor: 'transparent', outline: 'none', border: 'none' }}
                          >
                            <Trash2 size={12} className="lg:w-4 lg:h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="p-3 sm:p-4 lg:p-4 space-y-3 lg:space-y-3 bg-gradient-to-r from-orange-50 to-red-50 flex-shrink-0 pb-20 md:pb-4 lg:pb-4 cart-drawer-summary">
              <div className="bg-white rounded-xl lg:rounded-lg p-3 lg:p-3 shadow-lg">
                <div className="space-y-2 lg:space-y-2 text-xs lg:text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                    <span className="font-bold text-gray-800">₹{totalPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Delivery charges</span>
                    <span className="text-green-600 font-bold flex items-center gap-1">
                      <Sparkles size={12} />
                      FREE on 1st order 🎉
                    </span>
                  </div>
                  
                  <div className="pt-2 lg:pt-2 flex justify-between items-center">
                    <span className="font-bold text-base lg:text-lg text-gray-800">Total</span>
                    <span className="font-bold text-lg lg:text-xl text-orange-600">₹{totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl lg:rounded-lg p-3 lg:p-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="text-green-600" size={14} />
                  <span className="text-green-800 font-medium text-xs lg:text-sm">
                    🎉 FREE delivery on your first order!
                  </span>
                </div>
              </div>

              <Button
                asChild
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 lg:py-3 text-sm lg:text-base font-bold min-h-[48px] lg:min-h-[52px] cart-drawer-button rounded-xl lg:rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => setIsCartOpen(false)}
                style={{ WebkitTapHighlightColor: 'transparent', outline: 'none', border: 'none' }}
              >
                <Link to="/checkout" className="flex items-center justify-center gap-2 lg:gap-3">
                  <ShoppingBag size={16} className="lg:w-5 lg:h-5" />
                  Proceed to Checkout
                  <ArrowRight size={16} className="lg:w-5 lg:h-5" />
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
