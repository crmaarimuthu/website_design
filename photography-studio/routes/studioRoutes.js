const express = require("express");
const router = express.Router();
const Studio = require("../models/Studio");
const Booking = require("../models/Booking");
const Media = require("../models/Media");

// Get studio settings
router.get("/studio", async (req, res) => {
  try {
    let studio = await Studio.findOne();
    
    // Create default studio if doesn't exist
    if (!studio) {
      studio = new Studio();
      await studio.save();
    }

    // Get statistics
    const totalBookings = await Booking.countDocuments();
    const todayBookings = await Booking.countDocuments({
      eventDate: new Date().toISOString().split('T')[0],
      status: { $ne: "cancelled" }
    });
    const totalMedia = await Media.countDocuments();

    res.json({
      success: true,
      studio: studio,
      stats: {
        totalBookings,
        todayBookings,
        totalMedia,
        isOpen: isStudioOpen(studio)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching studio settings", error: error.message });
  }
});

// Update studio settings (admin only)
router.put("/studio", async (req, res) => {
  try {
    const { password } = req.body;

    // Simple authentication (in production, use bcrypt)
    const studio = await Studio.findOne();
    if (!studio || studio.adminPassword !== password) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const updatedStudio = await Studio.findByIdAndUpdate(
      studio._id,
      {
        ...req.body,
        updatedAt: Date.now()
      },
      { new: true }
    );

    res.json({ success: true, message: "Studio settings updated", studio: updatedStudio });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating studio settings", error: error.message });
  }
});

// Check if studio is open
router.get("/status", async (req, res) => {
  try {
    const studio = await Studio.findOne();
    const isOpen = isStudioOpen(studio);

    res.json({
      success: true,
      isOpen,
      message: isOpen ? "Studio is open" : "Studio is closed",
      openTime: studio.openTime,
      closeTime: studio.closeTime,
      currentTime: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error checking status", error: error.message });
  }
});

// Get dashboard data (admin)
router.get("/dashboard", async (req, res) => {
  try {
    const studio = await Studio.findOne();
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: "pending" });
    const confirmedBookings = await Booking.countDocuments({ status: "confirmed" });
    const cancelledBookings = await Booking.countDocuments({ status: "cancelled" });
    const todayBookings = await Booking.countDocuments({
      eventDate: new Date().toISOString().split('T')[0]
    });
    const totalMedia = await Media.countDocuments();
    const recentBookings = await Booking.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      success: true,
      dashboard: {
        totalBookings,
        pendingBookings,
        confirmedBookings,
        cancelledBookings,
        todayBookings,
        totalMedia,
        recentBookings,
        studioInfo: {
          name: studio.studioName,
          contact: studio.contact,
          email: studio.email,
          maxBookingsPerDay: studio.maxBookingsPerDay
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching dashboard data", error: error.message });
  }
});

// Helper function to check if studio is open
function isStudioOpen(studio) {
  if (!studio) return false;

  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const currentTime = `${hours}:${minutes}`;

  return currentTime >= studio.openTime && currentTime <= studio.closeTime;
}

module.exports = router;
