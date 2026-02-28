# Photography Studio Management Web Application
## Professional Full-Stack Solution

A complete web application for managing a photography studio with features for booking management, gallery management, live camera streaming, admin dashboard, and WhatsApp notifications.

---

## 🎯 Features

### 🏠 Studio Information Section
- Studio name and logo display
- About studio description
- Contact number and email
- Full address with Google Maps integration
- Operating hours (open/close times)
- Real-time open/closed status display

### 📸 Gallery Management
- Upload photos and videos
- Cloud storage support (Cloudinary ready)
- Add title, description, and priority
- Priority-based sorting (lower numbers display first)
- Admin can add, edit, delete media
- Filter by image/video type

### 🎥 Live Office Camera
- Display live streaming camera feed
- Support for YouTube Live streams
- IP camera stream integration
- Real-time status indicator

### 📅 Customer Booking System
- Complete booking form with:
  - Customer name, phone, email
  - Event type selection (wedding, birthday, model shoot, corporate, etc.)
  - Event date and time
  - Additional notes
- Check available slots per day
- Limit maximum events per day (admin configurable)
- Show available/fully booked status

### 🎛️ Booking Management
- Admin panel to view all bookings
- Filter by date and status
- Update booking status (pending, confirmed, cancelled)
- See total bookings count
- Real-time dashboard

### 💬 WhatsApp Notification
- Automatic WhatsApp message on booking submission
- Booking details sent to studio
- Use WhatsApp Web URL (no API key needed for basic version)
- Option to use WhatsApp Business API

### 🔐 Authentication
- Admin login system
- Password-protected admin panel
- Session management

### 💾 Database
- MongoDB for data persistence
- Collections for studios, media, and bookings
- Full data persistence

### 🌐 Cloud Ready
- Deployment ready for Render, Railway, or Heroku
- Environment configuration support
- Cloud-based file storage integration

---

## 🛠️ Technology Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **File Storage** | Local storage (Cloudinary ready) |
| **Hosting** | Render, Railway, Heroku |

---

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas cloud)
- npm or yarn
- Git (for version control)

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd photography-studio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:

```bash
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://127.0.0.1:27017/studioDB

# Admin Settings
ADMIN_PASSWORD=admin123

# Studio Settings
STUDIO_NAME=Maari Photography Studio
STUDIO_CONTACT=919876543210
STUDIO_EMAIL=studio@email.com
WHATSAPP_PHONE_NUMBER=919876543210
```

### 4. Start MongoDB
```bash
# For local MongoDB
mongod

# OR use MongoDB Atlas (cloud database)
# Update MONGODB_URI in .env with your connection string
```

### 5. Start the Server
```bash
npm start
```

The server will start on `http://localhost:5000`

---

## 📁 Project Structure

```
photography-studio/
├── models/                 # Database models
│   ├── Booking.js         # Booking schema
│   ├── Media.js           # Media schema
│   └── Studio.js          # Studio settings schema
├── routes/                # API routes
│   ├── bookingRoutes.js   # Booking API endpoints
│   ├── mediaRoutes.js     # Media API endpoints
│   └── studioRoutes.js    # Studio API endpoints
├── public/                # Frontend files
│   ├── index.html         # Home page
│   ├── booking.html       # Booking page
│   ├── gallery.html       # Gallery page
│   ├── live.html          # Live camera page
│   ├── admin.html         # Admin dashboard
│   ├── css/
│   │   └── style.css      # Main stylesheet
│   └── uploads/           # Media uploads directory
├── server.js              # Main server file
├── package.json           # Dependencies
├── .env                   # Environment variables
└── README.md              # Documentation
```

---

## 🌐 API Endpoints

### Booking Endpoints
- `POST /api/booking` - Create new booking
- `GET /api/bookings` - Get all bookings (admin)
- `GET /api/bookings/date/:date` - Get bookings for specific date
- `PUT /api/booking/:id` - Update booking status
- `DELETE /api/booking/:id` - Delete booking
- `GET /api/availability/:date` - Check availability for a date

### Media Endpoints
- `POST /api/upload` - Upload media file
- `GET /api/media` - Get all media (sorted by priority)
- `GET /api/media/:id` - Get single media
- `PUT /api/media/:id` - Update media details
- `DELETE /api/media/:id` - Delete media
- `GET /api/media-type/:type` - Get media by type (image/video)

### Studio Endpoints
- `GET /api/studio` - Get studio settings
- `PUT /api/studio` - Update studio settings (admin)
- `GET /api/status` - Check if studio is open/closed
- `GET /api/dashboard` - Get dashboard data (admin)

---

## 🔧 Admin Dashboard

### Access Admin Panel
1. Go to `http://localhost:5000/admin`
2. Enter admin password (default: `admin123`)
3. Access dashboard features:

#### Dashboard Tab
- View total bookings count
- See today's bookings
- Stream statistics
- Recent bookings

#### Bookings Tab
- View all bookings in table format
- Filter by date and status
- Update booking status
- Delete bookings

#### Media Tab
- Upload new photos/videos
- Set priority for display order
- Edit media details
- Delete media files

#### Settings Tab
- Update studio information
- Change opening/closing hours
- Adjust max bookings per day
- Update WhatsApp number
- Add live stream URL
- Change admin password

---

## 📝 Database Schema

### Studio Collection
```javascript
{
  studioName: String,
  logo: String,
  about: String,
  contact: String,
  email: String,
  address: String,
  latitude: Number,
  longitude: Number,
  openTime: String,          // e.g., "09:00"
  closeTime: String,         // e.g., "20:00"
  maxBookingsPerDay: Number, // e.g., 5
  liveStreamUrl: String,
  whatsappNumber: String,
  adminPassword: String,
  totalBookings: Number,
  updatedAt: Date
}
```

### Booking Collection
```javascript
{
  name: String,
  phone: String,
  email: String,
  eventType: String,        // wedding, birthday, model shoot, etc.
  eventDate: String,        // YYYY-MM-DD
  eventTime: String,        // HH:MM
  additionalNotes: String,
  status: String,           // pending, confirmed, cancelled
  createdAt: Date,
  updatedAt: Date
}
```

### Media Collection
```javascript
{
  title: String,
  description: String,
  filename: String,
  type: String,             // image or video
  cloudinaryUrl: String,
  priority: Number,         // lower = displayed first
  createdAt: Date
}
```

---

## 🚢 Deployment Guide

### Option 1: Deploy on Render

1. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Connect Repository**
   - Click "New+" → "Web Service"
   - Connect your GitHub repository

3. **Configure Environment**
   - Repository: Select your repo
   - Build command: `npm install`
   - Start command: `npm start`
   - Environment: Node

4. **Set Environment Variables**
   - Add all variables from `.env` file
   - `MONGODB_URI=<your_mongodb_atlas_url>`
   - `ADMIN_PASSWORD=<secure_password>`

5. **Deploy**
   - Click "Deploy"
   - Your app will be live!

### Option 2: Deploy on Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set PORT=5000
   heroku config:set MONGODB_URI=<your_mongodb_url>
   heroku config:set ADMIN_PASSWORD=<password>
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

### Option 3: Deploy on Railway

1. Go to https://railway.app
2. Click "New Project"
3. Connect GitHub repository
4. Add MongoDB plugin
5. Set environment variables
6. Deploy

---

## 📱 WhatsApp Integration

### Current Method (No API Key)
When a booking is submitted, user is redirected to WhatsApp Web with pre-filled message.

### Setup WhatsApp Business API (Advanced)
For automated messages without user interaction:
1. Get WhatsApp Business Account
2. Get API credentials
3. Use API endpoint to send messages

---

## 🔒 Security Best Practices

1. **Change Default Password**
   - Update `ADMIN_PASSWORD` in `.env`
   - Use strong password (min 12 characters)

2. **Environment Variables**
   - Never commit `.env` to git
   - Use `.gitignore` to exclude it

3. **Database Security**
   - Use MongoDB Atlas with IP whitelist
   - Enable authentication

4. **HTTPS**
   - Enable SSL/TLS in production
   - Render and Heroku provide free HTTPS

5. **Input Validation**
   - All inputs are validated on backend
   - Sanitize user inputs

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** 
- Start MongoDB service: `mongod`
- Or use MongoDB Atlas with cloud URI

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
```bash
# Change PORT in .env or
lsof -i :5000  # Find process
kill -9 <PID>  # Kill process
```

### File Upload Not Working
- Check `uploads` folder permissions
- Ensure disk space available
- Check file size limits

### Admin Login Not Working
- Verify `ADMIN_PASSWORD` in `.env`
- Check browser console for errors
- Clear browser cache

---

## 🚀 Future Enhancements

- [ ] Payment integration (Razorpay, Stripe)
- [ ] Email notifications
- [ ] SMS confirmations
- [ ] Calendar view for availability
- [ ] Customer login portal
- [ ] Download booking reports (PDF)
- [ ] Automated email replies
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Mobile app
- [ ] Video conferencing for consultations
- [ ] Automated backup system

---

## 📞 Support & Contact

For issues or questions:
1. Check the troubleshooting section
2. Review API documentation
3. Check browser console for errors
4. Enable debug logging

---

## 📄 License

This project is property of Photography Studio Management System.
Developed for professional use.

---

## ✅ Checklist Before Going Live

- [ ] Change admin password
- [ ] Configure MongoDB Atlas
- [ ] Set all environment variables
- [ ] Test all forms and submissions
- [ ] Test booking availability logic
- [ ] Test WhatsApp integration
- [ ] Upload initial gallery images
- [ ] Update studio information
- [ ] Set correct opening hours
- [ ] Enable HTTPS in production
- [ ] Setup backup system
- [ ] Test on mobile devices
- [ ] Setup domain name
- [ ] Configure email notifications
- [ ] Monitor error logs
- [ ] Create backup of database

---

## 🎨 Customization

### Change Theme Colors
Edit `public/css/style.css`:
```css
/* Gradient colors */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Add Custom Font
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont&display=swap" rel="stylesheet">
```

### Modify Studio Information
Edit via admin panel → Settings

### Add Google Maps
1. Get API key from Google Cloud
2. Add to `.env`
3. Update `index.html` with API key

---

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [MDN Web Docs](https://developer.mozilla.org)
- [Node.js Documentation](https://nodejs.org/docs)

---

## 📊 Version History

- **v1.0.0** (2026-03-01) - Initial release
  - Core booking system
  - Gallery management
  - Admin dashboard
  - WhatsApp integration
  - Live camera support

---

**Built with ❤️ for Photography Studios**
**Happy Booking! 📸**