import React from 'react';
import { Shield, Leaf, Award, Heart } from 'lucide-react';

const WhyChooseUsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-red-600 to-red-700">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-yellow-300" />
            <span className="text-yellow-300 font-bold uppercase tracking-wider">
              WHY CHOOSE US
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Authentic Spices: <span className="text-yellow-300">Taste the Difference</span>
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {/* Fresh Card */}
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Leaf size={32} className="text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">Fresh</h3>
            <p className="text-green-600 font-bold text-sm uppercase tracking-wider mb-4">GROUND</p>
            <p className="text-gray-600 text-sm">Stone-ground weekly for maximum flavor and aroma retention.</p>
          </div>

          {/* 100% Pure Card */}
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield size={32} className="text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">100%</h3>
            <p className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-4">PURE</p>
            <p className="text-gray-600 text-sm">No additives, no preservatives. Just pure, authentic spices.</p>
          </div>

          {/* Lab Tested Card */}
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award size={32} className="text-purple-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">Lab</h3>
            <p className="text-purple-600 font-bold text-sm uppercase tracking-wider mb-4">TESTED</p>
            <p className="text-gray-600 text-sm">Every batch is tested and certified for purity and quality.</p>
          </div>

          {/* Best Quality Card */}
          <div className="bg-white rounded-2xl p-8 text-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={32} className="text-red-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">Best</h3>
            <p className="text-red-600 font-bold text-sm uppercase tracking-wider mb-4">QUALITY</p>
            <p className="text-gray-600 text-sm">Hand-picked from the finest farms across India.</p>
          </div>
        </div>

        {/* Shop Now Button */}
        <div className="text-center mt-16">
          <button className="bg-yellow-400 hover:bg-yellow-300 text-red-800 px-10 py-4 rounded-full font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
            Shop Now →
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
