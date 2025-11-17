# Google Sheets Backend Setup Guide

Your Amazon affiliate site now uses **Google Sheets** as the backend for all product data! 🎉

This means you can update products, prices, descriptions, and affiliate links directly in Google Sheets without touching any code.

## 📋 Table of Contents

1. [Quick Setup (5 minutes)](#quick-setup)
2. [Google Sheet Structure](#google-sheet-structure)
3. [Step-by-Step Setup](#step-by-step-setup)
4. [How to Update Products](#how-to-update-products)
5. [Advanced Features](#advanced-features)
6. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Setup

### Step 1: Copy the Template Sheet

**[📊 CLICK HERE TO COPY THE TEMPLATE GOOGLE SHEET](https://docs.google.com/spreadsheets/d/1g8F6xYvZ_example_REPLACE_WITH_YOUR_SHEET_ID/copy)**

Or create a new sheet manually using the structure below.

### Step 2: Publish Your Sheet

1. In your Google Sheet, click **File** → **Share** → **Publish to web**
2. Choose **"Entire Document"** or **"Products"** sheet
3. Set format to **"Web page"**
4. Click **"Publish"**
5. Copy the **Sheet ID** from your browser URL:
   - URL: `https://docs.google.com/spreadsheets/d/`**`1AbC123XyZ...`**`/edit`
   - Sheet ID: **`1AbC123XyZ...`**

### Step 3: Configure Your Site

Open `src/lib/googleSheets.ts` and replace the Sheet ID:

```typescript
export const GOOGLE_SHEET_CONFIG = {
  sheetId: 'YOUR_SHEET_ID_HERE',  // ← Paste your Sheet ID here
  sheetName: 'Products',
  cacheDuration: 5 * 60 * 1000,
};
```

### Step 4: Deploy and Test

```bash
bun run build
bun run start
```

Visit your site - products should now load from your Google Sheet! 🎉

---

## 📊 Google Sheet Structure

Your Google Sheet must have these exact column headers (case-insensitive):

| Column | Required | Type | Example | Notes |
|--------|----------|------|---------|-------|
| **id** | ✅ Yes | Text | `1`, `prod-001` | Unique identifier |
| **title** | ✅ Yes | Text | `Sony WH-1000XM5 Headphones` | Product name |
| **description** | ✅ Yes | Text | `Industry-leading noise cancellation...` | Full description |
| **price** | ✅ Yes | Number | `399.99` | Price without $ symbol |
| **image** | ✅ Yes | URL | `https://images.unsplash.com/...` | Image URL |
| **category** | ✅ Yes | Text | `electronics, trending` | Comma-separated categories |
| **asin** | ✅ Yes | Text | `B0BXNX1HFG` | Amazon ASIN (10 characters) |
| **saves** | No | Number | `245` | Number of saves (default: 0) |
| **featured** | No | Boolean | `TRUE` or `FALSE` | Show on homepage featured |
| **trending** | No | Boolean | `TRUE` or `FALSE` | Show trending badge |
| **rating** | No | Number | `4.8` | Rating (1-5) |
| **reviewcount** | No | Number | `1523` | Number of reviews |

### Valid Categories

Use these exact category names (lowercase, hyphenated):

- `electronics`
- `home-kitchen`
- `toys`
- `trending`
- `gift-ideas`

**Multiple categories:** Separate with commas: `electronics, trending, gift-ideas`

---

## 📝 Step-by-Step Setup

### Method 1: Use Template (Recommended)

1. **Copy the template sheet** (link at top of this guide)
2. **Edit the sample products** with your own data
3. **Publish to web** (File → Share → Publish to web)
4. **Copy Sheet ID** from URL
5. **Update** `src/lib/googleSheets.ts` with your Sheet ID
6. **Deploy your site**

### Method 2: Create From Scratch

1. **Create new Google Sheet**
   - Go to [sheets.google.com](https://sheets.google.com)
   - Click **"+ Blank"**
   - Name it "Amazon Affiliate Products"

2. **Name the first sheet tab "Products"**
   - Click on "Sheet1" at bottom
   - Rename to "Products"

3. **Add column headers** (Row 1):
   ```
   id | title | description | price | image | category | asin | saves | featured | trending | rating | reviewcount
   ```

4. **Add your products** (Row 2+):
   ```
   1 | Sony WH-1000XM5 | Industry-leading noise... | 399.99 | https://... | electronics,trending | B0BXNX1HFG | 245 | TRUE | TRUE | 4.7 | 12453
   ```

5. **Publish to web**:
   - File → Share → Publish to web
   - Choose "Products" sheet or "Entire Document"
   - Format: Web page
   - Click "Publish"

6. **Get Sheet ID**:
   - Look at your browser URL
   - Copy the long ID between `/d/` and `/edit`
   - Example: `https://docs.google.com/spreadsheets/d/`**`1AbC123...`**`/edit`

7. **Configure your site**:
   - Open `src/lib/googleSheets.ts`
   - Replace `sheetId` with your ID
   - Save and deploy

---

## ✏️ How to Update Products

### Adding a New Product

1. Open your Google Sheet
2. Add a new row with all product details
3. Make sure to include:
   - Unique `id`
   - Product `title`
   - Full `description`
   - Current `price` (number only, no $)
   - `image` URL
   - At least one `category`
   - Amazon `asin`
4. Save the sheet
5. Wait 5 minutes or force refresh your site

### Updating Existing Products

1. Find the product row in your sheet
2. Edit any field (price, description, image, etc.)
3. Save the sheet
4. Changes appear on your site within 5 minutes

### Removing Products

1. Delete the entire row in your Google Sheet
2. Product disappears from your site automatically

### Bulk Updates

1. Use Google Sheets' find & replace (Ctrl+H / Cmd+H)
2. Update multiple products at once
3. Copy/paste from Excel or CSV
4. All changes sync to your site

---

## 🎯 Advanced Features

### Image URLs

**Option 1: Unsplash (Free)**
```
https://images.unsplash.com/photo-1234567890?w=800&h=600&fit=crop
```

**Option 2: Amazon Product Images**
```
https://m.media-amazon.com/images/I/71abc123.jpg
```

**Option 3: Your Own Hosting**
```
https://yourdomain.com/images/product-name.jpg
```

### Featured vs Trending

- **Featured** = Appears in homepage "Featured Products" section
- **Trending** = Shows 🔥 badge and appears in "Trending" filter

Set both to `TRUE` for maximum visibility.

### Multiple Categories

Products can belong to multiple categories:

```
electronics, trending, gift-ideas
```

This makes the product appear in:
- Electronics category page
- Trending category page
- Gift Ideas category page
- Trending filter on homepage
- Gift Ideas filter on homepage

### Pricing Strategy

**Keep prices updated:**
- Check Amazon prices weekly
- Update your sheet immediately
- Consider adding a note about "Price may vary"

**Price ranges for filtering:**
- Under $50
- $50 - $100
- $100 - $200
- $200+

### Finding Product ASINs

**Method 1: Product URL**
```
https://www.amazon.com/dp/B0BXNX1HFG/
                         ^^^^^^^^^^
                         This is the ASIN
```

**Method 2: Product Information**
- Scroll to "Product Information" on Amazon
- Look for "ASIN: B0BXNX1HFG"

**Method 3: Amazon Associates**
- Use SiteStripe toolbar
- Click "Get Link" on any product
- ASIN is shown

---

## 🔄 How It Works

### Data Flow

```
┌─────────────────┐
│  Google Sheets  │  ← You edit here
└────────┬────────┘
         │
         │ Published as CSV
         ↓
┌─────────────────┐
│   Your Website  │  ← Fetches every 5 min
└────────┬────────┘
         │
         │ Displays products
         ↓
┌─────────────────┐
│   Site Visitors │  ← See updated content
└─────────────────┘
```

### Caching

- Products are cached for **5 minutes** to improve performance
- After 5 minutes, your site checks for updates
- You can change cache duration in `src/lib/googleSheets.ts`

```typescript
cacheDuration: 5 * 60 * 1000,  // 5 minutes (in milliseconds)
```

### Fallback Data

If Google Sheets fails to load (rare), your site automatically uses fallback data from `src/data/products.ts`.

---

## 🐛 Troubleshooting

### Products Not Updating

**Problem:** Changes in Google Sheets don't appear on site

**Solutions:**
1. ✅ Make sure sheet is **published to web** (File → Share → Publish)
2. ✅ Wait 5 minutes for cache to expire
3. ✅ Hard refresh your browser (Ctrl+Shift+R / Cmd+Shift+R)
4. ✅ Check Sheet ID is correct in `src/lib/googleSheets.ts`
5. ✅ Verify sheet tab is named "Products" (case-sensitive)

### "Error Loading Products"

**Problem:** Red error message on site

**Solutions:**
1. ✅ Check your Sheet ID is correct
2. ✅ Make sure sheet is published as "Web page"
3. ✅ Verify sheet permissions are public (Anyone with link can view)
4. ✅ Check browser console (F12) for detailed errors
5. ✅ Verify column headers match exactly (case doesn't matter)

### Products Appear Blank/Incomplete

**Problem:** Products show but missing data

**Solutions:**
1. ✅ Check required fields are filled: `id`, `title`, `asin`, `description`
2. ✅ Remove empty rows in your sheet
3. ✅ Make sure `price` is a number (no $ symbol)
4. ✅ Verify `rating` is between 1-5
5. ✅ Check `category` uses valid category names

### Images Not Loading

**Problem:** Product images don't display

**Solutions:**
1. ✅ Use full HTTPS URLs (not HTTP)
2. ✅ Test image URL in browser first
3. ✅ Make sure images are publicly accessible
4. ✅ Use Unsplash or Amazon image URLs
5. ✅ Check image URL doesn't have quotes or spaces

### Categories Not Working

**Problem:** Category filters don't show products

**Solutions:**
1. ✅ Use exact category names (lowercase, hyphenated)
2. ✅ Valid: `electronics, home-kitchen, toys, trending, gift-ideas`
3. ✅ Separate multiple categories with commas
4. ✅ No spaces before/after commas (or it's okay, we trim them)

### Affiliate Links Not Working

**Problem:** Links don't include affiliate tag

**Solutions:**
1. ✅ Check ASIN is exactly 10 characters
2. ✅ Verify your affiliate tag in `src/config/affiliate.ts`
3. ✅ Test link format: `amazon.com/dp/ASIN?tag=yourtag-20`
4. ✅ Make sure ASIN column is text (not number)

---

## 📊 Sample Google Sheet Template

### Create this structure:

| id | title | description | price | image | category | asin | saves | featured | trending | rating | reviewcount |
|----|-------|-------------|-------|-------|----------|------|-------|----------|----------|--------|-------------|
| 1 | Sony WH-1000XM5 Wireless Headphones | Industry-leading noise cancellation with two processors | 399.99 | https://images.unsplash.com/photo-1505740420928-5e560c06d30e | electronics, trending | B0BXNX1HFG | 245 | TRUE | TRUE | 4.7 | 12453 |
| 2 | GoPro HERO12 Black Camera | 5.3K60 video, 27MP photos, waterproof to 33ft | 349.99 | https://images.unsplash.com/photo-1606925797300-0b35e9d1794e | electronics, gift-ideas | B0CDZMD3XR | 189 | FALSE | FALSE | 4.6 | 3892 |
| 3 | Ninja Air Fryer 4 Qt | Healthier cooking with 75% less fat | 89.99 | https://images.unsplash.com/photo-1585515320310-259814833806 | home-kitchen, trending | B07FDJMC9Q | 428 | TRUE | TRUE | 4.8 | 78256 |

### Pro Tips:

1. **Use data validation** for TRUE/FALSE columns
   - Select column → Data → Data validation
   - Criteria: List of items: `TRUE, FALSE`

2. **Format price column**
   - Select price column
   - Format → Number → 2 decimal places

3. **Freeze header row**
   - View → Freeze → 1 row
   - Makes scrolling easier

4. **Color-code rows**
   - Featured products = Blue
   - Trending products = Orange
   - Out of stock = Gray

5. **Add notes**
   - Right-click cell → Insert note
   - Track when you last updated

---

## 🚀 Deployment

After updating your Google Sheet configuration:

### Netlify (Recommended)

```bash
# Build your site
bun run build

# Deploy automatically pushes to Netlify
git add .
git commit -m "Connected Google Sheets backend"
git push
```

### Vercel

```bash
# Deploy to Vercel
vercel --prod
```

### Manual Deployment

```bash
# Build
bun run build

# Upload .next folder to your hosting
```

---

## 🎓 Best Practices

### Content Strategy

1. **Start with 10-20 quality products**
   - Don't add 100 products at once
   - Quality over quantity

2. **Update prices weekly**
   - Set a recurring calendar reminder
   - Check top 10 products first

3. **Rotate featured products monthly**
   - Change `featured` column to highlight new items
   - Keep content fresh

4. **Track performance**
   - Add a "clicks" column (manual tracking)
   - Note which products convert best

5. **Seasonal updates**
   - Holiday gifts → `gift-ideas, trending`
   - Back to school → `electronics, trending`

### Sheet Organization

1. **Use multiple sheets**
   - "Products" = Active products
   - "Archive" = Old/seasonal products
   - "Ideas" = Products to add later

2. **Add helper columns**
   - "Last Updated" = Track changes
   - "Notes" = Internal comments
   - "Performance" = Click tracking

3. **Version control**
   - File → Version history
   - Restore previous versions if needed

---

## 🆘 Need Help?

### Check These First:

1. [Troubleshooting section](#troubleshooting) above
2. Browser console (F12) for error messages
3. `/api/products` endpoint to see API response
4. Google Sheets publish settings

### Common Questions:

**Q: Can I use multiple sheets?**
A: Yes! Create multiple sheets and change `sheetName` in config for each.

**Q: How many products can I have?**
A: Unlimited! But performance is best with under 500 products.

**Q: Can I add custom fields?**
A: Yes, but they won't display unless you modify the code.

**Q: Do I need a Google account?**
A: Yes, to create and edit Google Sheets.

**Q: Is my data private?**
A: Your published sheet is public (read-only). Don't include sensitive data.

---

## 📱 Quick Reference

### Must Remember:

1. ✅ Publish sheet to web (File → Share → Publish)
2. ✅ Use exact category names (lowercase, hyphenated)
3. ✅ ASIN must be exactly 10 characters
4. ✅ Price is number only (no $ symbol)
5. ✅ Cache updates every 5 minutes
6. ✅ Required columns: id, title, description, price, image, category, asin

### Sheet ID Location:

```
https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit
```

### Config File Location:

```
src/lib/googleSheets.ts
```

---

**🎉 Congratulations!** You now have a fully dynamic Amazon affiliate site powered by Google Sheets. Update your products anytime, anywhere, from any device with internet access!

**Last updated:** November 2025
