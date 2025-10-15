import { Product, Collection } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Structured Blazer',
    subtitle: 'Premium Collection',
    price: { current: 129, currency: 'USD' },
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'women',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['black', 'navy', 'beige'],
    isNew: true,
    rating: { average: 4.5, count: 128 },
    stock: 15
  },
  {
    id: '2',
    title: 'Silk Midi Dress',
    subtitle: 'Evening Collection',
    price: { current: 89, original: 129, currency: 'USD' },
    images: [
      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'women',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['black', 'emerald', 'burgundy'],
    onSale: true,
    rating: { average: 4.3, count: 89 },
    stock: 8
  },
  {
    id: '3',
    title: 'Tailored Trousers',
    subtitle: 'Essential Collection',
    price: { current: 79, currency: 'USD' },
    images: [
      'https://images.pexels.com/photos/1066176/pexels-photo-1066176.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'women',
    sizes: ['24', '26', '28', '30', '32'],
    colors: ['black', 'navy', 'charcoal'],
    isNew: true,
    rating: { average: 4.7, count: 203 },
    stock: 22
  },
  {
    id: '4',
    title: 'Cashmere Sweater',
    subtitle: 'Luxury Collection',
    price: { current: 159, currency: 'USD' },
    images: [
      'https://images.pexels.com/photos/1006220/pexels-photo-1006220.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'women',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['cream', 'black', 'camel'],
    rating: { average: 4.8, count: 156 },
    stock: 12
  },
  {
    id: '5',
    title: 'Classic Shirt',
    subtitle: 'Essential Collection',
    price: { current: 49, currency: 'USD' },
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'men',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['white', 'blue', 'black'],
    rating: { average: 4.4, count: 312 },
    stock: 28
  },
  {
    id: '6',
    title: 'Leather Jacket',
    subtitle: 'Premium Collection',
    price: { current: 299, currency: 'USD' },
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    category: 'men',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['black', 'brown'],
    rating: { average: 4.9, count: 87 },
    stock: 6
  }
];

export const featuredCollections: Collection[] = [
  {
    id: '1',
    title: 'New Arrivals',
    subtitle: 'Latest drops for every self',
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600&h=750',
    link: '#/new'
  },
  {
    id: '2',
    title: 'Trending',
    subtitle: 'Most-loved right now',
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600&h=750',
    link: '#/trending'
  },
  {
    id: '3',
    title: 'About Alterd',
    subtitle: 'Our story, our philosophy',
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600&h=750',
    link: '#/about'
  }
];