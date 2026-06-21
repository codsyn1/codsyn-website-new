'use client';

import React, { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import BlogForm from '@/components/admin/BlogForm';
import { Loader2 } from 'lucide-react';

export default function EditBlogPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/admin/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading || (!isAuthenticated && loading)) {
    return (
      <div className="min-h-screen bg-[#0f111a] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#00F5FF] animate-spin" />
      </div>
    );
  }

  if (!id) return null;

  return (
    <div className="min-h-screen bg-[#0f111a] p-8 lg:p-12">
      <BlogForm id={id} />
    </div>
  );
}
