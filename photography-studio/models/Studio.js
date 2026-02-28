const mongoose = require("mongoose");

const studioSchema = new mongoose.Schema({
  studioName: {
    type: String,
    default: "Maari Photography Studio"
  },
  logo: {
    type: String,
    default: ""
  },
  about: {
    type: String,
    default: "Welcome to our photography studio"
  },
  contact: {
    type: String,
    default: "9876543210"
  },
  email: {
    type: String,
    default: "studio@email.com"
  },
  address: {
    type: String,
    default: "Studio Address"
  },
  latitude: {
    type: Number,
    default: 0
  },
  longitude: {
    type: Number,
    default: 0
  },
  openTime: {
    type: String,
    default: "09:00"
  },
  closeTime: {
    type: String,
    default: "20:00"  
  },
  maxBookingsPerDay: {
    type: Number,
    default: 5
  },
  liveStreamUrl: {
    type: String,
    default: ""
  },
  whatsappNumber: {
    type: String,
    default: "919876543210"
  },
  adminPassword: {
    type: String,
    default: "admin123"
  },
  totalBookings: {
    type: Number,
    default: 0
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Studio", studioSchema);
