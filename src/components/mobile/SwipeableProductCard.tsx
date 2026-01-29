import React, { useState } from 'react';
import { Star, ShoppingBag, Heart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Product } from '@/data/products';
import { cn } from '@/lib/utils';
import TouchFriendlyButton from '@/components/common/TouchFriendlyButton';
import OptimizedImage from '@/components/common/ImageOptimizer';

interface SwipeableProductCardProps {
  product: Product;
  className?: string;
}

const SwipeableProductCard: React.FC<SwipeableProductCardProps> = ({ product, className }) => {
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isSwipeAction, setIsSwipeAction] = useState(false);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Left swipe - Add to cart
      handleAddToCart();
      setIsSwipeAction(true);
      setTimeout(() => setIsSwipeAction(false), 300);
    }
    
    if (isRightSwipe) {
      // Right swipe - Add to wishlist
      setIsLiked(!isLiked);
      setIsSwipeAction(true);
      setTimeout(() => setIsSwipeAction(false), 300);
    }
  };

  const handleAddToCart = () => {
    const defaultWeight = product.weightOptions?.[0] || { 
      weight: product.weight, 
      price: product.price, 
      originalPrice: product.originalPrice 
    };
    
    addToCart({
      id: product.id,
      name: `${product.name} (${defaultWeight.weight})`,
      price: defaultWeight.price,
      originalPrice: defaultWeight.originalPrice,
      image: product.image,
      weight: defaultWeight.weight,
    });
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className={cn(
        "group relative bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300",
        "transform-gpu hover:shadow-xl hover:-translate-y-1",
        isSwipeAction && "scale-105 shadow-2xl",
        className
      )}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Swipe Indicators */}
      <div className="absolute top-2 left-2 right-2 z-10 flex justify-between pointer-events-none">
        <div className={cn(
          "bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold transition-all duration-300",
          "flex items-center gap-1",
          touchEnd && touchStart && (touchStart - touchEnd) < -20 ? "opacity-100 scale-100" : "opacity-0 scale-75"
        )}>
          <Heart size={12} />
          Swipe →
        </div>
        <div className={cn(
          "bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold transition-all duration-300",
          "flex items-center gap-1",
          touchEnd && touchStart && (touchStart - touchEnd) > 20 ? "opacity-100 scale-100" : "opacity-0 scale-75"
        )}>
          ← Add Cart
          <ShoppingBag size={12} />
        </div>
      </div>

      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            NEW
          </span>
        )}
        {discount > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}
      </div>

      {/* Quick Actions */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <TouchFriendlyButton
          variant="ghost"
          size="sm"
          className={cn(
            "w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-md",
            isLiked ? "text-red-500" : "text-gray-600"
          )}
          onClick={(e) => {
            e.preventDefault();
            setIsLiked(!isLiked);
          }}
        >
          <Heart size={16} className={isLiked ? "fill-current" : ""} />
        </TouchFriendlyButton>
      </div>

      {/* Image */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <OptimizedImage
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-orange-600 transition-colors">
            {product.name}
          </h3>
          {product.nameHindi && (
            <p className="text-sm text-gray-500 mb-2 line-clamp-1">{product.nameHindi}</p>
          )}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={cn(
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Price & Weight */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
            {product.weight}
          </span>
        </div>

        {/* Add to Cart Button */}
        <TouchFriendlyButton
          variant="primary"
          size="md"
          className="w-full"
          onClick={handleAddToCart}
          disabled={!product.isInStock}
        >
          <ShoppingBag size={16} />
          {product.isInStock ? 'Add to Cart' : 'Out of Stock'}
        </TouchFriendlyButton>
      </div>

      {/* Swipe Instructions (show once) */}
      <div className="absolute bottom-2 left-2 right-2 z-10 pointer-events-none">
        <div className="bg-black/70 text-white text-xs px-2 py-1 rounded-full text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          ← Swipe to add to cart • Swipe to like →
        </div>
      </div>
    </div>
  );
};

export default SwipeableProductCard;