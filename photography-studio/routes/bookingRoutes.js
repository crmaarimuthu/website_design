const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Studio = require("../models/Studio");

// Create a new booking
router.post("/booking", async (req, res) => {
  try {
    const { name, phone, email, eventType, eventDate, eventTime, additionalNotes } = req.body;

    // Validate required fields
    if (!name || !phone || !email || !eventType || !eventDate || !eventTime) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Get studio settings
    const studio = await Studio.findOne();
    if (!studio) {
      return res.status(500).json({ success: false, message: "Studio settings not found" });
    }

    // Check if time is within studio hours
    if (eventTime < studio.openTime || eventTime > studio.closeTime) {
      return res.json({ success: false, message: "Studio is closed at this time" });
    }

    // Check daily booking limit
    const bookingCount = await Booking.countDocuments({ 
      eventDate: eventDate,
      status: { $ne: "cancelled" }
    });

    if (bookingCount >= studio.maxBookingsPerDay) {
      return res.json({ success: false, message: "Fully booked for this date" });
    }

    // Create new booking
    const booking = new Booking({
      name,
      phone,
      email,
      eventType,
      eventDate,
      eventTime,
      additionalNotes
    });

    await booking.save();

    // Update total bookings counter
    await Studio.updateOne({}, { $inc: { totalBookings: 1 } });

    // Generate WhatsApp message
    const whatsappMessage = `
*New Booking Received!*
Name: ${name}
Phone: ${phone}
Email: ${email}
Event Type: ${eventType}
Event Date: ${eventDate}
Event Time: ${eventTime}
Notes: ${additionalNotes || "None"}
    `.trim();

    const whatsappUrl = `https://wa.me/${studio.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    res.json({ 
      success: true, 
      message: "Booking confirmed! Redirecting to WhatsApp...",
      whatsappUrl: whatsappUrl,
      booking: booking
    });

  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ success: false, message: "Error processing booking", error: error.message });
  }
});

// Get all bookings (admin only)
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    const totalBookings = await Booking.countDocuments();
    const todayBookings = await Booking.countDocuments({ 
      eventDate: new Date().toISOString().split('T')[0]
    });

    res.json({
      success: true,
      totalBookings,
      todayBookings,
      bookings
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching bookings", error: error.message });
  }
});

// Get bookings for specific date
router.get("/bookings/date/:date", async (req, res) => {
  try {
    const bookings = await Booking.find({ eventDate: req.params.date });
    res.json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching bookings", error: error.message });
  }
});

// Update booking status (admin only)
router.put("/booking/:id", async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!["pending", "confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.json({ success: true, message: "Booking updated", booking });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating booking", error: error.message });
  }
});

// Delete booking
router.delete("/booking/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // Update total bookings counter
    await Studio.updateOne({}, { $inc: { totalBookings: -1 } });

    res.json({ success: true, message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting booking", error: error.message });
  }
});

// Check availability for a specific date
router.get("/availability/:date", async (req, res) => {
  try {
    const studio = await Studio.findOne();
    const bookingCount = await Booking.countDocuments({ 
      eventDate: req.params.date,
      status: { $ne: "cancelled" }
    });

    const isAvailable = bookingCount < studio.maxBookingsPerDay;
    const remainingSlots = studio.maxBookingsPerDay - bookingCount;

    res.json({
      success: true,
      date: req.params.date,
      isAvailable,
      remainingSlots,
      maxSlots: studio.maxBookingsPerDay,
      bookedSlots: bookingCount
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error checking availability", error: error.message });
  }
});

module.exports = router;