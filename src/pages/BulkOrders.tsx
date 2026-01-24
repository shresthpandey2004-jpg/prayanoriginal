import { useState } from 'react';
import { Package, Users, Truck, Shield, Phone, Mail, MapPin, Calculator, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const BulkOrders = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    businessType: '',
    products: '',
    quantity: '',
    frequency: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.businessName || !formData.contactPerson || !formData.email || !formData.phone || !formData.businessType) {
      alert('Please fill all required fields');
      return;
    }
    
    // Create WhatsApp message
    const message = `🏢 *BULK ORDER INQUIRY - PRAYAN MASALE*

📋 *Business Details:*
• Business Name: ${formData.businessName}
• Contact Person: ${formData.contactPerson}
• Business Type: ${businessTypes.find(type => type.value === formData.businessType)?.label || formData.businessType}

📞 *Contact Information:*
• Phone: ${formData.phone}
• Email: ${formData.email}

📦 *Order Requirements:*
• Products Interested: ${formData.products || 'Not specified'}
• Expected Monthly Quantity: ${formData.quantity || 'Not specified'}

💬 *Additional Requirements:*
${formData.message || 'None'}

---
Please provide bulk pricing and terms for the above requirements. Thank you!`;

    // WhatsApp number (replace with your business WhatsApp number)
    const whatsappNumber = '918866658919';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    setFormData({
      businessName: '',
      contactPerson: '',
      email: '',
      phone: '',
      businessType: '',
      products: '',
      quantity: '',
      frequency: '',
      message: ''
    });
    
    // Show success message
    alert('Bulk order inquiry sent to WhatsApp! We will respond within 24 hours.');
  };

  const benefits = [
    {
      icon: <Package className="w-8 h-8" />,
      title: "Wholesale Pricing",
      description: "Get competitive bulk pricing with discounts up to 30% on large orders"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Dedicated Support",
      description: "Personal account manager for all your bulk order needs and queries"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Free Delivery",
      description: "Complimentary delivery for orders above ₹10,000 across India"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Quality Guarantee",
      description: "100% quality assurance with easy returns and replacements"
    }
  ];

  const businessTypes = [
    { value: 'restaurant', label: 'Restaurant/Hotel', icon: '🍽️' },
    { value: 'catering', label: 'Catering Service', icon: '🎉' },
    { value: 'retail', label: 'Retail Store', icon: '🏪' },
    { value: 'distributor', label: 'Distributor', icon: '📦' },
    { value: 'manufacturer', label: 'Food Manufacturer', icon: '🏭' },
    { value: 'export', label: 'Export Business', icon: '🌍' }
  ];

  const pricingTiers = [
    {
      range: "₹5,000 - ₹25,000",
      discount: "10%",
      features: ["Free delivery above ₹10,000", "Standard packaging", "Email support"]
    },
    {
      range: "₹25,000 - ₹1,00,000",
      discount: "20%",
      features: ["Free delivery", "Custom packaging", "Phone support", "Flexible payment terms"]
    },
    {
      range: "₹1,00,000+",
      discount: "30%",
      features: ["Free delivery", "Premium packaging", "Dedicated account manager", "Custom blends available", "Priority support"]
    }
  ];

  const bulkBenefits = [
    {
      title: "Competitive Pricing",
      description: "Special wholesale rates for bulk orders with attractive discounts based on quantity."
    },
    {
      title: "Consistent Quality",
      description: "Same premium quality maintained across all bulk orders with strict quality control."
    },
    {
      title: "Reliable Supply",
      description: "Timely delivery and consistent supply chain to meet your business requirements."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Bulk <span className="text-yellow-300">Orders</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Premium spices in bulk quantities for restaurants, hotels, caterers, and businesses
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-medium">
              Get Quote Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
              Download Catalog
            </Button>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-10 left-10 w-4 h-4 bg-yellow-300 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-orange-300 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute bottom-10 left-1/4 w-2 h-2 bg-red-300 rounded-full animate-ping opacity-40"></div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose PRAYAN for Bulk Orders?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We understand the unique needs of businesses and offer tailored solutions for bulk spice requirements
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="inline-flex p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Business Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">We Serve All Business Types</h2>
            <p className="text-xl text-gray-600">From small restaurants to large food manufacturers</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:border-orange-300">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{type.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-800">{type.label}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 bg-gradient-to-r from-orange-100 to-red-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Bulk Pricing Tiers</h2>
            <p className="text-xl text-gray-600">Better prices for larger quantities</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className={`hover:shadow-xl transition-all duration-300 ${index === 1 ? 'border-2 border-orange-500 scale-105' : ''}`}>
                <CardContent className="p-8 text-center">
                  {index === 1 && (
                    <div className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{tier.range}</h3>
                  <div className="text-4xl font-bold text-orange-600 mb-6">
                    {tier.discount} <span className="text-lg text-gray-600">OFF</span>
                  </div>
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bulk Order Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Request Bulk Quote</h2>
              <p className="text-xl text-gray-600">Fill out the form below and we'll get back to you within 24 hours</p>
            </div>
            
            <Card className="shadow-xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person *</label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Type *</label>
                      <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        required
                      >
                        <option value="">Select Business Type</option>
                        {businessTypes.map((type) => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expected Monthly Quantity</label>
                      <input
                        type="text"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        placeholder="e.g., 100 kg"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Products Interested In</label>
                    <input
                      type="text"
                      name="products"
                      value={formData.products}
                      onChange={handleInputChange}
                      placeholder="e.g., Turmeric powder, Red chili powder, Garam masala"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Requirements</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Tell us about your specific requirements, delivery preferences, or any questions..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="text-center">
                    <Button type="submit" size="lg" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 px-8">
                      Submit Bulk Order Inquiry
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose PRAYAN for Bulk Orders?</h2>
            <p className="text-xl text-gray-600">Trusted by businesses across India</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {bulkBenefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
            <p className="text-xl opacity-90">Our bulk order specialists are ready to help</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/10 rounded-lg p-6">
              <Phone className="w-8 h-8 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="opacity-90">+91 88666 58919</p>
              <p className="text-sm opacity-75">Mon-Sat, 9 AM - 7 PM</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <Mail className="w-8 h-8 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="opacity-90">bulk@prayan.com</p>
              <p className="text-sm opacity-75">Response within 24 hours</p>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <MapPin className="w-8 h-8 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p className="opacity-90">Balaji Complex, Kawas</p>
              <p className="text-sm opacity-75">Surat – 394510, Gujarat, India</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BulkOrders;