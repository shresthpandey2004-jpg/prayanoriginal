import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const TermsConditions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
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
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
          
          <div className="prose max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Acceptance of Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using Prayan Masale's website and services, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Product Information</h2>
              <p className="text-gray-600 leading-relaxed">
                We strive to provide accurate product descriptions and pricing. However, we reserve the right to correct any errors, inaccuracies, or omissions and to change or update information at any time without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Orders and Payment</h2>
              <p className="text-gray-600 leading-relaxed">
                All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason. Payment must be made in full before shipment of products.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Shipping and Delivery</h2>
              <p className="text-gray-600 leading-relaxed">
                We aim to process and ship orders within 1-2 business days. Delivery times may vary based on location and shipping method selected. Free shipping is available on orders above ₹199.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Returns and Refunds</h2>
              <p className="text-gray-600 leading-relaxed">
                Please refer to our Return Policy for detailed information about returns, exchanges, and refunds. We want you to be completely satisfied with your purchase.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">6. User Accounts</h2>
              <p className="text-gray-600 leading-relaxed">
                You are responsible for maintaining the confidentiality of your account information and password. Each email address and phone number can only be associated with one account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Loyalty Program</h2>
              <p className="text-gray-600 leading-relaxed">
                Our loyalty program offers points and rewards to eligible customers. Points have no cash value and cannot be transferred. Program terms may change at our discretion.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Privacy</h2>
              <p className="text-gray-600 leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">9. Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed">
                Prayan Masale shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our products or services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">10. Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Continued use of our services constitutes acceptance of modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">11. Contact Information</h2>
              <p className="text-gray-600 leading-relaxed">
                If you have any questions about these Terms & Conditions, please contact us:
              </p>
              <div className="mt-3 text-gray-600">
                <p>📧 Email: info@prayanmasale.com</p>
                <p>📞 Phone: +91 88666 58919 | +91 99748 49812</p>
                <p>📍 Address: Balaji Complex, Kawas, Surat – 394510, Gujarat, India</p>
              </div>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Last updated: January 2026 | Effective from launch
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;