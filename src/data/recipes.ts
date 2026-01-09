export interface RecipeIngredient {
  id: string;
  name: string;
  quantity: string;
  optional?: boolean;
}

export interface Recipe {
  id: string;
  name: string;
  nameHindi: string;
  description: string;
  image: string;
  cookingTime: string;
  servings: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  ingredients: RecipeIngredient[];
  instructions: string[];
  tips: string[];
  nutritionInfo?: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
}

export const recipes: Recipe[] = [
  {
    id: "butter-chicken",
    name: "Butter Chicken",
    nameHindi: "बटर चिकन",
    description: "Creamy, rich and delicious butter chicken made with tender chicken pieces in a tomato-based curry",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500",
    cookingTime: "45 mins",
    servings: "4 people",
    difficulty: "Medium",
    category: "Non-Vegetarian",
    ingredients: [
      { id: "garam-masala", name: "Garam Masala", quantity: "2 tsp" },
      { id: "red-chili-powder", name: "Red Chili Powder", quantity: "1 tsp" },
      { id: "turmeric-powder", name: "Turmeric Powder", quantity: "1/2 tsp" },
      { id: "coriander-powder", name: "Coriander Powder", quantity: "1 tsp" },
      { id: "cumin-powder", name: "Cumin Powder", quantity: "1/2 tsp" },
      { id: "kashmiri-red-chili", name: "Kashmiri Red Chili Powder", quantity: "1 tsp" },
      { id: "black-pepper", name: "Black Pepper Powder", quantity: "1/4 tsp", optional: true }
    ],
    instructions: [
      "Marinate chicken with yogurt, ginger-garlic paste, and spices for 30 minutes",
      "Cook marinated chicken in a pan until 80% done",
      "In another pan, make tomato puree with onions and spices",
      "Add cooked chicken to the tomato gravy",
      "Add cream and butter, simmer for 10 minutes",
      "Garnish with fresh coriander and serve hot"
    ],
    tips: [
      "Use fresh cream for best taste",
      "Don't overcook the chicken",
      "Adjust spice levels according to preference"
    ],
    nutritionInfo: {
      calories: "420 kcal",
      protein: "35g",
      carbs: "12g",
      fat: "28g"
    }
  },
  {
    id: "biryani",
    name: "Chicken Biryani",
    nameHindi: "चिकन बिरयानी",
    description: "Aromatic basmati rice layered with spiced chicken and cooked to perfection",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=500",
    cookingTime: "90 mins",
    servings: "6 people",
    difficulty: "Hard",
    category: "Non-Vegetarian",
    ingredients: [
      { id: "biryani-masala", name: "Biryani Masala", quantity: "3 tsp" },
      { id: "garam-masala", name: "Garam Masala", quantity: "2 tsp" },
      { id: "red-chili-powder", name: "Red Chili Powder", quantity: "2 tsp" },
      { id: "turmeric-powder", name: "Turmeric Powder", quantity: "1 tsp" },
      { id: "coriander-powder", name: "Coriander Powder", quantity: "2 tsp" },
      { id: "cumin-powder", name: "Cumin Powder", quantity: "1 tsp" },
      { id: "bay-leaves", name: "Bay Leaves", quantity: "4-5 pieces" },
      { id: "green-cardamom", name: "Green Cardamom", quantity: "6-8 pieces" },
      { id: "black-cardamom", name: "Black Cardamom", quantity: "2 pieces" },
      { id: "cinnamon-stick", name: "Cinnamon Stick", quantity: "2 pieces" },
      { id: "cloves", name: "Cloves", quantity: "6-8 pieces" },
      { id: "star-anise", name: "Star Anise", quantity: "2 pieces", optional: true }
    ],
    instructions: [
      "Soak basmati rice for 30 minutes",
      "Marinate chicken with yogurt, spices, and herbs",
      "Cook rice with whole spices until 70% done",
      "Cook marinated chicken separately",
      "Layer rice and chicken alternately",
      "Cook on dum (slow cooking) for 45 minutes",
      "Serve hot with raita and shorba"
    ],
    tips: [
      "Use aged basmati rice for best results",
      "Don't skip the dum cooking process",
      "Soak saffron in warm milk before adding"
    ],
    nutritionInfo: {
      calories: "520 kcal",
      protein: "28g",
      carbs: "65g",
      fat: "18g"
    }
  },
  {
    id: "dal-tadka",
    name: "Dal Tadka",
    nameHindi: "दाल तड़का",
    description: "Comfort food at its best - yellow lentils tempered with aromatic spices",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500",
    cookingTime: "30 mins",
    servings: "4 people",
    difficulty: "Easy",
    category: "Vegetarian",
    ingredients: [
      { id: "turmeric-powder", name: "Turmeric Powder", quantity: "1/2 tsp" },
      { id: "red-chili-powder", name: "Red Chili Powder", quantity: "1 tsp" },
      { id: "cumin-seeds", name: "Cumin Seeds", quantity: "1 tsp" },
      { id: "mustard-seeds", name: "Mustard Seeds", quantity: "1/2 tsp" },
      { id: "hing-asafoetida", name: "Hing (Asafoetida)", quantity: "pinch" },
      { id: "coriander-powder", name: "Coriander Powder", quantity: "1 tsp" },
      { id: "garam-masala", name: "Garam Masala", quantity: "1/2 tsp" }
    ],
    instructions: [
      "Wash and cook dal with turmeric and salt",
      "Heat ghee in a pan for tadka",
      "Add cumin seeds, mustard seeds, and hing",
      "Add chopped onions, tomatoes, and spices",
      "Pour the tadka over cooked dal",
      "Simmer for 5 minutes and serve hot"
    ],
    tips: [
      "Don't overcook the dal",
      "Make tadka on high heat for best aroma",
      "Add fresh coriander before serving"
    ],
    nutritionInfo: {
      calories: "180 kcal",
      protein: "12g",
      carbs: "28g",
      fat: "4g"
    }
  },
  {
    id: "rajma-masala",
    name: "Rajma Masala",
    nameHindi: "राजमा मसाला",
    description: "Kidney beans cooked in a rich, spicy tomato-onion gravy - perfect with rice",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500",
    cookingTime: "60 mins",
    servings: "4 people",
    difficulty: "Medium",
    category: "Vegetarian",
    ingredients: [
      { id: "garam-masala", name: "Garam Masala", quantity: "2 tsp" },
      { id: "red-chili-powder", name: "Red Chili Powder", quantity: "2 tsp" },
      { id: "turmeric-powder", name: "Turmeric Powder", quantity: "1/2 tsp" },
      { id: "coriander-powder", name: "Coriander Powder", quantity: "2 tsp" },
      { id: "cumin-powder", name: "Cumin Powder", quantity: "1 tsp" },
      { id: "cumin-seeds", name: "Cumin Seeds", quantity: "1 tsp" },
      { id: "bay-leaves", name: "Bay Leaves", quantity: "2 pieces" },
      { id: "kashmiri-red-chili", name: "Kashmiri Red Chili Powder", quantity: "1 tsp" }
    ],
    instructions: [
      "Soak rajma overnight and pressure cook until soft",
      "Make a paste of onions, tomatoes, and ginger-garlic",
      "Heat oil and add cumin seeds and bay leaves",
      "Add the paste and cook until oil separates",
      "Add all spices and cook for 2 minutes",
      "Add cooked rajma with its water",
      "Simmer for 20 minutes until thick",
      "Garnish with cream and coriander"
    ],
    tips: [
      "Soak rajma for at least 8 hours",
      "Don't throw away the rajma cooking water",
      "Mash some beans for thicker gravy"
    ],
    nutritionInfo: {
      calories: "280 kcal",
      protein: "15g",
      carbs: "45g",
      fat: "6g"
    }
  },
  {
    id: "chole-bhature",
    name: "Chole Bhature",
    nameHindi: "छोले भटूरे",
    description: "Spicy chickpea curry served with fluffy deep-fried bread",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=500",
    cookingTime: "75 mins",
    servings: "4 people",
    difficulty: "Medium",
    category: "Vegetarian",
    ingredients: [
      { id: "chole-masala", name: "Chole Masala", quantity: "3 tsp" },
      { id: "garam-masala", name: "Garam Masala", quantity: "1 tsp" },
      { id: "red-chili-powder", name: "Red Chili Powder", quantity: "2 tsp" },
      { id: "turmeric-powder", name: "Turmeric Powder", quantity: "1/2 tsp" },
      { id: "coriander-powder", name: "Coriander Powder", quantity: "2 tsp" },
      { id: "cumin-powder", name: "Cumin Powder", quantity: "1 tsp" },
      { id: "amchur-powder", name: "Amchur (Dry Mango) Powder", quantity: "1 tsp" },
      { id: "black-tea", name: "Black Tea (for color)", quantity: "1 tea bag", optional: true }
    ],
    instructions: [
      "Soak chickpeas overnight and pressure cook with tea bag",
      "Heat oil and add cumin seeds",
      "Add onion-tomato paste and cook well",
      "Add all spices and cook until fragrant",
      "Add cooked chickpeas with water",
      "Simmer for 30 minutes until thick",
      "Serve hot with bhature and pickles"
    ],
    tips: [
      "Tea bag gives authentic dark color",
      "Mash some chickpeas for thick gravy",
      "Serve immediately for best taste"
    ],
    nutritionInfo: {
      calories: "320 kcal",
      protein: "14g",
      carbs: "52g",
      fat: "8g"
    }
  },
  {
    id: "paneer-butter-masala",
    name: "Paneer Butter Masala",
    nameHindi: "पनीर बटर मसाला",
    description: "Soft paneer cubes in a rich, creamy tomato-based gravy",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500",
    cookingTime: "35 mins",
    servings: "4 people",
    difficulty: "Easy",
    category: "Vegetarian",
    ingredients: [
      { id: "garam-masala", name: "Garam Masala", quantity: "1 tsp" },
      { id: "red-chili-powder", name: "Red Chili Powder", quantity: "1 tsp" },
      { id: "turmeric-powder", name: "Turmeric Powder", quantity: "1/4 tsp" },
      { id: "coriander-powder", name: "Coriander Powder", quantity: "1 tsp" },
      { id: "kashmiri-red-chili", name: "Kashmiri Red Chili Powder", quantity: "1 tsp" },
      { id: "kasoori-methi", name: "Kasoori Methi", quantity: "1 tsp" }
    ],
    instructions: [
      "Cut paneer into cubes and lightly fry",
      "Make smooth tomato puree",
      "Heat butter and add tomato puree",
      "Add all spices and cook until thick",
      "Add cream and paneer cubes",
      "Simmer for 5 minutes",
      "Garnish with kasoori methi and serve"
    ],
    tips: [
      "Don't overcook paneer",
      "Use fresh cream for richness",
      "Crush kasoori methi before adding"
    ],
    nutritionInfo: {
      calories: "380 kcal",
      protein: "18g",
      carbs: "15g",
      fat: "28g"
    }
  }
];

// Helper function to get recipe by ID
export const getRecipeById = (id: string): Recipe | undefined => {
  return recipes.find(recipe => recipe.id === id);
};

// Helper function to get recipes by category
export const getRecipesByCategory = (category: string): Recipe[] => {
  return recipes.filter(recipe => recipe.category === category);
};

// Helper function to get all recipe categories
export const getRecipeCategories = (): string[] => {
  return [...new Set(recipes.map(recipe => recipe.category))];
};