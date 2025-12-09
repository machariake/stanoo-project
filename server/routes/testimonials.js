const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

const COLLECTION_NAME = 'testimonials';

// GET all testimonials
router.get('/', async (req, res) => {
    try {
        const snapshot = await db.collection(COLLECTION_NAME).orderBy('order', 'asc').get();
        const testimonials = [];
        snapshot.forEach(doc => {
            testimonials.push({
                _id: doc.id,
                ...doc.data()
            });
        });
        res.json({ success: true, testimonials });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET single testimonial
router.get('/:id', async (req, res) => {
    try {
        const doc = await db.collection(COLLECTION_NAME).doc(req.params.id).get();
        if (!doc.exists) {
            return res.status(404).json({ success: false, message: 'Testimonial not found' });
        }
        res.json({
            success: true,
            testimonial: {
                _id: doc.id,
                ...doc.data()
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// POST new testimonial
router.post('/', async (req, res) => {
    const { name, role, quote, order, imageUrl } = req.body;

    const newTestimonial = {
        name,
        role,
        quote,
        order: order || 0,
        imageUrl: imageUrl || '',
        createdAt: new Date().toISOString()
    };

    try {
        const docRef = await db.collection(COLLECTION_NAME).add(newTestimonial);
        res.status(201).json({
            success: true,
            testimonial: {
                _id: docRef.id,
                ...newTestimonial
            }
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// PUT update testimonial
router.put('/:id', async (req, res) => {
    try {
        const docRef = db.collection(COLLECTION_NAME).doc(req.params.id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ success: false, message: 'Testimonial not found' });
        }

        const updates = {
            ...req.body,
            updatedAt: new Date().toISOString()
        };
        delete updates._id;

        await docRef.update(updates);
        const updatedDoc = await docRef.get();

        res.json({
            success: true,
            testimonial: {
                _id: updatedDoc.id,
                ...updatedDoc.data()
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// DELETE testimonial
router.delete('/:id', async (req, res) => {
    try {
        await db.collection(COLLECTION_NAME).doc(req.params.id).delete();
        res.json({ success: true, message: 'Testimonial deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
