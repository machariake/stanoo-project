# Theuri Green Health Safe - Professional Website

A comprehensive, modern website for **Theuri Green Health Safe**, a leading provider of health, safety, and environmental management services in East Africa.

![Website Preview](https://github.com/user-attachments/assets/48103424-984e-4d53-b38a-4b4710c6079f)

## 🌟 Features

### 🎨 **Modern Design**
- Clean, professional eco-friendly design with green and blue color scheme
- Fully responsive layout optimized for all devices
- Smooth animations and interactive elements
- Accessibility-focused with proper contrast and navigation

### 📱 **Complete Website Structure**
- **Home Page**: Hero section, services overview, testimonials, and call-to-action
- **About Us**: Company story, mission/vision/values, team profiles, certifications
- **Services**: Detailed descriptions of all four core services with benefits
- **Contact**: Working contact form, company information, FAQ, and map integration
- **Blog**: Article management, newsletter signup, and content categorization

### ⚡ **Advanced Functionality**
- Working contact form with email notifications
- Newsletter subscription system
- Blog content management system (expandable)
- Google Maps integration placeholder
- Search and filter functionality
- Responsive navigation with mobile menu

### 🔧 **Technical Excellence**
- **Frontend**: React 19 with React Router for smooth navigation
- **Backend**: Node.js/Express API with comprehensive email system
- **Styling**: Modern CSS with custom variables and responsive design
- **Email System**: Professional HTML email templates with nodemailer
- **API**: RESTful endpoints for all functionality

## 🏗️ Project Structure

```
stanoo-project/
├── public/                 # Static assets
│   ├── index.html         # Main HTML template
│   └── favicon.ico        # Site icon
├── src/                   # React frontend source
│   ├── components/
│   │   ├── common/        # Shared components
│   │   │   ├── Header.js  # Navigation header
│   │   │   ├── Footer.js  # Site footer
│   │   │   └── Layout.js  # Page layout wrapper
│   │   └── pages/         # Page components
│   │       ├── Home.js    # Homepage with hero and services
│   │       ├── About.js   # About us page
│   │       ├── Services.js # Detailed services page
│   │       ├── Contact.js # Contact form and info
│   │       └── Blog.js    # Blog and news page
│   ├── styles/
│   │   └── global.css     # Global styles and variables
│   ├── App.js             # Main app component
│   └── index.js           # React entry point
├── server/                # Backend API
│   ├── index.js           # Express server
│   ├── package.json       # Backend dependencies
│   ├── .env.example       # Environment template
│   └── README.md          # Backend documentation
├── package.json           # Frontend dependencies
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/machariake/stanoo-project.git
cd stanoo-project
```

### 2. Setup Frontend
```bash
# Install dependencies
npm install

# Start development server
npm start
```
The frontend will be available at `http://localhost:3000`

### 3. Setup Backend
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your email credentials

# Start backend server
npm start
```
The API will be available at `http://localhost:5000`

### 4. View the Website
Open your browser and navigate to `http://localhost:3000` to see the complete website.

## 📧 Email Configuration

To enable email functionality:

1. **Gmail Setup** (Recommended for development):
   ```bash
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password  # Generate from Google Account settings
   COMPANY_EMAIL=info@theurigreenhealthsafe.com
   ```

2. **Other Email Providers**: Update the transporter configuration in `server/index.js`

## 🛠️ Available Scripts

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload

## 🎯 Core Services Highlighted

1. **Health & Safety Audits**
   - Workplace hazard identification
   - Compliance audits
   - Safety management system evaluation
   - Incident investigation

2. **Environmental Impact Assessments**
   - Environmental impact screening
   - Baseline studies
   - Mitigation measures development
   - Monitoring programs

3. **Training & Consultancy**
   - Health and safety awareness training
   - Environmental management training
   - Leadership development programs
   - Customized industry-specific training

4. **Risk Management Solutions**
   - Comprehensive risk identification
   - Risk assessment methodologies
   - Business continuity planning
   - Crisis management protocols

## 🌍 Industries Served

- Manufacturing
- Construction
- Healthcare
- Education
- Oil & Gas
- Retail

## 📊 API Endpoints

### Contact Form
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Smith",
  "email": "john@example.com",
  "phone": "+254700000000",
  "company": "ABC Company",
  "service": "health-safety-audits",
  "message": "I need help with safety audits"
}
```

### Newsletter Subscription
```http
POST /api/newsletter
Content-Type: application/json

{
  "email": "subscriber@example.com"
}
```

### Health Check
```http
GET /api/health
```

## 🔐 Security Features

- Input validation and sanitization
- CORS configuration for secure cross-origin requests
- Environment variable protection for sensitive data
- Error handling to prevent information leakage
- Professional email templates with security considerations

## 📱 Mobile Responsiveness

The website is fully responsive and optimized for:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile phones (320px - 767px)

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast color ratios
- Focus indicators for interactive elements

## 🚀 Deployment

### Frontend (Netlify, Vercel, or similar)
```bash
npm run build
# Deploy the 'build' folder
```

### Backend (Heroku, DigitalOcean, or similar)
```bash
# Set environment variables
# Deploy server folder
```

## 🔮 Future Enhancements

- [ ] Database integration for blog content management
- [ ] User authentication and admin panel
- [ ] Real-time chat support
- [ ] Document upload functionality
- [ ] Google Maps API integration
- [ ] Advanced analytics and reporting
- [ ] Multi-language support
- [ ] PWA capabilities
- [ ] Advanced SEO optimization

## 📞 Contact & Support

**Theuri Green Health Safe**
- 📍 Address: 123 Green Street, Nairobi, Kenya
- 📞 Phone: +254 700 000 000
- 📧 Email: info@theurigreenhealthsafe.com
- 🌐 Website: [theurigreenhealthsafe.com](http://localhost:3000)
- ⏰ Business Hours: Monday - Friday: 8:00 AM - 6:00 PM

**Emergency Services**: +254 722 000 000 (Available 24/7)

## 📄 License

This project is proprietary to Theuri Green Health Safe. All rights reserved.

## 🤝 Contributing

This is a private project for Theuri Green Health Safe. For any modifications or enhancements, please contact the development team.

---

**Built with ❤️ for workplace safety and environmental protection**