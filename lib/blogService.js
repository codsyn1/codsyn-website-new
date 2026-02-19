import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../lib/firebase';

const BLOGS_COLLECTION = 'blogs';

// Blog service object
export const blogService = {
  // Create new blog
  async createBlog(blogData) {
    try {
      const docRef = await addDoc(collection(db, BLOGS_COLLECTION), {
        ...blogData,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Blog creation error:', error);
      throw new Error('Failed to create blog: ' + error.message);
    }
  },

  // Get all blogs
  async getAllBlogs() {
    try {
      const q = query(
        collection(db, BLOGS_COLLECTION),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const blogs = [];
      
      querySnapshot.forEach((doc) => {
        const blogData = { id: doc.id, ...doc.data() };
        // Include all blogs for admin (published, draft, scheduled)
        blogs.push(blogData);
      });
      
      console.log('Fetched all blogs:', blogs);
      return blogs;
    } catch (error) {
      console.error('Error fetching all blogs:', error);
      throw new Error('Failed to fetch blogs: ' + error.message);
    }
  },

  // Get paginated blogs
  async getPaginatedBlogs(page = 1, pageSize = 10, lastDoc = null) {
    try {
      let q = query(
        collection(db, BLOGS_COLLECTION),
        orderBy('createdAt', 'desc'),
        limit(pageSize)
      );

      // If we have a last document, start after it
      if (lastDoc) {
        q = query(
          collection(db, BLOGS_COLLECTION),
          orderBy('createdAt', 'desc'),
          startAfter(lastDoc),
          limit(pageSize)
        );
      }

      const querySnapshot = await getDocs(q);
      const blogs = [];
      let newLastDoc = null;

      querySnapshot.forEach((doc) => {
        const blogData = { id: doc.id, ...doc.data() };
        // Include all blogs for admin (published, draft, scheduled)
        blogs.push(blogData);
        newLastDoc = doc;
      });
      
      console.log(`Fetched page ${page} blogs:`, blogs);
      return {
        blogs,
        lastDoc: newLastDoc,
        hasMore: blogs.length === pageSize
      };
    } catch (error) {
      console.error('Error fetching paginated blogs:', error);
      throw new Error('Failed to fetch paginated blogs: ' + error.message);
    }
  },

  // Get published blogs
  async getPublishedBlogs(limitCount = 10) {
    try {
      // Simple query without composite index - filter on client side
      const q = query(
        collection(db, BLOGS_COLLECTION),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
      const querySnapshot = await getDocs(q);
      const blogs = [];
      
      querySnapshot.forEach((doc) => {
        const blogData = { id: doc.id, ...doc.data() };
        // Filter published blogs on client side
        if (blogData.status === 'published') {
          blogs.push(blogData);
        }
      });
      
      console.log('Fetched published blogs:', blogs);
      return blogs;
    } catch (error) {
      console.error('Error fetching published blogs:', error);
      throw new Error('Failed to fetch published blogs: ' + error.message);
    }
  },

  // Get blog by ID
  async getBlogById(id) {
    try {
      const docRef = doc(db, BLOGS_COLLECTION, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error('Blog not found');
      }
    } catch (error) {
      throw new Error('Failed to fetch blog: ' + error.message);
    }
  },

  // Get blog by slug
  async getBlogBySlug(slug) {
    try {
      const q = query(
        collection(db, BLOGS_COLLECTION),
        where('slug', '==', slug),
        limit(1)
      );
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        throw new Error('Blog not found');
      } else {
        const doc = querySnapshot.docs[0];
        return { id: doc.id, ...doc.data() };
      }
    } catch (error) {
      throw new Error('Failed to fetch blog: ' + error.message);
    }
  },

  // Update blog
  async updateBlog(id, blogData) {
    try {
      const docRef = doc(db, BLOGS_COLLECTION, id);
      await updateDoc(docRef, {
        ...blogData,
        updatedAt: new Date()
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Delete blog
  async deleteBlog(id) {
    try {
      const docRef = doc(db, BLOGS_COLLECTION, id);
      await deleteDoc(docRef);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Search blogs
  async searchBlogs(searchTerm, limitCount = 10) {
    try {
      // Note: Firestore doesn't support full-text search natively
      // This is a simple implementation that searches in title and content
      const blogs = await this.getAllBlogs();
      const filteredBlogs = blogs.filter(blog => 
        blog.status === 'published' && (
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      ).slice(0, limitCount);
      
      return filteredBlogs;
    } catch (error) {
      throw new Error('Failed to search blogs: ' + error.message);
    }
  },

  // Get blogs by category
  async getBlogsByCategory(category, limitCount = 10) {
    try {
      const blogs = await this.getAllBlogs();
      const filteredBlogs = blogs.filter(blog => 
        blog.status === 'published' && 
        blog.categories.includes(category)
      ).slice(0, limitCount);
      
      return filteredBlogs;
    } catch (error) {
      throw new Error('Failed to fetch blogs by category: ' + error.message);
    }
  },

  // Upload image
  async uploadImage(file, path) {
    try {
      console.log('Uploading image to path:', path);
      console.log('File details:', {
        name: file.name,
        size: file.size,
        type: file.type
      });
      
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      
      console.log('Upload successful, snapshot:', snapshot);
      
      // Get the download URL using the correct method
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      // Ensure the URL is properly formatted
      const formattedURL = downloadURL.includes('https://') ? downloadURL : `https://${downloadURL}`;
      
      console.log('Download URL generated:', formattedURL);
      console.log('URL format check:', {
        original: downloadURL,
        formatted: formattedURL,
        hasHttps: downloadURL.includes('https://')
      });
      
      return { success: true, url: formattedURL };
    } catch (error) {
      console.error('Image upload error:', error);
      return { success: false, error: error.message };
    }
  },

  // Get all categories
  async getAllCategories() {
    try {
      const blogs = await this.getAllBlogs();
      const allCategories = new Set();
      
      blogs.forEach(blog => {
        if (blog.categories && Array.isArray(blog.categories)) {
          blog.categories.forEach(category => allCategories.add(category));
        }
      });
      
      return Array.from(allCategories);
    } catch (error) {
      throw new Error('Failed to fetch categories: ' + error.message);
    }
  }
};
