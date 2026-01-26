import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import WhatsAppButton from '@/components/common/WhatsAppButton';
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
