import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://adoormla.in';
  const locales = ['en', 'ml'];

  const staticRoutes = [
    '',
    '/about',
    '/adoor',
    '/public-service',
    '/initiatives',
    '/legislative',
    '/updates',
    '/gallery',
    '/contact',
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const route of staticRoutes) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' || route === '/updates' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : route === '/public-service' ? 0.9 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            ml: `${baseUrl}/ml${route}`,
          },
        },
      });
    }
  }

  // Include published dynamic posts if available
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data: posts } = await supabase
        .from('posts')
        .select('slug, updated_at')
        .eq('published', true);

      if (posts) {
        for (const post of posts) {
          for (const locale of locales) {
            entries.push({
              url: `${baseUrl}/${locale}/updates/${post.slug}`,
              lastModified: new Date(post.updated_at || new Date()),
              changeFrequency: 'monthly',
              priority: 0.7,
              alternates: {
                languages: {
                  en: `${baseUrl}/en/updates/${post.slug}`,
                  ml: `${baseUrl}/ml/updates/${post.slug}`,
                },
              },
            });
          }
        }
      }
    }
  } catch (err) {
    console.error('Error fetching posts for sitemap:', err);
  }

  return entries;
}
