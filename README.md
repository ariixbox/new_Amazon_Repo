# BestDeals - Amazon Affiliate Site

A modern, feature-rich Amazon affiliate website with **Google Sheets backend** for easy content management, product comparisons, blog articles, and more.

## 🎉 NEW: Google Sheets Backend!

**Update products without coding!** All product data is now managed through Google Sheets.

✅ Edit products in a spreadsheet (no code required)
✅ Update prices, descriptions, images instantly
✅ Add/remove products with a few clicks
✅ Changes sync automatically to your site

👉 **[Quick Start Guide](./GOOGLE-SHEETS-QUICKSTART.md)**
👉 **[Full Setup Documentation](./GOOGLE-SHEETS-SETUP.md)**

## 🌟 Features

- **Google Sheets Backend**: Edit all products in a spreadsheet - no coding required!
- **Product Catalog**: Organized by categories (Electronics, Home & Kitchen, Toys, Trending Products, Gift Ideas)
- **Advanced Filtering**: Filter products by category and price range
- **Product Cards**: Beautiful cards with ratings, reviews, saves, and trending badges
- **Product Comparison**: Compare up to 4 products side-by-side
- **Blog Section**: Product reviews and buying guides
- **Newsletter Signup**: Email capture for building your audience
- **Search Functionality**: Search bar in header (UI ready for backend integration)
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Multi-Language Support**: English, Spanish, and Hebrew with auto-detection
- **Automatic Affiliate Links**: All Amazon links include your affiliate tag

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
bun install

# Run development server
bun run dev

# Build for production
bun run build

# Start production server
bun run start
```

Visit `http://localhost:3000` to see your site.

## 📊 Google Sheets Setup (Recommended)

The easiest way to manage your products is through Google Sheets!

### Quick Setup:

1. **Import the template:**
   - Go to [Google Sheets](https://sheets.google.com)
   - File → Import → Upload `google-sheets-template.csv`

2. **Publish your sheet:**
   - File → Share → Publish to web
   - Choose "Entire Document" or "Products" sheet
   - Format: "Web page"
   - Click "Publish"

3. **Get your Sheet ID:**
   - Copy from URL: `docs.google.com/spreadsheets/d/`**YOUR_SHEET_ID**`/edit`

4. **Configure your site:**
   - Open `src/lib/googleSheets.ts`
   - Replace `sheetId` with your Sheet ID

5. **Deploy and you're done!** 🎉

**📖 Full Documentation:**
- [Quick Start Guide](./GOOGLE-SHEETS-QUICKSTART.md) - 5-minute setup
- [Complete Setup Guide](./GOOGLE-SHEETS-SETUP.md) - Detailed documentation

### Google Sheet Columns:

| Column | Required | Example |
|--------|----------|---------|
| id | ✅ | `1` or `prod-001` |
| title | ✅ | `Sony WH-1000XM5 Headphones` |
| description | ✅ | `Noise cancelling...` |
| price | ✅ | `399.99` (no $ symbol) |
| image | ✅ | `https://images.unsplash.com/...` |
| category | ✅ | `electronics, trending` |
| asin | ✅ | `B0BXNX1HFG` |
| saves | No | `245` |
| featured | No | `TRUE` or `FALSE` |
| trending | No | `TRUE` or `FALSE` |
| rating | No | `4.8` |
| reviewcount | No | `1234` |

**Valid categories:** `electronics`, `home-kitchen`, `toys`, `trending`, `gift-ideas`

---

## 📝 Alternative: Manual Update Guide (Legacy)

### Method 1: Direct File Editing (Recommended)

1. **Update Products**:
   - Open `src/data/products.ts`
   - Edit existing products or add new ones
   - Update prices, descriptions, Amazon links, ratings
   - Mark trending products with `trending: true`
   - Mark featured products with `featured: true`

2. **Product Object Format**:
```typescript
{
  id: "unique-id",
  title: "Product Name",
  description: "Detailed description...",
  price: 99.99,
  image: "https://images.unsplash.com/...",
  category: ["electronics", "trending"],
  amazonLink: "YOUR_AFFILIATE_LINK_HERE",
  saves: 245,
  featured: true,
  trending: true,
  rating: 4.8,
  reviewCount: 1523
}
```

3. **Update Blog Posts**:
   - Open `src/data/blog.ts`
   - Add new articles or update existing ones
   - Update dates to current month
   - Use high-quality images from Unsplash

4. **Categories**:
   - `electronics` - Tech gadgets and devices
   - `home-kitchen` - Home appliances and kitchen tools
   - `toys` - Toys and games
   - `trending` - Hot products right now
   - `gift-ideas` - Great gift options

### Monthly Checklist

- [ ] Check Amazon for current best sellers
- [ ] Update prices to match Amazon
- [ ] Replace with fresh affiliate links
- [ ] Update ratings and review counts
- [ ] Mark 5-8 products as `trending: true`
- [ ] Add 3-5 new products per category
- [ ] Remove outdated products
- [ ] Write 1-2 new blog posts
- [ ] Update blog post dates

## 🎨 Customization

### Change Site Name & Branding

Edit `src/components/Header.tsx` and `src/components/Footer.tsx`:
```typescript
<h1>BestDeals</h1> // Change to your site name
```

### Update Colors

The site uses an orange theme. To change colors, edit `src/components/ui/button.tsx` and search for `orange-500`, `orange-600`, etc.

### Modify Categories

Edit `src/data/products.ts`:
```typescript
export const categories = [
  { id: "your-category", name: "Category Name", icon: "🎯" }
];
```

## 📸 Finding Product Images

1. **Unsplash**: Free high-quality images
   - Visit [unsplash.com](https://unsplash.com)
   - Search for product type
   - Copy image URL

2. **Amazon Images**:
   - Right-click product image on Amazon
   - Copy image address
   - Use in `image` field

## 🔗 Setting Up Amazon Affiliate Links

1. Sign up for [Amazon Associates](https://affiliate-program.amazon.com/)
2. Get your affiliate ID
3. Create affiliate links for each product
4. Replace `YOUR_AFFILIATE_LINK` in products.ts with real links

### Affiliate Link Format:
```
https://www.amazon.com/dp/PRODUCT_ID?tag=YOUR_AFFILIATE_TAG
```

## 📱 Pages

- `/` - Homepage with all products
- `/category/[slug]` - Category pages
- `/blog` - Blog listing
- `/comparison` - Product comparison tool
- `/update-products` - Update system guide

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Package Manager**: Bun
- **Deployment**: Netlify-ready

## 📦 Deployment

### Deploy to Netlify

```bash
# Build command
bun run build

# Publish directory
.next
```

The site is pre-configured for Netlify deployment with `netlify.toml`.

### Environment Variables

Add your environment variables in Netlify dashboard if needed:
- `NEXT_PUBLIC_SITE_URL` - Your site URL
- `NEWSLETTER_API_KEY` - If using email service

## 🔄 Automation Ideas

To automate monthly updates, consider:

1. **Rainforest API**: Get real-time Amazon data
2. **Amazon Product Advertising API**: Official Amazon API (requires approval)
3. **Scraping Service**: Use services like ScraperAPI
4. **CMS Integration**: Connect Contentful or Sanity for easier editing

## 📊 Analytics

Add Google Analytics or Plausible Analytics:

Edit `src/app/layout.tsx` and add tracking script in `<head>`.

## 🎯 SEO Optimization

1. Update metadata in each page
2. Add meta descriptions for products
3. Use proper heading hierarchy
4. Add alt text to images
5. Create sitemap.xml
6. Submit to Google Search Console

## 💡 Tips for Success

1. **Update Regularly**: Fresh content ranks better
2. **Quality Over Quantity**: Choose products with good reviews
3. **Write Detailed Reviews**: Help users make decisions
4. **Build Email List**: Newsletter subscribers = repeat visitors
5. **Track Performance**: See which products convert best
6. **Mobile-First**: Most users shop on mobile

## 📧 Support

For questions or issues:
- Visit `/update-products` page for detailed instructions
- Check Next.js documentation
- Review Amazon Associates guidelines

## 📄 License

This project is for commercial use. Make sure to comply with Amazon Associates Program Operating Agreement.

## ⚠️ Important Notes

- Always include affiliate disclosure (already in footer)
- Update prices regularly - they change on Amazon
- Don't guarantee prices or availability
- Follow FTC guidelines for affiliate marketing
- Keep Amazon affiliate account active

---

**Built with ❤️ for affiliate marketers**
