import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogService } from '../services/blogService';
import { Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin, ArrowLeft, Clock } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const blogData = await blogService.getBlogBySlug(slug);
      
      if (!blogData) {
        setError('Blog post not found');
        return;
      }

      setBlog(blogData);
      
      // Fetch related blogs based on categories
      if (blogData.categories && blogData.categories.length > 0) {
        const related = await blogService.getBlogsByCategory(
          blogData.categories[0], 
          3
        );
        setRelatedBlogs(related.filter(b => b.id !== blogData.id));
      }

      // Update page title and meta
      updatePageMeta(blogData);
    } catch (err) {
      setError('Failed to load blog post');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updatePageMeta = (blogData) => {
    document.title = blogData.seo?.title || blogData.title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = blogData.seo?.description || blogData.excerpt;
    }

    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = blogData.seo?.canonical || `https://stagchemist.com/blog/${blogData.slug}`;

    // Add structured data
    const structuredData = generateStructuredData(blogData);
    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

    // Add Open Graph meta tags
    updateOpenGraphMeta(blogData);
  };

  const generateStructuredData = (blogData) => {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': blogData.schemaType || 'BlogPosting',
      headline: blogData.title,
      description: blogData.excerpt || blogData.seo?.description,
      image: blogData.featuredImage || blogData.ogMeta?.image,
      datePublished: blogData.publishedAt?.toDate?.() || blogData.publishedAt,
      dateModified: blogData.updatedAt?.toDate?.() || blogData.updatedAt,
      author: {
        '@type': 'Person',
        name: blogData.author || 'StagChemist Team'
      },
      publisher: {
        '@type': 'Organization',
        name: 'StagChemist',
        logo: {
          '@type': 'ImageObject',
          url: 'https://stagchemist.com/logo.png'
        }
      }
    };

    if (blogData.pharmacyCompliance?.reviewedByPharmacist) {
      baseData.reviewedBy = {
        '@type': 'Person',
        name: blogData.pharmacyCompliance.reviewedByPharmacist
      };
    }

    return baseData;
  };

  const updateOpenGraphMeta = (blogData) => {
    const ogTags = [
      { property: 'og:title', content: blogData.ogMeta?.title || blogData.title },
      { property: 'og:description', content: blogData.ogMeta?.description || blogData.excerpt },
      { property: 'og:image', content: blogData.ogMeta?.image || blogData.featuredImage },
      { property: 'og:url', content: `https://stagchemist.com/blog/${blogData.slug}` },
      { property: 'og:type', content: 'article' },
      { property: 'article:published_time', content: blogData.publishedAt },
      { property: 'article:author', content: blogData.author }
    ];

    ogTags.forEach(({ property, content }) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        document.head.appendChild(metaTag);
      }
      metaTag.content = content;
    });

    // Twitter Card meta tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: blogData.ogMeta?.title || blogData.title },
      { name: 'twitter:description', content: blogData.ogMeta?.description || blogData.excerpt },
      { name: 'twitter:image', content: blogData.ogMeta?.image || blogData.featuredImage }
    ];

    twitterTags.forEach(({ name, content }) => {
      let metaTag = document.querySelector(`meta[name="${name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', name);
        document.head.appendChild(metaTag);
      }
      metaTag.content = content;
    });
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getReadingTime = (content) => {
    if (!content) return '2 min read';
    const wordsPerMinute = 200;
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const generateTableOfContents = (content) => {
    if (!content) return [];
    
    // Simple regex to find markdown headers - fixed to prevent duplicates
    const headerRegex = /^(#{1,6})\s+(.+)$/gm;
    const headers = [];
    const seenHeaders = new Set();
    let match;
    
    while ((match = headerRegex.exec(content)) !== null) {
      const headerText = match[2].trim();
      // Only add if we haven't seen this header before
      if (!seenHeaders.has(headerText)) {
        headers.push({
          id: `heading-${headers.length}`,
          text: headerText,
          level: match[1].length
        });
        seenHeaders.add(headerText);
      }
    }
    
    return headers;
  };

  const scrollToHeading = (headerId) => {
    const element = document.getElementById(headerId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const shareOnSocial = (platform) => {
    const url = `https://stagchemist.com/blog/${blog.slug}`;
    const title = blog.title;
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };
    
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-8">{error || 'The blog post you are looking for does not exist.'}</p>
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const tableOfContents = generateTableOfContents(blog.content);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb Navigation */}
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              to="/blog"
              className="inline-flex items-center text-emerald-600 hover:text-emerald-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <header className="mb-8">
          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {blog.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 mb-6">
            <div className="flex items-center space-x-6">
              {blog.author && (
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>{blog.author}</span>
                </div>
              )}
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{formatDate(blog.publishedAt)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{getReadingTime(blog.content)}</span>
              </div>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Share:</span>
            <button
              onClick={() => shareOnSocial('facebook')}
              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
              aria-label="Share on Facebook"
            >
              <Facebook className="w-5 h-5" />
            </button>
            <button
              onClick={() => shareOnSocial('twitter')}
              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
              aria-label="Share on Twitter"
            >
              <Twitter className="w-5 h-5" />
            </button>
            <button
              onClick={() => shareOnSocial('linkedin')}
              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Featured Image */}
        {blog.featuredImage && (
          <div className="mb-8">
            <img
              src={blog.featuredImage}
              alt={blog.imageSeo?.alt || blog.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://picsum.photos/seed/blog/800/400.jpg';
              }}
            />
            {blog.imageSeo?.caption && (
              <p className="text-center text-sm text-gray-600 mt-2 italic">
                {blog.imageSeo.caption}
              </p>
            )}
          </div>
        )}

        {/* Article Content */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-emerald-600 hover:prose-a:text-emerald-800">
            <pre className="whitespace-pre-wrap font-sans text-base leading-relaxed">{blog.content || ''}</pre>
          </div>
        </div>


        {/* Medical Disclaimer */}
        {blog.pharmacyCompliance?.medicalDisclaimer && (
          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">Medical Disclaimer</h3>
            <p className="text-yellow-700">
              {blog.pharmacyCompliance.disclaimerText}
            </p>
            {blog.pharmacyCompliance?.reviewedByPharmacist && (
              <p className="text-yellow-700 mt-2">
                <strong>Reviewed by:</strong> {blog.pharmacyCompliance.reviewedByPharmacist}
              </p>
            )}
          </div>
        )}

        {/* Related Posts */}
        {relatedBlogs.length > 0 && (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Related Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <article key={relatedBlog.id} className="group">
                  {relatedBlog.featuredImage && (
                    <img
                      src={relatedBlog.featuredImage}
                      alt={relatedBlog.title}
                      className="w-full h-32 object-cover rounded-lg mb-3 group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <Link
                    to={`/${relatedBlog.slug}`}
                    className="block text-lg font-medium text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2"
                  >
                    {relatedBlog.title}
                  </Link>
                  <p className="text-sm text-gray-600 mt-1">
                    {formatDate(relatedBlog.publishedAt)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
    <Footer />
    </>
  );
};

export default BlogDetailPage;
