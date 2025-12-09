const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { db } = require('../config/firebase');

const COLLECTION_NAME = 'messages';

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// GET all messages (for admin)
router.get('/', async (req, res) => {
    try {
        const snapshot = await db.collection(COLLECTION_NAME).orderBy('createdAt', 'desc').get();
        const messages = [];
        snapshot.forEach(doc => {
            messages.push({
                _id: doc.id,
                ...doc.data()
            });
        });
        res.json({ success: true, messages });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// POST new contact message
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, company, service, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and message are required fields'
            });
        }

        const newMessage = {
            name,
            email,
            phone: phone || '',
            company: company || '',
            service: service || '',
            message,
            createdAt: new Date().toISOString(),
            read: false
        };

        // 1. Save to Database
        const docRef = await db.collection(COLLECTION_NAME).add(newMessage);

        // 2. Send Emails (Non-blocking usually, but we'll await for simplicity or fire-and-forget)

        // Email content for the company
        const companyMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.COMPANY_EMAIL || 'info@theurigreenhealthsafe.com',
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2d5f3f;">New Contact Form Submission</h2>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3 style="color: #2d5f3f; margin-top: 0;">Contact Information</h3>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
                        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
                        ${service ? `<p><strong>Service of Interest:</strong> ${service}</p>` : ''}
                    </div>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
                        <h3 style="color: #2d5f3f; margin-top: 0;">Message</h3>
                        <p style="white-space: pre-wrap;">${message}</p>
                    </div>
                </div>
            `
        };

        // Confirmation email for the client
        const clientMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thank you for contacting Theuri Green Health Safe',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #2d5f3f, #4a7c59); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                        <h1 style="margin: 0; font-size: 28px;">Theuri Green Health Safe</h1>
                        <p style="margin: 10px 0 0 0; opacity: 0.9;">Professional Health, Safety & Environmental Services</p>
                    </div>
                    
                    <div style="padding: 30px; background-color: #ffffff; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
                        <h2 style="color: #2d5f3f; margin-top: 0;">Thank You for Your Inquiry</h2>
                        <p>Dear ${name},</p>
                        <p>Thank you for contacting Theuri Green Health Safe. We have received your message and appreciate your interest in our services.</p>
                        <p>We will respond within 24 hours during business days.</p>
                    </div>
                </div>
            `
        };

        // Send emails if configured
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            // We won't block the response on email sending for speed, unless critical
            try {
                await transporter.sendMail(companyMailOptions);
                await transporter.sendMail(clientMailOptions);
            } catch (emailErr) {
                console.error('Failed to send email notifications:', emailErr);
                // We still return success because the message was saved to DB
            }
        }

        res.status(201).json({
            success: true,
            message: 'Message sent successfully! We will get back to you soon.',
            id: docRef.id
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'There was an error sending your message. Please try again later.'
        });
    }
});

// DELETE message
router.delete('/:id', async (req, res) => {
    try {
        await db.collection(COLLECTION_NAME).doc(req.params.id).delete();
        res.json({ success: true, message: 'Message deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Mark as read (optional future enhancement)
router.put('/:id/read', async (req, res) => {
    try {
        await db.collection(COLLECTION_NAME).doc(req.params.id).update({ read: true });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
