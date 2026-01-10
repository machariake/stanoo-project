const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const nodemailer = require('nodemailer');

const COLLECTION_NAME = 'quotes';

// Configure nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// POST new quote request
router.post('/', async (req, res) => {
    try {
        const quoteData = {
            ...req.body,
            createdAt: new Date().toISOString(),
            status: 'new' // new, contacted, closed
        };

        // Save to Firebase
        await db.collection(COLLECTION_NAME).add(quoteData);

        // Send Email Notification to Admin
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_USER, // Send to self/admin
                subject: `New Quote Request: ${quoteData.serviceType} - ${quoteData.company}`,
                html: `
                    <h2>New Quote Request Received</h2>
                    <p><strong>Service:</strong> ${quoteData.serviceType}</p>
                    <p><strong>Urgency:</strong> ${quoteData.urgency}</p>
                    <hr>
                    <h3>Client Details</h3>
                    <p><strong>Name:</strong> ${quoteData.name}</p>
                    <p><strong>Company:</strong> ${quoteData.company}</p>
                    <p><strong>Email:</strong> ${quoteData.email}</p>
                    <p><strong>Phone:</strong> ${quoteData.phone}</p>
                    <p><strong>Location:</strong> ${quoteData.location}</p>
                    <hr>
                    <h3>Specifics</h3>
                    <p><strong>Employees:</strong> ${quoteData.employeeCount}</p>
                    <p><strong>Building Size:</strong> ${quoteData.buildingSize || 'N/A'}</p>
                    <p><strong>Additional Details:</strong> ${quoteData.details || 'None'}</p>
                `
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) console.error('Error sending email:', err);
                else console.log('Quote notification sent:', info.response);
            });
        }

        res.status(201).json({ success: true, message: 'Quote request received' });
    } catch (err) {
        console.error('Error saving quote:', err);
        res.status(500).json({ success: false, message: 'Failed to process request' });
    }
});

// GET all quotes (for Admin)
router.get('/', async (req, res) => {
    try {
        const snapshot = await db.collection(COLLECTION_NAME).orderBy('createdAt', 'desc').get();
        const quotes = [];
        snapshot.forEach(doc => {
            quotes.push({ _id: doc.id, ...doc.data() });
        });
        res.json({ success: true, quotes });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
