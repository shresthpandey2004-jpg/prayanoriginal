import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import PromoBanner from '@/components/PromoBanner';
import ProductCard from '@/components/product/ProductCard';
import { products, categories } from '@/data/products';
import { useSearch } from '@/hooks/useSearch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Search, Filter, X, Star, Grid, List } from 'lucide-react';
import { cn } from '@/lib/utils';

const Shop: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const {
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    clearFilters,
    filteredProducts,
    totalResults
  } = useSearch(products);

  // Handle URL parameters for category filtering
  React.useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      updateFilter('category', categoryParam);
    }
  }, [searchParams, updateFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PromoBanner />
      <CartDrawer />

      {/* Hero */}
      <section className="py-16 bg-gradient-warm pattern-mandala">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-gradient-gold">Spice Collection</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our premium range of hand-picked, stone-ground spices that bring authentic Indian flavors to your kitchen.
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 bg-secondary/30">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search spices, ingredients, or recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>
              <Button
                variant="outline"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="flex items-center gap-2"
              >
                {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Filters</CardTitle>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Category Filter */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Category</Label>
                  <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.slice(1).map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Price Range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
                  </Label>
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value) => updateFilter('priceRange', value)}
                    max={1000}
                    min={0}
                    step={50}
                    className="mt-2"
                  />
                </div>

                {/* Rating Filter */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Minimum Rating</Label>
                  <Select value={filters.rating.toString()} onValueChange={(value) => updateFilter('rating', parseFloat(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Any Rating</SelectItem>
                      <SelectItem value="4">4+ Stars</SelectItem>
                      <SelectItem value="4.5">4.5+ Stars</SelectItem>
                      <SelectItem value="4.8">4.8+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Stock & Sort */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="in-stock"
                      checked={filters.inStock}
                      onCheckedChange={(checked) => updateFilter('inStock', checked)}
                    />
                    <Label htmlFor="in-stock" className="text-sm">In Stock Only</Label>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Sort By</Label>
                    <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Name A-Z</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="newest">Newest First</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing {totalResults} of {products.length} products
              {searchTerm && ` for "${searchTerm}"`}
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => updateFilter('category', cat.id)}
                  className={cn(
                    'px-3 py-1 rounded-full text-xs font-medium transition-all',
                    filters.category === cat.id
                      ? 'bg-primary text-primary-foreground shadow-glow'
                      : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
                  )}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className={cn(
              "grid gap-6",
              viewMode === 'grid' 
                ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                : "grid-cols-1 lg:grid-cols-2"
            )}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Shop;
