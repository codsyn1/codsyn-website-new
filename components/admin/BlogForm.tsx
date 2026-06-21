'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { blogService, BlogData } from '@/lib/blogService';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { 
  Save, 
  ArrowLeft, 
  Upload, 
  Plus, 
  X, 
  Check, 
  Settings, 
  Globe, 
  Image as ImageIcon,
  Loader2,
  BookOpen,
  User
} from 'lucide-react';
import { SocialIcon } from 'react-social-icons';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

interface BlogFormProps {
  id?: string;
}

export default function BlogForm({ id }: BlogFormProps) {
  const router = useRouter();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'status'>('content');

  const [formData, setFormData] = useState<Omit<BlogData, 'id' | 'createdAt' | 'updatedAt'>>({
    title: '',
    slug: '',
    content: '**Write your masterpiece here...**',
    excerpt: '',
    author: 'CODSYN Admin',
    categories: [],
    tags: [],
    status: 'draft',
    schemaType: 'BlogPosting',
    seo: {
      title: '',
      description: '',
      canonical: ''
    },
    ogMeta: {
      title: '',
      description: '',
      image: ''
    }
  });

  const [categoryInput, setCategoryInput] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [uploadingImage, setUploadingImage] = useState<string | null>(null); // 'featured' | 'og' | null
  
  const featuredImageRef = React.useRef<HTMLInputElement>(null);
  const socialImageRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/admin/login');
      }
    });

    if (isEditing && id) {
      fetchBlog();
    }

    return () => unsubscribe();
  }, [id, isEditing, router]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const blog = await blogService.getBlogById(id!);
      if (blog) {
        setFormData({
          title: blog.title,
          slug: blog.slug,
          content: blog.content,
          excerpt: blog.excerpt || '',
          author: blog.author || 'CODSYN Admin',
          categories: blog.categories || [],
          tags: blog.tags || [],
          status: blog.status,
          featuredImage: blog.featuredImage,
          schemaType: blog.schemaType || 'BlogPosting',
          seo: blog.seo || { title: '', description: '', canonical: '' },
          ogMeta: blog.ogMeta || { title: '', description: '', image: '' }
        });
      }
    } catch (err) {
      setError('Failed to fetch blog');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
      seo: { ...prev.seo!, title: prev.seo!.title || title }
    }));
  };

  const addCategory = () => {
    if (categoryInput.trim() && !formData.categories.includes(categoryInput.trim())) {
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, categoryInput.trim()]
      }));
      setCategoryInput('');
    }
  };

  const removeCategory = (cat: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c !== cat)
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'featured' | 'og') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(type);
      const url = await blogService.uploadImage(file);
      
      if (type === 'featured') {
        setFormData(prev => ({ ...prev, featuredImage: url }));
      } else {
        setFormData(prev => ({ ...prev, ogMeta: { ...prev.ogMeta!, image: url } }));
      }
    } catch (err) {
      console.error('Upload failed:', err);
      setError('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      if (isEditing && id) {
        await blogService.updateBlog(id, formData);
      } else {
        await blogService.createBlog(formData);
      }
      router.push('/admin/blogs');
    } catch (err) {
      setError('An error occurred while saving. Please check your data.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto pb-20">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-[#0f111a]/80 backdrop-blur-md border-b border-white/5 py-6 mb-10 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link href="/admin/blogs" className="text-slate-400 hover:text-white transition-colors bg-white/5 p-2 rounded-xl border border-white/5">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white italic tracking-tight">
              {isEditing ? 'Editing Article' : 'Creating New Masterpiece'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => router.push('/admin/blogs')}
            className="px-6 py-2.5 text-slate-400 hover:bg-white/5 rounded-xl transition-all font-medium border border-transparent hover:border-white/10"
          >
            Discard
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-2.5 rounded-xl transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {isEditing ? 'Sync Changes' : 'Publish Now'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-6 py-4 rounded-2xl mb-8 flex items-center gap-4 animate-in fade-in slide-in-from-top-4">
          <X className="w-6 h-6 flex-shrink-0" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 mb-8 bg-[#1a1c2e] p-1.5 rounded-2xl border border-white/5 w-fit">
        <button
          type="button"
          onClick={() => setActiveTab('content')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'content' ? 'bg-purple-600 text-white italic' : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Editor
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('seo')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'seo' ? 'bg-purple-600 text-white italic' : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Globe className="w-4 h-4" />
          Optimization
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('status')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'status' ? 'bg-purple-600 text-white italic' : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Settings className="w-4 h-4" />
          Configuration
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Editor Section */}
        <div className="lg:col-span-8 space-y-10">
          {activeTab === 'content' && (
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="The Ultimate Headline..."
                  value={formData.title}
                  onChange={handleTitleChange}
                  className="w-full bg-transparent text-3xl font-black text-white italic outline-none border-b-2 border-white/5 focus:border-purple-600 transition-all py-4 placeholder:text-slate-800"
                  required
                />
                
                <div className="flex items-center gap-4">
                  <div className="flex-1 flex items-center gap-2 bg-[#1a1c2e] border border-white/5 rounded-xl px-4 py-2 group focus-within:border-purple-500/50 transition-all">
                    <span className="text-slate-500 font-mono text-xs">codsyn.com/</span>
                    <input
                      type="text"
                      placeholder="url-path"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: generateSlug(e.target.value) }))}
                      className="bg-transparent text-white outline-none flex-1 font-mono text-sm"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-2 bg-[#1a1c2e] border border-white/5 rounded-xl px-4 py-2 group focus-within:border-purple-500/50 transition-all">
                    <User className="w-4 h-4 text-purple-400" />
                    <input
                      type="text"
                      placeholder="Author Name"
                      value={formData.author}
                      onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                      className="bg-transparent text-white outline-none text-sm font-bold"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <textarea
                  placeholder="Write a compelling summary for social media & search snippets..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  className="w-full bg-[#1a1c2e] border border-white/5 text-slate-300 rounded-2xl p-6 outline-none focus:border-purple-500/50 transition-all min-h-[120px] text-lg leading-relaxed shadow-inner"
                />
              </div>

              <div data-color-mode="dark" className="markdown-editor rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                <MDEditor
                  value={formData.content}
                  onChange={(val) => setFormData(prev => ({ ...prev, content: val || '' }))}
                  height={600}
                  preview="edit"
                  className="!bg-[#0f172a]"
                />
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
               <div className="bg-[#1a1c2e] border border-white/5 rounded-3xl p-8 space-y-8">
                  <h3 className="text-2xl font-bold text-white font-inter border-b border-white/5 pb-4">Search Engine Optimization</h3>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-400 ml-1">Meta Title</label>
                       <input 
                         type="text" 
                         value={formData.seo?.title}
                         onChange={(e) => setFormData(prev => ({ ...prev, seo: { ...prev.seo!, title: e.target.value } }))}
                         className="w-full bg-[#0f111a] border border-white/5 text-white rounded-xl py-3 px-4 outline-none focus:border-[#00F5FF] transition-all"
                         placeholder="SEO Title (leave empty for main title)"
                       />
                       <p className="text-[10px] text-slate-500 font-mono italic">Recommended under 60 chars. Current: {formData.seo?.title.length}</p>
                    </div>

                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-400 ml-1">Meta Description</label>
                       <textarea 
                         value={formData.seo?.description}
                         onChange={(e) => setFormData(prev => ({ ...prev, seo: { ...prev.seo!, description: e.target.value } }))}
                         className="w-full bg-[#0f111a] border border-white/5 text-white rounded-xl py-3 px-4 outline-none focus:border-[#00F5FF] transition-all min-h-[100px]"
                         placeholder="What will users see on Google?"
                       />
                       <p className="text-[10px] text-slate-500 font-mono italic">Recommended under 160 chars. Current: {formData.seo?.description.length}</p>
                    </div>

                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-400 ml-1">Canonical URL</label>
                       <input 
                         type="text" 
                         value={formData.seo?.canonical}
                         onChange={(e) => setFormData(prev => ({ ...prev, seo: { ...prev.seo!, canonical: e.target.value } }))}
                         className="w-full bg-[#0f111a] border border-white/5 text-white rounded-xl py-3 px-4 outline-none focus:border-[#00F5FF] transition-all"
                         placeholder="https://original-link.com"
                       />
                    </div>
                  </div>
               </div>

               <div className="bg-[#1a1c2e] border border-white/5 rounded-3xl p-8 space-y-8">
                  <h3 className="text-2xl font-bold text-white font-inter border-b border-white/5 pb-4">Social Graph (OpenGraph)</h3>
                  
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1 space-y-6">
                      <div className="space-y-2">
                         <label className="text-sm font-bold text-slate-400 ml-1">Sharing Title</label>
                         <input 
                           type="text" 
                           value={formData.ogMeta?.title}
                           onChange={(e) => setFormData(prev => ({ ...prev, ogMeta: { ...prev.ogMeta!, title: e.target.value } }))}
                           className="w-full bg-[#0f111a] border border-white/5 text-white rounded-xl py-3 px-4 outline-none focus:border-[#00F5FF] transition-all"
                           placeholder="Catchy Social Title"
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-sm font-bold text-slate-400 ml-1">Sharing Description</label>
                         <textarea 
                           value={formData.ogMeta?.description}
                           onChange={(e) => setFormData(prev => ({ ...prev, ogMeta: { ...prev.ogMeta!, description: e.target.value } }))}
                           className="w-full bg-[#0f111a] border border-white/5 text-white rounded-xl py-3 px-4 outline-none focus:border-[#00F5FF] transition-all min-h-[80px]"
                           placeholder="Engaging summary for Facebook/Twitter"
                         />
                      </div>
                    </div>

                     <div className="w-full md:w-64 space-y-4">
                       <label className="text-sm font-bold text-slate-400 ml-1">Social Image</label>
                       <input 
                         type="file" 
                         ref={socialImageRef}
                         onChange={(e) => handleImageUpload(e, 'og')}
                         className="hidden"
                         accept="image/*"
                       />
                       <div 
                         onClick={() => socialImageRef.current?.click()}
                         className="aspect-video bg-[#0f111a] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-4 text-center group hover:border-purple-500/30 transition-all cursor-pointer relative overflow-hidden"
                       >
                         {uploadingImage === 'og' ? (
                           <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                         ) : formData.ogMeta?.image ? (
                           <>
                             <img src={formData.ogMeta.image} className="absolute inset-0 w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Upload className="w-6 h-6 text-white" />
                             </div>
                           </>
                         ) : (
                           <>
                             <ImageIcon className="w-10 h-10 text-slate-700 mb-4 group-hover:text-purple-400 transition-colors" />
                             <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Select Social Banner</span>
                           </>
                         )}
                       </div>
                       <input 
                         type="text" 
                         value={formData.ogMeta?.image}
                         onChange={(e) => setFormData(prev => ({ ...prev, ogMeta: { ...prev.ogMeta!, image: e.target.value } }))}
                         placeholder="Image URL..."
                         className="w-full bg-[#0f111a] border border-white/5 text-white rounded-xl py-2 px-3 outline-none text-[10px] font-mono mt-2"
                       />
                    </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'status' && (
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
               <div className="bg-[#0f172a] border border-white/5 rounded-3xl p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white italic border-b border-white/5 pb-4">Lifecycle</h3>
                    
                    <div className="space-y-4">
                       <label className="text-sm font-bold text-slate-400 ml-1">Current Status</label>
                       <div className="grid grid-cols-2 gap-3">
                          {['draft', 'published'].map((st) => (
                            <button
                              key={st}
                              type="button"
                              onClick={() => setFormData(prev => ({ ...prev, status: st as any }))}
                              className={`py-3 rounded-xl border font-bold uppercase tracking-widest text-xs transition-all ${
                                formData.status === st 
                                  ? 'bg-purple-600 text-white border-transparent scale-100 shadow-[0_0_15px_rgba(147,51,234,0.2)]' 
                                  : 'bg-white/5 text-slate-500 border-white/5 hover:border-white/10 scale-95'
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                       </div>
                    </div>

                    <div className="space-y-4">
                       <label className="text-sm font-bold text-slate-400 ml-1">Content Schema Type</label>
                       <select 
                         value={formData.schemaType}
                         onChange={(e) => setFormData(prev => ({ ...prev, schemaType: e.target.value }))}
                         className="w-full bg-[#0f111a] border border-white/5 text-white rounded-xl py-3 px-4 outline-none focus:border-[#00F5FF] transition-all appearance-none cursor-pointer font-bold"
                       >
                          <option value="BlogPosting">BlogPosting (Standard)</option>
                          <option value="Article">General Article</option>
                          <option value="NewsArticle">News Content</option>
                       </select>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white italic border-b border-white/5 pb-4">Schedule (Optional)</h3>
                    <div className="space-y-4 opacity-50 pointer-events-none">
                       <label className="text-sm font-bold text-slate-500 ml-1">Release Date & Time</label>
                       <input 
                         type="datetime-local" 
                         disabled
                         className="w-full bg-[#0f111a] border border-white/5 text-slate-600 rounded-xl py-3 px-4 outline-none"
                       />
                       <p className="text-[10px] text-slate-600 italic">Auto-publishing feature coming in v1.1</p>
                    </div>
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Sidebar Configuration Section */}
        <div className="lg:col-span-4 space-y-10">
          {/* Featured Image */}
          <div className="bg-[#1a1c2e] border border-white/5 rounded-3xl p-8 space-y-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white font-inter flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-purple-400" />
              Hero Media
            </h3>
            
            <input 
              type="file" 
              ref={featuredImageRef}
              onChange={(e) => handleImageUpload(e, 'featured')}
              className="hidden"
              accept="image/*"
            />
            
            <div 
              onClick={() => featuredImageRef.current?.click()}
              className="aspect-square bg-[#0f111a] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-8 text-center group hover:border-purple-500/30 transition-all cursor-pointer relative overflow-hidden"
            >
              {uploadingImage === 'featured' ? (
                <div className="flex flex-col items-center">
                  <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Uploading...</span>
                </div>
              ) : formData.featuredImage ? (
                <>
                  <img src={formData.featuredImage} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                    <Upload className="w-10 h-10 text-white mb-2" />
                    <span className="text-xs font-bold text-white uppercase tracking-widest">Replace Art</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={(e) => { e.stopPropagation(); setFormData(prev => ({ ...prev, featuredImage: '' })); }}
                    className="absolute top-4 right-4 z-20 bg-red-500 text-white p-2 rounded-lg hover:scale-110 transition-transform"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20 group-hover:scale-110 transition-transform duration-500">
                    <Upload className="w-8 h-8 text-purple-400" />
                  </div>
                  <p className="text-white text-sm font-bold uppercase tracking-widest mb-2">Upload from Device</p>
                  <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-6">Supports JPG, PNG, WEBP</p>
                  <div className="px-6 py-2 bg-purple-600 text-white rounded-xl text-[10px] font-black uppercase tracking-tighter shadow-lg shadow-purple-500/20 group-hover:bg-purple-700 transition-colors">
                    Browse Files
                  </div>
                </>
              )}
            </div>

            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Or paste direct image link..."
                  value={formData.featuredImage || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, featuredImage: e.target.value }))}
                  className="w-full bg-[#0f111a] border border-slate-800 text-white rounded-xl py-2.5 px-4 outline-none focus:border-purple-500/30 transition-all text-xs font-mono"
                />
              </div>
            </div>
          </div>

          {/* Taxonomy Integration */}
          <div className="bg-[#0f172a] border border-white/5 rounded-3xl p-8 space-y-8 shadow-2xl">
            {/* Categories */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white italic border-b border-white/5 pb-2">Classification</h3>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Technology..."
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCategory())}
                  className="flex-1 bg-[#0f111a] border border-slate-800 text-white rounded-xl py-2 px-3 outline-none focus:border-purple-600/30 transition-all text-sm font-bold"
                />
                <button
                  type="button"
                  onClick={addCategory}
                  className="p-2 bg-purple-600 text-white rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-purple-500/20"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.categories.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-400/20 text-xs font-bold animate-in zoom-in-75 duration-200"
                  >
                    {cat}
                    <button type="button" onClick={() => removeCategory(cat)} className="hover:text-red-400 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white italic border-b border-white/5 pb-2">Index Keywords</h3>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="#nextjs..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 bg-[#0f111a] border border-slate-800 text-white rounded-xl py-2 px-3 outline-none focus:border-purple-600/30 transition-all text-sm font-bold"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="p-2 bg-white/5 text-white rounded-xl border border-white/5 hover:border-white/20 transition-all shadow-md active:scale-95"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 text-slate-400 border border-slate-800 text-xs font-bold animate-in zoom-in-75 duration-200"
                  >
                    #{tag}
                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-400 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Help */}
          <div className="bg-purple-500/5 border border-purple-500/10 rounded-3xl p-6">
            <p className="text-[10px] text-purple-400/60 font-mono uppercase tracking-widest mb-3">Writer Pro Tips</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-[11px] text-slate-400">
                <Check className="w-3 h-3 text-purple-500 mt-0.5 flex-shrink-0" />
                Headings help with SEO readibility.
              </li>
              <li className="flex items-start gap-2 text-[11px] text-slate-400">
                <Check className="w-3 h-3 text-purple-500 mt-0.5 flex-shrink-0" />
                Slugs should be concise and keyword-rich.
              </li>
              <li className="flex items-start gap-2 text-[11px] text-slate-400">
                <Check className="w-3 h-3 text-purple-500 mt-0.5 flex-shrink-0" />
                Featured images drive 80% more engagement.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </form>
  );
}
