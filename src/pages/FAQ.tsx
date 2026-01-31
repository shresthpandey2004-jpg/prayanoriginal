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
    question: "What certifications validate the organic authenticity of your spices?",
    questionHindi: "आपके मसालों की जैविक प्रामाणिकता को कौन से प्रमाणपत्र सत्यापित करते हैं?",
    answer: "Our spices carry comprehensive organic certifications from India Organic (NPOP), FSSAI Organic, and USDA Organic standards. Each batch undergoes rigorous third-party laboratory testing for pesticide residues, heavy metals, and microbial contamination. We maintain complete traceability from certified organic farms to final packaging, with documentation available for verification. Our quality assurance protocols exceed international organic standards, ensuring absolute purity and authenticity.",
    category: "Quality & Certification",
    tags: ["organic", "certification", "quality", "lab-tested", "purity"]
  },
  {
    id: "spice-freshness",
    question: "How do you maintain optimal freshness and potency in your spice products?",
    questionHindi: "आप अपने मसाला उत्पादों में इष्टतम ताजगी और शक्ति कैसे बनाए रखते हैं?",
    answer: "We employ a sophisticated freshness preservation system that begins with small-batch grinding using traditional stone mills to prevent heat degradation. Our spices are processed in temperature-controlled environments and immediately sealed in moisture-barrier packaging with nitrogen flushing to eliminate oxygen exposure. Each product includes harvest dates, processing dates, and optimal usage timelines. Our advanced storage facilities maintain precise temperature and humidity controls, ensuring maximum retention of volatile oils and bioactive compounds.",
    category: "Freshness & Storage",
    tags: ["freshness", "grinding", "storage", "shelf-life", "quality-control"]
  },
  {
    id: "turmeric-curcumin",
    question: "What distinguishes your turmeric powder in terms of curcumin content and therapeutic value?",
    questionHindi: "करक्यूमिन सामग्री और चिकित्सीय मूल्य के मामले में आपका हल्दी पाउडर क्या विशिष्ट है?",
    answer: "Our premium turmeric powder consistently contains 3-5% curcumin content, significantly higher than conventional varieties. Sourced from specific regions in Kerala and Tamil Nadu known for optimal soil conditions, our turmeric undergoes spectrophotometric analysis to verify curcumin levels. The traditional stone-grinding process preserves essential oils and prevents thermal degradation of bioactive compounds. Each batch includes a certificate of analysis detailing curcumin content, ensuring therapeutic efficacy for anti-inflammatory and antioxidant benefits.",
    category: "Product Specifications",
    tags: ["turmeric", "curcumin", "health-benefits", "therapeutic", "analysis"]
  },
  {
    id: "storage-optimization",
    question: "What are the scientifically-backed methods for optimal spice storage and preservation?",
    questionHindi: "मसाला भंडारण और संरक्षण के लिए वैज्ञानिक रूप से समर्थित तरीके क्या हैं?",
    answer: "Optimal spice preservation requires controlling four critical factors: temperature (60-70°F), humidity (50-60% RH), light exposure (complete darkness), and oxygen contact (minimal air exposure). Use borosilicate glass or food-grade stainless steel containers with airtight seals. Store whole spices for 2-4 years and ground spices for 1-3 years under proper conditions. Implement FIFO (First-In-First-Out) rotation and maintain detailed labeling with purchase and opening dates. Avoid storage near heat sources, in humid environments, or in direct sunlight.",
    category: "Storage & Preservation",
    tags: ["storage", "preservation", "freshness", "containers", "shelf-life"]
  },
  {
    id: "shipping-logistics",
    question: "What shipping methods and packaging ensure product integrity during transit?",
    questionHindi: "कौन से शिपिंग तरीके और पैकेजिंग पारगमन के दौरान उत्पाद की अखंडता सुनिश्चित करते हैं?",
    answer: "We utilize multi-layer protective packaging with moisture-barrier films and cushioned inserts to prevent damage during transit. Standard delivery occurs within 3-5 business days via temperature-controlled logistics networks. Express delivery is available for major metropolitan areas within 24-48 hours. All shipments include tracking capabilities and insurance coverage. Orders above ₹500 qualify for complimentary shipping. Our packaging is designed to maintain product integrity across various climatic conditions throughout India.",
    category: "Shipping & Logistics",
    tags: ["shipping", "delivery", "packaging", "tracking", "logistics"]
  },
  {
    id: "bulk-commercial",
    question: "What specialized services do you provide for commercial and bulk purchasing requirements?",
    questionHindi: "वाणिज्यिक और थोक खरीदारी आवश्यकताओं के लिए आप कौन सी विशेष सेवाएं प्रदान करते हैं?",
    answer: "Our commercial division serves restaurants, hotels, food manufacturers, and export businesses with customized solutions. Minimum order quantities start at 10kg per spice variety with tiered pricing structures for volume purchases. We offer private labeling, custom packaging specifications, and flexible payment terms including credit facilities for established businesses. Dedicated account management ensures consistent supply chain reliability with priority processing and specialized logistics support for commercial clients.",
    category: "Commercial Services",
    tags: ["bulk-orders", "commercial", "wholesale", "restaurants", "custom-packaging"]
  },
  {
    id: "quality-guarantee",
    question: "What quality assurance measures and return policies protect customer satisfaction?",
    questionHindi: "ग्राहक संतुष्टि की सुरक्षा के लिए कौन से गुणवत्ता आश्वासन उपाय और वापसी नीतियां हैं?",
    answer: "We maintain a comprehensive 30-day satisfaction guarantee for all products. Unopened items are eligible for full refund or exchange. For opened products, we conduct quality assessments and provide appropriate remediation. All products undergo pre-shipment quality verification including sensory evaluation, moisture content analysis, and contamination screening. Defective or damaged items are replaced immediately at no cost. Our quality assurance team investigates all concerns to maintain continuous improvement in product standards.",
    category: "Quality Assurance",
    tags: ["quality-guarantee", "returns", "refunds", "satisfaction", "customer-service"]
  },
  {
    id: "authenticity-verification",
    question: "How can customers verify the authenticity and traceability of your spice products?",
    questionHindi: "ग्राहक आपके मसाला उत्पादों की प्रामाणिकता और पता लगाने की क्षमता कैसे सत्यापित कर सकते हैं?",
    answer: "Each product features a unique QR code linking to comprehensive documentation including laboratory test reports, organic certificates, and farm source information. Our blockchain-based traceability system provides complete supply chain transparency from specific farm plots to final packaging. Customers can access batch-specific data including harvest dates, processing details, and quality metrics. Sensory verification guidelines help customers identify authentic characteristics including natural color variations, aromatic profiles, and texture specifications.",
    category: "Authenticity & Traceability",
    tags: ["authenticity", "traceability", "verification", "QR-code", "transparency"]
  },
  {
    id: "health-nutrition",
    question: "What scientific evidence supports the health benefits of your organic spice products?",
    questionHindi: "आपके जैविक मसाला उत्पादों के स्वास्थ्य लाभों का समर्थन करने वाले वैज्ञानिक प्रमाण क्या हैं?",
    answer: "Our spices are backed by extensive peer-reviewed research demonstrating significant health benefits. Organic cultivation preserves higher concentrations of bioactive compounds including antioxidants, essential oils, and phytonutrients. Independent laboratory analysis confirms superior nutritional profiles compared to conventional alternatives. We provide access to relevant scientific literature and nutritional data for each product. Our spices support various health objectives including anti-inflammatory effects, digestive health, immune system enhancement, and cardiovascular protection.",
    category: "Health & Nutrition",
    tags: ["health-benefits", "nutrition", "scientific-research", "bioactive-compounds", "wellness"]
  },
  {
    id: "processing-methods",
    question: "What traditional and modern processing techniques ensure optimal spice quality?",
    questionHindi: "इष्टतम मसाला गुणवत्ता सुनिश्चित करने के लिए कौन सी पारंपरिक और आधुनिक प्रसंस्करण तकनीकें हैं?",
    answer: "We combine time-honored traditional methods with modern quality control technologies. Stone grinding preserves essential oils and prevents heat damage to delicate compounds. Solar drying techniques maintain natural color and flavor profiles while eliminating moisture. Advanced cleaning systems remove impurities without chemical treatments. Temperature-controlled processing environments prevent degradation of volatile compounds. Each processing stage includes quality checkpoints with documented parameters ensuring consistent excellence.",
    category: "Processing & Manufacturing",
    tags: ["processing", "stone-grinding", "traditional-methods", "quality-control", "manufacturing"]
  },
  {
    id: "recipe-guidance",
    question: "Do you provide culinary guidance and recipe development support for optimal spice utilization?",
    questionHindi: "क्या आप इष्टतम मसाला उपयोग के लिए पाक मार्गदर्शन और रेसिपी विकास सहायता प्रदान करते हैं?",
    answer: "Our culinary team provides comprehensive recipe collections featuring traditional and contemporary applications for each spice. We offer detailed usage guidelines including optimal quantities, cooking techniques, and flavor pairing recommendations. Our digital platform includes video tutorials, seasonal recipe suggestions, and personalized cooking consultations. Professional chefs and home cooks can access specialized guidance for maximizing flavor development and health benefits through proper spice utilization techniques.",
    category: "Culinary Support",
    tags: ["recipes", "cooking-guidance", "culinary-support", "usage-tips", "flavor-pairing"]
  },
  {
    id: "value-proposition",
    question: "How does the pricing of organic spices reflect their superior value and quality benefits?",
    questionHindi: "जैविक मसालों की कीमत उनके बेहतर मूल्य और गुणवत्ता लाभों को कैसे दर्शाती है?",
    answer: "Organic spice pricing reflects the comprehensive value proposition including superior flavor intensity, enhanced nutritional content, and health safety benefits. While premium pricing is 20-40% higher than conventional alternatives, the concentrated potency means smaller quantities achieve equivalent flavor impact. The absence of chemical residues and higher bioactive compound concentrations provide significant health value. Long-term cost analysis demonstrates superior value through enhanced culinary results, health benefits, and reduced quantity requirements per application.",
    category: "Value & Pricing",
    tags: ["pricing", "value-proposition", "cost-analysis", "premium-quality", "health-investment"]
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