import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Users, ChefHat, ShoppingCart, Plus, Minus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import CartDrawer from '@/components/cart/CartDrawer';
import { useCart } from '@/context/CartContext';
import { getRecipeById, recipes } from '@/data/recipes';
import { products } from '@/data/products';

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart, cartItems } = useCart();
  
  const [selectedSpices, setSelectedSpices] = useState<Set<string>>(new Set());
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  
  console.log('🔍 RecipeDetail - ID from params:', id);
  console.log('🔍 RecipeDetail - All recipes:', recipes.map(r => r.id));
  console.log('🔍 RecipeDetail - User Agent:', navigator.userAgent);
  console.log('🔍 RecipeDetail - Screen size:', window.innerWidth, 'x', window.innerHeight);
  
  const recipe = id ? getRecipeById(id) : null;
  
  console.log('🔍 RecipeDetail - Recipe found:', recipe);

  useEffect(() => {
    // Simulate loading to prevent blank screen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);
  
  // Early return for debugging
  if (!id) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
        <Header />
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4">No Recipe ID provided</h2>
          <Button onClick={() => navigate('/recipes')}>Back to Recipes</Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading recipe...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    console.log('❌ Recipe not found for ID:', id);
    console.log('📱 Available recipe IDs:', recipes.map(r => r.id));
    console.log('🔍 Is mobile?', /Mobi|Android/i.test(navigator.userAgent));
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh] p-4">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">🍛</div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recipe not found</h2>
            <div className="bg-white p-4 rounded-lg mb-4 text-left">
              <p className="text-sm mb-2"><strong>Recipe ID:</strong> {id}</p>
              <p className="text-sm mb-2"><strong>Available IDs:</strong></p>
              <div className="text-xs bg-gray-100 p-2 rounded max-h-32 overflow-y-auto">
                {recipes.map(r => r.id).join(', ')}
              </div>
            </div>
            <Button 
              onClick={() => navigate('/recipes')}
              className="w-full bg-orange-600 hover:bg-orange-700"
            >
              Back to Recipes
            </Button>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (recipe) {
      // Pre-select all non-optional spices
      const defaultSpices = new Set(
        recipe.ingredients
          .filter(ingredient => !ingredient.optional)
          .map(ingredient => ingredient.id)
      );
      setSelectedSpices(defaultSpices);
      
      // Set default quantities to 1
      const defaultQuantities: Record<string, number> = {};
      recipe.ingredients.forEach(ingredient => {
        defaultQuantities[ingredient.id] = 1;
      });
      setQuantities(defaultQuantities);
    }
  }, [recipe]);

  const toggleSpice = (spiceId: string) => {
    const newSelected = new Set(selectedSpices);
    if (newSelected.has(spiceId)) {
      newSelected.delete(spiceId);
    } else {
      newSelected.add(spiceId);
    }
    setSelectedSpices(newSelected);
  };

  const updateQuantity = (spiceId: string, change: number) => {
    const newQuantity = Math.max(1, (quantities[spiceId] || 1) + change);
    setQuantities(prev => ({
      ...prev,
      [spiceId]: newQuantity
    }));
  };

  const addSelectedSpicesToCart = () => {
    let addedCount = 0;
    
    selectedSpices.forEach(spiceId => {
      const product = products.find(p => p.id === spiceId);
      if (product) {
        const quantity = quantities[spiceId] || 1;
        addToCart(product, quantity);
        addedCount++;
      }
    });

    if (addedCount > 0) {
      toast({
        title: "Spices Added to Cart! 🛒",
        description: `${addedCount} spices added for ${recipe?.name}`,
      });
    } else {
      toast({
        title: "No spices selected",
        description: "Please select at least one spice to add to cart",
        variant: "destructive"
      });
    }
  };

  const getSpiceProduct = (spiceId: string) => {
    return products.find(p => p.id === spiceId);
  };

  const isSpiceInCart = (spiceId: string) => {
    return cartItems.some(item => item.id === spiceId);
  };

  const getTotalPrice = () => {
    let total = 0;
    selectedSpices.forEach(spiceId => {
      const product = getSpiceProduct(spiceId);
      if (product) {
        total += product.price * (quantities[spiceId] || 1);
      }
    });
    return total;
  };

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
      <Header />
      <CartDrawer />
      
      <div className="container mx-auto px-4 py-4 lg:py-8 max-w-7xl">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/recipes')}
          className="mb-4 lg:mb-6 flex items-center gap-2 text-sm lg:text-base"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Recipes
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
          {/* Recipe Info */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <Card className="mb-4 lg:mb-0 overflow-hidden">
              <div className="relative">
                <img 
                  src={recipe.image} 
                  alt={recipe.name}
                  className="w-full h-48 lg:h-64 object-cover"
                  loading="lazy"
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
                <CardTitle className="text-xl lg:text-3xl font-bold text-gray-800 leading-tight">
                  {recipe.name}
                </CardTitle>
                <p className="text-base lg:text-lg text-orange-600 font-medium">
                  {recipe.nameHindi}
                </p>
                <p className="text-gray-600 mt-2 text-sm lg:text-base leading-relaxed">
                  {recipe.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-3 lg:gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-gray-500" />
                    <span className="text-gray-700 text-sm lg:text-base">{recipe.cookingTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 lg:w-5 lg:h-5 text-gray-500" />
                    <span className="text-gray-700 text-sm lg:text-base">{recipe.servings}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChefHat className="w-4 h-4 lg:w-5 lg:h-5 text-gray-500" />
                    <span className="text-gray-700 text-sm lg:text-base">{recipe.category}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-4 lg:p-6">
                {/* Instructions */}
                <div className="mb-6">
                  <h3 className="text-lg lg:text-xl font-semibold mb-4">Instructions</h3>
                  <ol className="space-y-3">
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <span className="text-gray-700 text-sm lg:text-base leading-relaxed">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Tips */}
                {recipe.tips.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg lg:text-xl font-semibold mb-4">Chef's Tips</h3>
                    <ul className="space-y-2">
                      {recipe.tips.map((tip, index) => (
                        <li key={index} className="flex gap-2">
                          <span className="text-orange-600">•</span>
                          <span className="text-gray-700 text-sm lg:text-base leading-relaxed">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Nutrition Info */}
                {recipe.nutritionInfo && (
                  <div>
                    <h3 className="text-lg lg:text-xl font-semibold mb-4">Nutrition Information</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="font-semibold text-gray-800 text-sm lg:text-base">{recipe.nutritionInfo.calories}</div>
                        <div className="text-xs lg:text-sm text-gray-600">Calories</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="font-semibold text-gray-800 text-sm lg:text-base">{recipe.nutritionInfo.protein}</div>
                        <div className="text-xs lg:text-sm text-gray-600">Protein</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="font-semibold text-gray-800 text-sm lg:text-base">{recipe.nutritionInfo.carbs}</div>
                        <div className="text-xs lg:text-sm text-gray-600">Carbs</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="font-semibold text-gray-800 text-sm lg:text-base">{recipe.nutritionInfo.fat}</div>
                        <div className="text-xs lg:text-sm text-gray-600">Fat</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Spices Shopping Cart */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <Card className="lg:sticky lg:top-4">
              <CardHeader className="p-4 lg:p-6">
                <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
                  <ShoppingCart className="w-4 h-4 lg:w-5 lg:h-5" />
                  Required Spices
                </CardTitle>
                <p className="text-xs lg:text-sm text-gray-600">
                  Click to add/remove spices for this recipe
                </p>
              </CardHeader>
              
              <CardContent className="p-4 lg:p-6">
                <div className="space-y-3 mb-6">
                  {recipe.ingredients.map(ingredient => {
                    const product = getSpiceProduct(ingredient.id);
                    const isSelected = selectedSpices.has(ingredient.id);
                    const inCart = isSpiceInCart(ingredient.id);
                    
                    return (
                      <div 
                        key={ingredient.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-all touch-manipulation ${
                          isSelected 
                            ? 'border-orange-500 bg-orange-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => toggleSpice(ingredient.id)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-medium text-gray-800 text-sm lg:text-base">
                                {ingredient.name}
                              </span>
                              {ingredient.optional && (
                                <Badge variant="outline" className="text-xs">
                                  Optional
                                </Badge>
                              )}
                              {inCart && (
                                <Check className="w-4 h-4 text-green-600" />
                              )}
                            </div>
                            <div className="text-xs lg:text-sm text-gray-600">
                              Recipe needs: {ingredient.quantity}
                            </div>
                            {product && (
                              <div className="text-xs lg:text-sm font-medium text-orange-600">
                                ₹{product.price} per pack
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-1 lg:gap-2 flex-shrink-0">
                            {isSelected && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0 touch-manipulation"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateQuantity(ingredient.id, -1);
                                  }}
                                  disabled={quantities[ingredient.id] <= 1}
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="w-6 lg:w-8 text-center font-medium text-sm">
                                  {quantities[ingredient.id] || 1}
                                </span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0 touch-manipulation"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateQuantity(ingredient.id, 1);
                                  }}
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Separator className="my-4" />
                
                <div className="space-y-3 lg:space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm lg:text-base">Selected Spices:</span>
                    <span className="font-bold text-sm lg:text-base">{selectedSpices.size}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm lg:text-base">Total Price:</span>
                    <span className="font-bold text-lg text-orange-600">
                      ₹{getTotalPrice()}
                    </span>
                  </div>
                  
                  <Button 
                    onClick={addSelectedSpicesToCart}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-sm lg:text-base touch-manipulation min-h-[44px]"
                    disabled={selectedSpices.size === 0}
                  >
                    Add {selectedSpices.size} Spices to Cart
                  </Button>
                  
                  <Button 
                    onClick={() => navigate('/checkout')}
                    variant="outline"
                    className="w-full text-sm lg:text-base touch-manipulation min-h-[44px]"
                    disabled={selectedSpices.size === 0}
                  >
                    Buy Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;