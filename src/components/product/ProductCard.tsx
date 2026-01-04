import React from 'react';
import { Star, ShoppingBag, Heart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Product } from '@/data/products';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
  viewMode?: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className, viewMode = 'grid' }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      weight: product.weight,
    });
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // List view layout
  if (viewMode === 'list') {
    return (
      <Link
        to={`/product/${product.id}`}
        className={cn(
          'group flex bg-card rounded-xl overflow-hidden border border-border transition-all duration-300 hover:shadow-md',
          className
        )}
      >
        <div className="relative w-48 h-32 flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop';
            }}
          />
          {discount > 0 && (
            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{discount}%
            </span>
          )}
        </div>
        
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
            {product.nameHindi && (
              <p className="text-sm text-muted-foreground mb-2">{product.nameHindi}</p>
            )}
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
            
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{product.rating}</span>
              </div>
              <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
              <span className="text-xs bg-secondary px-2 py-1 rounded">{product.weight}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
              )}
            </div>
            <Button
              onClick={handleAddToCart}
              size="sm"
              className="flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/product/${product.id}`}
      className={cn(
        'group relative bg-card rounded-2xl overflow-hidden border border-border transition-all duration-500 hover:shadow-glow hover:-translate-y-2',
        className
      )}
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full animate-pulse-glow">
            NEW
          </span>
        )}
        {product.isBestSeller && (
          <span className="bg-gold text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
            BESTSELLER
          </span>
        )}
        {discount > 0 && (
          <span className="bg-chili text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
            -{discount}%
          </span>
        )}
        {!product.isInStock && (
          <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            OUT OF STOCK
          </span>
        )}
        {product.isInStock && product.stock && product.lowStockThreshold && product.stock <= product.lowStockThreshold && (
          <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            LOW STOCK
          </span>
        )}
      </div>

      {/* Quick Actions */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
        <button
          className="p-2.5 bg-background/90 backdrop-blur-sm rounded-full shadow-soft hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={(e) => e.preventDefault()}
        >
          <Heart size={18} />
        </button>
        <button
          className="p-2.5 bg-background/90 backdrop-blur-sm rounded-full shadow-soft hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={(e) => e.preventDefault()}
        >
          <Eye size={18} />
        </button>
      </div>

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop';
          }}
        />
        {/* Glow overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          {product.category}
        </p>

        {/* Name */}
        <h3 className="font-display text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        {product.nameHindi && (
          <p className="text-sm text-muted-foreground mb-2">{product.nameHindi}</p>
        )}

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={cn(
                  'transition-colors',
                  i < Math.floor(product.rating)
                    ? 'text-gold fill-gold'
                    : 'text-muted'
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Price & Weight */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
            {product.weight}
          </span>
        </div>

        {/* Add to Cart */}
        <Button
          variant="premium"
          className="w-full gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
          onClick={handleAddToCart}
          disabled={product.isInStock === false}
        >
          <ShoppingBag size={16} />
          {product.isInStock === false ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
    </Link>
  );
};

export default ProductCard;
