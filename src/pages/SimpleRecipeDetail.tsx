import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { ArrowLeft, Clock, Users, ChefHat, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/layout/Header';
import CartDrawer from '@/components/cart/CartDrawer';
import { getSimpleRecipeById } from '@/data/simpleRecipes';
import { products } from '@/data/products';
import { toast } from '@/hooks/use-toast';

const SimpleRecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();
  
  const [selectedSpices, setSelectedSpices] = useState<Set<string>>(new Set());
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  
  const recipe = id ? getSimpleRecipeById(id) : null;

  useEffect(() => {
    if (recipe) {
      // Pre-select all spices and set default quantities
      const spiceIds = recipe.spicesNeeded.map(spiceName => {
        const spiceMap: Record<string, string> = {
          'Prayan Haldi Powder': 'haldi',
          'Prayan Dhaniya Powder': 'dhaniya', 
          'Prayan Red Chilli Powder': 'chilli',
          'Prayan Garam Masala': 'garam-masala'
        };
        return spiceMap[spiceName];
      }).filter(Boolean);
      
      setSelectedSpices(new Set(spiceIds));
      
      const defaultQuantities: Record<string, number> = {};
      spiceIds.forEach(spiceId => {
        defaultQuantities[spiceId] = 1;
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
    if (selectedSpices.size === 0) {
      toast({
        title: "No spices selected",
        description: "Please select at least one spice to add to cart.",
        variant: "destructive"
      });
      return;
    }

    let addedCount = 0;
    let totalPrice = 0;

    selectedSpices.forEach(spiceId => {
      const product = products.find(p => p.id === spiceId);
      
      if (product) {
        const quantity = quantities[spiceId] || 1;
        
        // Add each item the specified number of times
        for (let i = 0; i < quantity; i++) {
          addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            weight: product.weight
          });
        }
        
        addedCount++;
        totalPrice += product.price * quantity;
      }
    });

    if (addedCount > 0) {
      toast({
        title: "Added to Cart! 🛒",
        description: `${addedCount} spices added for ₹${totalPrice}`,
      });
      
      // Open cart drawer
      setIsCartOpen(true);
      
      // Reset selections
      setSelectedSpices(new Set());
      setQuantities({});
    }
  };

  const getSpiceProduct = (spiceName: string) => {
    const spiceMap: Record<string, string> = {
      'Prayan Haldi Powder': 'haldi',
      'Prayan Dhaniya Powder': 'dhaniya', 
      'Prayan Red Chilli Powder': 'chilli',
      'Prayan Garam Masala': 'garam-masala'
    };
    const spiceId = spiceMap[spiceName];
    return products.find(p => p.id === spiceId);
  };

  const getTotalPrice = () => {
    let total = 0;
    selectedSpices.forEach(spiceId => {
      const product = products.find(p => p.id === spiceId);
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

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recipe not found</h2>
          <Button onClick={() => navigate('/simple-recipes')}>
            Back to Recipes
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 pb-20 lg:pb-0">
      <Header />
      <CartDrawer />
      
      <div className="container mx-auto px-4 py-4 lg:py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/simple-recipes')}
          className="mb-4 lg:mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Recipes
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
          {/* Recipe Content */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <Card className="mb-4 lg:mb-0">
              <div className="relative">
                <img 
                  src={recipe.image} 
                  alt={recipe.name}
                  className="w-full h-48 lg:h-64 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 right-4">
                  <Badge className={getDifficultyColor(recipe.difficulty)}>
                    {recipe.difficulty}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="p-4 lg:p-6">
                <CardTitle className="text-xl lg:text-3xl font-bold text-gray-800">
                  {recipe.name}
                </CardTitle>
                <p className="text-base lg:text-lg text-orange-600 font-medium">
                  {recipe.nameHindi}
                </p>
                <p className="text-gray-600 mt-2 text-sm lg:text-base">
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
                        <span className="text-gray-700 text-sm lg:text-base">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Tips */}
                <div className="mb-6">
                  <h3 className="text-lg lg:text-xl font-semibold mb-4">Chef's Tips</h3>
                  <ul className="space-y-2">
                    {recipe.tips.map((tip, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="text-orange-600">💡</span>
                        <span className="text-gray-700 text-sm lg:text-base">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Spices Sidebar */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <Card className="lg:sticky lg:top-4">
              <CardHeader className="p-4 lg:p-6">
                <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
                  <ShoppingCart className="w-4 h-4 lg:w-5 lg:h-5" />
                  Required Spices
                </CardTitle>
              </CardHeader>
              
              <CardContent className="p-4 lg:p-6">
                <p className="text-xs lg:text-sm text-gray-600 mb-4">
                  Select spices for this recipe and add to cart
                </p>
                
                <div className="space-y-3 mb-6">
                  {recipe.spicesNeeded.map((spice, index) => {
                    const product = getSpiceProduct(spice);
                    const spiceMap: Record<string, string> = {
                      'Prayan Haldi Powder': 'haldi',
                      'Prayan Dhaniya Powder': 'dhaniya', 
                      'Prayan Red Chilli Powder': 'chilli',
                      'Prayan Garam Masala': 'garam-masala'
                    };
                    const spiceId = spiceMap[spice];
                    const isSelected = selectedSpices.has(spiceId);
                    
                    return (
                      <div 
                        key={index}
                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                          isSelected 
                            ? 'border-orange-500 bg-orange-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => spiceId && toggleSpice(spiceId)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <span className="font-medium text-gray-800 text-sm lg:text-base block">{spice}</span>
                            {product && (
                              <div className="text-xs lg:text-sm font-medium text-orange-600">
                                ₹{product.price} per pack
                              </div>
                            )}
                          </div>
                          
                          {isSelected && spiceId && (
                            <div className="flex items-center gap-1 lg:gap-2 flex-shrink-0">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateQuantity(spiceId, -1);
                                }}
                                disabled={quantities[spiceId] <= 1}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-6 lg:w-8 text-center font-medium text-sm">
                                {quantities[spiceId] || 1}
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateQuantity(spiceId, 1);
                                }}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          )}
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
                    className="w-full bg-orange-600 hover:bg-orange-700 text-sm lg:text-base"
                    disabled={selectedSpices.size === 0}
                  >
                    Add {selectedSpices.size} Spices to Cart
                  </Button>
                  
                  <Button 
                    onClick={() => navigate('/shop')}
                    variant="outline"
                    className="w-full text-sm lg:text-base"
                  >
                    Browse All Spices
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

export default SimpleRecipeDetail;