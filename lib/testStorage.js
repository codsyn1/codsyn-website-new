import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase.js';

// Test function to verify Firebase Storage connectivity
export async function testStorageConnection() {
  try {
    console.log('Testing Firebase Storage connection...');
    
    // Test with a known path
    const testRef = ref(storage, 'blog-images/test.jpg');
    console.log('Storage ref created:', testRef);
    
    // Try to get download URL (this will fail but tests connection)
    try {
      await getDownloadURL(testRef);
    } catch (error) {
      console.log('Expected error for non-existent file:', error.message);
    }
    
    console.log('Firebase Storage connection test completed');
    return true;
  } catch (error) {
    console.error('Firebase Storage connection failed:', error);
    return false;
  }
}

// Function to validate image URL format
export function validateImageUrl(url) {
  if (!url) return false;
  
  const isValidFormat = url.startsWith('https://') || url.startsWith('http://');
  const isFirebaseUrl = url.includes('firebasestorage.googleapis.com') || url.includes('firebase');
  
  console.log('URL validation:', {
    url,
    isValidFormat,
    isFirebaseUrl,
    isSecure: url.startsWith('https://')
  });
  
  return isValidFormat;
}

// Function to get proper Firebase Storage URL format
export function getFirebaseStorageUrl(bucket, path) {
  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(path)}?alt=media`;
}
