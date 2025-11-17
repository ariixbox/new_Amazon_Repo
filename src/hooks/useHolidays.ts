import { useState, useEffect } from 'react';
import { Holiday } from '@/data/holidays';

interface HolidaysResponse {
  success: boolean;
  holidays: Holiday[];
  count: number;
  timestamp: string;
  source?: 'google-sheets' | 'fallback' | 'error';
  fromGoogleSheets?: boolean;
  cacheCleared?: boolean;
  error?: string;
}

interface UseHolidaysReturn {
  holidays: Holiday[];
  loading: boolean;
  error: string | null;
  source: 'google-sheets' | 'fallback' | 'error' | null;
  fromGoogleSheets: boolean;
  refetch: (clearCache?: boolean) => void;
}

/**
 * Hook to fetch holidays from Google Sheets via API
 */
export function useHolidays(): UseHolidaysReturn {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<'google-sheets' | 'fallback' | 'error' | null>(null);
  const [fromGoogleSheets, setFromGoogleSheets] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [shouldClearCache, setShouldClearCache] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchHolidays() {
      try {
        setLoading(true);
        setError(null);

        const url = shouldClearCache
          ? '/api/holidays?clearCache=true'
          : '/api/holidays';

        const response = await fetch(url, {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch holidays: ${response.status}`);
        }

        const data: HolidaysResponse = await response.json();

        if (mounted) {
          if (data.success && data.holidays) {
            setHolidays(data.holidays);
            setSource(data.source || 'error');
            setFromGoogleSheets(data.fromGoogleSheets || false);

            // Log for debugging
            if (data.cacheCleared) {
              console.log('✅ Holiday cache cleared, fresh data loaded');
            }
            console.log(`📅 Loaded ${data.count} holidays from ${data.source}`);
          } else {
            setError(data.error || 'Failed to load holidays');
            setSource('error');
          }
        }

        // Reset cache clear flag
        if (shouldClearCache) {
          setShouldClearCache(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Unknown error occurred');
          setSource('error');
          console.error('Error fetching holidays:', err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchHolidays();

    return () => {
      mounted = false;
    };
  }, [refreshTrigger, shouldClearCache]);

  const refetch = (clearCache = false) => {
    if (clearCache) {
      setShouldClearCache(true);
    }
    setRefreshTrigger(prev => prev + 1);
  };

  return { holidays, loading, error, source, fromGoogleSheets, refetch };
}
