const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

const COLLECTION_NAME = 'settings';
const DOC_ID = 'general';

// GET settings
router.get('/', async (req, res) => {
    try {
        const doc = await db.collection(COLLECTION_NAME).doc(DOC_ID).get();
        const defaultSettings = {
            enableTraining: true,
            enableResources: true,
            enableBlog: true,
            enableTestimonials: true,
            enableWhatsApp: true,
            enableQuote: true,
            enableTawkTo: false,
            tawkToWidgetId: 'default',
            enableVideoSection: false,
            videoTitle: 'See Us In Action',
            videoSubtitle: 'Learn more about our services and commitment to safety.',
            videoUrl: '',
            companyName: 'Theuri Green Health Safe'
        };

        if (!doc.exists) {
            return res.json({ success: true, settings: defaultSettings });
        }

        res.json({
            success: true,
            settings: { ...defaultSettings, ...doc.data() }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// PUT update settings
router.put('/', async (req, res) => {
    try {
        const settingsRef = db.collection(COLLECTION_NAME).doc(DOC_ID);

        const updates = {
            ...req.body,
            updatedAt: new Date().toISOString()
        };

        await settingsRef.set(updates, { merge: true });

        const updatedDoc = await settingsRef.get();

        res.json({
            success: true,
            settings: updatedDoc.data()
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
