import React from 'react';
import { recipes, getRecipeById } from '@/data/recipes';

const RecipeDebug = () => {
  console.log('All recipes:', recipes);
  console.log('Butter chicken recipe:', getRecipeById('butter-chicken'));
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Recipe Debug</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Total Recipes: {recipes.length}</h2>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Recipe IDs:</h2>
          <ul className="list-disc pl-6">
            {recipes.map(recipe => (
              <li key={recipe.id}>
                {recipe.id} - {recipe.name}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Test getRecipeById:</h2>
          <p>butter-chicken: {getRecipeById('butter-chicken')?.name || 'NOT FOUND'}</p>
          <p>biryani: {getRecipeById('biryani')?.name || 'NOT FOUND'}</p>
          <p>dal-tadka: {getRecipeById('dal-tadka')?.name || 'NOT FOUND'}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDebug;