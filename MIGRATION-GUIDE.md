# Migration Guide: From Hardcoded Products to Google Sheets

This guide helps you migrate your existing Amazon affiliate site from hardcoded product data to a Google Sheets backend.

## 🎯 Why Migrate to Google Sheets?

**Before (Hardcoded):**
- ❌ Edit TypeScript files manually
- ❌ Rebuild and redeploy for every change
- ❌ Requires technical knowledge
- ❌ Risk of syntax errors
- ❌ Difficult for non-technical team members

**After (Google Sheets):**
- ✅ Edit products in a spreadsheet
- ✅ Changes appear automatically (5-minute cache)
- ✅ No coding required
- ✅ No syntax errors
- ✅ Anyone can update content
- ✅ Edit from any device with internet

---

## 📋 Migration Checklist

- [ ] Create Google Sheet with product data
- [ ] Publish sheet to web
- [ ] Get Sheet ID
- [ ] Update configuration
- [ ] Test locally
- [ ] Deploy to production
- [ ] Verify all products load correctly
- [ ] Remove old hardcoded data (optional)

---

## 🚀 Step-by-Step Migration

### Step 1: Export Your Current Products

Your existing products are in `src/data/products.ts`. We've created a CSV template with all 16 current products.

**Option A: Use the Provided Template**
- File: `google-sheets-template.csv` (already includes your products)
- Import this directly into Google Sheets

**Option B: Export Custom Products**
If you've added custom products, create a CSV file manually or use this structure.

### Step 2: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **File** → **Import**
3. Upload `google-sheets-template.csv`
4. Or click **"+ Blank"** and create manually

### Step 3: Set Up Sheet Structure

Make sure your sheet has these columns (exact names, case doesn't matter):

```
id | title | description | price | image | category | asin | saves | featured | trending | rating | reviewcount
```

**Header row must be Row 1!**

### Step 4: Copy Your Product Data

If using the template, your 16 products are already there:
- Sony WH-1000XM5 Headphones
- GoPro HERO12 Camera
- Apple Watch Series 9
- JBL Flip 6 Speaker
- Ninja Air Fryer
- iRobot Roomba j7+
- Breville Espresso Machine
- Philips Hue Bulbs
- Holy Stone Drone
- LEGO Classic Box
- WowWee Robot Dog
- National Geographic Science Kit
- Lovery Spa Gift Set
- Nixplay Photo Frame
- Amazon Fresh Coffee
- Anker MagSafe Charger

### Step 5: Publish Your Sheet

1. In Google Sheets, click **File** → **Share** → **Publish to web**
2. Settings:
   - **Link:** Entire Document (or just "Products" sheet)
   - **Format:** Web page
3. Click **"Publish"**
4. Confirm: "Yes, I'm sure"
5. ✅ Sheet is now publicly accessible (read-only)

### Step 6: Get Your Sheet ID

Look at your browser URL:

```
https://docs.google.com/spreadsheets/d/1AbCdEfGhIjKlMnOpQrStUvWxYz/edit
                                   ^^^^^^^^^^^^^^^^^^^^^^^^^^
                                   This is your Sheet ID
```

**Example Sheet ID:**
```
1AbCdEfGhIjKlMnOpQrStUvWxYz
```

### Step 7: Update Your Site Configuration

Open `src/lib/googleSheets.ts` and update:

```typescript
export const GOOGLE_SHEET_CONFIG = {
  // Replace with YOUR Sheet ID
  sheetId: '1AbCdEfGhIjKlMnOpQrStUvWxYz',  // ← YOUR ID HERE

  // Sheet tab name (must match exactly)
  sheetName: 'Products',

  // Cache duration (5 minutes recommended)
  cacheDuration: 5 * 60 * 1000,
};
```

### Step 8: Test Locally

```bash
# Install dependencies (if not already)
bun install

# Start development server
bun run dev
```

Visit `http://localhost:3000` and verify:

1. ✅ Products load from Google Sheets
2. ✅ All 16 products appear
3. ✅ Images display correctly
4. ✅ Filters work (Electronics, Home & Kitchen, etc.)
5. ✅ Featured/Trending badges show
6. ✅ Affiliate links work
7. ✅ Category pages work
8. ✅ Comparison page works

### Step 9: Test the Admin Dashboard

Visit `http://localhost:3000/admin` to check:

- ✅ Sheet connection status
- ✅ Number of products loaded
- ✅ Configuration details
- ✅ Quick access to your Google Sheet

### Step 10: Deploy to Production

```bash
# Build for production
bun run build

# Deploy (Netlify/Vercel)
git add .
git commit -m "Migrated to Google Sheets backend"
git push
```

### Step 11: Verify Production Site

1. Visit your live site
2. Check that all products load
3. Test filters and search
4. Verify affiliate links still have your tag
5. Test on mobile and desktop

---

## 🧪 Testing Your Migration

### Quick Test Checklist

**Homepage:**
- [ ] All products display
- [ ] Featured products section shows featured items
- [ ] Trending filter works
- [ ] Price filters work
- [ ] Category filters work

**Category Pages:**
- [ ] `/category/electronics` shows electronics
- [ ] `/category/home-kitchen` shows home items
- [ ] `/category/toys` shows toys
- [ ] `/category/trending` shows trending items
- [ ] `/category/gift-ideas` shows gift ideas

**Comparison Page:**
- [ ] Products can be selected
- [ ] Side-by-side comparison works
- [ ] All product details show

**Product Cards:**
- [ ] Images load
- [ ] Prices display
- [ ] Ratings show
- [ ] "Check It Out" buttons work
- [ ] Links include affiliate tag

### API Test

Visit: `http://localhost:3000/api/products`

Should return JSON with:
```json
{
  "success": true,
  "products": [...],
  "count": 16
}
```

---

## 🔄 Making Your First Update

Test that updates work:

1. Open your Google Sheet
2. Change a product price (e.g., Sony headphones from $399.99 to $379.99)
3. Save the sheet
4. Wait 5 minutes (or hard refresh your site)
5. Check that the new price appears

**If it works:** ✅ Migration successful!

**If it doesn't work:** Check [Troubleshooting](#troubleshooting) below

---

## 🗑️ Cleanup (Optional)

After confirming everything works, you can optionally clean up old code:

### Keep the Fallback (Recommended)

**Don't delete** `src/data/products.ts` — it serves as fallback data if Google Sheets fails.

### Remove Fallback (Advanced)

If you're confident and want to remove the fallback:

1. Keep only the type definitions and helper functions in `src/data/products.ts`
2. Remove the `fallbackProducts` array
3. Update `loadProducts()` to throw an error if sheets fail

**Warning:** Only do this if you're sure your Google Sheets setup is stable.

---

## 📊 Data Mapping

Here's how your existing product fields map to Google Sheets columns:

| TypeScript Field | Google Sheet Column | Notes |
|------------------|---------------------|-------|
| `id` | id | Must be unique |
| `title` | title | Full product name |
| `description` | description | Long description |
| `price` | price | Number only (no $) |
| `image` | image | Full URL |
| `category` | category | Comma-separated |
| `asin` | asin | 10-character code |
| `saves` | saves | Number |
| `featured` | featured | TRUE/FALSE |
| `trending` | trending | TRUE/FALSE |
| `rating` | rating | 1-5 decimal |
| `reviewCount` | reviewcount | Number |

---

## 🐛 Troubleshooting

### Products Not Loading

**Symptom:** Site shows "Loading products..." forever

**Check:**
1. ✅ Sheet is published to web (File → Share → Publish)
2. ✅ Sheet ID is correct in `src/lib/googleSheets.ts`
3. ✅ Sheet tab is named "Products" (exact match)
4. ✅ Sheet has data (not empty)
5. ✅ No internet connectivity issues

**Debug:**
```bash
# Check API endpoint
curl http://localhost:3000/api/products
```

### Empty Product List

**Symptom:** 0 products found

**Check:**
1. ✅ Header row exists (Row 1)
2. ✅ Data starts at Row 2
3. ✅ No empty rows between products
4. ✅ All required fields filled

**Test:**
- Open `/admin` page to see product count
- Check browser console (F12) for errors

### Images Not Showing

**Symptom:** Broken image icons

**Check:**
1. ✅ Image URLs are complete (start with https://)
2. ✅ URLs don't have quotes around them
3. ✅ Images are publicly accessible

**Test:**
- Copy image URL and paste in browser
- Should show the image

### Affiliate Links Broken

**Symptom:** Links don't include `?tag=yourtag-20`

**Check:**
1. ✅ ASINs are exactly 10 characters
2. ✅ ASIN column is text (not formula)
3. ✅ Affiliate tag in `src/config/affiliate.ts` is correct

**Test:**
- Click "Check It Out" button
- Verify URL includes your affiliate tag

### Categories Don't Filter

**Symptom:** Category filter shows no products

**Check:**
1. ✅ Category names match exactly:
   - `electronics`
   - `home-kitchen`
   - `toys`
   - `trending`
   - `gift-ideas`
2. ✅ Multiple categories separated by commas
3. ✅ No typos in category names

**Fix:**
- Update category column in sheet
- Use exact lowercase names with hyphens

---

## 💡 Pro Tips

### Tip 1: Version Your Sheet

1. File → Version history
2. Name your versions:
   - "Initial migration from TypeScript"
   - "Updated prices for November"
   - "Added holiday products"
3. Restore previous versions if needed

### Tip 2: Use Data Validation

For TRUE/FALSE columns:
1. Select column (e.g., Featured)
2. Data → Data validation
3. Criteria: List of items
4. Enter: `TRUE, FALSE`
5. ✅ Prevents typos

### Tip 3: Freeze Header Row

1. Click on Row 1
2. View → Freeze → 1 row
3. Header stays visible when scrolling

### Tip 4: Color Code Products

- Featured = Blue background
- Trending = Orange background
- Out of stock = Gray background
- Makes visual scanning easier

### Tip 5: Add Helper Columns

Create extra columns (won't affect site):
- "Last Updated" - Track when you changed it
- "Notes" - Internal comments
- "Performance" - Track clicks/conversions
- "Status" - Active/Inactive

### Tip 6: Create Multiple Sheets

Use multiple tabs:
- **Products** = Active products (used by site)
- **Archive** = Discontinued products
- **Ideas** = Products to add later
- **Seasonal** = Holiday-specific items

Only the "Products" sheet is read by your site.

---

## 📈 Next Steps

After successful migration:

1. ✅ **Train your team** - Show them how to edit the sheet
2. ✅ **Set a schedule** - Update prices weekly
3. ✅ **Monitor performance** - Track which products convert
4. ✅ **Add new products** - Expand your catalog
5. ✅ **Optimize content** - Test different descriptions

---

## 📚 Additional Resources

- **[Quick Start Guide](./GOOGLE-SHEETS-QUICKSTART.md)** - 5-minute setup
- **[Complete Setup Guide](./GOOGLE-SHEETS-SETUP.md)** - Full documentation
- **[Affiliate Guide](./AFFILIATE-GUIDE.md)** - Amazon affiliate setup
- **[Product List](./PRODUCT-LIST.md)** - Current products reference

---

## ✅ Migration Complete!

Congratulations! You've successfully migrated to Google Sheets backend.

**Benefits you now have:**
- ✨ Edit products without code
- ✨ Update from anywhere
- ✨ No rebuild/deploy needed
- ✨ Team members can help
- ✨ Faster content updates

**What's changed:**
- ✅ Products load from Google Sheets
- ✅ 5-minute cache for performance
- ✅ Fallback to hardcoded data if sheets fail
- ✅ Same beautiful design and features

**What's the same:**
- ✅ All pages work identically
- ✅ Affiliate links still include your tag
- ✅ Filters and search work
- ✅ Multi-language support
- ✅ Responsive design

---

**Need help?** Check the [Troubleshooting section](#troubleshooting) or [GOOGLE-SHEETS-SETUP.md](./GOOGLE-SHEETS-SETUP.md)

**Last updated:** November 2025
