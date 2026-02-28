const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Media = require("../models/Media");

const uploadPath = path.join(__dirname, "../public/uploads");

// Ensure uploads directory exists
try {
  fs.mkdirSync(uploadPath, { recursive: true });
} catch (err) {
  if (err.code !== "EEXIST") throw err;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      fs.mkdirSync(uploadPath, { recursive: true });
    } catch (err) {
      if (err.code !== "EEXIST") throw err;
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/mpeg'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Upload media
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const { title, description, priority } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    const media = new Media({
      title,
      description: description || "",
      filename: req.file.filename,
      type: req.file.mimetype.startsWith("image") ? "image" : "video",
      priority: parseInt(priority) || 999,
      cloudinaryUrl: `/uploads/${req.file.filename}`
    });

    await media.save();

    res.json({ 
      success: true, 
      message: "Media uploaded successfully",
      media: media
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Upload failed", error: error.message });
  }
});

// Get all media sorted by priority
router.get("/media", async (req, res) => {
  try {
    const media = await Media.find().sort({ priority: 1, createdAt: -1 });
    res.json({ success: true, count: media.length, media });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching media", error: error.message });
  }
});

// Get single media
router.get("/media/:id", async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ success: false, message: "Media not found" });
    }
    res.json({ success: true, media });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching media", error: error.message });
  }
});

// Update media (title, description, priority)
router.put("/media/:id", async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    
    const media = await Media.findByIdAndUpdate(
      req.params.id,
      { 
        title: title || undefined,
        description: description || undefined,
        priority: priority !== undefined ? parseInt(priority) : undefined,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!media) {
      return res.status(404).json({ success: false, message: "Media not found" });
    }

    res.json({ success: true, message: "Media updated", media });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating media", error: error.message });
  }
});

// Delete media
router.delete("/media/:id", async (req, res) => {
  try {
    const media = await Media.findByIdAndDelete(req.params.id);
    
    if (!media) {
      return res.status(404).json({ success: false, message: "Media not found" });
    }

    // Delete file from disk
    try {
      const filePath = path.join(uploadPath, media.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (fileErr) {
      console.error("Error deleting file:", fileErr);
    }

    res.json({ success: true, message: "Media deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting media", error: error.message });
  }
});

// Get media by type
router.get("/media-type/:type", async (req, res) => {
  try {
    const media = await Media.find({ type: req.params.type }).sort({ priority: 1 });
    res.json({ success: true, count: media.length, media });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching media", error: error.message });
  }
});

module.exports = router;

module.exports = router;