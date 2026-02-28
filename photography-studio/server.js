const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/uploads")));

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/studioDB";
mongoose.connect(mongoUri)
  .then(() => console.log("✓ MongoDB Connected"))
  .catch(err => {
    console.error("⚠️  MongoDB Connection Error. Running in demo mode.");
    console.error("💡 To fix: Install MongoDB or setup MongoDB Atlas (free)");
  });

// Routes
const bookingRoutes = require("./routes/bookingRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const studioRoutes = require("./routes/studioRoutes");

app.use("/api", bookingRoutes);
app.use("/api", mediaRoutes);
app.use("/api", studioRoutes);

// Serve static HTML pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/gallery", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "gallery.html"));
});

app.get("/booking", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "booking.html"));
});

app.get("/live", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "live.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: "Internal server error", 
    error: process.env.NODE_ENV === "development" ? err.message : "Server error"
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Photography Studio Server Running on http://localhost:${PORT}`);
  console.log(`📸 Visit: http://localhost:${PORT}`);
  console.log(`🛠️  Admin: http://localhost:${PORT}/admin`);
  console.log(`\n`);
});
