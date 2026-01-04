import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brown text-brown-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-brown-foreground/10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-display text-3xl font-bold mb-3">
              Join the PRAYAN Family
            </h3>
            <p className="text-brown-foreground/80 mb-6">
              Subscribe for exclusive recipes, festive offers, and the story behind our spices.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-brown-foreground/10 border border-brown-foreground/20 text-brown-foreground placeholder:text-brown-foreground/50 focus:outline-none focus:border-gold"
              />
              <Button variant="gold" className="gap-2">
                Subscribe <Send size={16} />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center">
                <span className="font-display text-xl font-bold text-primary-foreground">प्</span>
              </div>
              <div>
                <h4 className="font-display text-2xl font-bold">PRAYAN</h4>
                <p className="text-xs text-brown-foreground/70">Pure Taste, Pure Emotions</p>
              </div>
            </div>
            <p className="text-brown-foreground/80 text-sm leading-relaxed mb-6">
              Bringing the authentic taste of India to your kitchen since generations. 
              Every spice tells a story of tradition, love, and purity.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 rounded-full bg-brown-foreground/10 hover:bg-gold hover:text-foreground transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-brown-foreground/10 hover:bg-gold hover:text-foreground transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-brown-foreground/10 hover:bg-gold hover:text-foreground transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-brown-foreground/10 hover:bg-gold hover:text-foreground transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-display text-lg font-semibold mb-6">Quick Links</h5>
            <ul className="space-y-3">
              {['Shop All', 'Our Story', 'Recipes', 'Blog', 'Export Inquiry', 'Bulk Orders'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-brown-foreground/80 hover:text-gold transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h5 className="font-display text-lg font-semibold mb-6">Customer Care</h5>
            <ul className="space-y-3">
              {['Track Order', 'Shipping Policy', 'Returns & Refunds', 'FAQs', 'Privacy Policy', 'Terms & Conditions'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                    className="text-brown-foreground/80 hover:text-gold transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-display text-lg font-semibold mb-6">Get In Touch</h5>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={18} className="text-gold mt-0.5 shrink-0" />
                <span className="text-brown-foreground/80">
                  PRAYAN Spices Pvt. Ltd.<br />
                  Masala Gali, Chandni Chowk<br />
                  Delhi - 110006, India
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone size={18} className="text-gold shrink-0" />
                <a href="tel:+919876543210" className="text-brown-foreground/80 hover:text-gold transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail size={18} className="text-gold shrink-0" />
                <a href="mailto:hello@prayan.in" className="text-brown-foreground/80 hover:text-gold transition-colors">
                  hello@prayan.in
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brown-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-brown-foreground/60">
            <p>© 2024 PRAYAN Spices. Made with ❤️ in India</p>
            <div className="flex items-center gap-6">
              <img src="https://cdn-icons-png.flaticon.com/512/196/196566.png" alt="Payment" className="h-6 opacity-70" />
              <span className="text-xs">100% Secure Payments</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
