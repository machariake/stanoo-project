const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { admin } = require('../config/firebase');

// Configure storage
// Use memory storage to process file buffer for Firebase
const storage = multer.memoryStorage();

// File filter (images only)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload an image.'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: fileFilter
});

// Helper to upload a single file to Firebase
const uploadToFirebase = async (file) => {
    const bucket = admin.storage().bucket();
    // Create unique filename
    const filename = `uploads/${Date.now()}-${file.originalname}`;
    const fileUpload = bucket.file(filename);

    const blobStream = fileUpload.createWriteStream({
        metadata: {
            contentType: file.mimetype
        }
    });

    return new Promise((resolve, reject) => {
        blobStream.on('error', (error) => {
            reject(error);
        });

        blobStream.on('finish', async () => {
            // Make the file public
            await fileUpload.makePublic();
            // Get public URL
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
            resolve(publicUrl);
        });

        blobStream.end(file.buffer);
    });
};

// POST single upload endpoint
router.post('/', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // Check if bucket is configured
        if (!process.env.FIREBASE_STORAGE_BUCKET) {
            // Fallback to local (not recommended for production)
            // But since I changed to memoryStorage, I can't easily fallback to disk without extra logic
            // So we force Firebase config or fail nicely with instruction
            return res.status(500).json({
                success: false,
                message: 'Server storage not configured (Missing FIREBASE_STORAGE_BUCKET).'
            });
        }

        const publicUrl = await uploadToFirebase(req.file);

        res.json({
            success: true,
            message: 'File uploaded successfully',
            imageUrl: publicUrl
        });
    } catch (err) {
        console.error('Upload Error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// POST multiple upload endpoint
router.post('/multiple', upload.array('images', 10), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: 'No files uploaded' });
        }

        if (!process.env.FIREBASE_STORAGE_BUCKET) {
            return res.status(500).json({
                success: false,
                message: 'Server storage not configured (Missing FIREBASE_STORAGE_BUCKET).'
            });
        }

        const uploadPromises = req.files.map(file => uploadToFirebase(file));
        const imageUrls = await Promise.all(uploadPromises);

        res.json({
            success: true,
            message: 'Files uploaded successfully',
            imageUrls: imageUrls
        });
    } catch (err) {
        console.error('Upload Error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
