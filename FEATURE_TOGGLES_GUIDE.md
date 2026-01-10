# Feature Toggles & Integrations Guide

## Overview
The admin panel now includes comprehensive settings to enable/disable features and integrate third-party services.

## Feature Management

### Available Toggles
Navigate to **Admin Dashboard → Settings** to access these toggles:

1. **Enable Training Page** - Show/hide the Training section and navigation link
2. **Enable Resources & Downloads** - Show/hide the Resources section and navigation link
3. **Enable Blog / News** - Show/hide the Blog section and navigation link
4. **Enable Testimonials Section** - Show/hide testimonials on the Home page
5. **Enable WhatsApp Widget** - Show/hide the floating WhatsApp button
6. **Enable 'Get A Quote' Calculator** - Show/hide the Quote Calculator button in navigation

### How It Works
- All toggles are **enabled by default**
- Changes take effect immediately after saving
- Disabled features are completely hidden from visitors
- The backend continues to store data even when features are disabled

## Live Chat Integration (Tawk.to)

### Setup Instructions

1. **Create a Tawk.to Account**
   - Visit [tawk.to](https://www.tawk.to/)
   - Sign up for a free account
   - Create a new property for your website

2. **Get Your Property ID**
   - Log in to your Tawk.to dashboard
   - Go to **Administration → Property Settings**
   - Copy your **Property ID** (looks like: `5f8a9b1c2d3e4f5g6h7i8j9k`)

3. **Configure in Admin Panel**
   - Navigate to **Admin Dashboard → Settings**
   - Scroll to **Live Chat Integration** section
   - Check **"Enable Tawk.to Live Chat"**
   - Paste your **Property ID**
   - (Optional) Enter your **Widget ID** (leave as "default" if unsure)
   - Click **Save All Settings**

4. **Verify Installation**
   - Visit your public website
   - You should see the Tawk.to chat widget in the bottom-right corner
   - Test by sending a message

### Tawk.to vs WhatsApp Widget
- **Tawk.to**: Real-time chat with typing indicators, file sharing, and chat history
- **WhatsApp**: Direct link to WhatsApp for mobile-first communication
- You can enable both or choose one based on your preference

## Backend Implementation

### Settings Storage
All settings are stored in Firestore:
- Collection: `settings`
- Document: `general`
- Fields are automatically created when you save

### API Endpoints
- `GET /api/settings` - Retrieve all settings
- `PUT /api/settings` - Update settings (admin only)

### Frontend Context
Settings are globally available via `SettingsContext`:
```javascript
import { useSettings } from '../../context/SettingsContext';

const MyComponent = () => {
  const { settings } = useSettings();
  
  if (settings.enableTraining) {
    // Show training content
  }
};
```

## Troubleshooting

### Tawk.to Not Showing
1. Verify the Property ID is correct (no extra spaces)
2. Check that "Enable Tawk.to Live Chat" is checked
3. Clear your browser cache
4. Check browser console for errors

### Feature Toggle Not Working
1. Ensure you clicked "Save All Settings"
2. Refresh the public website
3. Check that the backend server is running

### WhatsApp Widget Not Showing
1. Verify "Enable WhatsApp Widget" is checked
2. Ensure a WhatsApp number is configured in Settings
3. Check that the number format is correct (e.g., 254700000000)

## Best Practices

1. **Test Before Disabling**: Always test features before disabling them on a live site
2. **Backup Settings**: Keep a record of your Tawk.to credentials
3. **Monitor Chat**: If using Tawk.to, ensure someone monitors the chat during business hours
4. **Mobile Testing**: Test all widgets on mobile devices to ensure they don't overlap
5. **Performance**: Disable unused features to improve page load speed

## Support

For issues with:
- **Feature Toggles**: Check the browser console and backend logs
- **Tawk.to**: Visit [Tawk.to Support](https://help.tawk.to/)
- **WhatsApp**: Ensure the number format matches international standards
