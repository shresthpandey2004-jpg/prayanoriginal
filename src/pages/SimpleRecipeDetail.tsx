import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Users, ChefHat, ShoppingCart, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/layout/Header';
import CartDrawer from '@/components/cart/CartDrawer';
import { getSimpleRecipeById } from '@/data/simpleRecipes';
import { products } from '@/data/products';

const SimpleRecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
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
    // Simple alert for now - will add proper cart functionality later
    const spiceNames = Array.from(selectedSpices).map(spiceId => {
      const product = products.find(p => p.id === spiceId);
      return product ? `${product.name} (${quantities[spiceId] || 1})` : '';
    }).filter(Boolean);
    
    alert(`Added to cart:\n${spiceNames.join('\n')}\n\nTotal: ${selectedSpices.size} spices`);
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header />
      <CartDrawer />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/simple-recipes')}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Recipes
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recipe Content */}
          <div className="lg:col-span-2">
            <Card>
              <div className="relative">
                <img 
                  src={recipe.image} 
                  alt={recipe.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 right-4">
                  <Badge className={getDifficultyColor(recipe.difficulty)}>
                    {recipe.difficulty}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-gray-800">
                  {recipe.name}
                </CardTitle>
                <p className="text-lg text-orange-600 font-medium">
                  {recipe.nameHindi}
                </p>
                <p className="text-gray-600 mt-2">
                  {recipe.description}
                </p>
                
                <div className="flex items-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">{recipe.cookingTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">{recipe.servings}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChefHat className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">{recipe.category}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
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
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4">Chef's Tips</h3>
                  <ul className="space-y-2">
                    {recipe.tips.map((tip, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="text-orange-600">💡</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Spices Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Required Spices
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
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
                          <div className="flex-1">
                            <span className="font-medium text-gray-800">{spice}</span>
                            {product && (
                              <div className="text-sm font-medium text-orange-600">
                                ₹{product.price} per pack
                              </div>
                            )}
                          </div>
                          
                          {isSelected && spiceId && (
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateQuantity(spiceId, -1);
                                }}
                                disabled={quantities[spiceId] <= 1}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center font-medium">
                                {quantities[spiceId] || 1}
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
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
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Selected Spices:</span>
                    <span className="font-bold">{selectedSpices.size}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Price:</span>
                    <span className="font-bold text-lg text-orange-600">
                      ₹{getTotalPrice()}
                    </span>
                  </div>
                  
                  <Button 
                    onClick={addSelectedSpicesToCart}
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    disabled={selectedSpices.size === 0}
                  >
                    Add {selectedSpices.size} Spices to Cart
                  </Button>
                  
                  <Button 
                    onClick={() => navigate('/shop')}
                    variant="outline"
                    className="w-full"
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