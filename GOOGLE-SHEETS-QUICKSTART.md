# Google Sheets Quick Start Guide

## 🎯 Setup in 5 Minutes

### Step 1: Create Your Google Sheet

1. Go to **[Google Sheets](https://sheets.google.com)**
2. Click **File** → **Import**
3. Upload the `google-sheets-template.csv` file from this project
4. Or manually create a sheet with these columns:

```
id | title | description | price | image | category | asin | saves | featured | trending | rating | reviewcount
```

### Step 2: Publish Your Sheet

1. In your Google Sheet, click **File** → **Share** → **Publish to web**
2. Select **"Entire Document"** (or just the "Products" sheet)
3. Choose format: **"Web page"**
4. Click **"Publish"** and confirm
5. ✅ Your sheet is now publicly accessible!

### Step 3: Get Your Sheet ID

Look at your browser's address bar:

```
https://docs.google.com/spreadsheets/d/1AbC123XyZ_THIS_IS_YOUR_SHEET_ID/edit
```

Copy the part between `/d/` and `/edit` — that's your **Sheet ID**.

### Step 4: Configure Your Site

Open `src/lib/googleSheets.ts` in your project and paste your Sheet ID:

```typescript
export const GOOGLE_SHEET_CONFIG = {
  sheetId: '1AbC123XyZ_THIS_IS_YOUR_SHEET_ID',  // ← Paste here
  sheetName: 'Products',
  cacheDuration: 5 * 60 * 1000,
};
```

### Step 5: Test Locally

```bash
bun install
bun run dev
```

Visit `http://localhost:3000` — your products should load from Google Sheets! 🎉

### Step 6: Deploy

```bash
bun run build
```

Deploy to Netlify, Vercel, or your hosting platform.

---

## ✏️ How to Update Products

### Add a Product

1. Open your Google Sheet
2. Add a new row with product details
3. Make sure to fill all required columns:
   - ✅ id (unique)
   - ✅ title
   - ✅ description
   - ✅ price (number only, no $)
   - ✅ image (URL)
   - ✅ category (comma-separated)
   - ✅ asin (10 characters)
4. Save — done! ✨

### Update Price or Details

1. Find the product row
2. Edit any field
3. Save
4. Wait 5 minutes (cache refresh) or hard refresh browser

### Remove a Product

1. Delete the entire row
2. Product disappears from site automatically

---

## 📋 Column Reference

| Column | Required | Example | Notes |
|--------|----------|---------|-------|
| **id** | ✅ | `1`, `prod-001` | Must be unique |
| **title** | ✅ | `Sony WH-1000XM5` | Product name |
| **description** | ✅ | `Noise cancelling...` | Full description |
| **price** | ✅ | `399.99` | Number only (no $) |
| **image** | ✅ | `https://...` | Full image URL |
| **category** | ✅ | `electronics, trending` | Comma-separated |
| **asin** | ✅ | `B0BXNX1HFG` | Amazon ASIN |
| **saves** | No | `245` | Default: 0 |
| **featured** | No | `TRUE` or `FALSE` | Homepage featured |
| **trending** | No | `TRUE` or `FALSE` | Show 🔥 badge |
| **rating** | No | `4.7` | 1-5 rating |
| **reviewcount** | No | `12453` | Number of reviews |

---

## 🎨 Valid Categories

Use these exact names (lowercase, hyphenated):

- ✅ `electronics`
- ✅ `home-kitchen`
- ✅ `toys`
- ✅ `trending`
- ✅ `gift-ideas`

**Multiple categories:**
```
electronics, trending, gift-ideas
```

---

## 🐛 Troubleshooting

### Products Not Loading

1. ✅ Check sheet is **published to web** (File → Share → Publish)
2. ✅ Verify Sheet ID is correct in `src/lib/googleSheets.ts`
3. ✅ Make sure sheet tab is named **"Products"**
4. ✅ Wait 5 minutes for cache to clear
5. ✅ Hard refresh browser (Ctrl+Shift+R)

### Error Message on Site

1. ✅ Open browser console (F12) to see error details
2. ✅ Visit `http://localhost:3000/api/products` to test API
3. ✅ Check all required columns exist in sheet
4. ✅ Verify column headers match exactly

### Images Not Showing

1. ✅ Use full HTTPS URLs (not HTTP)
2. ✅ Test image URL in browser first
3. ✅ Use Unsplash or Amazon image URLs

---

## 📚 Full Documentation

For detailed setup, advanced features, and troubleshooting:

👉 **[Read GOOGLE-SHEETS-SETUP.md](./GOOGLE-SHEETS-SETUP.md)**

---

## 🎉 That's It!

You now have a dynamic Amazon affiliate site powered by Google Sheets.

**Update products anytime, anywhere — no coding required!** ✨
