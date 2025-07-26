# Theuri Green Health Safe - Backend API

This is the backend API server for the Theuri Green Health Safe website, built with Node.js and Express.

## Features

- **Contact Form API**: Handles contact form submissions with email notifications
- **Newsletter Subscription**: Manages newsletter signups
- **Email Services**: Automated email responses using Nodemailer
- **Blog API**: RESTful endpoints for blog management (expandable)
- **CORS Enabled**: Cross-origin resource sharing for frontend integration
- **Error Handling**: Comprehensive error handling and logging

## API Endpoints

### Contact Form
- **POST** `/api/contact` - Submit contact form
  ```json
  {
    "name": "John Smith",
    "email": "john@example.com",
    "phone": "+254700000000",
    "company": "ABC Company",
    "service": "health-safety-audits",
    "message": "I need help with safety audits"
  }
  ```

### Newsletter
- **POST** `/api/newsletter` - Subscribe to newsletter
  ```json
  {
    "email": "subscriber@example.com"
  }
  ```

### Blog (Future Expansion)
- **GET** `/api/blog/posts` - Get all blog posts
- **GET** `/api/blog/post/:id` - Get specific blog post

### Health Check
- **GET** `/api/health` - Server health status

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your configurations:
   ```
   PORT=5000
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   COMPANY_EMAIL=info@theurigreenhealthsafe.com
   ```

3. **Email Setup (Gmail Example)**
   - Enable 2-factor authentication on your Gmail account
   - Generate an App Password for the application
   - Use the App Password as `EMAIL_PASS` in your `.env` file

4. **Start the Server**
   
   Development mode (with auto-reload):
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```

5. **Test the API**
   
   The server will run on `http://localhost:5000`
   
   Test health endpoint:
   ```bash
   curl http://localhost:5000/api/health
   ```

## Email Templates

The API includes professional HTML email templates for:
- Contact form confirmations (sent to clients)
- Contact form notifications (sent to company)
- Newsletter welcome messages
- Emergency contact information

## Security Features

- Input validation for all endpoints
- CORS configuration for frontend integration
- Error handling to prevent information leakage
- Environment variable protection for sensitive data

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- User authentication and authorization
- File upload handling for documents
- Advanced email templates with attachments
- Rate limiting and API throttling
- Comprehensive logging and monitoring
- Blog content management system
- Google Maps API integration
- WhatsApp/SMS notifications

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port number | No (default: 5000) |
| `EMAIL_USER` | SMTP email username | Yes (for email features) |
| `EMAIL_PASS` | SMTP email password | Yes (for email features) |
| `COMPANY_EMAIL` | Company email for notifications | No |

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

Success responses:
```json
{
  "success": true,
  "message": "Success message",
  "data": {}
}
```

## Development

For development, the server uses nodemon for automatic restarts when files change.

### Project Structure
```
server/
├── index.js          # Main server file
├── package.json      # Dependencies and scripts
├── .env             # Environment variables (local)
├── .env.example     # Environment template
└── README.md        # This file
```

## Deployment

1. **Production Environment Variables**: Set up all required environment variables
2. **Process Manager**: Use PM2 or similar for production deployment
3. **Reverse Proxy**: Configure Nginx or Apache for production
4. **SSL Certificate**: Enable HTTPS for secure communication
5. **Database**: Connect to production database
6. **Monitoring**: Set up logging and error monitoring

## Support

For questions or support regarding the API, please contact the development team or refer to the main project documentation.