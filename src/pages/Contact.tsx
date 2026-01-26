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
import CartDrawer from '@/components/cart/CartDrawer';
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
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      primary: "+91 88666 58919",
      secondary: "+91 99748 49812",
      description: "Speak directly with our spice experts",
      color: "from-green-500 to-emerald-500",
      action: () => window.open('tel:+918866658919')
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "WhatsApp",
      primary: "+91 88666 58919",
      secondary: "+91 99748 49812",
      description: "Instant support via WhatsApp",
      color: "from-green-600 to-green-500",
      action: () => window.open('https://wa.me/918866658919')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 pb-20 md:pb-0">
      <Header />
      <CartDrawer />
      
      {/* Mobile-Optimized Hero Section */}
      <motion.section 
        className="relative py-16 sm:py-24 px-4 flex items-center justify-center overflow-hidden"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-red-600/10" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center z-10 max-w-4xl mx-auto"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-3 py-2 rounded-full mb-4 text-sm"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Headphones className="w-4 h-4" />
            <span className="font-medium">24/7 Customer Support</span>
          </motion.div>
          
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-800 mb-4 sm:mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Us</span>
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Have questions about our <span className="font-semibold text-orange-600">premium spices</span>? 
            Our expert team is here to help you with personalized support.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-3 text-base w-full sm:w-auto"
              onClick={() => window.open('https://wa.me/918866658919')}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-6 py-3 text-base w-full sm:w-auto"
              onClick={() => window.open('tel:+918866658919')}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Quick Contact Methods - Mobile Optimized */}
      <section className="py-12 sm:py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              Get In <span className="text-orange-600">Touch</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 px-4">
              Choose your preferred way to connect with us
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group cursor-pointer"
                onClick={method.action}
              >
                <Card className="h-full bg-white/90 backdrop-blur-sm border-orange-200 hover:shadow-xl transition-all duration-300 group-hover:border-orange-400">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <motion.div
                      className={`inline-flex p-3 bg-gradient-to-r ${method.color} text-white rounded-full mb-3 sm:mb-4`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {method.icon}
                    </motion.div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{method.title}</h3>
                    <p className="text-base sm:text-lg font-medium text-orange-600 mb-1">{method.primary}</p>
                    <p className="text-sm text-gray-500 mb-2">{method.secondary}</p>
                    <p className="text-gray-600 text-sm">{method.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Hours & Location - Mobile Optimized */}
      <section className="py-12 sm:py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              Visit Our <span className="text-orange-600">Store</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 px-4">
              Experience the aroma and quality of our spices in person
            </p>
          </motion.div>

          <div className="space-y-6 sm:space-y-8">
            {/* Store Information - Mobile First */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="p-2 sm:p-3 bg-orange-500 text-white rounded-lg flex-shrink-0">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Address</h4>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                          PRAYAN Royal Spice Emporium<br />
                          Balaji Complex, Kawas<br />
                          Surat – 394510, Gujarat, India
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="p-2 sm:p-3 bg-green-500 text-white rounded-lg flex-shrink-0">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Business Hours</h4>
                        <div className="text-gray-600 space-y-1 text-sm sm:text-base">
                          <p>Monday - Saturday: 10:00 AM - 7:00 PM</p>
                          <p>Sunday: 11:00 AM - 5:00 PM</p>
                          <p className="text-xs sm:text-sm text-orange-600 font-medium">
                            Extended hours during festival seasons
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="p-2 sm:p-3 bg-blue-500 text-white rounded-lg flex-shrink-0">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">What to Expect</h4>
                        <ul className="text-gray-600 space-y-1 text-sm sm:text-base">
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

            {/* Google Map - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-64 sm:h-80 rounded-lg overflow-hidden"
            >
              <GoogleMap />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Contact Form - Mobile Optimized */}
      <section className="py-12 sm:py-16 px-4 bg-gradient-to-r from-orange-100 to-red-100">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              Send Us a <span className="text-orange-600">Message</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 px-4">
              We'll get back to you within 2 hours during business hours
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
              <CardContent className="p-4 sm:p-6">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your Name"
                        className="border-orange-200 focus:border-orange-500 h-12 text-base"
                        style={{ fontSize: '16px' }}
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
                        className="border-orange-200 focus:border-orange-500 h-12 text-base"
                        style={{ fontSize: '16px' }}
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
                      className="border-orange-200 focus:border-orange-500 h-12 text-base"
                      style={{ fontSize: '16px' }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <Input
                      required
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="Subject of your inquiry"
                      className="border-orange-200 focus:border-orange-500 h-12 text-base"
                      style={{ fontSize: '16px' }}
                    />
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
                      rows={4}
                      className="border-orange-200 focus:border-orange-500 text-base"
                      style={{ fontSize: '16px' }}
                    />
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-3 text-base h-12"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;