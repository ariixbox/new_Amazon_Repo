# How to Customize Categories & Navigation

This guide shows you how to add, edit, or remove categories in your navigation bar.

## Quick Overview

Categories are defined in **one file** and automatically appear in:
- Navigation bar (Header)
- Category filter buttons on homepage
- Category pages
- Footer links

## Step-by-Step Instructions

### 1. Edit the Categories Array

Open: `src/data/products.ts`

Find the `categories` array (around line 240):

```typescript
export const categories = [
  { id: "electronics", name: "Electronics", icon: "🔌" },
  { id: "home-kitchen", name: "Home & Kitchen", icon: "🏠" },
  { id: "toys", name: "Toys", icon: "🎮" },
  { id: "trending", name: "Trending Products", icon: "🔥" },
  { id: "gift-ideas", name: "Gift Ideas", icon: "🎁" }
];
```

**To add a category**, add a new line:

```typescript
export const categories = [
  { id: "electronics", name: "Electronics", icon: "🔌" },
  { id: "home-kitchen", name: "Home & Kitchen", icon: "🏠" },
  { id: "toys", name: "Toys", icon: "🎮" },
  { id: "trending", name: "Trending Products", icon: "🔥" },
  { id: "gift-ideas", name: "Gift Ideas", icon: "🎁" },

  // NEW CATEGORIES:
  { id: "sports", name: "Sports & Outdoors", icon: "⚽" },
  { id: "beauty", name: "Beauty & Personal Care", icon: "💄" },
  { id: "books", name: "Books & Media", icon: "📚" },
];
```

**Important Rules:**
- `id` must be lowercase with hyphens (e.g., `sports`, `home-kitchen`)
- `name` is what users see
- `icon` can be any emoji

### 2. Add Lucide Icons (Optional)

If you want to use Lucide icons instead of emojis:

Open: `src/components/Header.tsx`

Find the `categoryIcons` object (around line 24):

```typescript
import { Dumbbell, Sparkles, BookOpen } from "lucide-react"; // Add new imports

const categoryIcons: Record<string, React.ReactNode> = {
  electronics: <Zap className="w-4 h-4" />,
  "home-kitchen": <Home className="w-4 h-4" />,
  toys: <Gamepad2 className="w-4 h-4" />,
  trending: <Sparkles className="w-4 h-4" />,
  "gift-ideas": <Gift className="w-4 h-4" />,

  // ADD YOUR NEW ICONS:
  sports: <Dumbbell className="w-4 h-4" />,
  beauty: <Sparkles className="w-4 h-4" />,
  books: <BookOpen className="w-4 h-4" />,
};
```

Browse Lucide icons: https://lucide.dev/icons/

### 3. Add Translations (Optional)

If you're using multiple languages, add translations:

Open: `src/lib/translations.ts`

Add entries for your new categories in each language.

### 4. Update Your Google Sheet

In your Google Sheet, use the category IDs in the `category` column:

| category |
|----------|
| sports |
| beauty,trending |
| books,gift-ideas |

**Note:** Products can have multiple categories (comma-separated).

### 5. Test Locally

```bash
cd amazon-affiliate-site
bun run dev
```

Visit: `http://localhost:3000`

Check:
- ✅ New categories appear in navigation
- ✅ Category pages work (`/category/sports`)
- ✅ Products show up in correct categories

### 6. Deploy

Commit and push your changes:

```bash
git add .
git commit -m "Add new categories: sports, beauty, books"
git push
```

Netlify will automatically redeploy your site.

## Common Questions

### How do I remove a category?

Just delete the line from the `categories` array. Products with that category will still work but won't appear in navigation.

### How do I rename a category?

Change the `name` field. Don't change the `id` unless you also update all products in your Google Sheet.

### How many categories can I have?

No limit! But keep it reasonable for good UX (5-10 recommended).

### Why isn't my new category showing products?

Make sure products in your Google Sheet use the exact category ID (e.g., `sports`, not `Sports`).

## Example: Adding "Pet Supplies" Category

1. **Edit `src/data/products.ts`:**
   ```typescript
   { id: "pet-supplies", name: "Pet Supplies", icon: "🐾" }
   ```

2. **Edit `src/components/Header.tsx`:**
   ```typescript
   import { PawPrint } from "lucide-react";

   const categoryIcons: Record<string, React.ReactNode> = {
     // ... existing categories ...
     "pet-supplies": <PawPrint className="w-4 h-4" />,
   };
   ```

3. **Update Google Sheet:**
   In the `category` column, use: `pet-supplies`

4. **Test and deploy!**

---

**Need Help?** Check the admin dashboard at `/admin` to see if products are loading correctly.
