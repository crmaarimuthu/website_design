# ⚡ Quick Start Guide

Get your Photography Studio app running in 5 minutes!

---

## 🚀 Quick Setup (Local)

### 1. Prerequisites
```bash
# Check if Node.js is installed
node --version    # Should be v14+
npm --version     # Should be v6+

# If not installed, download from https://nodejs.org/
```

### 2. Install Dependencies
```bash
cd photography-studio
npm install
```

### 3. Start MongoDB
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
# Get connection string and add to .env
```

### 4. Create .env File
```bash
# Copy example
cp .env.example .env

# Or create new
echo "PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/studioDB
ADMIN_PASSWORD=admin123" > .env
```

### 5. Start Server
```bash
npm start
```

### 6. Open Browser
```
http://localhost:5000
```

**✅ Done! Your app is running!**

---

## 🎯 First Steps

### 1. Test Homepage
- Visit http://localhost:5000
- See studio information
- Check if database is connected

### 2. Login to Admin
- Go to http://localhost:5000/admin
- Password: `admin123`
- Update studio settings

### 3. Upload Gallery
- Admin → Media
- Click "Upload New Media"
- Add photos/videos

### 4. Test Booking
- Go to http://localhost:5000/booking
- Fill booking form
- Check WhatsApp redirect

---

## ⚙️ Configuration

### Update Admin Password
```
Admin Panel → Settings → Update Admin Password
```

### Setup Studio Info
```
Admin Panel → Settings
- Studio Name
- Contact Number
- Email
- Address
- Opening Hours
- WhatsApp Number
```

### Add Live Stream
```
Admin Panel → Settings → Live Stream URL
Paste YouTube Live link or IP camera URL
```

---

## 📱 Test Locally

### Desktop
```
http://localhost:5000
```

### Mobile
```
http://your-computer-ip:5000
Example: http://192.168.1.100:5000
```

---

## 🌐 Deploy to Cloud (2 minutes)

### Option 1: Render (Easiest)
```bash
# Push to GitHub
git init
git add .
git commit -m "Deploy"
git push -u origin main

# Then visit render.com
# Connect GitHub repo
# Set environment variables
# Deploy!
```

### Option 2: Heroku
```bash
npm install -g heroku
heroku login
heroku create your-app-name
npm run deploy
```

### Option 3: Railway
```
Visit railway.app
Click "New Project"
Select GitHub repo
Deploy!
```

---

## 📋 API Testing with cURL

### Get All Media
```bash
curl http://localhost:5000/api/media
```

### Create Booking
```bash
curl -X POST http://localhost:5000/api/booking \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phone": "9876543210",
    "email": "john@example.com",
    "eventType": "wedding",
    "eventDate": "2026-05-20",
    "eventTime": "10:00",
    "additionalNotes": "Special requirements"
  }'
```

### Get All Bookings
```bash
curl http://localhost:5000/api/bookings
```

---

## 🐛 Common Issues

### Error: Port already in use
```bash
# Change PORT in .env
# Or kill process
lsof -i :5000
kill -9 <PID>
```

### Error: MongoDB connection failed
```bash
# Start MongoDB
mongod

# Or check .env MONGODB_URI
# Ensure MongoDB is running
```

### Error: Cannot upload files
```bash
# Check upload folder exists
mkdir -p public/uploads

# Check permissions
chmod 755 public/uploads
```

---

## 📚 File Structure Reminder

```
photography-studio/
├── server.js          ← Main server
├── package.json       ← Dependencies
├── .env              ← Config (create this)
├── models/           ← Database schemas
├── routes/           ← API endpoints
└── public/           ← Website files
    ├── index.html
    ├── booking.html
    ├── gallery.html
    ├── admin.html
    ├── live.html
    └── css/style.css
```

---

## 🎨 Customization

### Change Studio Name
- `.env` → `STUDIO_NAME`
- Admin Panel → Settings

### Change Colors
- `public/css/style.css` → Search "667eea"

### Change Admin Password
- Admin Panel → Settings → Update Password

### Change Opening Hours
- Admin Panel → Settings → Open/Close Time

---

## ✅ Pre-Deployment Checklist

- [ ] Change admin password
- [ ] Update studio information
- [ ] Upload gallery images
- [ ] Test booking form
- [ ] Test admin dashboard
- [ ] Verify WhatsApp number
- [ ] Test on mobile
- [ ] Check all links
- [ ] Setup MongoDB Atlas
- [ ] Create GitHub repo
- [ ] Configure environment variables

---

## 📞 Quick Support

### Check Logs
```bash
# Server console
npm start

# Browser console
F12 → Console tab
```

### Reset Admin Password
1. Edit `.env`
2. Change `ADMIN_PASSWORD`
3. Restart server

### Clear Database
```bash
# Connect to MongoDB
mongosh

# Use database
use studioDB

# Drop collections
db.bookings.deleteMany({})
db.medias.deleteMany({})
db.studios.deleteMany({})
```

---

## 🎯 Next Steps

1. ✅ Run locally
2. ✅ Setup admin
3. ✅ Upload Content
4. ✅ Deploy to cloud
5. ✅ Add custom domain
6. ✅ Setup email notifications
7. ✅ Integrate payment (optional)

---

**Ready? Let's go! 🚀**

```bash
npm start
```

Visit: http://localhost:5000