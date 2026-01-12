import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Award, Users, Leaf, Star, MapPin, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Link } from 'react-router-dom';

const OurStory = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const milestones = [
    {
      year: "1985",
      title: "The Beginning",
      description: "Started as a small family business in the heart of India, grinding spices by hand with traditional stone mills.",
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      year: "1995",
      title: "First Export",
      description: "Expanded internationally, bringing authentic Indian flavors to kitchens around the world.",
      icon: <MapPin className="w-6 h-6" />
    },
    {
      year: "2010",
      title: "Organic Certification",
      description: "Became certified organic, ensuring pure and natural spices for health-conscious customers.",
      icon: <Leaf className="w-6 h-6" />
    },
    {
      year: "2020",
      title: "Digital Revolution",
      description: "Launched online platform, making premium spices accessible to every Indian household.",
      icon: <Star className="w-6 h-6" />
    }
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Pure Emotions",
      description: "Every spice carries the love and tradition of generations, bringing families together through food."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Premium Quality",
      description: "Hand-selected spices from the finest farms, processed with care to preserve natural flavors and nutrients."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Family Legacy",
      description: "Four generations of spice expertise, passing down traditional knowledge and authentic recipes."
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Sustainable Farming",
      description: "Supporting local farmers with fair trade practices and promoting organic, eco-friendly cultivation."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <Header />
      
      {/* Hero Section with Parallax */}
      <motion.section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ y, opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center z-10 px-4"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold text-gray-800 mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Story</span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            A journey of <span className="font-semibold text-orange-600">four generations</span>, 
            bringing authentic Indian flavors to your kitchen with love, tradition, and premium quality.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Button size="lg" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 text-lg">
              Discover Our Spices
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Floating Spice Elements */}
        <motion.div
          className="absolute top-20 left-10 text-6xl opacity-20"
          animate={{ 
            rotate: 360,
            y: [0, -20, 0]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          🌶️
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-5xl opacity-20"
          animate={{ 
            rotate: -360,
            y: [0, 15, 0]
          }}
          transition={{ 
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          ⭐
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-20 text-4xl opacity-20"
          animate={{ 
            x: [0, 10, 0],
            y: [0, -10, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          🍃
        </motion.div>
      </motion.section>

      {/* Our Journey Timeline */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Our <span className="text-orange-600">Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to becoming India's trusted spice brand, 
              every milestone tells a story of passion, quality, and dedication.
            </p>
            <div className="mt-8 text-center">
              <span className="inline-block px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                🌟 Established 1985 • Family Legacy • Premium Quality 🌟
              </span>
            </div>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-400 to-red-400 rounded-full" />
            
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-16 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                  <Card className="bg-white/80 backdrop-blur-sm border-orange-200 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-orange-100 rounded-full text-orange-600">
                          {milestone.icon}
                        </div>
                        <span className="text-2xl font-bold text-orange-600">{milestone.year}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Timeline Dot */}
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-white shadow-lg"
                  whileInView={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                  viewport={{ once: true }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-100 to-red-100">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Our <span className="text-orange-600">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide us in delivering the finest spices and creating lasting relationships with our customers.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full bg-white/90 backdrop-blur-sm border-orange-200 hover:shadow-2xl transition-all duration-300 group-hover:border-orange-400">
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className="inline-flex p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {value.icon}
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Families Across India
            </h2>
            <p className="text-xl opacity-90">
              Numbers that reflect our commitment to quality and customer satisfaction
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "40+", label: "Years of Excellence", icon: <Clock className="w-8 h-8" /> },
              { number: "50,000+", label: "Happy Customers", icon: <Users className="w-8 h-8" /> },
              { number: "100+", label: "Premium Spices", icon: <Star className="w-8 h-8" /> },
              { number: "25+", label: "Countries Served", icon: <MapPin className="w-8 h-8" /> }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <motion.div
                  className="inline-flex p-4 bg-white/20 rounded-full mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {stat.icon}
                </motion.div>
                <motion.h3
                  className="text-4xl md:text-5xl font-bold mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.h3>
                <p className="text-xl opacity-90">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              What Our <span className="text-orange-600">Customers Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from families who trust Prayan for their daily cooking needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                location: "Mumbai",
                rating: 5,
                text: "Prayan spices have transformed my cooking! The aroma and taste are exactly like what my grandmother used to make. Pure quality!"
              },
              {
                name: "Rajesh Kumar",
                location: "Delhi",
                rating: 5,
                text: "Been using Prayan spices for 5 years now. The consistency in quality and the authentic taste keeps me coming back."
              },
              {
                name: "Meera Patel",
                location: "Ahmedabad",
                rating: 5,
                text: "As a professional chef, I trust only Prayan for my restaurant. The spices are fresh, aromatic, and always premium quality."
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-gray-800">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Join Our <span className="text-orange-600">Spice Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Experience the authentic taste of India with our premium spices. 
              From our family to yours, with love and tradition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/simple-recipes">
                <Button size="lg" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4">
                  Explore Recipes
                </Button>
              </Link>
              <Link to="/shop">
                <Button size="lg" variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-8 py-4">
                  Shop Premium Spices
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default OurStory;