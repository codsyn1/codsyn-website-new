'use client';

import React, { useState, useEffect } from 'react';
import { blogService, BlogData } from '@/lib/blogService';
import { 
  ArrowRight, 
  Calendar, 
  User, 
  Search, 
  TrendingUp,
  Tag,
  Loader2
} from 'lucide-react';
import Link from 'next/link';

export default function BlogListingPage() {
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await blogService.getPublishedBlogs(20);
      setBlogs(data);
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#0f111a] pt-24 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold uppercase tracking-widest border border-purple-400/20 mb-6 animate-in fade-in slide-in-from-bottom-4 shadow-lg shadow-purple-500/5 backdrop-blur-md">
           <TrendingUp className="w-4 h-4" />
           The Core Intelligence
        </div>
        <h1 className="text-4xl md:text-6xl font-inter font-bold text-white mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
           OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">BLOGS</span>
        </h1>
        <p className="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000">
          Unfiltered insights on software, cloud engineering, and the future of digital products. Pure tech, zero noise.
        </p>
      </section>

      {/* Search & Filter */}
      <section className="max-w-5xl mx-auto px-6 mb-16 relative z-10">
        <div className="bg-[#1a1c2e] border border-white/5 rounded-3xl p-2 shadow-2xl flex items-center group focus-within:border-purple-500/50 transition-all">
          <Search className="w-6 h-6 text-slate-600 ml-6 group-focus-within:text-purple-400 transition-colors" />
          <input
            type="text"
            placeholder="Search the directory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent text-white outline-none py-5 px-6 text-xl placeholder:text-slate-700 font-inter"
          />
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
            <span className="font-inter text-sm uppercase tracking-widest">Synchronizing...</span>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-32 bg-[#1a1c2e] rounded-[3rem] border border-white/5">
            <p className="text-3xl font-bold text-slate-700 uppercase font-inter">No Articles Found</p>
            <p className="text-slate-500 mt-2">Adjust your search to find what you need.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredBlogs.map((blog, i) => (
              <article 
                key={blog.id} 
                className="group relative flex flex-col bg-[#1a1c2e] rounded-[2.5rem] border border-white/5 overflow-hidden hover:border-purple-500/30 transition-all duration-700 hover:-translate-y-2 shadow-2xl"
              >
                {/* Image Handle */}
                <div className="aspect-[16/10] overflow-hidden relative transition-all duration-700">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c2e] via-transparent to-transparent z-10" />
                  {blog.featuredImage ? (
                    <img 
                      src={blog.featuredImage} 
                      alt={blog.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                  ) : (
                    <div className="w-full h-full bg-purple-500/5 flex items-center justify-center">
                       <Tag className="w-16 h-16 text-purple-500/10" />
                    </div>
                  )}
                  
                  {/* Category Link */}
                  <div className="absolute top-6 left-6 z-20">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-purple-600 px-4 py-1.5 rounded-full shadow-lg shadow-purple-500/20">
                       {blog.categories?.[0] || 'GENERAL'}
                    </span>
                  </div>
                </div>

                {/* Content Handle */}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-4">
                    <div className="flex items-center gap-1.5 underline decoration-purple-500/30">
                      <User className="w-3 h-3" />
                      {blog.author}
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {blog.publishedAt?.toDate().toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
                    </div>
                  </div>

                  <Link href={`/${blog.slug}`} className="block mb-4">
                    <h2 className="text-2xl font-bold text-white font-inter group-hover:text-purple-400 transition-colors leading-tight">
                       {blog.title}
                    </h2>
                  </Link>

                  <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3">
                    {blog.excerpt || 'Read the latest deep dive from the CODSYN intelligence engine focus on premium engineering.'}
                  </p>

                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                     <Link 
                       href={`/${blog.slug}`} 
                       className="flex items-center gap-2 text-white font-semibold text-xs uppercase tracking-widest group/btn"
                     >
                       Full Read
                       <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform text-purple-500" />
                     </Link>
                     <div className="flex gap-1 group-hover:opacity-100 transition-opacity">
                        <div className="w-1 h-1 rounded-full bg-slate-700" />
                        <div className="w-1 h-1 rounded-full bg-slate-700" />
                        <div className="w-1 h-1 rounded-full bg-purple-500" />
                     </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Decorative Blur */}
      <div className="fixed top-1/4 -right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-1/4 -left-20 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
    </main>
  );
}
