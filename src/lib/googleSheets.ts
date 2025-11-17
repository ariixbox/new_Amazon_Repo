import { Product } from '@/data/products';
import { BlogPost } from '@/data/blog';
import { Category } from '@/data/categories';
import { GOOGLE_SHEET_CONFIG } from '@/config/googleSheets';

// Cache for products data
let cachedProducts: Product[] | null = null;
let cacheTimestamp: number = 0;

// Cache for blog posts data
let cachedBlogPosts: BlogPost[] | null = null;
let blogCacheTimestamp: number = 0;

// Cache for categories data
let cachedCategories: Category[] | null = null;
let categoriesCacheTimestamp: number = 0;

/**
 * Helper function to create URL-friendly slugs
 */
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with hyphens
    .replace(/^-+|-+$/g, '')      // Remove leading/trailing hyphens
    .substring(0, 100);            // Limit length
}

/**
 * Fetches products from Google Sheets
 * Uses the published CSV endpoint for simplicity (no API key required)
 */
export async function fetchProductsFromSheets(): Promise<Product[]> {
  // Check cache first
  const now = Date.now();
  if (cachedProducts && (now - cacheTimestamp) < GOOGLE_SHEET_CONFIG.cacheDuration) {
    return cachedProducts;
  }

  try {
    // Use the published CSV endpoint
    // Format: https://docs.google.com/spreadsheets/d/SHEET_ID/gviz/tq?tqx=out:csv&sheet=SHEET_NAME
    const csvUrl = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_CONFIG.sheetId}/gviz/tq?tqx=out:csv&sheet=${GOOGLE_SHEET_CONFIG.sheetName}`;

    const response = await fetch(csvUrl, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch sheet data: ${response.status}`);
    }

    const csvText = await response.text();
    const products = parseCSVToProducts(csvText);

    // Update cache
    cachedProducts = products;
    cacheTimestamp = now;

    return products;
  } catch (error) {
    console.error('Error fetching products from Google Sheets:', error);

    // Return cached data if available, even if expired
    if (cachedProducts) {
      console.warn('Using cached product data due to fetch error');
      return cachedProducts;
    }

    // Return empty array as fallback
    return [];
  }
}

/**
 * Fetches blog posts from Google Sheets
 */
export async function fetchBlogPostsFromSheets(): Promise<BlogPost[]> {
  // Check cache first
  const now = Date.now();
  if (cachedBlogPosts && (now - blogCacheTimestamp) < GOOGLE_SHEET_CONFIG.cacheDuration) {
    return cachedBlogPosts;
  }

  try {
    // Use the published CSV endpoint for blog sheet
    const csvUrl = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_CONFIG.sheetId}/gviz/tq?tqx=out:csv&sheet=${GOOGLE_SHEET_CONFIG.blogSheetName}`;

    const response = await fetch(csvUrl, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog sheet data: ${response.status}`);
    }

    const csvText = await response.text();
    const blogPosts = parseCSVToBlogPosts(csvText);

    // Update cache
    cachedBlogPosts = blogPosts;
    blogCacheTimestamp = now;

    return blogPosts;
  } catch (error) {
    console.error('Error fetching blog posts from Google Sheets:', error);

    // Return cached data if available, even if expired
    if (cachedBlogPosts) {
      console.warn('Using cached blog post data due to fetch error');
      return cachedBlogPosts;
    }

    // Return empty array as fallback
    return [];
  }
}

/**
 * Fetches categories from Google Sheets
 */
export async function fetchCategoriesFromSheets(): Promise<Category[]> {
  // Check cache first
  const now = Date.now();
  if (cachedCategories && (now - categoriesCacheTimestamp) < GOOGLE_SHEET_CONFIG.cacheDuration) {
    return cachedCategories;
  }

  try {
    // Use the published CSV endpoint for categories sheet
    const csvUrl = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_CONFIG.sheetId}/gviz/tq?tqx=out:csv&sheet=${GOOGLE_SHEET_CONFIG.categoriesSheetName}`;

    const response = await fetch(csvUrl, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch categories sheet data: ${response.status}`);
    }

    const csvText = await response.text();
    const categories = parseCSVToCategories(csvText);

    // Update cache
    cachedCategories = categories;
    categoriesCacheTimestamp = now;

    return categories;
  } catch (error) {
    console.error('Error fetching categories from Google Sheets:', error);

    // Return cached data if available, even if expired
    if (cachedCategories) {
      console.warn('Using cached category data due to fetch error');
      return cachedCategories;
    }

    // Return empty array as fallback
    return [];
  }
}

/**
 * Parses CSV text to Product array
 */
function parseCSVToProducts(csvText: string): Product[] {
  const lines = csvText.split('\n');

  if (lines.length < 2) {
    return [];
  }

  // Parse header row
  const headers = parseCSVLine(lines[0]);

  // Parse data rows
  const products: Product[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCSVLine(line);
    if (values.length < headers.length) continue;

    try {
      const product = parseProductRow(headers, values);
      if (product) {
        products.push(product);
      }
    } catch (error) {
      console.warn(`Error parsing product row ${i}:`, error);
    }
  }

  return products;
}

/**
 * Parses CSV text to BlogPost array
 */
function parseCSVToBlogPosts(csvText: string): BlogPost[] {
  const lines = csvText.split('\n');

  if (lines.length < 2) {
    return [];
  }

  // Parse header row
  const headers = parseCSVLine(lines[0]);

  // Parse data rows
  const blogPosts: BlogPost[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCSVLine(line);
    if (values.length < headers.length) continue;

    try {
      const blogPost = parseBlogPostRow(headers, values);
      if (blogPost) {
        blogPosts.push(blogPost);
      }
    } catch (error) {
      console.warn(`Error parsing blog post row ${i}:`, error);
    }
  }

  return blogPosts;
}

/**
 * Parses CSV text to Category array
 */
function parseCSVToCategories(csvText: string): Category[] {
  const lines = csvText.split('\n');

  if (lines.length < 2) {
    return [];
  }

  // Parse header row
  const headers = parseCSVLine(lines[0]);

  // Parse data rows
  const categories: Category[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCSVLine(line);
    if (values.length < headers.length) continue;

    try {
      const category = parseCategoryRow(headers, values);
      if (category) {
        categories.push(category);
      }
    } catch (error) {
      console.warn(`Error parsing category row ${i}:`, error);
    }
  }

  return categories;
}

/**
 * Parses a CSV line handling quoted values
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Escaped quote
        current += '"';
        i++;
      } else {
        // Toggle quotes
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  // Add last field
  result.push(current.trim());

  return result;
}

/**
 * Parses a product row from CSV values
 */
function parseProductRow(headers: string[], values: string[]): Product | null {
  const row: Record<string, string> = {};

  headers.forEach((header, index) => {
    row[header.toLowerCase().trim()] = values[index] || '';
  });

  // Required fields check
  if (!row['id'] || !row['title'] || !row['asin']) {
    return null;
  }

  // Parse categories (comma-separated in sheet)
  const categories = row['category'] || row['categories'] || '';
  const categoryArray = categories
    .split(',')
    .map(c => c.trim())
    .filter(c => c.length > 0);

  // Build product object
  const product: Product = {
    id: row['id'],
    title: row['title'],
    description: row['description'] || '',
    price: parseFloat(row['price']) || 0,
    image: row['image'] || row['imageurl'] || '',
    category: categoryArray,
    asin: row['asin'],
    saves: parseInt(row['saves']) || 0,
    featured: parseBool(row['featured']),
    trending: parseBool(row['trending']),
    rating: parseFloat(row['rating']) || undefined,
    reviewCount: parseInt(row['reviewcount']) || undefined,
    amazonLink: row['amazonlink'] || undefined, // Custom Amazon affiliate link
  };

  return product;
}

/**
 * Parses a blog post row from CSV values
 */
function parseBlogPostRow(headers: string[], values: string[]): BlogPost | null {
  const row: Record<string, string> = {};

  headers.forEach((header, index) => {
    row[header.toLowerCase().trim()] = values[index] || '';
  });

  // Required fields check
  if (!row['id'] || !row['title']) {
    return null;
  }

  // Generate slug from title if slug is missing or looks invalid
  let slug = row['slug'] || '';

  // Check if slug contains invalid characters (spaces, special chars, etc.)
  if (!slug || /[^a-z0-9-]/.test(slug)) {
    // Generate a clean slug from the title
    slug = createSlug(row['title']);
  }

  // Build blog post object
  const blogPost: BlogPost = {
    id: row['id'],
    title: row['title'],
    slug: slug,
    excerpt: row['excerpt'] || '',
    content: row['content'] || '', // Full blog post content
    image: row['image'] || row['imageurl'] || '',
    category: row['category'] || '',
    date: row['date'] || new Date().toISOString().split('T')[0],
    readTime: row['readtime'] || row['readTime'] || '5 min read',
  };

  return blogPost;
}

/**
 * Parses a category row from CSV values
 */
function parseCategoryRow(headers: string[], values: string[]): Category | null {
  const row: Record<string, string> = {};

  headers.forEach((header, index) => {
    row[header.toLowerCase().trim()] = values[index] || '';
  });

  // Required fields check
  if (!row['id'] || !row['name']) {
    return null;
  }

  // Build category object
  const category: Category = {
    id: row['id'],
    name: row['name'],
    icon: row['icon'] || undefined,
  };

  return category;
}

/**
 * Parses boolean values from sheet
 */
function parseBool(value: string): boolean {
  const v = value.toLowerCase().trim();
  return v === 'true' || v === 'yes' || v === '1';
}

/**
 * Manual cache clear function (call this if you need to force refresh)
 */
export function clearProductCache(): void {
  cachedProducts = null;
  cacheTimestamp = 0;
}

/**
 * Manual cache clear function for blog posts
 */
export function clearBlogCache(): void {
  cachedBlogPosts = null;
  blogCacheTimestamp = 0;
}

/**
 * Manual cache clear function for categories
 */
export function clearCategoriesCache(): void {
  cachedCategories = null;
  categoriesCacheTimestamp = 0;
}
