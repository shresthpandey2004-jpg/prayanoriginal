import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  Star,
  Users,
  Headphones,
  Globe,
  Heart,
  Award,
  Zap,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import GoogleMap from '@/components/GoogleMap';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: ''
  });
  const { toast } = useToast();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Please fill all required fields",
        description: "Name, email, subject, and message are mandatory",
        variant: "destructive"
      });
      return;
    }
    
    // Create WhatsApp message
    const message = `📞 *CONTACT INQUIRY - PRAYAN MASALE*

👤 *Customer Details:*
• Name: ${formData.name}
• Email: ${formData.email}
• Phone: ${formData.phone || 'Not provided'}

📋 *Inquiry Details:*
• Subject: ${formData.subject}
• Category: ${formData.category || 'General Inquiry'}

💬 *Message:*
${formData.message}

---
Please respond at your earliest convenience. Thank you!`;

    // WhatsApp numbers (both primary and secondary)
    const whatsappNumber = '918866658919';
    const whatsappNumber2 = '919974849812';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    const whatsappUrl2 = `https://wa.me/${whatsappNumber2}?text=${encodeURIComponent(message)}`;
    
    // Open both WhatsApp numbers
    window.open(whatsappUrl, '_blank');
    setTimeout(() => {
      window.open(whatsappUrl2, '_blank');
    }, 1000);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      category: '',
      message: ''
    });
    
    toast({
      title: "Message Sent! 🚀",
      description: "We'll get back to you within 2 hours during business hours.",
    });
  };

  const contactMethods = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Call Us",
      primary: "+91 88666 58919",
      secondary: "+91 99748 49812",
      description: "Speak directly with our spice experts",
      color: "from-green-500 to-emerald-500",
      action: () => window.open('tel:+918866658919')
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "WhatsApp",
      primary: "+91 88666 58919",
      secondary: "+91 99748 49812",
      description: "Instant support via WhatsApp",
      color: "from-green-600 to-green-500",
      action: () => window.open('https://wa.me/918866658919')
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Us",
      primary: "hello@prayan.com",
      secondary: "Response within 4 hours",
      description: "Detailed queries and support",
      color: "from-blue-500 to-cyan-500",
      action: () => window.open('mailto:hello@prayan.com')
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Visit Store",
      primary: "Balaji Complex, Kawas",
      secondary: "Mon-Sat, 10 AM - 7 PM",
      description: "Experience spices in person",
      color: "from-orange-500 to-red-500",
      action: () => window.open('https://maps.google.com/maps?q=Balaji+Complex,+Kawas,+Surat,+Gujarat+394510,+India')
    }
  ];

  const supportCategories = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Customer Support",
      description: "General inquiries and order assistance",
      responseTime: "2 hours"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Export Inquiries",
      description: "International business and bulk orders",
      responseTime: "4 hours"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Quality Concerns",
      description: "Product quality and certification queries",
      responseTime: "1 hour"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Recipe Support",
      description: "Cooking tips and spice recommendations",
      responseTime: "6 hours"
    }
  ];

  const whyContactUs = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Quick Response",
      description: "Average response time under 2 hours"
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "Expert Support",
      description: "Dedicated spice experts ready to help"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Trusted Service",
      description: "Growing community of satisfied customers"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Premium Care",
      description: "Personalized attention to every query"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <Header />
      
      {/* Hero Section */}
      <motion.section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center z-10 px-4"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Headphones className="w-5 h-5" />
            <span className="font-medium">24/7 Customer Support</span>
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-8xl font-bold text-gray-800 mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Us</span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Have questions about our <span className="font-semibold text-orange-600">premium spices</span>? 
            Our expert team is here to help you with <span className="font-semibold">personalized support</span> and quick solutions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 text-lg"
              onClick={() => window.open('https://wa.me/918866658919')}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-8 py-4 text-lg"
              onClick={() => window.open('tel:+918866658919')}
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 text-6xl opacity-20"
          animate={{ 
            rotate: 360,
            y: [0, -20, 0]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          📞
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-5xl opacity-20"
          animate={{ 
            rotate: -360,
            y: [0, 15, 0]
          }}
          transition={{ 
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          💬
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-20 text-4xl opacity-20"
          animate={{ 
            x: [0, 10, 0],
            y: [0, -10, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          ✉️
        </motion.div>
      </motion.section>

      {/* Contact Methods */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Get In <span className="text-orange-600">Touch</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose your preferred way to connect with us. We're here to help with all your spice needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group cursor-pointer"
                onClick={method.action}
              >
                <Card className="h-full bg-white/90 backdrop-blur-sm border-orange-200 hover:shadow-2xl transition-all duration-300 group-hover:border-orange-400">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className={`inline-flex p-4 bg-gradient-to-r ${method.color} text-white rounded-full mb-4`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {method.icon}
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{method.title}</h3>
                    <p className="text-lg font-medium text-orange-600 mb-1">{method.primary}</p>
                    <p className="text-sm text-gray-500 mb-3">{method.secondary}</p>
                    <p className="text-gray-600 text-sm">{method.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-100 to-red-100">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Send Us a <span className="text-orange-600">Message</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fill out the form below and we'll get back to you within 2 hours during business hours.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
                <CardHeader>
                  <CardTitle className="text-2xl text-center text-gray-800">
                    Contact Form
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <Input
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Your Name"
                          className="border-orange-200 focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <Input
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+91 98765 43210"
                          className="border-orange-200 focus:border-orange-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                        className="border-orange-200 focus:border-orange-500"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subject *
                        </label>
                        <Input
                          required
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          placeholder="Subject of your inquiry"
                          className="border-orange-200 focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Category
                        </label>
                        <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                          <SelectTrigger className="border-orange-200 focus:border-orange-500">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="order">Order Support</SelectItem>
                            <SelectItem value="quality">Quality Concern</SelectItem>
                            <SelectItem value="recipe">Recipe Help</SelectItem>
                            <SelectItem value="export">Export Inquiry</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <Textarea
                        required
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell us how we can help you..."
                        rows={5}
                        className="border-orange-200 focus:border-orange-500"
                      />
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-4 text-lg"
                      >
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Support Categories */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Support Categories</h3>
                <div className="space-y-4">
                  {supportCategories.map((category, index) => (
                    <motion.div
                      key={category.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 5 }}
                    >
                      <Card className="bg-white/80 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                              {category.icon}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800 mb-1">{category.title}</h4>
                              <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                              <div className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                Response: {category.responseTime}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Why Contact Us?</h3>
                <div className="space-y-4">
                  {whyContactUs.map((reason, index) => (
                    <motion.div
                      key={reason.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3"
                    >
                      <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg">
                        {reason.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{reason.title}</h4>
                        <p className="text-sm text-gray-600">{reason.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Hours & Location */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Visit Our <span className="text-orange-600">Store</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the aroma and quality of our spices in person at our flagship store.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Store Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Store Details</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-orange-500 text-white rounded-lg">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Address</h4>
                        <p className="text-gray-600">
                          PRAYAN Royal Spice Emporium<br />
                          Balaji Complex, Kawas<br />
                          Surat – 394510, Gujarat<br />
                          India
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-green-500 text-white rounded-lg">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">Business Hours</h4>
                        <div className="text-gray-600 space-y-1">
                          <p>Monday - Saturday: 10:00 AM - 7:00 PM</p>
                          <p>Sunday: 11:00 AM - 5:00 PM</p>
                          <p className="text-sm text-orange-600 font-medium">
                            Extended hours during festival seasons
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-500 text-white rounded-lg">
                        <Users className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">What to Expect</h4>
                        <ul className="text-gray-600 space-y-1">
                          <li>• Free spice tasting sessions</li>
                          <li>• Expert consultation on recipes</li>
                          <li>• Bulk purchase discounts</li>
                          <li>• Fresh grinding on request</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                </CardContent>
              </Card>
            </motion.div>

            {/* Google Map Integration */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <GoogleMap />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-100 to-red-100">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Quick <span className="text-orange-600">Answers</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find instant answers to commonly asked questions about our spices and services.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                question: "How fresh are your spices?",
                answer: "All spices are ground fresh weekly and have a shelf life of 18-24 months when stored properly."
              },
              {
                question: "Do you offer bulk discounts?",
                answer: "Yes! We offer attractive discounts on orders above ₹2000. Contact us for custom pricing."
              },
              {
                question: "Are your spices organic?",
                answer: "We have both conventional and certified organic ranges. Look for the 'Organic' label on products."
              },
              {
                question: "What's your return policy?",
                answer: "100% satisfaction guarantee. Return within 30 days if not completely satisfied with quality."
              },
              {
                question: "Do you ship internationally?",
                answer: "Yes, we offer international shipping. Contact our export team for shipping rates and delivery options."
              },
              {
                question: "Can I visit your facility?",
                answer: "Absolutely! Schedule a visit to see our processing facility and quality control measures."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-white/90 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-800 mb-3">{faq.question}</h3>
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;