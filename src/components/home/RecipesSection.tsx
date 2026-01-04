import React from 'react';
import { Clock, ChefHat, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { recipes } from '@/data/products';

const RecipesSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-warm">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-gold mb-3">
              <ChefHat size={20} />
              <span className="text-sm font-medium uppercase tracking-wider">Cooking Inspiration</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Delicious <span className="text-gradient-gold">Recipes</span>
            </h2>
            <p className="text-muted-foreground mt-3 max-w-lg">
              Explore authentic Indian recipes using PRAYAN spices and bring restaurant-quality dishes to your home.
            </p>
          </div>
          <Button variant="outline" size="lg" asChild>
            <Link to="/recipes" className="gap-2">
              All Recipes <ArrowRight size={18} />
            </Link>
          </Button>
        </div>

        {/* Recipes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recipes.map((recipe, index) => (
            <Link
              key={recipe.id}
              to={`/recipes/${recipe.id}`}
              className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:shadow-glow hover:-translate-y-2 transition-all duration-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Time Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-medium">
                  <Clock size={12} className="text-gold" />
                  {recipe.time}
                </div>

                {/* Difficulty Badge */}
                <div className="absolute top-4 right-4 bg-gold/90 text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full">
                  {recipe.difficulty}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {recipe.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{recipe.titleHindi}</p>
                
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {recipe.description}
                </p>

                {/* Spices Used */}
                <div className="flex flex-wrap gap-1">
                  {recipe.spicesUsed.slice(0, 3).map((spice) => (
                    <span
                      key={spice}
                      className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"
                    >
                      {spice}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecipesSection;
