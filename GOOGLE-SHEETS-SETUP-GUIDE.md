# Google Sheets Setup - Complete Guide

Set up Google Sheets to manage all your products **without touching code**!

---

## 🎯 What You'll Achieve

After this guide, you'll be able to:
- ✅ Add new products in a spreadsheet
- ✅ Update prices instantly
- ✅ Change product descriptions
- ✅ Mark products as featured/trending
- ✅ Upload product images
- ✅ Update from any device (phone, tablet, computer)

**No coding required!** Just edit a spreadsheet. 🎉

---

## 📋 What You Need

- [x] Google account (free)
- [x] 10 minutes of time
- [x] Your project code ready

---

## 🚀 Step-by-Step Setup

### **Step 1: Create Your Google Sheet**

#### Option A: Import Template (Recommended)

1. **Download the template file**
   - Find `google-sheets-template.csv` in your project folder
   - This has all 16 sample products pre-filled

2. **Go to Google Sheets**
   - Visit [sheets.google.com](https://sheets.google.com)
   - Sign in with your Google account

3. **Import the template**
   - Click **File** → **Import**
   - Click **Upload** tab
   - Drag `google-sheets-template.csv` or click **Browse**
   - Choose **"Replace spreadsheet"** or **"Create new spreadsheet"**
   - Click **"Import data"**

4. **Rename your sheet**
   - Click on "Untitled spreadsheet" at top
   - Name it: `Amazon Affiliate Products`
   - Make sure the tab is named **"Products"** (check bottom left)

✅ **Done!** Your sheet is ready with 16 products.

#### Option B: Create From Scratch

1. **Create new sheet**
   - Go to [sheets.google.com](https://sheets.google.com)
   - Click **+ Blank**

2. **Name it**
   - Click "Untitled spreadsheet"
   - Enter: `Amazon Affiliate Products`

3. **Rename the tab**
   - Right-click "Sheet1" at bottom
   - Click **Rename**
   - Enter: `Products`

4. **Add headers in Row 1:**
   ```
   id | title | description | price | image | category | asin | saves | featured | trending | rating | reviewcount
   ```

5. **Add your products starting from Row 2**
   - See the "Product Fields" section below for what to put in each column

---

### **Step 2: Understand the Columns**

Here's what each column means:

| Column | Required? | Example | What It Does |
|--------|-----------|---------|--------------|
| **id** | ✅ Yes | `1` or `prod-001` | Unique ID for each product (must be different for each row) |
| **title** | ✅ Yes | `Sony WH-1000XM5 Headphones` | Product name shown on site |
| **description** | ✅ Yes | `Industry-leading noise cancellation...` | Full product description |
| **price** | ✅ Yes | `399.99` | Price (number only, no $ symbol) |
| **image** | ✅ Yes | `https://images.unsplash.com/...` | Full URL to product image |
| **category** | ✅ Yes | `electronics, trending` | Categories (comma-separated) |
| **asin** | ✅ Yes | `B0BXNX1HFG` | Amazon ASIN (10 characters) |
| **saves** | No | `245` | Number of saves (for social proof) |
| **featured** | No | `TRUE` or `FALSE` | Show on homepage featured section? |
| **trending** | No | `TRUE` or `FALSE` | Show trending 🔥 badge? |
| **rating** | No | `4.7` | Star rating (1-5) |
| **reviewcount** | No | `12453` | Number of reviews |

#### Valid Categories

Use these exact names (lowercase, with hyphens):
- `electronics`
- `home-kitchen`
- `toys`
- `trending`
- `gift-ideas`

**Multiple categories:** Separate with commas
```
electronics, trending, gift-ideas
```

#### Where to Get Images

**Option 1: Unsplash (Free)**
1. Go to [unsplash.com](https://unsplash.com)
2. Search for product type
3. Click image → Right-click → Copy image address
4. Paste URL in `image` column

**Option 2: Amazon Product Images**
1. Go to product on Amazon
2. Right-click product image
3. Copy image address
4. Paste URL in `image` column

**Option 3: Your Own Hosting**
- Upload to your server
- Use full URL: `https://yourdomain.com/images/product.jpg`

#### How to Find ASINs

**Method 1: From URL**
```
Amazon URL: https://www.amazon.com/dp/B0BXNX1HFG/
                                      ^^^^^^^^^^
                                      This is the ASIN
```

**Method 2: Product Information Section**
- Scroll down to "Product Information" on Amazon
- Look for "ASIN: B0BXNX1HFG"

---

### **Step 3: Add Your Products**

Let's add your first product as an example:

**Example Product:**
```
id: 1
title: Sony WH-1000XM5 Wireless Noise Cancelling Headphones
description: Industry-leading noise cancellation with two processors controlling 8 microphones. Up to 30-hour battery life with quick charging.
price: 399.99
image: https://images.unsplash.com/photo-1505740420928-5e560c06d30e
category: electronics, trending
asin: B0BXNX1HFG
saves: 245
featured: TRUE
trending: TRUE
rating: 4.7
reviewcount: 12453
```

**In your spreadsheet:**

| id | title | description | price | image | category | asin | saves | featured | trending | rating | reviewcount |
|----|-------|-------------|-------|-------|----------|------|-------|----------|----------|--------|-------------|
| 1 | Sony WH-1000XM5 Wireless Noise Cancelling Headphones | Industry-leading noise cancellation... | 399.99 | https://images.unsplash.com/... | electronics, trending | B0BXNX1HFG | 245 | TRUE | TRUE | 4.7 | 12453 |

**Tips:**
- ✅ Use data validation for TRUE/FALSE columns
- ✅ Format price column as number (2 decimals)
- ✅ Freeze header row: **View** → **Freeze** → **1 row**
- ✅ Use colors to organize (featured = blue, trending = orange)

---

### **Step 4: Publish Your Sheet to Web**

This makes your sheet accessible to your website.

**Important:** The sheet will be **read-only** to the public. Only you can edit it.

1. **Click File → Share → Publish to web**

2. **Configure settings:**
   - **Link:** Choose **"Entire Document"** or **"Products" sheet**
   - **Embed:** Choose **"Web page"**

3. **Click "Publish"**

4. **Confirm:** Click **"OK"** on the confirmation dialog

5. ✅ **Sheet is now published!**

**Security Note:**
- ✅ Your sheet is READ-ONLY to others
- ✅ Only the data is public (not editing rights)
- ❌ Don't put sensitive information (passwords, API keys)
- ✅ Product information is safe to share

---

### **Step 5: Get Your Sheet ID**

Your Sheet ID is needed to connect your site to the sheet.

1. **Look at your browser's address bar**

   You'll see a URL like:
   ```
   https://docs.google.com/spreadsheets/d/1AbC123XyZ_THIS_IS_YOUR_SHEET_ID/edit
   ```

2. **Copy the Sheet ID**
   - The part between `/d/` and `/edit`
   - Example: `1AbC123XyZ_THIS_IS_YOUR_SHEET_ID`

3. **Save it somewhere** (you'll need it in the next step)

**Example:**
```
URL: https://docs.google.com/spreadsheets/d/1g8F6xYvZ2hK9mL4nP7qR5sT/edit#gid=0

Sheet ID: 1g8F6xYvZ2hK9mL4nP7qR5sT
          ^^^^^^^^^^^^^^^^^^^^^^^^
          Copy this part
```

---

### **Step 6: Update Your Site Configuration**

Now connect your site to your Google Sheet.

1. **Open your code editor** (VS Code, etc.)

2. **Navigate to the file:**
   ```
   amazon-affiliate-site/src/lib/googleSheets.ts
   ```

3. **Find this section:**
   ```typescript
   export const GOOGLE_SHEET_CONFIG = {
     sheetId: '1g8F6xYvZ_example_REPLACE_WITH_YOUR_SHEET_ID',
     sheetName: 'Products',
     cacheDuration: 5 * 60 * 1000,
   };
   ```

4. **Replace the sheetId with YOUR Sheet ID:**
   ```typescript
   export const GOOGLE_SHEET_CONFIG = {
     sheetId: '1AbC123XyZ_YOUR_ACTUAL_SHEET_ID_HERE',  // ← Paste your ID here
     sheetName: 'Products',  // ← Make sure this matches your tab name
     cacheDuration: 5 * 60 * 1000,  // 5 minutes cache
   };
   ```

5. **Save the file** (Ctrl+S or Cmd+S)

✅ **Configuration complete!**

---

### **Step 7: Test Locally**

Before deploying, test that it works:

1. **Install dependencies** (if not done)
   ```bash
   cd amazon-affiliate-site
   bun install
   ```

2. **Start development server**
   ```bash
   bun run dev
   ```

3. **Open browser**
   - Visit: `http://localhost:3000`

4. **Check products load**
   - You should see your products from Google Sheets
   - Look for the loading spinner first
   - Then products appear

5. **Check admin dashboard**
   - Visit: `http://localhost:3000/admin`
   - Should show "Sheet Configured" ✅
   - Should show "Data Loaded" ✅
   - Should show your product count

6. **Test API endpoint**
   - Visit: `http://localhost:3000/api/products`
   - Should show JSON with your products

**Troubleshooting:**

If products don't load:
- ✅ Check Sheet ID is correct
- ✅ Verify sheet is published to web
- ✅ Check sheet tab is named "Products" (case-sensitive)
- ✅ Wait 5 minutes for cache
- ✅ Check browser console (F12) for errors

---

### **Step 8: Deploy to Your Netlify**

Now that it works locally, deploy to production:

1. **Commit your changes**
   ```bash
   git add .
   git commit -m "Connected Google Sheets backend"
   ```

2. **Push to GitHub**
   ```bash
   git push origin main
   ```

3. **Netlify auto-deploys** (if you set up continuous deployment)
   - Or manually deploy via Netlify CLI
   - Or manually deploy via Netlify UI

4. **Wait 2-3 minutes for build**

5. **Visit your live site**
   - Check products load from your Google Sheet
   - Test all features

6. **Check admin dashboard**
   - Visit: `https://yoursite.netlify.app/admin`
   - Verify connection status

✅ **Your site is now powered by Google Sheets!** 🎉

---

## 🎨 Managing Your Products

### Adding a New Product

1. Open your Google Sheet
2. Add a new row at the bottom
3. Fill in all required columns
4. Save (auto-saves)
5. Wait 5 minutes (or hard refresh site)
6. New product appears! ✨

### Updating Prices

1. Find the product row
2. Change the `price` column
3. Save
4. Wait 5 minutes
5. New price shows on site

### Removing Products

1. Delete the entire row
2. Products below shift up
3. Save
4. Wait 5 minutes
5. Product disappears from site

### Bulk Updates

**Find & Replace:**
1. Press Ctrl+H (or Cmd+H)
2. Find: `old text`
3. Replace: `new text`
4. Click "Replace all"

**Import from CSV:**
1. File → Import
2. Upload your CSV
3. Choose "Append to current sheet" or "Replace"

**Copy from Excel:**
1. Select cells in Excel
2. Ctrl+C (copy)
3. Click cell in Google Sheets
4. Ctrl+V (paste)

---

## ⚙️ Advanced Configuration

### Change Cache Duration

Products are cached for 5 minutes by default.

**To change:**
```typescript
// In src/lib/googleSheets.ts
export const GOOGLE_SHEET_CONFIG = {
  sheetId: 'your_sheet_id',
  sheetName: 'Products',
  cacheDuration: 10 * 60 * 1000,  // 10 minutes
};
```

**Options:**
- `5 * 60 * 1000` = 5 minutes (recommended)
- `1 * 60 * 1000` = 1 minute (fast updates, more API calls)
- `15 * 60 * 1000` = 15 minutes (slower updates, fewer API calls)

### Multiple Sheets

To use different sheets for different data:

1. **Create multiple tabs in Google Sheets:**
   - Products (main products)
   - Seasonal (holiday products)
   - Archive (old products)

2. **Update sheetName in config:**
   ```typescript
   sheetName: 'Products',  // or 'Seasonal', 'Archive', etc.
   ```

3. **Redeploy**

### Add Helper Columns

You can add extra columns that won't affect the site:

- **Last Updated** - Track when you modified
- **Notes** - Internal comments
- **Performance** - Track clicks (manual)
- **Status** - Active/Inactive

The site only reads the columns it needs and ignores extras.

---

## 🛠️ Pro Tips

### Tip 1: Use Data Validation

For TRUE/FALSE columns:

1. Select column (e.g., `featured`)
2. **Data** → **Data validation**
3. **Criteria:** List of items
4. Enter: `TRUE, FALSE`
5. Click **Save**

Now you get a dropdown instead of typing!

### Tip 2: Conditional Formatting

Color-code rows:

1. Select rows
2. **Format** → **Conditional formatting**
3. **Format rules:**
   - If `featured` = `TRUE` → Blue background
   - If `trending` = `TRUE` → Orange background

### Tip 3: Freeze Header Row

Keep headers visible while scrolling:

1. Click on Row 1
2. **View** → **Freeze** → **1 row**

### Tip 4: Protect Columns

Prevent accidental edits to IDs:

1. Select `id` column
2. **Data** → **Protect sheets and ranges**
3. Set permissions
4. Click **Done**

### Tip 5: Version History

Track changes and restore previous versions:

1. **File** → **Version history** → **See version history**
2. Browse all changes
3. Click to restore any version

### Tip 6: Collaborate

Share editing access with team:

1. Click **Share** button (top right)
2. Enter email addresses
3. Choose **Editor** permission
4. Click **Send**

Now multiple people can edit!

---

## 📊 Sheet Organization

### Recommended Structure

**Main Sheet:**
```
Products (published, used by site)
```

**Additional Tabs (optional):**
```
Archive (old products)
Ideas (products to add)
Seasonal (holiday products)
Stats (track performance)
```

### Color Coding

Use colors to organize:

- 🔵 **Blue** = Featured products
- 🟠 **Orange** = Trending products
- ⚪ **Gray** = Out of stock
- 🟢 **Green** = New this month
- 🔴 **Red** = Needs update

---

## 🐛 Troubleshooting

### Products Not Showing

**Check:**
1. ✅ Sheet is published to web (File → Share → Publish)
2. ✅ Sheet ID is correct in `googleSheets.ts`
3. ✅ Sheet tab is named "Products" exactly
4. ✅ Header row is in Row 1
5. ✅ Data starts in Row 2
6. ✅ No empty rows between products

**Test:**
- Visit `/admin` page - shows connection status
- Visit `/api/products` - shows API response
- Check browser console (F12) for errors

### Images Not Loading

**Fix:**
1. ✅ Use full HTTPS URLs (not HTTP)
2. ✅ Test image URL in browser first
3. ✅ Use Unsplash or Amazon images
4. ✅ No quotes around URLs
5. ✅ Images are publicly accessible

### Categories Don't Work

**Fix:**
1. ✅ Use exact category names (lowercase, hyphenated)
2. ✅ Valid: `electronics, home-kitchen, toys, trending, gift-ideas`
3. ✅ Separate multiple with commas
4. ✅ No extra spaces

### Products Show But Missing Data

**Fix:**
1. ✅ Check required fields are filled
2. ✅ Remove empty rows
3. ✅ `price` must be number (no $)
4. ✅ `rating` must be 1-5
5. ✅ TRUE/FALSE must be uppercase

### Cache Not Updating

**Force refresh:**
1. Hard refresh browser: Ctrl+Shift+R (or Cmd+Shift+R)
2. Or wait 5 minutes
3. Or restart dev server
4. Or clear site cache

---

## ✅ Checklist

Before going live:

- [ ] Google Sheet created
- [ ] All required columns present
- [ ] At least 10 products added
- [ ] Sheet published to web
- [ ] Sheet ID updated in code
- [ ] Tested locally (http://localhost:3000)
- [ ] Admin dashboard shows "Connected" (/admin)
- [ ] API endpoint returns products (/api/products)
- [ ] Deployed to Netlify
- [ ] Live site loads products
- [ ] Images display correctly
- [ ] Affiliate links work
- [ ] Mobile view looks good

---

## 📞 Need Help?

**Documentation:**
- `GOOGLE-SHEETS-QUICKSTART.md` - Quick start
- `GOOGLE-SHEETS-SETUP.md` - Full guide with troubleshooting
- `README.md` - Project overview

**Test Pages:**
- `/admin` - Connection status
- `/api/products` - API test
- Homepage - Product display

**Common Issues:**
- [Publishing issues](#step-4-publish-your-sheet-to-web)
- [Sheet ID help](#step-5-get-your-sheet-id)
- [Troubleshooting](#-troubleshooting)

---

## 🎉 You're Done!

**What you can now do:**

✅ Add products in Google Sheets (no code!)
✅ Update prices instantly
✅ Change descriptions easily
✅ Mark featured/trending products
✅ Upload new images
✅ Remove old products
✅ Edit from any device

**Your workflow:**
```
Edit Google Sheet → Save → Wait 5 min → Changes live! ✨
```

**No deployment needed for updates!** 🚀

---

**Next:** Deploy to your Netlify account using `DEPLOY-TO-YOUR-NETLIFY.md`
