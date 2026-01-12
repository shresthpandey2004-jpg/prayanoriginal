// SIMPLE RECIPE DATA - GUARANTEED TO WORK
export interface SimpleRecipe {
  id: string;
  name: string;
  nameHindi: string;
  description: string;
  image: string;
  cookingTime: string;
  servings: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  spicesNeeded: string[];
  instructions: string[];
  tips: string[];
}

export const simpleRecipes: SimpleRecipe[] = [
  {
    id: "butter-chicken",
    name: "Butter Chicken",
    nameHindi: "बटर चिकन",
    description: "Creamy, rich and delicious butter chicken made with tender chicken pieces",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500",
    cookingTime: "45 mins",
    servings: "4 people",
    difficulty: "Medium",
    category: "Non-Vegetarian",
    spicesNeeded: ["Garam Masala", "Red Chili Powder", "Turmeric Powder", "Coriander Powder"],
    instructions: [
      "Marinate chicken with yogurt and spices for 30 minutes",
      "Cook chicken in a pan until golden",
      "Make tomato gravy with onions and spices",
      "Add cooked chicken to the gravy",
      "Add cream and butter, simmer for 10 minutes",
      "Garnish with coriander and serve hot"
    ],
    tips: [
      "Use fresh cream for best taste",
      "Don't overcook the chicken",
      "Adjust spice levels as needed"
    ]
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
    spicesNeeded: ["Turmeric Powder", "Red Chili Powder", "Cumin Seeds"],
    instructions: [
      "Wash and cook dal with turmeric and salt",
      "Heat ghee in a pan for tadka",
      "Add cumin seeds and let them splutter",
      "Add chopped onions and tomatoes",
      "Pour tadka over cooked dal",
      "Simmer for 5 minutes and serve"
    ],
    tips: [
      "Don't overcook the dal",
      "Make tadka on high heat",
      "Add fresh coriander before serving"
    ]
  },
  {
    id: "biryani",
    name: "Chicken Biryani",
    nameHindi: "चिकन बिरयानी",
    description: "Aromatic basmati rice layered with spiced chicken",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=500",
    cookingTime: "90 mins",
    servings: "6 people",
    difficulty: "Hard",
    category: "Non-Vegetarian",
    spicesNeeded: ["Biryani Masala", "Garam Masala", "Red Chili Powder", "Turmeric Powder"],
    instructions: [
      "Soak basmati rice for 30 minutes",
      "Marinate chicken with yogurt and spices",
      "Cook rice with whole spices until 70% done",
      "Cook marinated chicken separately",
      "Layer rice and chicken alternately",
      "Cook on dum for 45 minutes"
    ],
    tips: [
      "Use aged basmati rice",
      "Don't skip the dum cooking",
      "Soak saffron in warm milk"
    ]
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
    spicesNeeded: ["Garam Masala", "Red Chili Powder", "Turmeric Powder"],
    instructions: [
      "Cut paneer into cubes and lightly fry",
      "Make smooth tomato puree",
      "Heat butter and add tomato puree",
      "Add spices and cook until thick",
      "Add cream and paneer cubes",
      "Simmer for 5 minutes and serve"
    ],
    tips: [
      "Don't overcook paneer",
      "Use fresh cream",
      "Add sugar to balance acidity"
    ]
  }
];

// Simple helper function
export const getSimpleRecipeById = (id: string): SimpleRecipe | undefined => {
  return simpleRecipes.find(recipe => recipe.id === id);
};