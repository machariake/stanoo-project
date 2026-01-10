const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

const COLLECTION_NAME = 'resources';

// GET all resources
router.get('/', async (req, res) => {
    try {
        const snapshot = await db.collection(COLLECTION_NAME).orderBy('createdAt', 'desc').get();
        const resources = [];
        snapshot.forEach(doc => {
            resources.push({
                _id: doc.id,
                ...doc.data()
            });
        });
        res.json({ success: true, resources });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET single resource
router.get('/:id', async (req, res) => {
    try {
        const doc = await db.collection(COLLECTION_NAME).doc(req.params.id).get();
        if (!doc.exists) {
            return res.status(404).json({ success: false, message: 'Resource not found' });
        }
        res.json({ success: true, resource: { _id: doc.id, ...doc.data() } });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// POST new resource
router.post('/', async (req, res) => {
    try {
        const newResource = {
            ...req.body,
            createdAt: new Date().toISOString()
        };
        const docRef = await db.collection(COLLECTION_NAME).add(newResource);
        res.status(201).json({ success: true, resource: { _id: docRef.id, ...newResource } });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// PUT update resource
router.put('/:id', async (req, res) => {
    try {
        const updates = {
            ...req.body,
            updatedAt: new Date().toISOString()
        };
        await db.collection(COLLECTION_NAME).doc(req.params.id).update(updates);
        res.json({ success: true, message: 'Resource updated', resource: { _id: req.params.id, ...updates } });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// DELETE resource
router.delete('/:id', async (req, res) => {
    try {
        await db.collection(COLLECTION_NAME).doc(req.params.id).delete();
        res.json({ success: true, message: 'Resource deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
