import { MetadataRoute } from 'next'
import { fetchPosts } from '@/app/lib/data'
import { BASE_URL } from '@/app/lib/constants'
 
export async function generateSitemaps() {
  return [{ id: 0 }, { id: 1 }, { id: 2 }]
}
 
export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
  const posts = await fetchPosts();

  if ( id === 2 ) {
    return posts.map((post) => ({
      url: `${BASE_URL}${post.slug}`,
      lastModified: post.updatedat.toISOString(),
      changeFrequency: 'daily',
      priority: 1,
    }))
  } else if ( id === 1 ) {
    return [
      {
        url: `${BASE_URL}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${BASE_URL}about`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${BASE_URL}contact`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${BASE_URL}login`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.5,
      }
    ]
  } else {
    return [
      {
        url: `${BASE_URL}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 1,
      }
    ]
  }
}