import React from 'react';
import { featuredCollections } from '../data/mockData';

const FeaturedCollections: React.FC = () => {
  return (
    <section className="py-16 bg-dark-bg-secondary">
      <div className="max-w-[1280px] mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-dark-text">Featured Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCollections.map((collection) => (
            <a
              key={collection.id}
              href={collection.link}
              className="group relative overflow-hidden aspect-[4/5]"
            >
              <img
                src={collection.image}
                alt={collection.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{collection.title}</h3>
                <p className="text-sm opacity-90 mb-4">{collection.subtitle}</p>
                <span className="inline-block border-b border-white pb-1 text-sm font-medium group-hover:border-opacity-50 transition-all duration-300">
                  Explore Collection
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;