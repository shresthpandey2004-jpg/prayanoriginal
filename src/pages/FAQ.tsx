import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, MessageCircle, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEOHead from '@/components/seo/SEOHead';

interface FAQ {
  id: string;
  question: string;
  questionHindi?: string;
  answer: string;
  category: string;
  tags: string[];
}

const faqs: FAQ[] = [
  {
    id: "organic-certification",
    question: "Are your spices really organic and certified?",
    questionHindi: "क्या आपके मसाले वास्तव में जैविक और प्रमाणित हैं?",
    answer: "Yes, all our spices are 100% organic and certified by India Organic and FSSAI. We source directly from certified organic farms and conduct regular third-party lab testing to ensure purity. Each batch comes with certification documents and lab reports for complete transparency.",
    category: "Quality & Certification",
    tags: ["organic", "certification", "quality", "lab-tested"]
  },
  {
    id: "spice-freshness",
    question: "How do you ensure the freshness of your spices?",
    questionHindi: "आप अपने मसालों की ताजगी कैसे सुनिश्चित करते हैं?",
    answer: "We grind our spices in small batches to order, ensuring maximum freshness. Our spices are stored in temperature-controlled environments and packaged in airtight, food-grade materials. We also provide manufacturing and expiry dates on all products, and most of our ground spices have a shelf life of 12-18 months.",
    category: "Freshness & Storage",
    tags: ["freshness", "grinding", "storage", "shelf-life"]
  },
  {
    id: "turmeric-benefits",
    question: "What makes your turmeric powder special?",
    questionHindi: "आपका हल्दी पाउडर क्या खास है?",
    answer: "Our turmeric powder is made from premium organic turmeric roots with high curcumin content (3-5%). It's grown without chemicals, naturally dried, and stone-ground to preserve essential oils. The vibrant color and strong aroma indicate its purity and potency. It's perfect for both cooking and health benefits.",
    category: "Product Specific",
    tags: ["turmeric", "curcumin", "health-benefits", "organic"]
  },
  {
    id: "storage-tips",
    question: "How should I store spices for maximum freshness?",
    questionHindi: "अधिकतम ताजगी के लिए मसालों को कैसे स्टोर करना चाहिए?",
    answer: "Store spices in airtight containers away from light, heat, and moisture. Keep them in a cool, dry pantry rather than above the stove. Whole spices last 2-4 years, while ground spices are best used within 1-3 years. Label containers with purchase dates and check regularly for freshness.",
    category: "Freshness & Storage",
    tags: ["storage", "freshness", "containers", "shelf-life"]
  },
  {
    id: "shipping-delivery",
    question: "What are your shipping and delivery options?",
    questionHindi: "आपके शिपिंग और डिलीवरी विकल्प क्या हैं?",
    answer: "We offer free shipping on orders above ₹500. Standard delivery takes 3-5 business days, while express delivery is available in 1-2 days for major cities. We use secure packaging to prevent damage and provide tracking information for all orders. Cash on delivery is available in select areas.",
    category: "Shipping & Delivery",
    tags: ["shipping", "delivery", "free-shipping", "tracking"]
  },
  {
    id: "bulk-orders",
    question: "Do you offer bulk orders for restaurants or businesses?",
    questionHindi: "क्या आप रेस्टोरेंट या व्यवसायों के लिए बल्क ऑर्डर देते हैं?",
    answer: "Yes, we provide special bulk pricing for restaurants, hotels, and food businesses. Minimum order quantity is 10kg per spice variety. We offer customized packaging, dedicated account management, and flexible payment terms. Contact our bulk sales team for personalized quotes and terms.",
    category: "Bulk Orders",
    tags: ["bulk-orders", "restaurants", "business", "wholesale"]
  },
  {
    id: "return-policy",
    question: "What is your return and refund policy?",
    questionHindi: "आपकी वापसी और रिफंड नीति क्या है?",
    answer: "We offer a 30-day return policy for unopened products. If you're not satisfied with the quality, we provide full refund or replacement. For opened products, we evaluate on a case-by-case basis. Damaged or defective products are replaced immediately at no cost to you.",
    category: "Returns & Refunds",
    tags: ["returns", "refunds", "quality-guarantee", "replacement"]
  },
  {
    id: "spice-authenticity",
    question: "How can I verify the authenticity of your spices?",
    questionHindi: "मैं आपके मसालों की प्रामाणिकता कैसे सत्यापित कर सकता हूं?",
    answer: "Each product comes with a QR code that links to lab test reports and certification documents. You can also verify by the natural color, aroma, and taste. Our packaging includes batch numbers for traceability. We encourage customers to compare with other brands to experience the difference in quality.",
    category: "Quality & Certification",
    tags: ["authenticity", "verification", "lab-reports", "traceability"]
  },
  {
    id: "health-benefits",
    question: "What are the health benefits of using organic spices?",
    questionHindi: "जैविक मसालों के उपयोग से क्या स्वास्थ्य लाभ हैं?",
    answer: "Organic spices are free from harmful pesticides and chemicals, making them safer for consumption. They retain higher levels of antioxidants, essential oils, and nutrients. Regular use can boost immunity, aid digestion, reduce inflammation, and provide various therapeutic benefits without the risk of chemical residues.",
    category: "Health & Nutrition",
    tags: ["health-benefits", "organic", "antioxidants", "immunity"]
  },
  {
    id: "grinding-process",
    question: "What is your spice grinding process?",
    questionHindi: "आपकी मसाला पीसने की प्रक्रिया क्या है?",
    answer: "We use traditional stone grinding methods combined with modern hygiene standards. Spices are cleaned, sorted, and ground in temperature-controlled environments to preserve essential oils. We avoid metal grinding which can generate heat and destroy nutrients. Each batch is tested for particle size and purity.",
    category: "Processing",
    tags: ["grinding", "stone-grinding", "processing", "quality"]
  },
  {
    id: "recipe-suggestions",
    question: "Do you provide recipes and cooking tips?",
    questionHindi: "क्या आप रेसिपी और खाना पकाने की टिप्स देते हैं?",
    answer: "Yes, we have a comprehensive recipe section on our website with traditional and modern Indian recipes. Each recipe includes spice usage tips, cooking techniques, and health benefits. We also share cooking tips through our blog and social media channels. Our customer service team can provide personalized cooking advice.",
    category: "Recipes & Cooking",
    tags: ["recipes", "cooking-tips", "usage", "guidance"]
  },
  {
    id: "price-comparison",
    question: "Why are organic spices more expensive than regular ones?",
    questionHindi: "जैविक मसाले नियमित मसालों से महंगे क्यों होते हैं?",
    answer: "Organic spices cost more due to chemical-free farming, lower yields, manual processing, and certification costs. However, they offer better value through higher potency (you use less), superior taste, health benefits, and no harmful residues. The price difference is typically 20-40%, which is minimal considering the health benefits.",
    category: "Pricing",
    tags: ["pricing", "organic-cost", "value", "comparison"]
  }
];

const categories = [...new Set(faqs.map(faq => faq.category))];

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <SEOHead 
        title="Frequently Asked Questions - Spice Queries Answered | Prayan Masale"
        description="Get answers to common questions about organic spices, storage tips, health benefits, shipping, and more. Expert guidance from Prayan Masale spice specialists."
        keywords="spice FAQ, organic spices questions, spice storage tips, turmeric benefits, spice quality, shipping policy, bulk orders"
        url={typeof window !== 'undefined' ? window.location.href : undefined}
        type="website"
      />
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our organic spices, quality, 
            shipping, and more. Can't find what you're looking for? Contact our experts!
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === 'All' ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory('All')}
                className={selectedCategory === 'All' ? "bg-orange-600 hover:bg-orange-700" : ""}
              >
                All
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-orange-600 hover:bg-orange-700" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto mb-12">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No questions found matching your search. Try different keywords or browse all categories.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map(faq => (
                <Card key={faq.id} className="overflow-hidden">
                  <CardHeader 
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleFAQ(faq.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg text-gray-800 mb-2">
                          {faq.question}
                        </CardTitle>
                        {faq.questionHindi && (
                          <p className="text-orange-600 font-medium text-sm">
                            {faq.questionHindi}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {faq.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="ml-4">
                        {expandedFAQ === faq.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  {expandedFAQ === faq.id && (
                    <CardContent className="pt-0 pb-6">
                      <div className="border-t pt-4">
                        <p className="text-gray-700 leading-relaxed mb-4">
                          {faq.answer}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {faq.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  Still Have Questions?
                </h2>
                <p className="text-orange-100">
                  Our spice experts are here to help! Get personalized answers and recommendations.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Live Chat</h3>
                  <p className="text-orange-100 text-sm mb-4">
                    Chat with our experts in real-time
                  </p>
                  <Button 
                    variant="secondary"
                    size="sm"
                    className="bg-white text-orange-600 hover:bg-gray-100"
                  >
                    Start Chat
                  </Button>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Call Us</h3>
                  <p className="text-orange-100 text-sm mb-4">
                    Speak directly with our team
                  </p>
                  <Button 
                    variant="secondary"
                    size="sm"
                    className="bg-white text-orange-600 hover:bg-gray-100"
                  >
                    Call Now
                  </Button>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Email Support</h3>
                  <p className="text-orange-100 text-sm mb-4">
                    Get detailed answers via email
                  </p>
                  <Button 
                    variant="secondary"
                    size="sm"
                    className="bg-white text-orange-600 hover:bg-gray-100"
                  >
                    Send Email
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FAQ;