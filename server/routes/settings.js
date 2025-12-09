const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

const COLLECTION_NAME = 'settings';
const DOC_ID = 'general';

// GET settings
router.get('/', async (req, res) => {
    try {
        const doc = await db.collection(COLLECTION_NAME).doc(DOC_ID).get();
        if (!doc.exists) {
            // Return defaults if not found, or empty object
            return res.json({ success: true, settings: {} });
        }
        res.json({
            success: true,
            settings: doc.data()
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
