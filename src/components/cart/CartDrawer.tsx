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
        "fixed top-0 right-0 h-full w-full max-w-sm bg-gradient-to-b from-orange-50 to-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col cart-drawer",
        "sm:max-w-md md:max-w-lg",
        isCartOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-orange-100 bg-gradient-to-r from-orange-500 to-red-500 text-white flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-full">
              <ShoppingBag size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold">
                Shopping Cart
              </h2>
              {totalItems > 0 && (
                <p className="text-orange-100 text-sm">
                  {totalItems} item{totalItems > 1 ? 's' : ''} in cart
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-white/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Content */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 text-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mb-6 shadow-lg">
              <ShoppingBag size={32} className="text-orange-500" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">Your cart is empty</h3>
            <p className="text-gray-600 mb-8 max-w-xs">
              Add some delicious spices to get started on your culinary journey!
            </p>
            <Button 
              onClick={() => setIsCartOpen(false)}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <Link to="/shop" className="flex items-center gap-2">
                <Sparkles size={18} />
                Continue Shopping
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 cart-drawer-content">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-4 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl shadow-md"
                      />
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{item.quantity}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-800 text-sm sm:text-base truncate">
                        {item.name}
                      </h4>
                      <p className="text-orange-600 text-sm font-medium mb-2">{item.weight}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className="w-8 h-8 rounded-full bg-orange-100 hover:bg-orange-200 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300"
                            disabled={item.quantity <= 1}
                            style={{ WebkitTapHighlightColor: 'transparent' }}
                          >
                            <Minus size={14} className="text-orange-600" />
                          </button>
                          
                          <span className="w-8 text-center text-sm font-bold text-gray-800">
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-orange-100 hover:bg-orange-200 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300"
                            style={{ WebkitTapHighlightColor: 'transparent' }}
                          >
                            <Plus size={14} className="text-orange-600" />
                          </button>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg text-gray-800">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
                            style={{ WebkitTapHighlightColor: 'transparent' }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="border-t border-orange-100 p-4 sm:p-6 space-y-4 bg-gradient-to-r from-orange-50 to-red-50 flex-shrink-0 pb-20 md:pb-6 cart-drawer-summary">
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                    <span className="font-bold text-gray-800">₹{totalPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Delivery charges</span>
                    <span className="text-green-600 font-bold flex items-center gap-1">
                      <Sparkles size={14} />
                      FREE on 1st order 🎉
                    </span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                    <span className="font-bold text-lg text-gray-800">Total</span>
                    <span className="font-bold text-xl text-orange-600">₹{totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-4 border border-green-200">
                <div className="flex items-center gap-2">
                  <Sparkles className="text-green-600" size={16} />
                  <span className="text-green-800 font-medium text-sm">
                    🎉 FREE delivery on your first order!
                  </span>
                </div>
              </div>

              <Button
                asChild
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 text-base font-bold min-h-[56px] cart-drawer-button rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
                onClick={() => setIsCartOpen(false)}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <Link to="/checkout" className="flex items-center justify-center gap-3">
                  <ShoppingBag size={20} />
                  Proceed to Checkout
                  <ArrowRight size={20} />
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
