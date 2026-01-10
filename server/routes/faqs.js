const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

const COLLECTION_NAME = 'faqs';

// GET all FAQs
router.get('/', async (req, res) => {
    try {
        const snapshot = await db.collection(COLLECTION_NAME).orderBy('order', 'asc').get();
        const faqs = [];
        snapshot.forEach(doc => {
            faqs.push({
                _id: doc.id,
                ...doc.data()
            });
        });
        res.json({ success: true, faqs });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// POST new FAQ
router.post('/', async (req, res) => {
    try {
        const newFaq = {
            ...req.body,
            createdAt: new Date().toISOString()
        };
        const docRef = await db.collection(COLLECTION_NAME).add(newFaq);
        res.status(201).json({ success: true, faq: { _id: docRef.id, ...newFaq } });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// DELETE FAQ
router.delete('/:id', async (req, res) => {
    try {
        await db.collection(COLLECTION_NAME).doc(req.params.id).delete();
        res.json({ success: true, message: 'FAQ deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
