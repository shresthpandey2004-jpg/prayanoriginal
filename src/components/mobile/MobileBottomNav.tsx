import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingBag, User, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { totalItems } = useCart();
  const { user } = useAuth();

  const navItems = [
    {
      icon: Home,
      label: 'Home',
      path: '/',
      active: location.pathname === '/'
    },
    {
      icon: Search,
      label: 'Shop',
      path: '/shop',
      active: location.pathname === '/shop'
    },
    {
      icon: ShoppingBag,
      label: 'Cart',
      path: '/cart',
      active: location.pathname === '/cart',
      badge: totalItems > 0 ? totalItems : undefined
    },
    {
      icon: Heart,
      label: 'Recipes',
      path: '/recipes',
      active: location.pathname.startsWith('/recipes')
    },
    {
      icon: User,
      label: user ? 'Account' : 'Login',
      path: user ? '/account' : '/auth',
      active: location.pathname === '/account' || location.pathname === '/auth'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 lg:hidden">
      <div className="flex items-center justify-around py-2 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200 min-w-[60px] relative",
                "tap-highlight-transparent focus:outline-none border-none",
                item.active
                  ? "text-orange-600 bg-orange-50"
                  : "text-gray-500 hover:text-orange-600 hover:bg-orange-50"
              )}
              style={{
                WebkitTapHighlightColor: 'transparent',
                outline: 'none',
                border: 'none'
              }}
            >
              <div className="relative">
                <Icon size={20} className="mb-1" />
                {item.badge && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;