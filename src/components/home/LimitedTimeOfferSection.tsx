import React, { useState, useEffect } from 'react';
import { Timer, Gift, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LimitedTimeOfferSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        if (days < 0) {
          days = 0;
          hours = 0;
          minutes = 0;
          seconds = 0;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-accent relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-gold" />
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-saffron/10 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Content */}
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex w-16 h-16 rounded-2xl bg-gold/20 items-center justify-center">
              <Gift className="text-gold" size={32} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Timer className="text-gold animate-pulse" size={18} />
                <span className="text-sm font-semibold text-accent-foreground uppercase tracking-wider">
                  Limited Time Offer
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-accent-foreground">
                Festival Special: <span className="text-gold">Flat 25% OFF</span>
              </h3>
            </div>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-3">
            {[
              { value: timeLeft.days, label: 'Days' },
              { value: timeLeft.hours, label: 'Hours' },
              { value: timeLeft.minutes, label: 'Mins' },
              { value: timeLeft.seconds, label: 'Secs' },
            ].map((item, index) => (
              <React.Fragment key={item.label}>
                <div className="bg-background rounded-xl p-3 min-w-[70px] text-center shadow-soft">
                  <p className="font-display text-2xl md:text-3xl font-bold text-foreground">
                    {String(item.value).padStart(2, '0')}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase">{item.label}</p>
                </div>
                {index < 3 && (
                  <span className="text-2xl font-bold text-accent-foreground/50">:</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* CTA */}
          <Button variant="hero" asChild>
            <Link to="/shop?offer=festival" className="gap-2">
              Shop Now <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LimitedTimeOfferSection;
