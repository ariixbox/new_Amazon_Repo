// Amazon Affiliate Configuration
export const affiliateConfig = {
  // Your Amazon Affiliate Tag
  tag: 'mobile0cd832f-20',

  // Amazon Marketplaces by Language
  marketplaces: {
    en: 'amazon.com',      // USA
    es: 'amazon.com',      // USA (Spanish speakers)
    he: 'amazon.com',      // USA (Hebrew speakers)
    fr: 'amazon.fr',       // France
    de: 'amazon.de',       // Germany
    it: 'amazon.it',       // Italy
    pt: 'amazon.com.br',   // Brazil
    ar: 'amazon.ae',       // UAE
  },

  // Affiliate tags for different marketplaces (optional - add if you have multiple accounts)
  tagsByMarketplace: {
    'amazon.com': 'mobile0cd832f-20',
    'amazon.fr': 'mobile0cd832f-20',  // Update with FR tag if different
    'amazon.de': 'mobile0cd832f-20',  // Update with DE tag if different
    'amazon.it': 'mobile0cd832f-20',  // Update with IT tag if different
    'amazon.com.br': 'mobile0cd832f-20', // Update with BR tag if different
    'amazon.ae': 'mobile0cd832f-20',  // Update with AE tag if different
  }
};

/**
 * Generate Amazon affiliate link
 * @param asin - Amazon Standard Identification Number (10 characters)
 * @param marketplace - Amazon marketplace domain (optional, defaults to .com)
 * @returns Full affiliate URL
 */
export function generateAffiliateLink(asin: string, marketplace: string = 'amazon.com'): string {
  const tag = (affiliateConfig.tagsByMarketplace as Record<string, string>)[marketplace] || affiliateConfig.tag;
  return `https://www.${marketplace}/dp/${asin}?tag=${tag}`;
}

/**
 * Generate affiliate link based on user's language
 * @param asin - Amazon Standard Identification Number
 * @param language - User's selected language
 * @returns Localized affiliate URL
 */
export function generateLocalizedAffiliateLink(asin: string, language: string): string {
  const marketplace = affiliateConfig.marketplaces[language as keyof typeof affiliateConfig.marketplaces] || 'amazon.com';
  return generateAffiliateLink(asin, marketplace);
}

/**
 * Extract ASIN from Amazon URL
 * @param url - Amazon product URL
 * @returns ASIN or null
 */
export function extractASIN(url: string): string | null {
  const match = url.match(/\/dp\/([A-Z0-9]{10})/i) || url.match(/\/gp\/product\/([A-Z0-9]{10})/i);
  return match ? match[1] : null;
}
