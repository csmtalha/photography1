import fs from 'fs'
import path from 'path'

export interface InstagramPost {
  id: string
  url: string
  caption: string
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL'
  timestamp: string
  permalink?: string
}

interface ApifyInstagramPost {
  id: string
  displayUrl: string
  caption?: string
  shortCode: string
  timestamp?: string
  type?: string
}

/**
 * Fetch Instagram posts from Apify API or local JSON file
 * Using Apify API as primary source to avoid CORS issues
 */
export async function fetchInstagramPosts(
  username: string,
  limit: number = 12
): Promise<InstagramPost[]> {
  try {
    console.log('[Instagram Service] Fetching posts for:', username)

    // Try Apify API first (best option - no CORS issues)
    const datasetId = process.env.APIFY_DATASET_ID
    const token = process.env.APIFY_TOKEN

    if (datasetId && token) {
      try {
        console.log('[Instagram Service] Fetching from Apify API...')
        
        const res = await fetch(
          `https://api.apify.com/v2/datasets/${datasetId}/items?token=${token}`,
          {
            next: {
              revalidate: 21600, // Cache for 6 hours
            },
          }
        )

        if (res.ok) {
          const data = await res.json()

          // Map Apify data to our InstagramPost format
          const posts = data
            .slice(0, limit)
            .map((post: ApifyInstagramPost) => ({
              id: post.id,
              url: post.displayUrl, // Use direct URL from Apify
              caption: post.caption || '',
              mediaType: (post.type === 'Video' ? 'VIDEO' : post.type === 'Sidecar' ? 'CAROUSEL' : 'IMAGE') as 'IMAGE' | 'VIDEO' | 'CAROUSEL',
              timestamp: post.timestamp || new Date().toISOString(),
              permalink: `https://instagram.com/p/${post.shortCode}`,
            }))

          console.log(`[Instagram Service] Successfully fetched ${posts.length} posts from Apify API`)
          return posts
        }
      } catch (apiError) {
        console.log('[Instagram Service] Apify API error, trying local file...', apiError)
      }
    }

    // Fallback to local JSON file
    try {
      const filePath = path.join(process.cwd(), 'public', 'instagram-data.json')
      
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        const data = JSON.parse(fileContent)
        
        console.log('[Instagram Service] Using local JSON dataset')
        
        // Filter to only show posts with local images (starting with /)
        const filteredData = data.filter((post: ApifyInstagramPost) => 
          post.displayUrl.startsWith('/')
        )
        
        // Map local data to our InstagramPost format
        const posts = filteredData
          .slice(0, limit)
          .map((post: ApifyInstagramPost) => ({
            id: post.id,
            url: post.displayUrl,
            caption: post.caption || '',
            mediaType: (post.type === 'Video' ? 'VIDEO' : post.type === 'Sidecar' ? 'CAROUSEL' : 'IMAGE') as 'IMAGE' | 'VIDEO' | 'CAROUSEL',
            timestamp: post.timestamp || new Date().toISOString(),
            permalink: `https://instagram.com/p/${post.shortCode}`,
          }))

        console.log(`[Instagram Service] Successfully loaded ${posts.length} posts from local file (filtered to local images only)`)
        return posts
      }
    } catch (localError) {
      console.log('[Instagram Service] Local file error:', localError)
    }

    console.error('[Instagram Service] No data source available')
    return []
  } catch (error) {
    console.error('[Instagram Service] Error fetching posts:', error)
    return []
  }
}

export function getFeaturedPosts(posts: InstagramPost[], count: number = 6): InstagramPost[] {
  return posts.slice(0, count)
}
