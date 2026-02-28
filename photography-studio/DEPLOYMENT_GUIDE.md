# 🚀 Complete Deployment Guide

This guide covers deployment on all major platforms.

---

## Table of Contents
1. [Render (Recommended)](#render-recommended)
2. [Heroku](#heroku)
3. [Railway](#railway)
4. [VPS/Self-Hosted](#vpsselfhosted)
5. [MongoDB Setup](#mongodb-setup)

---

## Render (Recommended)

### Why Render?
✅ Free tier available
✅ Easy GitHub integration
✅ Automatic HTTPS
✅ Unlimited bandwidth
✅ Environment variables support

### Step-by-Step Deployment

#### 1. Create Render Account
- Go to https://render.com
- Click "Sign Up"
- Choose "Sign up with GitHub"
- Authorize Render to access your repositories

#### 2. Prepare Repository
```bash
# Ensure you have a Git repository
git init
git add .
git commit -m "Initial commit"
git push -u origin main
```

#### 3. Create Web Service
1. Dashboard → Click "New +"
2. Select "Web Service"
3. Connect your GitHub repository
4. Fill in details:
   - **Name:** `photography-studio`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free (for testing) or Starter (production)

#### 4. Set Environment Variables
1. Go to Service Settings
2. Click "Environment"
3. Add these variables:

```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/studioDB
ADMIN_PASSWORD=YourSecurePassword123!
STUDIO_NAME=Maari Photography Studio
STUDIO_CONTACT=919876543210
STUDIO_EMAIL=studio@email.com
STUDIO_ADDRESS=Your Studio Address
STUDIO_OPEN_TIME=09:00
STUDIO_CLOSE_TIME=20:00
MAX_BOOKINGS_PER_DAY=5
WHATSAPP_PHONE_NUMBER=919876543210
```

#### 5. Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. Your app will be live at `https://photography-studio.onrender.com`

#### 6. Test
- Visit your live URL
- Test booking form
- Check admin panel with password

---

## Heroku

### Prerequisites
- Heroku CLI installed
- GitHub account

### Step-by-Step Deployment

#### 1. Install Heroku CLI
```bash
# On Windows
choco install heroku-cli

# On macOS
brew install heroku/brew/heroku

# On Linux
snap install --classic heroku
```

#### 2. Login to Heroku
```bash
heroku login
```

#### 3. Create Heroku App
```bash
cd photography-studio
heroku create your-app-name
```

#### 4. Add MongoDB Add-on
```bash
heroku addons:create mongolab:sandbox
```

#### 5. Set Environment Variables
```bash
heroku config:set ADMIN_PASSWORD=YourSecurePassword123!
heroku config:set STUDIO_NAME="Maari Photography Studio"
heroku config:set STUDIO_CONTACT=919876543210
heroku config:set STUDIO_EMAIL=studio@email.com
heroku config:set STUDIO_ADDRESS="Your Address"
heroku config:set STUDIO_OPEN_TIME=09:00
heroku config:set STUDIO_CLOSE_TIME=20:00
heroku config:set MAX_BOOKINGS_PER_DAY=5
heroku config:set WHATSAPP_PHONE_NUMBER=919876543210
heroku config:set NODE_ENV=production
```

#### 6. Deploy
```bash
# First time deployment
git push heroku main

# Subsequent deployments
git push heroku main
```

#### 7. View Logs
```bash
heroku logs --tail
```

#### 8. Visit Your App
```bash
heroku open
```

---

## Railway

### Why Railway?
✅ Simple to use
✅ GitHub integration
✅ Easy environment management
✅ Free tier available

### Step-by-Step Deployment

#### 1. Create Railway Account
- Go to https://railway.app
- Click "Start Project"
- Select "Deploy from GitHub repo"

#### 2. Connect GitHub
1. Authorize Railway to access GitHub
2. Select your `photography-studio` repository
3. Click "Deploy"

#### 3. Add MongoDB
1. Click "Add Service"
2. Select "MongoDB"
3. Railway will create a MongoDB instance

#### 4. Set Variables
1. Go to "Variables"
2. Add all environment variables:

```
NODE_ENV=production
ADMIN_PASSWORD=YourSecurePassword123!
STUDIO_NAME=Maari Photography Studio
STUDIO_CONTACT=919876543210
STUDIO_EMAIL=studio@email.com
STUDIO_ADDRESS=Your Studio Address
STUDIO_OPEN_TIME=09:00
STUDIO_CLOSE_TIME=20:00
MAX_BOOKINGS_PER_DAY=5
WHATSAPP_PHONE_NUMBER=919876543210
```

#### 5. Deploy
1. Railway auto-deploys on push
2. Visit the generated URL
3. Your app is live!

---

## VPS/Self-Hosted

### Requirements
- Ubuntu 20.04+ server
- Domain name
- SSL certificate

### Step-by-Step Setup

#### 1. SSH into Server
```bash
ssh root@your_server_ip
```

#### 2. Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version
npm --version
```

#### 3. Install MongoDB
```bash
# Add MongoDB repository
curl -fsSL https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiline" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### 4. Install Nginx
```bash
sudo apt-get install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

#### 5. Clone Repository
```bash
cd /home
sudo mkdir -p photography-studio
cd photography-studio
sudo git clone <your-repo-url> .
sudo npm install
```

#### 6. Create .env File
```bash
sudo nano .env
```

Add your environment variables, then press Ctrl+X, Y, Enter to save.

#### 7. Setup PM2 (Process Manager)
```bash
sudo npm install -g pm2

# Start app with PM2
pm2 start server.js --name "studio"
pm2 save
pm2 startup
```

#### 8. Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/default
```

Replace with:
```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name your_domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### 9. Enable SSL with Certbot
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your_domain.com
```

#### 10. Restart Nginx
```bash
sudo systemctl restart nginx
```

---

## MongoDB Setup

### Option 1: MongoDB Atlas (Cloud - Recommended)

#### Step 1: Create Account
- Go to https://www.mongodb.com/cloud/atlas
- Click "Try Free"
- Sign up with email

#### Step 2: Create Cluster
1. Click "Build a cluster"
2. Choose "Free" tier
3. Select cloud provider: AWS
4. Click "Create Cluster"

#### Step 3: Add Database User
1. Go to Security → Database Access
2. Click "Add New Database User"
3. Username: `studiouser`
4. Password: Generate strong password
5. Click "Add User"

#### Step 4: Whitelist IP
1. Go to Security → Network Access
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Or add your specific IP

#### Step 5: Get Connection String
1. Click "Connect" button
2. Choose "Node.js"
3. Copy connection string
4. Replace `<password>` with your password
5. Add to .env:
```
MONGODB_URI=mongodb+srv://studiouser:password@cluster.mongodb.net/studioDB
```

### Option 2: Local MongoDB

#### Install MongoDB
```bash
# Windows
# Download from https://www.mongodb.com/try/download/community

# macOS
brew install mongodb-community
brew services start mongodb-community

# Linux
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

#### Connection String
```
MONGODB_URI=mongodb://127.0.0.1:27017/studioDB
```

---

## Domain Setup

### Add Custom Domain

#### Render
1. Go to deployment settings
2. Click "Custom Domain"
3. Enter your domain
4. Add CNAME record to domain provider:
   ```
   Name: @
   Type: CNAME
   Value: <render-provided-value>
   ```

#### Heroku
```bash
heroku domains:add www.yourdomain.com
```

#### Railway
Similar to Render - add CNAME records

---

## Verify Deployment

### Test Checklist
- [ ] Homepage loads
- [ ] Gallery displays
- [ ] Booking form works
- [ ] Admin panel accessible
- [ ] WhatsApp redirect works
- [ ] Database connection working
- [ ] HTTPS is enabled
- [ ] Mobile responsive
- [ ] All CSS/JS loaded

### Monitor Performance
```bash
# Check logs
heroku logs --tail
pm2 logs

# Monitor disk usage
df -h

# Check MongoDB
mongosh  # Local
# Atlas dashboard for cloud
```

---

## Troubleshooting Deployment

### App keeps crashing
```bash
# Check logs
pm2 logs
heroku logs --tail

# Restart
pm2 restart studio
heroku restart
```

### Database connection fails
- Verify MongoDB is running
- Check connection string
- Whitelist your IP (for Atlas)

### Static files not loading
- Ensure `public` folder is in root
- Check server.js has `express.static('public')`

### Port already in use
- Change PORT in .env
- Or kill process: `lsof -i :5000`

---

## Backup & Recovery

### Backup MongoDB
```bash
# Local backup
mongodump --output /path/to/backup

# Restore
mongorestore /path/to/backup
```

### Backup MongoDB Atlas
1. Go to Backup tab
2. Click "Create"
3. Download backup files

### Git backup
```bash
git push -u origin main
# All code is backed up in GitHub
```

---

## Scaling Tips

1. **Auto-Scaling on Render**
   - Go to deployment settings
   - Enable autoscaling
   - Set max instances

2. **Database Optimization**
   - Add database indexes
   - Monitor query performance
   - Upgrade MongoDB plan if needed

3. **CDN Setup**
   - Use Cloudflare for static assets
   - Improves load time globally

---

## Cost Optimization

### Free Options
- Render: Free tier
- Railway: $5/month
- Railway MongoDB: Included
- GitHub: Free

### Production Recommended
- Render Starter: $7/month
- MongoDB Atlas M0: Free
- Cloudflare: Free

**Total: ~$7/month**

---

## Security Checklist

- [ ] Change default passwords
- [ ] Enable HTTPS
- [ ] Setup firewall rules
- [ ] Whitelist IP addresses
- [ ] Enable logging
- [ ] Regular backups
- [ ] Monitor error logs
- [ ] Use strong admin password
- [ ] Environment variables not in code
- [ ] Keep dependencies updated

---

## Support

For deployment issues:
1. Check service logs
2. Review this guide
3. Check MongoDB connection
4. Verify environment variables
5. Test locally first

**Happy Deploying! 🚀**