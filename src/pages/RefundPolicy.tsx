import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const RefundPolicy = () => {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Cancellation & Refund Policy</h1>
          
          <div className="prose max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Order Cancellation</h2>
              <p className="text-gray-600 leading-relaxed">
                You can cancel your order within 24 hours of placing it, provided it hasn't been shipped. Once the order is dispatched, cancellation is not possible, but you can return the product as per our return policy.
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-600">
                <li>Cancellation within 24 hours: Full refund</li>
                <li>After dispatch: Return policy applies</li>
                <li>Contact us immediately for cancellation requests</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Return Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We accept returns within 7 days of delivery for unopened products in original packaging. Due to the nature of food products, opened spice packages cannot be returned for hygiene reasons.
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-600">
                <li>Return window: 7 days from delivery</li>
                <li>Product must be unopened and in original packaging</li>
                <li>Original invoice/receipt required</li>
                <li>Customer bears return shipping cost</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Refund Process</h2>
              <p className="text-gray-600 leading-relaxed">
                Refunds are processed within 3-5 business days after we receive and inspect the returned product. The refund will be credited to your original payment method.
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-600">
                <li>Processing time: 3-5 business days</li>
                <li>Refund to original payment method</li>
                <li>Delivery charges are non-refundable (except for damaged products)</li>
                <li>Bank processing may take additional 2-7 days</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Damaged or Defective Products</h2>
              <p className="text-gray-600 leading-relaxed">
                If you receive damaged or defective products, please contact us within 48 hours of delivery with photos. We will arrange for replacement or full refund including delivery charges.
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-600">
                <li>Report within 48 hours of delivery</li>
                <li>Provide clear photos of damaged product</li>
                <li>Free replacement or full refund</li>
                <li>We cover return shipping costs</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Non-Returnable Items</h2>
              <p className="text-gray-600 leading-relaxed">
                The following items cannot be returned for hygiene and safety reasons:
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-600">
                <li>Opened spice packages</li>
                <li>Products past expiry date</li>
                <li>Items damaged by customer misuse</li>
                <li>Custom or personalized orders</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">6. How to Request Return/Refund</h2>
              <p className="text-gray-600 leading-relaxed">
                To initiate a return or refund request:
              </p>
              <ol className="list-decimal list-inside mt-2 text-gray-600">
                <li>Contact our customer support</li>
                <li>Provide order number and reason for return</li>
                <li>Wait for return authorization</li>
                <li>Pack the product securely in original packaging</li>
                <li>Ship to our return address</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Refund Timeline</h2>
              <div className="bg-orange-50 p-4 rounded-lg mt-3">
                <p className="text-gray-700 font-medium">Expected Refund Timeline:</p>
                <ul className="list-disc list-inside mt-2 text-gray-600">
                  <li>Order cancellation (within 24hrs): 1-2 business days</li>
                  <li>Product return: 3-5 business days after inspection</li>
                  <li>Bank processing: Additional 2-7 business days</li>
                  <li>Total time: 5-12 business days maximum</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Contact for Returns</h2>
              <p className="text-gray-600 leading-relaxed">
                For any return or refund queries, please contact us:
              </p>
              <div className="mt-3 text-gray-600 bg-gray-50 p-4 rounded-lg">
                <p>📧 Email: support@prayan.shop</p>
                <p>📞 WhatsApp: +91 88666 58919 | +91 99748 49812</p>
                <p>📍 Return Address: Balaji Complex, Kawas, Surat – 394510, Gujarat, India</p>
                <p>🕒 Support Hours: 9 AM - 7 PM (Monday to Saturday)</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">9. Quality Guarantee</h2>
              <p className="text-gray-600 leading-relaxed">
                We stand behind the quality of our spices. If you're not satisfied with the taste or quality of our products, please contact us within 7 days of delivery. We'll work with you to resolve any quality concerns.
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Last updated: January 2026 | This policy is effective from our launch date
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;