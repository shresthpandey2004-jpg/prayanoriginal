export interface Recipe {
  id: string;
  title: string;
  titleHindi: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: number;
  ingredients: {
    name: string;
    amount: string;
    category: 'spice' | 'vegetable' | 'protein' | 'grain' | 'dairy' | 'other';
    prayan?: boolean; // If it's a Prayan Masale product
  }[];
  instructions: {
    step: number;
    instruction: string;
    tip?: string;
  }[];
  nutritionalInfo: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
  };
  healthBenefits: string[];
  spiceSpotlight: {
    spice: string;
    benefit: string;
  }[];
  variations: string[];
  storageInstructions: string;
  tags: string[];
  region: string;
  season: string;
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
}

export const recipes: Recipe[] = [
  {
    id: "dal-tadka",
    title: "Dal Tadka",
    titleHindi: "दाल तड़का",
    slug: "dal-tadka-recipe",
    description: "Classic Indian comfort food - yellow lentils tempered with aromatic spices. A protein-rich, wholesome dish perfect with rice or roti.",
    image: "/recipes/dal-tadka.jpg",
    category: "Main Course",
    difficulty: "Easy",
    prepTime: "10 mins",
    cookTime: "25 mins",
    totalTime: "35 mins",
    servings: 4,
    ingredients: [
      { name: "Toor Dal (Yellow Lentils)", amount: "1 cup", category: "protein" },
      { name: "Turmeric Powder", amount: "1 tsp", category: "spice", prayan: true },
      { name: "Red Chilli Powder", amount: "1 tsp", category: "spice", prayan: true },
      { name: "Cumin Powder", amount: "1/2 tsp", category: "spice", prayan: true },
      { name: "Coriander Powder", amount: "1 tsp", category: "spice", prayan: true },
      { name: "Garam Masala", amount: "1/2 tsp", category: "spice", prayan: true },
      { name: "Ghee", amount: "2 tbsp", category: "dairy" },
      { name: "Cumin Seeds", amount: "1 tsp", category: "spice", prayan: true },
      { name: "Mustard Seeds", amount: "1/2 tsp", category: "spice", prayan: true },
      { name: "Hing (Asafoetida)", amount: "Pinch", category: "spice", prayan: true },
      { name: "Green Chilies", amount: "2", category: "vegetable" },
      { name: "Ginger", amount: "1 inch piece", category: "vegetable" },
      { name: "Garlic", amount: "4 cloves", category: "vegetable" },
      { name: "Onion", amount: "1 medium", category: "vegetable" },
      { name: "Tomatoes", amount: "2 medium", category: "vegetable" },
      { name: "Curry Leaves", amount: "8-10", category: "other" },
      { name: "Fresh Coriander", amount: "2 tbsp", category: "other" },
      { name: "Salt", amount: "To taste", category: "other" },
      { name: "Water", amount: "3 cups", category: "other" }
    ],
    instructions: [
      {
        step: 1,
        instruction: "Wash toor dal thoroughly and pressure cook with 2.5 cups water, turmeric powder, and salt for 3-4 whistles until soft and mushy.",
        tip: "Add a few drops of oil to prevent foaming during cooking."
      },
      {
        step: 2,
        instruction: "Mash the cooked dal lightly and keep aside. If too thick, add hot water to achieve desired consistency.",
        tip: "The dal should be creamy but not too watery."
      },
      {
        step: 3,
        instruction: "Heat ghee in a heavy-bottomed pan. Add cumin seeds, mustard seeds, and hing. Let them splutter.",
        tip: "Keep the heat medium to prevent burning of spices."
      },
      {
        step: 4,
        instruction: "Add curry leaves, chopped green chilies, ginger, and garlic. Sauté for 30 seconds until fragrant.",
        tip: "Be careful as curry leaves may splutter when added to hot oil."
      },
      {
        step: 5,
        instruction: "Add chopped onions and cook until golden brown and translucent (about 5-6 minutes).",
        tip: "Well-cooked onions add sweetness and depth to the dal."
      },
      {
        step: 6,
        instruction: "Add chopped tomatoes and cook until they break down and become mushy (4-5 minutes).",
        tip: "Cooking tomatoes well removes their raw taste and adds richness."
      },
      {
        step: 7,
        instruction: "Add red chilli powder, cumin powder, and coriander powder. Mix well and cook for 1 minute.",
        tip: "Cooking spices briefly releases their flavors and removes raw taste."
      },
      {
        step: 8,
        instruction: "Add the cooked dal to the tempering. Mix well and bring to a boil.",
        tip: "Stir gently to avoid breaking the dal completely."
      },
      {
        step: 9,
        instruction: "Simmer for 10-12 minutes, stirring occasionally. Add water if needed to maintain consistency.",
        tip: "The dal should coat the back of a spoon when ready."
      },
      {
        step: 10,
        instruction: "Add garam masala and mix. Garnish with fresh coriander leaves. Serve hot with rice or roti.",
        tip: "Add garam masala at the end to preserve its aroma."
      }
    ],
    nutritionalInfo: {
      calories: 245,
      protein: "12g",
      carbs: "35g",
      fat: "8g",
      fiber: "6g"
    },
    healthBenefits: [
      "High in plant-based protein and fiber",
      "Turmeric provides anti-inflammatory benefits",
      "Cumin aids digestion and boosts immunity",
      "Low in saturated fat and cholesterol-free",
      "Rich in folate and iron"
    ],
    spiceSpotlight: [
      { spice: "Turmeric", benefit: "Anti-inflammatory and antioxidant properties" },
      { spice: "Cumin", benefit: "Improves digestion and iron absorption" },
      { spice: "Coriander", benefit: "Helps regulate blood sugar and cholesterol" }
    ],
    variations: [
      "Add spinach for Palak Dal",
      "Use mixed lentils for variety",
      "Add coconut milk for South Indian style",
      "Include bottle gourd for Lauki Dal"
    ],
    storageInstructions: "Store in refrigerator for up to 3 days. Reheat with a little water if needed. Can be frozen for up to 1 month.",
    tags: ["vegetarian", "protein-rich", "comfort-food", "healthy", "gluten-free", "one-pot"],
    region: "North India",
    season: "All seasons",
    featured: true,
    seoTitle: "Authentic Dal Tadka Recipe with Prayan Masale Spices",
    seoDescription: "Learn to make perfect Dal Tadka with this traditional recipe using Prayan Masale's organic spices. Healthy, protein-rich comfort food.",
    seoKeywords: ["dal tadka recipe", "indian lentil curry", "healthy dal recipe", "organic spices", "vegetarian protein"]
  },
  {
    id: "chicken-curry",
    title: "Chicken Curry",
    titleHindi: "चिकन करी",
    slug: "chicken-curry-recipe",
    description: "Rich and flavorful chicken curry with aromatic spices and creamy gravy. A classic Indian dish that's perfect for family dinners.",
    image: "/recipes/chicken-curry.jpg",
    category: "Main Course",
    difficulty: "Medium",
    prepTime: "20 mins",
    cookTime: "40 mins",
    totalTime: "60 mins",
    servings: 6,
    ingredients: [
      { name: "Chicken", amount: "1 kg (cut into pieces)", category: "protein" },
      { name: "Turmeric Powder", amount: "1 tsp", category: "spice", prayan: true },
      { name: "Red Chilli Powder", amount: "2 tsp", category: "spice", prayan: true },
      { name: "Coriander Powder", amount: "2 tbsp", category: "spice", prayan: true },
      { name: "Cumin Powder", amount: "1 tsp", category: "spice", prayan: true },
      { name: "Garam Masala", amount: "1 tbsp", category: "spice", prayan: true },
      { name: "Chicken Masala", amount: "1 tbsp", category: "spice", prayan: true },
      { name: "Onions", amount: "3 large", category: "vegetable" },
      { name: "Tomatoes", amount: "4 medium", category: "vegetable" },
      { name: "Ginger-Garlic Paste", amount: "2 tbsp", category: "other" },
      { name: "Green Chilies", amount: "3-4", category: "vegetable" },
      { name: "Yogurt", amount: "1/2 cup", category: "dairy" },
      { name: "Coconut Milk", amount: "1 cup", category: "other" },
      { name: "Oil", amount: "3 tbsp", category: "other" },
      { name: "Bay Leaves", amount: "2", category: "spice", prayan: true },
      { name: "Cinnamon Stick", amount: "1 inch", category: "spice", prayan: true },
      { name: "Cardamom", amount: "3-4 pods", category: "spice", prayan: true },
      { name: "Cloves", amount: "3-4", category: "spice", prayan: true },
      { name: "Curry Leaves", amount: "10-12", category: "other" },
      { name: "Fresh Coriander", amount: "3 tbsp", category: "other" },
      { name: "Salt", amount: "To taste", category: "other" }
    ],
    instructions: [
      {
        step: 1,
        instruction: "Marinate chicken pieces with turmeric powder, 1 tsp red chilli powder, and salt. Let it rest for 15 minutes.",
        tip: "Marinating helps the spices penetrate the meat for better flavor."
      },
      {
        step: 2,
        instruction: "Heat oil in a heavy-bottomed pan. Add bay leaves, cinnamon, cardamom, and cloves. Fry until fragrant.",
        tip: "Whole spices release their aroma when heated in oil."
      },
      {
        step: 3,
        instruction: "Add marinated chicken pieces and cook on high heat until they change color and are 70% cooked. Remove and set aside.",
        tip: "Don't overcook at this stage as chicken will cook further in gravy."
      },
      {
        step: 4,
        instruction: "In the same pan, add sliced onions and cook until golden brown and caramelized (8-10 minutes).",
        tip: "Well-browned onions add sweetness and rich color to the curry."
      },
      {
        step: 5,
        instruction: "Add ginger-garlic paste and green chilies. Cook for 2 minutes until the raw smell disappears.",
        tip: "Cooking ginger-garlic paste properly is crucial for good flavor."
      },
      {
        step: 6,
        instruction: "Add chopped tomatoes and cook until they break down completely and oil starts separating (6-8 minutes).",
        tip: "Tomatoes should be completely cooked to avoid sourness in the curry."
      },
      {
        step: 7,
        instruction: "Add remaining red chilli powder, coriander powder, cumin powder, and chicken masala. Cook for 2 minutes.",
        tip: "Cooking spices removes their raw taste and enhances flavor."
      },
      {
        step: 8,
        instruction: "Add whisked yogurt gradually while stirring continuously to prevent curdling. Cook for 3-4 minutes.",
        tip: "Room temperature yogurt is less likely to curdle."
      },
      {
        step: 9,
        instruction: "Add the partially cooked chicken back to the pan. Mix well and cook for 5 minutes.",
        tip: "Ensure chicken is well-coated with the masala."
      },
      {
        step: 10,
        instruction: "Add coconut milk and curry leaves. Bring to a boil, then simmer covered for 15-20 minutes until chicken is tender.",
        tip: "Coconut milk adds richness and balances the spices."
      },
      {
        step: 11,
        instruction: "Add garam masala and mix gently. Garnish with fresh coriander. Serve hot with rice or naan.",
        tip: "Add garam masala at the end to preserve its aromatic oils."
      }
    ],
    nutritionalInfo: {
      calories: 385,
      protein: "32g",
      carbs: "12g",
      fat: "24g",
      fiber: "3g"
    },
    healthBenefits: [
      "High-quality protein for muscle building",
      "Turmeric provides anti-inflammatory benefits",
      "Coconut milk contains healthy medium-chain fatty acids",
      "Spices boost metabolism and aid digestion",
      "Rich in B-vitamins and minerals"
    ],
    spiceSpotlight: [
      { spice: "Garam Masala", benefit: "Warming spices that aid digestion and circulation" },
      { spice: "Coriander", benefit: "Helps balance the heat from chilies and aids digestion" },
      { spice: "Turmeric", benefit: "Powerful anti-inflammatory and antioxidant properties" }
    ],
    variations: [
      "Add potatoes for Chicken Aloo Curry",
      "Use tomato puree instead of fresh tomatoes",
      "Add cashew paste for richer gravy",
      "Include bell peppers for extra vegetables"
    ],
    storageInstructions: "Store in refrigerator for up to 4 days. Tastes even better the next day. Can be frozen for up to 2 months.",
    tags: ["non-vegetarian", "spicy", "protein-rich", "comfort-food", "family-dinner"],
    region: "Pan-Indian",
    season: "All seasons",
    featured: true,
    seoTitle: "Authentic Chicken Curry Recipe with Prayan Masale Spices",
    seoDescription: "Make restaurant-style chicken curry at home with this traditional recipe using Prayan Masale's organic spices. Rich, flavorful, and aromatic.",
    seoKeywords: ["chicken curry recipe", "indian chicken curry", "spicy chicken recipe", "organic spices", "homemade curry"]
  },
  {
    id: "aloo-gobi",
    title: "Aloo Gobi",
    titleHindi: "आलू गोभी",
    slug: "aloo-gobi-recipe",
    description: "Classic dry vegetable curry with potatoes and cauliflower, seasoned with aromatic spices. A popular North Indian comfort food.",
    image: "/recipes/aloo-gobi.jpg",
    category: "Vegetable",
    difficulty: "Easy",
    prepTime: "15 mins",
    cookTime: "25 mins",
    totalTime: "40 mins",
    servings: 4,
    ingredients: [
      { name: "Potatoes", amount: "3 medium (cubed)", category: "vegetable" },
      { name: "Cauliflower", amount: "1 medium head", category: "vegetable" },
      { name: "Turmeric Powder", amount: "1 tsp", category: "spice", prayan: true },
      { name: "Red Chilli Powder", amount: "1 tsp", category: "spice", prayan: true },
      { name: "Coriander Powder", amount: "2 tsp", category: "spice", prayan: true },
      { name: "Cumin Powder", amount: "1 tsp", category: "spice", prayan: true },
      { name: "Garam Masala", amount: "1/2 tsp", category: "spice", prayan: true },
      { name: "Cumin Seeds", amount: "1 tsp", category: "spice", prayan: true },
      { name: "Ginger", amount: "1 inch piece", category: "vegetable" },
      { name: "Green Chilies", amount: "2", category: "vegetable" },
      { name: "Onion", amount: "1 medium", category: "vegetable" },
      { name: "Tomatoes", amount: "2 medium", category: "vegetable" },
      { name: "Oil", amount: "3 tbsp", category: "other" },
      { name: "Fresh Coriander", amount: "2 tbsp", category: "other" },
      { name: "Salt", amount: "To taste", category: "other" }
    ],
    instructions: [
      {
        step: 1,
        instruction: "Cut cauliflower into medium florets and potatoes into cubes. Soak cauliflower in salted water for 10 minutes, then drain.",
        tip: "Soaking cauliflower removes any insects and reduces cooking time."
      },
      {
        step: 2,
        instruction: "Heat oil in a large pan or kadhai. Add cumin seeds and let them splutter.",
        tip: "Use a wide pan to ensure vegetables cook evenly without overcrowding."
      },
      {
        step: 3,
        instruction: "Add chopped onions and cook until translucent (3-4 minutes).",
        tip: "Don't brown the onions too much for this recipe."
      },
      {
        step: 4,
        instruction: "Add minced ginger and green chilies. Sauté for 1 minute until fragrant.",
        tip: "Fresh ginger adds a nice zing to the dish."
      },
      {
        step: 5,
        instruction: "Add potato cubes and cook for 5-6 minutes, stirring occasionally until they start to turn golden.",
        tip: "Partially cooking potatoes first ensures they cook evenly with cauliflower."
      },
      {
        step: 6,
        instruction: "Add cauliflower florets, turmeric powder, and salt. Mix gently and cook covered for 8-10 minutes.",
        tip: "Cover to steam the vegetables and retain moisture."
      },
      {
        step: 7,
        instruction: "Add chopped tomatoes, red chilli powder, coriander powder, and cumin powder. Mix well.",
        tip: "Tomatoes add moisture and help cook the spices."
      },
      {
        step: 8,
        instruction: "Cook uncovered for 8-10 minutes, stirring occasionally until vegetables are tender and tomatoes are cooked.",
        tip: "Stir gently to avoid breaking the cauliflower florets."
      },
      {
        step: 9,
        instruction: "Sprinkle garam masala and mix gently. Cook for 2 more minutes.",
        tip: "Adding garam masala at the end preserves its aroma."
      },
      {
        step: 10,
        instruction: "Garnish with fresh coriander leaves. Serve hot with roti or rice.",
        tip: "Fresh coriander adds color and freshness to the dish."
      }
    ],
    nutritionalInfo: {
      calories: 165,
      protein: "4g",
      carbs: "28g",
      fat: "6g",
      fiber: "5g"
    },
    healthBenefits: [
      "High in vitamin C and antioxidants from cauliflower",
      "Potatoes provide energy and potassium",
      "Turmeric offers anti-inflammatory benefits",
      "Low in calories and fat",
      "Good source of dietary fiber"
    ],
    spiceSpotlight: [
      { spice: "Turmeric", benefit: "Anti-inflammatory and supports immune system" },
      { spice: "Cumin", benefit: "Aids digestion and provides iron" },
      { spice: "Coriander", benefit: "Helps regulate blood sugar and adds fresh flavor" }
    ],
    variations: [
      "Add peas for Aloo Gobi Matar",
      "Include bell peppers for extra color",
      "Add paneer cubes for protein",
      "Use sweet potatoes instead of regular potatoes"
    ],
    storageInstructions: "Store in refrigerator for up to 3 days. Reheat gently to maintain texture. Best consumed fresh.",
    tags: ["vegetarian", "vegan", "healthy", "comfort-food", "gluten-free", "low-calorie"],
    region: "North India",
    season: "Winter",
    featured: false,
    seoTitle: "Perfect Aloo Gobi Recipe with Prayan Masale Spices",
    seoDescription: "Learn to make delicious Aloo Gobi with this authentic recipe using Prayan Masale's organic spices. Healthy, flavorful vegetarian dish.",
    seoKeywords: ["aloo gobi recipe", "cauliflower potato curry", "indian vegetable recipe", "healthy vegetarian dish", "organic spices"]
  },
  {
    id: "biryani",
    title: "Chicken Biryani",
    titleHindi: "चिकन बिरयानी",
    slug: "chicken-biryani-recipe",
    description: "Aromatic and flavorful rice dish layered with spiced chicken and fragrant basmati rice. The king of Indian rice dishes.",
    image: "/recipes/chicken-biryani.jpg",
    category: "Rice & Biryani",
    difficulty: "Hard",
    prepTime: "45 mins",
    cookTime: "60 mins",
    totalTime: "105 mins",
    servings: 8,
    ingredients: [
      { name: "Basmati Rice", amount: "3 cups", category: "grain" },
      { name: "Chicken", amount: "1 kg (cut into pieces)", category: "protein" },
      { name: "Biryani Masala", amount: "2 tbsp", category: "spice", prayan: true },
      { name: "Garam Masala", amount: "1 tbsp", category: "spice", prayan: true },
      { name: "Red Chilli Powder", amount: "1 tsp", category: "spice", prayan: true },
      { name: "Turmeric Powder", amount: "1/2 tsp", category: "spice", prayan: true },
      { name: "Coriander Powder", amount: "1 tbsp", category: "spice", prayan: true },
      { name: "Yogurt", amount: "1 cup", category: "dairy" },
      { name: "Onions", amount: "4 large (sliced)", category: "vegetable" },
      { name: "Ginger-Garlic Paste", amount: "3 tbsp", category: "other" },
      { name: "Green Chilies", amount: "4-5", category: "vegetable" },
      { name: "Mint Leaves", amount: "1/2 cup", category: "other" },
      { name: "Coriander Leaves", amount: "1/2 cup", category: "other" },
      { name: "Saffron", amount: "1/2 tsp", category: "spice", prayan: true },
      { name: "Warm Milk", amount: "1/4 cup", category: "dairy" },
      { name: "Ghee", amount: "4 tbsp", category: "dairy" },
      { name: "Oil", amount: "1/2 cup", category: "other" },
      { name: "Bay Leaves", amount: "3", category: "spice", prayan: true },
      { name: "Cinnamon Sticks", amount: "2", category: "spice", prayan: true },
      { name: "Green Cardamom", amount: "6 pods", category: "spice", prayan: true },
      { name: "Black Cardamom", amount: "2 pods", category: "spice", prayan: true },
      { name: "Cloves", amount: "6", category: "spice", prayan: true },
      { name: "Star Anise", amount: "2", category: "spice", prayan: true },
      { name: "Salt", amount: "To taste", category: "other" }
    ],
    instructions: [
      {
        step: 1,
        instruction: "Soak basmati rice in water for 30 minutes. Soak saffron in warm milk and set aside.",
        tip: "Soaking rice helps achieve longer grains and prevents breaking."
      },
      {
        step: 2,
        instruction: "Marinate chicken with yogurt, ginger-garlic paste, biryani masala, red chilli powder, turmeric, coriander powder, and salt for at least 30 minutes.",
        tip: "Longer marination (2-4 hours) gives better flavor penetration."
      },
      {
        step: 3,
        instruction: "Heat oil in a heavy-bottomed pot. Deep fry sliced onions until golden brown and crispy. Remove and drain on paper towels.",
        tip: "Crispy fried onions (birista) are crucial for authentic biryani flavor."
      },
      {
        step: 4,
        instruction: "In the same oil, cook marinated chicken on medium-high heat until 80% cooked. Remove and set aside.",
        tip: "Don't fully cook chicken as it will cook further during dum cooking."
      },
      {
        step: 5,
        instruction: "Boil water in a large pot with whole spices (bay leaves, cinnamon, cardamom, cloves, star anise) and salt.",
        tip: "Water should taste slightly salty for properly seasoned rice."
      },
      {
        step: 6,
        instruction: "Add soaked rice to boiling water and cook until 70% done. Drain immediately.",
        tip: "Rice should still have a slight bite as it will cook further during layering."
      },
      {
        step: 7,
        instruction: "In the same heavy-bottomed pot, layer half the rice, then chicken, half the fried onions, mint, and coriander leaves.",
        tip: "Use a wide, heavy-bottomed pot for even heat distribution."
      },
      {
        step: 8,
        instruction: "Add remaining rice as the top layer. Sprinkle remaining fried onions, herbs, saffron milk, and dots of ghee.",
        tip: "Even layering ensures every bite has rice, meat, and aromatics."
      },
      {
        step: 9,
        instruction: "Cover the pot with aluminum foil, then place the lid tightly. Cook on high heat for 3-4 minutes until steam forms.",
        tip: "Foil creates a better seal for steam retention."
      },
      {
        step: 10,
        instruction: "Reduce heat to lowest setting and cook for 45 minutes. Turn off heat and let it rest for 10 minutes without opening.",
        tip: "This dum cooking method ensures perfect texture and flavor infusion."
      },
      {
        step: 11,
        instruction: "Gently mix the biryani and serve hot with raita, boiled eggs, and shorba.",
        tip: "Mix carefully to avoid breaking the rice grains."
      }
    ],
    nutritionalInfo: {
      calories: 485,
      protein: "28g",
      carbs: "52g",
      fat: "18g",
      fiber: "2g"
    },
    healthBenefits: [
      "High-quality protein from chicken",
      "Complex carbohydrates from basmati rice",
      "Saffron provides antioxidants and mood benefits",
      "Whole spices aid digestion and boost metabolism",
      "Yogurt provides probiotics for gut health"
    ],
    spiceSpotlight: [
      { spice: "Biryani Masala", benefit: "Complex blend that enhances flavor and aids digestion" },
      { spice: "Saffron", benefit: "Antioxidant properties and natural mood enhancer" },
      { spice: "Cardamom", benefit: "Aids digestion and provides natural breath freshening" }
    ],
    variations: [
      "Mutton Biryani with goat meat",
      "Vegetable Biryani with mixed vegetables",
      "Hyderabadi style with kewra water",
      "Lucknowi style with subtle flavors"
    ],
    storageInstructions: "Store in refrigerator for up to 3 days. Reheat gently with a little water or steam. Can be frozen for up to 1 month.",
    tags: ["non-vegetarian", "festive", "aromatic", "special-occasion", "protein-rich"],
    region: "Hyderabad/Lucknow",
    season: "All seasons",
    featured: true,
    seoTitle: "Authentic Chicken Biryani Recipe with Prayan Masale Spices",
    seoDescription: "Master the art of making perfect Chicken Biryani with this traditional recipe using Prayan Masale's aromatic spices. Restaurant-style at home!",
    seoKeywords: ["chicken biryani recipe", "hyderabadi biryani", "aromatic rice dish", "indian biryani", "biryani masala"]
  },
  {
    id: "rajma",
    title: "Rajma (Kidney Bean Curry)",
    titleHindi: "राजमा",
    slug: "rajma-kidney-bean-curry-recipe",
    description: "Hearty and nutritious kidney bean curry in rich tomato gravy. A popular North Indian comfort food packed with protein and flavor.",
    image: "/recipes/rajma.jpg",
    category: "Main Course",
    difficulty: "Medium",
    prepTime: "8 hours (soaking) + 15 mins",
    cookTime: "45 mins",
    totalTime: "60 mins",
    servings: 6,
    ingredients: [
      { name: "Kidney Beans (Rajma)", amount: "2 cups (soaked overnight)", category: "protein" },
      { name: "Onions", amount: "3 medium", category: "vegetable" },
      { name: "Tomatoes", amount: "4 large", category: "vegetable" },
      { name: "Ginger-Garlic Paste", amount: "2 tbsp", category: "other" },
      { name: "Green Chilies", amount: "2-3", category: "vegetable" },
      { name: "Red Chilli Powder", amount: "2 tsp", category: "spice", prayan: true },
      { name: "Turmeric Powder", amount: "1 tsp", category: "spice", prayan: true },
      { name: "Coriander Powder", amount: "2 tbsp", category: "spice", prayan: true },
      { name: "Cumin Powder", amount: "1 tsp", category: "spice", prayan: true },
      { name: "Garam Masala", amount: "1 tbsp", category: "spice", prayan: true },
      { name: "Rajma Masala", amount: "1 tbsp", category: "spice", prayan: true },
      { name: "Bay Leaves", amount: "2", category: "spice", prayan: true },
      { name: "Cumin Seeds", amount: "1 tsp", category: "spice", prayan: true },
      { name: "Oil", amount: "3 tbsp", category: "other" },
      { name: "Butter", amount: "1 tbsp", category: "dairy" },
      { name: "Fresh Cream", amount: "2 tbsp", category: "dairy" },
      { name: "Fresh Coriander", amount: "3 tbsp", category: "other" },
      { name: "Salt", amount: "To taste", category: "other" }
    ],
    instructions: [
      {
        step: 1,
        instruction: "Pressure cook soaked kidney beans with salt and bay leaves for 6-8 whistles until soft and mushy. Reserve the cooking liquid.",
        tip: "Don't discard the cooking liquid as it adds flavor and nutrients to the curry."
      },
      {
        step: 2,
        instruction: "Heat oil in a heavy-bottomed pan. Add cumin seeds and let them splutter.",
        tip: "Use a wide pan for better evaporation and thicker gravy."
      },
      {
        step: 3,
        instruction: "Add finely chopped onions and cook until golden brown and caramelized (8-10 minutes).",
        tip: "Well-browned onions are key to rich flavor and color of rajma."
      },
      {
        step: 4,
        instruction: "Add ginger-garlic paste and green chilies. Cook for 2 minutes until fragrant.",
        tip: "Cook until the raw smell of ginger-garlic disappears."
      },
      {
        step: 5,
        instruction: "Add chopped tomatoes and cook until they break down completely and oil starts separating (8-10 minutes).",
        tip: "Properly cooked tomatoes create the base for a rich gravy."
      },
      {
        step: 6,
        instruction: "Add red chilli powder, turmeric, coriander powder, cumin powder, and rajma masala. Cook for 2 minutes.",
        tip: "Cooking spices removes their raw taste and enhances flavor."
      },
      {
        step: 7,
        instruction: "Add cooked kidney beans along with their cooking liquid. Bring to a boil.",
        tip: "Mash some beans against the side of the pan for thicker gravy."
      },
      {
        step: 8,
        instruction: "Simmer for 20-25 minutes, stirring occasionally. Add water if needed to maintain consistency.",
        tip: "The gravy should be thick enough to coat the beans but not too dry."
      },
      {
        step: 9,
        instruction: "Add garam masala, butter, and fresh cream. Mix gently and cook for 2 minutes.",
        tip: "Cream adds richness while butter enhances the overall flavor."
      },
      {
        step: 10,
        instruction: "Garnish with fresh coriander leaves. Serve hot with steamed rice or jeera rice.",
        tip: "Rajma tastes even better the next day as flavors develop overnight."
      }
    ],
    nutritionalInfo: {
      calories: 285,
      protein: "15g",
      carbs: "42g",
      fat: "8g",
      fiber: "12g"
    },
    healthBenefits: [
      "Excellent source of plant-based protein and fiber",
      "Rich in folate, iron, and potassium",
      "Helps regulate blood sugar levels",
      "Supports heart health and weight management",
      "Provides sustained energy release"
    ],
    spiceSpotlight: [
      { spice: "Rajma Masala", benefit: "Specially blended spices that complement kidney beans perfectly" },
      { spice: "Garam Masala", benefit: "Warming spices that aid digestion and enhance flavor" },
      { spice: "Coriander", benefit: "Helps balance flavors and aids in digestion" }
    ],
    variations: [
      "Add spinach for Palak Rajma",
      "Include paneer cubes for extra protein",
      "Use coconut milk instead of cream for dairy-free version",
      "Add vegetables like carrots and peas"
    ],
    storageInstructions: "Store in refrigerator for up to 4 days. Tastes better the next day. Can be frozen for up to 2 months.",
    tags: ["vegetarian", "protein-rich", "comfort-food", "healthy", "gluten-free", "fiber-rich"],
    region: "North India",
    season: "All seasons",
    featured: false,
    seoTitle: "Authentic Rajma Recipe - Kidney Bean Curry with Prayan Masale",
    seoDescription: "Make delicious Rajma (kidney bean curry) with this traditional recipe using Prayan Masale's organic spices. Protein-rich, healthy comfort food.",
    seoKeywords: ["rajma recipe", "kidney bean curry", "vegetarian protein", "north indian curry", "healthy bean recipe"]
  }
];

export const getRecipeBySlug = (slug: string): Recipe | undefined => {
  return recipes.find(recipe => recipe.slug === slug);
};

export const getFeaturedRecipes = (): Recipe[] => {
  return recipes.filter(recipe => recipe.featured);
};

export const getRecipesByCategory = (category: string): Recipe[] => {
  return recipes.filter(recipe => recipe.category === category);
};

export const getRecipeCategories = (): string[] => {
  return [...new Set(recipes.map(recipe => recipe.category))];
};

export const getRecipesByDifficulty = (difficulty: string): Recipe[] => {
  return recipes.filter(recipe => recipe.difficulty === difficulty);
};

export const getRecipesByRegion = (region: string): Recipe[] => {
  return recipes.filter(recipe => recipe.region === region);
};

export const searchRecipes = (query: string): Recipe[] => {
  const lowercaseQuery = query.toLowerCase();
  return recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(lowercaseQuery) ||
    recipe.titleHindi.toLowerCase().includes(lowercaseQuery) ||
    recipe.description.toLowerCase().includes(lowercaseQuery) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    recipe.ingredients.some(ingredient => ingredient.name.toLowerCase().includes(lowercaseQuery))
  );
};