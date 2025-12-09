const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const nodemailer = require('nodemailer');

const COLLECTION_NAME = 'subscribers';

// Configure nodemailer (reusing existing env vars)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// GET all subscribers
router.get('/', async (req, res) => {
    try {
        const snapshot = await db.collection(COLLECTION_NAME).orderBy('createdAt', 'desc').get();
        const subscribers = [];
        snapshot.forEach(doc => {
            subscribers.push({
                _id: doc.id,
                ...doc.data()
            });
        });
        res.json({ success: true, subscribers });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// POST new subscriber
router.post('/', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    try {
        // Check if already subscribed
        const existing = await db.collection(COLLECTION_NAME).where('email', '==', email).get();
        if (!existing.empty) {
            return res.status(400).json({ success: false, message: 'Email already subscribed' });
        }

        const newSubscriber = {
            email,
            createdAt: new Date().toISOString()
        };

        const docRef = await db.collection(COLLECTION_NAME).add(newSubscriber);

        // Send Welcome Email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to Theuri Green Health Safe Newsletter',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <div style="background: linear-gradient(135deg, #2d5f3f, #4a7c59); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                    <h1 style="margin: 0; font-size: 28px;">Welcome to Our Newsletter!</h1>
                  </div>
                  
                  <div style="padding: 30px; background-color: #ffffff; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
                    <p>Thank you for subscribing to the Theuri Green Health Safe newsletter!</p>
                    <p>We'll keep you updated with the latest in health, safety, and environmental management.</p>
                  </div>
                </div>
            `
        };

        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            try {
                await transporter.sendMail(mailOptions);
            } catch (emailErr) {
                console.error('Error sending welcome email:', emailErr);
                // Continue execution, don't fail the subscription just because email failed
            }
        }

        res.status(201).json({
            success: true,
            subscriber: {
                _id: docRef.id,
                ...newSubscriber
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// DELETE subscriber
router.delete('/:id', async (req, res) => {
    try {
        await db.collection(COLLECTION_NAME).doc(req.params.id).delete();
        res.json({ success: true, message: 'Subscriber removed' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
