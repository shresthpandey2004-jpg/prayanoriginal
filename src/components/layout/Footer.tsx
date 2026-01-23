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
            <form 
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                const email = (e.target as HTMLFormElement).email.value;
                if (!email) {
                  alert('Please enter your email address');
                  return;
                }
                
                // Create WhatsApp message for newsletter signup
                const message = `📧 *NEWSLETTER SUBSCRIPTION - PRAYAN MASALE*

Email: ${email}

Please add me to your newsletter for:
• Exclusive recipes
• Festive offers  
• Spice stories and tips
• New product updates

Thank you!`;

                const whatsappUrl = `https://wa.me/918866658919?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
                
                // Also send to second number as backup
                setTimeout(() => {
                  const whatsappUrl2 = `https://wa.me/919974849812?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl2, '_blank');
                }, 1000);
                
                // Reset form
                (e.target as HTMLFormElement).reset();
                alert('Newsletter subscription sent! We\'ll add you to our mailing list.');
              }}
            >
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-brown-foreground/10 border border-brown-foreground/20 text-brown-foreground placeholder:text-brown-foreground/50 focus:outline-none focus:border-gold"
                required
              />
              <Button type="submit" variant="gold" className="gap-2">
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
              <div className="relative p-1 rounded-full bg-gradient-to-br from-orange-100 to-yellow-100 shadow-sm">
                <img 
                  src="/prayan-new-logo.png" 
                  alt="PRAYAN Logo" 
                  className="w-10 h-10 object-contain rounded-full"
                />
              </div>
              <div>
                <h4 className="font-display text-2xl font-bold">PRAYAN</h4>
                <p className="text-xs text-brown-foreground/70">Swad Ki Nayi Yatra</p>
              </div>
            </div>
            <p className="text-brown-foreground/80 text-sm leading-relaxed mb-6">
              Bringing the authentic taste of India to your kitchen with premium quality spices. 
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
              <li>
                <Link
                  to="/shop-all"
                  className="text-brown-foreground/80 hover:text-gold transition-colors text-sm"
                >
                  Shop All
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-brown-foreground/80 hover:text-gold transition-colors text-sm"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/simple-recipes"
                  className="text-brown-foreground/80 hover:text-gold transition-colors text-sm"
                >
                  Recipes
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-brown-foreground/80 hover:text-gold transition-colors text-sm"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/export"
                  className="text-brown-foreground/80 hover:text-gold transition-colors text-sm"
                >
                  Export Inquiry
                </Link>
              </li>
              <li>
                <Link
                  to="/bulk-orders"
                  className="text-brown-foreground/80 hover:text-gold transition-colors text-sm"
                >
                  Bulk Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h5 className="font-display text-lg font-semibold mb-6">Customer Care</h5>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/my-orders"
                  className="text-brown-foreground/80 hover:text-gold transition-colors text-sm"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping-policy"
                  className="text-brown-foreground/80 hover:text-gold transition-colors text-sm"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/return-policy"
                  className="text-brown-foreground/80 hover:text-gold transition-colors text-sm"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  to="/faqs"
                  className="text-brown-foreground/80 hover:text-gold transition-colors text-sm"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-brown-foreground/80 hover:text-gold transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-conditions"
                  className="text-brown-foreground/80 hover:text-gold transition-colors text-sm"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-display text-lg font-semibold mb-6">Get In Touch</h5>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={18} className="text-gold mt-0.5 shrink-0" />
                <span className="text-brown-foreground/80">
                  PRAYAN Royal Spice Emporium<br />
                  Balaji Complex, Kawas<br />
                  Surat – 394510, Gujarat, India
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone size={18} className="text-gold shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+918866658919" className="text-brown-foreground/80 hover:text-gold transition-colors">
                    +91 88666 58919
                  </a>
                  <a href="tel:+919974849812" className="text-brown-foreground/80 hover:text-gold transition-colors">
                    +91 99748 49812
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail size={18} className="text-gold shrink-0" />
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
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-brown-foreground/60">
            <p>© 2026 PRAYAN Spices. Made with ❤️ in India</p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-xs">💳</span>
                <span className="text-xs">📱</span>
                <span className="text-xs">💰</span>
              </div>
              <span className="text-xs">100% Secure Payments</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;