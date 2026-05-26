# LAMBORGHINI 3D Website

A stunning, interactive 3D Lamborghini showcase website built with modern web technologies. This project features immersive 3D visualizations, smooth animations, and a premium user experience.

## 🚀 Features

- **3D Car Models**: Interactive 3D Lamborghini models powered by Three.js
- **Smooth Animations**: Professional animations using GSAP and Framer Motion
- **Responsive Design**: Mobile-friendly design with Tailwind CSS
- **360° View**: Interactive 360-degree car view
- **Video Integration**: High-quality hero and showcase videos
- **Performance Section**: Detailed performance metrics and specifications
- **Heritage Section**: Brand history and legacy information
- **Tech Section**: Advanced technology features showcase
- **Models Section**: Display of different Lamborghini models
- **Optimized Performance**: Built with Next.js for fast loading and SEO

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 14
- **UI Library**: React 18
- **3D Graphics**: Three.js
- **Animations**: GSAP & Framer Motion
- **Styling**: Tailwind CSS
- **JavaScript**: Modern ES6+ with JSConfig support

## 📦 Project Structure

```
LAMBORGHINI/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.js            # Root layout component
│   └── page.js              # Home page
├── components/
│   ├── Navbar.jsx           # Navigation component
│   ├── ThreeScene.jsx       # 3D scene setup
│   ├── VideoHero.jsx        # Hero video component
│   ├── VideoShowcase.jsx    # Video showcase
│   ├── View360.jsx          # 360-degree view
│   └── sections/            # Page sections
│       ├── FooterSection.jsx
│       ├── HeritageSection.jsx
│       ├── HeroSection.jsx
│       ├── ModelsSection.jsx
│       ├── PerformanceSection.jsx
│       ├── TechSection.jsx
│       └── View360Section.jsx
├── public/
│   └── cars/                # Car model assets
├── next.config.mjs          # Next.js configuration
├── tailwind.config.js       # Tailwind CSS config
├── postcss.config.js        # PostCSS config
└── jsconfig.json            # JavaScript config
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/thenitishmind/LAMBORGHINI.git
cd LAMBORGHINI
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Customization

### Adding New 3D Models
Place your 3D model files in the `public/cars/` directory and reference them in the `ThreeScene.jsx` component.

### Modifying Sections
Edit components in the `components/sections/` directory to customize content, colors, and layouts.

### Styling
- Global styles: `app/globals.css`
- Tailwind configuration: `tailwind.config.js`
- Component-specific styles: inline with Tailwind classes

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file if needed for environment-specific settings.

### Next.js Configuration

Modify `next.config.mjs` to adjust Next.js settings and webpack configuration.

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy with a single click

### Other Platforms

The project can be deployed to any Node.js hosting platform:
- AWS
- DigitalOcean
- Heroku
- Netlify

Run `npm run build` to create an optimized production build.

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

Nitish Mind

## 🔗 Links

- **GitHub**: https://github.com/thenitishmind/LAMBORGHINI
- **Live Demo**: https://lamborghini-jade.vercel.app/

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests.

## 📞 Support

For issues and suggestions, please open an issue on GitHub.

---

**Made with ❤️ by Nitish **
