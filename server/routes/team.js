const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

const COLLECTION_NAME = 'team';

// GET all team members
router.get('/', async (req, res) => {
    try {
        const snapshot = await db.collection(COLLECTION_NAME).orderBy('order', 'asc').get();
        const team = [];
        snapshot.forEach(doc => {
            team.push({
                _id: doc.id,
                ...doc.data()
            });
        });
        res.json({ success: true, team });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET single team member
router.get('/:id', async (req, res) => {
    try {
        const doc = await db.collection(COLLECTION_NAME).doc(req.params.id).get();
        if (!doc.exists) {
            return res.status(404).json({ success: false, message: 'Team member not found' });
        }
        res.json({
            success: true,
            member: {
                _id: doc.id,
                ...doc.data()
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// POST new team member
router.post('/', async (req, res) => {
    const { name, role, bio, credentials, order, imageUrl } = req.body;

    const newMember = {
        name,
        role,
        bio,
        credentials: credentials || [],
        order: order || 0,
        imageUrl: imageUrl || '',
        createdAt: new Date().toISOString()
    };

    try {
        const docRef = await db.collection(COLLECTION_NAME).add(newMember);
        res.status(201).json({
            success: true,
            member: {
                _id: docRef.id,
                ...newMember
            }
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// PUT update team member
router.put('/:id', async (req, res) => {
    try {
        const docRef = db.collection(COLLECTION_NAME).doc(req.params.id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ success: false, message: 'Team member not found' });
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
            member: {
                _id: updatedDoc.id,
                ...updatedDoc.data()
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// DELETE team member
router.delete('/:id', async (req, res) => {
    try {
        await db.collection(COLLECTION_NAME).doc(req.params.id).delete();
        res.json({ success: true, message: 'Team member deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
