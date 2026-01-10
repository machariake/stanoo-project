const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

const COLLECTION_NAME = 'training';

// GET all training sessions
router.get('/', async (req, res) => {
    try {
        const snapshot = await db.collection(COLLECTION_NAME).orderBy('date', 'asc').get();
        const training = [];
        snapshot.forEach(doc => {
            training.push({
                _id: doc.id,
                ...doc.data()
            });
        });
        res.json({ success: true, training });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// POST new training session
router.post('/', async (req, res) => {
    try {
        const newSession = {
            ...req.body,
            createdAt: new Date().toISOString()
        };
        const docRef = await db.collection(COLLECTION_NAME).add(newSession);
        res.status(201).json({ success: true, training: { _id: docRef.id, ...newSession } });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// DELETE training session
router.delete('/:id', async (req, res) => {
    try {
        await db.collection(COLLECTION_NAME).doc(req.params.id).delete();
        res.json({ success: true, message: 'Training session deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
