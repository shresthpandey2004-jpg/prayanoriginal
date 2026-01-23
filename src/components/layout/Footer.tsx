import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brown text-brown-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative p-1 rounded-full bg-gradient-to-br from-orange-100 to-yellow-100 shadow-sm">
                <img 
                  src="/prayan-new-logo.png" 
                  alt="PRAYAN Logo" 
                  className="w-8 h-8 object-contain rounded-full"
                />
              </div>
              <div>
                <h4 className="font-display text-xl font-bold">PRAYAN</h4>
                <p className="text-xs text-brown-foreground/70">Swad Ki Nayi Yatra</p>
              </div>
            </div>
            <p className="text-brown-foreground/80 text-sm mb-4">
              Premium quality spices for authentic Indian taste.
            </p>
            <div className="flex items-center gap-2">
              <a href="#" className="p-2 rounded-full bg-brown-foreground/10 hover:bg-gold hover:text-foreground transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="p-2 rounded-full bg-brown-foreground/10 hover:bg-gold hover:text-foreground transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="p-2 rounded-full bg-brown-foreground/10 hover:bg-gold hover:text-foreground transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="p-2 rounded-full bg-brown-foreground/10 hover:bg-gold hover:text-foreground transition-colors">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-display text-lg font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/shop-all" className="text-brown-foreground/80 hover:text-gold transition-colors text-sm">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-brown-foreground/80 hover:text-gold transition-colors text-sm">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/simple-recipes" className="text-brown-foreground/80 hover:text-gold transition-colors text-sm">
                  Recipes
                </Link>
              </li>
              <li>
                <Link to="/export" className="text-brown-foreground/80 hover:text-gold transition-colors text-sm">
                  Export Inquiry
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h5 className="font-display text-lg font-semibold mb-4">Customer Care</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/my-orders" className="text-brown-foreground/80 hover:text-gold transition-colors text-sm">
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="text-brown-foreground/80 hover:text-gold transition-colors text-sm">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="text-brown-foreground/80 hover:text-gold transition-colors text-sm">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-brown-foreground/80 hover:text-gold transition-colors text-sm">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-display text-lg font-semibold mb-4">Contact Us</h5>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
                <span className="text-brown-foreground/80">
                  Balaji Complex, Kawas<br />
                  Surat – 394510, Gujarat
                </span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone size={16} className="text-gold shrink-0" />
                <a href="tel:+918866658919" className="text-brown-foreground/80 hover:text-gold transition-colors">
                  +91 88666 58919
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail size={16} className="text-gold shrink-0" />
                <a href="mailto:contact@prayanmasale.com" className="text-brown-foreground/80 hover:text-gold transition-colors">
                  contact@prayanmasale.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brown-foreground/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-brown-foreground/60">
            <p>© 2026 PRAYAN Spices. Made with ❤️ in India</p>
            <span className="text-xs">100% Secure Payments</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;