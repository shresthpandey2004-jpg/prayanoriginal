import React from 'react';
import { Gift, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LimitedTimeOfferSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 to-orange-400" />
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-yellow-400/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-orange-400/10 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          {/* Special Offer Badge */}
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-orange-900 px-4 py-2 rounded-full font-bold text-sm mb-6">
            <Gift className="w-4 h-4" />
            <span>SPECIAL LAUNCH OFFER</span>
          </div>

          {/* Main Heading */}
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Get <span className="text-yellow-300">FREE Delivery</span> on Your First Order!
          </h2>

          {/* Description */}
          <p className="text-lg sm:text-xl text-orange-100 max-w-3xl mx-auto mb-8">
            Experience the authentic taste of India with our premium spices. 
            Start your culinary journey with us and enjoy complimentary delivery on your first purchase.
          </p>

          {/* Features */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-300" />
              <span className="font-semibold">Premium Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-300" />
              <span className="font-semibold">Fresh Ground</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-300" />
              <span className="font-semibold">100% Pure</span>
            </div>
          </div>

          {/* CTA Button */}
          <Button 
            variant="secondary" 
            size="xl" 
            asChild 
            className="bg-yellow-400 hover:bg-yellow-300 text-orange-900 font-bold px-8 py-4 text-lg"
          >
            <Link to="/shop" className="gap-3">
              Shop Now & Save <ArrowRight size={20} />
            </Link>
          </Button>

          {/* Small Print */}
          <p className="text-sm text-orange-200 mt-4">
            *Free delivery applies to first order only. Standard delivery charges apply thereafter.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LimitedTimeOfferSection;
