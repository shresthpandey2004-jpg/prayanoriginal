import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingBag, Heart, Truck, Shield, ArrowLeft, Plus, Minus } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = React.useState(1);
  const [selectedWeightIndex, setSelectedWeightIndex] = React.useState(0);

  const product = products.find(p => p.id === id);
  const relatedProducts = products.filter(p => p.id !== id && p.category === product?.category).slice(0, 4);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
  }

  // Get current selected weight option
  const selectedWeight = product.weightOptions[selectedWeightIndex];
  const currentPrice = selectedWeight.price;
  const currentOriginalPrice = selectedWeight.originalPrice;
  const currentWeight = selectedWeight.weight;
  const currentStock = selectedWeight.stock;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: currentPrice,
        image: product.image,
        weight: currentWeight,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <Link to="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8">
            <ArrowLeft size={18} /> Back to Shop
          </Link>

          {/* Product Section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Image */}
            <div className="relative rounded-3xl overflow-hidden bg-secondary aspect-square">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600'; }} />
              {product.isNew && <span className="absolute top-4 left-4 bg-accent text-accent-foreground text-sm font-bold px-4 py-2 rounded-full">NEW</span>}
            </div>

            {/* Details */}
            <div>
              <p className="text-gold font-medium uppercase tracking-wider mb-2">{product.category}</p>
              <h1 className="font-display text-4xl font-bold text-foreground mb-2">{product.name}</h1>
              {product.nameHindi && <p className="text-xl text-muted-foreground mb-4">{product.nameHindi}</p>}

              <div className="flex items-center gap-3 mb-6">
                <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} size={18} className={i < Math.floor(product.rating) ? 'text-gold fill-gold' : 'text-muted'} />)}</div>
                <span className="text-muted-foreground">({product.reviews.toLocaleString()} reviews)</span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-primary">₹{currentPrice}</span>
                {currentOriginalPrice && <span className="text-xl text-muted-foreground line-through">₹{currentOriginalPrice}</span>}
                <span className="bg-secondary px-3 py-1 rounded text-sm">{currentWeight}</span>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

              {/* Weight Selection */}
              {product.weightOptions.length > 1 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Select Weight:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {product.weightOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedWeightIndex(index)}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          selectedWeightIndex === index
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="text-sm font-medium">{option.weight}</div>
                        <div className="text-lg font-bold">₹{option.price}</div>
                        {option.originalPrice && (
                          <div className="text-xs text-muted-foreground line-through">₹{option.originalPrice}</div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-3 bg-secondary rounded-xl px-2">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                    className="p-3 hover:bg-muted rounded-lg"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-8 text-center font-semibold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)} 
                    className="p-3 hover:bg-muted rounded-lg"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <Button 
                  variant="hero" 
                  size="xl" 
                  onClick={handleAddToCart} 
                  className="flex-1 gap-2"
                >
                  <ShoppingBag size={20} /> 
                  Add to Cart
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-secondary/50 rounded-xl p-4">
                  <Truck className="text-gold" size={24} />
                  <div><p className="font-medium">Free First Order</p><p className="text-xs text-muted-foreground">FREE delivery on your first order!</p></div>
                </div>
                <div className="flex items-center gap-3 bg-secondary/50 rounded-xl p-4">
                  <Shield className="text-gold" size={24} />
                  <div><p className="font-medium">100% Authentic</p><p className="text-xs text-muted-foreground">Quality Guaranteed</p></div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-bold mb-6">You May Also Like</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProductDetail;
