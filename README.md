# Yakshita - Personal Portfolio

A stunning personal portfolio website for a Food Technologist & Visual Designer, featuring a beautiful pastel-on-dark theme with interactive Three.js animations, GSAP transitions, and modern web technologies.

## ✨ Features

### 🎨 Design & Aesthetics
- **Pastel-on-Dark Theme**: Beautiful color palette with muted lavender, mint green, powder pink, baby blue, and soft peach
- **Glassmorphism UI**: Subtle glass effects with backdrop blur and transparency
- **Responsive Design**: Fully responsive across all devices
- **Custom Cursor**: Interactive cursor with trailing particles
- **Smooth Animations**: GSAP-powered scroll animations and transitions

### 🚀 Interactive Elements
- **Three.js Background**: Animated blob with morphing capabilities (pizza, ramen, cupcake shapes)
- **Particle Systems**: Interactive particle backgrounds throughout the site
- **Floating 3D Objects**: Rotating utensils and food-related items
- **Scroll-Triggered Animations**: Elements animate as they come into view
- **Hover Effects**: Beautiful hover states with color transitions

### 📱 Sections
1. **Landing Page**: Hero section with profile image, animated blob, and particle system
2. **About Me**: Personal story with molecular food particles animation
3. **Projects**: Horizontal scrolling project cards split into Food Tech and Design categories
4. **Skills**: Grid of floating pastel icons with 3D objects
5. **Contact**: Floating contact form with social media links

### 🎵 Extra Features
- **Theme Toggle**: Switch between dark and deep midnight blue themes
- **Music Toggle**: Background music control (placeholder)
- **Easter Egg**: Click the blob to see it morph into food shapes
- **Custom Scrollbar**: Styled scrollbar with pastel colors

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Three.js** - 3D graphics and animations
- **React Three Fiber** - React renderer for Three.js
- **GSAP** - Professional animation library
- **Locomotive Scroll** - Smooth scrolling
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Framer Motion** - Animation library

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/yakshita-portfolio.git
   cd yakshita-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## 📁 Project Structure

```
yakshita-portfolio/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── ThreeComponents/  # Three.js components
│   │   │   ├── AnimatedBlob.jsx
│   │   │   ├── ParticleSystem.jsx
│   │   │   └── FloatingObjects.jsx
│   │   ├── Landing.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   ├── Contact.jsx
│   │   ├── CustomCursor.jsx
│   │   ├── ThemeToggle.jsx
│   │   ├── MusicToggle.jsx
│   │   └── LoadingScreen.jsx
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # React entry point
│   └── index.css          # Global styles
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🎨 Customization

### Colors
The color palette is defined in `tailwind.config.js`:
- `pastel-lavender`: #E6E6FA
- `pastel-mint`: #F0FFF0
- `pastel-pink`: #FFE4E1
- `pastel-blue`: #E0F6FF
- `pastel-peach`: #FFE5D9

### Content
- Update personal information in each component
- Replace placeholder images with your own
- Modify project data in `Projects.jsx`
- Update skills list in `Skills.jsx`
- Change contact information in `Contact.jsx`

### Animations
- GSAP animations are configured in each component
- Three.js animations can be modified in the ThreeComponents folder
- Custom CSS animations are in `index.css`

## 🌐 Deployment

### GitHub Pages
1. Build the project: `npm run build`
2. Push to GitHub
3. Enable GitHub Pages in repository settings
4. Set source to `/docs` or GitHub Actions

### Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy with one click

### Netlify
1. Build the project: `npm run build`
2. Drag the `dist` folder to Netlify
3. Or connect your GitHub repository for automatic deployments

## 🎯 Performance

- **Lazy Loading**: Components load as needed
- **Optimized Images**: WebP format with proper sizing
- **Code Splitting**: Automatic code splitting with Vite
- **Tree Shaking**: Unused code is automatically removed
- **Minification**: Production builds are minified

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help, feel free to:
- Open an issue on GitHub
- Contact me through the portfolio contact form
- Reach out on social media

---

**Made with ❤️ by Yakshita - Food Technologist & Visual Designer** 