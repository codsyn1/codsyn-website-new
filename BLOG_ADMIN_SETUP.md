# Blog Admin Panel Setup

This document explains how to set up and configure the blog admin panel for your Codsyn website.

## Features

- **Firebase Authentication**: Secure admin login system
- **Blog Management**: Create, edit, delete, and manage blog posts
- **Rich Text Editor**: Markdown-based editor with toolbar
- **Image Upload**: Support for both URL and file uploads
- **SEO Optimization**: Built-in SEO fields and meta tags
- **Category Management**: Organize blogs with categories
- **Public Blog Pages**: Beautiful blog listing and detail pages
- **Responsive Design**: Works on all devices

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable Authentication (Email/Password method)
4. Create Firestore Database
5. Set up Storage for image uploads

### 3. Configure Firebase

Update `lib/firebase.js` with your Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### 4. Create Admin User

1. In Firebase Authentication, create an admin user
2. In Firestore, create a document in the `users` collection with the user's UID:

```javascript
{
  uid: "user-uid-here",
  email: "admin@example.com",
  role: "admin",
  createdAt: new Date()
}
```

### 5. Firestore Security Rules

Add these security rules to your Firestore database:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Blogs collection - public read, admin write
    match /blogs/{blogId} {
      allow read: if request.auth != null && request.auth.token.role == 'admin' || resource.data.status == 'published';
      allow write, delete: if request.auth != null && request.auth.token.role == 'admin';
      allow create: if request.auth != null && request.auth.token.role == 'admin';
    }
    
    // Users collection - admin only
    match /users/{userId} {
      allow read, write, delete: if request.auth != null && request.auth.token.role == 'admin';
    }
  }
}
```

### 6. Storage Security Rules

Add these security rules to Firebase Storage:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /blog-images/{imageId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.role == 'admin';
    }
  }
}
```

## Usage

### Admin Panel

1. Navigate to `/admin/login`
2. Login with your admin credentials
3. Access the dashboard at `/admin/dashboard`
4. Manage blogs from `/admin/blogs`

### Blog Management

- **Create New Blog**: `/admin/blogs/new`
- **Edit Blog**: `/admin/blogs/[id]/edit`
- **View All Blogs**: `/admin/blogs`

### Public Blog Pages

- **Blog Listing**: `/blog`
- **Blog Detail**: `/blog/[slug]`

## File Structure

```
├── app/
│   ├── admin/
│   │   ├── login/
│   │   │   └── page.js              # Admin login page
│   │   ├── dashboard/
│   │   │   └── page.js              # Admin dashboard
│   │   └── blogs/
│   │       ├── page.js              # Blog list (admin)
│   │       ├── new/
│   │       │   └── page.js          # Create new blog
│   │       └── [id]/
│   │           └── edit/
│   │               └── page.js      # Edit blog
│   └── blog/
│       ├── page.js                  # Public blog listing
│       └── [slug]/
│           └── page.js              # Blog detail page
├── lib/
│   ├── firebase.js                  # Firebase configuration
│   ├── auth.js                      # Authentication service
│   └── blogService.js               # Blog CRUD operations
└── contexts/
    └── AuthContext.js               # Authentication context
```

## Features Overview

### Admin Features

- **Secure Authentication**: Firebase-based login system
- **Dashboard**: Overview of blog statistics
- **Blog Management**: Full CRUD operations
- **Rich Editor**: Markdown editor with toolbar
- **Image Management**: Upload and manage blog images
- **SEO Tools**: Meta tags and optimization
- **Category System**: Organize content effectively
- **Status Management**: Draft, published, scheduled posts

### Public Features

- **Blog Listing**: Searchable and filterable blog archive
- **Blog Details**: Beautiful article reading experience
- **Related Posts**: Automatic related content suggestions
- **Social Sharing**: Built-in share functionality
- **Responsive Design**: Mobile-friendly interface

## Customization

### Styling

The admin panel uses your website's existing theme with purple accents. You can customize colors by modifying the Tailwind classes in the components.

### Blog Content

The blog system supports:
- Markdown formatting
- Image uploads
- Categories and tags
- SEO meta tags
- Author information
- Publishing status

### SEO Features

- Custom meta titles and descriptions
- URL slugs
- Image alt tags
- Structured data support
- Social media optimization

## Deployment

1. Build your Next.js application: `npm run build`
2. Deploy to your preferred hosting platform
3. Ensure Firebase configuration is properly set up for production
4. Test all admin and public functionality

## Support

For issues or questions:
1. Check Firebase console for any configuration issues
2. Verify security rules are properly set
3. Ensure admin user has correct role in Firestore
4. Test image upload functionality in Storage

## Security Notes

- Always use environment variables for Firebase config in production
- Regularly update Firebase SDK versions
- Monitor admin user access
- Keep security rules updated
- Use strong passwords for admin accounts
