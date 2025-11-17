# Quick Reference Card

## 🔍 Check if Google Sheets is Working

**Visit:** `/admin`

**Look for:**
- ✅ **GREEN box** = Google Sheets working (unlimited products)
- ⚠️ **YELLOW box** = Fallback data (16 products only)

---

## 📊 Add Products (No Limit!)

1. Open your Google Sheet
2. Add rows with product data
3. Visit `/admin` on your site
4. Click **"Clear Cache & Refresh"**
5. ✅ Done! Products appear instantly

**Columns needed:**
- `id`, `title`, `description`, `price`, `image`, `category`, `asin`, `saves`, `featured`, `trending`

**Optional:**
- `rating`, `reviewcount`, `amazonlink` (custom affiliate link)

---

## 🎨 Customize Navigation/Categories

**File to edit:** `src/data/products.ts`

```typescript
export const categories = [
  { id: "electronics", name: "Electronics", icon: "🔌" },
  // ADD YOUR CATEGORY HERE:
  { id: "sports", name: "Sports & Outdoors", icon: "⚽" },
];
```

**Use in Google Sheet:**
```
sports
```

**Full guide:** See `CUSTOMIZE-CATEGORIES.md`

---

## 🔧 Troubleshoot "16 Products" Issue

**If you see only 16 products:**

1. Check `/admin` → Should see yellow warning box
2. Click **"View CSV Data"** → See raw Google Sheets output
3. Verify sheet is **public** and **published**:
   - Share → "Anyone with link can view"
   - File → Publish to web → CSV
4. Click **"Clear Cache & Refresh"**
5. ✅ Should see green box with all products

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `src/data/products.ts` | Define categories |
| `src/components/Header.tsx` | Add category icons |
| `src/lib/googleSheets.ts` | Google Sheet configuration |
| `CUSTOMIZE-CATEGORIES.md` | Full category guide |
| `DEPLOY-INSTRUCTIONS.md` | How to deploy |

---

## 🚀 Deploy to Netlify

**Quick:** Push to GitHub → Netlify auto-deploys

**Check deployment:**
- Visit https://new-amazon-repo.netlify.app/admin
- Verify green data source box
- Test with your products

---

## ✅ Quick Checklist

Before asking "Why only 16 products?":

- [ ] Visited `/admin`
- [ ] Checked data source indicator (green vs yellow)
- [ ] Clicked "View CSV Data" to see raw output
- [ ] Verified Google Sheet is public and published
- [ ] Clicked "Clear Cache & Refresh"
- [ ] Hard refreshed browser (Ctrl+Shift+R)

**Still stuck?** Check console for errors (F12 → Console)

---

## 🎯 Common Tasks

### Add a new category
1. Edit `src/data/products.ts`
2. Add to `categories` array
3. Redeploy

### Force refresh products
1. Go to `/admin`
2. Click "Clear Cache & Refresh"

### See raw Google Sheets data
1. Go to `/admin`
2. Click "View CSV Data"

### Add custom affiliate link
In Google Sheet, `amazonlink` column:
```
https://amzn.to/abc123
```

---

**Remember:** There is NO 16-product limit! If you see 16 products, it's because Google Sheets isn't loading correctly. Check the admin dashboard!
