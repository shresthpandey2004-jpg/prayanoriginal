import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Truck, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const PromoBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { totalPrice, isFreeShipping } = useCart();

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (!isVisible) return null;

  const remainingForFreeShipping = Math.max(0, 499 - totalPrice);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-2 left-4 text-2xl animate-bounce">🎉</div>
          <div className="absolute top-3 right-8 text-xl animate-pulse">🌶️</div>
          <div className="absolute bottom-2 left-12 text-lg animate-bounce delay-300">✨</div>
          <div className="absolute bottom-3 right-4 text-xl animate-pulse delay-500">🎁</div>
        </div>

        <div className="container mx-auto px-4 py-3 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6 flex-1">
              {/* Free Shipping Offer */}
              <motion.div 
                className="flex items-center gap-2"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Truck className="w-5 h-5" />
                <span className="font-semibold">
                  {isFreeShipping ? (
                    <span className="text-yellow-300">🎉 FREE SHIPPING UNLOCKED!</span>
                  ) : (
                    <>
                      FREE SHIPPING on orders above ₹499
                      {totalPrice > 0 && (
                        <span className="ml-2 text-yellow-300">
                          (Add ₹{remainingForFreeShipping} more!)
                        </span>
                      )}
                    </>
                  )}
                </span>
              </motion.div>

              {/* Separator */}
              <div className="hidden md:block w-px h-6 bg-white/30"></div>

              {/* Discount Code Offer */}
              <motion.div 
                className="flex items-center gap-2"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Gift className="w-5 h-5" />
                <span className="font-semibold">Use code</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 px-3 py-1 h-auto font-bold"
                  onClick={() => copyToClipboard('PRAYAN10')}
                >
                  {copiedCode === 'PRAYAN10' ? (
                    <>
                      <Check className="w-3 h-3 mr-1" />
                      COPIED!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 mr-1" />
                      PRAYAN10
                    </>
                  )}
                </Button>
                <span className="font-semibold">for 10% off</span>
              </motion.div>
            </div>

            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 p-1 h-auto ml-4"
              onClick={() => setIsVisible(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden mt-2 space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Gift className="w-4 h-4" />
              <span className="text-sm">Use code</span>
              <Button
                variant="outline"
                size="sm"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30 px-2 py-1 h-auto text-xs font-bold"
                onClick={() => copyToClipboard('PRAYAN10')}
              >
                {copiedCode === 'PRAYAN10' ? (
                  <>
                    <Check className="w-3 h-3 mr-1" />
                    COPIED!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 mr-1" />
                    PRAYAN10
                  </>
                )}
              </Button>
              <span className="text-sm">for 10% off</span>
            </div>
          </div>
        </div>

        {/* Animated Border */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-yellow-300 to-orange-300"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default PromoBanner;