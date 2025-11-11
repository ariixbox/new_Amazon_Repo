import { fetchBlogPostsFromSheets } from '@/lib/googleSheets';

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string[];
  image: string;
  author: string;
  date: string;
  featured?: boolean;
  readTime?: number; // minutes
};

// Fallback blog posts
const fallbackPosts: BlogPost[] = [
  {
    id: "1",
    title: "Top 10 Hanukkah Gifts for 2025",
    slug: "top-hanukkah-gifts-2025",
    excerpt: "Discover the most meaningful and beautiful Hanukkah gifts to celebrate the Festival of Lights with your loved ones.",
    content: "<p>Hanukkah is a time of celebration, light, and giving. Finding the perfect gift...</p>",
    category: ["judaica", "gift-ideas"],
    image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800",
    author: "Sarah Cohen",
    date: "2025-01-15",
    featured: true,
    readTime: 5
  },
  {
    id: "2",
    title: "Complete Passover Seder Guide",
    slug: "passover-seder-guide",
    excerpt: "Everything you need to know to host a memorable and meaningful Passover Seder.",
    content: "<p>The Passover Seder is one of the most important Jewish traditions...</p>",
    category: ["judaica"],
    image: "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=800",
    author: "Rabbi David Levy",
    date: "2025-03-01",
    featured: false,
    readTime: 8
  }
];

// Cache
let cachedBlogPosts: BlogPost[] | null = null;
let blogDataSource: 'google-sheets' | 'fallback' = 'fallback';

/**
 * Load blog posts from Google Sheets
 */
export async function loadBlogPosts(): Promise<BlogPost[]> {
  if (cachedBlogPosts) {
    return cachedBlogPosts;
  }

  try {
    const sheetsPosts = await fetchBlogPostsFromSheets();

    if (sheetsPosts.length > 0) {
      console.log(`✅ Loaded ${sheetsPosts.length} blog posts from Google Sheets`);
      cachedBlogPosts = sheetsPosts as BlogPost[];
      blogDataSource = 'google-sheets';
      return sheetsPosts;
    }

    console.warn('⚠️ No blog posts from Google Sheets, using fallback data');
    cachedBlogPosts = fallbackPosts;
    blogDataSource = 'fallback';
    return fallbackPosts;
  } catch (error) {
    console.error('❌ Error loading blog posts from Google Sheets:', error);
    cachedBlogPosts = fallbackPosts;
    blogDataSource = 'fallback';
    return fallbackPosts;
  }
}

export function getBlogDataSource(): 'google-sheets' | 'fallback' {
  return blogDataSource;
}

export function clearBlogCache(): void {
  cachedBlogPosts = null;
  console.log('🔄 Blog cache cleared');
}

export const blogPosts = fallbackPosts;
