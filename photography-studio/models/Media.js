const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  filename: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["image", "video"],
    required: true
  },
  cloudinaryUrl: {
    type: String,
    default: ""
  },
  priority: {
    type: Number,
    default: 999
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Media", mediaSchema);

