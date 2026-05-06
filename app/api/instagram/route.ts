import { fetchInstagramPosts } from '@/lib/instagram-service'
import { siteConfig } from '@/config/site'
import { NextRequest, NextResponse } from 'next/server'

export const revalidate = 21600 // 6 hours ISR

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get('username') || siteConfig.instagramUsername
    const limit = parseInt(searchParams.get('limit') || '12')

    const posts = await fetchInstagramPosts(username, limit)

    return NextResponse.json(
      {
        success: true,
        data: posts,
        count: posts.length,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400',
        },
      }
    )
  } catch (error) {
    console.error('Instagram API Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch Instagram posts',
      },
      { status: 500 }
    )
  }
}
