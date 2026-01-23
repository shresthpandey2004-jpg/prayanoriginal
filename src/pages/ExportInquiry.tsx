import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Globe, 
  Truck, 
  Shield, 
  Award, 
  MapPin, 
  Phone, 
  Mail, 
  FileText,
  CheckCircle,
  Star,
  Package,
  Clock,
  Users,
  TrendingUp,
  Send,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import CartDrawer from '@/components/cart/CartDrawer';

const ExportInquiry = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: '',
    businessType: '',
    products: '',
    quantity: '',
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
    if (!formData.companyName || !formData.contactPerson || !formData.email || !formData.phone || !formData.country || !formData.businessType || !formData.products || !formData.quantity) {
      toast({
        title: "Please fill all required fields",
        description: "All fields marked with * are mandatory",
        variant: "destructive"
      });
      return;
    }
    
    // Create WhatsApp message
    const message = `🌍 *EXPORT INQUIRY - PRAYAN MASALE*

🏢 *Company Details:*
• Company Name: ${formData.companyName}
• Contact Person: ${formData.contactPerson}
• Business Type: ${formData.businessType}
• Country: ${formData.country}

📞 *Contact Information:*
• Phone: ${formData.phone}
• Email: ${formData.email}

📦 *Export Requirements:*
• Products Interested: ${formData.products}
• Expected Quantity: ${formData.quantity}

💬 *Additional Message:*
${formData.message || 'None'}

🏭 *Our Export Office:*
PRAYAN Royal Spice Emporium
Balaji Complex, Kawas
Surat – 394510, Gujarat, India

---
Please provide detailed export quotation, FOB/CIF prices, minimum order quantities, and shipping terms. Thank you!`;

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
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      country: '',
      businessType: '',
      products: '',
      quantity: '',
      message: ''
    });
    
    toast({
      title: "Export Inquiry Sent! 🚀",
      description: "We'll contact you within 24 hours with detailed quotation.",
    });
  };

  const exportCapabilities = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Reach",
      description: "Quality spices available for international shipping",
      stats: "Export Ready"
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Bulk Supply",
      description: "Minimum order quantities from 100kg to container loads",
      stats: "100kg - 20 Tons"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Quality Certified",
      description: "ISO, HACCP, Organic certifications for international standards",
      stats: "ISO Certified"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Logistics Support",
      description: "Complete shipping, documentation, and customs support",
      stats: "Door-to-Door"
    }
  ];

  const exportProducts = [
    {
      category: "Whole Spices",
      products: ["Cardamom", "Cinnamon", "Cloves", "Black Pepper", "Cumin Seeds"],
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300"
    },
    {
      category: "Ground Spices",
      products: ["Turmeric Powder", "Red Chili Powder", "Coriander Powder", "Garam Masala"],
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300"
    },
    {
      category: "Spice Blends",
      products: ["Curry Powder", "Biryani Masala", "Tandoori Masala", "Chat Masala"],
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300"
    },
    {
      category: "Organic Range",
      products: ["Organic Turmeric", "Organic Cumin", "Organic Coriander", "Organic Garam Masala"],
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300"
    }
  ];

  const countries = [
    "USA", "Canada", "UK", "Germany", "France", "Australia", "UAE", "Saudi Arabia", 
    "Singapore", "Malaysia", "Japan", "South Korea", "Netherlands", "Belgium", "Italy"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      <CartDrawer />
      
      {/* Hero Section */}
      <motion.section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center z-10 px-4"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Globe className="w-5 h-5" />
            <span className="font-medium">Global Export Partner</span>
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-8xl font-bold text-gray-800 mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Export <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Inquiry</span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Partner with India's <span className="font-semibold text-blue-600">premium spice exporter</span>. 
            Bringing authentic Indian flavors to global markets with <span className="font-semibold">quality</span> and expertise.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg">
              Get Export Quote
            </Button>
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg">
              <Download className="w-5 h-5 mr-2" />
              Download Catalog
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
          🌍
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
          📦
        </motion.div>
      </motion.section>

      {/* Export Capabilities */}
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
              Export <span className="text-blue-600">Capabilities</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive export solutions with international quality standards and reliable logistics support.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {exportCapabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full bg-white/90 backdrop-blur-sm border-blue-200 hover:shadow-2xl transition-all duration-300 group-hover:border-blue-400">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className="inline-flex p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {capability.icon}
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{capability.title}</h3>
                    <p className="text-gray-600 mb-4">{capability.description}</p>
                    <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {capability.stats}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Export Products */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-100 to-purple-100">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Export <span className="text-blue-600">Products</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Premium quality spices available for bulk export with international certifications.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {exportProducts.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-white/90 backdrop-blur-sm border-blue-200 hover:shadow-xl transition-all duration-300">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={category.image} 
                      alt={category.category}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-xl font-bold text-white">{category.category}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <ul className="space-y-2">
                      {category.products.map((product, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{product}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Export Stats */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted Export Partner Worldwide
            </h2>
            <p className="text-xl opacity-90">
              Numbers that showcase our global presence and reliability
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "Quality", label: "First Priority", icon: <Globe className="w-8 h-8" /> },
              { number: "Fresh", label: "Export Packaging", icon: <Package className="w-8 h-8" /> },
              { number: "Global", label: "Shipping Available", icon: <Users className="w-8 h-8" /> },
              { number: "2026", label: "Launch Year", icon: <Award className="w-8 h-8" /> }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <motion.div
                  className="inline-flex p-4 bg-white/20 rounded-full mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {stat.icon}
                </motion.div>
                <motion.h3
                  className="text-4xl md:text-5xl font-bold mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.h3>
                <p className="text-xl opacity-90">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Export Inquiry Form */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Get Export <span className="text-blue-600">Quotation</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fill out the form below and our export team will contact you within 24 hours with detailed quotation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-gray-800">
                  Export Inquiry Form
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name *
                      </label>
                      <Input
                        required
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        placeholder="Your Company Name"
                        className="border-blue-200 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Person *
                      </label>
                      <Input
                        required
                        value={formData.contactPerson}
                        onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                        placeholder="Contact Person Name"
                        className="border-blue-200 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
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
                        className="border-blue-200 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <Input
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+1 234 567 8900"
                        className="border-blue-200 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country *
                      </label>
                      <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                        <SelectTrigger className="border-blue-200 focus:border-blue-500">
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map(country => (
                            <SelectItem key={country} value={country}>{country}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Type *
                      </label>
                      <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                        <SelectTrigger className="border-blue-200 focus:border-blue-500">
                          <SelectValue placeholder="Select Business Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="importer">Importer</SelectItem>
                          <SelectItem value="distributor">Distributor</SelectItem>
                          <SelectItem value="retailer">Retailer</SelectItem>
                          <SelectItem value="manufacturer">Manufacturer</SelectItem>
                          <SelectItem value="restaurant">Restaurant Chain</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Products Interested *
                      </label>
                      <Input
                        required
                        value={formData.products}
                        onChange={(e) => handleInputChange('products', e.target.value)}
                        placeholder="e.g., Turmeric, Cumin, Garam Masala"
                        className="border-blue-200 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expected Quantity *
                      </label>
                      <Input
                        required
                        value={formData.quantity}
                        onChange={(e) => handleInputChange('quantity', e.target.value)}
                        placeholder="e.g., 1000 kg, 1 container"
                        className="border-blue-200 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Message
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Any specific requirements, certifications needed, or additional information..."
                      rows={4}
                      className="border-blue-200 focus:border-blue-500"
                    />
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send Export Inquiry
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Export <span className="text-blue-600">Contact</span>
            </h2>
            <p className="text-xl text-gray-600">
              Get in touch with our export team for immediate assistance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Phone className="w-8 h-8" />,
                title: "Export Hotline",
                info: "+91 88666 58919 / +91 99748 49812",
                description: "24/7 Export Support"
              },
              {
                icon: <Mail className="w-8 h-8" />,
                title: "Export Email",
                info: "export@prayan.com",
                description: "Quick Response Guaranteed"
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Export Office",
                info: "Balaji Complex, Kawas, Surat – 394510, Gujarat, India",
                description: "Visit Our Export Facility"
              }
            ].map((contact, index) => (
              <motion.div
                key={contact.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="text-center bg-white/90 backdrop-blur-sm border-blue-200 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <motion.div
                      className="inline-flex p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {contact.icon}
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{contact.title}</h3>
                    <p className="text-lg font-medium text-blue-600 mb-2 break-words">{contact.info}</p>
                    <p className="text-gray-600">{contact.description}</p>
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

export default ExportInquiry;