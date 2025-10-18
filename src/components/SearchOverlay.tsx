import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { Product } from '../types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (query.trim()) {
      const filteredResults = mockProducts
        .filter(p => p.category !== 'men' && p.category !== 'kids')
        .filter(product =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
        );
      setResults(filteredResults.slice(0, 6));
    } else {
      setResults([]);
    }
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-dark-bg z-50">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex items-center justify-between h-18 border-b border-dark-border">
          <div className="flex-1 flex items-center">
            <Search size={20} className="text-dark-text-secondary mr-3" />
            <input
              type="text"
              placeholder="Search products, categories..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 text-lg outline-none bg-transparent text-dark-text placeholder:text-dark-text-muted"
              autoFocus
            />
          </div>
          <button onClick={onClose} className="p-2 hover:bg-dark-bg-hover rounded-full text-dark-text">
            <X size={24} />
          </button>
        </div>

        <div className="py-8">
          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((product) => (
                <a
                  key={product.id}
                  href={`#/product/${product.id}`}
                  className="flex items-center space-x-4 p-4 hover:bg-dark-bg-elevated transition-colors duration-200"
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium text-dark-text">{product.title}</h3>
                    <p className="text-sm text-dark-text-secondary">{product.subtitle}</p>
                    <p className="text-sm font-semibold text-dark-text">
                      ${product.price.current}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          ) : query.trim() ? (
            <div className="text-center py-12">
              <p className="text-dark-text-secondary">No results found for "{query}"</p>
              <p className="text-sm text-dark-text-muted mt-2">Try searching for something else</p>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-dark-text-secondary">Search for products, categories...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;