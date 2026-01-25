import React from 'react';
import { Quote, Heart } from 'lucide-react';

const EmotionalStorySection: React.FC = () => {
  return (
    <section className="py-24 bg-brown text-brown-foreground relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.4%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/buddhi-amma-kitchen.jpg"
                alt="PRAYAN Traditional Spices and Kitchen Heritage"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown/60 to-transparent" />
              
              {/* Overlay Text */}
              <div className="absolute bottom-8 left-8 right-8">
                <p className="font-display text-2xl text-brown-foreground italic">
                  "The aroma of home, in every pinch"
                </p>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gold/20 blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-saffron/20 blur-2xl" />

            {/* Decorative Badge */}
            <div className="absolute -bottom-4 right-8 bg-card text-card-foreground rounded-2xl p-4 shadow-xl animate-float">
              <div className="flex items-center gap-3">
                <Heart className="text-chili fill-chili" size={24} />
                <div>
                  <p className="font-semibold">Made with</p>
                  <p className="text-sm text-muted-foreground">Maa ka Pyaar</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <Quote size={48} className="text-gold/30 mb-6" />
            
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brown-foreground mb-6 leading-tight">
              From Buddhi Amma's
              <span className="text-gold block">Kitchen to Yours</span>
            </h2>

            <div className="space-y-6 text-brown-foreground/80 leading-relaxed">
              <p className="text-lg">
                Remember the comforting aroma that filled your grandmother's kitchen? 
                The rhythmic sound of the sil-batta as she ground fresh spices? 
                That's the legacy PRAYAN carries forward.
              </p>

              <p>
                In 1952, in a small village kitchen, our founder's mother – whom we 
                lovingly call Buddhi Amma – would wake before dawn to grind spices 
                for the day. Each blend was a labor of love, passed down through 
                generations.
              </p>

              <p>
                Today, while we use modern equipment, every PRAYAN spice still carries 
                that same devotion. Our master blenders follow recipes that are 70 years 
                old, ensuring that when you open a pack of PRAYAN, you're not just 
                getting spices – you're getting a piece of Indian heritage.
              </p>
            </div>

            {/* Signature */}
            <div className="mt-10 pt-8 border-t border-brown-foreground/20">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center p-2">
                  <img 
                    src="/prayan-new-logo.png" 
                    alt="PRAYAN Logo" 
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <div>
                  <p className="font-display text-xl font-semibold text-brown-foreground">
                    The PRAYAN Family
                  </p>
                  <p className="text-brown-foreground/60 text-sm">
                    Keepers of Tradition, Makers of Memories
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmotionalStorySection;
