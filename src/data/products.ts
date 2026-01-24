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
    price: 200, // Base price for 500g (updated)
    image: '/products/TurmericPowder.jpeg',
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
        sku: 'PM-H-250',
        stock: 200
      },
      {
        weight: '500g',
        price: 200,
        sku: 'PM-H-500',
        stock: 150
      },
      {
        weight: '1kg',
        price: 350,
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
    price: 210, // Base price for 500g (updated)
    image: '/products/Chillipowder.jpeg',
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
        sku: 'PM-C-250',
        stock: 180
      },
      {
        weight: '500g',
        price: 210,
        sku: 'PM-C-500',
        stock: 140
      },
      {
        weight: '1kg',
        price: 370,
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
    image: '/products/CuminPowder.jpeg',
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
        sku: 'PM-D-250',
        stock: 200
      },
      {
        weight: '500g',
        price: 120,
        sku: 'PM-D-500',
        stock: 160
      },
      {
        weight: '1kg',
        price: 240,
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
    price: 310, // Base price for 500g (updated)
    image: '/products/GaramMasala.jpeg',
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
        sku: 'PM-GM-100',
        stock: 150
      },
      {
        weight: '250g',
        price: 150,
        sku: 'PM-GM-250',
        stock: 120
      },
      {
        weight: '500g',
        price: 310,
        sku: 'PM-GM-500',
        stock: 100
      },
      {
        weight: '1kg',
        price: 630,
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
    price: 215, // Base price for 250g combo (updated - total 500g)
    originalPrice: 210,
    image: '/products/combo-pack.jpeg',
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
        price: 215,
        originalPrice: 240,
        sku: 'PM-COMBO-HC-250',
        stock: 110
      },
      {
        weight: '500g (500g each)',
        price: 360,
        originalPrice: 370,
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
    originalPrice: 140,
    image: '/products/combo-pack.jpeg',
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
        originalPrice: 170,
        sku: 'PM-COMBO-DC-250',
        stock: 90
      },
      {
        weight: '500g (500g each)',
        price: 280,
        originalPrice: 280,
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
    originalPrice: 145,
    image: '/products/combo-pack.jpeg',
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
        originalPrice: 175,
        sku: 'PM-COMBO-HD-250',
        stock: 105
      },
      {
        weight: '500g (500g each)',
        price: 260,
        originalPrice: 260,
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
    price: 250, // Base price for 250g combo (updated - total 500g)
    originalPrice: 250,
    image: '/products/combo-pack.jpeg',
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
        price: 250,
        originalPrice: 280,
        sku: 'PM-COMBO-HDM-250',
        stock: 125
      },
      {
        weight: '500g (mixed 500g each)',
        price: 430,
        originalPrice: 450,
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
    originalPrice: 220,
    image: '/products/combo-pack.jpeg',
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
        originalPrice: 220,
        sku: 'PM-COMBO-ULTIMATE-100',
        stock: 150
      }
    ]
  }
];

export const categories = [
  { id: 'all', name: 'All Spices', count: products.length },
  { id: 'pure-spices', name: 'Pure Spices', count: products.filter(p => p.category === 'Pure Spices').length },
  { id: 'blended-spices', name: 'Blended Spices', count: products.filter(p => p.category === 'Blended Spices').length },
  { id: 'whole-spices', name: 'Whole Spices', count: products.filter(p => p.category === 'Whole Spices').length },
  { id: 'combo-packs', name: 'Combo Packs', count: products.filter(p => p.category === 'Combo Packs').length },
];

export const recipes = [
  {
    id: 'butter-chicken',
    title: 'Butter Chicken',
    titleHindi: 'बटर चिकन',
    image: '/recipes/butter-chicken.jpg',
    time: '45 mins',
    difficulty: 'Medium',
    spicesUsed: ['Garam Masala', 'Kashmiri Red Chilli', 'Cumin'],
    description: 'Creamy, rich butter chicken that melts in your mouth.'
  },
  {
    id: 'hyderabadi-biryani',
    title: 'Hyderabadi Biryani',
    titleHindi: 'हैदराबादी बिरयानी',
    image: '/recipes/biryani.jpg',
    time: '90 mins',
    difficulty: 'Hard',
    spicesUsed: ['Biryani Masala', 'Cardamom', 'Saffron'],
    description: 'Authentic Hyderabadi dum biryani with layers of flavor.'
  },
  {
    id: 'paneer-tikka',
    title: 'Paneer Tikka Masala',
    titleHindi: 'पनीर टिक्का मसाला',
    image: '/recipes/paneer-tikka.jpg',
    time: '35 mins',
    difficulty: 'Easy',
    spicesUsed: ['Garam Masala', 'Kashmiri Red Chilli', 'Kitchen King'],
    description: 'Restaurant-style paneer tikka masala at home.'
  },
  {
    id: 'dal-tadka',
    title: 'Dal Tadka',
    titleHindi: 'दाल तड़का',
    image: '/recipes/dal-tadka.jpg',
    time: '30 mins',
    difficulty: 'Easy',
    spicesUsed: ['Cumin', 'Turmeric', 'Garam Masala'],
    description: 'Comforting dal with aromatic tempering.'
  }
];