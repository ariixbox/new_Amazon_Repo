# Deployment Instructions

## Quick Deploy to Netlify

Since your GitHub repo is already connected to Netlify, deploying is simple:

### Option 1: Manual Upload (Fastest for Now)

Since the git repo isn't initialized locally, you can manually upload the updated code:

1. **Download the project:**
   ```bash
   cd /home/project
   zip -r amazon-affiliate-site-updated.zip amazon-affiliate-site/
   ```

2. **Upload to GitHub:**
   - Go to https://github.com/ariixbox/new_Amazon_Repo
   - Upload the updated files manually, or:
   - Clone the repo locally and replace files

3. **Netlify Auto-Deploy:**
   - Netlify will automatically detect the changes
   - Wait 2-3 minutes for deployment
   - Visit https://new-amazon-repo.netlify.app/

### Option 2: Initialize Git and Push

```bash
cd /home/project/amazon-affiliate-site

# Initialize git
git init
git remote add origin https://github.com/ariixbox/new_Amazon_Repo.git

# Commit changes
git add .
git commit -m "Fix: Remove 16-product limit, add data source tracking and category customization"

# Push to GitHub
git push -u origin main --force
```

## After Deployment

### 1. Check Admin Dashboard

Visit: `https://new-amazon-repo.netlify.app/admin`

**What to look for:**
- Data source indicator (green or yellow box)
- Product count
- "Clear Cache & Refresh" button

### 2. Verify Google Sheets Integration

**If you see GREEN box:** ✅
- Your Google Sheets is working!
- All your products are loading
- No 16-product limit

**If you see YELLOW box:** ⚠️
- Using fallback data (16 products)
- Google Sheets not loading
- Follow troubleshooting steps below

### 3. Troubleshooting Yellow Box

**Click "View CSV Data" button:**
- This shows raw output from Google Sheets
- Verify it contains your products
- If it shows an error page, your sheet isn't public

**Make Sheet Public:**
1. Open your Google Sheet
2. Click "Share" (top right)
3. Change to "Anyone with the link can view"
4. Click "File" > "Share" > "Publish to web"
5. Publish as CSV
6. Copy the link

**Update Sheet ID (if needed):**
- Edit `src/lib/googleSheets.ts`
- Update `sheetId` with your sheet ID
- Redeploy

**Clear Cache:**
- Click "Clear Cache & Refresh" in admin
- Wait a few seconds
- Check if green box appears

## Customize Categories (After Initial Deploy)

Once the site is deployed, you can add custom categories:

### Example: Adding "Pet Supplies"

1. **Edit categories array:**

   File: `src/data/products.ts` (line ~240)

   ```typescript
   export const categories = [
     // ... existing categories ...
     { id: "pet-supplies", name: "Pet Supplies", icon: "🐾" },
   ];
   ```

2. **Add icon (optional):**

   File: `src/components/Header.tsx` (line ~24)

   ```typescript
   import { PawPrint } from "lucide-react";

   const categoryIcons: Record<string, React.ReactNode> = {
     // ... existing icons ...
     "pet-supplies": <PawPrint className="w-4 h-4" />,
   };
   ```

3. **Use in Google Sheet:**

   In your sheet's `category` column:
   ```
   pet-supplies
   ```

   Or multiple categories:
   ```
   pet-supplies,trending
   ```

4. **Redeploy** and check the navigation bar

## Testing Before Deploy (Local)

```bash
cd /home/project/amazon-affiliate-site

# Install dependencies (if not already)
bun install

# Run dev server
bun run dev

# Visit http://localhost:3000/admin
# Check data source indicator
```

## Common Issues

### "16 products" still showing
- Check admin dashboard for data source
- If yellow box, your Google Sheets isn't loading
- Click "View CSV Data" to diagnose
- Make sure sheet is public and published

### Categories not appearing
- Check `src/data/products.ts` has the category
- Make sure category ID matches exactly in Google Sheet
- Redeploy after editing categories

### Products not updating
- Click "Clear Cache & Refresh" in admin
- Cache refreshes automatically every 5 minutes
- Hard refresh browser (Ctrl+Shift+R)

## Next Steps After Deploy

1. ✅ Visit `/admin` and verify data source
2. ✅ Add more products to Google Sheet (no limit!)
3. ✅ Customize categories as needed
4. ✅ Test on live site
5. ✅ Share the live URL!

---

**Your Live Site:** https://new-amazon-repo.netlify.app/

**GitHub Repo:** https://github.com/ariixbox/new_Amazon_Repo

**Admin Dashboard:** https://new-amazon-repo.netlify.app/admin
