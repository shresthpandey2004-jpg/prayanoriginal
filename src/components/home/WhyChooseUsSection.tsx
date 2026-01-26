import React from 'react';
import { Shield, Leaf, Award, Heart } from 'lucide-react';

const features = [
  {
    icon: Leaf,
    title: 'Fresh',
    subtitle: 'GROUND',
    description: 'Stone-ground weekly for maximum flavor and aroma retention.',
  },
  {
    icon: Shield,
    title: '100%',
    subtitle: 'PURE',
    description: 'No additives, no preservatives. Just pure, authentic spices.',
  },
  {
    icon: Award,
    title: 'Lab',
    subtitle: 'TESTED',
    description: 'Every batch is tested and certified for purity and quality.',
  },
  {
    icon: Heart,
    title: 'Best',
    subtitle: 'QUALITY',
    description: 'Hand-picked from the finest farms across India.',
  },
];

const WhyChooseUsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-red-700 to-red-800 text-white relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 font-semibold uppercase tracking-wider text-sm">
              WHY CHOOSE US
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Authentic Spices: <span className="text-yellow-400">Taste the Difference</span>
          </h2>
        </div>

        {/* Features Grid - Clean 4-column layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-white/95 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                <feature.icon size={24} className="text-red-700" />
              </div>

              {/* Content */}
              <h3 className="font-display text-2xl font-bold text-gray-800 mb-1">
                {feature.title}
              </h3>
              <p className="text-red-600 font-semibold text-sm uppercase tracking-wider mb-3">
                {feature.subtitle}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Shop Now Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-red-900 px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105">
            <span>Shop Now</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
