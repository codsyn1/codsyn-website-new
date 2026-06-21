import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where, 
  limit,
  Timestamp,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { db, storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const BLOG_COLLECTION = 'blogs';

export interface BlogData {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  categories: string[];
  tags: string[];
  status: 'draft' | 'published' | 'scheduled';
  featuredImage?: string;
  createdAt: any;
  updatedAt: any;
  publishedAt?: any;
  scheduledFor?: any;
  seo?: {
    title: string;
    description: string;
    canonical?: string;
  };
  ogMeta?: {
    title: string;
    description: string;
    image: string;
  };
  schemaType: string;
}

const mapDocToBlog = (doc: QueryDocumentSnapshot<DocumentData>): BlogData => {
  const data = doc.data();
  return {
    id: doc.id,
    ...data
  } as BlogData;
};

export const blogService = {
  // Get all blogs
  async getAllBlogs(): Promise<BlogData[]> {
    try {
      const q = query(collection(db, BLOG_COLLECTION), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(mapDocToBlog);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  },

  // Get published blogs for public view
  async getPublishedBlogs(limitCount = 10): Promise<BlogData[]> {
    try {
      const q = query(
        collection(db, BLOG_COLLECTION),
        where('status', '==', 'published'),
        orderBy('publishedAt', 'desc'),
        limit(limitCount)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(mapDocToBlog);
    } catch (error) {
      console.error('Error fetching published blogs:', error);
      throw error;
    }
  },

  // Get blog by slug
  async getBlogBySlug(slug: string): Promise<BlogData | null> {
    try {
      const q = query(collection(db, BLOG_COLLECTION), where('slug', '==', slug));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) return null;
      return mapDocToBlog(querySnapshot.docs[0]);
    } catch (error) {
      console.error('Error fetching blog by slug:', error);
      throw error;
    }
  },

  // Get blog by ID
  async getBlogById(id: string): Promise<BlogData | null> {
    try {
      const docRef = doc(db, BLOG_COLLECTION, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as BlogData;
      }
      return null;
    } catch (error) {
      console.error('Error fetching blog by ID:', error);
      throw error;
    }
  },

  // Create new blog
  async createBlog(blogData: Omit<BlogData, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const now = Timestamp.now();
      const blogWithTimestamps = {
        ...blogData,
        createdAt: now,
        updatedAt: now,
        publishedAt: blogData.status === 'published' ? now : null
      };
      
      const docRef = await addDoc(collection(db, BLOG_COLLECTION), blogWithTimestamps);
      return docRef.id;
    } catch (error) {
      console.error('Error creating blog:', error);
      throw error;
    }
  },

  // Update blog
  async updateBlog(id: string, blogData: Partial<BlogData>): Promise<boolean> {
    try {
      const blogRef = doc(db, BLOG_COLLECTION, id);
      const updateData = {
        ...blogData,
        updatedAt: Timestamp.now()
      };
      
      if (blogData.status === 'published' && !blogData.publishedAt) {
        updateData.publishedAt = Timestamp.now();
      }
      
      await updateDoc(blogRef, updateData);
      return true;
    } catch (error) {
      console.error('Error updating blog:', error);
      throw error;
    }
  },

  // Delete blog
  async deleteBlog(id: string): Promise<boolean> {
    try {
      const blogRef = doc(db, BLOG_COLLECTION, id);
      await deleteDoc(blogRef);
      return true;
    } catch (error) {
      console.error('Error deleting blog:', error);
      throw error;
    }
  },

  // Search blogs (client-side simple filter)
  async searchBlogs(searchTerm: string, limitCount = 10): Promise<BlogData[]> {
    try {
      const q = query(
        collection(db, BLOG_COLLECTION),
        where('status', '==', 'published'),
        orderBy('publishedAt', 'desc'),
        limit(50)
      );
      const querySnapshot = await getDocs(q);
      const blogs = querySnapshot.docs.map(mapDocToBlog);
      
      const filtered = blogs.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      return filtered.slice(0, limitCount);
    } catch (error) {
      console.error('Error searching blogs:', error);
      throw error;
    }
  },

  // Upload image to Firebase Storage
  async uploadImage(file: File, folder = 'blog-images'): Promise<string> {
    try {
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name.replace(/\s+/g, '_')}`;
      const storageRef = ref(storage, `${folder}/${fileName}`);
      
      console.log(`Starting upload to ${folder}/${fileName}...`);
      
      // Convert File to a fresh Blob to ensure no stale metadata is attached
      const blob = new Blob([file], { type: file.type });
      
      const snapshot = await uploadBytes(storageRef, blob, {
        cacheControl: 'public,max-age=31536000',
      });
      
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('Upload successful! URL:', downloadURL);
      
      return downloadURL;
    } catch (error: any) {
      console.error('Detailed Upload Error:', {
        message: error.message,
        code: error.code,
        name: error.name,
        serverResponse: error.serverResponse,
        fullError: error
      });
      throw error;
    }
  }
};
