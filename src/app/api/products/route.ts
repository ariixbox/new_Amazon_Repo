import { NextResponse } from 'next/server';
import { loadProducts, getDataSource, clearProductsCache } from '@/data/products';
import { clearProductCache } from '@/lib/googleSheets';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Don't cache, always fetch fresh

export async function GET(request: Request) {
  try {
    // Check if this is a cache clear request
    const { searchParams } = new URL(request.url);
    const clearCache = searchParams.get('clearCache') === 'true';

    if (clearCache) {
      clearProductsCache();
      clearProductCache();
      console.log('🔄 All caches cleared via API');
    }

    const products = await loadProducts();
    const source = getDataSource();

    return NextResponse.json({
      success: true,
      products,
      count: products.length,
      source: source,
      fromGoogleSheets: source === 'google-sheets',
      timestamp: new Date().toISOString(),
      cacheCleared: clearCache,
    });
  } catch (error) {
    console.error('Error in products API:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to load products',
        products: [],
        count: 0,
        source: 'error',
      },
      { status: 500 }
    );
  }
}
