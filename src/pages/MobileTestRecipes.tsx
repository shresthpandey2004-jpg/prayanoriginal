import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/layout/Header';

const MobileTestRecipes = () => {
  const navigate = useNavigate();
  const [clickLog, setClickLog] = useState<string[]>([]);

  const addLog = (message: string) => {
    setClickLog(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testRecipes = [
    { id: 'dal-tadka', name: 'Dal Tadka', nameHindi: 'दाल तड़का' },
    { id: 'chicken-curry', name: 'Chicken Curry', nameHindi: 'चिकन करी' },
    { id: 'aloo-gobi', name: 'Aloo Gobi', nameHindi: 'आलू गोभी' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header />
      
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 pb-20 md:pb-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            🧪 Mobile Recipe Click Test
          </h1>
          <p className="text-sm text-gray-600 mb-4">
            Test page to debug mobile recipe clicks
          </p>
        </div>

        {/* Click Log */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold mb-2">Click Log:</h3>
          <div className="text-sm space-y-1">
            {clickLog.length === 0 ? (
              <p className="text-gray-500">No clicks yet...</p>
            ) : (
              clickLog.map((log, index) => (
                <div key={index} className="text-green-600">{log}</div>
              ))
            )}
          </div>
        </div>

        {/* Test Recipe Links */}
        <div className="mb-6 space-y-3">
          <h3 className="font-semibold mb-2">Direct Recipe Links (for testing):</h3>
          <div className="space-y-2">
            <Button 
              className="w-full h-12 bg-purple-600 hover:bg-purple-700"
              onClick={() => {
                addLog('Navigating to dal-tadka recipe');
                navigate('/recipe/dal-tadka');
              }}
            >
              Test Dal Tadka Recipe
            </Button>
            
            <Button 
              className="w-full h-12 bg-purple-600 hover:bg-purple-700"
              onClick={() => {
                addLog('Navigating to chicken-curry recipe');
                navigate('/recipe/chicken-curry');
              }}
            >
              Test Chicken Curry Recipe
            </Button>
            
            <Button 
              className="w-full h-12 bg-purple-600 hover:bg-purple-700"
              onClick={() => {
                addLog('Navigating to aloo-gobi recipe');
                navigate('/recipe/aloo-gobi');
              }}
            >
              Test Aloo Gobi Recipe
            </Button>
          </div>
        </div>
        <div className="mb-6 space-y-3">
          <Button 
            className="w-full h-12 bg-blue-600 hover:bg-blue-700"
            onClick={() => addLog('Direct button clicked')}
          >
            Test Direct Button Click
          </Button>
          
          <Button 
            className="w-full h-12 bg-green-600 hover:bg-green-700"
            onClick={() => {
              addLog('Navigation button clicked');
              navigate('/recipes');
            }}
          >
            Go to Real Recipes Page
          </Button>
        </div>

        {/* Test Recipe Cards */}
        <div className="grid grid-cols-1 gap-4">
          {testRecipes.map(recipe => (
            <Card 
              key={recipe.id} 
              className="cursor-pointer recipe-card border-2 border-orange-200"
              onClick={(e) => {
                addLog(`Card clicked: ${recipe.name}`);
                console.log('🔥 Test card clicked:', recipe.id, e);
                navigate(`/recipe/${recipe.id}`);
              }}
              onTouchStart={() => addLog(`Touch start: ${recipe.name}`)}
              onTouchEnd={() => addLog(`Touch end: ${recipe.name}`)}
              style={{
                cursor: 'pointer',
                pointerEvents: 'auto',
                touchAction: 'manipulation'
              }}
            >
              <CardHeader className="pb-2 p-4">
                <CardTitle className="text-lg font-bold text-gray-800">
                  {recipe.name}
                </CardTitle>
                <p className="text-sm text-orange-600 font-medium">
                  {recipe.nameHindi}
                </p>
              </CardHeader>
              
              <CardContent className="p-4 pt-0">
                <p className="text-gray-600 text-sm mb-4">
                  Test recipe for mobile click debugging
                </p>
                
                <Button 
                  className="w-full bg-orange-600 hover:bg-orange-700 h-12 text-base font-semibold"
                  onClick={(e) => {
                    e.stopPropagation();
                    addLog(`Button clicked: ${recipe.name}`);
                    navigate(`/recipe/${recipe.id}`);
                  }}
                  style={{
                    cursor: 'pointer',
                    pointerEvents: 'auto',
                    touchAction: 'manipulation',
                    minHeight: '48px'
                  }}
                >
                  View Recipe (Button)
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Device Info */}
        <div className="mt-6 p-4 bg-white rounded-lg shadow text-sm">
          <h3 className="font-semibold mb-2">Device Info:</h3>
          <div className="space-y-1 text-gray-600">
            <div>User Agent: {navigator.userAgent.slice(0, 100)}...</div>
            <div>Touch Support: {('ontouchstart' in window) ? 'Yes' : 'No'}</div>
            <div>Screen: {window.screen.width}x{window.screen.height}</div>
            <div>Viewport: {window.innerWidth}x{window.innerHeight}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileTestRecipes;