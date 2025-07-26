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

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like SendGrid, Mailgun, etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Theuri Green Health Safe API Server' });
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, company, service, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required fields' 
      });
    }

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
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e3f2fd; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #1976d2;">
              <strong>Note:</strong> Please respond to this inquiry within 24 hours as promised on the website.
            </p>
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
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2d5f3f;">
              <h3 style="color: #2d5f3f; margin-top: 0;">What Happens Next?</h3>
              <ul style="margin-bottom: 0;">
                <li>Our expert team will review your inquiry</li>
                <li>We will respond within 24 hours during business days</li>
                <li>You'll receive a detailed response addressing your specific needs</li>
                <li>We may schedule a consultation call if appropriate</li>
              </ul>
            </div>
            
            <div style="background-color: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px; color: #1976d2;">
                <strong>Need Immediate Assistance?</strong><br>
                For urgent safety or environmental matters, please call our emergency line: <strong>+254 722 000 000</strong> (Available 24/7)
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://theurigreenhealthsafe.com/services" style="background-color: #2d5f3f; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Explore Our Services
              </a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <div style="font-size: 14px; color: #6b7280;">
              <p><strong>Theuri Green Health Safe</strong></p>
              <p>123 Green Street, Nairobi, Kenya</p>
              <p>Phone: +254 700 000 000 | Email: info@theurigreenhealthsafe.com</p>
              <p>Business Hours: Monday - Friday: 8:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      `
    };

    // Send emails
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail(companyMailOptions);
      await transporter.sendMail(clientMailOptions);
    }

    res.json({ 
      success: true, 
      message: 'Message sent successfully! We will get back to you soon.' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'There was an error sending your message. Please try again later.' 
    });
  }
});

// Newsletter subscription endpoint
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email address is required' 
      });
    }

    // Here you would typically save to a database
    // For now, we'll just send a confirmation email

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
            
            <p>You'll now receive:</p>
            <ul>
              <li>Latest insights on health, safety, and environmental management</li>
              <li>Industry trends and best practices</li>
              <li>Regulatory updates and compliance tips</li>
              <li>Exclusive content from our expert team</li>
            </ul>
            
            <p>We respect your privacy and will never share your email address.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://theurigreenhealthsafe.com/blog" style="background-color: #2d5f3f; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Read Our Latest Articles
              </a>
            </div>
          </div>
        </div>
      `
    };

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail(mailOptions);
    }

    res.json({ 
      success: true, 
      message: 'Successfully subscribed to our newsletter!' 
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'There was an error subscribing to the newsletter. Please try again later.' 
    });
  }
});

// Blog endpoints (for future expansion)
app.get('/api/blog/posts', (req, res) => {
  // This would typically fetch from a database
  const posts = [
    {
      id: 1,
      title: "The Future of Workplace Safety: Embracing Technology and Innovation",
      excerpt: "Explore how emerging technologies like IoT sensors, AI-powered risk assessment, and wearable devices are revolutionizing workplace safety management.",
      author: "Dr. Sarah Mwangi",
      date: "2025-01-15",
      category: "Safety Technology",
      readTime: "8 min read"
    },
    {
      id: 2,
      title: "Environmental Impact Assessment: A Complete Guide for East African Businesses",
      excerpt: "Understanding the EIA process, regulatory requirements, and best practices for businesses operating in East Africa's diverse environmental landscape.",
      author: "Michael Kamau", 
      date: "2025-01-10",
      category: "Environmental Management",
      readTime: "6 min read"
    }
    // Add more posts as needed
  ];

  res.json({ success: true, posts });
});

app.get('/api/blog/post/:id', (req, res) => {
  const { id } = req.params;
  
  // This would typically fetch a single post from a database
  res.json({ 
    success: true, 
    post: {
      id: parseInt(id),
      title: "Sample Blog Post",
      content: "This would be the full blog post content...",
      author: "Dr. Sarah Mwangi",
      date: "2025-01-15",
      category: "Safety Technology"
    }
  });
});

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