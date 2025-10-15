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
    <div className="fixed inset-0 bg-zara-white z-50">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex items-center justify-between h-18 border-b border-zara-medium-gray">
          <div className="flex-1 flex items-center">
            <Search size={20} className="text-zara-dark-gray mr-3" />
            <input
              type="text"
              placeholder="Search products, categories..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 text-lg outline-none text-zara-near-black placeholder:text-zara-dark-gray"
              autoFocus
            />
          </div>
          <button onClick={onClose} className="p-2 hover:bg-zara-light-gray rounded-full text-zara-near-black">
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
                  className="flex items-center space-x-4 p-4 hover:bg-zara-light-gray transition-colors duration-200"
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium text-zara-near-black">{product.title}</h3>
                    <p className="text-sm text-zara-charcoal">{product.subtitle}</p>
                    <p className="text-sm font-semibold text-zara-near-black">
                      ${product.price.current}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          ) : query.trim() ? (
            <div className="text-center py-12">
              <p className="text-zara-charcoal">No results found for "{query}"</p>
              <p className="text-sm text-zara-dark-gray mt-2">Try searching for something else</p>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-zara-charcoal">Search for products, categories...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;