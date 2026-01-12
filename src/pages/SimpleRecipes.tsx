import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import { simpleRecipes } from '@/data/simpleRecipes';

const SimpleRecipes = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredRecipes = selectedCategory === 'all' 
    ? simpleRecipes 
    : simpleRecipes.filter(recipe => recipe.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🍛 Traditional Recipes
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Discover authentic Indian recipes with step-by-step instructions
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <Button 
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('all')}
          >
            All Recipes
          </Button>
          <Button 
            variant={selectedCategory === 'Vegetarian' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('Vegetarian')}
          >
            Vegetarian
          </Button>
          <Button 
            variant={selectedCategory === 'Non-Vegetarian' ? 'default' : 'outline'}
            onClick={() => setSelectedCategory('Non-Vegetarian')}
          >
            Non-Vegetarian
          </Button>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map(recipe => (
            <Card 
              key={recipe.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => navigate(`/simple-recipe/${recipe.id}`)}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={recipe.image} 
                  alt={recipe.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2">
                  <Badge className={getDifficultyColor(recipe.difficulty)}>
                    {recipe.difficulty}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold text-gray-800">
                  {recipe.name}
                </CardTitle>
                <p className="text-sm text-orange-600 font-medium">
                  {recipe.nameHindi}
                </p>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">
                  {recipe.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.cookingTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{recipe.servings}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ChefHat className="w-4 h-4" />
                    <span>{recipe.category}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-orange-600 font-medium">
                    Spices needed: {recipe.spicesNeeded.length}
                  </p>
                </div>
                
                <Button 
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/simple-recipe/${recipe.id}`);
                  }}
                >
                  View Recipe
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimpleRecipes;