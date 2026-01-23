import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Shield, Lock, Eye, UserCheck, Database, Globe } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
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
            <Shield className="w-5 h-5" />
            <span className="font-medium">Your Privacy Matters</span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Privacy <span className="text-yellow-300">Policy</span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We are committed to protecting your personal information and privacy
          </motion.p>
        </div>
      </motion.section>

      {/* Privacy Principles */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Privacy Principles</h2>
            <p className="text-xl text-gray-600">How we protect and handle your data</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Lock className="w-8 h-8" />,
                title: 'Data Security',
                description: 'Your data is encrypted and stored securely using industry-standard protocols',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: <Eye className="w-8 h-8" />,
                title: 'Transparency',
                description: 'We clearly explain what data we collect and how we use it',
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: <UserCheck className="w-8 h-8" />,
                title: 'Your Control',
                description: 'You have full control over your personal information and preferences',
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: <Database className="w-8 h-8" />,
                title: 'Minimal Collection',
                description: 'We only collect data that is necessary for our services',
                color: 'from-orange-500 to-red-500'
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: 'No Selling',
                description: 'We never sell your personal data to third parties',
                color: 'from-indigo-500 to-purple-500'
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'Compliance',
                description: 'We comply with all applicable privacy laws and regulations',
                color: 'from-teal-500 to-green-500'
              }
            ].map((principle, index) => (
              <motion.div
                key={principle.title}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`inline-flex p-4 bg-gradient-to-r ${principle.color} text-white rounded-full mb-4`}>
                  {principle.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{principle.title}</h3>
                <p className="text-gray-600">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Information We Collect</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Personal Information</h3>
                      <p className="text-gray-600 leading-relaxed">
                        We collect information you provide directly to us, such as when you create an account, 
                        make a purchase, or contact us. This includes your name, email address, phone number, 
                        shipping address, and payment information.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Usage Information</h3>
                      <p className="text-gray-600 leading-relaxed">
                        We automatically collect information about how you use our website, including your 
                        IP address, browser type, pages visited, time spent on pages, and referring website.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Cookies and Tracking</h3>
                      <p className="text-gray-600 leading-relaxed">
                        We use cookies and similar technologies to enhance your experience, remember your 
                        preferences, and analyze website traffic. You can control cookie settings in your browser.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">How We Use Your Information</h2>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <p className="text-gray-600">Process and fulfill your orders</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <p className="text-gray-600">Communicate with you about your orders and account</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <p className="text-gray-600">Send you promotional emails (with your consent)</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <p className="text-gray-600">Improve our website and services</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <p className="text-gray-600">Prevent fraud and ensure security</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <p className="text-gray-600">Comply with legal obligations</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Information Sharing</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    We do not sell, trade, or rent your personal information to third parties. We may share 
                    your information only in the following circumstances:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <p className="text-gray-600">With service providers who help us operate our business</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <p className="text-gray-600">When required by law or to protect our rights</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <p className="text-gray-600">In connection with a business transfer or merger</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <p className="text-gray-600">With your explicit consent</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Data Security</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We implement appropriate technical and organizational measures to protect your personal 
                    information against unauthorized access, alteration, disclosure, or destruction. This 
                    includes encryption, secure servers, and regular security assessments. However, no method 
                    of transmission over the internet is 100% secure.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Rights</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    You have the following rights regarding your personal information:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <p className="text-gray-600">Access and review your personal information</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <p className="text-gray-600">Correct inaccurate or incomplete information</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <p className="text-gray-600">Delete your account and personal information</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <p className="text-gray-600">Opt-out of marketing communications</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <p className="text-gray-600">Request a copy of your data</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Cookies Policy</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    We use cookies to enhance your browsing experience. Cookies are small files stored on 
                    your device that help us:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <p className="text-gray-600">Remember your preferences and settings</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <p className="text-gray-600">Keep you logged in to your account</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <p className="text-gray-600">Analyze website traffic and usage patterns</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <p className="text-gray-600">Provide personalized content and recommendations</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="bg-orange-50 rounded-xl p-6">
                    <div className="space-y-2">
                      <p className="text-gray-700"><strong>Email:</strong> privacy@prayan.com</p>
                      <p className="text-gray-700"><strong>Phone:</strong> +91 88666 58919</p>
                      <p className="text-gray-700"><strong>Address:</strong> PRAYAN Spices Pvt. Ltd., Balaji Complex, Kawas, Surat – 394510, Gujarat, India</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Updates to This Policy</h2>
                  <p className="text-gray-600 leading-relaxed">
                    We may update this Privacy Policy from time to time to reflect changes in our practices 
                    or applicable laws. We will notify you of any material changes by posting the updated 
                    policy on our website and updating the "Last Updated" date below.
                  </p>
                </div>

                <div className="border-t pt-6">
                  <p className="text-sm text-gray-500">
                    <strong>Last Updated:</strong> January 2024
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

export default PrivacyPolicy;