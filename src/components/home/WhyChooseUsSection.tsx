import React from 'react';
import { Shield, Leaf, Award, Heart, Truck, Clock } from 'lucide-react';

const features = [
  {
    icon: Leaf,
    title: 'Fresh',
    subtitle: 'GROUND',
    description: 'Stone-ground weekly for maximum flavor and aroma retention.',
    color: 'text-cardamom',
    bgColor: 'bg-cardamom/10',
  },
  {
    icon: Shield,
    title: '100%',
    subtitle: 'PURE',
    description: 'No additives, no preservatives. Just pure, authentic spices.',
    color: 'text-gold',
    bgColor: 'bg-gold/10',
  },
  {
    icon: Award,
    title: 'Lab',
    subtitle: 'TESTED',
    description: 'Every batch is tested and certified for purity and quality.',
    color: 'text-saffron',
    bgColor: 'bg-saffron/10',
  },
  {
    icon: Heart,
    title: 'Best',
    subtitle: 'QUALITY',
    description: 'Hand-picked from the finest farms across India.',
    color: 'text-chili',
    bgColor: 'bg-chili/10',
  },
];

const WhyChooseUsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-red-800 to-red-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute top-20 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-10 left-1/4 w-16 h-16 border border-white/20 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-yellow-400" />
            <span className="text-yellow-400 font-semibold uppercase tracking-wider text-sm">
              WHY CHOOSE US
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Authentic Spices: <span className="text-yellow-400">Taste the Difference</span>
          </h2>
          <p className="text-red-100 max-w-3xl mx-auto text-lg">
            For over 70 years, we have been the trusted choice for millions of Indian families who demand nothing but the best.
          </p>
        </div>

        {/* Features Grid - Mobile 2 cols, Desktop 4 cols */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 lg:p-8 border border-white/20 hover:border-yellow-400/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:bg-white/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto">
                <feature.icon size={24} className="text-yellow-400 md:w-7 md:h-7" />
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-yellow-400 font-semibold text-xs md:text-sm uppercase tracking-wider mb-3 md:mb-4">
                  {feature.subtitle}
                </p>
                <p className="text-red-100 text-sm md:text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-3 right-3 w-6 h-6 md:w-8 md:h-8 border-t-2 border-r-2 border-yellow-400/30 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 md:mt-16">
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-red-900 px-6 py-3 rounded-full font-bold text-lg hover:bg-yellow-300 transition-colors cursor-pointer">
            <span>Shop Now</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 md:mt-16 flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {['FSSAI Certified', 'ISO 22000:2018', 'HACCP Certified', 'Organic Certified'].map((badge) => (
            <div
              key={badge}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 md:px-4 md:py-2 rounded-full border border-white/20"
            >
              <Shield size={14} className="text-yellow-400 md:w-4 md:h-4" />
              <span className="text-xs md:text-sm font-medium text-white">{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
