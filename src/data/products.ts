export interface Product {
  id: string;
  name: string;
  nameHindi?: string;
  description: string;
  price: number; // Base price (will be updated based on selected variant)
  originalPrice?: number;
  image: string;
  category: string;
  weight: string; // Default weight (will be updated based on selected variant)
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  ingredients?: string[];
  benefits?: string[];
  usageIdeas?: string[];
  // Multiple weight options with pricing
  weightOptions: {
    weight: string;
    price: number;
    originalPrice?: number;
    sku: string;
    stock: number;
  }[];
  // Inventory Management (optional for now)
  stock?: number;
  lowStockThreshold?: number;
  isInStock?: boolean;
  sku?: string;
}

export const products: Product[] = [
  // Haldi (Turmeric)
  {
    id: 'haldi',
    name: 'Haldi (Turmeric Powder)',
    nameHindi: 'हल्दी पाउडर',
    description: 'Pure and vibrant turmeric sourced from the finest farms. Known for its golden color and medicinal properties.',
    price: 160, // Base price for 500g (reduced by ₹40)
    originalPrice: 250, // Original price higher than current
    image: '/products/turmeric-powder-new.jpg',
    category: 'Pure Spices',
    weight: '500g', // Default weight (updated)
    rating: 4.8,
    reviews: 3214,
    isBestSeller: true,
    lowStockThreshold: 30,
    isInStock: true,
    sku: 'PM-H-500', // Default SKU (updated)
    ingredients: ['100% Pure Turmeric'],
    benefits: ['Anti-inflammatory', 'Immunity booster', 'Skin health'],
    usageIdeas: ['Golden milk', 'Curries', 'Rice dishes', 'Face masks'],
    weightOptions: [
      {
        weight: '250g',
        price: 95,
        originalPrice: 120,
        sku: 'PM-H-250',
        stock: 200
      },
      {
        weight: '500g',
        price: 160,
        originalPrice: 250,
        sku: 'PM-H-500',
        stock: 150
      },
      {
        weight: '1kg',
        price: 310,
        originalPrice: 420,
        sku: 'PM-H-1KG',
        stock: 100
      }
    ]
  },

  // Chilli
  {
    id: 'chilli',
    name: 'Red Chilli Powder',
    nameHindi: 'लाल मिर्च पाउडर',
    description: 'Premium red chilli powder that gives your dishes a beautiful red color with perfect heat.',
    price: 170, // Base price for 500g (reduced by ₹40)
    originalPrice: 260, // Original price higher than current
    image: '/products/chilli-powder-new.jpg',
    category: 'Pure Spices',
    weight: '500g', // Default weight (updated)
    rating: 4.7,
    reviews: 1987,
    isNew: true,
    lowStockThreshold: 30,
    isInStock: true,
    sku: 'PM-C-500', // Default SKU (updated)
    ingredients: ['100% Red Chilli'],
    benefits: ['Rich in Vitamin C', 'Metabolism booster', 'Natural color'],
    usageIdeas: ['Tandoori dishes', 'Gravies', 'Marinades'],
    weightOptions: [
      {
        weight: '250g',
        price: 100,
        originalPrice: 130,
        sku: 'PM-C-250',
        stock: 180
      },
      {
        weight: '500g',
        price: 170,
        originalPrice: 260,
        sku: 'PM-C-500',
        stock: 140
      },
      {
        weight: '1kg',
        price: 330,
        originalPrice: 450,
        sku: 'PM-C-1KG',
        stock: 90
      }
    ]
  },

  // Dhaniya (Coriander)
  {
    id: 'dhaniya',
    name: 'Dhaniya (Coriander Powder)',
    nameHindi: 'धनिया पाउडर',
    description: 'Aromatic coriander powder with fresh, citrusy flavor. Essential for authentic Indian cooking.',
    price: 120, // Base price for 500g (updated)
    originalPrice: 150, // Original price higher than current
    image: '/products/coriander-powder-new.jpg',
    category: 'Pure Spices',
    weight: '500g', // Default weight (updated)
    rating: 4.9,
    reviews: 2341,
    isBestSeller: true,
    lowStockThreshold: 30,
    isInStock: true,
    sku: 'PM-D-500', // Default SKU (updated)
    ingredients: ['100% Pure Coriander Seeds'],
    benefits: ['Improves digestion', 'Rich in antioxidants', 'Natural detox'],
    usageIdeas: ['Dal', 'Curries', 'Chutneys', 'Marinades'],
    weightOptions: [
      {
        weight: '250g',
        price: 40,
        originalPrice: 55,
        sku: 'PM-D-250',
        stock: 200
      },
      {
        weight: '500g',
        price: 120,
        originalPrice: 150,
        sku: 'PM-D-500',
        stock: 160
      },
      {
        weight: '1kg',
        price: 240,
        originalPrice: 300,
        sku: 'PM-D-1KG',
        stock: 120
      }
    ]
  },

  // Garam Masala
  {
    id: 'garam-masala',
    name: 'Garam Masala',
    nameHindi: 'गरम मसाला',
    description: 'A perfect blend of aromatic spices that brings warmth and depth to your dishes. Hand-ground using traditional methods.',
    price: 270, // Base price for 500g (reduced by ₹40)
    originalPrice: 380, // Original price higher than current
    image: '/products/garam-masala-new.jpg',
    category: 'Blended Spices',
    weight: '500g', // Default weight (updated)
    rating: 4.9,
    reviews: 2847,
    isBestSeller: true,
    lowStockThreshold: 20,
    isInStock: true,
    sku: 'PM-GM-500', // Default SKU (updated)
    ingredients: ['Cinnamon', 'Cardamom', 'Cloves', 'Cumin', 'Coriander', 'Black Pepper', 'Bay Leaves'],
    benefits: ['Improves digestion', 'Boosts metabolism', 'Rich in antioxidants'],
    usageIdeas: ['Add to curries', 'Sprinkle on rice dishes', 'Perfect for biryanis'],
    weightOptions: [
      {
        weight: '100g',
        price: 80,
        originalPrice: 100,
        sku: 'PM-GM-100',
        stock: 150
      },
      {
        weight: '250g',
        price: 150,
        originalPrice: 190,
        sku: 'PM-GM-250',
        stock: 120
      },
      {
        weight: '500g',
        price: 270,
        originalPrice: 380,
        sku: 'PM-GM-500',
        stock: 100
      },
      {
        weight: '1kg',
        price: 590,
        originalPrice: 750,
        sku: 'PM-GM-1KG',
        stock: 80
      }
    ]
  },

  // Combo Packs - 500g
  {
    id: 'combo-haldi-chilli',
    name: 'Combo Pack: Haldi + Chilli',
    nameHindi: 'कॉम्बो पैक: हल्दी + मिर्च',
    description: 'Perfect combo of Haldi + Chilli for everyday cooking needs.',
    price: 175, // Base price for 250g combo (reduced by ₹40)
    originalPrice: 270, // Original price higher than current
    image: '/products/combo-pack-2-spice.jpg',
    category: 'Combo Packs',
    weight: '250g', // Default weight (updated)
    rating: 4.8,
    reviews: 1234,
    isNew: true,
    lowStockThreshold: 15,
    isInStock: true,
    sku: 'PM-COMBO-HC-250', // Default SKU (updated)
    ingredients: ['Haldi', 'Red Chilli'],
    benefits: ['Complete spice solution', 'Cost effective', 'Fresh quality'],
    usageIdeas: ['Daily cooking', 'All curries', 'Rice dishes'],
    weightOptions: [
      {
        weight: '250g (250g each)',
        price: 175,
        originalPrice: 270,
        sku: 'PM-COMBO-HC-250',
        stock: 110
      },
      {
        weight: '500g (500g each)',
        price: 320,
        originalPrice: 450,
        sku: 'PM-COMBO-HC-500',
        stock: 75
      }
    ]
  },

  {
    id: 'combo-dhaniya-chilli',
    name: 'Combo Pack: Dhaniya + Chilli',
    nameHindi: 'कॉम्बो पैक: धनिया + मिर्च',
    description: 'Essential combo of Dhaniya + Chilli for authentic Indian flavors.',
    price: 150, // Base price for 250g combo (updated - total 500g)
    originalPrice: 190, // Original price higher than current
    image: '/products/combo-pack-2-spice.jpg',
    category: 'Combo Packs',
    weight: '250g', // Default weight (updated)
    rating: 4.7,
    reviews: 987,
    isNew: true,
    lowStockThreshold: 12,
    isInStock: true,
    sku: 'PM-COMBO-DC-250', // Default SKU (updated)
    ingredients: ['Dhaniya', 'Red Chilli'],
    benefits: ['Perfect pair', 'Authentic taste', 'Value for money'],
    usageIdeas: ['Curries', 'Dal', 'Vegetable dishes'],
    weightOptions: [
      {
        weight: '250g (250g each)',
        price: 150,
        originalPrice: 190,
        sku: 'PM-COMBO-DC-250',
        stock: 90
      },
      {
        weight: '500g (500g each)',
        price: 240,
        originalPrice: 350,
        sku: 'PM-COMBO-DC-500',
        stock: 60
      }
    ]
  },

  {
    id: 'combo-haldi-dhaniya',
    name: 'Combo Pack: Haldi + Dhaniya',
    nameHindi: 'कॉम्बो पैक: हल्दी + धनिया',
    description: 'Classic combination of Haldi + Dhaniya for traditional cooking.',
    price: 155, // Base price for 250g combo (updated - total 500g)
    originalPrice: 195, // Original price higher than current
    image: '/products/combo-pack-2-spice.jpg',
    category: 'Combo Packs',
    weight: '250g', // Default weight (updated)
    rating: 4.8,
    reviews: 1456,
    isNew: true,
    lowStockThreshold: 15,
    isInStock: true,
    sku: 'PM-COMBO-HD-250', // Default SKU (updated)
    ingredients: ['Haldi', 'Dhaniya'],
    benefits: ['Health benefits', 'Traditional combo', 'Premium quality'],
    usageIdeas: ['Dal tadka', 'Curry base', 'Vegetable cooking'],
    weightOptions: [
      {
        weight: '250g (250g each)',
        price: 155,
        originalPrice: 195,
        sku: 'PM-COMBO-HD-250',
        stock: 105
      },
      {
        weight: '500g (500g each)',
        price: 220,
        originalPrice: 320,
        sku: 'PM-COMBO-HD-500',
        stock: 85
      }
    ]
  },

  {
    id: 'combo-haldi-dhaniya-mirchi',
    name: 'Combo Pack: Haldi + Dhaniya + Mirchi',
    nameHindi: 'कॉम्बो पैक: हल्दी + धनिया + मिर्च',
    description: 'Complete spice trio - Haldi + Dhaniya + Mirchi for all your cooking needs.',
    price: 210, // Base price for 250g combo (reduced by ₹40)
    originalPrice: 310, // Original price higher than current
    image: '/products/combo-pack-3-spice.jpg',
    category: 'Combo Packs',
    weight: '250g', // Default weight (updated)
    rating: 4.9,
    reviews: 2134,
    isBestSeller: true,
    lowStockThreshold: 18,
    isInStock: true,
    sku: 'PM-COMBO-HDM-250', // Default SKU (updated)
    ingredients: ['Haldi', 'Dhaniya', 'Red Chilli'],
    benefits: ['Complete solution', 'All-in-one', 'Best value'],
    usageIdeas: ['All Indian dishes', 'Complete cooking', 'Restaurant style'],
    weightOptions: [
      {
        weight: '250g (mixed 250g each)',
        price: 210,
        originalPrice: 310,
        sku: 'PM-COMBO-HDM-250',
        stock: 125
      },
      {
        weight: '500g (mixed 500g each)',
        price: 390,
        originalPrice: 530,
        sku: 'PM-COMBO-HDM-500',
        stock: 95
      }
    ]
  },

  // Ultimate Combo
  {
    id: 'combo-ultimate',
    name: 'Ultimate Combo: Haldi + Mirchi + Dhaniya + Garam Masala',
    nameHindi: 'अल्टीमेट कॉम्बो: हल्दी + मिर्च + धनिया + गरम मसाला',
    description: 'Complete spice solution with all four essential spices for authentic Indian cooking.',
    price: 190, // Base price for 100g combo (updated - total 400g)
    originalPrice: 240, // Original price higher than current
    image: '/products/combo-pack-ultimate.jpg',
    category: 'Combo Packs',
    weight: '100g', // Default weight
    rating: 4.9,
    reviews: 1876,
    isBestSeller: true,
    isNew: true,
    lowStockThreshold: 30,
    isInStock: true,
    sku: 'PM-COMBO-ULTIMATE-100', // Default SKU
    ingredients: ['Haldi', 'Red Chilli', 'Dhaniya', 'Garam Masala'],
    benefits: ['Complete spice kit', 'All-in-one solution', 'Perfect for beginners'],
    usageIdeas: ['All Indian dishes', 'Complete cooking', 'Starter kit', 'Travel pack'],
    weightOptions: [
      {
        weight: '100g (100g each)',
        price: 190,
        originalPrice: 240,
        sku: 'PM-COMBO-ULTIMATE-100',
        stock: 150
      }
    ]
  }
];

export const categories = [
  { id: 'all', name: 'All Spices', count: products.length },
  { id: 'Pure Spices', name: 'Pure Spices', count: products.filter(p => p.category === 'Pure Spices').length },
  { id: 'Blended Spices', name: 'Blended Spices', count: products.filter(p => p.category === 'Blended Spices').length },
  { id: 'Whole Spices', name: 'Whole Spices', count: products.filter(p => p.category === 'Whole Spices').length },
  { id: 'Combo Packs', name: 'Combo Packs', count: products.filter(p => p.category === 'Combo Packs').length },
];

export const recipes = [
  {
    id: 'dal-tadka',
    title: 'Dal Tadka',
    titleHindi: 'दाल तड़का',
    image: '/recipes/dal-tadka.jpg',
    time: '30 mins',
    difficulty: 'Easy',
    spicesUsed: ['Haldi', 'Dhaniya', 'Red Chilli'],
    description: 'Classic comfort dal with aromatic tempering using our pure spices.',
    ingredients: [
      '1 cup Arhar Dal (Toor Dal)',
      '1 tsp Prayan Haldi Powder',
      '1 tsp Prayan Dhaniya Powder', 
      '1/2 tsp Prayan Red Chilli Powder',
      '2 tbsp Ghee',
      '1 tsp Cumin Seeds',
      '2 Green Chillies',
      '1 Onion (chopped)',
      '2 Tomatoes (chopped)',
      'Salt to taste',
      'Fresh Coriander for garnish'
    ],
    instructions: [
      'Wash and cook dal with haldi and salt in pressure cooker for 3-4 whistles',
      'Heat ghee in pan, add cumin seeds',
      'Add green chillies and onions, sauté till golden',
      'Add tomatoes, cook till soft',
      'Add dhaniya powder and red chilli powder, cook for 1 minute',
      'Add cooked dal, mix well and simmer for 5 minutes',
      'Garnish with fresh coriander and serve hot with rice'
    ],
    tips: [
      'Use Prayan Haldi for beautiful golden color',
      'Prayan Dhaniya powder gives authentic aroma',
      'Adjust Prayan Red Chilli as per taste'
    ]
  },
  {
    id: 'chicken-curry',
    title: 'Chicken Curry',
    titleHindi: 'चिकन करी',
    image: '/recipes/chicken-curry.jpg',
    time: '45 mins',
    difficulty: 'Medium',
    spicesUsed: ['Haldi', 'Dhaniya', 'Red Chilli', 'Garam Masala'],
    description: 'Rich and flavorful chicken curry using all four Prayan masalas.',
    ingredients: [
      '500g Chicken (cut in pieces)',
      '1 tsp Prayan Haldi Powder',
      '2 tsp Prayan Dhaniya Powder',
      '1 tsp Prayan Red Chilli Powder',
      '1 tsp Prayan Garam Masala',
      '2 Onions (sliced)',
      '3 Tomatoes (chopped)',
      '1 tbsp Ginger-Garlic Paste',
      '3 tbsp Oil',
      'Salt to taste',
      'Fresh Coriander for garnish'
    ],
    instructions: [
      'Marinate chicken with haldi, salt and half red chilli powder for 20 minutes',
      'Heat oil, fry chicken pieces till golden, remove and keep aside',
      'In same oil, add onions and fry till golden brown',
      'Add ginger-garlic paste, cook for 2 minutes',
      'Add tomatoes, cook till soft and mushy',
      'Add dhaniya powder, remaining red chilli powder, cook for 2 minutes',
      'Add fried chicken, mix well',
      'Add 1 cup water, cover and cook for 15 minutes',
      'Sprinkle garam masala, cook for 2 more minutes',
      'Garnish with coriander and serve with rice or roti'
    ],
    tips: [
      'Prayan Haldi gives beautiful color to chicken',
      'Use Prayan Garam Masala at the end for best aroma',
      'Prayan Dhaniya powder is the secret for authentic taste'
    ]
  },
  {
    id: 'aloo-gobi',
    title: 'Aloo Gobi',
    titleHindi: 'आलू गोभी',
    image: '/recipes/aloo-gobi.jpg',
    time: '25 mins',
    difficulty: 'Easy',
    spicesUsed: ['Haldi', 'Dhaniya', 'Red Chilli'],
    description: 'Classic dry vegetable dish with potatoes and cauliflower.',
    ingredients: [
      '2 Potatoes (cubed)',
      '1 Cauliflower (cut in florets)',
      '1 tsp Prayan Haldi Powder',
      '1 tsp Prayan Dhaniya Powder',
      '1/2 tsp Prayan Red Chilli Powder',
      '1 tsp Cumin Seeds',
      '2 Green Chillies',
      '1 inch Ginger (chopped)',
      '3 tbsp Oil',
      'Salt to taste',
      'Fresh Coriander for garnish'
    ],
    instructions: [
      'Heat oil in pan, add cumin seeds',
      'Add ginger and green chillies, sauté for 1 minute',
      'Add potatoes, cook for 5 minutes',
      'Add cauliflower florets',
      'Add haldi, dhaniya powder, red chilli powder and salt',
      'Mix well, cover and cook on low heat for 15 minutes',
      'Stir occasionally to prevent sticking',
      'Cook till vegetables are tender',
      'Garnish with fresh coriander and serve hot'
    ],
    tips: [
      'Prayan Haldi prevents vegetables from sticking',
      'Prayan Dhaniya powder enhances the natural flavors',
      'Cook on low heat for best results'
    ]
  },
  {
    id: 'biryani',
    title: 'Chicken Biryani',
    titleHindi: 'चिकन बिरयानी',
    image: '/recipes/biryani.jpg',
    time: '90 mins',
    difficulty: 'Hard',
    spicesUsed: ['Haldi', 'Red Chilli', 'Garam Masala'],
    description: 'Royal aromatic basmati rice layered with spiced chicken.',
    ingredients: [
      '500g Chicken',
      '2 cups Basmati Rice',
      '1 tsp Prayan Haldi Powder',
      '1 tsp Prayan Red Chilli Powder',
      '2 tsp Prayan Garam Masala',
      '1 cup Yogurt',
      '2 Onions (sliced and fried)',
      '1 tbsp Ginger-Garlic Paste',
      '4 tbsp Ghee',
      'Whole Spices (Bay leaves, Cardamom, Cinnamon)',
      'Saffron soaked in warm milk',
      'Salt to taste',
      'Fresh Mint and Coriander'
    ],
    instructions: [
      'Marinate chicken with yogurt, haldi, red chilli powder, 1 tsp garam masala, ginger-garlic paste and salt for 1 hour',
      'Soak basmati rice for 30 minutes',
      'Cook rice with whole spices and salt till 70% done, drain',
      'In heavy-bottomed pot, cook marinated chicken till tender',
      'Layer the cooked rice over chicken',
      'Sprinkle fried onions, remaining garam masala, mint, coriander',
      'Pour saffron milk and dots of ghee',
      'Cover with aluminum foil, then lid',
      'Cook on high heat for 3 minutes, then low heat for 45 minutes',
      'Let it rest for 10 minutes before opening',
      'Gently mix and serve hot'
    ],
    tips: [
      'Prayan Haldi gives beautiful color to chicken',
      'Prayan Garam Masala is essential for authentic biryani aroma',
      'Use dum cooking method for best results'
    ]
  },
  {
    id: 'paneer-masala',
    title: 'Paneer Masala',
    titleHindi: 'पनीर मसाला',
    image: '/recipes/paneer-masala.jpg',
    time: '30 mins',
    difficulty: 'Medium',
    spicesUsed: ['Haldi', 'Dhaniya', 'Red Chilli', 'Garam Masala'],
    description: 'Rich and creamy paneer curry with all Prayan spices.',
    ingredients: [
      '250g Paneer (cubed)',
      '1/2 tsp Prayan Haldi Powder',
      '1 tsp Prayan Dhaniya Powder',
      '1 tsp Prayan Red Chilli Powder',
      '1/2 tsp Prayan Garam Masala',
      '2 Onions (chopped)',
      '3 Tomatoes (chopped)',
      '1 tbsp Ginger-Garlic Paste',
      '1/4 cup Cream',
      '2 tbsp Oil',
      'Salt to taste',
      'Fresh Coriander for garnish'
    ],
    instructions: [
      'Heat oil in pan, lightly fry paneer cubes till golden, remove',
      'In same oil, add onions and cook till golden',
      'Add ginger-garlic paste, cook for 2 minutes',
      'Add tomatoes, cook till soft',
      'Add haldi, dhaniya powder, red chilli powder, cook for 2 minutes',
      'Add 1/2 cup water, cook till gravy thickens',
      'Add fried paneer, mix gently',
      'Add cream and garam masala, simmer for 3 minutes',
      'Garnish with coriander and serve hot'
    ],
    tips: [
      'Don\'t overcook paneer to keep it soft',
      'Prayan Garam Masala adds restaurant-style flavor',
      'Add cream at the end for rich texture'
    ]
  },
  {
    id: 'chole',
    title: 'Chole (Chickpea Curry)',
    titleHindi: 'छोले',
    image: '/recipes/chole.jpg',
    time: '40 mins',
    difficulty: 'Medium',
    spicesUsed: ['Haldi', 'Dhaniya', 'Red Chilli', 'Garam Masala'],
    description: 'Spicy and tangy chickpea curry perfect with bhature or rice.',
    ingredients: [
      '2 cups Chickpeas (soaked overnight)',
      '1 tsp Prayan Haldi Powder',
      '2 tsp Prayan Dhaniya Powder',
      '1 tsp Prayan Red Chilli Powder',
      '1 tsp Prayan Garam Masala',
      '2 Onions (chopped)',
      '3 Tomatoes (chopped)',
      '1 tbsp Ginger-Garlic Paste',
      '2 Green Chillies',
      '3 tbsp Oil',
      'Salt to taste',
      'Fresh Coriander for garnish'
    ],
    instructions: [
      'Pressure cook soaked chickpeas with haldi and salt for 4-5 whistles',
      'Heat oil in pan, add onions and cook till golden',
      'Add ginger-garlic paste and green chillies, cook for 2 minutes',
      'Add tomatoes, cook till soft and mushy',
      'Add dhaniya powder, red chilli powder, cook for 2 minutes',
      'Add cooked chickpeas with water, mix well',
      'Simmer for 15 minutes till gravy thickens',
      'Add garam masala, cook for 2 more minutes',
      'Garnish with coriander and serve hot'
    ],
    tips: [
      'Soak chickpeas overnight for better cooking',
      'Prayan Dhaniya powder gives authentic chole flavor',
      'Mash some chickpeas for thicker gravy'
    ]
  },
  {
    id: 'rajma',
    title: 'Rajma (Kidney Bean Curry)',
    titleHindi: 'राजमा',
    image: '/recipes/rajma.jpg',
    time: '50 mins',
    difficulty: 'Medium',
    spicesUsed: ['Haldi', 'Dhaniya', 'Red Chilli', 'Garam Masala'],
    description: 'Creamy kidney bean curry - a North Indian favorite.',
    ingredients: [
      '2 cups Rajma (soaked overnight)',
      '1 tsp Prayan Haldi Powder',
      '2 tsp Prayan Dhaniya Powder',
      '1 tsp Prayan Red Chilli Powder',
      '1 tsp Prayan Garam Masala',
      '2 Onions (chopped)',
      '3 Tomatoes (chopped)',
      '1 tbsp Ginger-Garlic Paste',
      '3 tbsp Oil',
      'Salt to taste',
      'Fresh Coriander for garnish'
    ],
    instructions: [
      'Pressure cook soaked rajma with haldi and salt for 6-7 whistles',
      'Heat oil, add onions and cook till golden brown',
      'Add ginger-garlic paste, cook for 2 minutes',
      'Add tomatoes, cook till completely soft',
      'Add dhaniya powder, red chilli powder, cook for 3 minutes',
      'Add cooked rajma with water, mix well',
      'Simmer for 20 minutes till gravy thickens',
      'Mash some rajma for thicker consistency',
      'Add garam masala, cook for 2 minutes',
      'Garnish with coriander and serve with rice'
    ],
    tips: [
      'Soak rajma for at least 8 hours',
      'Prayan Haldi helps in better cooking',
      'Slow cooking gives the best flavor'
    ]
  },
  {
    id: 'jeera-rice',
    title: 'Jeera Rice',
    titleHindi: 'जीरा राइस',
    image: '/recipes/jeera-rice.jpg',
    time: '20 mins',
    difficulty: 'Easy',
    spicesUsed: ['Haldi', 'Garam Masala'],
    description: 'Fragrant cumin rice with subtle spices.',
    ingredients: [
      '2 cups Basmati Rice',
      '1/2 tsp Prayan Haldi Powder',
      '1/2 tsp Prayan Garam Masala',
      '2 tsp Cumin Seeds',
      '2 Bay Leaves',
      '4 Green Cardamom',
      '1 inch Cinnamon',
      '2 tbsp Ghee',
      'Salt to taste',
      'Fresh Coriander for garnish'
    ],
    instructions: [
      'Wash and soak basmati rice for 20 minutes',
      'Heat ghee in heavy-bottomed pan',
      'Add cumin seeds, bay leaves, cardamom, cinnamon',
      'When cumin splutters, add drained rice',
      'Sauté rice for 2 minutes',
      'Add haldi powder, mix gently',
      'Add hot water (1:2 ratio), salt',
      'Bring to boil, then reduce heat to low',
      'Cover and cook for 15 minutes',
      'Sprinkle garam masala, mix gently',
      'Garnish with coriander and serve'
    ],
    tips: [
      'Prayan Haldi gives beautiful golden color',
      'Use aged basmati rice for best results',
      'Don\'t over-mix to avoid breaking rice'
    ]
  },
  {
    id: 'mixed-vegetable',
    title: 'Mixed Vegetable Curry',
    titleHindi: 'मिक्स वेजिटेबल करी',
    image: '/recipes/mixed-veg.jpg',
    time: '35 mins',
    difficulty: 'Easy',
    spicesUsed: ['Haldi', 'Dhaniya', 'Red Chilli', 'Garam Masala'],
    description: 'Healthy and colorful mixed vegetable curry with all Prayan spices.',
    ingredients: [
      '1 cup Potatoes (cubed)',
      '1 cup Cauliflower (florets)',
      '1 cup Green Beans (chopped)',
      '1 cup Carrots (cubed)',
      '1 tsp Prayan Haldi Powder',
      '1 tsp Prayan Dhaniya Powder',
      '1/2 tsp Prayan Red Chilli Powder',
      '1/2 tsp Prayan Garam Masala',
      '2 Onions (chopped)',
      '2 Tomatoes (chopped)',
      '3 tbsp Oil',
      'Salt to taste',
      'Fresh Coriander for garnish'
    ],
    instructions: [
      'Heat oil in pan, add onions and cook till golden',
      'Add all vegetables, mix well',
      'Add haldi, dhaniya powder, red chilli powder and salt',
      'Mix well, cover and cook for 10 minutes',
      'Add tomatoes, cook till soft',
      'Add 1/2 cup water if needed',
      'Cover and cook till vegetables are tender',
      'Sprinkle garam masala, mix gently',
      'Cook for 2 more minutes',
      'Garnish with coriander and serve hot'
    ],
    tips: [
      'Cut all vegetables in equal size for even cooking',
      'Prayan Haldi enhances the natural colors',
      'Add vegetables as per seasonal availability'
    ]
  },
  {
    id: 'haldi-doodh',
    title: 'Haldi Doodh (Golden Milk)',
    titleHindi: 'हल्दी दूध',
    image: '/recipes/haldi-doodh.jpg',
    time: '10 mins',
    difficulty: 'Easy',
    spicesUsed: ['Haldi', 'Garam Masala'],
    description: 'Healthy and immunity-boosting golden milk with pure haldi.',
    ingredients: [
      '2 cups Milk',
      '1 tsp Prayan Haldi Powder',
      '1/4 tsp Prayan Garam Masala',
      '1 tbsp Honey or Jaggery',
      '1/2 tsp Ghee',
      'Pinch of Black Pepper',
      'Few Almonds (optional)'
    ],
    instructions: [
      'Heat milk in a saucepan',
      'Add Prayan Haldi powder, mix well',
      'Add a pinch of garam masala and black pepper',
      'Simmer for 5 minutes, stirring occasionally',
      'Add ghee and mix',
      'Strain if needed for smooth texture',
      'Add honey or jaggery as per taste',
      'Garnish with chopped almonds if desired',
      'Serve hot before bedtime'
    ],
    tips: [
      'Use pure Prayan Haldi for maximum benefits',
      'Add honey only when milk is warm, not hot',
      'Best consumed at night for better sleep'
    ]
  },
  {
    id: 'tadka-dal',
    title: 'Simple Tadka Dal',
    titleHindi: 'सिंपल तड़का दाल',
    image: '/recipes/simple-dal.jpg',
    time: '25 mins',
    difficulty: 'Easy',
    spicesUsed: ['Haldi', 'Red Chilli'],
    description: 'Quick and simple dal with basic Prayan spices.',
    ingredients: [
      '1 cup Moong Dal',
      '1 tsp Prayan Haldi Powder',
      '1/2 tsp Prayan Red Chilli Powder',
      '1 tsp Cumin Seeds',
      '2 Green Chillies',
      '1 inch Ginger (chopped)',
      '2 tbsp Ghee',
      'Salt to taste',
      'Fresh Coriander for garnish'
    ],
    instructions: [
      'Wash moong dal and cook with haldi and salt in pressure cooker for 3 whistles',
      'Heat ghee in pan, add cumin seeds',
      'Add green chillies and ginger, sauté for 1 minute',
      'Add red chilli powder, cook for 30 seconds',
      'Add cooked dal, mix well',
      'Simmer for 5 minutes',
      'Adjust consistency with water if needed',
      'Garnish with fresh coriander',
      'Serve hot with rice or roti'
    ],
    tips: [
      'Prayan Haldi gives beautiful color and aids digestion',
      'Adjust red chilli powder as per taste preference',
      'Perfect comfort food for any time'
    ]
  },
  {
    id: 'spiced-rice',
    title: 'Spiced Rice',
    titleHindi: 'मसाला चावल',
    image: '/recipes/spiced-rice.jpg',
    time: '25 mins',
    difficulty: 'Easy',
    spicesUsed: ['Haldi', 'Garam Masala'],
    description: 'Aromatic spiced rice perfect as a side dish.',
    ingredients: [
      '2 cups Basmati Rice',
      '1/2 tsp Prayan Haldi Powder',
      '1 tsp Prayan Garam Masala',
      '1 Bay Leaf',
      '4 Green Cardamom',
      '1 inch Cinnamon',
      '1 tsp Cumin Seeds',
      '2 tbsp Ghee',
      'Salt to taste'
    ],
    instructions: [
      'Wash and soak rice for 20 minutes',
      'Heat ghee in heavy-bottomed pan',
      'Add whole spices and cumin seeds',
      'When aromatic, add drained rice',
      'Sauté for 2 minutes',
      'Add haldi powder, mix gently',
      'Add hot water (1:2 ratio) and salt',
      'Bring to boil, then simmer on low heat',
      'Cover and cook for 15 minutes',
      'Sprinkle garam masala, mix gently',
      'Let it rest for 5 minutes before serving'
    ],
    tips: [
      'Prayan Haldi gives lovely golden color',
      'Prayan Garam Masala adds royal aroma',
      'Perfect accompaniment to any curry'
    ]
  }
];