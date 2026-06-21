import { MetadataRoute } from 'next'
import { blogService } from '@/lib/blogService'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://codsyn.com'

  // Static routes
  const routes = [
    '',
    '/become-partner',
    '/collaborate',
    '/contact',
    '/privacy-policy',
    '/blog',
    '/projects'
  ]

  // Get all project pages - hardcoded as they are currently in Projects.tsx component
  const projectSlugs = [
    'farooq-azam-smart-clinic-hms',
    'minibites-restaurant-food-delivery',
    'xcode-ide-enhancement',
    'digiexplain-admin-system',
    'stag-chemist-pharmacy-platform',
    'baseer-hospital-speakers-platform',
    'mindscare-mental-health-platform',
    'stars-science-academy',
    'kirkuk-caffetorino-restaurant',
    'restaurant-pos-system',
    'stag-chemist-pharmacy-platform-seo',
    'tositsolutions-canada'
  ]

  // Fetch all published blogs from Firebase for dynamic sitemap
  let blogSlugs: string[] = []
  try {
    const blogs = await blogService.getPublishedBlogs(100);
    blogSlugs = blogs.map(blog => blog.slug);
  } catch (error) {
    console.error('Error fetching blogs for sitemap:', error);
  }

  const staticPages = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const projectPages = projectSlugs.map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const blogPages = blogSlugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...projectPages, ...blogPages]
}
