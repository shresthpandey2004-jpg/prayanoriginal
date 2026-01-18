export interface Product {
  id: string;
  name: string;
  nameHindi?: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  weight: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  ingredients?: string[];
  benefits?: string[];
  usageIdeas?: string[];
  // Inventory Management (optional for now)
  stock?: number;
  lowStockThreshold?: number;
  isInStock?: boolean;
  sku?: string;
}

export const products: Product[] = [
  {
    id: 'garam-masala',
    name: 'Garam Masala',
    nameHindi: 'गरम मसाला',
    description: 'A perfect blend of aromatic spices that brings warmth and depth to your dishes. Hand-ground using traditional methods.',
    price: 249,
    originalPrice: 299,
    image: '/products/GaramMasala.jpeg',
    category: 'Blended Spices',
    weight: '100g',
    rating: 4.9,
    reviews: 2847,
    isBestSeller: true,
    ingredients: ['Cinnamon', 'Cardamom', 'Cloves', 'Cumin', 'Coriander', 'Black Pepper', 'Bay Leaves'],
    benefits: ['Improves digestion', 'Boosts metabolism', 'Rich in antioxidants'],
    usageIdeas: ['Add to curries', 'Sprinkle on rice dishes', 'Perfect for biryanis'],
    stock: 150,
    lowStockThreshold: 20,
    isInStock: true,
    sku: 'PM-GM-100'
  },
  {
    id: 'turmeric-powder',
    name: 'Turmeric Powder',
    nameHindi: 'हल्दी पाउडर',
    description: 'Pure and vibrant turmeric sourced from the finest farms. Known for its golden color and medicinal properties.',
    price: 149,
    originalPrice: 179,
    image: '/products/TurmericPowder.jpeg',
    category: 'Pure Spices',
    weight: '200g',
    rating: 4.8,
    reviews: 3214,
    isBestSeller: true,
    stock: 200,
    lowStockThreshold: 30,
    isInStock: true,
    sku: 'PM-TP-200',
    ingredients: ['100% Pure Turmeric'],
    benefits: ['Anti-inflammatory', 'Immunity booster', 'Skin health'],
    usageIdeas: ['Golden milk', 'Curries', 'Rice dishes', 'Face masks']
  },
  {
    id: 'red-chilli-powder',
    name: 'Kashmiri Red Chilli',
    nameHindi: 'कश्मीरी लाल मिर्च',
    description: 'Premium Kashmiri red chilli that gives your dishes a beautiful red color with mild heat.',
    price: 199,
    originalPrice: 249,
    image: '/products/Chillipowder.jpeg',
    category: 'Pure Spices',
    weight: '100g',
    rating: 4.7,
    reviews: 1876,
    isNew: true,
    ingredients: ['100% Kashmiri Red Chilli'],
    benefits: ['Rich in Vitamin C', 'Metabolism booster', 'Natural color'],
    usageIdeas: ['Tandoori dishes', 'Gravies', 'Marinades'],
    stock: 120,
    lowStockThreshold: 25,
    isInStock: true,
    sku: 'PM-RC-100'
  },
  {
    id: 'cumin-powder',
    name: 'Cumin Powder',
    nameHindi: 'जीरा पाउडर',
    description: 'Aromatic cumin powder with a warm, earthy flavor. Essential for authentic Indian cooking.',
    price: 169,
    originalPrice: 199,
    image: '/products/CuminPowder.jpeg',
    category: 'Pure Spices',
    weight: '100g',
    rating: 4.9,
    reviews: 1987,
    isBestSeller: true,
    ingredients: ['100% Pure Cumin Seeds'],
    benefits: ['Improves digestion', 'Iron-rich', 'Immunity booster'],
    usageIdeas: ['Dal', 'Rice dishes', 'Raita', 'Chaas'],
    stock: 140,
    lowStockThreshold: 25,
    isInStock: true,
    sku: 'PM-CU-100'
  },
  {
    id: 'kitchen-king',
    name: 'Kitchen King Masala',
    nameHindi: 'किचन किंग मसाला',
    description: 'The all-purpose masala that makes every vegetable dish delicious.',
    price: 159,
    originalPrice: 199,
    image: '/products/KitchenKing.jpeg',
    category: 'Blended Spices',
    weight: '100g',
    rating: 4.6,
    reviews: 2341,
    isNew: true,
    ingredients: ['Coriander', 'Cumin', 'Red Chilli', 'Turmeric', 'Dried Mango', 'Fenugreek'],
    benefits: ['Versatile', 'Time-saving', 'Consistent taste'],
    usageIdeas: ['Vegetable curries', 'Paneer dishes', 'Dal'],
    stock: 125,
    lowStockThreshold: 20,
    isInStock: true,
    sku: 'PM-KK-100'
  },
  {
    id: 'tomato-powder',
    name: 'Tomato Powder',
    nameHindi: 'टमाटर पाउडर',
    description: 'Pure dehydrated tomato powder that adds rich tangy flavor and natural color to your dishes.',
    price: 179,
    originalPrice: 219,
    image: '/products/TomatoPowder.jpeg',
    category: 'Pure Spices',
    weight: '100g',
    rating: 4.7,
    reviews: 1456,
    isNew: true,
    ingredients: ['100% Pure Tomato'],
    benefits: ['Rich in lycopene', 'Natural flavor enhancer', 'No preservatives'],
    usageIdeas: ['Curries', 'Soups', 'Pasta sauces', 'Pizza base'],
    stock: 95,
    lowStockThreshold: 20,
    isInStock: true,
    sku: 'PM-TP-100'
  },
  {
    id: 'ginger-powder',
    name: 'Ginger Powder',
    nameHindi: 'अदरक पाउडर',
    description: 'Dried ginger powder with intense flavor and aroma. Perfect for both cooking and health benefits.',
    price: 189,
    originalPrice: 229,
    image: '/products/GingerPowder.jpeg',
    category: 'Pure Spices',
    weight: '100g',
    rating: 4.8,
    reviews: 1876,
    isNew: true,
    ingredients: ['100% Pure Dried Ginger'],
    benefits: ['Aids digestion', 'Anti-inflammatory', 'Immunity booster'],
    usageIdeas: ['Tea', 'Curries', 'Baking', 'Kadha'],
    stock: 110,
    lowStockThreshold: 25,
    isInStock: true,
    sku: 'PM-GP-100'
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
