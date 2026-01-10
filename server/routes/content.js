const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

const COLLECTION_NAME = 'content';
const DOC_ID = 'pages';

// GET content
router.get('/', async (req, res) => {
    try {
        const doc = await db.collection(COLLECTION_NAME).doc(DOC_ID).get();

        // Default content structure if not found
        const defaultContent = {
            home: {
                heroTitle: 'Professional Health & Safety Consultants',
                heroSubtitle: 'Leading the way in Occupational Health, Safety, and Environmental Compliance.',
                heroButtonText: 'View Our Services',
                welcomeTitle: 'Welcome to Theuri Green Health Safe',
                welcomeText: 'We are a premier consultancy firm dedicated to providing top-notch health and safety solutions.'
            },
            about: {
                missionTitle: 'Our Mission',
                missionText: 'To provide exceptional health and safety consultancy...',
                visionTitle: 'Our Vision',
                visionText: 'To be the leading safety consultancy in East Africa.'
            }
        };

        if (!doc.exists) {
            return res.json({ success: true, content: defaultContent });
        }
        res.json({
            success: true,
            content: { ...defaultContent, ...doc.data() } // Merge with defaults to ensure structure
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// PUT update content
router.put('/', async (req, res) => {
    try {
        const contentRef = db.collection(COLLECTION_NAME).doc(DOC_ID);

        const updates = {
            ...req.body,
            updatedAt: new Date().toISOString()
        };

        await contentRef.set(updates, { merge: true });

        const updatedDoc = await contentRef.get();

        res.json({
            success: true,
            content: updatedDoc.data()
        });
    } catch (err) {
        console.error('Error updating content:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
