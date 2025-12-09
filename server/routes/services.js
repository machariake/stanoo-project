const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

const COLLECTION_NAME = 'services';

// GET all services
router.get('/', async (req, res) => {
    try {
        const snapshot = await db.collection(COLLECTION_NAME).orderBy('order', 'asc').get();
        const services = [];
        snapshot.forEach(doc => {
            services.push({
                _id: doc.id,
                ...doc.data()
            });
        });
        res.json({ success: true, services });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET single service
router.get('/:id', async (req, res) => {
    try {
        const doc = await db.collection(COLLECTION_NAME).doc(req.params.id).get();
        if (!doc.exists) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }
        res.json({
            success: true,
            service: {
                _id: doc.id,
                ...doc.data()
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// POST new service
router.post('/', async (req, res) => {
    const { title, icon, shortDescription, fullDescription, features, benefits, order, imageUrl } = req.body;

    const newService = {
        title,
        icon,
        shortDescription,
        fullDescription,
        features: features || [],
        benefits: benefits || [],
        order: order || 0,
        imageUrl: imageUrl || '',
        createdAt: new Date().toISOString()
    };

    try {
        const docRef = await db.collection(COLLECTION_NAME).add(newService);
        res.status(201).json({
            success: true,
            service: {
                _id: docRef.id,
                ...newService
            }
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// PUT update service
router.put('/:id', async (req, res) => {
    try {
        const serviceRef = db.collection(COLLECTION_NAME).doc(req.params.id);
        const doc = await serviceRef.get();

        if (!doc.exists) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }

        const updates = {
            ...req.body,
            updatedAt: new Date().toISOString()
        };
        delete updates._id;

        await serviceRef.update(updates);
        const updatedDoc = await serviceRef.get();

        res.json({
            success: true,
            service: {
                _id: updatedDoc.id,
                ...updatedDoc.data()
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// DELETE service
router.delete('/:id', async (req, res) => {
    try {
        await db.collection(COLLECTION_NAME).doc(req.params.id).delete();
        res.json({ success: true, message: 'Service deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
