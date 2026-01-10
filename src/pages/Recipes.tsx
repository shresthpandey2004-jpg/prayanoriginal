import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, ChefHat, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/layout/Header';
import { recipes, getRecipeCategories } from '@/data/recipes';

const Recipes = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  
  const categories = getRecipeCategories();
  const difficulties = ['Easy', 'Medium', 'Hard'];

  const filteredRecipes = recipes.filter(recipe => {
    const categoryMatch = selectedCategory === 'all' || recipe.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || recipe.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

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
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🍛 Traditional Recipes
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Discover authentic Indian recipes with all the spices you need
          </p>
          <p className="text-lg text-orange-600 font-semibold">
            Click on any recipe to see ingredients and add spices directly to your cart!
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <ChefHat className="w-4 h-4 text-gray-600" />
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                {difficulties.map(difficulty => (
                  <SelectItem key={difficulty} value={difficulty}>
                    {difficulty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map(recipe => (
            <Card 
              key={recipe.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => window.location.href = `/recipe/${recipe.id}.html`}
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
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
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
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {recipe.category}
                  </Badge>
                  <span className="text-xs text-orange-600 font-medium">
                    {recipe.ingredients.length} spices needed
                  </span>
                </div>
                
                <Button 
                  className="w-full mt-4 bg-orange-600 hover:bg-orange-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Navigate to static HTML pages instead of React routes
                    window.location.href = `/recipe/${recipe.id}.html`;
                  }}
                >
                  View Recipe & Buy Spices
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No recipes found matching your filters.
            </p>
            <Button 
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDifficulty('all');
              }}
              className="mt-4"
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;