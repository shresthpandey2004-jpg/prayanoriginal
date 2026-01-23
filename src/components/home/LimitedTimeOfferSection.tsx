import React from 'react';
import { Award, Gift, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LimitedTimeOfferSection: React.FC = () => {
  return (
    <section className="py-16 bg-accent relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-gold" />
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-saffron/10 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Content */}
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex w-16 h-16 rounded-2xl bg-gold/20 items-center justify-center">
              <Gift className="text-gold" size={32} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Award className="text-gold" size={18} />
                <span className="text-sm font-semibold text-accent-foreground uppercase tracking-wider">
                  Why Choose Us
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-accent-foreground">
                Authentic Spices: <span className="text-gold">Taste the Difference</span>
              </h3>
            </div>
          </div>

          {/* Quality Features */}
          <div className="flex items-center gap-3">
            {[
              { value: 'Fresh', label: 'Ground' },
              { value: '100%', label: 'Pure' },
              { value: 'Lab', label: 'Tested' },
              { value: 'Best', label: 'Quality' },
            ].map((item, index) => (
              <React.Fragment key={item.label}>
                <div className="bg-background rounded-xl p-3 min-w-[70px] text-center shadow-soft">
                  <p className="font-display text-lg md:text-xl font-bold text-foreground">
                    {item.value}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase">{item.label}</p>
                </div>
                {index < 3 && (
                  <span className="text-2xl font-bold text-accent-foreground/50">•</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* CTA */}
          <Button variant="hero" asChild>
            <Link to="/shop" className="gap-2">
              Shop Now <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LimitedTimeOfferSection;
