import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';

const NewLaunchSection: React.FC = () => {
  const newProducts = products.filter(p => p.isNew).slice(0, 3);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-saffron/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/20 rounded-full px-4 py-2 mb-4">
            <Sparkles className="text-gold animate-pulse" size={18} />
            <span className="text-sm font-medium text-accent">Just Arrived</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            New <span className="text-gradient-gold">Launches</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our latest additions crafted with the same love and tradition 
            that defines PRAYAN.
          </p>
        </div>

        {/* Glowing Border Container */}
        <div className="relative">
          {/* Animated Border */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-gold via-saffron to-gold rounded-3xl opacity-30 blur-sm animate-pulse" />
          
          <div className="relative bg-card rounded-3xl p-8 md:p-12 border border-gold/20">
            {/* Products Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {newProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <Button variant="premium" size="lg" asChild>
                <Link to="/shop?filter=new" className="gap-2">
                  View All New Arrivals <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewLaunchSection;
