import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, Users, ChefHat, Star, Heart, Share2, Print, 
  CheckCircle, Circle, Leaf, ShoppingCart, ArrowLeft 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SEOHead from '@/components/seo/SEOHead';
import { getRecipeBySlug, recipes } from '@/data/recipes';

const RecipeDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const recipe = slug ? getRecipeBySlug(slug) : null;
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [servingMultiplier, setServingMultiplier] = useState(1);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Recipe Not Found</h1>
          <p className="text-gray-600 mb-8">The recipe you're looking for doesn't exist.</p>
          <Link to="/recipes" className="text-orange-600 hover:text-orange-700 font-medium">
            ← Back to Recipes
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const toggleIngredient = (index: number) => {
    const newChecked = new Set(checkedIngredients);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedIngredients(newChecked);
  };

  const toggleStep = (stepNumber: number) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepNumber)) {
      newCompleted.delete(stepNumber);
    } else {
      newCompleted.add(stepNumber);
    }
    setCompletedSteps(newCompleted);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const adjustQuantity = (amount: string, multiplier: number): string => {
    const match = amount.match(/^(\d+(?:\.\d+)?)\s*(.*)$/);
    if (match) {
      const [, quantity, unit] = match;
      const adjustedQuantity = (parseFloat(quantity) * multiplier).toString();
      return `${adjustedQuantity} ${unit}`;
    }
    return amount;
  };

  const prayanIngredients = recipe.ingredients.filter(ingredient => ingredient.prayan);
  const relatedRecipes = recipes.filter(r => 
    r.id !== recipe.id && 
    (r.category === recipe.category || r.region === recipe.region)
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <SEOHead 
        title={recipe.seoTitle}
        description={recipe.seoDescription}
        keywords={recipe.seoKeywords.join(', ')}
        url={typeof window !== 'undefined' ? window.location.href : undefined}
        type="article"
        image={recipe.image}
      />
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link 
            to="/recipes" 
            className="text-orange-600 hover:text-orange-700 font-medium flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Recipes
          </Link>
        </div>

        {/* Recipe Header */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div>
            <img 
              src={recipe.image} 
              alt={recipe.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop';
              }}
            />
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Badge className={getDifficultyColor(recipe.difficulty)}>
                {recipe.difficulty}
              </Badge>
              <Badge variant="secondary">{recipe.category}</Badge>
              {recipe.featured && (
                <Badge className="bg-orange-600">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
              {recipe.title}
            </h1>
            <p className="text-xl text-orange-600 font-medium mb-4">
              {recipe.titleHindi}
            </p>
            <p className="text-gray-700 text-lg mb-6">
              {recipe.description}
            </p>
            
            {/* Recipe Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-500">Total Time</p>
                  <p className="font-semibold">{recipe.totalTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-500">Servings</p>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setServingMultiplier(Math.max(0.5, servingMultiplier - 0.5))}
                      disabled={servingMultiplier <= 0.5}
                    >
                      -
                    </Button>
                    <span className="font-semibold">{recipe.servings * servingMultiplier}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setServingMultiplier(servingMultiplier + 0.5)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-500">Region</p>
                  <p className="font-semibold">{recipe.region}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-500">Season</p>
                  <p className="font-semibold">{recipe.season}</p>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Heart className="w-4 h-4 mr-2" />
                Save Recipe
              </Button>
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline">
                <Print className="w-4 h-4 mr-2" />
                Print
              </Button>
            </div>
          </div>
        </div>

        {/* Recipe Content */}
        <Tabs defaultValue="ingredients" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="tips">Tips & Variations</TabsTrigger>
            <TabsTrigger value="spices">Spice Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="ingredients" className="mt-6">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Ingredients</span>
                      <span className="text-sm font-normal text-gray-500">
                        {checkedIngredients.size}/{recipe.ingredients.length} checked
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recipe.ingredients.map((ingredient, index) => (
                        <div 
                          key={index}
                          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                            checkedIngredients.has(index) 
                              ? 'bg-green-50 border-green-200' 
                              : 'hover:bg-gray-50'
                          }`}
                          onClick={() => toggleIngredient(index)}
                        >
                          {checkedIngredients.has(index) ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-400" />
                          )}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className={`font-medium ${
                                checkedIngredients.has(index) ? 'line-through text-gray-500' : ''
                              }`}>
                                {ingredient.name}
                              </span>
                              <span className="text-orange-600 font-semibold">
                                {adjustQuantity(ingredient.amount, servingMultiplier)}
                              </span>
                            </div>
                            {ingredient.prayan && (
                              <Badge variant="outline" className="mt-1 text-xs">
                                Prayan Masale
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                {/* Prayan Spices Spotlight */}
                {prayanIngredients.length > 0 && (
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="text-lg">Prayan Masale Spices</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {prayanIngredients.map((ingredient, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm">{ingredient.name}</span>
                            <Button size="sm" variant="outline" className="text-xs">
                              <ShoppingCart className="w-3 h-3 mr-1" />
                              Buy
                            </Button>
                          </div>
                        ))}
                      </div>
                      <Separator className="my-4" />
                      <Button className="w-full bg-orange-600 hover:bg-orange-700">
                        Buy All Spices
                      </Button>
                    </CardContent>
                  </Card>
                )}
                
                {/* Shopping List */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Shopping List</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Generate a shopping list for unchecked ingredients
                    </p>
                    <Button variant="outline" className="w-full">
                      Create Shopping List
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="instructions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Cooking Instructions</span>
                  <span className="text-sm font-normal text-gray-500">
                    {completedSteps.size}/{recipe.instructions.length} steps completed
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recipe.instructions.map((instruction) => (
                    <div 
                      key={instruction.step}
                      className={`flex gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${
                        completedSteps.has(instruction.step)
                          ? 'bg-green-50 border-green-200'
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => toggleStep(instruction.step)}
                    >
                      <div className="flex-shrink-0">
                        {completedSteps.has(instruction.step) ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center text-sm font-bold">
                            {instruction.step}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-gray-800 leading-relaxed ${
                          completedSteps.has(instruction.step) ? 'line-through text-gray-500' : ''
                        }`}>
                          {instruction.instruction}
                        </p>
                        {instruction.tip && (
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                            <p className="text-sm text-blue-800">
                              <strong>💡 Tip:</strong> {instruction.tip}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nutrition" className="mt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Nutritional Information</CardTitle>
                  <p className="text-sm text-gray-600">Per serving</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Calories</span>
                      <span className="font-semibold">{Math.round(recipe.nutritionalInfo.calories * servingMultiplier)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span>Protein</span>
                      <span className="font-semibold">{recipe.nutritionalInfo.protein}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Carbohydrates</span>
                      <span className="font-semibold">{recipe.nutritionalInfo.carbs}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Fat</span>
                      <span className="font-semibold">{recipe.nutritionalInfo.fat}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Fiber</span>
                      <span className="font-semibold">{recipe.nutritionalInfo.fiber}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Health Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {recipe.healthBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Leaf className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tips" className="mt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Recipe Variations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {recipe.variations.map((variation, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-gray-700">{variation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Storage Instructions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    {recipe.storageInstructions}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="spices" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Spice Spotlight</CardTitle>
                <p className="text-sm text-gray-600">
                  Learn about the key spices used in this recipe
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {recipe.spiceSpotlight.map((spice, index) => (
                    <div key={index} className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-semibold text-orange-800 mb-2">{spice.spice}</h4>
                      <p className="text-sm text-gray-700">{spice.benefit}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Recipes */}
        {relatedRecipes.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">You Might Also Like</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedRecipes.map(relatedRecipe => (
                <Card key={relatedRecipe.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={relatedRecipe.image} 
                      alt={relatedRecipe.title}
                      className="w-full h-40 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=250&fit=crop';
                      }}
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg line-clamp-1">{relatedRecipe.title}</CardTitle>
                    <p className="text-orange-600 text-sm">{relatedRecipe.titleHindi}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span>{relatedRecipe.totalTime}</span>
                      <span>{relatedRecipe.difficulty}</span>
                    </div>
                    <Link 
                      to={`/recipe/${relatedRecipe.slug}`}
                      className="text-orange-600 hover:text-orange-700 font-medium text-sm"
                    >
                      View Recipe →
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default RecipeDetail;