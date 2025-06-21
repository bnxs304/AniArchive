# Production Deployment Guide for AniArchive RSVP System

## Overview
This guide covers the steps needed to deploy the AniArchive RSVP system to production with all features working properly.

## Prerequisites
- Firebase project set up
- EmailJS account (for email functionality)
- Domain name (optional but recommended)
- Hosting platform (Vercel, Netlify, Firebase Hosting, etc.)

## Step 1: Firebase Production Setup

### 1.1 Update Firebase Security Rules
In your Firebase console, go to Firestore Database > Rules and update with production rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Admin users collection - stores admin user data
    match /adminUsers/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // RSVP collection - main data storage
    match /rsvps/{document} {
      // Allow reads for checking existing RSVPs (limited to email field)
      allow read: if request.auth != null && 
                   exists(/databases/$(database)/documents/adminUsers/$(request.auth.uid))
                   || 
                   // Allow limited reads for email checking during RSVP submission
                   (request.method == 'get' && 
                    request.query.limit <= 1 && 
                    request.query.filters.size() == 1 &&
                    request.query.filters[0].fieldPath == 'email');
      
      // Allow writes for RSVP submissions with basic validation
      allow create: if request.resource.data.email is string 
                    && request.resource.data.email.matches('.*@.*\\..*')
                    && request.resource.data.raffleCode is string
                    && request.resource.data.timestamp is timestamp
                    && request.resource.data.eventTitle is string
                    && request.resource.data.eventDate is string;
      
      // Allow updates and deletes only for admin users
      allow update, delete: if request.auth != null && 
                            exists(/databases/$(database)/documents/adminUsers/$(request.auth.uid));
    }
  }
}
```

### 1.2 Enable Firebase Authentication
1. In Firebase console, go to Authentication > Sign-in method
2. Enable Email/Password authentication
3. Create admin user accounts (see Step 1.3)

### 1.3 Create Admin Users
1. In Firebase console, go to Authentication > Users
2. Click "Add user"
3. Enter admin email and password
4. Create a document in the `adminUsers` collection with the user's UID as the document ID
5. Add any additional admin metadata as needed

### 1.4 Enable Firebase Analytics (Optional)
In Firebase console, go to Analytics and enable it for better tracking.

## Step 2: EmailJS Setup

### 2.1 Create EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/) and sign up
2. Verify your email address

### 2.2 Create Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Add a new service (Gmail, Outlook, or custom SMTP)
3. Note down the Service ID

### 2.3 Create Email Template
1. Go to "Email Templates"
2. Create a new template with the following variables:
   - `{{to_email}}` - Recipient email
   - `{{raffle_code}}` - Generated raffle code
   - `{{event_title}}` - Event title
   - `{{event_date}}` - Event date
   - `{{event_time}}` - Event time
   - `{{venue_name}}` - Venue name
   - `{{venue_address}}` - Venue address

3. Example template

4. Note down the Template ID

### 2.4 Get Public Key
1. Go to "Account" > "API Keys"
2. Copy your Public Key

## Step 3: Environment Variables Setup

### 3.1 Create Production Environment File
Create a env file in your project root:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-actual-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-actual-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-actual-messaging-sender-id
VITE_FIREBASE_APP_ID=your-actual-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-actual-measurement-id

# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your-emailjs-service-id
VITE_EMAILJS_TEMPLATE_ID=your-emailjs-template-id
VITE_EMAILJS_PUBLIC_KEY=your-emailjs-public-key
```

### 3.2 Set Environment Variables on Hosting Platform
If using Vercel, Netlify, or similar, add these environment variables in your hosting platform's dashboard.

## Step 4: Build and Deploy

### 4.1 Build the Application
```bash
npm run build
```

### 4.2 Deploy to Your Chosen Platform

#### Option A: Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`
3. Follow the prompts

#### Option B: Netlify
1. Drag and drop the `dist` folder to Netlify
2. Or connect your GitHub repository

#### Option C: Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Deploy: `firebase deploy`

## Step 5: Post-Deployment Testing

### 5.1 Test RSVP Functionality
1. Visit your deployed site
2. Click "RSVP Now"
3. Enter a test email
4. Verify the email is received
5. Check Firebase console for the RSVP entry

### 5.2 Test Admin Panel
1. Visit `yourdomain.com/admin`
2. Login with admin credentials
3. Verify RSVP data is displayed
4. Test CSV export functionality
5. Check statistics are working

### 5.3 Test Email Delivery
1. Check spam folders
2. Verify email template rendering
3. Test with different email providers

## Step 6: Monitoring and Maintenance

### 6.1 Set Up Monitoring
- Enable Firebase Analytics
- Set up error tracking (Sentry, LogRocket, etc.)
- Monitor email delivery rates

### 6.2 Regular Maintenance
- Monitor RSVP data regularly
- Check email service quotas
- Update event information as needed
- Backup RSVP data periodically

## Troubleshooting

### Common Issues

#### Emails Not Sending
- Check EmailJS configuration
- Verify service and template IDs
- Check email service quotas
- Review browser console for errors

#### RSVP Data Not Saving
- Check Firebase security rules
- Verify Firebase configuration
- Check network connectivity
- Review browser console for errors

#### Admin Panel Not Loading
- Verify admin route is accessible
- Check Firebase permissions
- Ensure environment variables are set
- Verify admin user exists in Firebase Auth and adminUsers collection

### Support Resources
- [Firebase Documentation](https://firebase.google.com/docs)
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

## Security Considerations

1. **Environment Variables**: Never commit `.env` files to version control
2. **Firebase Rules**: Use restrictive rules in production
3. **Email Validation**: Server-side validation is recommended
4. **Rate Limiting**: Consider implementing rate limiting for RSVP submissions
5. **Data Privacy**: Ensure compliance with GDPR and other privacy regulations
6. **Admin Authentication**: Use strong passwords and consider 2FA for admin accounts

## Performance Optimization

1. **Image Optimization**: Optimize event images for web
2. **Code Splitting**: Implement lazy loading for admin panel
3. **Caching**: Set up proper caching headers
4. **CDN**: Use a CDN for static assets

## Backup Strategy

1. **Firebase Export**: Regularly export Firestore data
2. **Email Backup**: Keep copies of email templates
3. **Code Backup**: Use version control (Git)
4. **Configuration Backup**: Document all configuration settings 