import { useState } from 'react';
import { Search, Leaf, Heart, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEOHead from '@/components/seo/SEOHead';

const SpiceGuide = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <SEOHead 
        title="Complete Spice Guide - Health Benefits & Cooking Tips | Prayan Masale"
        description="Comprehensive guide to Indian spices with health benefits, cooking tips, storage instructions, and Ayurvedic properties. Expert knowledge from Prayan Masale."
        keywords="spice guide, health benefits of spices, cooking with spices, ayurvedic spices, turmeric benefits, spice storage, indian spices guide"
        url={typeof window !== 'undefined' ? window.location.href : undefined}
        type="website"
      />
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Complete Spice Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the health benefits, cooking tips, and Ayurvedic properties of authentic Indian spices. 
            Your comprehensive guide to cooking with nature's pharmacy.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative w-full lg:w-96 mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search spices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Coming Soon Message */}
        <div className="text-center py-16">
          <div className="max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Leaf className="w-12 h-12 text-orange-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Comprehensive Spice Guide Coming Soon!
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We're preparing detailed information about each spice including health benefits, 
              cooking tips, Ayurvedic properties, and nutritional information.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <Heart className="w-8 h-8 text-red-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Health Benefits</h3>
                <p className="text-sm text-gray-600">
                  Detailed medicinal properties and health benefits of each spice
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Cooking Tips</h3>
                <p className="text-sm text-gray-600">
                  Expert tips on how to use spices for maximum flavor and nutrition
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <Leaf className="w-8 h-8 text-green-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Ayurvedic Properties</h3>
                <p className="text-sm text-gray-600">
                  Traditional Ayurvedic uses and dosha balancing properties
                </p>
              </div>
            </div>
            <Button className="bg-orange-600 hover:bg-orange-700">
              Notify Me When Ready
            </Button>
          </div>
        </div>

        {/* Educational Section */}
        <div className="mt-16 bg-white rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Why Choose Prayan Masale Spices?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">100% Organic</h3>
              <p className="text-gray-600 text-sm">
                Certified organic spices grown without harmful chemicals or pesticides.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Health First</h3>
              <p className="text-gray-600 text-sm">
                Maximum health benefits preserved through traditional processing methods.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm">
                Lab-tested purity and potency guaranteed in every pack.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SpiceGuide;