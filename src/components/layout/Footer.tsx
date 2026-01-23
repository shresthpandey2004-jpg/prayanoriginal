import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brown text-brown-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-brown-foreground/10 bg-gradient-to-r from-brown/95 to-brown">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-brown-foreground/10 rounded-full px-4 py-2 mb-6">
              <span className="text-gold text-sm">✨</span>
              <span className="text-brown-foreground/80 text-sm font-medium">Exclusive Updates</span>
            </div>
            <h3 className="font-display text-4xl font-bold mb-4 bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent">
              Join the PRAYAN Family
            </h3>
            <p className="text-brown-foreground/80 mb-8 text-lg leading-relaxed">
              Subscribe for exclusive recipes, festive offers, and the story behind our authentic spices.
            </p>
            <form 
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
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
                
                // Reset form
                (e.target as HTMLFormElement).reset();
                alert('Newsletter subscription sent! We\'ll add you to our mailing list.');
              }}
            >
              <div className="relative flex-1">
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-6 py-4 rounded-xl bg-brown-foreground/10 border border-brown-foreground/20 text-brown-foreground placeholder:text-brown-foreground/50 focus:outline-none focus:border-gold focus:bg-brown-foreground/5 transition-all duration-300"
                  required
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Mail size={18} className="text-brown-foreground/40" />
                </div>
              </div>
              <Button type="submit" size="lg" className="bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-500 hover:to-gold text-brown font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Send size={18} className="mr-2" />
                Subscribe Now
              </Button>
            </form>
            <p className="text-xs text-brown-foreground/50 mt-4">
              🔒 We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-20 bg-gradient-to-b from-brown to-brown/95">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 via-yellow-500 to-orange-600 flex items-center justify-center shadow-2xl">
                  <img 
                    src="/prayan-new-logo.png" 
                    alt="PRAYAN Logo" 
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
              <div>
                <h4 className="font-display text-3xl font-bold bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent">PRAYAN</h4>
                <p className="text-sm text-brown-foreground/70 font-medium">Swad Ki Nayi Yatra</p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xs">⭐</span>
                    ))}
                  </div>
                  <span className="text-xs text-brown-foreground/60 ml-1">4.9/5</span>
                </div>
              </div>
            </div>
            <p className="text-brown-foreground/80 text-sm leading-relaxed mb-8">
              Bringing the authentic taste of India to your kitchen with premium quality spices. 
              Every grain tells a story of tradition, love, and purity that spans generations.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="group p-3 rounded-xl bg-brown-foreground/10 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-110">
                <Facebook size={20} className="text-brown-foreground/70 group-hover:text-white transition-colors" />
              </a>
              <a href="#" className="group p-3 rounded-xl bg-brown-foreground/10 hover:bg-gradient-to-r hover:from-pink-500 hover:to-rose-500 transition-all duration-300 transform hover:scale-110">
                <Instagram size={20} className="text-brown-foreground/70 group-hover:text-white transition-colors" />
              </a>
              <a href="#" className="group p-3 rounded-xl bg-brown-foreground/10 hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-110">
                <Twitter size={20} className="text-brown-foreground/70 group-hover:text-white transition-colors" />
              </a>
              <a href="#" className="group p-3 rounded-xl bg-brown-foreground/10 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 transition-all duration-300 transform hover:scale-110">
                <Youtube size={20} className="text-brown-foreground/70 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-gold to-yellow-500 flex items-center justify-center">
                <span className="text-brown text-sm font-bold">🔗</span>
              </div>
              <h5 className="font-display text-xl font-bold text-brown-foreground">Quick Links</h5>
            </div>
            <ul className="space-y-4">
              {[
                { name: 'Shop All', href: '/shop-all' },
                { name: 'Our Story', href: '/about' },
                { name: 'Recipes', href: '/simple-recipes' },
                { name: 'Blog', href: '/blog' },
                { name: 'Export Inquiry', href: '/export' },
                { name: 'Bulk Orders', href: '/bulk-orders' }
              ].map((link, index) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="group flex items-center gap-3 text-brown-foreground/80 hover:text-gold transition-all duration-300 text-sm font-medium"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-brown-foreground/40 group-hover:bg-gold transition-colors"></div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-white text-sm font-bold">💬</span>
              </div>
              <h5 className="font-display text-xl font-bold text-brown-foreground">Customer Care</h5>
            </div>
            <ul className="space-y-4">
              {[
                { name: 'Track Order', href: '/my-orders' },
                { name: 'Shipping Policy', href: '/shipping-policy' },
                { name: 'Returns & Refunds', href: '/return-policy' },
                { name: 'FAQs', href: '/faqs' },
                { name: 'Privacy Policy', href: '/privacy-policy' },
                { name: 'Terms & Conditions', href: '/terms-conditions' }
              ].map((link, index) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="group flex items-center gap-3 text-brown-foreground/80 hover:text-gold transition-all duration-300 text-sm font-medium"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-brown-foreground/40 group-hover:bg-gold transition-colors"></div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                <span className="text-white text-sm font-bold">📞</span>
              </div>
              <h5 className="font-display text-xl font-bold text-brown-foreground">Get In Touch</h5>
            </div>
            <ul className="space-y-6">
              <li className="group">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-brown-foreground/5 hover:bg-brown-foreground/10 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-brown-foreground text-sm mb-1">Visit Our Store</p>
                    <span className="text-brown-foreground/80 text-sm leading-relaxed">
                      PRAYAN Royal Spice Emporium<br />
                      Balaji Complex, Kawas<br />
                      Surat – 394510, Gujarat, India
                    </span>
                  </div>
                </div>
              </li>
              <li className="group">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-brown-foreground/5 hover:bg-brown-foreground/10 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-brown-foreground text-sm mb-1">Call Us</p>
                    <a href="tel:+918866658919" className="text-brown-foreground/80 hover:text-gold transition-colors text-sm font-medium">
                      +91 88666 58919
                    </a>
                  </div>
                </div>
              </li>
              <li className="group">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-brown-foreground/5 hover:bg-brown-foreground/10 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-brown-foreground text-sm mb-1">Email Us</p>
                    <a href="mailto:contact@prayanmasale.com" className="text-brown-foreground/80 hover:text-gold transition-colors text-sm font-medium">
                      contact@prayanmasale.com
                    </a>
                  </div>
                </div>
              </li>
            </ul>
            
            {/* Business Hours */}
            <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-gold/10 to-yellow-500/10 border border-gold/20">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-gold text-sm">🕒</span>
                <span className="font-semibold text-brown-foreground text-sm">Business Hours</span>
              </div>
              <div className="text-xs text-brown-foreground/70 space-y-1">
                <p>Mon - Sat: 10:00 AM - 7:00 PM</p>
                <p>Sunday: 11:00 AM - 5:00 PM</p>
                <p className="text-gold font-medium">Extended hours during festivals</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brown-foreground/10 bg-gradient-to-r from-brown to-brown/90">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Left Side - Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-brown-foreground/70">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xs">प्</span>
                </div>
                <span className="font-medium">© 2026 PRAYAN Spices</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-brown-foreground/20"></div>
              <div className="flex items-center gap-1">
                <span>Made with</span>
                <span className="text-red-500 animate-pulse text-lg">❤️</span>
                <span>in India</span>
              </div>
            </div>

            {/* Center - Trust Badges */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-brown-foreground/10 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-brown-foreground/80">100% Secure</span>
              </div>
              <div className="flex items-center gap-2 bg-brown-foreground/10 rounded-full px-4 py-2">
                <span className="text-xs">🌿</span>
                <span className="text-xs font-medium text-brown-foreground/80">Pure & Natural</span>
              </div>
              <div className="flex items-center gap-2 bg-brown-foreground/10 rounded-full px-4 py-2">
                <span className="text-xs">🚚</span>
                <span className="text-xs font-medium text-brown-foreground/80">Fast Delivery</span>
              </div>
            </div>

            {/* Right Side - Payment Methods */}
            <div className="flex items-center gap-4">
              <span className="text-xs text-brown-foreground/60 font-medium">We Accept:</span>
              <div className="flex items-center gap-3">
                <div className="w-8 h-6 bg-white rounded flex items-center justify-center shadow-sm">
                  <span className="text-xs font-bold text-blue-600">💳</span>
                </div>
                <div className="w-8 h-6 bg-white rounded flex items-center justify-center shadow-sm">
                  <span className="text-xs font-bold text-orange-600">📱</span>
                </div>
                <div className="w-8 h-6 bg-white rounded flex items-center justify-center shadow-sm">
                  <span className="text-xs font-bold text-green-600">💰</span>
                </div>
                <div className="text-xs text-brown-foreground/60">& more</div>
              </div>
            </div>
          </div>

          {/* Additional Info Row */}
          <div className="mt-6 pt-6 border-t border-brown-foreground/10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brown-foreground/50">
              <div className="flex items-center gap-4">
                <span>PRAYAN Royal Spice Emporium</span>
                <span>•</span>
                <span>Balaji Complex, Kawas, Surat – 394510, Gujarat, India</span>
              </div>
              <div className="flex items-center gap-4">
                <span>GST: 24XXXXX1234X1ZX</span>
                <span>•</span>
                <span>FSSAI: 12345678901234</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;