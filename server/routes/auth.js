const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    const { password } = req.body;

    // In a real production app, we would use hashed passwords and a database users table.
    // For this simple specific requirement, we check against an env variable.
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (password === adminPassword) {
        // In a real app, generate a JWT token here.
        // For simplicity, we just return success and the frontend will store a flag/token.
        res.json({
            success: true,
            message: 'Login successful',
            token: 'valid-admin-token-' + Date.now() // Simple mock token
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Invalid password'
        });
    }
});

module.exports = router;
