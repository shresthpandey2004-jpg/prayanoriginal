import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Truck, Clock, MapPin, Shield, Package, CheckCircle } from 'lucide-react';

const ShippingPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <Header />
      
      {/* Hero Section */}
      <motion.section 
        className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Truck className="w-5 h-5" />
            <span className="font-medium">Fast & Secure Delivery</span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Shipping <span className="text-yellow-300">Policy</span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Fast, secure, and reliable delivery of premium spices to your doorstep across India
          </motion.p>
        </div>
      </motion.section>

      {/* Shipping Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Truck className="w-8 h-8" />,
                title: 'Free Shipping',
                description: 'On ALL orders - no minimum!',
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: 'Fast Delivery',
                description: '2-5 business days',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Secure Packaging',
                description: 'Airtight & moisture-proof',
                color: 'from-orange-500 to-red-500'
              },
              {
                icon: <Package className="w-8 h-8" />,
                title: 'Order Tracking',
                description: 'Real-time updates',
                color: 'from-purple-500 to-pink-500'
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`inline-flex p-4 bg-gradient-to-r ${benefit.color} text-white rounded-full mb-4`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping Details */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
              Shipping Information
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Delivery Areas */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-orange-600" />
                  <h3 className="text-2xl font-bold text-gray-800">Delivery Areas</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">All major cities across India</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Tier 2 & Tier 3 cities</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Rural areas (selected pincodes)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Cash on Delivery available</span>
                  </div>
                </div>
              </div>

              {/* Delivery Timeline */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-6 h-6 text-orange-600" />
                  <h3 className="text-2xl font-bold text-gray-800">Delivery Timeline</h3>
                </div>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-gray-800">Metro Cities</h4>
                    <p className="text-gray-600">2-3 business days</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-800">Tier 2 Cities</h4>
                    <p className="text-gray-600">3-4 business days</p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold text-gray-800">Remote Areas</h4>
                    <p className="text-gray-600">5-7 business days</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Shipping Charges */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
              Shipping Charges
            </h2>

            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-green-600 mb-4">🎉 FREE DELIVERY 🎉</div>
                <div className="text-2xl font-bold text-gray-800 mb-2">On All Orders!</div>
                <div className="text-lg text-gray-700">No minimum order value required</div>
                <div className="text-sm text-gray-600 mt-4">
                  Enjoy free shipping across India on every single order, big or small!
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Terms & Conditions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
              Shipping Terms
            </h2>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Order Processing</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Orders are processed within 24 hours on business days (Monday-Saturday). 
                    Orders placed on Sunday or holidays will be processed the next business day.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Packaging</h3>
                  <p className="text-gray-600 leading-relaxed">
                    All spices are packed in airtight, moisture-proof containers to maintain 
                    freshness and quality during transit. We use eco-friendly packaging materials.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Delivery Attempts</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our delivery partner will make 3 attempts to deliver your order. If unsuccessful, 
                    the package will be returned to our warehouse and a full refund will be processed.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Address Accuracy</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Please ensure your delivery address is complete and accurate. We are not 
                    responsible for delays or non-delivery due to incorrect address information.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">International Shipping</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Currently, we only ship within India. For international orders, please 
                    contact our export team at export@prayan.com for custom quotes.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ShippingPolicy;