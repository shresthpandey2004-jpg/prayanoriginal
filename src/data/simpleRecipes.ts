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
    description: "Royal Hyderabadi-style aromatic basmati rice layered with tender spiced chicken, cooked to perfection with saffron and dum technique",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=500",
    cookingTime: "90 mins",
    servings: "6 people",
    difficulty: "Hard",
    category: "Non-Vegetarian",
    spicesNeeded: ["Biryani Masala", "Garam Masala", "Red Chili Powder", "Turmeric Powder", "Bay Leaves", "Green Cardamom", "Cinnamon"],
    instructions: [
      "Soak 500g aged basmati rice in water for 30 minutes, then drain",
      "Marinate 1kg chicken pieces with 1 cup yogurt, 1 tsp red chili powder, 1/2 tsp turmeric, 1 tsp garam masala, and salt for 2 hours",
      "Heat ghee in heavy-bottomed pot, fry sliced onions until golden brown and crispy, remove and set aside",
      "In same ghee, cook marinated chicken on medium heat for 15-20 minutes until 80% done",
      "Boil water with whole spices (bay leaves, cardamom, cinnamon, cloves), add soaked rice and cook until 70% done",
      "Layer the partially cooked rice over chicken, sprinkle fried onions, mint leaves, and saffron soaked in warm milk",
      "Cover with aluminum foil, then place tight-fitting lid. Cook on high heat for 3-4 minutes, then reduce to lowest heat",
      "Place the pot on a tawa/griddle and cook on dum for 45 minutes",
      "Turn off heat and let it rest for 10 minutes before opening",
      "Gently mix and serve hot with raita, boiled eggs, and shorba"
    ],
    tips: [
      "Use aged basmati rice (at least 1 year old) for best results",
      "Never skip the dum cooking process - it's the secret to perfect biryani",
      "Soak saffron in warm milk for rich color and aroma",
      "Fry onions until deep golden for authentic taste",
      "Use a heavy-bottomed pot to prevent burning",
      "Don't open the lid during dum cooking",
      "Let biryani rest for 10 minutes after cooking for flavors to settle"
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