import { fetchCategoriesFromSheets } from '@/lib/googleSheets';

export type Category = {
  id: string;
  name: string;
  icon?: string;
};

// Fallback categories (used if Google Sheets fails to load)
export const fallbackCategories: Category[] = [
  { id: 'electronics', name: 'Electronics', icon: '⚡' },
  { id: 'home-kitchen', name: 'Home & Kitchen', icon: '🏠' },
  { id: 'toys', name: 'Toys', icon: '🎮' },
  { id: 'trending', name: 'Trending Products', icon: '✨' },
  { id: 'gift-ideas', name: 'Gift Ideas', icon: '🎁' },
];

// Data source tracking
let currentCategorySource: 'google-sheets' | 'fallback' = 'fallback';
let categoriesCache: Category[] | null = null;

/**
 * Load categories from Google Sheets with fallback to hardcoded data
 */
export async function loadCategories(): Promise<Category[]> {
  try {
    console.log('📂 Loading categories from Google Sheets...');
    const sheetsData = await fetchCategoriesFromSheets();

    if (sheetsData && sheetsData.length > 0) {
      console.log(`✅ Loaded ${sheetsData.length} categories from Google Sheets`);
      currentCategorySource = 'google-sheets';
      categoriesCache = sheetsData;
      return sheetsData;
    } else {
      console.warn('⚠️ No categories found in Google Sheets, using fallback data');
      currentCategorySource = 'fallback';
      categoriesCache = fallbackCategories;
      return fallbackCategories;
    }
  } catch (error) {
    console.error('❌ Error loading categories from Google Sheets:', error);
    console.log('📋 Using fallback category data');
    currentCategorySource = 'fallback';
    categoriesCache = fallbackCategories;
    return fallbackCategories;
  }
}

/**
 * Get the current data source
 */
export function getCategoryDataSource(): 'google-sheets' | 'fallback' {
  return currentCategorySource;
}

/**
 * Clear the categories cache
 */
export function clearCategoriesCache(): void {
  categoriesCache = null;
  currentCategorySource = 'fallback';
}

// For backward compatibility - export as categories
export const categories = fallbackCategories;
