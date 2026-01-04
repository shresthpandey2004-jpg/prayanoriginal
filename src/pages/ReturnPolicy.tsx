import { ArrowLeft, CheckCircle, XCircle, Clock, Shield, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { BUSINESS_CONFIG } from '@/config/business';

const ReturnPolicy = () => {
  const navigate = useNavigate();

  const handleWhatsAppContact = () => {
    const message = 'Hi! I have a question about your return policy. Can you help me?';
    const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Return & Refund Policy</h1>
        </div>

        {/* Quality Promise */}
        <Card className="mb-8 border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-green-800 mb-2">Quality Guarantee</h2>
                <p className="text-green-700">
                  We stand behind the quality of our spices. If you're not satisfied with the quality, 
                  we'll make it right with a full refund or replacement.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Full Refund Cases */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                100% Refund Cases
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge className="bg-green-100 text-green-800 mt-1">Quality</Badge>
                  <div>
                    <h4 className="font-medium">Product Quality Issues</h4>
                    <ul className="text-sm text-gray-600 mt-1 space-y-1">
                      <li>• Expired products delivered</li>
                      <li>• Contamination or foreign objects</li>
                      <li>• Moisture or fungus in sealed packets</li>
                      <li>• Wrong product sent</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge className="bg-blue-100 text-blue-800 mt-1">Delivery</Badge>
                  <div>
                    <h4 className="font-medium">Delivery Issues</h4>
                    <ul className="text-sm text-gray-600 mt-1 space-y-1">
                      <li>• Non-delivery after 7 days</li>
                      <li>• Damaged packaging causing spillage</li>
                      <li>• Missing items from order</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* No Refund Cases */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <XCircle className="w-5 h-5" />
                No Refund Cases
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge className="bg-red-100 text-red-800 mt-1">Safety</Badge>
                  <div>
                    <h4 className="font-medium">Food Safety Reasons</h4>
                    <ul className="text-sm text-gray-600 mt-1 space-y-1">
                      <li>• Opened packets (hygiene concerns)</li>
                      <li>• Partially used products</li>
                      <li>• After 7 days of delivery</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Badge className="bg-gray-100 text-gray-800 mt-1">Customer</Badge>
                  <div>
                    <h4 className="font-medium">Customer Reasons</h4>
                    <ul className="text-sm text-gray-600 mt-1 space-y-1">
                      <li>• Changed mind after delivery</li>
                      <li>• Ordered wrong quantity</li>
                      <li>• Found cheaper elsewhere</li>
                      <li>• Natural taste/color variations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Time Limits */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              Return Time Limits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600 mb-2">24 Hours</div>
                <div className="text-sm text-red-700">Quality & Contamination Issues</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 mb-2">48 Hours</div>
                <div className="text-sm text-orange-700">Delivery & Packaging Issues</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">7 Days</div>
                <div className="text-sm text-blue-700">Wrong Product Delivered</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Return Process */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How to Return</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Contact Us Immediately</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    WhatsApp us within the time limit with your order ID and issue description.
                  </p>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={handleWhatsAppContact}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp: {BUSINESS_CONFIG.whatsapp}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Provide Evidence</h4>
                  <p className="text-sm text-gray-600">
                    Send clear photos/videos of the issue along with your order details.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Quick Resolution</h4>
                  <p className="text-sm text-gray-600">
                    We'll review and respond within 24 hours with a solution.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-bold text-sm">4</span>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Refund Processing</h4>
                  <p className="text-sm text-gray-600">
                    Approved refunds are processed within 2-3 business days.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="mt-8 bg-gradient-to-r from-orange-100 to-red-100 border-orange-200">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-orange-800 mb-4">Need Help with Returns?</h3>
            <p className="text-orange-700 mb-6">
              Our customer service team is here to help you with any return or refund questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleWhatsAppContact}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Support
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.open(`tel:${BUSINESS_CONFIG.phone}`)}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Us
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card className="mt-8 border-yellow-200 bg-yellow-50">
          <CardContent className="p-6">
            <h3 className="font-bold text-yellow-800 mb-3">Important Notes:</h3>
            <ul className="text-sm text-yellow-700 space-y-2">
              <li>• All spice packets must be unopened for returns (food safety regulations)</li>
              <li>• Photos/videos are required for all return requests</li>
              <li>• Refunds are processed to the original payment method</li>
              <li>• Store credit option available with 10% bonus value</li>
              <li>• Return shipping costs are customer's responsibility (except for our errors)</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReturnPolicy;