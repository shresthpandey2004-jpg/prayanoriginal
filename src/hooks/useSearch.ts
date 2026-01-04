import { useState, useMemo } from 'react';
import { Product } from '@/data/products';

export interface SearchFilters {
  category: string;
  priceRange: [number, number];
  inStock: boolean;
  rating: number;
  sortBy: 'name' | 'price-low' | 'price-high' | 'rating' | 'newest';
}

export const useSearch = (products: Product[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    category: 'all',
    priceRange: [0, 1000],
    inStock: false,
    rating: 0,
    sortBy: 'name'
  });

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Search by name or description
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.nameHindi?.includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.ingredients?.some(ingredient => 
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Filter by price range
    filtered = filtered.filter(product =>
      product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1]
    );

    // Filter by stock availability
    if (filters.inStock) {
      filtered = filtered.filter(product => product.isInStock !== false);
    }

    // Filter by rating
    if (filters.rating > 0) {
      filtered = filtered.filter(product => product.rating >= filters.rating);
    }

    // Sort products
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'name':
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [products, searchTerm, filters]);

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      priceRange: [0, 1000],
      inStock: false,
      rating: 0,
      sortBy: 'name'
    });
    setSearchTerm('');
  };

  const categories = useMemo(() => {
    const cats = products.map(p => p.category);
    return ['all', ...Array.from(new Set(cats))];
  }, [products]);

  return {
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    clearFilters,
    filteredProducts,
    categories,
    totalResults: filteredProducts.length
  };
};