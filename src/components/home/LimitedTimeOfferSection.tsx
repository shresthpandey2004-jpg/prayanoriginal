import React from 'react';
import { Star, Award, ArrowRight, Sparkles, Heart, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LimitedTimeOfferSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-r from-red-600 to-red-700 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 to-orange-400" />
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-yellow-400/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-orange-400/10 blur-3xl" />
      
      {/* Floating Spice Icons */}
      <div className="absolute top-10 left-10 text-yellow-300/20 text-4xl animate-bounce">🌶️</div>
      <div className="absolute top-20 right-20 text-orange-300/20 text-3xl animate-pulse">✨</div>
      <div className="absolute bottom-20 left-1/4 text-yellow-300/20 text-2xl animate-bounce delay-300">🧄</div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Mobile-First Layout */}
        <div className="text-center lg:text-left space-y-6 lg:space-y-0">
          
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 lg:gap-8">
            {/* Left Content */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="flex w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-yellow-400/20 items-center justify-center flex-shrink-0">
                <Sparkles className="text-yellow-300" size={24} />
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                  <Star className="text-yellow-300" size={16} />
                  <span className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">
                    Experience Excellence
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
                  Authentic Indian Spices: <span className="text-yellow-300">From Farm to Kitchen</span>
                </h3>
                <p className="text-red-100 text-sm sm:text-base mt-2 max-w-lg">
                  Discover the rich heritage of Indian cuisine with our premium, hand-selected spices sourced directly from traditional farms across India.
                </p>
              </div>
            </div>

            {/* CTA Button - Top right on desktop, bottom on mobile */}
            <div className="order-3 lg:order-2">
              <Button variant="secondary" asChild className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-red-800 font-bold">
                <Link to="/shop" className="gap-2">
                  Explore Collection <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
          </div>

          {/* Quality Features - Better mobile layout */}
          <div className="order-2 lg:order-3 mt-6 lg:mt-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
              {[
                { 
                  icon: Shield,
                  value: 'Premium', 
                  label: 'Quality',
                  description: 'Hand-picked from finest farms'
                },
                { 
                  icon: Heart,
                  value: 'Traditional', 
                  label: 'Methods',
                  description: 'Stone-ground for authentic taste'
                },
                { 
                  icon: Award,
                  value: 'Certified', 
                  label: 'Purity',
                  description: 'Lab-tested for quality assurance'
                },
                { 
                  icon: Star,
                  value: 'Fresh', 
                  label: 'Always',
                  description: 'Packed fresh to preserve aroma'
                },
              ].map((item, index) => (
                <div key={item.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 text-center shadow-lg hover:bg-white/20 transition-all duration-300 group">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-yellow-400/30 transition-colors">
                    <item.icon size={16} className="text-yellow-300 sm:w-5 sm:h-5" />
                  </div>
                  <p className="font-display text-base sm:text-lg lg:text-xl font-bold text-white">
                    {item.value}
                  </p>
                  <p className="text-xs text-yellow-300 uppercase mt-1 font-semibold">{item.label}</p>
                  <p className="text-xs text-red-100 mt-1 opacity-80 hidden sm:block">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="order-4 mt-6 lg:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 text-yellow-300">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-semibold">4.8+ Rating</span>
            </div>
            <div className="w-px h-4 bg-white/30"></div>
            <div className="flex items-center gap-2 text-yellow-300">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-semibold">FSSAI Certified</span>
            </div>
            <div className="w-px h-4 bg-white/30"></div>
            <div className="flex items-center gap-2 text-yellow-300">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-semibold">10,000+ Happy Customers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LimitedTimeOfferSection;
