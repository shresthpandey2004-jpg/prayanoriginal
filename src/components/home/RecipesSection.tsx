import React from 'react';
import { Clock, ChefHat, ArrowRight, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { recipes } from '@/data/recipes';

const RecipesSection: React.FC = () => {
  // Show only first 4 recipes
  const featuredRecipes = recipes.slice(0, 4);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-orange-600 mb-3">
              <ChefHat size={20} />
              <span className="text-sm font-medium uppercase tracking-wider">Cooking Inspiration</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-800">
              Traditional <span className="text-orange-600">Recipes</span>
            </h2>
            <p className="text-gray-600 mt-3 max-w-lg">
              Discover authentic Indian recipes with all the spices you need. Click any recipe to see ingredients and buy spices directly!
            </p>
          </div>
          <Button variant="outline" size="lg" asChild className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">
            <Link to="/recipes" className="gap-2">
              All Recipes <ArrowRight size={18} />
            </Link>
          </Button>
        </div>

        {/* Recipes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredRecipes.map((recipe, index) => (
            <Link
              key={recipe.id}
              to={`/recipe/${recipe.id}`}
              className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Time Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-medium">
                  <Clock size={12} className="text-orange-600" />
                  {recipe.cookingTime}
                </div>

                {/* Difficulty Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className={getDifficultyColor(recipe.difficulty)}>
                    {recipe.difficulty}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-gray-800 mb-1 group-hover:text-orange-600 transition-colors">
                  {recipe.name}
                </h3>
                <p className="text-sm text-orange-600 font-medium mb-2">{recipe.nameHindi}</p>
                
                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                  {recipe.description}
                </p>

                {/* Recipe Info */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Users size={12} />
                    {recipe.servings}
                  </div>
                  <div className="text-orange-600 font-medium">
                    {recipe.ingredients.length} spices
                  </div>
                </div>

                {/* Spices Preview */}
                <div className="flex flex-wrap gap-1">
                  {recipe.ingredients.slice(0, 3).map((ingredient) => (
                    <span
                      key={ingredient.id}
                      className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded"
                    >
                      {ingredient.name}
                    </span>
                  ))}
                  {recipe.ingredients.length > 3 && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      +{recipe.ingredients.length - 3} more
                    </span>
                  )}
                </div>

                {/* Call to Action */}
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <p className="text-xs text-center text-gray-500 group-hover:text-orange-600 transition-colors">
                    Click to view recipe & buy spices →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              🍛 Recipe-to-Cart Feature
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Love a recipe? Click on it to see all required spices and add them directly to your cart with one click. 
              No more guessing what spices you need - we've got you covered!
            </p>
            <Button asChild className="bg-orange-600 hover:bg-orange-700">
              <Link to="/recipes">
                Explore All Recipes
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecipesSection;
