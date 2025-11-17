# Configuration Guide

## Adding Unlimited Products

Your site has **NO LIMIT** on the number of products. The "16 products" issue means you're seeing the fallback data instead of your Google Sheets data.

### Why You See Only 16 Products

1. **Fallback Data**: The code has 16 hardcoded fallback products in case Google Sheets fails
2. **Cache**: Your data might be cached from before you added more products
3. **Google Sheets Issue**: The CSV export might be truncating data

### How to Fix

1. **Go to Admin Dashboard**: Visit `/admin` on your site
2. **Click "Refresh Products"**: This clears the cache
3. **Check Product Count**: See if it matches your Google Sheet
4. **Verify CSV Export**: Click "View CSV Data" to see raw data from Google Sheets

### Google Sheets Setup Checklist

- [ ] Sheet is published to web (File > Share > Publish to web)
- [ ] Sheet is publicly viewable (Share > Anyone with link can view)
- [ ] Column headers match exactly: `id`, `title`, `description`, `price`, `image`, `category`, `asin`, etc.
- [ ] No empty rows between products
- [ ] Categories are comma-separated (e.g., "electronics,trending")

---

## Customizing Navigation & Categories

### Where to Edit

Categories are defined in: `src/data/products.ts`

### Steps to Add/Edit Categories

1. **Edit the categories array** in `src/data/products.ts`:

```typescript
export const categories = [
  { id: "electronics", name: "Electronics", icon: "🔌" },
  { id: "home-kitchen", name: "Home & Kitchen", icon: "🏠" },
  { id: "toys", name: "Toys", icon: "🎮" },
  { id: "trending", name: "Trending Products", icon: "🔥" },
  { id: "gift-ideas", name: "Gift Ideas", icon: "🎁" },

  // ADD YOUR NEW CATEGORIES HERE:
  { id: "sports", name: "Sports & Outdoors", icon: "⚽" },
  { id: "beauty", name: "Beauty & Personal Care", icon: "💄" },
];
```

2. **Add icons in Header.tsx** at `src/components/Header.tsx`:

```typescript
const categoryIcons: Record<string, React.ReactNode> = {
  electronics: <Zap className="w-4 h-4" />,
  "home-kitchen": <Home className="w-4 h-4" />,
  toys: <Gamepad2 className="w-4 h-4" />,
  trending: <Sparkles className="w-4 h-4" />,
  "gift-ideas": <Gift className="w-4 h-4" />,

  // ADD YOUR NEW CATEGORY ICONS:
  sports: <Star className="w-4 h-4" />,  // Import Star from lucide-react
  beauty: <Heart className="w-4 h-4" />,  // Import Heart from lucide-react
};
```

3. **Add translations** (optional) in `src/lib/translations.ts`

4. **Use in Google Sheet**: In your sheet's `category` column, use the category IDs:
   - `electronics`
   - `home-kitchen`
   - `sports,trending` (for multiple categories)

### Important Notes

- Category IDs must be lowercase with hyphens (e.g., `home-kitchen`)
- Navigation automatically updates when you add categories
- Products can belong to multiple categories (comma-separated in sheet)
- Changes require redeploying to Netlify

---

## Quick Troubleshooting

**Q: Products not showing up?**
- Go to `/admin` and click "Refresh Products"
- Verify Google Sheet is public
- Check CSV data shows your products

**Q: Categories not appearing?**
- Make sure category ID in products matches category array
- Check spelling and case sensitivity
- Redeploy to Netlify after changes

**Q: Navigation not updating?**
- Edit `src/data/products.ts` categories array
- Add icons in `src/components/Header.tsx`
- Push changes and redeploy
