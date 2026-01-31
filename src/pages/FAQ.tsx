import { useState } from 'react';
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
    answer: "Yes, all our spices are 100% organic and certified by India Organic and FSSAI. We source directly from certified organic farms and conduct regular third-party lab testing to ensure purity.",
    category: "Quality & Certification",
    tags: ["organic", "certification", "quality"]
  },
  {
    id: "spice-freshness",
    question: "How do you ensure the freshness of your spices?",
    questionHindi: "आप अपने मसालों की ताजगी कैसे सुनिश्चित करते हैं?",
    answer: "We grind our spices in small batches to order, ensuring maximum freshness. Our spices are stored in temperature-controlled environments and packaged in airtight, food-grade materials.",
    category: "Freshness & Storage",
    tags: ["freshness", "grinding", "storage"]
  },
  {
    id: "shipping-delivery",
    question: "What are your shipping and delivery options?",
    questionHindi: "आपके शिपिंग और डिलीवरी विकल्प क्या हैं?",
    answer: "We offer free shipping on orders above ₹500. Standard delivery takes 3-5 business days, while express delivery is available in 1-2 days for major cities.",
    category: "Shipping & Delivery",
    tags: ["shipping", "delivery", "free-shipping"]
  }
];

const categories = [...new Set(faqs.map(faq => faq.category))];

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
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

        {/* Search */}
        <div className="mb-8">
          <div className="relative w-full lg:w-96 mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
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
                        <Badge variant="secondary" className="text-xs mt-2">
                          {faq.category}
                        </Badge>
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
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
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