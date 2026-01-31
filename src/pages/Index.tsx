import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import SEOHead from '@/components/seo/SEOHead';
import HeroSection from '@/components/home/HeroSection';
import NewLaunchSection from '@/components/home/NewLaunchSection';
import BestSellersSection from '@/components/home/BestSellersSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';
import EmotionalStorySection from '@/components/home/EmotionalStorySection';
import RecipesSection from '@/components/home/RecipesSection';
import LimitedTimeOfferSection from '@/components/home/LimitedTimeOfferSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Prayan Masale - Premium Organic Spices Online | Pure Indian Spices | Free Delivery"
        description="Buy premium organic spices online from Prayan Masale. Pure Haldi, Red Chilli, Dhaniya, Garam Masala. 100% authentic, lab tested, free delivery. Order now and taste the difference!"
        keywords="organic spices online, pure spices india, haldi powder online, red chilli powder, dhaniya powder, garam masala, indian spices online, spices home delivery, premium masale, authentic spices, lab tested spices, free delivery spices"
        url="https://prayan-shop.shop"
        type="website"
      />
      <Header />
      <CartDrawer />
      
      <main>
        <HeroSection />
        <LimitedTimeOfferSection />
        <NewLaunchSection />
        <BestSellersSection />
        <WhyChooseUsSection />
        <EmotionalStorySection />
        <RecipesSection />
        <TestimonialsSection />
      </main>

      <Footer />
      
      {/* Simple WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
};

export default Index;
