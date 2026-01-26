import React from 'react';
import { Award, Gift, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LimitedTimeOfferSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-accent relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-gold" />
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-saffron/10 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Mobile-First Layout */}
        <div className="text-center lg:text-left space-y-6 lg:space-y-0">
          
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 lg:gap-8">
            {/* Left Content */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="flex w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gold/20 items-center justify-center flex-shrink-0">
                <Gift className="text-gold" size={24} />
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                  <Award className="text-gold" size={16} />
                  <span className="text-xs sm:text-sm font-semibold text-accent-foreground uppercase tracking-wider">
                    Why Choose Us
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-accent-foreground leading-tight">
                  Authentic Spices: <span className="text-gold">Taste the Difference</span>
                </h3>
              </div>
            </div>

            {/* CTA Button - Top right on desktop, bottom on mobile */}
            <div className="order-3 lg:order-2">
              <Button variant="hero" asChild className="px-6 py-3">
                <Link to="/shop" className="gap-2">
                  Shop Now <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
          </div>

          {/* Quality Features - Better mobile layout */}
          <div className="order-2 lg:order-3 mt-6 lg:mt-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
              {[
                { value: 'Fresh', label: 'Ground' },
                { value: '100%', label: 'Pure' },
                { value: 'Lab', label: 'Tested' },
                { value: 'Best', label: 'Quality' },
              ].map((item) => (
                <div key={item.label} className="bg-background rounded-xl p-3 sm:p-4 text-center shadow-soft">
                  <p className="font-display text-base sm:text-lg lg:text-xl font-bold text-foreground">
                    {item.value}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LimitedTimeOfferSection;
