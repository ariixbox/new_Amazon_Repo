# Quick Start Checklist ✅

Follow these steps to get your Amazon affiliate site live with Google Sheets!

---

## 📋 Part 1: Google Sheets Setup (10 minutes)

### Step 1: Create Google Sheet
- [ ] Go to [sheets.google.com](https://sheets.google.com)
- [ ] Import `google-sheets-template.csv` (File → Import)
- [ ] Or create manually with required columns
- [ ] Name it "Amazon Affiliate Products"
- [ ] Rename tab to "Products"

### Step 2: Publish Sheet
- [ ] File → Share → Publish to web
- [ ] Choose "Entire Document" or "Products" sheet
- [ ] Format: "Web page"
- [ ] Click "Publish"
- [ ] Click "OK" to confirm

### Step 3: Get Sheet ID
- [ ] Look at browser URL
- [ ] Copy the part between `/d/` and `/edit`
- [ ] Example: `docs.google.com/spreadsheets/d/`**`COPY_THIS_PART`**`/edit`
- [ ] Save it somewhere

### Step 4: Update Configuration
- [ ] Open `src/lib/googleSheets.ts` in your code editor
- [ ] Find `GOOGLE_SHEET_CONFIG`
- [ ] Replace `sheetId` with YOUR Sheet ID
- [ ] Save the file (Ctrl+S or Cmd+S)

### Step 5: Test Locally
- [ ] Run `bun install` (if needed)
- [ ] Run `bun run dev`
- [ ] Visit `http://localhost:3000`
- [ ] Products should load from your sheet!
- [ ] Check `/admin` page shows "Sheet Configured" ✅

### Step 6: Commit Changes
- [ ] `git add .`
- [ ] `git commit -m "Connected Google Sheets"`
- [ ] Ready to deploy!

---

## 🚀 Part 2: Deploy to Your Netlify (5 minutes)

### Option A: Deploy via GitHub (Recommended)

#### Step 1: Push to GitHub
- [ ] Create repository on GitHub
- [ ] `git remote add origin YOUR_GITHUB_URL`
- [ ] `git push -u origin main`

#### Step 2: Connect to Netlify
- [ ] Go to [app.netlify.com](https://app.netlify.com)
- [ ] Click "Add new site" → "Import an existing project"
- [ ] Choose GitHub
- [ ] Select your repository
- [ ] Build command: `bun run build`
- [ ] Publish directory: `.next`
- [ ] Click "Deploy site"
- [ ] Wait 2-3 minutes

#### Step 3: Done!
- [ ] Site is live! 🎉
- [ ] Visit your Netlify URL
- [ ] Check products load
- [ ] Test on mobile

---

### Option B: Deploy via Netlify CLI

#### Step 1: Install CLI
- [ ] `npm install -g netlify-cli` or `bun add -g netlify-cli`
- [ ] `netlify login`

#### Step 2: Deploy
- [ ] `cd amazon-affiliate-site`
- [ ] `netlify init`
- [ ] Follow prompts
- [ ] `netlify deploy --prod`

#### Step 3: Done!
- [ ] Site is live! 🎉
- [ ] Check Netlify dashboard for URL

---

## ✅ Final Checklist

### Verify Everything Works
- [ ] Homepage loads correctly
- [ ] All products display
- [ ] Images load properly
- [ ] Category filters work
- [ ] Price filters work
- [ ] Product comparison works
- [ ] Affiliate links have your tag
- [ ] Mobile view looks good
- [ ] Admin dashboard shows connection status

### Test Google Sheets Integration
- [ ] Go to your Google Sheet
- [ ] Change a product price
- [ ] Save (auto-saves)
- [ ] Wait 5 minutes
- [ ] Hard refresh your site (Ctrl+Shift+R)
- [ ] New price should show! ✨

### Optional Enhancements
- [ ] Set up custom domain on Netlify
- [ ] Add Google Analytics
- [ ] Update affiliate tag to yours
- [ ] Add more products
- [ ] Write blog posts
- [ ] Customize colors/branding

---

## 📚 Documentation Reference

| Need Help With | Read This File |
|----------------|----------------|
| **Google Sheets detailed guide** | `GOOGLE-SHEETS-SETUP-GUIDE.md` |
| **Quick Google Sheets setup** | `GOOGLE-SHEETS-QUICKSTART.md` |
| **Deploy to Netlify guide** | `DEPLOY-TO-YOUR-NETLIFY.md` |
| **General project info** | `README.md` |
| **Deployment success info** | `DEPLOYMENT-SUCCESS.md` |
| **Troubleshooting** | `GOOGLE-SHEETS-SETUP.md` (section 🐛) |

---

## 🆘 Quick Troubleshooting

### Products Not Loading from Google Sheets

1. ✅ Check Sheet ID is correct in `src/lib/googleSheets.ts`
2. ✅ Verify sheet is published (File → Share → Publish to web)
3. ✅ Sheet tab must be named "Products" exactly
4. ✅ Header row in Row 1, data starts Row 2
5. ✅ Wait 5 minutes for cache to refresh
6. ✅ Hard refresh browser (Ctrl+Shift+R)

**Still not working?**
- Check `/admin` page for status
- Check `/api/products` for API response
- Look at browser console (F12) for errors

### Build Fails on Netlify

1. ✅ Check build logs in Netlify dashboard
2. ✅ Verify Node version is 20
3. ✅ Ensure `netlify.toml` is in root folder
4. ✅ Build command: `bun run build`
5. ✅ Publish directory: `.next`

**Still failing?**
- Test build locally: `bun run build`
- Clear cache: Netlify → Deploys → Clear cache and deploy
- Check dependency versions

### Images Not Showing

1. ✅ Use full HTTPS URLs (not HTTP)
2. ✅ Test image URL in browser first
3. ✅ Use Unsplash or Amazon images
4. ✅ Verify URLs in Google Sheet have no quotes

---

## 📞 Support Resources

**Your Documentation:**
- All docs are in `amazon-affiliate-site/` folder
- Check README.md first
- See GOOGLE-SHEETS-SETUP-GUIDE.md for detailed help

**Netlify Help:**
- [Netlify Docs](https://docs.netlify.com)
- [Next.js on Netlify](https://docs.netlify.com/frameworks/next-js/overview/)
- [Community Forum](https://answers.netlify.com/)

**Google Sheets Help:**
- [Google Sheets Support](https://support.google.com/docs/topic/9054603)
- Publishing: File → Share → Publish to web

---

## 🎯 Success Criteria

You'll know it's working when:

✅ **Google Sheets:**
- Admin page shows "Sheet Configured" ✅
- Admin page shows "Data Loaded" ✅
- Products from your sheet appear on homepage
- Changing price in sheet updates site (after 5 min)

✅ **Netlify:**
- Build completes successfully
- Site loads at your Netlify URL
- All pages work (home, categories, comparison, blog)
- No 404 or build errors

✅ **Overall:**
- You can add products in Google Sheets
- Changes appear on site automatically
- No code editing needed for product updates
- Site works on mobile and desktop

---

## 🎉 You're Ready!

**Time estimate:**
- Google Sheets setup: **10 minutes**
- Netlify deployment: **5 minutes**
- Testing: **5 minutes**

**Total: ~20 minutes to go live!** ⏱️

**Let's do this!** 🚀

---

## 📝 Notes

**After setup:**
- Bookmark your Google Sheet for easy access
- Bookmark Netlify dashboard
- Save your Sheet ID somewhere safe
- Test adding/editing products in Google Sheets
- Enjoy managing your site without touching code! ✨

**Updates workflow:**
```
Edit Google Sheet → Save → Wait 5 min → Live on site! 🎉
```

**No redeployment needed for product changes!**

---

**Need help?** Read the detailed guides in your project folder!

**Questions?** Check the troubleshooting sections in each guide.

**Ready to start?** Begin with Part 1: Google Sheets Setup! 👆
