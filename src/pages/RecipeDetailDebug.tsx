import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import { getRecipeBySlug, recipes } from '@/data/recipes';

const RecipeDetailDebug = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  console.log('🔍 DEBUG - Recipe ID:', id);
  console.log('🔍 DEBUG - All recipes:', recipes.length);
  console.log('🔍 DEBUG - Recipe IDs:', recipes.map(r => r.id));
  
  const recipe = id ? recipes.find(r => r.id === id) : null;
  
  console.log('🔍 DEBUG - Found recipe:', recipe);

  return (
    <div className="min-h-screen bg-white p-4">
      <Header />
      
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/recipes')}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Recipes
        </Button>

        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h2 className="text-lg font-bold mb-2">🐛 DEBUG INFO</h2>
          <p><strong>Recipe ID from URL:</strong> {id || 'No ID'}</p>
          <p><strong>Total recipes available:</strong> {recipes.length}</p>
          <p><strong>Available recipe IDs:</strong> {recipes.map(r => r.id).join(', ')}</p>
          <p><strong>Recipe found:</strong> {recipe ? 'YES' : 'NO'}</p>
        </div>

        {!id && (
          <div className="bg-red-100 p-4 rounded-lg">
            <h3 className="text-red-800 font-bold">❌ No Recipe ID</h3>
            <p className="text-red-700">URL doesn't contain recipe ID parameter</p>
          </div>
        )}

        {id && !recipe && (
          <div className="bg-red-100 p-4 rounded-lg">
            <h3 className="text-red-800 font-bold">❌ Recipe Not Found</h3>
            <p className="text-red-700">Recipe with ID "{id}" doesn't exist</p>
            <p className="text-red-700 mt-2">Available IDs: {recipes.map(r => r.id).join(', ')}</p>
          </div>
        )}

        {recipe && (
          <div className="bg-green-100 p-4 rounded-lg">
            <h3 className="text-green-800 font-bold">✅ Recipe Found!</h3>
            <div className="mt-4 bg-white p-4 rounded border">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{recipe.title}</h1>
              <p className="text-orange-600 font-medium mb-2">{recipe.titleHindi}</p>
              <p className="text-gray-600 mb-4">{recipe.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Recipe Details:</h4>
                  <ul className="text-sm space-y-1">
                    <li><strong>Total Time:</strong> {recipe.totalTime}</li>
                    <li><strong>Servings:</strong> {recipe.servings}</li>
                    <li><strong>Difficulty:</strong> {recipe.difficulty}</li>
                    <li><strong>Category:</strong> {recipe.category}</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Ingredients ({recipe.ingredients.length}):</h4>
                  <ul className="text-sm space-y-1">
                    {recipe.ingredients.map((ing, idx) => (
                      <li key={idx}>{ing.name} - {ing.amount}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Instructions ({recipe.instructions.length}):</h4>
                <ol className="text-sm space-y-1 list-decimal list-inside">
                  {recipe.instructions.map((inst, idx) => (
                    <li key={idx}>{inst.instruction}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 bg-blue-100 p-4 rounded-lg">
          <h3 className="text-blue-800 font-bold">🔧 Quick Actions</h3>
          <div className="flex gap-2 mt-2">
            <Button onClick={() => navigate('/recipes')} size="sm">
              Go to Recipes List
            </Button>
            <Button onClick={() => navigate('/recipes/dal-tadka')} size="sm" variant="outline">
              Test Dal Tadka Recipe
            </Button>
            <Button onClick={() => window.location.reload()} size="sm" variant="outline">
              Reload Page
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailDebug;