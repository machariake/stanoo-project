const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

const COLLECTION_NAME = 'projects';

// GET all projects
router.get('/', async (req, res) => {
    try {
        const snapshot = await db.collection(COLLECTION_NAME).orderBy('createdAt', 'desc').get();
        const projects = [];
        snapshot.forEach(doc => {
            projects.push({
                _id: doc.id,
                ...doc.data()
            });
        });
        res.json({ success: true, projects });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET single project
router.get('/:id', async (req, res) => {
    try {
        const doc = await db.collection(COLLECTION_NAME).doc(req.params.id).get();
        if (!doc.exists) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.json({
            success: true,
            project: {
                _id: doc.id,
                ...doc.data()
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// POST new project
router.post('/', async (req, res) => {
    const { title, client, category, description, imageUrl, results } = req.body;

    // results is expected to be an array of strings

    const newProject = {
        title,
        client,
        category,
        description,
        imageUrl: imageUrl || '',
        results: results || [],
        createdAt: new Date().toISOString()
    };

    try {
        const docRef = await db.collection(COLLECTION_NAME).add(newProject);
        res.status(201).json({
            success: true,
            project: {
                _id: docRef.id,
                ...newProject
            }
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// PUT update project
router.put('/:id', async (req, res) => {
    try {
        const docRef = db.collection(COLLECTION_NAME).doc(req.params.id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ success: false, message: 'Project not found' });
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
            project: {
                _id: updatedDoc.id,
                ...updatedDoc.data()
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// DELETE project
router.delete('/:id', async (req, res) => {
    try {
        await db.collection(COLLECTION_NAME).doc(req.params.id).delete();
        res.json({ success: true, message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
