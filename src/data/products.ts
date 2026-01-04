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
  // Inventory Management
  stock: number;
  lowStockThreshold: number;
  isInStock: boolean;
  sku: string;
}

export const products: Product[] = [
  {
    id: 'garam-masala',
    name: 'Garam Masala',
    nameHindi: 'गरम मसाला',
    description: 'A perfect blend of aromatic spices that brings warmth and depth to your dishes. Hand-ground using traditional methods.',
    price: 249,
    originalPrice: 299,
    image: '/products/garam-masala.jpg',
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
    image: '/products/turmeric.jpg',
    category: 'Pure Spices',
    weight: '200g',
    rating: 4.8,
    reviews: 3214,
    isBestSeller: true,
    stock: 200,
    lowStockThreshold: 30,
    isInStock: true,
    sku: 'PM-TP-200'
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
    image: '/products/red-chilli.jpg',
    category: 'Pure Spices',
    weight: '100g',
    rating: 4.7,
    reviews: 1876,
    isNew: true,
    ingredients: ['100% Kashmiri Red Chilli'],
    benefits: ['Rich in Vitamin C', 'Metabolism booster', 'Natural color'],
    usageIdeas: ['Tandoori dishes', 'Gravies', 'Marinades']
  },
  {
    id: 'coriander-powder',
    name: 'Coriander Powder',
    nameHindi: 'धनिया पाउडर',
    description: 'Freshly ground coriander seeds with a citrusy, earthy flavor that enhances any dish.',
    price: 129,
    originalPrice: 159,
    image: '/products/coriander.jpg',
    category: 'Pure Spices',
    weight: '200g',
    rating: 4.8,
    reviews: 2156,
    ingredients: ['100% Pure Coriander Seeds'],
    benefits: ['Aids digestion', 'Rich in fiber', 'Good for skin'],
    usageIdeas: ['Curries', 'Chutneys', 'Marinades']
  },
  {
    id: 'cumin-powder',
    name: 'Cumin Powder',
    nameHindi: 'जीरा पाउडर',
    description: 'Aromatic cumin powder with a warm, earthy flavor. Essential for authentic Indian cooking.',
    price: 169,
    originalPrice: 199,
    image: '/products/cumin.jpg',
    category: 'Pure Spices',
    weight: '100g',
    rating: 4.9,
    reviews: 1987,
    isBestSeller: true,
    ingredients: ['100% Pure Cumin Seeds'],
    benefits: ['Improves digestion', 'Iron-rich', 'Immunity booster'],
    usageIdeas: ['Dal', 'Rice dishes', 'Raita', 'Chaas']
  },
  {
    id: 'biryani-masala',
    name: 'Biryani Masala',
    nameHindi: 'बिरयानी मसाला',
    description: 'A royal blend for the perfect biryani. Crafted with 18 hand-picked spices.',
    price: 279,
    originalPrice: 349,
    image: '/products/biryani-masala.jpg',
    category: 'Blended Spices',
    weight: '100g',
    rating: 4.9,
    reviews: 3456,
    isBestSeller: true,
    ingredients: ['Bay Leaves', 'Cardamom', 'Cinnamon', 'Cloves', 'Mace', 'Nutmeg', 'Star Anise', 'and more'],
    benefits: ['Authentic taste', 'Premium quality', 'No preservatives'],
    usageIdeas: ['Chicken Biryani', 'Mutton Biryani', 'Veg Pulao']
  },
  {
    id: 'sambar-powder',
    name: 'Sambar Powder',
    nameHindi: 'सांभर पाउडर',
    description: 'Traditional South Indian sambar powder with the perfect balance of spices.',
    price: 189,
    originalPrice: 229,
    image: '/products/sambar.jpg',
    category: 'Blended Spices',
    weight: '200g',
    rating: 4.7,
    reviews: 1654,
    ingredients: ['Coriander', 'Red Chilli', 'Fenugreek', 'Cumin', 'Turmeric', 'Curry Leaves'],
    benefits: ['Authentic taste', 'Traditional recipe', 'No artificial colors'],
    usageIdeas: ['Sambar', 'Rasam', 'Vegetable stews']
  },
  {
    id: 'kitchen-king',
    name: 'Kitchen King Masala',
    nameHindi: 'किचन किंग मसाला',
    description: 'The all-purpose masala that makes every vegetable dish delicious.',
    price: 159,
    originalPrice: 199,
    image: '/products/kitchen-king.jpg',
    category: 'Blended Spices',
    weight: '100g',
    rating: 4.6,
    reviews: 2341,
    isNew: true,
    ingredients: ['Coriander', 'Cumin', 'Red Chilli', 'Turmeric', 'Dried Mango', 'Fenugreek'],
    benefits: ['Versatile', 'Time-saving', 'Consistent taste'],
    usageIdeas: ['Vegetable curries', 'Paneer dishes', 'Dal']
  },
  {
    id: 'chat-masala',
    name: 'Chat Masala',
    nameHindi: 'चाट मसाला',
    description: 'Tangy and spicy chat masala that adds a burst of flavor to any snack.',
    price: 99,
    originalPrice: 129,
    image: '/products/chat-masala.jpg',
    category: 'Blended Spices',
    weight: '100g',
    rating: 4.8,
    reviews: 2876,
    ingredients: ['Dried Mango', 'Black Salt', 'Cumin', 'Coriander', 'Mint', 'Ginger'],
    benefits: ['Appetizer', 'Digestive', 'Low sodium'],
    usageIdeas: ['Fruits', 'Salads', 'Chaats', 'Raita']
  },
  {
    id: 'cardamom',
    name: 'Green Cardamom',
    nameHindi: 'हरी इलायची',
    description: 'Premium green cardamom pods with intense aroma. Perfect for desserts and chai.',
    price: 449,
    originalPrice: 549,
    image: '/products/cardamom.jpg',
    category: 'Whole Spices',
    weight: '50g',
    rating: 4.9,
    reviews: 1234,
    isNew: true,
    ingredients: ['100% Green Cardamom Pods'],
    benefits: ['Freshens breath', 'Aids digestion', 'Aromatic'],
    usageIdeas: ['Tea', 'Desserts', 'Biryani', 'Kheer']
  },
  {
    id: 'combo-essential',
    name: 'Essential Spice Box',
    nameHindi: 'जरूरी मसाला डब्बा',
    description: 'Complete spice box with 6 essential spices for everyday Indian cooking.',
    price: 599,
    originalPrice: 799,
    image: '/products/combo-box.jpg',
    category: 'Combo Packs',
    weight: '600g',
    rating: 4.9,
    reviews: 4567,
    isBestSeller: true,
    ingredients: ['Turmeric', 'Red Chilli', 'Coriander', 'Cumin', 'Garam Masala', 'Kitchen King'],
    benefits: ['Value pack', 'Complete kitchen solution', 'Premium quality'],
    usageIdeas: ['Daily cooking', 'Gift set', 'New kitchen starter']
  },
  {
    id: 'combo-festive',
    name: 'Festive Gift Box',
    nameHindi: 'त्यौहार उपहार बॉक्स',
    description: 'Premium gift box with curated spices, perfect for festivals and celebrations.',
    price: 999,
    originalPrice: 1299,
    image: '/products/gift-box.jpg',
    category: 'Combo Packs',
    weight: '800g',
    rating: 5.0,
    reviews: 876,
    isNew: true,
    ingredients: ['Biryani Masala', 'Garam Masala', 'Cardamom', 'Saffron', 'Special Blend'],
    benefits: ['Premium packaging', 'Ideal gift', 'Authentic taste'],
    usageIdeas: ['Diwali gifts', 'Wedding gifts', 'Housewarming']
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
