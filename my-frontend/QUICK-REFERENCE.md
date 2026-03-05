# Vercel Deployment Quick Reference Card

## 🚀 DEPLOY IN 5 STEPS

### Step 1️⃣: Prepare & Test Locally
```bash
npm install
npm run build
npm run preview
```
✅ Visit http://localhost:4173 and test all features

### Step 2️⃣: Commit Changes
```bash
git add .
git commit -m "Configure for Vercel deployment"
git push origin main
```

### Step 3️⃣: Create Vercel Account
- Go to https://vercel.com
- Sign in with GitHub

### Step 4️⃣: Import Project
1. Click "Add New" → "Project"
2. Select: `website_design` (GitHub repo)
3. Set Root Directory: `my-frontend`
4. Auto-fills: Build command, Output directory
5. Click "Deploy"

### Step 5️⃣: Test Live Site
- Visit your `.vercel.app` domain
- Test all routes and features
- Check console (F12) for errors

---

## 📋 BEFORE YOU DEPLOY

Run these checks:

```bash
✅ npm install              # Dependencies installed?
✅ npm run lint             # No linting errors?
✅ npm run build            # Builds without errors?
✅ npm run preview          # Everything looks good?
✅ git push origin main     # Code pushed to GitHub?
```

| Check | Command | Expected |
|-------|---------|----------|
| Dependencies | `npm install` | No errors |
| Code Quality | `npm run lint` | No red errors |
| Build | `npm run build` | `dist/` folder created |
| Preview | `npm run preview` | App loads at localhost:4173 |
| Git | `git push origin main` | Changes on GitHub |

---

## ⚙️ VERCEL DASHBOARD SETTINGS

```
Project: website_design
Root Directory: my-frontend
Framework: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

---

## 🔧 CONFIGURATION FILES

| File | What It Does |
|------|-------------|
| `vercel.json` | Tells Vercel how to build and deploy |
| `vite.config.js` | Build optimization settings |
| `.env.example` | Template for environment variables |

---

## 🔐 ENVIRONMENT VARIABLES (Optional)

**Local Development (.env.local):**
```env
VITE_API_URL=http://localhost:3000
```

**Production (Vercel Dashboard):**
1. Settings → Environment Variables
2. Add: `VITE_API_URL=https://api.yoursite.com`
3. Redeploy

⚠️ Variable names **must** start with `VITE_`

---

## 📁 DIRECTORY STRUCTURE

```
my-frontend/
├── src/
│   ├── components/     (UI components)
│   ├── pages/         (Page components)
│   ├── assets/        (Images, videos)
│   ├── styles/        (CSS files)
│   └── App.jsx        (Router config)
├── public/            (Static files)
└── index.html         (HTML entry)
```

---

## 🐛 IF SOMETHING BREAKS

**Routes return 404?**
→ Check `vercel.json` has rewrites section

**Images not showing?**
→ Use imports: `import img from '../assets/...'`

**Build fails?**
→ Run `npm run build` locally, fix errors

**Env vars undefined?**
→ Variable names must start with `VITE_`

**See full troubleshooting:** [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## 📚 DOCUMENTATION QUICK LINKS

| Want to... | Read this |
|-----------|-----------|
| Deploy fast | [VERCEL-QUICKSTART.md](./VERCEL-QUICKSTART.md) |
| Understand everything | [DEPLOYMENT.md](./DEPLOYMENT.md) |
| Fix an error | [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) |
| Understand structure | [PROJECT-STRUCTURE.md](./PROJECT-STRUCTURE.md) |
| Review code | [CODE-FIXES.md](./CODE-FIXES.md) |
| Navigation guide | [DOCS-INDEX.md](./DOCS-INDEX.md) |

---

## 🎯 COMMON COMMANDS

```bash
# Development
npm run dev              # Start dev server (localhost:3000)

# Production
npm run build            # Build for production
npm run preview          # Preview built app (localhost:4173)

# Code Quality
npm run lint             # Check code quality
npm run lint --fix       # Auto-fix issues
```

---

## ✅ DEPLOYMENT CHECKLIST

- [ ] `npm run build` succeeds
- [ ] `npm run preview` works
- [ ] No console errors (F12)
- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] Root directory set to `my-frontend`
- [ ] Click "Deploy" button
- [ ] Wait 2-5 minutes for build
- [ ] Test deployed site

---

## 🌐 AFTER DEPLOYMENT

**Your site is now LIVE:**
- 🌍 Access via: `https://[project].vercel.app`
- 🔄 Auto-updates on new GitHub commits
- 🔒 Free SSL certificate
- ⚡ Auto-scaling and optimization
- 📊 View analytics in Vercel Dashboard

**Optional Customization:**
1. Add custom domain (Settings → Domains)
2. Setup environment variables (Settings → Environment Variables)
3. Enable analytics (Settings → Analytics)
4. Monitor performance (Analytics tab)

---

## 📊 BUILD INFORMATION

**Build Duration:** 2-5 minutes (first time)
**Deploy Size:** ~35KB gzipped (typical)
**Redeploy:** Automatic on Git push to main

---

## 🆘 QUICK HELP

| Issue | Solution |
|-------|----------|
| Build fails | Run `npm run build` locally first |
| Routes broken | Verify `vercel.json` exists |
| Images missing | Check import paths |
| Env vars not working | **Variable must start with `VITE_`** |

**Full troubleshooting:** [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## 📞 SUPPORT

- Vercel Docs: https://vercel.com/docs
- Vite Docs: https://vite.dev
- React Docs: https://react.dev
- Local Docs: See DOCS-INDEX.md

---

## 🚀 YOU'RE READY TO DEPLOY!

**Next Step:** Follow the 5 steps above 👆

**Time to Deploy:** ~20 minutes total

**Questions?** Check [DOCS-INDEX.md](./DOCS-INDEX.md)

---

## 📝 MY DEPLOYMENT DATE

- **Date Started:** _______________
- **Date Deployed:** _______________
- **Live URL:** _______________
- **Custom Domain:** _______________

---

**Print or bookmark this card for quick reference!**
