# Project Structure Documentation

## ✅ Correct Structure for Vercel Deployment

```
my-frontend/
├── public/                        # Static files (served as-is)
│   ├── images/                   # Put public images here
│   └── videos/                   # Put public videos here
│
├── src/                          # Source code
│   ├── assets/                   # Assets imported in code
│   │   ├── images/               # Images imported via import statements
│   │   └── videos/               # Videos imported via import statements
│   │
│   ├── components/               # React components
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   └── TopBanner.jsx
│   │
│   ├── pages/                    # Page components (React Router)
│   │   ├── Home.jsx
│   │   ├── Services.jsx
│   │   ├── Booking.jsx
│   │   ├── Contact.jsx
│   │   └── PortraitGallery.jsx
│   │
│   ├── styles/                   # CSS files
│   │   ├── main.css
│   │   └── Navbar.css
│   │
│   ├── App.jsx                   # Main app component (React Router setup)
│   ├── main.jsx                  # App entry point
│   └── index.css                 # Global styles
│
├── .env.example                  # Environment variables template
├── .env.local                    # (⚠️ NOT committed) Local env vars
├── .gitignore                    # Git ignore rules
├── eslint.config.js              # ESLint configuration
├── index.html                    # HTML entry point
├── package.json                  # Dependencies & scripts
├── package-lock.json             # Dependency lock file
├── vite.config.js                # Vite build configuration
├── vercel.json                   # ✅ Vercel deployment configuration
├── DEPLOYMENT.md                 # Full deployment guide
├── VERCEL-QUICKSTART.md          # Quick start guide
└── README.md                     # Project readme
```

## 📁 Key Directories Explained

### `/public` - Static Files
Files here are served **as-is** without processing.

**Access in code:**
```jsx
<img src="/images/logo.png" alt="Logo" />
<video src="/videos/demo.mp4" />
```

**Best for:**
- Images that are always shown
- Videos
- Static assets
- Manifest files

### `/src/assets` - Imported Assets
Files here are **processed** by Vite during build.

**Access in code:**
```jsx
import logo from '../assets/images/logo.png';
import video from '../assets/videos/demo.mp4';

<img src={logo} alt="Logo" />
<video src={video} />
```

**Best for:**
- Images imported in components
- Videos used in specific components
- Assets that need optimization

### `/src/components` - React Components
Reusable UI components.

```
components/
├── Navbar.jsx       # Navigation bar
├── Footer.jsx       # Footer
└── TopBanner.jsx    # Top banner
```

### `/src/pages` - Page Components
Full page components used with React Router.

```
pages/
├── Home.jsx         # Route: /
├── Services.jsx     # Route: /services
├── Booking.jsx      # Route: /booking
├── Contact.jsx      # Route: /contact
└── PortraitGallery.jsx  # Route: /gallery/:type
```

### `/src/styles` - CSS Files
Global and component styles.

```
styles/
├── main.css         # Global styles
└── Navbar.css       # Navbar-specific styles
```

## 🔄 Build Output

When you run `npm run build`, Vite creates:

```
dist/                        # Production build (ready for Vercel)
├── index.html               # Main HTML file
├── assets/                  # Optimized assets
│   ├── index-xxxxx.js       # Bundled JavaScript
│   ├── index-xxxxx.css      # Bundled CSS
│   └── [images/videos]      # Optimized media
└── .vite/                   # Internal Vite files
```

**This `dist/` folder is deployed to Vercel.**

## ✅ Vercel Deployment Configuration

See these files for Vercel setup:

1. **`vercel.json`** - Vercel-specific configuration
   - Build commands
   - Output directory
   - SPA routing rules (critical for React Router)
   - Cache headers for assets

2. **`vite.config.js`** - Vite build configuration
   - Minification settings
   - Build optimizations
   - Development server settings

3. **`.env.example`** - Template for environment variables
   - Copy to `.env.local` for local development
   - Add actual values in Vercel Dashboard for production

## 🚀 File Organization Rules for Vercel

### ✅ DO:
- ✅ Place static files in `/public`
- ✅ Place component images in `/src/assets`
- ✅ Keep components small and focused
- ✅ Use semantic HTML
- ✅ Organize by feature (pages have own folders)

### ❌ DON'T:
- ❌ Put node_modules in static paths
- ❌ Hardcode absolute paths ("/path/to/file")
- ❌ Mix CSS and JS in same component files (unless using CSS-in-JS)
- ❌ Place sensitive files outside .gitignore
- ❌ Keep unused files

## 📊 Size Considerations

Monitor build size:
```bash
npm run build
```

Check output:
- Should see `dist/` folder size
- Vite will warn if chunks are too large (>500KB)

**Optimize if needed:**
- Remove unused dependencies
- Use dynamic imports for large components
- Compress images

## 🔗 File References in Code

### Correct Ways to Reference Files:

**Component import (handled by Vite):**
```jsx
import image from '../assets/images/photo.png';
<img src={image} alt="Photo" />
```

**Public file (direct URL):**
```jsx
<img src="/images/photo.png" alt="Photo" />
```

**Don't do this (will break on Vercel):**
```jsx
<img src="./images/photo.png" alt="Photo" />  ❌
<img src="C:/mypc/images/photo.png" alt="Photo" />  ❌
```

## 📋 Checklist

- [ ] All imports use relative paths (or Vite imports)
- [ ] No hardcoded absolute paths
- [ ] `.env.local` is in `.gitignore`
- [ ] `node_modules` is in `.gitignore`
- [ ] `dist/` is in `.gitignore`
- [ ] `vercel.json` exists in root
- [ ] `vite.config.js` has build settings
- [ ] React Router is properly configured in `App.jsx`
- [ ] All components are in `/src/components`
- [ ] All pages are in `/src/pages`

## 🎯 Next Steps

1. Verify this structure matches your project
2. Fix any path issues in components
3. Run `npm run build` to test
4. Push to GitHub
5. Deploy via Vercel Dashboard

**Structure ready for Vercel! ✅**
