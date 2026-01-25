import React, { useEffect, useState } from 'react';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pattern-mandala">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-10" />
        
        {/* Floating Spice Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-saffron/10 blur-3xl animate-float" />
        <div className="absolute bottom-40 right-40 w-48 h-48 rounded-full bg-gold/10 blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-turmeric/10 blur-2xl animate-float-slow" />
      </div>

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero-spices-new.jpg"
          alt="PRAYAN Premium Indian Spices"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Main Heading */}
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
              Experience the
              <span className="block text-gradient-gold">Authentic Flavors</span>
              of India
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
              From the sacred traditions of Indian kitchens to your home, 
              PRAYAN brings you hand-picked, stone-ground spices that carry 
              the warmth of generations.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Button variant="hero" size="xl" asChild>
                <Link to="/shop" className="gap-3">
                  Shop Now <ArrowRight size={20} />
                </Link>
              </Button>
              <Button variant="glass" size="xl" className="gap-3" asChild>
                <Link to="/about">
                  <Play size={18} className="text-gold" />
                  Our Story
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-8">
              <div className="text-center">
                <p className="font-display text-3xl font-bold text-gold">100%</p>
                <p className="text-sm text-muted-foreground">Pure & Natural</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="font-display text-3xl font-bold text-gold">Fresh</p>
                <p className="text-sm text-muted-foreground">Quality Spices</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="font-display text-3xl font-bold text-gold">2026</p>
                <p className="text-sm text-muted-foreground">Launch Year</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div
            className={`relative hidden lg:block transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-saffron/20 rounded-full blur-3xl" />
              
              {/* Main Product Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-gold animate-float">
                <img
                  src="/hero-spices-new.jpg"
                  alt="PRAYAN Premium Spices Collection"
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
              </div>

              {/* Price Tag */}
              <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground rounded-2xl px-6 py-3 shadow-medium animate-float-slow">
                <p className="text-xs opacity-80">Starting from</p>
                <p className="font-display text-2xl font-bold">₹99</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-fade-in" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
