import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { CouponProvider } from "@/context/CouponContext";
import { LoyaltyProvider } from "@/context/LoyaltyContext";
import { ReviewProvider } from "@/context/ReviewContext";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ShopAll from "./pages/ShopAll";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import MyOrders from "./pages/MyOrders";
import Auth from "./pages/Auth";
import AccountSimple from "./pages/AccountSimple";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import AdminLogin from "./pages/AdminLogin";
import Loyalty from "./pages/Loyalty";
import ReturnPolicy from "./pages/ReturnPolicy";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/RecipeDetail";
import SimpleRecipes from "./pages/SimpleRecipes";
import SimpleRecipeDetail from "./pages/SimpleRecipeDetail";
import OurStory from "./pages/OurStory";
import ExportInquiry from "./pages/ExportInquiry";
import Contact from "./pages/Contact";
import ShippingPolicy from "./pages/ShippingPolicy";
import FAQs from "./pages/FAQs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Blog from "./pages/Blog";
import BulkOrders from "./pages/BulkOrders";
import NotFound from "./pages/NotFound";
import TestLoyalty from "./pages/TestLoyalty";
import TestAuth from "./pages/TestAuth";
import DebugUsers from "./pages/DebugUsers";
import MobileBottomNav from "./components/mobile/MobileBottomNav";
import PWAInstallPrompt from "./components/mobile/PWAInstallPrompt";

// Scroll to top component - fixes the footer link issue
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Premium Terms & Conditions component with animations
const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Terms & <span className="text-yellow-300">Conditions</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Your trust is our foundation. Please read these terms carefully.
            </p>
          </div>
        </div>
        {/* Floating spice elements */}
        <div className="absolute top-10 left-10 w-4 h-4 bg-yellow-300 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-orange-300 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute bottom-10 left-1/4 w-2 h-2 bg-red-300 rounded-full animate-ping opacity-40"></div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Introduction Card */}
            <div className="bg-white rounded-2xl p-8 shadow-xl mb-8 border-l-4 border-orange-500 animate-fade-in">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">प्</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">PRAYAN Spices Pvt. Ltd.</h2>
                  <p className="text-orange-600 font-medium">Premium Quality • Authentic Spices</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Welcome to PRAYAN - India's premium spice destination. These terms govern your relationship with us 
                and ensure a transparent, trustworthy shopping experience for authentic Indian spices.
              </p>
            </div>

            {/* Terms Grid */}
            <div className="grid gap-6">
              {/* Term 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-slide-up">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-orange-600 font-bold">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Acceptance of Terms</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      By accessing and using the PRAYAN website, mobile app, or any of our services, you accept and agree to be 
                      bound by these terms and conditions. If you do not agree to these terms, please do not use our services.
                    </p>
                    <div className="bg-orange-50 rounded-lg p-4">
                      <p className="text-orange-800 font-medium text-sm">
                        ✓ Applies to website, mobile app, and all PRAYAN services
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Term 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-slide-up delay-100">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-red-600 font-bold">2</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Product Information & Quality</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      We strive to provide accurate product descriptions, images, and pricing. All our spices undergo 
                      rigorous quality checks and are sourced directly from trusted farmers across India.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-green-50 rounded-lg p-4">
                        <p className="text-green-800 font-medium text-sm">✓ 100% Pure & Natural</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-blue-800 font-medium text-sm">✓ Lab Tested Quality</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Term 3 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-slide-up delay-200">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-yellow-600 font-bold">3</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Orders & Payment</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      All orders are subject to availability and confirmation. We accept multiple payment methods 
                      including UPI, cards, net banking, and Cash on Delivery for your convenience.
                    </p>
                    <div className="grid md:grid-cols-3 gap-3">
                      <div className="bg-purple-50 rounded-lg p-3 text-center">
                        <p className="text-purple-800 font-medium text-sm">💳 Cards</p>
                      </div>
                      <div className="bg-indigo-50 rounded-lg p-3 text-center">
                        <p className="text-indigo-800 font-medium text-sm">📱 UPI</p>
                      </div>
                      <div className="bg-teal-50 rounded-lg p-3 text-center">
                        <p className="text-teal-800 font-medium text-sm">💰 COD</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Term 4 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-slide-up delay-300">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-green-600 font-bold">4</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Shipping & Delivery</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      We deliver across India to serviceable pincodes. Our packaging ensures freshness and quality 
                      during transit. Delivery timelines are estimates and may vary based on location.
                    </p>
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
                      <p className="text-gray-700 font-medium">🚚 FREE shipping on ALL orders!</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Term 5 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-slide-up delay-500">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-blue-600 font-bold">5</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Returns & Refunds</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      We offer a 30-day return policy for unopened products in original packaging. 
                      For quality issues, returns are accepted within 7 days of delivery.
                    </p>
                    <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-400">
                      <p className="text-red-800 font-medium text-sm">
                        ⚠️ Note: Opened spice products cannot be returned due to hygiene reasons, except for quality defects.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Term 6 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-slide-up delay-700">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-purple-600 font-bold">6</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Intellectual Property</h3>
                    <p className="text-gray-600 leading-relaxed">
                      All content on this website, including recipes, images, logos, and brand materials, 
                      is the property of PRAYAN and is protected by copyright laws.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="mt-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8 text-white animate-fade-in">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold mb-2">Need Help?</h3>
                <p className="text-orange-100">Our legal team is here to assist you</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
                  <div className="text-2xl mb-2">📧</div>
                  <p className="font-medium">Email</p>
                  <p className="text-orange-100">legal@prayan.com</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
                  <div className="text-2xl mb-2">📞</div>
                  <p className="font-medium">Phone</p>
                  <p className="text-orange-100">+91 88666 58919</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-all duration-300">
                  <div className="text-2xl mb-2">💬</div>
                  <p className="font-medium">WhatsApp</p>
                  <a href="https://wa.me/918866658919" className="text-yellow-300 hover:text-yellow-200 transition-colors">
                    Chat Now
                  </a>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center animate-fade-in">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <p className="text-gray-600 mb-2">
                  <strong>Last Updated:</strong> January 2025
                </p>
                <p className="text-sm text-gray-500">
                  PRAYAN Spices Pvt. Ltd. • Balaji Complex, Kawas, Surat – 394510, Gujarat, India
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LoyaltyProvider>
          <ReviewProvider>
            <WishlistProvider>
              <CouponProvider>
                <OrderProvider>
                  <CartProvider>
                      <TooltipProvider>
                        <Toaster />
                        <Sonner />
                        <BrowserRouter>
                          <ScrollToTop />
                          <div className="min-h-screen bg-background">
                            <Routes>
                              <Route path="/" element={<Index />} />
                              <Route path="/shop" element={<Shop />} />
                              <Route path="/shop-all" element={<ShopAll />} />
                              <Route path="/product/:id" element={<ProductDetail />} />
                              <Route path="/checkout" element={<Checkout />} />
                              <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
                              <Route path="/my-orders" element={<MyOrders />} />
                              <Route path="/auth" element={<Auth />} />
                              <Route path="/account" element={<AccountSimple />} />
                              <Route path="/loyalty" element={<Loyalty />} />
                              <Route path="/return-policy" element={<ReturnPolicy />} />
                              <Route path="/recipes" element={<Recipes />} />
                              <Route path="/recipe/:id" element={<RecipeDetail />} />
                              <Route path="/simple-recipes" element={<SimpleRecipes />} />
                              <Route path="/simple-recipe/:id" element={<SimpleRecipeDetail />} />
                              <Route path="/about" element={<OurStory />} />
                              <Route path="/export" element={<ExportInquiry />} />
                              <Route path="/contact" element={<Contact />} />
                              <Route path="/shipping-policy" element={<ShippingPolicy />} />
                              <Route path="/faqs" element={<FAQs />} />
                              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                              <Route path="/terms-conditions" element={<TermsConditions />} />
                              <Route path="/blog" element={<Blog />} />
                              <Route path="/bulk-orders" element={<BulkOrders />} />
                              <Route path="/admin" element={<AdminDashboard />} />
                              <Route path="/admin/orders" element={<AdminOrdersPage />} />
                              <Route path="/admin/login" element={<AdminLogin />} />
                              <Route path="/admin-login" element={<AdminLogin />} />
                              <Route path="/test-loyalty" element={<TestLoyalty />} />
                              <Route path="/test-auth" element={<TestAuth />} />
                              <Route path="/debug-users" element={<DebugUsers />} />
                              <Route path="*" element={<NotFound />} />
                            </Routes>
                            
                            {/* Mobile-specific components */}
                            <MobileBottomNav />
                            <PWAInstallPrompt />
                          </div>
                        </BrowserRouter>
                      </TooltipProvider>
                    </CartProvider>
                  </OrderProvider>
                </CouponProvider>
              </WishlistProvider>
            </ReviewProvider>
          </LoyaltyProvider>
        </AuthProvider>
      </QueryClientProvider>
  );
};

export default App;
