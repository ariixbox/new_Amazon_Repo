import { NextResponse } from 'next/server';
import { loadBlogPosts, getBlogDataSource, clearBlogCache } from '@/data/blog';
import { clearBlogCache as clearBlogCacheSheets } from '@/lib/googleSheets';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const clearCache = searchParams.get('clearCache') === 'true';
    
    if (clearCache) {
      clearBlogCache();
      clearBlogCacheSheets();
      console.log('🔄 Blog cache cleared via API');
    }

    const posts = await loadBlogPosts();
    const source = getBlogDataSource();

    return NextResponse.json({
      success: true,
      posts,
      count: posts.length,
      source: source,
      fromGoogleSheets: source === 'google-sheets',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in blog API:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to load blog posts',
        posts: [],
        count: 0,
      },
      { status: 500 }
    );
  }
}
