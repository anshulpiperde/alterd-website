import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSlide {
  id: string;
  image: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: '1',
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900',
    headline: 'New Collection',
    subheadline: 'Discover our latest arrivals for the season',
    ctaText: 'Shop Now',
    ctaLink: '#/new'
  },
  {
    id: '2',
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900',
    headline: 'Trending Now',
    subheadline: 'Most-loved styles of the moment',
    ctaText: 'Explore Trending',
    ctaLink: '#/trending'
  },
  {
    id: '3',
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900',
    headline: 'The Alterd Story',
    subheadline: 'Duality, desire, and transformation',
    ctaText: 'About Us',
    ctaLink: '#/about'
  }
];

const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <section 
      className="relative h-[640px] md:h-[480px] lg:h-[640px] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.headline}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-2xl px-6">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                {slide.headline}
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                {slide.subheadline}
              </p>
              <a
                href={slide.ctaLink}
                className="inline-block bg-dark-text text-dark-bg px-8 py-3 text-lg font-semibold hover:bg-dark-text-secondary transition-colors duration-300"
              >
                {slide.ctaText}
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-10 hover:bg-opacity-20 text-white p-2 rounded-full transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-10 hover:bg-opacity-20 text-white p-2 rounded-full transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;