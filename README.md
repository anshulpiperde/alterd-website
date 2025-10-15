# ALTERD - Modern E-Commerce Website

A sophisticated, Zara-inspired e-commerce website built with React, TypeScript, and Tailwind CSS.

![Alterd Website](https://img.shields.io/badge/Status-Live-success)
![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38bdf8)

## ✨ Features

- 🛍️ **Product Catalog** - Browse curated collections of fashion items
- 🔍 **Smart Search** - Find products quickly with search overlay
- 🛒 **Shopping Cart** - Add items to bag with size and color selection
- 👁️ **Quick View** - Preview products without leaving the page
- 💝 **Wishlist** - Save favorite items for later
- 📱 **Responsive Design** - Perfect on desktop, tablet, and mobile
- 🎨 **Zara-Inspired UI** - Minimalist gray and white aesthetic
- ⚡ **Fast Performance** - Built with Vite for lightning-fast loads
- 🎯 **TypeScript** - Type-safe code for better reliability

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/alterd-website.git

# Navigate to project directory
cd alterd-website

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to view the site.

## 📦 Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

The build output will be in the `dist/` directory.

## 🌐 Deploy to Vercel

### Quick Deploy (5 minutes)
```bash
npm install -g vercel
vercel login
vercel --prod
```

See [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) for fastest deployment methods.
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment guide.

## 🎨 Design System

### Color Palette
- **zara-white**: #FFFFFF
- **zara-off-white**: #FAFAFA (main background)
- **zara-light-gray**: #F5F5F5 (secondary backgrounds)
- **zara-medium-gray**: #E5E5E5 (borders)
- **zara-charcoal**: #737373 (secondary text)
- **zara-near-black**: #262626 (primary text and buttons)

### Typography
- Font: System fonts for optimal performance
- Headings: Bold, uppercase for impact
- Body: Medium weight for readability

## 📁 Project Structure

```
project/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Header.tsx
│   │   ├── ProductCard.tsx
│   │   ├── CartDrawer.tsx
│   │   └── ...
│   ├── pages/          # Page components
│   │   ├── ProductDetail.tsx
│   │   ├── NewArrivals.tsx
│   │   └── ...
│   ├── data/           # Mock data and content
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── public/             # Static assets
├── tailwind.config.js  # Tailwind configuration
├── vite.config.ts      # Vite configuration
└── package.json        # Dependencies
```

## 🛠️ Tech Stack

- **Framework**: React 18.3.1
- **Language**: TypeScript 5.5.3
- **Styling**: Tailwind CSS 3.4.1
- **Build Tool**: Vite 5.4.2
- **Icons**: Lucide React
- **Routing**: Hash-based routing (SPA)

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Design inspired by Zara's minimalist aesthetic
- Icons by [Lucide](https://lucide.dev/)
- Built with [Vite](https://vitejs.dev/)

## 📞 Support

For support, email support@alterd.com or create an issue in this repository.

---

**Made with ❤️ by the Alterd Team**
