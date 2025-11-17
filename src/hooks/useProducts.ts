import { useState, useEffect } from 'react';
import { Product } from '@/data/products';

interface ProductsResponse {
  success: boolean;
  products: Product[];
  count: number;
  timestamp: string;
  source?: 'google-sheets' | 'fallback' | 'error';
  fromGoogleSheets?: boolean;
  cacheCleared?: boolean;
  error?: string;
}

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  source: 'google-sheets' | 'fallback' | 'error' | null;
  fromGoogleSheets: boolean;
  refetch: (clearCache?: boolean) => void;
}

/**
 * Hook to fetch products from Google Sheets via API
 */
export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<'google-sheets' | 'fallback' | 'error' | null>(null);
  const [fromGoogleSheets, setFromGoogleSheets] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [shouldClearCache, setShouldClearCache] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const url = shouldClearCache
          ? '/api/products?clearCache=true'
          : '/api/products';

        const response = await fetch(url, {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status}`);
        }

        const data: ProductsResponse = await response.json();

        if (mounted) {
          if (data.success && data.products) {
            setProducts(data.products);
            setSource(data.source || 'error');
            setFromGoogleSheets(data.fromGoogleSheets || false);

            // Log for debugging
            if (data.cacheCleared) {
              console.log('✅ Cache cleared, fresh data loaded');
            }
            console.log(`📊 Loaded ${data.count} products from ${data.source}`);
          } else {
            setError(data.error || 'Failed to load products');
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
          console.error('Error fetching products:', err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

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

  return { products, loading, error, source, fromGoogleSheets, refetch };
}
