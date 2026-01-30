import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/data/products';

interface RecentlyViewedProduct {
  id: string;
  name: string;
  nameHindi?: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  category: string;
  viewedAt: number; // timestamp
}

interface RecentlyViewedContextType {
  recentlyViewed: RecentlyViewedProduct[];
  addToRecentlyViewed: (product: Product) => void;
  clearRecentlyViewed: () => void;
  getRecentlyViewed: () => RecentlyViewedProduct[];
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

const STORAGE_KEY = 'prayan_recently_viewed';
const MAX_RECENT_ITEMS = 6;

export const RecentlyViewedProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedProduct[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Sort by viewedAt timestamp (most recent first)
        const sorted = parsed.sort((a: RecentlyViewedProduct, b: RecentlyViewedProduct) => 
          b.viewedAt - a.viewedAt
        );
        setRecentlyViewed(sorted);
      }
    } catch (error) {
      console.error('Error loading recently viewed products:', error);
    }
  }, []);

  // Save to localStorage whenever recentlyViewed changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recentlyViewed));
    } catch (error) {
      console.error('Error saving recently viewed products:', error);
    }
  }, [recentlyViewed]);

  const addToRecentlyViewed = (product: Product) => {
    const recentProduct: RecentlyViewedProduct = {
      id: product.id,
      name: product.name,
      nameHindi: product.nameHindi,
      image: product.image,
      price: product.price,
      originalPrice: product.originalPrice,
      rating: product.rating,
      category: product.category,
      viewedAt: Date.now()
    };

    setRecentlyViewed(prev => {
      // Remove if already exists
      const filtered = prev.filter(item => item.id !== product.id);
      
      // Add to beginning
      const updated = [recentProduct, ...filtered];
      
      // Keep only MAX_RECENT_ITEMS
      return updated.slice(0, MAX_RECENT_ITEMS);
    });
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const getRecentlyViewed = () => {
    return recentlyViewed;
  };

  return (
    <RecentlyViewedContext.Provider value={{
      recentlyViewed,
      addToRecentlyViewed,
      clearRecentlyViewed,
      getRecentlyViewed
    }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export const useRecentlyViewed = () => {
  const context = useContext(RecentlyViewedContext);
  if (context === undefined) {
    throw new Error('useRecentlyViewed must be used within a RecentlyViewedProvider');
  }
  return context;
};