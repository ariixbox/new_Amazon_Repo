import { NextResponse } from 'next/server';
import { loadCategories, getCategoryDataSource, clearCategoriesCache } from '@/data/categories';
import { clearCategoriesCache as clearSheetsCategoriesCache } from '@/lib/googleSheets';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Don't cache, always fetch fresh

export async function GET(request: Request) {
  try {
    // Check if this is a cache clear request
    const { searchParams } = new URL(request.url);
    const clearCache = searchParams.get('clearCache') === 'true';

    if (clearCache) {
      clearCategoriesCache();
      clearSheetsCategoriesCache();
      console.log('🔄 All category caches cleared via API');
    }

    const categories = await loadCategories();
    const source = getCategoryDataSource();

    return NextResponse.json({
      success: true,
      categories,
      count: categories.length,
      source: source,
      fromGoogleSheets: source === 'google-sheets',
      timestamp: new Date().toISOString(),
      cacheCleared: clearCache,
    });
  } catch (error) {
    console.error('Error in categories API:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to load categories',
        categories: [],
        count: 0,
        source: 'error',
      },
      { status: 500 }
    );
  }
}
