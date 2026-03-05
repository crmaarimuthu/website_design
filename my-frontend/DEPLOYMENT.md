# Vercel Deployment Guide for My Frontend

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [Step-by-Step Deployment](#step-by-step-deployment)
4. [Project Configuration](#project-configuration)
5. [Environment Variables](#environment-variables)
6. [Troubleshooting](#troubleshooting)
7. [Performance Optimization](#performance-optimization)
8. [Best Practices](#best-practices)

---

## Prerequisites

Before deploying to Vercel, ensure you have:

- ✅ **Node.js** (v16 or higher) installed locally
- ✅ **npm** or **yarn** package manager
- ✅ **Git** repository initialized with code pushed to GitHub
- ✅ **GitHub Account** (Vercel integrates with GitHub)
- ✅ **Vercel Account** (sign up at [vercel.com](https://vercel.com))

### Verify Installation

```bash
node --version
npm --version
git --version
```

---

## Quick Start

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Visit Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com) and sign in

2. **Click "Add New..."** → **"Project"**

3. **Import Git Repository**
   - Select your GitHub repository (`website_design`)
   - The root directory should be: `my-frontend`

4. **Configure Project**
   - Framework Preset: **Vite**
   - Build Command: `npm run build` (should auto-detect)
   - Output Directory: `dist` (should auto-detect)
   - Install Command: `npm install` (should auto-detect)

5. **Deploy**
   - Click "Deploy" and wait for build to complete
   - Your site will be live on a `.vercel.app` domain

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
cd my-frontend
vercel

# For production deployment
vercel --prod
```

---

## Step-by-Step Deployment

### Step 1: Prepare Your Repository

```bash
# Make sure you're in the project root
cd my-frontend

# Commit all changes
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Step 2: Update package.json (if needed)

The `package.json` includes all required scripts:
- `npm run dev` - Local development
- `npm run build` - Production build
- `npm run lint` - ESLint checks
- `npm run preview` - Preview built app locally

**Verify these scripts exist** in your `package.json`

### Step 3: Verify Build Locally

Test the production build before deploying:

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview the build
npm run preview
```

This creates a `dist/` folder with the optimized build.

### Step 4: Deploy to Vercel

**Option A: GitHub Integration (Recommended)**

1. Push code to GitHub
2. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
3. Click "Import Project"
4. Select your GitHub repository
5. Vercel auto-detects Vite configuration
6. Click "Deploy"

**Option B: Vercel CLI**

```bash
# Navigate to project
cd my-frontend

# Deploy
vercel --prod

# Follow the prompts to link your GitHub account
```

### Step 5: Configure Custom Domain (Optional)

1. In Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain (e.g., `yourcompany.com`)
3. Update DNS records as instructed by Vercel
4. SSL certificate auto-generates (typically within 24-48 hours)

---

## Project Configuration

### vercel.json

The `vercel.json` file controls Vercel build and deployment behavior:

```json
{
  "buildCommand": "npm run build",           // Build command
  "devCommand": "npm run dev",               // Local dev command
  "installCommand": "npm install",           // Install dependencies
  "outputDirectory": "dist",                 // Output folder from Vite
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"           // SPA routing support
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"  // Cache static assets
        }
      ]
    }
  ]
}
```

#### Why This Matters:

- **rewrites**: Ensures all routes go to `index.html` so React Router can handle routing
- **headers**: Caches static assets for better performance
- **outputDirectory**: Tells Vercel where to find the built app

### vite.config.js

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',                    // Output to dist folder
    sourcemap: false,                  // Disable sourcemaps in production
    minify: 'terser',                  // Minify with terser
    chunkSizeWarningLimit: 1000,       // Adjust chunk size warnings
  },
  server: {
    port: 3000,
    strictPort: false,                 // Fallback to next available port
  },
  preview: {
    port: 4173,                        // Preview server port
  },
})
```

---

## Environment Variables

### Setting Up Environment Variables

#### Local Development

1. **Create `.env.local` file** in project root:

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=My Frontend
```

2. **Use in Code**:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
const appName = import.meta.env.VITE_APP_NAME;
```

#### Production (Vercel)

1. **In Vercel Dashboard**: Project → Settings → Environment Variables

2. **Add Variables**:
   - Key: `VITE_API_URL`
   - Value: `https://your-api.com`
   - Select: Production, Preview, Development (as needed)

3. **Redeploy** after adding env vars:
   - Push a commit to trigger rebuild
   - Or use "Redeploy" button in Vercel Dashboard

### Important Notes:

- ⚠️ **Client-side env vars must start with `VITE_`** (Vite convention)
- ⚠️ **Never commit `.env.local`** to Git (add to `.gitignore`)
- ✅ Vercel env vars are automatically injected during build

---

## Troubleshooting

### Issue 1: Build Fails - "Command 'npm run build' failed"

**Solution:**
1. Test build locally: `npm run build`
2. Fix any errors shown in console
3. Commit and push
4. Retrigger deployment in Vercel Dashboard

### Issue 2: Routes Not Working (404 Errors)

**Symptom**: Routes like `/services`, `/booking` work on local but get 404 on Vercel

**Solution:**
- ✅ The `vercel.json` with rewrites is already configured to fix this
- Verify `vercel.json` exists in root directory
- Make sure React Router is properly set up in `App.jsx`

### Issue 3: Assets Not Loading (Missing Images/Videos)

**Symptom**: Images show broken links on Vercel

**Solutions:**
1. **Check import paths** - Use relative paths in components:
   ```javascript
   import image from '../assets/images/example.png';
   <img src={image} alt="example" />
   ```

2. **For public assets** - Place in `public/` folder:
   ```
   public/
   ├── images/
   │   └── logo.png
   └── videos/
       └── demo.mp4
   ```
   Access as: `/images/logo.png` or `/videos/demo.mp4`

3. **Check directory structure**:
   ```
   my-frontend/
   ├── public/              # Static files served as-is
   ├── src/
   │   ├── assets/          # Imported in code
   │   ├── components/
   │   ├── pages/
   │   └── styles/
   ```

### Issue 4: Build Hangs or Timeout

**Solution:**
1. Check package.json dependencies - remove unused packages
2. Clear build cache: Vercel Dashboard → Settings → Advanced → Clear Cache
3. Increase build timeout (if applicable)

### Issue 5: Slow Performance

**Try:**
- Enable Code Splitting (Vite does this by default)
- Check Network tab in DevTools for large assets
- Use Chrome DevTools → Lighthouse for performance audit
- Compress images (recommended: tinypng.com or imageoptim.com)

---

## Performance Optimization

### 1. Code Splitting

Vite automatically code-splits dynamic imports:

```javascript
// Lazy load a page component
import { lazy, Suspense } from 'react';

const PortraitGallery = lazy(() => import('./pages/PortraitGallery'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/gallery/:type" element={<PortraitGallery />} />
      </Routes>
    </Suspense>
  );
}
```

### 2. Image Optimization

```javascript
// Use modern image formats
import webpImage from '../assets/images/photo.webp';
import jpgImage from '../assets/images/photo.jpg';

// Responsive images
<picture>
  <source srcSet={webpImage} type="image/webp" />
  <img src={jpgImage} alt="Photo" />
</picture>
```

### 3. CSS Optimization

- Remove unused CSS from `main.css`
- Use CSS modules instead of global styles (optional)
- Enable CSS minification (already done in vite.config.js)

### 4. Caching Strategy

The `vercel.json` caches assets for 1 year:
```json
"Cache-Control": "public, max-age=31536000, immutable"
```

---

## Best Practices

### ✅ DO

- ✅ **Test locally** before deploying: `npm run build && npm run preview`
- ✅ **Use environment variables** for API URLs
- ✅ **Minimize bundle size** (use Vite's analysis)
- ✅ **Enable gzip compression** (Vercel does this automatically)
- ✅ **Use semantic HTML** for better SEO
- ✅ **Add meta tags** in `index.html` for social sharing
- ✅ **Monitor performance** using Vercel Analytics

### ❌ DON'T

- ❌ **Don't commit `node_modules`** or `.env.local`
- ❌ **Don't use `process.env`** for client-side (use `import.meta.env.VITE_*`)
- ❌ **Don't hardcode API URLs** - use environment variables
- ❌ **Don't commit sensitive data** (API keys, tokens)
- ❌ **Don't ignore build errors** - they indicate problems

---

## Monitoring and Analytics

### Enable Vercel Analytics

1. **In Vercel Dashboard** → Project Settings → Analytics
2. Add Web Analytics snippet (optional but recommended)
3. Track:
   - Page load times
   - Core Web Vitals
   - User behavior
   - Error tracking

### Check Build Status

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your project
3. View deployment history and logs
4. Each deployment shows build time and output size

---

## Useful Commands Reference

```bash
# Local development
npm run dev                    # Start dev server on port 3000

# Build and test
npm run build                 # Build for production
npm run preview              # Preview production build locally
npm run lint                 # Check code quality

# Vercel CLI
vercel                       # Deploy (interactive mode)
vercel --prod               # Deploy to production
vercel env ls               # List environment variables
vercel logs                 # View deployment logs
```

---

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Vite Docs**: https://vite.dev/guide/
- **React Router Docs**: https://reactrouter.com/
- **Vercel Community**: https://github.com/vercel/next.js/discussions

---

## Checklist Before Deploying

- [ ] All code committed to Git
- [ ] `npm run build` succeeds locally
- [ ] `npm run preview` shows correct UI
- [ ] No console errors in DevTools
- [ ] Environment variables configured in Vercel Dashboard
- [ ] Custom domain DNS configured (if applicable)
- [ ] SSL certificate requested (if custom domain)
- [ ] Build timeouts are reasonable
- [ ] Performance acceptable on 4G network

---

## Next Steps

1. Commit this `DEPLOYMENT.md` guide to your repository
2. Push changes to GitHub
3. Go to Vercel Dashboard and import your project
4. Monitor the first deployment
5. Test all routes/pages after deployment succeeds

**Deployment should now be successful!** 🚀
