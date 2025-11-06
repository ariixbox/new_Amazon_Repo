# Amazon Affiliate Integration Guide

Your affiliate tag **`mobile0cd832f-20`** is now configured throughout the site! 🎉

## How It Works

All product links automatically include your affiliate tag. The system generates proper Amazon affiliate URLs like:
```
https://www.amazon.com/dp/ASIN?tag=mobile0cd832f-20
```

## Adding New Products

### Step 1: Find the Product ASIN

The ASIN (Amazon Standard Identification Number) is a unique 10-character code for every Amazon product.

**How to find it:**
1. Go to the product page on Amazon.com
2. Scroll down to "Product Information" section
3. Look for "ASIN: B0XXXXXXXX"

**Or extract from URL:**
- URL: `https://www.amazon.com/dp/B0CW5JNFKV/`
- ASIN: `B0CW5JNFKV`

### Step 2: Add Product to Database

Open `src/data/products.ts` and add your product:

```typescript
{
  id: "17",  // Unique ID (increment from last)
  title: "Your Product Title",
  description: "Detailed product description...",
  price: 99.99,
  image: "https://images.unsplash.com/photo-...",
  category: ["electronics", "trending"],  // Pick relevant categories
  asin: "B0CW5JNFKV",  // ⭐ The product's ASIN
  saves: 0,  // Start at 0
  featured: false,  // Set to true for homepage featured section
  trending: true,  // Set to true if currently trending
  rating: 4.7,
  reviewCount: 1234
}
```

### Step 3: Save and Test

1. Save the file
2. Refresh your site
3. Click "Check It Out" on the product
4. Verify URL includes: `?tag=mobile0cd832f-20`

## Your Affiliate Configuration

Location: `src/config/affiliate.ts`

```typescript
export const affiliateConfig = {
  tag: 'mobile0cd832f-20',  // ✅ Your affiliate tag

  marketplaces: {
    en: 'amazon.com',   // English → Amazon.com (USA)
    es: 'amazon.com',   // Spanish → Amazon.com (USA)
    he: 'amazon.com',   // Hebrew → Amazon.com (USA)
    fr: 'amazon.fr',    // French → Amazon France
    de: 'amazon.de',    // German → Amazon Germany
    it: 'amazon.it',    // Italian → Amazon Italy
    pt: 'amazon.com.br',// Portuguese → Amazon Brazil
  }
};
```

## Multi-Marketplace Support (Optional)

If you have affiliate accounts in multiple countries:

1. Sign up for Amazon Associates in each country
2. Get your country-specific affiliate tags
3. Update `tagsByMarketplace` in `src/config/affiliate.ts`:

```typescript
tagsByMarketplace: {
  'amazon.com': 'mobile0cd832f-20',      // USA tag
  'amazon.fr': 'yourfrancetag-21',       // France tag
  'amazon.de': 'yourgermanytag-21',      // Germany tag
  'amazon.it': 'youritalytag-21',        // Italy tag
  'amazon.com.br': 'yourbraziltag-20',   // Brazil tag
}
```

## Testing Your Links

### Manual Test
1. Click any "Check It Out" button
2. Verify URL format: `https://www.amazon.com/dp/ASIN?tag=mobile0cd832f-20`
3. Check Amazon Associates reports for clicks

### Automated Test
```bash
# Check all products have valid ASINs
grep -r "asin:" src/data/products.ts
```

## Finding Product ASINs Quickly

### Method 1: Amazon Product Page
- Look in "Product Information" section
- Listed as "ASIN: B0XXXXXXXX"

### Method 2: From URL
- Product URL: `amazon.com/dp/B0ABC12345/`
- ASIN: `B0ABC12345`

### Method 3: Using Amazon Associates SiteStripe
1. Install Amazon Associates SiteStripe toolbar
2. Visit any product page
3. Click "Get Link" → Shows ASIN

## Best Practices

### ✅ DO:
- Use actual product ASINs from Amazon
- Test links before publishing
- Update prices regularly (they change frequently)
- Add high-quality product images
- Write detailed, honest descriptions
- Mark seasonal products as featured/trending

### ❌ DON'T:
- Use fake/made-up ASINs
- Guarantee prices (they fluctuate)
- Copy-paste Amazon's exact descriptions (copyright)
- Promise product availability
- Forget to disclose affiliate relationship (already in footer)

## Product Categories

Available categories (combine multiple):
- `electronics` - Tech gadgets
- `home-kitchen` - Home & kitchen items
- `toys` - Toys and games
- `trending` - Currently trending
- `gift-ideas` - Good for gifts

## Image Sources

### Option 1: Amazon Images
```typescript
image: "https://m.media-amazon.com/images/I/71abc123.jpg"
```
**How to get:**
1. Right-click product image on Amazon
2. "Copy image address"
3. Use that URL

### Option 2: Unsplash (Stock Photos)
```typescript
image: "https://images.unsplash.com/photo-..."
```
**How to get:**
1. Visit unsplash.com
2. Search for product type
3. Copy image URL

### Option 3: Your Own Images
Upload to `/public/images/` and use:
```typescript
image: "/images/product-name.jpg"
```

## Updating Existing Products

To change a product's ASIN:

```typescript
// Before
{
  id: "5",
  asin: "B0OLDPRODUCT",  // ❌ Old ASIN
  // ...
}

// After
{
  id: "5",
  asin: "B0NEWPRODUCT",  // ✅ New ASIN
  // ...
}
```

## Tracking Performance

### Check Amazon Associates Dashboard
1. Login to associates.amazon.com
2. View "Reports" → "Earnings"
3. Track clicks and conversions
4. See which products perform best

### Update Your Site Based on Data
- Remove low-performing products
- Feature high-converting items
- Adjust prices to match Amazon
- Update trending badges

## Common Issues

### Issue: Links don't include affiliate tag
**Solution:** Check `src/config/affiliate.ts` - verify your tag is correct

### Issue: Invalid ASIN error
**Solution:** ASINs are exactly 10 characters (letters and numbers)

### Issue: Product not appearing
**Solution:** Check `src/data/products.ts` syntax - missing comma?

### Issue: Wrong Amazon marketplace
**Solution:** Update `marketplaces` in `src/config/affiliate.ts`

## Need Help?

1. Check this guide
2. Review `/update-products` page on your site
3. See `README.md` for general setup
4. Contact Amazon Associates support for account issues

## Quick Reference

| File | Purpose |
|------|---------|
| `src/config/affiliate.ts` | Your affiliate tag configuration |
| `src/data/products.ts` | All product listings |
| `src/data/blog.ts` | Blog posts |
| `AFFILIATE-GUIDE.md` | This guide |

---

**Your Affiliate Tag:** `mobile0cd832f-20` ✅
**Marketplace:** Amazon.com (USA) 🇺🇸
**Status:** Active and working! 🎉
