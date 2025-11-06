import { useState, useEffect } from 'react';
import { Product } from '@/data/products';

interface ProductsResponse {
  success: boolean;
  products: Product[];
  count: number;
  timestamp: string;
  error?: string;
}

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook to fetch products from Google Sheets via API
 */
export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    let mounted = true;

    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/products', {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status}`);
        }

        const data: ProductsResponse = await response.json();

        if (mounted) {
          if (data.success && data.products) {
            setProducts(data.products);
          } else {
            setError(data.error || 'Failed to load products');
          }
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Unknown error occurred');
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
  }, [refreshTrigger]);

  const refetch = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return { products, loading, error, refetch };
}
