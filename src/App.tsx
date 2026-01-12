import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { CouponProvider } from "@/context/CouponContext";
import { ReferralProvider } from "@/context/ReferralContext";
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
import Referrals from "./pages/Referrals";
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
// import TermsConditions from "./pages/TermsConditions";
import NotFound from "./pages/NotFound";
import MobileBottomNav from "./components/mobile/MobileBottomNav";
import PWAInstallPrompt from "./components/mobile/PWAInstallPrompt";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ReferralProvider>
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
                              <Route path="/referrals" element={<Referrals />} />
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
                              {/* <Route path="/terms-conditions" element={<TermsConditions />} /> */}
                              <Route path="/admin" element={<AdminDashboard />} />
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
        </ReferralProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
