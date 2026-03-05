# My Frontend - Studio Website

A modern React website built with Vite, featuring responsive design, React Router navigation, and optimized for Vercel deployment.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

Development server runs at: `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── TopBanner.jsx
├── pages/              # Page components (React Router)
│   ├── Home.jsx
│   ├── Services.jsx
│   ├── Booking.jsx
│   ├── Contact.jsx
│   └── PortraitGallery.jsx
├── assets/             # Images and videos imported in code
│   ├── images/
│   └── videos/
├── styles/             # CSS files
│   ├── main.css
│   └── Navbar.css
├── App.jsx             # Main app with routing
├── main.jsx            # Entry point
└── index.css           # Global styles

public/                 # Static assets
├── images/
└── videos/
```

## 🔧 Technology Stack

- **React 19** - UI library
- **Vite 7** - Build tool & dev server
- **React Router 7** - Client-side routing
- **ESLint** - Code quality
- **CSS** - Styling

## 🌐 Routing

All routes are configured in `App.jsx` using React Router:

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Home | Home page |
| `/services` | Services | Services listing |
| `/booking` | Booking | Booking page |
| `/contact` | Contact | Contact form |
| `/gallery/:type` | PortraitGallery | Gallery view |

## 📦 Available Scripts

```bash
# Development
npm run dev              # Start dev server with HMR

# Production
npm run build            # Build optimized production bundle
npm run preview          # Preview production build locally

# Code Quality
npm run lint             # Run ESLint checks
npm run lint --fix       # Auto-fix lint errors
```

## 🚢 Deployment

### Vercel Deployment (Recommended)

This project is fully configured for Vercel deployment.

**Quick Deploy:**
1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import the `website_design` repository
4. Set root directory to `my-frontend`
5. Click Deploy

**For detailed instructions, see:**
- 📖 [VERCEL-QUICKSTART.md](./VERCEL-QUICKSTART.md) - 5-minute setup
- 📖 [DEPLOYMENT.md](./DEPLOYMENT.md) - Complete guide
- 🔧 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Problem solutions

**Configuration Files:**
- `vercel.json` - Vercel deployment config
- `vite.config.js` - Build configuration
- `.env.example` - Environment variables template

## 🔐 Environment Variables

Create `.env.local` in project root (copy from `.env.example`):

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=My Frontend
```

For production, add variables in Vercel Dashboard:
- Settings → Environment Variables
- Variable names must start with `VITE_`

Usage in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## 📊 Build Output

Production build output:
```
dist/                    # Ready for Vercel
├── index.html           # Entry point
├── assets/              # Optimized JS/CSS/media
└── ...
```

Built with:
- Minification: terser
- CSS bundling: native
- Asset optimization: automatic
- Source maps: disabled (production)

## 🎨 Customization

### Adding New Pages

1. Create component in `src/pages/YourPage.jsx`
2. Add route in `App.jsx`:
   ```javascript
   import YourPage from "./pages/YourPage";
   
   <Route path="/your-path" element={<YourPage />} />
   ```
3. Update navigation links in `Navbar.jsx`

### Adding Components

1. Create component in `src/components/MyComponent.jsx`
2. Import and use in pages

### Styling

- Global styles: `src/styles/main.css`
- Component styles: `src/styles/ComponentName.css`
- CSS modules: optional at `src/components/Component.module.css`

### Assets

- **Imported assets** (optimized by Vite):
  ```javascript
  import image from '../assets/images/photo.jpg';
  ```

- **Public assets** (served as-is):
  ```jsx
  <img src="/images/photo.jpg" alt="Photo" />
  ```

## 🐛 Debugging

### Development

- VS Code: Auto-launch debugger with Vite
- Chrome DevTools: F12 → Sources tab for debugging
- Hot Module Replacement (HMR) enabled automatically

### Production

- Check build size: `npm run build` → view output
- Performance: Use Lighthouse (F12 → Lighthouse)
- Network: F12 → Network tab for asset loading times

## 📚 Documentation

- [PROJECT-STRUCTURE.md](./PROJECT-STRUCTURE.md) - Directory guide
- [CODE-FIXES.md](./CODE-FIXES.md) - Code guidelines
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Full deployment guide
- [VERCEL-QUICKSTART.md](./VERCEL-QUICKSTART.md) - Quick reference
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Problem solutions

## 🔗 Resources

- [Vite Documentation](https://vite.dev)
- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Vercel Documentation](https://vercel.com/docs)

## 📝 License

This project is created for personal/commercial use.

## ⚡ Performance

- First Load: ~1-2s (optimized)
- Lighthouse Score: 90+ (typical)
- Bundle Size: ~35KB gzipped (core)
- Code Splitting: Automatic

Optimize further with:
- Image compression
- Lazy loading routes
- Resource hints (preload/prefetch)
- Service Worker (PWA)

## 🤝 Contributing

When making changes:
1. Create feature branch: `git checkout -b feature/name`
2. Commit changes: `git commit -m "Add feature"`
3. Push branch: `git push origin feature/name`
4. Create pull request

## ⚠️ Common Issues

| Issue | Solution |
|-------|----------|
| Routes broken on Vercel | See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md#problem-2-routes-return-404-errors) |
| Images not loading | Check import paths in [CODE-FIXES.md](./CODE-FIXES.md) |
| Build fails | Run `npm run build` locally and fix errors |
| Environment vars undefined | Add `VITE_` prefix and in Vercel Dashboard |

## 📧 Support

For deployment questions, refer to:
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Solutions
- [Vercel Docs](https://vercel.com/docs)
- [Vite Docs](https://vite.dev)

---

**Ready to deploy?** Start with [VERCEL-QUICKSTART.md](./VERCEL-QUICKSTART.md) 🚀

