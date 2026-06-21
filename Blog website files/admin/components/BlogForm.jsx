import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { blogService } from '../services/blogService';
import { Save, ArrowLeft, Eye, Upload, Bold, Italic, List, ListOrdered, Type, Link as LinkIcon, Underline, AlignLeft, AlignCenter, AlignRight, Quote, Code, Strikethrough, Superscript, Subscript, Palette, Table, Minus, Hash } from 'lucide-react';

const BlogForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    featuredImage: '',
    featuredImageFile: null,
    imageUploadType: 'url',
    categories: [],
    author: '',
    status: 'draft',
    scheduledFor: '',
    
    // SEO Fields
    seo: {
      title: '',
      description: '',
      canonical: '',
      index: true,
      follow: true
    },
    
    // Social Media
    ogMeta: {
      title: '',
      description: '',
      image: ''
    },
    
    // Schema
    schemaType: 'BlogPosting',
    
    // Pharmacy Compliance
    pharmacyCompliance: {
      informationalOnly: true,
      medicalDisclaimer: true,
      reviewedByPharmacist: '',
      disclaimerText: 'This content is for informational purposes only and should not replace professional medical advice.'
    },
    
    // Image SEO
    imageSeo: {
      alt: '',
      title: '',
      caption: ''
    }
  });

  const [categoryInput, setCategoryInput] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  // Rich text editor functions
  const insertText = (before, after = '') => {
    const textarea = document.querySelector('textarea[name="content"]');
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    const newText = before + selectedText + after;
    
    const updatedContent = 
      formData.content.substring(0, start) + 
      newText + 
      formData.content.substring(end);
    
    setFormData(prev => ({ ...prev, content: updatedContent }));
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const insertBold = () => insertText('**', '**');
  const insertItalic = () => insertText('*', '*');
  const insertUnderline = () => insertText('__', '__');
  const insertStrikethrough = () => insertText('~~', '~~');
  const insertCode = () => insertText('`', '`');
  const insertQuote = () => insertText('\n> ', '');
  const insertBullet = () => insertText('\n- ', '');
  const insertNumbered = () => insertText('\n1. ', '');
  const insertHeading1 = () => insertText('\n# ', '');
  const insertHeading2 = () => insertText('\n## ', '');
  const insertHeading3 = () => insertText('\n### ', '');
  const insertHeading4 = () => insertText('\n#### ', '');
  const insertHeading5 = () => insertText('\n##### ', '');
  const insertHeading6 = () => insertText('\n###### ', '');
  const insertAlignLeft = () => insertText('\n<div style="text-align: left;">\n', '\n</div>');
  const insertAlignCenter = () => insertText('\n<div style="text-align: center;">\n', '\n</div>');
  const insertAlignRight = () => insertText('\n<div style="text-align: right;">\n', '\n</div>');
  const insertSuperscript = () => insertText('<sup>', '</sup>');
  const insertSubscript = () => insertText('<sub>', '</sub>');
  const insertHorizontalLine = () => insertText('\n---\n', '');
  const insertTable = () => {
    const rows = prompt('Number of rows:', '3');
    const cols = prompt('Number of columns:', '3');
    if (rows && cols) {
      let table = '\n| ';
      for (let i = 0; i < parseInt(cols); i++) {
        table += `Header ${i + 1} | `;
      }
      table += '\n|';
      for (let i = 0; i < parseInt(cols); i++) {
        table += '---|';
      }
      for (let r = 0; r < parseInt(rows); r++) {
        table += '\n| ';
        for (let c = 0; c < parseInt(cols); c++) {
          table += `Cell ${r + 1}-${c + 1} | `;
        }
      }
      table += '\n';
      insertText(table, '');
    }
  };
  const insertTextColor = () => {
    const color = prompt('Enter color (hex or name):', '#ff0000');
    if (color) {
      insertText('<span style="color: ' + color + ';">', '</span>');
    }
  };
  const insertTextHighlight = () => {
    const color = prompt('Enter highlight color (hex or name):', 'yellow');
    if (color) {
      insertText('<span style="background-color: ' + color + ';">', '</span>');
    }
  };
  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      insertText('[', `](${url})`);
    }
  };

  // Word counter
  const getWordCount = () => {
    const text = formData.content || '';
    const plainText = text.replace(/<[^>]*>/g, ''); // Remove HTML tags
    const words = plainText.trim().split(/\s+/).filter(word => word.length > 0);
    return words.length;
  };

  const getCharacterCount = () => {
    return (formData.content || '').length;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target.result;
        setFormData(prev => ({
          ...prev,
          featuredImageFile: base64,
          featuredImage: base64
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      imageUploadType: type,
      featuredImage: type === 'url' ? '' : prev.featuredImageFile,
      featuredImageFile: type === 'file' ? null : prev.featuredImageFile
    }));
  };

  useEffect(() => {
    if (isEditing) {
      fetchBlog();
    }
  }, [id, isEditing]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const blog = await blogService.getBlogById(id);
      if (blog) {
        setFormData({
          ...formData,
          ...blog,
          seo: blog.seo || formData.seo,
          ogMeta: blog.ogMeta || formData.ogMeta,
          pharmacyCompliance: blog.pharmacyCompliance || formData.pharmacyCompliance,
          imageSeo: blog.imageSeo || formData.imageSeo
        });
      }
    } catch (err) {
      setError('Failed to fetch blog');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title)
    }));
  };

  const handleSlugChange = (e) => {
    setFormData(prev => ({
      ...prev,
      slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-')
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

  const removeCategory = (category) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter(c => c !== category)
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const submitData = {
        ...formData,
        categories: formData.categories.filter(c => c.trim())
      };

      if (isEditing) {
        await blogService.updateBlog(id, submitData);
      } else {
        await blogService.createBlog(submitData);
      }

      navigate('/admin/blogs');
    } catch (err) {
      setError('Failed to save blog');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const getSeoScore = () => {
    let score = 0;
    const { seo, title, content } = formData;
    
    if (seo.title && seo.title.length <= 60) score++;
    if (seo.description && seo.description.length <= 160) score++;
    
    return score;
  };

  const getSeoScoreColor = () => {
    const score = getSeoScore();
    if (score >= 2) return 'text-green-600';
    if (score >= 1) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin/blogs')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blogs
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Blog' : 'Create New Blog'}
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? 'Edit' : 'Preview'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Fields */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Blog Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={handleTitleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={handleSlugChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content * (Markdown supported)
                  </label>
                  
                  {/* Formatting Toolbar */}
                  <div className="mb-2 p-2 bg-gray-50 border border-gray-200 rounded-lg">
                    {/* First Row - Basic Formatting */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      <button
                        type="button"
                        onClick={insertBold}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                        title="Bold (Ctrl+B)"
                      >
                        <Bold className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={insertItalic}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                        title="Italic (Ctrl+I)"
                      >
                        <Italic className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={insertUnderline}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                        title="Underline"
                      >
                        <Underline className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={insertStrikethrough}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                        title="Strikethrough"
                      >
                        <Strikethrough className="w-4 h-4" />
                      </button>
                      <div className="w-px h-6 bg-gray-300 mx-1"></div>
                      <button
                        type="button"
                        onClick={insertCode}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                        title="Code"
                      >
                        <Code className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={insertQuote}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                        title="Quote"
                      >
                        <Quote className="w-4 h-4" />
                      </button>
                      <div className="w-px h-6 bg-gray-300 mx-1"></div>
                      <button
                        type="button"
                        onClick={insertSuperscript}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                        title="Superscript"
                      >
                        <Superscript className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={insertSubscript}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                        title="Subscript"
                      >
                        <Subscript className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Second Row - Headings */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      <span className="text-xs text-gray-500 self-center mr-2">Headings:</span>
                      <button
                        type="button"
                        onClick={insertHeading1}
                        className="px-2 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors border border-gray-300"
                        title="Heading 1"
                      >
                        H1
                      </button>
                      <button
                        type="button"
                        onClick={insertHeading2}
                        className="px-2 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors border border-gray-300"
                        title="Heading 2"
                      >
                        H2
                      </button>
                      <button
                        type="button"
                        onClick={insertHeading3}
                        className="px-2 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors border border-gray-300"
                        title="Heading 3"
                      >
                        H3
                      </button>
                      <button
                        type="button"
                        onClick={insertHeading4}
                        className="px-2 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors border border-gray-300"
                        title="Heading 4"
                      >
                        H4
                      </button>
                      <button
                        type="button"
                        onClick={insertHeading5}
                        className="px-2 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors border border-gray-300"
                        title="Heading 5"
                      >
                        H5
                      </button>
                      <button
                        type="button"
                        onClick={insertHeading6}
                        className="px-2 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors border border-gray-300"
                        title="Heading 6"
                      >
                        H6
                      </button>
                    </div>

                    {/* Third Row - Alignment & Lists */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      <span className="text-xs text-gray-500 self-center mr-2">Align:</span>
                      <button
                        type="button"
                        onClick={insertAlignLeft}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                        title="Align Left"
                      >
                        <AlignLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={insertAlignCenter}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                        title="Align Center"
                      >
                        <AlignCenter className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={insertAlignRight}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                        title="Align Right"
                      >
                        <AlignRight className="w-4 h-4" />
                      </button>
                      <div className="w-px h-6 bg-gray-300 mx-1"></div>
                      <button
                        type="button"
                        onClick={insertBullet}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                        title="Bullet List"
                      >
                        <List className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={insertNumbered}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                        title="Numbered List"
                      >
                        <ListOrdered className="w-4 h-4" />
                      </button>
                      <div className="w-px h-6 bg-gray-300 mx-1"></div>
                      <button
                        type="button"
                        onClick={insertLink}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                        title="Insert Link"
                      >
                        <LinkIcon className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Fourth Row - Tables & Colors */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      <span className="text-xs text-gray-500 self-center mr-2">Advanced:</span>
                      <button
                        type="button"
                        onClick={insertTable}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                        title="Insert Table"
                      >
                        <Table className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={insertHorizontalLine}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                        title="Horizontal Line"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={insertTextColor}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                        title="Text Color"
                      >
                        <Palette className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={insertTextHighlight}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                        title="Highlight Text"
                      >
                        <Hash className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Word Counter */}
                    <div className="flex justify-between items-center text-xs text-gray-500 bg-gray-100 px-3 py-2 rounded">
                      <span>Words: {getWordCount()}</span>
                      <span>Characters: {getCharacterCount()}</span>
                    </div>
                  </div>
                  
                  {!previewMode ? (
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                      rows={20}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                      placeholder="Write your blog content with formatting tools above..."
                    />
                  ) : (
                    <div className="border border-gray-300 rounded-lg min-h-100 p-4 bg-gray-50">
                      <div className="max-w-none">
                        <pre className="whitespace-pre-wrap text-sm font-sans">{formData.content || ''}</pre>
                      </div>
                    </div>
                  )}
                  <div className="mt-2 text-xs text-gray-500">
                    {!previewMode ? (
                      <div>
                        <p>💡 <strong>Complete Formatting Guide:</strong></p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-4">
                          <div>
                            <p className="font-semibold mb-2">Text Formatting:</p>
                            <ul className="space-y-1">
                              <li>• **text** for <strong>bold</strong></li>
                              <li>• *text* for <em>italic</em></li>
                              <li>• __text__ for <u>underline</u></li>
                              <li>• ~~text~~ for <s>strikethrough</s></li>
                              <li>• `text` for <code>code</code></li>
                              <li>• &lt;span style="color: red;"&gt;text&lt;/span&gt; for colored text</li>
                              <li>• &lt;span style="background: yellow;"&gt;text&lt;/span&gt; for highlight</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-semibold mb-2">Headings (6 levels):</p>
                            <ul className="space-y-1">
                              <li>• # text for <strong>H1</strong> (largest)</li>
                              <li>• ## text for <strong>H2</strong></li>
                              <li>• ### text for <strong>H3</strong></li>
                              <li>• #### text for <strong>H4</strong></li>
                              <li>• ##### text for <strong>H5</strong></li>
                              <li>• ###### text for <strong>H6</strong> (smallest)</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-semibold mb-2">Structure & Layout:</p>
                            <ul className="space-y-1">
                              <li>• &gt; text for <strong>quotes</strong></li>
                              <li>• [text](url) for <strong>links</strong></li>
                              <li>• --- for <strong>horizontal line</strong></li>
                              <li>• Use table button for <strong>tables</strong></li>
                              <li>• Use alignment buttons for text layout</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-semibold mb-2">Lists:</p>
                            <ul className="space-y-1">
                              <li>• - item for bullet points</li>
                              <li>• 1. item for numbered lists</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-semibold mb-2">Advanced:</p>
                            <ul className="space-y-1">
                              <li>• &lt;sup&gt;text&lt;/sup&gt; for <sup>superscript</sup></li>
                              <li>• &lt;sub&gt;text&lt;/sub&gt; for <sub>subscript</sub></li>
                              <li>• Word counter shows live stats</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : (
                      'Preview mode'
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Categories</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categories
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCategory())}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Add category..."
                  />
                  <button
                    type="button"
                    onClick={addCategory}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.categories.map((category) => (
                    <span
                      key={category}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                    >
                      {category}
                      <button
                        type="button"
                        onClick={() => removeCategory(category)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Publish Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>

                {formData.status === 'scheduled' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Schedule For
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.scheduledFor}
                      onChange={(e) => setFormData(prev => ({ ...prev, scheduledFor: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Featured Image */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Featured Image</h2>
              
              <div className="space-y-4">
                {/* Upload Type Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image Upload Type
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="imageUploadType"
                        value="url"
                        checked={formData.imageUploadType === 'url'}
                        onChange={(e) => handleImageTypeChange(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm">Image URL</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="imageUploadType"
                        value="file"
                        checked={formData.imageUploadType === 'file'}
                        onChange={(e) => handleImageTypeChange(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm">Upload File</span>
                    </label>
                  </div>
                </div>

                {/* URL Input */}
                {formData.imageUploadType === 'url' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.featuredImage}
                      onChange={(e) => setFormData(prev => ({ ...prev, featuredImage: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                )}

                {/* File Upload */}
                {formData.imageUploadType === 'file' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Maximum file size: 5MB. Supported formats: JPG, PNG, GIF, WebP
                    </p>
                  </div>
                )}

                {/* Image Preview */}
                {formData.featuredImage && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preview
                    </label>
                    <img
                      src={formData.featuredImage}
                      alt="Featured"
                      className="w-full h-48 object-cover rounded-lg border border-gray-200"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://picsum.photos/seed/blog/400/200.jpg';
                      }}
                    />
                  </div>
                )}

                {/* Alt Text */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Alt Text
                  </label>
                  <input
                    type="text"
                    value={formData.imageSeo.alt}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      imageSeo: { ...prev.imageSeo, alt: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Describe the image for SEO and accessibility"
                  />
                </div>
              </div>
            </div>

            {/* SEO Score */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">SEO Score</h2>
              <div className={`text-2xl font-bold ${getSeoScoreColor()}`}>
                {getSeoScore()}/2
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Complete SEO fields to improve your score
              </p>
            </div>
          </div>
        </div>

        {/* SEO Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">SEO Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SEO Title (max 60 chars)
                </label>
                <input
                  type="text"
                  value={formData.seo.title}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    seo: { ...prev.seo, title: e.target.value }
                  }))}
                  maxLength={60}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.seo.title.length}/60 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meta Description (max 160 chars)
                </label>
                <textarea
                  value={formData.seo.description}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    seo: { ...prev.seo, description: e.target.value }
                  }))}
                  maxLength={160}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.seo.description.length}/160 characters
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Canonical URL (simple path)
                </label>
                <input
                  type="text"
                  value={formData.seo.canonical}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    seo: { ...prev.seo, canonical: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="blog-post-url"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter just the path, not the full URL (e.g., "blog-post-url")
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Engine Visibility
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.seo.index}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        seo: { ...prev.seo, index: e.target.checked }
                      }))}
                      className="mr-2"
                    />
                    <span className="text-sm">Allow search engines to index this page</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.seo.follow}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        seo: { ...prev.seo, follow: e.target.checked }
                      }))}
                      className="mr-2"
                    />
                    <span className="text-sm">Allow search engines to follow links</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Schema Type
                </label>
                <select
                  value={formData.schemaType}
                  onChange={(e) => setFormData(prev => ({ ...prev, schemaType: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="BlogPosting">Blog Posting</option>
                  <option value="Article">Article</option>
                  <option value="FAQ">FAQ</option>
                  <option value="HowTo">How To</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Pharmacy Compliance */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Pharmacy Compliance (YMYL)</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.pharmacyCompliance.informationalOnly}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      pharmacyCompliance: { ...prev.pharmacyCompliance, informationalOnly: e.target.checked }
                    }))}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Informational content only (no medical claims)
                  </span>
                </label>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.pharmacyCompliance.medicalDisclaimer}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      pharmacyCompliance: { ...prev.pharmacyCompliance, medicalDisclaimer: e.target.checked }
                    }))}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Include medical disclaimer
                  </span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reviewed by Pharmacist (optional)
                </label>
                <input
                  type="text"
                  value={formData.pharmacyCompliance.reviewedByPharmacist}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    pharmacyCompliance: { ...prev.pharmacyCompliance, reviewedByPharmacist: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Pharmacist name and credentials"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Custom Disclaimer Text
              </label>
              <textarea
                value={formData.pharmacyCompliance.disclaimerText}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  pharmacyCompliance: { ...prev.pharmacyCompliance, disclaimerText: e.target.value }
                }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Social Media Preview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  OG Title
                </label>
                <input
                  type="text"
                  value={formData.ogMeta.title}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    ogMeta: { ...prev.ogMeta, title: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  OG Description
                </label>
                <textarea
                  value={formData.ogMeta.description}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    ogMeta: { ...prev.ogMeta, description: e.target.value }
                  }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  OG Image
                </label>
                <input
                  type="url"
                  value={formData.ogMeta.image}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    ogMeta: { ...prev.ogMeta, image: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="https://example.com/og-image.jpg"
                />
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Preview</p>
              <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                <div className="flex space-x-3">
                  <img
                    src={formData.ogMeta.image || formData.featuredImage || 'https://picsum.photos/seed/og/80/80.jpg'}
                    alt="OG Preview"
                    className="w-20 h-20 object-cover rounded"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://picsum.photos/seed/og/80/80.jpg';
                    }}
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-blue-700">
                      {formData.ogMeta.title || formData.title || 'Your Blog Title'}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {formData.ogMeta.description || formData.seo.description || 'Your blog description...'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">stagchemist.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/blogs')}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : (isEditing ? 'Update Blog' : 'Create Blog')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
