import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Users, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import SEOHead from '@/components/seo/SEOHead';
import { recipes } from '@/data/recipes';

const RecipeDetailSimple = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  console.log('🔥 SIMPLE RecipeDetail - ID:', id);
  
  const recipe = recipes.find(r => r.id === id);
  
  console.log('🔥 SIMPLE RecipeDetail - Recipe found:', recipe ? 'YES' : 'NO');
  
  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Recipe Not Found</h1>
            <p className="mb-4">Recipe ID: {id}</p>
            <p className="mb-4">Available recipes: {recipes.map(r => r.id).join(', ')}</p>
            <Button onClick={() => navigate('/recipes')}>
              Back to Recipes
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 pb-20 lg:pb-0">
      <SEOHead 
        title={`${recipe.name} Recipe - ${recipe.nameHindi} | Prayan Masale`}
        description={`Learn how to make ${recipe.name} (${recipe.nameHindi}) with authentic Prayan spices. ${recipe.description} Cooking time: ${recipe.cookingTime}, Serves: ${recipe.servings}.`}
        keywords={`${recipe.name.toLowerCase()} recipe, ${recipe.nameHindi}, how to make ${recipe.name.toLowerCase()}, indian recipes, ${recipe.category.toLowerCase()} recipes, authentic recipes, prayan spices recipes`}
        image={`https://prayan-shop.shop${recipe.image}`}
        url={`https://prayan-shop.shop/recipe/${recipe.id}`}
        type="article"
      />
      <Header />
      
      <div className="container mx-auto px-4 py-4 lg:py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/recipes')}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Recipes
        </Button>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            {/* Recipe Image */}
            <div className="relative">
              <img 
                src={recipe.image} 
                alt={recipe.name}
                className="w-full h-48 lg:h-64 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop';
                }}
              />
              <div className="absolute top-4 right-4">
                <Badge className={getDifficultyColor(recipe.difficulty)}>
                  {recipe.difficulty}
                </Badge>
              </div>
            </div>
            
            <CardHeader className="p-4 lg:p-6">
              <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-800">
                {recipe.name}
              </CardTitle>
              <p className="text-lg text-orange-600 font-medium">
                {recipe.nameHindi}
              </p>
              <p className="text-gray-600 mt-2">
                {recipe.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{recipe.cookingTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{recipe.servings}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ChefHat className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{recipe.category}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-4 lg:p-6">
              {/* Ingredients */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Ingredients Needed</h3>
                <div className="grid gap-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{ingredient.name}</span>
                      <span className="text-orange-600">{ingredient.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Instructions</h3>
                <ol className="space-y-3">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Tips */}
              {recipe.tips && recipe.tips.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4">Chef's Tips</h3>
                  <ul className="space-y-2">
                    {recipe.tips.map((tip, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="text-orange-600">•</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Nutrition Info */}
              {recipe.nutritionInfo && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Nutrition Information</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="font-semibold text-gray-800">{recipe.nutritionInfo.calories}</div>
                      <div className="text-sm text-gray-600">Calories</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="font-semibold text-gray-800">{recipe.nutritionInfo.protein}</div>
                      <div className="text-sm text-gray-600">Protein</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="font-semibold text-gray-800">{recipe.nutritionInfo.carbs}</div>
                      <div className="text-sm text-gray-600">Carbs</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="font-semibold text-gray-800">{recipe.nutritionInfo.fat}</div>
                      <div className="text-sm text-gray-600">Fat</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-8 space-y-3">
                <Button 
                  onClick={() => navigate('/shop')}
                  className="w-full bg-orange-600 hover:bg-orange-700 h-12"
                >
                  Buy Spices for This Recipe
                </Button>
                <Button 
                  onClick={() => navigate('/recipes')}
                  variant="outline"
                  className="w-full h-12"
                >
                  View More Recipes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailSimple;