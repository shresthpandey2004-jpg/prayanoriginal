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
    id: "dal-tadka",
    name: "Dal Tadka",
    nameHindi: "दाल तड़का",
    description: "Classic comfort dal with aromatic tempering using our pure Prayan spices",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500",
    cookingTime: "30 mins",
    servings: "4 people",
    difficulty: "Easy",
    category: "Vegetarian",
    spicesNeeded: ["Prayan Haldi Powder", "Prayan Dhaniya Powder", "Prayan Red Chilli Powder"],
    instructions: [
      "Wash and cook dal with haldi and salt in pressure cooker for 3-4 whistles",
      "Heat ghee in pan, add cumin seeds",
      "Add green chillies and onions, sauté till golden",
      "Add tomatoes, cook till soft",
      "Add dhaniya powder and red chilli powder, cook for 1 minute",
      "Add cooked dal, mix well and simmer for 5 minutes",
      "Garnish with fresh coriander and serve hot with rice"
    ],
    tips: [
      "Use Prayan Haldi for beautiful golden color",
      "Prayan Dhaniya powder gives authentic aroma",
      "Adjust Prayan Red Chilli as per taste"
    ]
  },
  {
    id: "chicken-curry",
    name: "Chicken Curry",
    nameHindi: "चिकन करी",
    description: "Rich and flavorful chicken curry using all four Prayan masalas",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500",
    cookingTime: "45 mins",
    servings: "4 people",
    difficulty: "Medium",
    category: "Non-Vegetarian",
    spicesNeeded: ["Prayan Haldi Powder", "Prayan Dhaniya Powder", "Prayan Red Chilli Powder", "Prayan Garam Masala"],
    instructions: [
      "Marinate chicken with haldi, salt and half red chilli powder for 20 minutes",
      "Heat oil, fry chicken pieces till golden, remove and keep aside",
      "In same oil, add onions and fry till golden brown",
      "Add ginger-garlic paste, cook for 2 minutes",
      "Add tomatoes, cook till soft and mushy",
      "Add dhaniya powder, remaining red chilli powder, cook for 2 minutes",
      "Add fried chicken, mix well",
      "Add 1 cup water, cover and cook for 15 minutes",
      "Sprinkle garam masala, cook for 2 more minutes",
      "Garnish with coriander and serve with rice or roti"
    ],
    tips: [
      "Prayan Haldi gives beautiful color to chicken",
      "Use Prayan Garam Masala at the end for best aroma",
      "Prayan Dhaniya powder is the secret for authentic taste"
    ]
  },
  {
    id: "chicken-biryani",
    name: "Chicken Biryani",
    nameHindi: "चिकन बिरयानी",
    description: "Royal aromatic basmati rice layered with spiced chicken using Prayan masalas",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=500",
    cookingTime: "90 mins",
    servings: "6 people",
    difficulty: "Hard",
    category: "Non-Vegetarian",
    spicesNeeded: ["Prayan Haldi Powder", "Prayan Red Chilli Powder", "Prayan Garam Masala"],
    instructions: [
      "Marinate chicken with yogurt, haldi, red chilli powder, 1 tsp garam masala, ginger-garlic paste and salt for 1 hour",
      "Soak basmati rice for 30 minutes",
      "Cook rice with whole spices and salt till 70% done, drain",
      "In heavy-bottomed pot, cook marinated chicken till tender",
      "Layer the cooked rice over chicken",
      "Sprinkle fried onions, remaining garam masala, mint, coriander",
      "Pour saffron milk and dots of ghee",
      "Cover with aluminum foil, then lid",
      "Cook on high heat for 3 minutes, then low heat for 45 minutes",
      "Let it rest for 10 minutes before opening",
      "Gently mix and serve hot"
    ],
    tips: [
      "Prayan Haldi gives beautiful color to chicken",
      "Prayan Garam Masala is essential for authentic biryani aroma",
      "Use dum cooking method for best results"
    ]
  },
  {
    id: "aloo-gobi",
    name: "Aloo Gobi",
    nameHindi: "आलू गोभी",
    description: "Classic dry vegetable dish with potatoes and cauliflower using Prayan spices",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500",
    cookingTime: "25 mins",
    servings: "4 people",
    difficulty: "Easy",
    category: "Vegetarian",
    spicesNeeded: ["Prayan Haldi Powder", "Prayan Dhaniya Powder", "Prayan Red Chilli Powder"],
    instructions: [
      "Heat oil in pan, add cumin seeds",
      "Add ginger and green chillies, sauté for 1 minute",
      "Add potatoes, cook for 5 minutes",
      "Add cauliflower florets",
      "Add haldi, dhaniya powder, red chilli powder and salt",
      "Mix well, cover and cook on low heat for 15 minutes",
      "Stir occasionally to prevent sticking",
      "Cook till vegetables are tender",
      "Garnish with fresh coriander and serve hot"
    ],
    tips: [
      "Prayan Haldi prevents vegetables from sticking",
      "Prayan Dhaniya powder enhances the natural flavors",
      "Cook on low heat for best results"
    ]
  },
  {
    id: "paneer-masala",
    name: "Paneer Masala",
    nameHindi: "पनीर मसाला",
    description: "Rich and creamy paneer curry with all Prayan spices",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500",
    cookingTime: "30 mins",
    servings: "4 people",
    difficulty: "Medium",
    category: "Vegetarian",
    spicesNeeded: ["Prayan Haldi Powder", "Prayan Dhaniya Powder", "Prayan Red Chilli Powder", "Prayan Garam Masala"],
    instructions: [
      "Heat oil in pan, lightly fry paneer cubes till golden, remove",
      "In same oil, add onions and cook till golden",
      "Add ginger-garlic paste, cook for 2 minutes",
      "Add tomatoes, cook till soft",
      "Add haldi, dhaniya powder, red chilli powder, cook for 2 minutes",
      "Add 1/2 cup water, cook till gravy thickens",
      "Add fried paneer, mix gently",
      "Add cream and garam masala, simmer for 3 minutes",
      "Garnish with coriander and serve hot"
    ],
    tips: [
      "Don't overcook paneer to keep it soft",
      "Prayan Garam Masala adds restaurant-style flavor",
      "Add cream at the end for rich texture"
    ]
  },
  {
    id: "chole",
    name: "Chole (Chickpea Curry)",
    nameHindi: "छोले",
    description: "Spicy and tangy chickpea curry perfect with bhature or rice using Prayan masalas",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=500",
    cookingTime: "40 mins",
    servings: "4 people",
    difficulty: "Medium",
    category: "Vegetarian",
    spicesNeeded: ["Prayan Haldi Powder", "Prayan Dhaniya Powder", "Prayan Red Chilli Powder", "Prayan Garam Masala"],
    instructions: [
      "Pressure cook soaked chickpeas with haldi and salt for 4-5 whistles",
      "Heat oil in pan, add onions and cook till golden",
      "Add ginger-garlic paste and green chillies, cook for 2 minutes",
      "Add tomatoes, cook till soft and mushy",
      "Add dhaniya powder, red chilli powder, cook for 2 minutes",
      "Add cooked chickpeas with water, mix well",
      "Simmer for 15 minutes till gravy thickens",
      "Add garam masala, cook for 2 more minutes",
      "Garnish with coriander and serve hot"
    ],
    tips: [
      "Soak chickpeas overnight for better cooking",
      "Prayan Dhaniya powder gives authentic chole flavor",
      "Mash some chickpeas for thicker gravy"
    ]
  },
  {
    id: "rajma",
    name: "Rajma (Kidney Bean Curry)",
    nameHindi: "राजमा",
    description: "Creamy kidney bean curry - a North Indian favorite using Prayan spices",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500",
    cookingTime: "50 mins",
    servings: "4 people",
    difficulty: "Medium",
    category: "Vegetarian",
    spicesNeeded: ["Prayan Haldi Powder", "Prayan Dhaniya Powder", "Prayan Red Chilli Powder", "Prayan Garam Masala"],
    instructions: [
      "Pressure cook soaked rajma with haldi and salt for 6-7 whistles",
      "Heat oil, add onions and cook till golden brown",
      "Add ginger-garlic paste, cook for 2 minutes",
      "Add tomatoes, cook till completely soft",
      "Add dhaniya powder, red chilli powder, cook for 3 minutes",
      "Add cooked rajma with water, mix well",
      "Simmer for 20 minutes till gravy thickens",
      "Mash some rajma for thicker consistency",
      "Add garam masala, cook for 2 minutes",
      "Garnish with coriander and serve with rice"
    ],
    tips: [
      "Soak rajma for at least 8 hours",
      "Prayan Haldi helps in better cooking",
      "Slow cooking gives the best flavor"
    ]
  },
  {
    id: "jeera-rice",
    name: "Jeera Rice",
    nameHindi: "जीरा राइस",
    description: "Fragrant cumin rice with subtle Prayan spices",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500",
    cookingTime: "20 mins",
    servings: "4 people",
    difficulty: "Easy",
    category: "Vegetarian",
    spicesNeeded: ["Prayan Haldi Powder", "Prayan Garam Masala"],
    instructions: [
      "Wash and soak basmati rice for 20 minutes",
      "Heat ghee in heavy-bottomed pan",
      "Add cumin seeds, bay leaves, cardamom, cinnamon",
      "When cumin splutters, add drained rice",
      "Sauté rice for 2 minutes",
      "Add haldi powder, mix gently",
      "Add hot water (1:2 ratio), salt",
      "Bring to boil, then reduce heat to low",
      "Cover and cook for 15 minutes",
      "Sprinkle garam masala, mix gently",
      "Garnish with coriander and serve"
    ],
    tips: [
      "Prayan Haldi gives beautiful golden color",
      "Use aged basmati rice for best results",
      "Don't over-mix to avoid breaking rice"
    ]
  },
  {
    id: "mixed-vegetable",
    name: "Mixed Vegetable Curry",
    nameHindi: "मिक्स वेजिटेबल करी",
    description: "Healthy and colorful mixed vegetable curry with all Prayan spices",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500",
    cookingTime: "35 mins",
    servings: "4 people",
    difficulty: "Easy",
    category: "Vegetarian",
    spicesNeeded: ["Prayan Haldi Powder", "Prayan Dhaniya Powder", "Prayan Red Chilli Powder", "Prayan Garam Masala"],
    instructions: [
      "Heat oil in pan, add onions and cook till golden",
      "Add all vegetables, mix well",
      "Add haldi, dhaniya powder, red chilli powder and salt",
      "Mix well, cover and cook for 10 minutes",
      "Add tomatoes, cook till soft",
      "Add 1/2 cup water if needed",
      "Cover and cook till vegetables are tender",
      "Sprinkle garam masala, mix gently",
      "Cook for 2 more minutes",
      "Garnish with coriander and serve hot"
    ],
    tips: [
      "Cut all vegetables in equal size for even cooking",
      "Prayan Haldi enhances the natural colors",
      "Add vegetables as per seasonal availability"
    ]
  },
  {
    id: "haldi-doodh",
    name: "Haldi Doodh (Golden Milk)",
    nameHindi: "हल्दी दूध",
    description: "Healthy and immunity-boosting golden milk with pure Prayan haldi",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
    cookingTime: "10 mins",
    servings: "2 people",
    difficulty: "Easy",
    category: "Beverages",
    spicesNeeded: ["Prayan Haldi Powder", "Prayan Garam Masala"],
    instructions: [
      "Heat milk in a saucepan",
      "Add Prayan Haldi powder, mix well",
      "Add a pinch of garam masala and black pepper",
      "Simmer for 5 minutes, stirring occasionally",
      "Add ghee and mix",
      "Strain if needed for smooth texture",
      "Add honey or jaggery as per taste",
      "Garnish with chopped almonds if desired",
      "Serve hot before bedtime"
    ],
    tips: [
      "Use pure Prayan Haldi for maximum benefits",
      "Add honey only when milk is warm, not hot",
      "Best consumed at night for better sleep"
    ]
  },
  {
    id: "simple-tadka-dal",
    name: "Simple Tadka Dal",
    nameHindi: "सिंपल तड़का दाल",
    description: "Quick and simple dal with basic Prayan spices",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=500",
    cookingTime: "25 mins",
    servings: "4 people",
    difficulty: "Easy",
    category: "Vegetarian",
    spicesNeeded: ["Prayan Haldi Powder", "Prayan Red Chilli Powder"],
    instructions: [
      "Wash moong dal and cook with haldi and salt in pressure cooker for 3 whistles",
      "Heat ghee in pan, add cumin seeds",
      "Add green chillies and ginger, sauté for 1 minute",
      "Add red chilli powder, cook for 30 seconds",
      "Add cooked dal, mix well",
      "Simmer for 5 minutes",
      "Adjust consistency with water if needed",
      "Garnish with fresh coriander",
      "Serve hot with rice or roti"
    ],
    tips: [
      "Prayan Haldi gives beautiful color and aids digestion",
      "Adjust red chilli powder as per taste preference",
      "Perfect comfort food for any time"
    ]
  },
  {
    id: "spiced-rice",
    name: "Spiced Rice",
    nameHindi: "मसाला चावल",
    description: "Aromatic spiced rice perfect as a side dish using Prayan masalas",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500",
    cookingTime: "25 mins",
    servings: "4 people",
    difficulty: "Easy",
    category: "Vegetarian",
    spicesNeeded: ["Prayan Haldi Powder", "Prayan Garam Masala"],
    instructions: [
      "Wash and soak rice for 20 minutes",
      "Heat ghee in heavy-bottomed pan",
      "Add whole spices and cumin seeds",
      "When aromatic, add drained rice",
      "Sauté for 2 minutes",
      "Add haldi powder, mix gently",
      "Add hot water (1:2 ratio) and salt",
      "Bring to boil, then simmer on low heat",
      "Cover and cook for 15 minutes",
      "Sprinkle garam masala, mix gently",
      "Let it rest for 5 minutes before serving"
    ],
    tips: [
      "Prayan Haldi gives lovely golden color",
      "Prayan Garam Masala adds royal aroma",
      "Perfect accompaniment to any curry"
    ]
  }
];

// Simple helper function
export const getSimpleRecipeById = (id: string): SimpleRecipe | undefined => {
  return simpleRecipes.find(recipe => recipe.id === id);
};