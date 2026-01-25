import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Star, ShoppingBag, Filter, Heart, Eye } from 'lucide-react';

const ShopAll: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useCart();

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <Header />
      <CartDrawer />

      {/* Hero Section */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Shop <span className="text-yellow-300">All Spices</span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover our complete collection of premium, hand-picked spices that bring authentic Indian flavors to your kitchen
          </motion.p>
          <motion.div
            className="text-lg font-semibold bg-yellow-400 text-orange-800 px-6 py-3 rounded-full inline-block"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            🌶️ {products.length} Premium Spices Available 🌶️
          </motion.div>
        </div>
      </motion.section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search for spices, ingredients, or recipes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 text-lg border-2 border-orange-200 focus:border-orange-500 rounded-xl"
                />
              </div>
              
              {/* Category Filter */}
              <div className="md:w-64">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-14 px-4 text-lg border-2 border-orange-200 focus:border-orange-500 rounded-xl bg-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-center mb-8">
              <p className="text-lg text-gray-600">
                Showing <span className="font-bold text-orange-600">{filteredProducts.length}</span> of <span className="font-bold">{products.length}</span> products
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-16 h-16 text-orange-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">No spices found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search terms or browse all categories</p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3"
              >
                Show All Spices
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gradient-to-br from-orange-100 to-red-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop';
                      }}
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.isBestSeller && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          Best Seller
                        </span>
                      )}
                      {product.isNew && (
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          New
                        </span>
                      )}
                      {product.originalPrice && (
                        <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </span>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 bg-white rounded-full shadow-lg hover:bg-orange-50 transition-colors">
                        <Heart className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 bg-white rounded-full shadow-lg hover:bg-orange-50 transition-colors">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="text-sm text-orange-600 font-medium">{product.category}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    
                    {product.nameHindi && (
                      <p className="text-sm text-gray-500 mb-2">{product.nameHindi}</p>
                    )}
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-orange-600">₹{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">{product.weight}</span>
                    </div>

                    {/* Add to Cart Button */}
                    <Button 
                      className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-3 rounded-xl font-semibold"
                      onClick={() => {
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          originalPrice: product.originalPrice,
                          image: product.image,
                          weight: product.weight,
                        });
                      }}
                    >
                      <ShoppingBag className="w-5 h-5 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Our Spices */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="text-yellow-300">PRAYAN Spices?</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto">
              Experience the difference that premium quality and traditional methods make
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🌿',
                title: 'Pure & Natural',
                description: 'No artificial colors, preservatives, or additives'
              },
              {
                icon: '🏆',
                title: 'Premium Quality',
                description: 'Hand-picked spices from the finest farms across India'
              },
              {
                icon: '⚡',
                title: 'Fresh Ground',
                description: 'Stone-ground weekly for maximum flavor and aroma'
              },
              {
                icon: '🚚',
                title: 'Fast Delivery',
                description: 'Free shipping on all orders across India - no minimum required!'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-orange-100">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ShopAll;