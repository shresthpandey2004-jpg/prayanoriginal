import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecentlyViewed } from '@/context/RecentlyViewedContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Clock } from 'lucide-react';

interface RecentlyViewedProps {
  className?: string;
  showTitle?: boolean;
  maxItems?: number;
}

const RecentlyViewed: React.FC<RecentlyViewedProps> = ({ 
  className = '', 
  showTitle = true,
  maxItems = 6 
}) => {
  const { recentlyViewed } = useRecentlyViewed();
  const navigate = useNavigate();

  if (recentlyViewed.length === 0) {
    return null;
  }

  const displayItems = recentlyViewed.slice(0, maxItems);

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className={`recently-viewed-section ${className}`}>
      {showTitle && (
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-orange-600" />
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            Recently Viewed
          </h3>
          <span className="text-sm text-gray-500">
            ({recentlyViewed.length} items)
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {displayItems.map((product) => (
          <Card 
            key={`${product.id}-${product.viewedAt}`}
            className="cursor-pointer hover:shadow-lg transition-all duration-300 group recently-viewed-card"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <div className="relative overflow-hidden rounded-t-lg">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-24 sm:h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=200&fit=crop';
                }}
              />
              <div className="absolute top-1 right-1">
                <Badge variant="secondary" className="text-xs bg-white/90 text-gray-600">
                  {formatTimeAgo(product.viewedAt)}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-2 sm:p-3">
              <h4 className="font-medium text-xs sm:text-sm text-gray-800 line-clamp-2 mb-1">
                {product.name}
              </h4>
              
              {product.nameHindi && (
                <p className="text-xs text-orange-600 mb-2 line-clamp-1">
                  {product.nameHindi}
                </p>
              )}
              
              <div className="flex items-center gap-1 mb-2">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-gray-600">{product.rating}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-orange-600">
                  ₹{product.price}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xs text-gray-500 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>
              
              <Badge variant="outline" className="text-xs mt-1">
                {product.category}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {recentlyViewed.length > maxItems && (
        <div className="text-center mt-4">
          <button 
            onClick={() => navigate('/recently-viewed')}
            className="text-sm text-orange-600 hover:text-orange-700 font-medium"
          >
            View All {recentlyViewed.length} Recently Viewed Products →
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentlyViewed;