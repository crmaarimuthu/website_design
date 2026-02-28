const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    required: true,
    enum: ["wedding", "birthday", "model shoot", "corporate", "anniversary", "engagement", "other"]
  },
  eventDate: {
    type: String,
    required: true
  },
  eventTime: {
    type: String,
    required: true
  },
  additionalNotes: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Booking", bookingSchema);