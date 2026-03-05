# Vercel Deployment Setup & Troubleshooting

## 🎯 Complete Setup Checklist

### Pre-Deployment (Local)
- [ ] Run `npm install` to install all dependencies
- [ ] Run `npm run lint` to check for code errors
- [ ] Run `npm run build` to build for production
- [ ] Run `npm run preview` to test the production build locally
- [ ] Verify the app works correctly in preview (all routes, images load)
- [ ] Commit all changes: `git add . && git commit -m "Ready for Vercel"`
- [ ] Push to GitHub: `git push origin main`

### Vercel Dashboard Setup
- [ ] Create account at vercel.com
- [ ] Connect GitHub account to Vercel
- [ ] Import website_design repository
- [ ] Set Root Directory to: `my-frontend`
- [ ] Framework: Vite (auto-detected)
- [ ] Build Command: `npm run build` (auto-filled)
- [ ] Output Directory: `dist` (auto-filled)
- [ ] Install Command: `npm install` (auto-filled)

### Environment Variables (if needed)
- [ ] Add env vars in Vercel Dashboard (Settings → Environment Variables)
- [ ] Format: `VITE_API_URL` for Vite apps
- [ ] Example: `VITE_API_URL=https://api.example.com`
- [ ] Redeploy after adding env vars

### Deployment
- [ ] Click "Deploy" button
- [ ] Wait for build to complete (2-5 minutes)
- [ ] Visit auto-generated .vercel.app URL
- [ ] Test all routes and functionality

### Post-Deployment
- [ ] Test all pages load correctly
- [ ] Check images display properly
- [ ] Test React Router navigation
- [ ] Check console for errors (F12)
- [ ] Test on mobile (responsive design)

### Custom Domain (Optional)
- [ ] Go to Project Settings → Domains
- [ ] Add your domain name
- [ ] Update DNS records (follow Vercel instructions)
- [ ] Wait for SSL certificate (24-48 hours)

---

## 🔧 Troubleshooting Guide

### Problem 1: Build Fails with "Command not found"

**Error Example:**
```
The build command "npm run build" failed
```

**Causes & Solutions:**

1. **Missing dependencies:**
   ```bash
   npm install
   npm run build
   ```
   - Test locally first
   - Check `package.json` has all scripts

2. **Syntax errors in code:**
   ```bash
   npm run lint
   ```
   - Fix any eslint errors
   - Check for typos in imports

3. **Missing files:**
   - Verify all imported files exist
   - Check file paths (case-sensitive on Linux)

**Solution:**
1. Run `npm install` locally
2. Run `npm run build` locally
3. If it fails locally, fix the error
4. Push to GitHub
5. Redeploy

---

### Problem 2: Routes Return 404 Errors

**Symptom:**
- App works on `localhost:3000`
- On Vercel, visiting `/services` gives 404
- Refresh page after navigation breaks

**Cause:**
- SPA (Single Page Application) routing needs special config
- Server doesn't know to serve `index.html` for all routes

**Solution:**
✅ **Already fixed** by `vercel.json` with this config:
```json
"rewrites": [
  {
    "source": "/(.*)",
    "destination": "/index.html"
  }
]
```

**If still broken:**
1. Verify `vercel.json` exists in root of `my-frontend`
2. Check the rewrite config is correctly formatted
3. Commit and redeploy
4. Check Vercel deployment logs for errors

---

### Problem 3: Images/Videos Don't Load

**Symptom:**
- Images show broken icon on Vercel
- Works fine locally

**Possible Causes & Solutions:**

#### Case 1: Imported in JSX (most common)
```javascript
// ✅ CORRECT
import image from '../assets/images/photo.jpg';
<img src={image} alt="Photo" />

// ❌ WRONG
<img src="../assets/images/photo.jpg" alt="Photo" />
<img src="./assets/images/photo.jpg" alt="Photo" />
```

**Fix:**
- Import the image in your component
- Use the imported variable as `src`

#### Case 2: Using /public folder
```javascript
// ✅ CORRECT
<img src="/images/photo.jpg" alt="Photo" />

// These files go in:
// my-frontend/public/images/photo.jpg

// ❌ WRONG
<img src="./public/images/photo.jpg" alt="Photo" />
<img src="/src/assets/images/photo.jpg" alt="Photo" />
```

**Fix:**
- Place files in `public/` folder
- Reference as `/filename` (absolute path)

#### Case 3: Video files
```javascript
// For videos in components:
import video from '../assets/videos/demo.mp4';
<video src={video} controls />

// For static videos:
// Place in public/videos/
<video src="/videos/demo.mp4" controls />
```

**Solution Steps:**
1. Identify which images are broken
2. Check current path in code
3. Move files to correct location (`/public` or `/src/assets`)
4. Fix the import/reference
5. Test locally: `npm run preview`
6. Commit and redeploy

---

### Problem 4: Environment Variables Not Working

**Symptom:**
```javascript
// In code:
const apiUrl = import.meta.env.VITE_API_URL;
console.log(apiUrl); // Shows "undefined"
```

**Cause:**
- Env vars not added to Vercel
- Variable name doesn't start with `VITE_`
- Build not redeployed after adding env vars

**Solution:**

1. **Local Development:**
   - Create `.env.local` file in project root:
     ```
     VITE_API_URL=http://localhost:3000
     VITE_APP_NAME=My App
     ```
   - Restart dev server: `npm run dev`
   - Access in code:
     ```javascript
     const apiUrl = import.meta.env.VITE_API_URL;
     ```

2. **Vercel Production:**
   - Go to Vercel Dashboard → Project → Settings → Environment Variables
   - Click "Add New"
   - Key: `VITE_API_URL`
   - Value: `https://api.example.com`
   - Select environments: Production / Preview / Development
   - Click "Save"
   - Redeploy your app (or push new commit)

3. **Important Rules:**
   - ⚠️ **Must** start with `VITE_` (Vite convention)
   - Used only at **build time** (not runtime changes)
   - Add to `.gitignore` if using `.env.local`
   - Never hardcode API URLs in code

---

### Problem 5: Build Size Warning

**Warning:**
```
The following assets were larger than 500 kb:
  dist/assets/index-xxx.js (1.2 MB)
```

**Solutions:**

1. **Check dependencies:**
   ```bash
   npm ls
   ```
   - Remove unused packages
   - Codebase too large?

2. **Code splitting (Vite does this by default):**
   ```javascript
   // For heavy components:
   const HeavyComponent = lazy(() => import('./HeavyComponent'));
   
   <Suspense fallback={<Loading />}>
     <HeavyComponent />
   </Suspense>
   ```

3. **Built-in optimizations:**
   - Vite minifies by default
   - Check for unused CSS

4. **Monitor:**
   ```bash
   npm run build
   # View the size output
   ```

---

### Problem 6: Slow Build or Timeout

**Symptom:**
- Build takes > 10 minutes
- Build times out (30 minute limit)

**Solutions:**

1. **Clear Vercel cache:**
   - Vercel Dashboard → Settings → Advanced → "Clear Cache"
   - Redeploy

2. **Check dependencies:**
   ```bash
   npm list
   ```
   - Remove unused packages
   - Are any packages very heavy?

3. **Local build test:**
   ```bash
   npm run build
   # Time how long it takes locally
   ```
   - If slow locally, fix locally first
   - Then deploy

4. **Optimize:**
   - Remove console.logs
   - Check for infinite loops
   - Review recent changes

---

### Problem 7: Module Not Found Errors

**Error:**
```
Failed to resolve entry module (dist/index.html)
Failed to resolve "@/components/Button"
```

**Solution:**

1. **Check import paths:**
   ```javascript
   // ✅ CORRECT
   import Button from '../components/Button';
   import { useRouter } from 'react-router-dom';
   
   // ❌ WRONG (can break on case-sensitive systems)
   import Button from '../Components/Button';
   import Button from '../components/button.jsx';
   ```

2. **For absolute imports,** update `vite.config.js`:
   ```javascript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'
   import path from 'path'
   
   export default defineConfig({
     plugins: [react()],
     resolve: {
       alias: {
         '@': path.resolve(__dirname, './src'),
       },
     },
   })
   ```
   Then use: `import Button from '@/components/Button'`

3. **Check file names:**
   - Use consistent casing (camelCase for JS, PascalCase for components)
   - Include `.jsx` extension in imports if needed

---

### Problem 8: CORS or API Errors

**Symptom:**
- Network requests fail only on Vercel
- Works on localhost

**Cause:**
- CORS headers not set on backend
- API URL not correctly configured

**Solution:**

1. **Check API URL:**
   ```javascript
   console.log('API URL:', import.meta.env.VITE_API_URL);
   ```

2. **CORS fix (backend required):**
   - Backend must allow requests from your Vercel domain
   - Add to backend CORS config:
     ```
     https://your-project.vercel.app
     https://*.vercel.app (wildcard, less secure)
     ```

3. **Use environment variable:**
   ```javascript
   const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
   fetch(`${apiUrl}/api/endpoint`)
   ```

4. **Vercel env var:**
   - Set `VITE_API_URL` in Vercel Dashboard
   - Redeploy

---

## 🧪 Testing Before Deploy

### Local Production Build Test

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview the build
npm run preview
```

Then visit: `http://localhost:4173`

**Test:**
- [ ] All pages load
- [ ] Navigation works
- [ ] Images display
- [ ] No console errors (F12)
- [ ] Responsive on mobile (F12 → toggle device toolbar)
- [ ] No warnings in browser console

### Build Size Check

```bash
npm run build
# Look for large chunks or warnings
```

**Should see something like:**
```
dist/index.html                   1.23 kB │ gzip:   0.63 kB
dist/assets/index-xxxxxx.js   123.45 kB │ gzip:  34.56 kB
dist/assets/index-xxxxxx.css    12.34 kB │ gzip:   3.45 kB
```

---

## 📊 Monitoring After Deploy

### Check Deployment Status

1. **Vercel Dashboard:**
   - Go to project
   - View deployment history
   - Check build logs for errors

2. **Live Site Testing:**
   - Visit your domain/URL
   - Test all features
   - Check DevTools Console (F12) for errors

3. **Vercel Analytics (Optional):**
   - Enable in Project Settings → Analytics
   - Monitor page performance
   - Track Core Web Vitals

### Set Up Alerts (Optional)

1. **GitHub Actions** for automated deployments
2. **Vercel Notifications** for failed builds
3. **Uptime monitoring** from third-party service

---

## 🆘 Quick Help Reference

| Issue | Quick Fix |
|-------|-----------|
| Build fails | Run `npm run build` locally, fix errors, redeploy |
| Routes broken | Verify `vercel.json` exists with rewrites |
| Images missing | Check import paths, use correct import syntax |
| Env vars undefined | Variable must start with `VITE_`, added in Vercel Dashboard |
| Slow build | Clear cache in Vercel Settings |
| Module not found | Check case-sensitive file names and import paths |

---

## 📚 Additional Resources

- **Vercel Docs:** https://vercel.com/docs
- **Vite Guide:** https://vitejs.dev/guide/
- **React Doc:** https://react.dev
- **React Router:** https://reactrouter.com/
- **Vercel Examples:** https://vercel.com/templates

---

## ✅ Final Checklist

Before reaching out for support:

- [ ] Tested locally with `npm run build && npm run preview`
- [ ] All local tests pass (no errors, images load)
- [ ] Pushed all changes to GitHub
- [ ] Deployed to Vercel via dashboard
- [ ] Checked Vercel build logs (no errors)
- [ ] Tested deployed site (F12 for console errors)
- [ ] Verified issue is not browser cache (try Ctrl+Shift+Delete)

**Ready to deploy! 🚀**
