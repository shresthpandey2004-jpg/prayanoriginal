import React from 'react';
import { Star } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gold font-medium tracking-widest uppercase mb-3">
            Customer Love
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Join Our <span className="text-gradient-gold">Family</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the authentic taste of traditional spices with PRAYAN. Quality you can trust, flavors you'll love.
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-gold" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">Premium Quality</h3>
            <p className="text-muted-foreground">Hand-selected spices from the finest farms across India</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-gold" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">100% Authentic</h3>
            <p className="text-muted-foreground">Traditional grinding methods preserve natural flavors and aroma</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-gold" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">Fresh & Pure</h3>
            <p className="text-muted-foreground">No artificial colors, preservatives, or additives</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-lg text-foreground mb-4">
            Ready to experience the difference?
          </p>
          <div className="flex items-center justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={24} className="text-gold fill-gold" />
            ))}
          </div>
          <p className="text-muted-foreground mt-2">
            Start your culinary journey with PRAYAN
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
