import React from 'react';
import { Shield, Leaf, Award, Heart, Truck, Clock } from 'lucide-react';

const features = [
  {
    icon: Leaf,
    title: '100% Pure & Natural',
    description: 'No additives, no preservatives. Just pure, unadulterated spices from nature.',
    color: 'text-cardamom',
    bgColor: 'bg-cardamom/10',
  },
  {
    icon: Shield,
    title: 'Authenticity Guaranteed',
    description: 'Every batch is tested and certified for purity and quality standards.',
    color: 'text-gold',
    bgColor: 'bg-gold/10',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Hand-picked from the finest farms and processed with traditional methods.',
    color: 'text-saffron',
    bgColor: 'bg-saffron/10',
  },
  {
    icon: Heart,
    title: 'Made with Love',
    description: 'Every spice carries the warmth of Indian tradition and generations of expertise.',
    color: 'text-chili',
    bgColor: 'bg-chili/10',
  },
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'FREE delivery on all orders across India - no minimum required!',
    color: 'text-cinnamon',
    bgColor: 'bg-cinnamon/10',
  },
  {
    icon: Clock,
    title: 'Fresh Always',
    description: 'Ground fresh in small batches to ensure maximum flavor and aroma.',
    color: 'text-turmeric',
    bgColor: 'bg-turmeric/10',
  },
];

const WhyChooseUsSection: React.FC = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why Choose <span className="text-gradient-gold">PRAYAN</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            For over 70 years, we have been the trusted choice for millions of Indian families.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/20 transition-all duration-500 hover:shadow-glow hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon size={28} className={feature.color} />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative Corner */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gold/20 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8">
          {['FSSAI Certified', 'ISO 22000:2018', 'HACCP Certified', 'Organic Certified'].map((badge) => (
            <div
              key={badge}
              className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-full"
            >
              <Shield size={16} className="text-gold" />
              <span className="text-sm font-medium text-foreground">{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
