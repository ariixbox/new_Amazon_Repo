import { useState, useEffect } from 'react';
import { BlogPost } from '@/data/blog';

interface BlogResponse {
  success: boolean;
  blogPosts: BlogPost[];
  count: number;
  timestamp: string;
  source?: 'google-sheets' | 'fallback' | 'error';
  fromGoogleSheets?: boolean;
  cacheCleared?: boolean;
  error?: string;
}

interface UseBlogReturn {
  blogPosts: BlogPost[];
  loading: boolean;
  error: string | null;
  source: 'google-sheets' | 'fallback' | 'error' | null;
  fromGoogleSheets: boolean;
  refetch: (clearCache?: boolean) => void;
}

/**
 * Hook to fetch blog posts from Google Sheets via API
 */
export function useBlog(): UseBlogReturn {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<'google-sheets' | 'fallback' | 'error' | null>(null);
  const [fromGoogleSheets, setFromGoogleSheets] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [shouldClearCache, setShouldClearCache] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchBlogPosts() {
      try {
        setLoading(true);
        setError(null);

        const url = shouldClearCache
          ? '/api/blog?clearCache=true'
          : '/api/blog';

        const response = await fetch(url, {
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch blog posts: ${response.status}`);
        }

        const data: BlogResponse = await response.json();

        if (mounted) {
          if (data.success && data.blogPosts) {
            setBlogPosts(data.blogPosts);
            setSource(data.source || 'error');
            setFromGoogleSheets(data.fromGoogleSheets || false);

            // Log for debugging
            if (data.cacheCleared) {
              console.log('✅ Blog cache cleared, fresh data loaded');
            }
            console.log(`📰 Loaded ${data.count} blog posts from ${data.source}`);
          } else {
            setError(data.error || 'Failed to load blog posts');
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
          console.error('Error fetching blog posts:', err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchBlogPosts();

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

  return { blogPosts, loading, error, source, fromGoogleSheets, refetch };
}
