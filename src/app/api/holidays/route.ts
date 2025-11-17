import { NextResponse } from 'next/server';
import { loadHolidays, getHolidayDataSource, clearHolidaysCache } from '@/data/holidays';
import { clearHolidaysCache as clearSheetsHolidaysCache } from '@/lib/googleSheets';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Don't cache, always fetch fresh

export async function GET(request: Request) {
  try {
    // Check if this is a cache clear request
    const { searchParams } = new URL(request.url);
    const clearCache = searchParams.get('clearCache') === 'true';

    if (clearCache) {
      clearHolidaysCache();
      clearSheetsHolidaysCache();
      console.log('🔄 All holiday caches cleared via API');
    }

    const holidays = await loadHolidays();
    const source = getHolidayDataSource();

    return NextResponse.json({
      success: true,
      holidays,
      count: holidays.length,
      source: source,
      fromGoogleSheets: source === 'google-sheets',
      timestamp: new Date().toISOString(),
      cacheCleared: clearCache,
    });
  } catch (error) {
    console.error('Error in holidays API:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to load holidays',
        holidays: [],
        count: 0,
        source: 'error',
      },
      { status: 500 }
    );
  }
}
