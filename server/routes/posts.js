const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

const COLLECTION_NAME = 'posts';

// GET all posts
router.get('/', async (req, res) => {
    try {
        const postsSnapshot = await db.collection(COLLECTION_NAME).orderBy('date', 'desc').get();
        const posts = [];
        postsSnapshot.forEach(doc => {
            posts.push({
                _id: doc.id, // Using _id to match frontend expectations
                ...doc.data()
            });
        });
        res.json({ success: true, posts });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET single post
router.get('/:id', async (req, res) => {
    try {
        const doc = await db.collection(COLLECTION_NAME).doc(req.params.id).get();
        if (!doc.exists) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        res.json({
            success: true,
            post: {
                _id: doc.id,
                ...doc.data()
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// POST new post (Protected)
router.post('/', async (req, res) => {
    const { title, excerpt, content, author, category, readTime, imageUrl, date } = req.body;

    const newPost = {
        title,
        excerpt,
        content,
        author,
        category,
        readTime,
        imageUrl: imageUrl || 'post-default',
        date: date || new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString()
    };

    try {
        const docRef = await db.collection(COLLECTION_NAME).add(newPost);
        res.status(201).json({
            success: true,
            post: {
                _id: docRef.id,
                ...newPost
            }
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// PUT update post (Protected)
router.put('/:id', async (req, res) => {
    try {
        const postRef = db.collection(COLLECTION_NAME).doc(req.params.id);
        const doc = await postRef.get();

        if (!doc.exists) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        const updates = {
            ...req.body,
            updatedAt: new Date().toISOString()
        };

        // Remove _id from updates if present (Firestore doesn't store ID in document data)
        delete updates._id;

        await postRef.update(updates);

        // Return updated document
        const updatedDoc = await postRef.get();

        res.json({
            success: true,
            post: {
                _id: updatedDoc.id,
                ...updatedDoc.data()
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// DELETE post (Protected)
router.delete('/:id', async (req, res) => {
    try {
        await db.collection(COLLECTION_NAME).doc(req.params.id).delete();
        res.json({ success: true, message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
