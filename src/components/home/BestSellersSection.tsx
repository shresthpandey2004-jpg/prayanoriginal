import React from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';

const BestSellersSection: React.FC = () => {
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <section className="py-24 bg-secondary/30 pattern-mandala">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Most Loved <span className="text-gradient-gold">Products</span>
            </h2>
          </div>
          <Button variant="outline" size="lg" asChild>
            <Link to="/shop?filter=bestseller" className="gap-2">
              View All <ArrowRight size={18} />
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellersSection;
