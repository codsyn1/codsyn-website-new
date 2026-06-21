'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { blogService } from '@/lib/blogService';
import '@/styles/scroll-animations.css';

interface Blog {
  id: string;
  title: string;
  description?: string;
  content: string;
  featuredImage?: string;
  categories: string[];
  author: string;
  createdAt: any;
  status: string;
  slug: string;
  image?: string; // Alias for featuredImage
  featured?: boolean;
  tags?: string[];
  date?: string; // Formatted date
  readTime?: string; // Calculated read time
}

export default function Blogs() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const blogsData = await blogService.getPublishedBlogs();
      
      // Add computed properties to each blog
      const enrichedBlogs = blogsData.map(blog => ({
        ...blog,
        image: blog.featuredImage || `https://picsum.photos/seed/${blog.slug}/400/300.jpg`,
        tags: blog.categories || [],
        date: formatDate(blog.createdAt),
        readTime: getReadTime(blog.content),
        featured: blog.featured || false
      }));
      
      console.log('Enriched blogs with images:', enrichedBlogs.map(b => ({ 
        title: b.title, 
        featuredImage: b.featuredImage, 
        finalImage: b.image 
      })));
      
      setBlogs(enrichedBlogs);
    } catch (err) {
      setError('Failed to load blogs');
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadTime = (content: string) => {
    if (!content) return '1 min read';
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const readTime = Math.ceil(words / wordsPerMinute);
    return `${readTime} min read`;
  };

  const uniqueCategories = ['all', ...new Set(blogs.flatMap(blog => blog.categories || []))];

  const categories = uniqueCategories.map(category => ({
    id: category,
    name: category === 'all' ? 'All Posts' : category.charAt(0).toUpperCase() + category.slice(1),
    count: category === 'all' ? blogs.length : blogs.filter(b => b.categories?.includes(category)).length
  }));

  const filteredBlogs = activeFilter === 'all' 
    ? blogs 
    : blogs.filter(blog => blog.categories?.includes(activeFilter));

  // Scroll animations
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const { ref: filterRef, isVisible: filterVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const { ref: blogsRef, isVisible: blogsVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="blogs" className="relative py-16 text-gray-900 dark:text-white overflow-hidden mx-4 sm:mx-6 lg:mx-8">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-1000 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-sm font-inter font-semibold text-purple-600 dark:text-purple-300 uppercase tracking-widest mb-3 inline-block px-6 py-3 bg-gray-100 dark:bg-slate-800/60 border border-purple-400/40 rounded-full backdrop-blur-md shadow-lg shadow-purple-400/10">
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full animate-bounce"></span>
              Our Blog
            </span>
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-inter font-bold leading-tight mb-6">
            Insights &
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 to-purple-600">
              {" "}Articles
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest trends, tutorials, and insights from our team of experts
          </p>
        </div>

        {/* Category Filter */}
        <div 
          ref={filterRef}
          className={`flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 transition-all duration-1000 delay-200 ${
            filterVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-3 sm:px-4 md:px-6 py-2 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeFilter === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg shadow-purple-400/20'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-600'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div 
          ref={blogsRef}
          className={`grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 transition-all duration-1000 delay-400 ${
            blogsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {filteredBlogs.map((blog, index) => (
            <article
              key={index}
              className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-200 dark:border-slate-700"
            >
              {/* Blog Image */}
              <div className="relative h-36 sm:h-40 md:h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 z-10"></div>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    console.log('Image failed to load, using fallback:', blog.image);
                    target.src = `https://picsum.photos/seed/${blog.slug}/400/300.jpg`;
                  }}
                  onLoad={() => {
                    console.log('Blog card image loaded successfully:', blog.image);
                  }}
                />
                {blog.featured && (
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-purple-800 text-white text-xs font-semibold rounded-full shadow-lg">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Blog Content */}
              <div className="p-4 sm:p-6">
                {/* Meta Information */}
                <div className="flex items-center justify-between mb-2 sm:mb-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-3">
                    <span>{blog.author}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <span>{blog.date && blog.date !== 'N/A' ? new Date(blog.date).toLocaleDateString() : 'N/A'}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                  {blog.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 leading-relaxed text-sm sm:text-base">
                  {blog.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                  {(blog.tags || []).slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 text-xs rounded-full border border-gray-200 dark:border-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                  {(blog.tags || []).length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 text-xs rounded-full border border-gray-200 dark:border-slate-600">
                      +{(blog.tags || []).length - 3}
                    </span>
                  )}
                </div>

                {/* Read More Button */}
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="inline-flex items-center text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300 transition-colors group text-sm sm:text-base"
                >
                  Read More
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8 sm:mt-12">
          <button className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-900 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform text-sm sm:text-base">
            Load More Articles
          </button>
        </div>
      </div>
    </section>
  );
}
