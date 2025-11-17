# Deploy to Your Own Netlify Account

This guide shows you how to deploy this Amazon affiliate site to **your own Netlify account**.

---

## 📋 Prerequisites

- [x] Netlify account (free) - [Sign up here](https://app.netlify.com/signup)
- [x] GitHub/GitLab/Bitbucket account (to host your code)
- [x] This project code ready

---

## 🚀 Deployment Methods

Choose one of these methods:

### **Method 1: Deploy via GitHub (Recommended)**

#### Step 1: Push Code to GitHub

```bash
# Navigate to project
cd amazon-affiliate-site

# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Amazon affiliate site"

# Create a new repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

#### Step 2: Connect to Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** (authorize if needed)
4. Select your repository
5. Configure build settings:

   **Build Settings:**
   ```
   Build command: bun run build
   Publish directory: .next
   ```

   **Environment Variables** (optional):
   ```
   NODE_VERSION = 20
   ```

6. Click **"Deploy site"**
7. Wait 2-3 minutes for build to complete
8. Your site is live! 🎉

#### Step 3: Enable Auto-Deploy

✅ **Already enabled!** Every time you push to GitHub, Netlify auto-deploys.

---

### **Method 2: Deploy via Netlify CLI**

#### Step 1: Install Netlify CLI

```bash
# Install globally
npm install -g netlify-cli

# Or with bun
bun add -g netlify-cli
```

#### Step 2: Login to Netlify

```bash
netlify login
```

This opens a browser to authenticate.

#### Step 3: Initialize Netlify

```bash
# Navigate to project
cd amazon-affiliate-site

# Initialize
netlify init
```

Follow the prompts:
- **Create & configure a new site**
- Choose your team
- Enter site name (or leave blank for random)
- Build command: `bun run build`
- Publish directory: `.next`

#### Step 4: Deploy

```bash
# Deploy to production
netlify deploy --prod

# Or deploy to preview first
netlify deploy
```

---

### **Method 3: Manual Deploy via Netlify UI**

#### Step 1: Build Locally

```bash
cd amazon-affiliate-site
bun install
bun run build
```

#### Step 2: Zip the Build

```bash
# Create a zip of the .next folder
cd .next
zip -r ../build.zip .
cd ..
```

#### Step 3: Upload to Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click **"Add new site"** → **"Deploy manually"**
3. Drag and drop `build.zip`
4. Wait for deployment

⚠️ **Note:** Manual deploys don't auto-update. Use Method 1 or 2 for continuous deployment.

---

## 🔧 Netlify Configuration

Your project already includes `netlify.toml` with optimal settings:

```toml
[build]
  command = "bun install && bun run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

✅ **No changes needed!** This is already configured.

---

## 🌐 Custom Domain (Optional)

### Add Your Own Domain

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `bestdeals.com`)
4. Follow DNS setup instructions
5. Netlify provides free SSL (HTTPS)

### Use Netlify Subdomain

Your site gets a free subdomain like:
- `your-site-name.netlify.app`

You can change the name:
1. **Site settings** → **Site details**
2. Click **"Change site name"**
3. Enter new name

---

## 🔐 Environment Variables (Optional)

If you want to use environment variables:

1. Go to **Site settings** → **Environment variables**
2. Click **"Add a variable"**
3. Add any of these (optional):

```
NEXT_PUBLIC_GOOGLE_SHEET_ID = your_sheet_id_here
NEXT_PUBLIC_AFFILIATE_TAG = your-tag-20
```

⚠️ **Note:** Your site works without these! They're only needed if you want to configure via env vars instead of code.

---

## 📊 Build & Deploy Settings

### Recommended Settings

**Build command:**
```bash
bun run build
```

**Publish directory:**
```
.next
```

**Node version:**
```
20
```

**Build plugins:**
- `@netlify/plugin-nextjs` (auto-installed)

### Build Time

Expected: **30-60 seconds**

---

## 🔄 Continuous Deployment

### How It Works

```
You push to GitHub → Netlify detects change → Auto-builds → Auto-deploys
```

**Build triggers:**
- Push to `main` branch
- Merge pull request
- Manual trigger in Netlify UI

### Manual Redeploy

1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Clear cache and deploy site"**

---

## 📈 Monitoring Your Deployment

### Netlify Dashboard Shows:

- ✅ **Deploy status** - Success/Failed
- ✅ **Build logs** - See what happened
- ✅ **Deploy previews** - Test before production
- ✅ **Analytics** - Traffic stats (paid feature)
- ✅ **Forms** - Newsletter signups (built-in)

### Check Deployment Status

```bash
# Via CLI
netlify status

# View logs
netlify logs
```

---

## 🐛 Troubleshooting

### Build Fails

**Check:**
1. Build logs in Netlify dashboard
2. Node version is set to 20
3. Build command is correct
4. All dependencies installed

**Common Fixes:**
```bash
# Clear cache and rebuild
netlify deploy --prod --build

# Check local build first
bun run build
```

### Site Shows 404

**Fix:**
- Ensure publish directory is `.next` (not `out`)
- Check `netlify.toml` is in root folder
- Verify `@netlify/plugin-nextjs` plugin is active

### Images Not Loading

**Fix:**
- Check Unsplash image URLs are valid
- Verify `next.config.js` has image domains configured
- Images should load from CDN

---

## 🎯 After Deployment Checklist

- [ ] Site builds successfully
- [ ] Homepage loads correctly
- [ ] All 16 products display
- [ ] Category pages work
- [ ] Product comparison works
- [ ] Images load properly
- [ ] Affiliate links include your tag
- [ ] Mobile view looks good
- [ ] Test on different browsers

---

## 🔗 Useful Netlify Features

### Deploy Previews

Every pull request gets a preview URL:
- Test changes before merging
- Share with team for review

### Branch Deploys

Deploy different branches:
- `main` → Production
- `develop` → Staging
- `feature-x` → Preview

Enable in: **Site settings** → **Build & deploy** → **Branch deploys**

### Forms

Your newsletter signup can work with Netlify Forms:

1. Add `netlify` attribute to form:
   ```html
   <form name="newsletter" netlify>
   ```

2. Submissions appear in **Forms** tab
3. Set up email notifications

### Functions

Add serverless functions if needed:
- Create `netlify/functions/` folder
- Add `.js` files
- Deploy automatically

---

## 💰 Netlify Pricing

**Free Tier Includes:**
- ✅ 100 GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Unlimited sites
- ✅ HTTPS included
- ✅ Continuous deployment
- ✅ Form submissions (100/month)

**Your site needs:** ~10 MB bandwidth per visitor

**Free tier = ~10,000 visitors/month** 🎉

---

## 📱 Mobile App (Netlify Mobile)

Monitor deployments on the go:
- iOS: [Download](https://apps.apple.com/app/netlify/id1456740458)
- Android: [Download](https://play.google.com/store/apps/details?id=com.netlify.mobile)

**Features:**
- View deploy status
- Trigger deploys
- Check analytics

---

## 🚀 Quick Deploy Commands

```bash
# Initial setup
cd amazon-affiliate-site
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_URL
git push -u origin main

# Then in Netlify UI: Import from GitHub

# Or via CLI
netlify init
netlify deploy --prod

# Future updates
git add .
git commit -m "Update products"
git push
# Auto-deploys! ✨
```

---

## 📞 Need Help?

**Netlify Docs:**
- [Next.js on Netlify](https://docs.netlify.com/frameworks/next-js/overview/)
- [Deploy Troubleshooting](https://docs.netlify.com/configure-builds/troubleshooting-tips/)

**Your Project Docs:**
- `README.md` - Project overview
- `DEPLOYMENT-SUCCESS.md` - What's included
- `GOOGLE-SHEETS-QUICKSTART.md` - Setup Google Sheets

**Netlify Support:**
- [Community Forum](https://answers.netlify.com/)
- [Support](https://www.netlify.com/support/) (paid plans)

---

## ✅ You're Ready to Deploy!

**Recommended approach:**

1. **Push to GitHub** (Method 1)
2. **Connect to Netlify** via UI
3. **Enable auto-deploy**
4. **Add custom domain** (optional)
5. **Set up Google Sheets** (next step!)

Your site will be live in **2-3 minutes**! 🎉

---

**Next:** Follow `GOOGLE-SHEETS-SETUP-GUIDE.md` to connect Google Sheets and manage products without code!
