import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Users, ChefHat, Filter, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/layout/Header';
import CartDrawer from '@/components/cart/CartDrawer';
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
      <CartDrawer />
      
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 pb-20 md:pb-8">
        {/* Mobile Back Button */}
        <div className="flex items-center gap-3 mb-4 md:hidden">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 p-3 min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>

        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">
            🍛 Traditional Recipes
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-3 sm:mb-6 px-2">
            Discover authentic Indian recipes with all the spices you need
          </p>
          <p className="text-sm sm:text-base lg:text-lg text-orange-600 font-semibold px-2">
            Click on any recipe to see ingredients and add spices directly to your cart!
          </p>
        </div>

        {/* Mobile-Friendly Filters */}
        <div className="space-y-3 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-4 mb-6 sm:mb-8 sm:justify-center">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600 flex-shrink-0" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48 h-12 text-base">
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
            <ChefHat className="w-4 h-4 text-gray-600 flex-shrink-0" />
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-full sm:w-48 h-12 text-base">
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

        {/* Recipe Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredRecipes.map(recipe => (
            <Card 
              key={recipe.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer group recipe-card"
              onClick={() => navigate(`/recipe/${recipe.id}`)}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={recipe.image} 
                  alt={recipe.name}
                  className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop';
                  }}
                />
                <div className="absolute top-2 right-2">
                  <Badge className={getDifficultyColor(recipe.difficulty)}>
                    {recipe.difficulty}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-2 p-4">
                <CardTitle className="text-lg sm:text-xl font-bold text-gray-800 line-clamp-2">
                  {recipe.name}
                </CardTitle>
                <p className="text-sm text-orange-600 font-medium">
                  {recipe.nameHindi}
                </p>
              </CardHeader>
              
              <CardContent className="p-4 pt-0">
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {recipe.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span>{recipe.cookingTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 flex-shrink-0" />
                    <span>{recipe.servings}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="text-xs">
                    {recipe.category}
                  </Badge>
                  <span className="text-xs text-orange-600 font-medium">
                    {recipe.ingredients.length} spices needed
                  </span>
                </div>
                
                <Button 
                  className="w-full bg-orange-600 hover:bg-orange-700 h-12 text-base font-semibold"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/recipe/${recipe.id}`);
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
            <div className="text-6xl mb-4">🍽️</div>
            <p className="text-gray-500 text-lg mb-4">
              No recipes found matching your filters.
            </p>
            <Button 
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDifficulty('all');
              }}
              className="bg-orange-600 hover:bg-orange-700 h-12 px-6"
              variant="default"
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