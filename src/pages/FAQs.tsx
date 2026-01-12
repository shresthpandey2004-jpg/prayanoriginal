import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ChevronDown, ChevronUp, HelpCircle, Search, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';

const FAQs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqCategories = [
    {
      title: 'Orders & Payment',
      icon: '💳',
      faqs: [
        {
          question: 'How can I place an order?',
          answer: 'You can place an order through our website by adding products to cart and proceeding to checkout. We accept online payments, UPI, and Cash on Delivery.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit/debit cards, UPI payments, net banking, digital wallets, and Cash on Delivery (COD) for orders above ₹299.'
        },
        {
          question: 'Can I modify or cancel my order?',
          answer: 'Orders can be modified or cancelled within 2 hours of placement. After that, the order enters processing and cannot be changed. Contact us immediately for urgent changes.'
        },
        {
          question: 'Do you offer bulk discounts?',
          answer: 'Yes! We offer attractive discounts on bulk orders above ₹2000. Contact our sales team at +91 88666 58919 for custom pricing on large quantities.'
        }
      ]
    },
    {
      title: 'Shipping & Delivery',
      icon: '🚚',
      faqs: [
        {
          question: 'What are your shipping charges?',
          answer: 'Free shipping on orders above ₹499. For orders ₹299-₹498, shipping is ₹49. For orders below ₹299, shipping is ₹79.'
        },
        {
          question: 'How long does delivery take?',
          answer: 'Metro cities: 2-3 business days, Tier 2 cities: 3-4 business days, Remote areas: 5-7 business days. All orders are processed within 24 hours.'
        },
        {
          question: 'Do you deliver to my area?',
          answer: 'We deliver across India to most pincodes. Enter your pincode at checkout to check delivery availability in your area.'
        },
        {
          question: 'Can I track my order?',
          answer: 'Yes! You will receive a tracking number via SMS and email once your order is shipped. You can track your order in real-time using this number.'
        }
      ]
    },
    {
      title: 'Product Quality',
      icon: '🌶️',
      faqs: [
        {
          question: 'How fresh are your spices?',
          answer: 'All our spices are ground fresh weekly using traditional stone grinding methods. We maintain a shelf life of 18-24 months when stored properly.'
        },
        {
          question: 'Are your spices organic?',
          answer: 'We offer both conventional and certified organic spices. Look for the "Organic" label on product pages. All our spices are free from artificial colors and preservatives.'
        },
        {
          question: 'How should I store the spices?',
          answer: 'Store in a cool, dry place away from direct sunlight. Keep containers tightly sealed to maintain freshness and aroma. Avoid storing near heat sources.'
        },
        {
          question: 'What if I receive a damaged product?',
          answer: 'We have a 100% quality guarantee. If you receive a damaged or unsatisfactory product, contact us within 48 hours for immediate replacement or refund.'
        }
      ]
    },
    {
      title: 'Returns & Refunds',
      icon: '↩️',
      faqs: [
        {
          question: 'What is your return policy?',
          answer: 'We offer a 30-day return policy for unopened products. For quality issues, we accept returns even after opening within 7 days of delivery.'
        },
        {
          question: 'How do I return a product?',
          answer: 'Contact our customer service team to initiate a return. We will arrange pickup from your address and process the refund within 5-7 business days.'
        },
        {
          question: 'When will I receive my refund?',
          answer: 'Refunds are processed within 5-7 business days after we receive the returned product. The amount will be credited to your original payment method.'
        },
        {
          question: 'Are there any return charges?',
          answer: 'No return charges for quality issues or damaged products. For other returns, return shipping charges may apply as per our return policy.'
        }
      ]
    },
    {
      title: 'Recipe & Usage',
      icon: '👨‍🍳',
      faqs: [
        {
          question: 'Do you provide recipe suggestions?',
          answer: 'Yes! Each product page includes usage ideas and recipe suggestions. Visit our Recipes section for detailed cooking guides and spice combinations.'
        },
        {
          question: 'How much spice should I use?',
          answer: 'Start with small quantities and adjust to taste. Generally, use 1/2 to 1 teaspoon per serving for most spices. Our packaging includes usage guidelines.'
        },
        {
          question: 'Can I get cooking tips from experts?',
          answer: 'Absolutely! Our spice experts are available on WhatsApp for personalized cooking tips and recipe recommendations. Contact us anytime!'
        },
        {
          question: 'Do you offer spice blending services?',
          answer: 'Yes, we offer custom spice blending for restaurants and bulk customers. Contact our team to discuss your specific requirements and get a custom quote.'
        }
      ]
    }
  ];

  const allFAQs = faqCategories.flatMap((category, categoryIndex) =>
    category.faqs.map((faq, faqIndex) => ({
      ...faq,
      categoryTitle: category.title,
      categoryIcon: category.icon,
      id: categoryIndex * 100 + faqIndex
    }))
  );

  const filteredFAQs = searchTerm
    ? allFAQs.filter(
        faq =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.categoryTitle.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allFAQs;

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
            <HelpCircle className="w-5 h-5" />
            <span className="font-medium">Get Quick Answers</span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Frequently Asked <span className="text-yellow-300">Questions</span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Find quick answers to common questions about our spices, orders, and services
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg bg-white/90 backdrop-blur-sm border-0 rounded-xl"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Categories Overview */}
      {!searchTerm && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Browse by Category</h2>
              <p className="text-xl text-gray-600">Choose a category to find relevant answers</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {faqCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  className="bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  onClick={() => setSearchTerm(category.title)}
                >
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{category.title}</h3>
                  <p className="text-gray-600">{category.faqs.length} questions</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ List */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {searchTerm && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Search Results for "{searchTerm}"
                </h2>
                <p className="text-gray-600">{filteredFAQs.length} results found</p>
              </div>
            )}

            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <button
                    className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {searchTerm && (
                          <div className="flex items-center gap-2 text-sm text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                            <span>{faq.categoryIcon}</span>
                            <span>{faq.categoryTitle}</span>
                          </div>
                        )}
                        <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                      </div>
                      {openFAQ === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                  </button>
                  
                  {openFAQ === faq.id && (
                    <motion.div
                      className="px-6 pb-6"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="border-t pt-4">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {filteredFAQs.length === 0 && searchTerm && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">No results found</h3>
                <p className="text-gray-600 mb-6">
                  Try different keywords or browse our categories above
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Still Need Help?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our customer support team is here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.open('https://wa.me/918866658919')}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 justify-center transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Support
              </button>
              <button
                onClick={() => window.open('tel:+918866658919')}
                className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-colors"
              >
                Call +91 88666 58919
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQs;