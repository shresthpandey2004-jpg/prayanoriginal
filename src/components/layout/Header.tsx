import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, ShoppingBag, User, ChevronDown, LogOut, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { products } from '@/data/products';

const navigation = [
  { name: 'Home', href: '/' },
  { 
    name: 'Shop', 
    href: '/shop',
    submenu: [
      { name: 'All Spices', href: '/shop' },
      { name: 'Pure Spices', href: '/shop?category=pure-spices' },
      { name: 'Blended Spices', href: '/shop?category=blended-spices' },
      { name: 'Whole Spices', href: '/shop?category=whole-spices' },
      { name: 'Combo Packs', href: '/shop?category=combo-packs' },
    ]
  },
  { name: 'Recipes', href: '/simple-recipes' },
  { name: 'Our Story', href: '/about' },
  { name: 'Export Inquiry', href: '/export' },
  { name: 'Contact', href: '/contact' },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 6); // Limit to 6 results
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleProductClick = (productId: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate(`/product/${productId}`);
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-accent text-accent-foreground text-center py-2 px-4 text-sm font-body">
        <p>
          🎉 FREE delivery on your first order | Use code <span className="font-semibold text-gold">PRAYAN10</span> for 10% off
        </p>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-background/95 backdrop-blur-md shadow-soft'
            : 'bg-background'
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 sm:h-20 header-mobile-layout lg:justify-between">
            {/* Mobile Menu Button */}
            <div className="header-mobile-menu lg:flex-shrink-0">
              <button
                className="lg:hidden p-2 -ml-2 flex-shrink-0"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            {/* Logo - Centered on mobile */}
            <div className="header-mobile-logo lg:flex lg:items-center lg:gap-3">
              <Link to="/" className="flex items-center gap-2 sm:gap-3">
                <div className="relative p-1 rounded-full bg-gradient-to-br from-orange-100 to-yellow-100 shadow-sm">
                  <img 
                    src="/prayan-new-logo.png" 
                    alt="PRAYAN Logo" 
                    className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-full"
                  />
                </div>
                <div className="hidden sm:block">
                  <h1 className="font-display text-xl sm:text-2xl font-bold text-foreground tracking-wide">PRAYAN</h1>
                  <p className="text-xs text-muted-foreground -mt-1">Swad Ki Nayi Yatra</p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.submenu && setActiveSubmenu(item.name)}
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  <Link
                    to={item.href}
                    className={cn(
                      'flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-lg',
                      location.pathname === item.href
                        ? 'text-primary bg-secondary'
                        : 'text-foreground hover:text-primary hover:bg-secondary/50'
                    )}
                  >
                    {item.name}
                    {item.submenu && <ChevronDown size={14} className="mt-0.5" />}
                  </Link>

                  {/* Dropdown */}
                  {item.submenu && activeSubmenu === item.name && (
                    <div className="absolute top-full left-0 pt-2 animate-fade-in">
                      <div className="bg-popover rounded-xl shadow-medium border border-border p-2 min-w-[200px]">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="block px-4 py-2 text-sm text-foreground hover:bg-secondary rounded-lg transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 header-mobile-actions">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 sm:p-2.5 rounded-full hover:bg-secondary transition-colors"
                aria-label="Search"
              >
                <Search size={18} className="sm:w-5 sm:h-5" />
              </button>

              {/* User Account */}
              <div className="relative">
                {isAuthenticated ? (
                  <div>
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center gap-2 p-2 sm:p-2.5 rounded-full hover:bg-secondary transition-colors"
                    >
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs sm:text-sm font-bold">
                          {user?.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 hidden sm:block" />
                    </button>
                    
                    {showUserMenu && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50">
                        <div className="p-3 border-b border-border">
                          <p className="font-medium text-sm">{user?.name}</p>
                          <p className="text-xs text-muted-foreground">{user?.email}</p>
                        </div>
                        <div className="py-2">
                          <Link
                            to="/account"
                            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary transition-colors"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <User className="w-4 h-4" />
                            My Account
                          </Link>
                          <Link
                            to="/my-orders"
                            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary transition-colors"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <ShoppingBag className="w-4 h-4" />
                            My Orders
                          </Link>
                          <Link
                            to="/loyalty"
                            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary transition-colors"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <Gift className="w-4 h-4" />
                            Loyalty Points
                          </Link>
                          <button
                            onClick={() => {
                              logout();
                              setShowUserMenu(false);
                            }}
                            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary transition-colors w-full text-left"
                          >
                            <LogOut className="w-4 h-4" />
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to="/auth"
                    className="hidden sm:flex p-2.5 rounded-full hover:bg-secondary transition-colors"
                    aria-label="Login"
                  >
                    <User size={20} />
                  </Link>
                )}
              </div>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 sm:p-2.5 rounded-full hover:bg-secondary transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag size={18} className="sm:w-5 sm:h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center animate-scale-in">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-background shadow-xl animate-slide-in-right overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <div className="flex items-center gap-3">
                    <div className="relative p-1 rounded-full bg-gradient-to-br from-orange-100 to-yellow-100 shadow-sm">
                      <img 
                        src="/prayan-new-logo.png" 
                        alt="PRAYAN Logo" 
                        className="w-8 h-8 object-contain rounded-full"
                      />
                    </div>
                    <div>
                      <div className="font-display text-lg sm:text-xl font-bold text-foreground">PRAYAN</div>
                      <div className="text-xs text-muted-foreground">Swad Ki Nayi Yatra</div>
                    </div>
                  </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-secondary rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="space-y-1 sm:space-y-2">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      to={item.href}
                      className={cn(
                        'block px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base',
                        location.pathname === item.href
                          ? 'bg-secondary text-primary'
                          : 'hover:bg-secondary'
                      )}
                    >
                      {item.name}
                    </Link>
                    {item.submenu && (
                      <div className="ml-3 sm:ml-4 mt-1 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="block px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border space-y-2 sm:space-y-3">
                {isAuthenticated ? (
                  <>
                    <Button variant="outline" className="w-full text-sm sm:text-base" asChild>
                      <Link to="/account">My Account</Link>
                    </Button>
                    <Button variant="outline" className="w-full text-sm sm:text-base" asChild>
                      <Link to="/my-orders">My Orders</Link>
                    </Button>
                    <Button variant="outline" className="w-full text-sm sm:text-base" asChild>
                      <Link to="/loyalty">Loyalty Points</Link>
                    </Button>
                    <Button variant="destructive" className="w-full text-sm sm:text-base" onClick={logout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="w-full text-sm sm:text-base" asChild>
                      <Link to="/my-orders">Track Order</Link>
                    </Button>
                    <Button variant="premium" className="w-full text-sm sm:text-base" asChild>
                      <Link to="/auth">Login / Sign Up</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-4 sm:pt-20 px-4">
          <div
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={() => setIsSearchOpen(false)}
          />
          <div className="relative w-full max-w-2xl animate-fade-in">
            <div className="bg-background rounded-2xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
              {/* Search Input */}
              <form onSubmit={handleSearchSubmit} className="p-3 sm:p-4 flex-shrink-0">
                <div className="flex items-center gap-3 sm:gap-4">
                  <Search size={20} className="text-muted-foreground flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search for spices, recipes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-base sm:text-lg outline-none placeholder:text-muted-foreground min-w-0"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="p-2 hover:bg-secondary rounded-full flex-shrink-0"
                  >
                    <X size={18} />
                  </button>
                </div>
              </form>

              {/* Search Results */}
              {searchQuery.trim() && (
                <div className="border-t border-border flex-1 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <div className="p-2">
                      <div className="text-sm text-muted-foreground px-3 py-2 font-medium">
                        Products ({searchResults.length})
                      </div>
                      {searchResults.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleProductClick(product.id)}
                          className="w-full flex items-center gap-3 p-3 hover:bg-secondary rounded-lg transition-colors text-left"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">{product.name}</div>
                            <div className="text-xs text-muted-foreground truncate">
                              {product.category} • ₹{product.price}
                            </div>
                          </div>
                        </button>
                      ))}
                      
                      {/* View All Results */}
                      <button
                        onClick={() => handleSearchSubmit({ preventDefault: () => {} } as React.FormEvent)}
                        className="w-full p-3 text-center text-sm text-primary hover:bg-secondary rounded-lg transition-colors border-t border-border mt-2"
                      >
                        View all results for "{searchQuery}"
                      </button>
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <div className="text-muted-foreground text-sm sm:text-base">
                        No products found for "{searchQuery}"
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                        Try searching for spices, masalas, or ingredients
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Quick Suggestions */}
              {!searchQuery.trim() && (
                <div className="border-t border-border p-3 sm:p-4 flex-shrink-0">
                  <div className="text-sm text-muted-foreground mb-3 font-medium">Popular Searches</div>
                  <div className="flex flex-wrap gap-2">
                    {['Garam Masala', 'Turmeric', 'Red Chili', 'Cumin', 'Coriander', 'Black Pepper'].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setSearchQuery(suggestion)}
                        className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm bg-secondary hover:bg-secondary/80 rounded-full transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
