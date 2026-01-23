import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import WhatsAppChatWidget from '@/components/common/WhatsAppChatWidget';
import HeroSection from '@/components/home/HeroSection';
import BestSellersSection from '@/components/home/BestSellersSection';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />
      
      <main>
        <HeroSection />
        <BestSellersSection />
      </main>

      <Footer />
      
      <WhatsAppChatWidget />
    </div>
  );
};

export default Index;
