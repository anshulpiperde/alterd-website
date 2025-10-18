import { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchOverlay from './components/SearchOverlay';
import HeroBanner from './components/HeroBanner';
import FeaturedCollections from './components/FeaturedCollections';
import ProductGrid from './components/ProductGrid';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import About from './pages/About';
import NewArrivals from './pages/NewArrivals';
import Trending from './pages/Trending';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import { mockProducts } from './data/mockData';
import { CartItem, Product } from './types';

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [route, setRoute] = useState<string>(window.location.hash.slice(1) || '/');

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash.slice(1) || '/');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleAddToCart = (product: Product, size: string, color: string, quantity: number) => {
    const existingItemIndex = cartItems.findIndex(
      item => item.product.id === product.id && item.size === size && item.color === color
    );

    if (existingItemIndex > -1) {
      const newItems = [...cartItems];
      newItems[existingItemIndex].quantity += quantity;
      setCartItems(newItems);
    } else {
      const newItem: CartItem = {
        id: `${product.id}-${size}-${color}`,
        product,
        size,
        color,
        quantity
      };
      setCartItems([...cartItems, newItem]);
    }
    
    // Open cart drawer to show the added item
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleAddToWishlist = (productId: string) => {
    console.log('Added to wishlist:', productId);
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const getProductFromRoute = (): Product | null => {
    const match = route.match(/^\/product\/(.+)$/);
    if (match) {
      const id = match[1];
      return mockProducts.find(p => p.id === id) || null;
    }
    return null;
  };

  const homeNewArrivals = mockProducts.filter(p => p.isNew && p.category !== 'men' && p.category !== 'kids');
  const homeTrending = [...mockProducts]
    .filter(p => p.category !== 'men' && p.category !== 'kids')
    .sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-dark-bg">
      <Header 
        cartCount={totalCartItems}
        onSearchToggle={() => setIsSearchOpen(true)}
        onCartOpen={() => setIsCartOpen(true)}
      />
      
      <SearchOverlay 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <main>
        {route === '/' && (
          <>
            <HeroBanner />
            <FeaturedCollections />
            <ProductGrid 
              products={homeNewArrivals}
              title="New Arrivals"
              viewAllLink="#/new"
              onQuickView={handleQuickView}
              onAddToWishlist={handleAddToWishlist}
            />
            <ProductGrid 
              products={homeTrending}
              title="Trending Now"
              viewAllLink="#/trending"
              onQuickView={handleQuickView}
              onAddToWishlist={handleAddToWishlist}
            />
          </>
        )}

        {route === '/new' && (
          <NewArrivals 
            onQuickView={handleQuickView}
            onAddToWishlist={handleAddToWishlist}
          />
        )}

        {route === '/trending' && (
          <Trending 
            onQuickView={handleQuickView}
            onAddToWishlist={handleAddToWishlist}
          />
        )}

        {route === '/about' && <About />}

        {route === '/cart' && (
          <Cart 
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
        )}

        {route.startsWith('/product/') && (
          <ProductDetail 
            product={getProductFromRoute()}
            onAddToCart={handleAddToCart}
          />
        )}
      </main>

      <Footer />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <QuickViewModal 
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onAddToCart={handleAddToCart}
      />
      <ChatWidget />
    </div>
  );
}

export default App;