'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { blogService, BlogData } from '@/lib/blogService';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Share2,
  Tag,
  Loader2,
  Clock,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { SocialIcon } from 'react-social-icons';
import Link from 'next/link';
import nextDynamic from 'next/dynamic';

const MDEditorPreview = nextDynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default.Markdown),
  { ssr: false }
);

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();

  const [blog, setBlog] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const data = await blogService.getBlogBySlug(slug);
      if (data) {
        setBlog(data);
      } else {
        setError('Article not found.');
      }
    } catch (err) {
      console.error('Failed to fetch blog:', err);
      setError('An error occurred while loading the article.');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = (platform: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const text = blog?.title || '';
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook': shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`; break;
      case 'twitter': shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`; break;
      case 'linkedin': shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`; break;
    }
    
    if (shareUrl) window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f111a] flex flex-col items-center justify-center p-6">
        <Loader2 className="w-16 h-16 text-purple-500 animate-spin mb-6" />
        <p className="text-xl font-bold text-white font-inter tracking-widest uppercase animate-pulse">Initializing Data Stream</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-[#0f111a] pt-32 pb-20 px-6 flex items-center justify-center text-center">
        <div className="max-w-2xl bg-[#1a1c2e] border border-white/5 rounded-[3rem] p-16 shadow-2xl">
          <h1 className="text-5xl font-bold text-white font-inter mb-6 uppercase tracking-tighter">404 <span className="text-purple-500">ARTICLE</span></h1>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">This intelligence sector is unreachable or has been archived. Check your signal.</p>
          <button 
            onClick={() => router.push('/blog')}
            className="inline-flex items-center gap-3 bg-purple-600 text-white font-bold px-10 py-4 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(147,51,234,0.2)] uppercase text-sm tracking-widest"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Hub
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-[#0f111a] text-white pt-24 pb-32">
      {/* Article Header & Image */}
      <header className="max-w-5xl mx-auto px-6 mb-16 text-center">
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {blog.categories.map((cat, i) => (
            <span key={i} className="px-4 py-1.5 bg-purple-500/10 text-purple-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-purple-400/20">
               {cat}
            </span>
          ))}
        </div>

        <h1 className="text-4xl md:text-6xl font-bold font-inter tracking-tighter mb-8 leading-[1.1] text-white animate-in fade-in slide-in-from-bottom-8 duration-700">
           {blog.title}
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-slate-500 font-semibold uppercase tracking-widest text-[11px] mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-400/20">
               <User className="w-4 h-4 text-purple-400" />
            </div>
            {blog.author}
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-purple-500/50" />
            {blog.publishedAt?.toDate().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-500/50" />
            {Math.ceil(blog.content.length / 1000) + 1} MIN READ
          </div>
        </div>

        {/* Hero Banner */}
        <div className="aspect-[21/9] rounded-[3rem] overflow-hidden bg-[#1a1c2e] shadow-3xl border border-white/5 transition-all duration-1000 relative group">
           <div className="absolute inset-0 bg-gradient-to-t from-[#0f111a]/80 via-transparent to-transparent z-10" />
           {blog.featuredImage ? (
             <img 
               src={blog.featuredImage} 
               alt={blog.title} 
               className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105" 
             />
           ) : (
             <div className="w-full h-full flex items-center justify-center opacity-10">
               <Tag className="w-32 h-32 text-purple-500" />
             </div>
           )}
        </div>
      </header>

      {/* Article Navigation & Social */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
        {/* Left Sidebar: Share */}
        <aside className="lg:col-span-1 hidden lg:block sticky top-32 h-fit">
           <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold uppercase text-slate-700 writing-vertical-lr tracking-widest mb-4">ENGAGEMENT HUB</span>
              <button onClick={() => handleShare('facebook')} className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all text-slate-500 hover:text-purple-400 group">
                 <SocialIcon network="facebook" style={{ height: 24, width: 24 }} bgColor="transparent" fgColor="currentColor" />
              </button>
              <button onClick={() => handleShare('twitter')} className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all text-slate-500 hover:text-purple-400 group">
                 <SocialIcon network="twitter" style={{ height: 24, width: 24 }} bgColor="transparent" fgColor="currentColor" />
              </button>
              <button onClick={() => handleShare('linkedin')} className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all text-slate-500 hover:text-purple-400 group">
                 <SocialIcon network="linkedin" style={{ height: 24, width: 24 }} bgColor="transparent" fgColor="currentColor" />
              </button>
              <div className="mt-8 pt-8 border-t border-white/5">
                 <button className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center border border-purple-500/20 text-purple-400 shadow-lg shadow-purple-500/10">
                    <Share2 className="w-5 h-5" />
                 </button>
              </div>
           </div>
        </aside>

        {/* Content Body */}
        <main className="lg:col-span-8">
           <div className="bg-[#1a1c2e]/50 backdrop-blur-md border border-white/5 rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden group">
              {/* Content Decorative Highlight */}
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-purple-500/10 transition-all duration-1000" />
              
              <div data-color-mode="dark" className="prose prose-invert prose-purple max-w-none prose-headings:font-bold prose-headings:font-inter prose-headings:tracking-tighter prose-p:text-slate-300 prose-p:text-lg prose-p:leading-relaxed prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-blockquote:border-l-purple-500 prose-blockquote:italic prose-code:text-purple-400 prose-pre:bg-[#0f111a] prose-pre:border prose-pre:border-white/5 prose-img:rounded-3xl">
                 <MDEditorPreview source={blog.content} />
              </div>

              <div className="mt-20 pt-10 border-t border-white/5 flex flex-wrap gap-4">
                 {blog.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-mono text-slate-500 hover:text-purple-400 cursor-pointer transition-colors">
                       #{tag}
                    </span>
                 ))}
              </div>
           </div>

           {/* Mobile Share Hub */}
           <div className="lg:hidden mt-8 p-6 bg-[#1a1c2e] rounded-3xl border border-white/5 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-purple-400 font-inter">ENGAGE</span>
              <div className="flex gap-4">
                 <SocialIcon network="facebook" onClick={() => handleShare('facebook')} style={{ height: 20, width: 20 }} bgColor="transparent" fgColor="#94a3b8" className="hover:!fg-purple-500 transition-colors cursor-pointer" />
                 <SocialIcon network="twitter" onClick={() => handleShare('twitter')} style={{ height: 20, width: 20 }} bgColor="transparent" fgColor="#94a3b8" className="hover:!fg-purple-500 transition-colors cursor-pointer" />
                 <SocialIcon network="linkedin" onClick={() => handleShare('linkedin')} style={{ height: 20, width: 20 }} bgColor="transparent" fgColor="#94a3b8" className="hover:!fg-purple-500 transition-colors cursor-pointer" />
              </div>
           </div>
        </main>

        {/* Right Sidebar: Meta/CTA */}
        <aside className="lg:col-span-3 space-y-10">
           {/* Related Index (Placeholder Logic) */}
           <div className="bg-[#1a1c2e] border border-white/5 rounded-3xl p-8 sticky top-32">
              <h3 className="text-xl font-bold text-white font-inter uppercase mb-6 flex items-center gap-2">
                 <BookOpen className="w-5 h-5 text-purple-400" />
                 Directory
              </h3>
              <div className="space-y-6">
                 <Link href="/blog" className="group flex flex-col gap-2 p-4 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest font-inter group-hover:text-purple-400 transition-colors">THE FULL HUB</span>
                    <span className="text-sm font-semibold text-slate-300 leading-tight">Explore the complete architecture of our insights.</span>
                 </Link>
                 <div className="pt-6 border-t border-white/5 p-4">
                    <p className="text-xs text-slate-500 leading-relaxed font-inter">
                       Subscribe to our intelligence feed for exclusive sector updates.
                    </p>
                    <button className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl border border-transparent transition-all uppercase text-[10px] tracking-widest shadow-lg shadow-purple-500/10">
                       Join The Protocol
                    </button>
                 </div>
              </div>
           </div>
        </aside>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-32 text-center">
         <Link href="/blog" className="inline-flex items-center gap-4 text-white hover:text-purple-400 font-bold uppercase tracking-widest transition-all group">
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-4 transition-transform text-purple-500" />
            <span className="text-xl font-inter uppercase">Back to Central Command</span>
         </Link>
      </div>
    </article>
  );
}


