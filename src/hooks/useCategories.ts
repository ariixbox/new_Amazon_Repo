import { useState, useEffect } from 'react';
import { Category } from '@/data/categories';

interface CategoriesResponse {
  success: boolean;
  categories: Category[];
  count: number;
  timestamp: string;
  source?: 'google-sheets' | 'fallback' | 'error';
  fromGoogleSheets?: boolean;
  cacheCleared?: boolean;
  error?: string;
}

interface UseCategoriesReturn {
  categories: Category[];
  loading: boolean;
  error: string | null;
  source: 'google-sheets' | 'fallback' | 'error' | null;
  fromGoogleSheets: boolean;
  refetch: (clearCache?: boolean) => void;
}

/**
 * Hook to fetch categories from Google Sheets via API
 */
export function useCategories(): UseCategoriesReturn {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<'google-sheets' | 'fallback' | 'error' | null>(null);
  const [fromGoogleSheets, setFromGoogleSheets] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [shouldClearCache, setShouldClearCache] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchCategories() {
      try {
        setLoading(true);
        setError(null);

        const url = shouldClearCache
          ? '/api/categories?clearCache=true'
          : '/api/categories';

        const response = await fetch(url, {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch categories: ${response.status}`);
        }

        const data: CategoriesResponse = await response.json();

        if (mounted) {
          if (data.success && data.categories) {
            setCategories(data.categories);
            setSource(data.source || 'error');
            setFromGoogleSheets(data.fromGoogleSheets || false);

            // Log for debugging
            if (data.cacheCleared) {
              console.log('✅ Category cache cleared, fresh data loaded');
            }
            console.log(`📂 Loaded ${data.count} categories from ${data.source}`);
          } else {
            setError(data.error || 'Failed to load categories');
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
          console.error('Error fetching categories:', err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchCategories();

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

  return { categories, loading, error, source, fromGoogleSheets, refetch };
}
