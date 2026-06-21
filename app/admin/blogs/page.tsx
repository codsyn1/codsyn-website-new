'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { blogService, BlogData } from '@/lib/blogService';
import { logoutAdmin } from '@/lib/authService';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  LogOut, 
  LayoutDashboard, 
  BookOpen,
  Calendar,
  User,
  Tag,
  Loader2,
  FileText
} from 'lucide-react';
import Link from 'next/link';

export default function AdminBlogsPage() {
  const { isAuthenticated, loading: authLoading, user } = useAuth();
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchBlogs();
    }
  }, [isAuthenticated]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await blogService.getAllBlogs();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await blogService.deleteBlog(id);
        setBlogs(blogs.filter(blog => blog.id !== id));
      } catch (error) {
        alert('Failed to delete blog post');
      }
    }
  };

  const handleLogout = async () => {
    await logoutAdmin();
    router.push('/admin/login');
  };

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (authLoading || (!isAuthenticated && authLoading)) {
    return (
      <div className="min-h-screen bg-[#0f111a] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#00F5FF] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f111a] flex">
      {/* Sidebar - Quick Simple Version */}
      <div className="w-64 bg-[#0f172a] border-r border-white/5 p-6 hidden lg:flex flex-col">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-[#00F5FF]/10 rounded-lg flex items-center justify-center border border-[#00F5FF]/20">
            <LayoutDashboard className="w-5 h-5 text-[#00F5FF]" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight italic">ADMIN</span>
        </div>

        <nav className="flex-1 space-y-3">
          <Link href="/admin/blogs" className="flex items-center gap-3 px-4 py-4 bg-[#00F5FF]/10 text-[#00F5FF] rounded-2xl border border-[#00F5FF]/20 group transition-all">
            <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-black uppercase text-xs tracking-widest italic">Intelligence</span>
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-4 text-slate-500 hover:text-white hover:bg-white/5 rounded-2xl transition-all group">
            <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-black uppercase text-xs tracking-widest italic text-left">Architecture</span>
          </button>
        </nav>

        <div className="pt-6 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 italic tracking-tight">Blog Management</h1>
            <p className="text-slate-400">Handle all your articles from one powerful place.</p>
          </div>
          
          <Link 
            href="/admin/blogs/new"
            className="bg-[#00F5FF] hover:bg-[#00D8E0] text-black font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,245,255,0.3)] hover:scale-105 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Create Article
          </Link>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#0f172a] border border-white/5 p-8 rounded-3xl transition-transform hover:scale-105 duration-300">
            <p className="text-slate-500 text-xs mb-3 uppercase tracking-widest font-black italic">Total Intelligence</p>
            <p className="text-4xl font-black text-white italic tracking-tighter decoration-[#00F5FF] underline underline-offset-8">{blogs.length}</p>
          </div>
          <div className="bg-[#0f172a] border border-white/5 p-8 rounded-3xl transition-transform hover:scale-105 duration-300">
            <p className="text-slate-500 text-xs mb-3 uppercase tracking-widest font-black italic">Published Sectors</p>
            <p className="text-4xl font-black text-[#00F5FF] italic tracking-tighter">{blogs.filter(b => b.status === 'published').length}</p>
          </div>
          <div className="bg-[#0f172a] border border-white/5 p-8 rounded-3xl transition-transform hover:scale-105 duration-300">
            <p className="text-slate-500 text-xs mb-3 uppercase tracking-widest font-black italic">Draft Protocols</p>
            <p className="text-4xl font-black text-slate-700 italic tracking-tighter">{blogs.filter(b => b.status === 'draft').length}</p>
          </div>
        </div>

        {/* Search & Table */}
        <div className="bg-[#0f172a] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/5 bg-white/5 flex items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#0f111a] border border-slate-700 text-white rounded-xl py-2.5 pl-12 pr-4 outline-none focus:border-[#00F5FF] focus:ring-1 focus:ring-[#00F5FF] transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-white/5 text-left text-slate-400 text-sm uppercase tracking-wider font-bold">
                  <th className="px-6 py-4">Title & Status</th>
                  <th className="px-6 py-4">Author</th>
                  <th className="px-6 py-4">Categories</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  Array(3).fill(0).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={5} className="px-6 py-8">
                        <div className="h-4 bg-slate-800 rounded w-full mb-2"></div>
                        <div className="h-4 bg-slate-800/50 rounded w-2/3"></div>
                      </td>
                    </tr>
                  ))
                ) : filteredBlogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500 italic">
                      No blog posts found. Time to write something amazing!
                    </td>
                  </tr>
                ) : (
                  filteredBlogs.map(blog => (
                    <tr key={blog.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="text-white font-semibold text-lg group-hover:text-[#00F5FF] transition-colors mb-1">{blog.title}</span>
                          <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full w-fit ${
                            blog.status === 'published' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                            blog.status === 'scheduled' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 
                            'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                          }`}>
                            {blog.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-slate-300">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-slate-500" />
                          {blog.author}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-wrap gap-1.5">
                          {blog.categories.slice(0, 2).map((cat, i) => (
                            <span key={i} className="text-[11px] bg-slate-800 text-slate-400 px-2 py-1 rounded-lg flex items-center gap-1 border border-slate-700/50">
                              <Tag className="w-3 h-3" />
                              {cat}
                            </span>
                          ))}
                          {blog.categories.length > 2 && (
                            <span className="text-[11px] text-slate-500">+{blog.categories.length - 2} more</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-slate-400 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-600" />
                          {blog.createdAt?.toDate().toLocaleDateString() || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <a 
                            href={`/${blog.slug}`} 
                            target="_blank" 
                            className="p-2 text-slate-400 hover:text-white bg-[#0f111a] rounded-lg transition-colors border border-slate-700/50"
                            title="Preview Article"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                          <Link 
                            href={`/admin/blogs/edit/${blog.id}`}
                            className="p-2 text-[#00F5FF] hover:bg-[#00F5FF] hover:text-black bg-[#00F5FF]/10 rounded-lg transition-all border border-[#00F5FF]/20"
                            title="Edit Article"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button 
                            onClick={() => handleDelete(blog.id!)}
                            className="p-2 text-red-500 hover:bg-red-500 hover:text-white bg-red-500/10 rounded-lg transition-all border border-red-500/20"
                            title="Delete Article"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <footer className="mt-12 text-center">
          <p className="text-slate-600 italic text-sm">
            Crafted for pure content control.
          </p>
        </footer>
      </div>
    </div>
  );
}
