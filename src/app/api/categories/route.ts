import { NextResponse } from 'next/server';
import { loadCategories, getCategoriesDataSource, clearCategoriesCacheLocal } from '@/data/products';
import { clearCategoriesCache } from '@/lib/googleSheets';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const clearCache = searchParams.get('clearCache') === 'true';
    
    if (clearCache) {
      clearCategoriesCacheLocal();
      clearCategoriesCache();
      console.log('🔄 Categories cache cleared via API');
    }

    const categories = await loadCategories();
    const source = getCategoriesDataSource();

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
