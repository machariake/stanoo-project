const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

// GET dashboard statistics
router.get('/', async (req, res) => {
    try {
        // Run queries in parallel
        const [
            messagesSnapshot,
            subscribersSnapshot,
            postsSnapshot,
            projectsSnapshot,
            servicesSnapshot,
            testimonialsSnapshot,
            teamSnapshot
        ] = await Promise.all([
            db.collection('messages').orderBy('createdAt', 'desc').get(),
            db.collection('subscribers').orderBy('createdAt', 'desc').get(),
            db.collection('posts').orderBy('date', 'desc').get(),
            db.collection('projects').get(),
            db.collection('services').get(),
            db.collection('testimonials').get(),
            db.collection('team').get()
        ]);

        // 1. Basic Counts
        const stats = {
            messages: messagesSnapshot.size,
            subscribers: subscribersSnapshot.size,
            posts: postsSnapshot.size,
            projects: projectsSnapshot.size,
            services: servicesSnapshot.size,
            testimonials: testimonialsSnapshot.size,
            team: teamSnapshot.size,
            timestamp: new Date().toISOString()
        };

        // 2. Recent Activity (Top 10 mixed)
        let activities = [];

        const addActivity = (docs, type, icon, labelField, dateField = 'createdAt') => {
            docs.forEach(doc => {
                const data = doc.data();
                activities.push({
                    id: doc.id,
                    type,
                    icon,
                    label: data[labelField] || 'Unknown',
                    date: data[dateField] || data.date // Handle both date formats
                });
            });
        };

        // Get top 5 of each to mix
        addActivity(messagesSnapshot.docs.slice(0, 5), 'New Message', 'fa-envelope', 'name');
        addActivity(subscribersSnapshot.docs.slice(0, 5), 'New Subscriber', 'fa-user-plus', 'email');
        addActivity(postsSnapshot.docs.slice(0, 5), 'New Blog Post', 'fa-newspaper', 'title');

        // Sort by date descending and take top 10
        activities.sort((a, b) => new Date(b.date) - new Date(a.date));
        const recentActivity = activities.slice(0, 10);

        // 3. Service Popularity (from messages)
        const serviceCounts = {};
        messagesSnapshot.docs.forEach(doc => {
            const data = doc.data();
            const service = data.service || 'General Inquiry';
            // Clean string
            const fmtService = service.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
            serviceCounts[fmtService] = (serviceCounts[fmtService] || 0) + 1;
        });

        const serviceStats = Object.entries(serviceCounts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

        res.json({
            success: true,
            stats,
            recentActivity,
            serviceStats
        });

    } catch (err) {
        console.error('Error fetching stats:', err);
        res.status(500).json({ success: false, message: 'Failed to fetch statistics' });
    }
});

module.exports = router;
