import { NextResponse } from 'next/server';
import { loadBlogPosts, getBlogDataSource, clearBlogPostsCache } from '@/data/blog';
import { clearBlogCache } from '@/lib/googleSheets';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Don't cache, always fetch fresh

export async function GET(request: Request) {
  try {
    // Check if this is a cache clear request
    const { searchParams } = new URL(request.url);
    const clearCache = searchParams.get('clearCache') === 'true';

    if (clearCache) {
      clearBlogPostsCache();
      clearBlogCache();
      console.log('🔄 All blog caches cleared via API');
    }

    const blogPosts = await loadBlogPosts();
    const source = getBlogDataSource();

    return NextResponse.json({
      success: true,
      blogPosts,
      count: blogPosts.length,
      source: source,
      fromGoogleSheets: source === 'google-sheets',
      timestamp: new Date().toISOString(),
      cacheCleared: clearCache,
    });
  } catch (error) {
    console.error('Error in blog API:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to load blog posts',
        blogPosts: [],
        count: 0,
        source: 'error',
      },
      { status: 500 }
    );
  }
}
