import { generateAffiliateLink } from '@/config/affiliate';
import { fetchProductsFromSheets } from '@/lib/googleSheets';

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string[];
  asin: string; // Amazon Standard Identification Number
  saves: number;
  featured?: boolean;
  trending?: boolean;
  rating?: number;
  reviewCount?: number;
  amazonLink?: string; // Optional custom Amazon affiliate link (e.g., amzn.to/xxx)
};

// Helper function to get affiliate link for a product
export function getProductLink(product: Product): string {
  // Use custom link if provided, otherwise generate from ASIN
  if (product.amazonLink) {
    return product.amazonLink;
  }
  return generateAffiliateLink(product.asin);
}

// Fallback products (used if Google Sheets fails or during development)
const fallbackProducts: Product[] = [
  // Electronics
  {
    id: "1",
    title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    description: "Industry-leading noise cancellation with two processors controlling 8 microphones. Up to 30-hour battery life with quick charging. Premium sound quality with LDAC and DSEE Extreme.",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
    category: ["electronics", "trending"],
    asin: "B0BXNX1HFG",
    saves: 245,
    featured: true,
    trending: true,
    rating: 4.7,
    reviewCount: 12453
  },
  {
    id: "2",
    title: "GoPro HERO12 Black 4K Action Camera",
    description: "Waterproof to 33ft, stunning 5.3K60 video, 27MP photos, HyperSmooth 6.0 stabilization. Perfect for adventure seekers capturing life's most exciting moments.",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=800&h=600&fit=crop",
    category: ["electronics", "gift-ideas"],
    asin: "B0CDZMD3XR",
    saves: 189,
    rating: 4.6,
    reviewCount: 3892
  },
  {
    id: "3",
    title: "Apple Watch Series 9 GPS + Cellular",
    description: "Advanced health and fitness features including ECG, blood oxygen monitoring, and sleep tracking. Emergency SOS, fall detection, and always-on Retina display. Water resistant to 50m.",
    price: 499.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop",
    category: ["electronics", "trending", "gift-ideas"],
    asin: "B0CHX8SZQS",
    saves: 312,
    trending: true,
    rating: 4.8,
    reviewCount: 8104
  },
  {
    id: "4",
    title: "JBL Flip 6 Portable Bluetooth Speaker",
    description: "IP67 waterproof and dustproof portable speaker with powerful JBL sound. 12 hours of playtime, bold audio, and deep bass. Perfect for any adventure.",
    price: 129.95,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=600&fit=crop",
    category: ["electronics", "gift-ideas"],
    asin: "B09HQQ2LNV",
    saves: 167,
    rating: 4.8,
    reviewCount: 54743
  },

  // Home & Kitchen
  {
    id: "5",
    title: "Ninja AF101 Air Fryer, 4 Qt",
    description: "Air fry, roast, reheat, and dehydrate with one versatile appliance. Wide temperature range 105°F-400°F. Dishwasher safe basket and crisper plate. Cooks up to 75% less fat than traditional frying.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1585515320310-259814833806?w=800&h=600&fit=crop",
    category: ["home-kitchen", "trending"],
    asin: "B07FDJMC9Q",
    saves: 428,
    featured: true,
    trending: true,
    rating: 4.8,
    reviewCount: 78256
  },
  {
    id: "6",
    title: "iRobot Roomba j7+ Self-Emptying Robot Vacuum",
    description: "Identifies and avoids obstacles like pet waste and charging cords. Empties itself for up to 60 days. Smart mapping lets you control which rooms to clean. Works with Alexa.",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&h=600&fit=crop",
    category: ["home-kitchen", "trending"],
    asin: "B09XBZCFX7",
    saves: 521,
    trending: true,
    rating: 4.5,
    reviewCount: 5876
  },
  {
    id: "7",
    title: "Breville Barista Express Espresso Machine",
    description: "Integrated conical burr grinder with dose-control grinding. Micro-foam milk texturing for cafe-quality latte art. Digital temperature control for optimal espresso extraction.",
    price: 699.95,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&h=600&fit=crop",
    category: ["home-kitchen", "gift-ideas"],
    asin: "B00CH9QWOU",
    saves: 294,
    rating: 4.6,
    reviewCount: 12342
  },
  {
    id: "8",
    title: "Philips Hue White and Color Smart Bulb Starter Kit",
    description: "4-pack smart LED bulbs with bridge. 16 million colors and 50,000 shades of white. Works with Alexa, Google Assistant, and Apple HomeKit. Set routines and schedules.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1550985616-10810253b84d?w=800&h=600&fit=crop",
    category: ["home-kitchen", "electronics"],
    asin: "B07QV9XB87",
    saves: 156,
    rating: 4.7,
    reviewCount: 34987
  },

  // Toys
  {
    id: "9",
    title: "Holy Stone HS720E 4K EIS Drone with UHD Camera",
    description: "4K UHD camera with EIS anti-shake, GPS assisted flight, 5GHz FPV transmission. 46 minutes flight time with 2 batteries. Perfect for beginners and experienced pilots alike.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=600&fit=crop",
    category: ["toys", "electronics", "gift-ideas"],
    asin: "B09QV95SJN",
    saves: 203,
    rating: 4.3,
    reviewCount: 2654
  },
  {
    id: "10",
    title: "LEGO Classic Large Creative Brick Box",
    description: "790-piece building block set with 33 different colors. Includes windows, eyes, and lots of wheels. Perfect for ages 4-99. Encourages creativity and imagination.",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&h=600&fit=crop",
    category: ["toys", "gift-ideas"],
    asin: "B07Q2HHLHT",
    saves: 178,
    rating: 4.9,
    reviewCount: 43245
  },
  {
    id: "11",
    title: "WowWee CHiP Robot Dog Toy",
    description: "Smart robot dog with intelligent personality. Responds to touch, voice, and smart ball. Plays fetch, dances, and learns tricks. Includes charging bed that doubles as a play area.",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1563207153-f403bf289096?w=800&h=600&fit=crop",
    category: ["toys", "electronics", "trending"],
    asin: "B01BNJFBY8",
    saves: 267,
    trending: true,
    rating: 4.2,
    reviewCount: 3834
  },
  {
    id: "12",
    title: "National Geographic Mega Science Lab Kit",
    description: "Over 15 science experiments including crystal growing, volcano eruption, and more. Full-color learning guide with detailed explanations. Perfect STEM gift for curious minds.",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop",
    category: ["toys", "gift-ideas"],
    asin: "B07YS86WW5",
    saves: 142,
    rating: 4.6,
    reviewCount: 8567
  },

  // Gift Ideas
  {
    id: "13",
    title: "Lovery Spa Gift Basket Set - 12 Piece Bath & Body Set",
    description: "Luxurious spa gift set with vanilla coconut scent. Includes bath bombs, shower gel, bubble bath, body lotion, bath salts, and more. Perfect self-care gift in beautiful packaging.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=600&fit=crop",
    category: ["gift-ideas"],
    asin: "B07GBZJV45",
    saves: 234,
    rating: 4.5,
    reviewCount: 12092
  },
  {
    id: "14",
    title: "Nixplay Smart Digital Photo Frame 10.1 Inch",
    description: "WiFi cloud digital frame that instantly displays photos from your phone. Easily share moments with loved ones from anywhere. Full HD IPS display with motion sensor.",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=600&fit=crop",
    category: ["gift-ideas", "electronics"],
    asin: "B07WTQ58N7",
    saves: 189,
    rating: 4.4,
    reviewCount: 7341
  },
  {
    id: "15",
    title: "Amazon Fresh Brand - Colombia Whole Bean Coffee",
    description: "Medium roast, 100% Arabica coffee. Balanced and smooth with caramel notes. Sustainably sourced. Perfect for drip coffee makers, French press, or pour over.",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=600&fit=crop",
    category: ["gift-ideas", "home-kitchen"],
    asin: "B084RRGKQ3",
    saves: 312,
    featured: true,
    rating: 4.6,
    reviewCount: 23567
  },
  {
    id: "16",
    title: "Anker 3-in-1 Cube with MagSafe",
    description: "Compact wireless charging station for iPhone, Apple Watch, and AirPods. MagSafe compatible with 15W fast charging. Foldable and portable design perfect for travel.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1591290619762-d2bb1ecb8b66?w=800&h=600&fit=crop",
    category: ["electronics", "gift-ideas"],
    asin: "B0C2Q7ZF4L",
    saves: 198,
    rating: 4.7,
    reviewCount: 5876
  }
];

export const categories = [
  { id: "electronics", name: "Electronics", icon: "🔌" },
  { id: "home-kitchen", name: "Home & Kitchen", icon: "🏠" },
  { id: "toys", name: "Toys", icon: "🎮" },
  { id: "trending", name: "Trending Products", icon: "🔥" },
  { id: "gift-ideas", name: "Gift Ideas", icon: "🎁" }
];

// Cache for products loaded from Google Sheets
let cachedProductsData: Product[] | null = null;
let dataSource: 'google-sheets' | 'fallback' = 'fallback';

/**
 * Load products from Google Sheets with fallback to hardcoded data
 * This is an async function that should be called from server components or API routes
 */
export async function loadProducts(): Promise<Product[]> {
  // Return cached data if available
  if (cachedProductsData) {
    return cachedProductsData;
  }

  try {
    // Try to fetch from Google Sheets
    const sheetsProducts = await fetchProductsFromSheets();

    if (sheetsProducts.length > 0) {
      console.log(`✅ Loaded ${sheetsProducts.length} products from Google Sheets`);
      cachedProductsData = sheetsProducts;
      dataSource = 'google-sheets';
      return sheetsProducts;
    }

    // If no products from sheets, use fallback
    console.warn('⚠️ No products from Google Sheets, using fallback data');
    cachedProductsData = fallbackProducts;
    dataSource = 'fallback';
    return fallbackProducts;
  } catch (error) {
    console.error('❌ Error loading products from Google Sheets:', error);
    cachedProductsData = fallbackProducts;
    dataSource = 'fallback';
    return fallbackProducts;
  }
}

/**
 * Get the current data source
 */
export function getDataSource(): 'google-sheets' | 'fallback' {
  return dataSource;
}

/**
 * Clear product cache (useful for forcing refresh)
 */
export function clearProductsCache(): void {
  cachedProductsData = null;
  console.log('🔄 Product cache cleared');
}

/**
 * Export products for backward compatibility
 * In client components, use loadProducts() instead
 */
export const products = fallbackProducts;
