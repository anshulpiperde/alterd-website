import React, { useState } from 'react';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onSearchToggle: () => void;
  onCartOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onSearchToggle, onCartOpen }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Home', link: '#/' },
    { id: 'new', label: 'New Arrivals', link: '#/new' },
    { id: 'trending', label: 'Trending', link: '#/trending' },
    { id: 'about', label: 'About Us', link: '#/about' },
    { id: 'cart', label: 'Cart', link: '#/cart' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-dark-bg/95 backdrop-blur-sm border-b border-dark-border">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex items-center justify-between h-18">
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex items-center">
            <a href="#/" className="flex items-center">
              <img 
                src="/alterd-logo-f1.jpg" 
                alt="ALTERD" 
                className="h-8 w-auto"
              />
            </a>
          </div>
  
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Primary">
            {navigationItems.map((item) => (
              <a
                key={item.id}
                href={item.link}
                className="text-sm font-medium text-dark-text hover:text-dark-text-secondary transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 hover:bg-dark-bg-hover rounded-full transition-colors duration-200 text-dark-text"
              onClick={onSearchToggle}
              aria-label="Search products"
            >
              <Search size={20} />
            </button>
            
            <button className="hidden md:block p-2 hover:bg-dark-bg-hover rounded-full transition-colors duration-200 text-dark-text">
              <User size={20} />
            </button>
            <button 
              className="relative p-2 hover:bg-dark-bg-hover rounded-full transition-colors duration-200 text-dark-text"
              onClick={onCartOpen}
              aria-label="Shopping bag"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-dark-text text-dark-bg text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-dark-border py-4">
            <nav className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  className="text-base font-medium text-dark-text hover:text-dark-text-secondary transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;