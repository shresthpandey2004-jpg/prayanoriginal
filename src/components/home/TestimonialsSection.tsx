import React from 'react';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    review: 'The aroma of PRAYAN spices reminds me of my grandmother\'s kitchen. Absolutely authentic and pure. My biryani has never tasted better!',
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    location: 'Delhi',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    review: 'Been using PRAYAN for 5 years now. The quality is unmatched. My family can instantly tell when I use any other brand.',
  },
  {
    id: 3,
    name: 'Anita Patel',
    location: 'Ahmedabad',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/67.jpg',
    review: 'The Garam Masala is exceptional! You can actually smell the cardamom and cinnamon. Worth every rupee.',
  },
  {
    id: 4,
    name: 'Suresh Nair',
    location: 'Kerala',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    review: 'As a chef, I\'m very particular about my spices. PRAYAN meets all my professional standards. Highly recommended!',
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gold font-medium tracking-widest uppercase mb-3">
            Customer Love
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Our <span className="text-gradient-gold">Family</span> Says
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join millions of happy customers who have made PRAYAN a part of their daily cooking.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="bg-card rounded-2xl p-6 border border-border hover:shadow-glow hover:-translate-y-2 transition-all duration-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Quote size={24} className="text-gold/30 mb-4" />
              
              <p className="text-foreground mb-6 leading-relaxed">
                "{review.review}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gold/20"
                />
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.location}</p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={12} className="text-gold fill-gold" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Rating */}
        <div className="mt-16 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={28} className="text-gold fill-gold" />
            ))}
          </div>
          <p className="text-2xl font-display font-bold text-foreground">
            4.9 out of 5
          </p>
          <p className="text-muted-foreground">Based on 50,000+ reviews</p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
