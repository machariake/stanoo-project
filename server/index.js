const path = require('path');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const uploadRouter = require('./routes/upload');
app.use('/api/upload', uploadRouter);

const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

const postsRouter = require('./routes/posts');
app.use('/api/blog/posts', postsRouter);

const servicesRouter = require('./routes/services');
app.use('/api/services', servicesRouter);

const testimonialsRouter = require('./routes/testimonials');
app.use('/api/testimonials', testimonialsRouter);

const teamRouter = require('./routes/team');
app.use('/api/team', teamRouter);

const projectsRouter = require('./routes/projects');
app.use('/api/projects', projectsRouter);

const settingsRouter = require('./routes/settings');
app.use('/api/settings', settingsRouter);

const contentRouter = require('./routes/content');
app.use('/api/content', contentRouter);

const contactRouter = require('./routes/contact');
app.use('/api/contact', contactRouter);

const resourcesRouter = require('./routes/resources');
app.use('/api/resources', resourcesRouter);

const trainingRouter = require('./routes/training');
app.use('/api/training', trainingRouter);

const faqsRouter = require('./routes/faqs');
app.use('/api/faqs', faqsRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Theuri Green Health Safe API Server (Firebase)' });
});

// Contact form endpoint moved to routes/contact.js

// Newsletter subscription endpoint
// Newsletter endpoints
const subscribersRouter = require('./routes/subscribers');
app.use('/api/newsletter', subscribersRouter);

// Blog endpoints are now handled by routes/posts.js

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Theuri Green Health Safe API'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`✅ Theuri Green Health Safe API Server running on port ${PORT}`);
  console.log(`📧 Email service: ${process.env.EMAIL_USER ? 'Configured' : 'Not configured (emails will be logged only)'}`);
  console.log(`🌐 Server URL: http://localhost:${PORT}`);
});

module.exports = app;