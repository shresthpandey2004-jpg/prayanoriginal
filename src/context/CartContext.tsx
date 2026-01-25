import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  weight: string;
}

interface DiscountCode {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minAmount?: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  discountCode: string;
  discountAmount: number;
  applyDiscountCode: (code: string) => boolean;
  removeDiscountCode: () => void;
  finalPrice: number;
  isFreeShipping: boolean;
}

const DISCOUNT_CODES: DiscountCode[] = [
  {
    code: 'PRAYAN10',
    discount: 10,
    type: 'percentage',
    minAmount: 0
  },
  {
    code: 'WELCOME20',
    discount: 20,
    type: 'percentage',
    minAmount: 500
  },
  {
    code: 'SAVE50',
    discount: 50,
    type: 'fixed',
    minAmount: 300
  }
];

// All orders now have free shipping!
const FREE_SHIPPING_THRESHOLD = 0;

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('prayan-cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState<string>(() => {
    return localStorage.getItem('prayan-discount-code') || '';
  });
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem('prayan-cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('prayan-discount-code', discountCode);
    calculateDiscount();
  }, [discountCode, items]);

  const calculateDiscount = () => {
    if (!discountCode) {
      setDiscountAmount(0);
      return;
    }

    const code = DISCOUNT_CODES.find(c => c.code.toLowerCase() === discountCode.toLowerCase());
    if (!code) {
      setDiscountAmount(0);
      return;
    }

    const subtotal = totalPrice;
    if (code.minAmount && subtotal < code.minAmount) {
      setDiscountAmount(0);
      return;
    }

    if (code.type === 'percentage') {
      setDiscountAmount(Math.round((subtotal * code.discount) / 100));
    } else {
      setDiscountAmount(code.discount);
    }
  };

  const applyDiscountCode = (code: string): boolean => {
    const validCode = DISCOUNT_CODES.find(c => c.code.toLowerCase() === code.toLowerCase());
    if (!validCode) {
      return false;
    }

    const subtotal = totalPrice;
    if (validCode.minAmount && subtotal < validCode.minAmount) {
      return false;
    }

    setDiscountCode(code.toUpperCase());
    return true;
  };

  const removeDiscountCode = () => {
    setDiscountCode('');
    setDiscountAmount(0);
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
    setDiscountCode('');
    setDiscountAmount(0);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const finalPrice = Math.max(0, totalPrice - discountAmount);
  const isFreeShipping = true; // All orders have free shipping now!

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
        discountCode,
        discountAmount,
        applyDiscountCode,
        removeDiscountCode,
        finalPrice,
        isFreeShipping,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
