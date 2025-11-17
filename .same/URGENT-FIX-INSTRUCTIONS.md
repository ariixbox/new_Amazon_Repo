# URGENT FIX: Upload These 3 Files to GitHub

## Problem
The build is failing because my fix wasn't pushed to GitHub. The repository still has the old code with duplicate `GOOGLE_SHEET_CONFIG` declaration.

## Solution
Upload these 3 files to your GitHub repository:

---

## File 1: **NEW FILE** - `src/config/googleSheets.ts`

**Location:** `src/config/googleSheets.ts`

**Action:** Create this NEW file in GitHub

**Content:**
```typescript
// Google Sheets Configuration
// Replace this with your own Google Sheet ID after setup
export const GOOGLE_SHEET_CONFIG = {
  // Get this from your Google Sheet URL: https://docs.google.com/spreadsheets/d/SHEET_ID/edit
  sheetId: '1GpczMNbB6w1ugf_BGedYBlwWJP4eSn7a8debUqw5fHg',

  // Sheet name/tab (default is "Products")
  sheetName: 'Products',

  // Cache duration in milliseconds (5 minutes)
  cacheDuration: 5 * 60 * 1000,
};
```

---

## File 2: **UPDATE** - `src/lib/googleSheets.ts`

**Location:** `src/lib/googleSheets.ts`

**Action:** Replace the FIRST import line

**FIND:**
```typescript
import { Product } from '@/data/products';

// Google Sheets Configuration
// Replace this with your own Google Sheet ID after setup
export const GOOGLE_SHEET_CONFIG = {
  // Get this from your Google Sheet URL: https://docs.google.com/spreadsheets/d/SHEET_ID/edit
  sheetId: '1GpczMNbB6w1ugf_BGedYBlwWJP4eSn7a8debUqw5fHg',

  // Sheet name/tab (default is "Products")
  sheetName: 'Products',

  // Cache duration in milliseconds (5 minutes)
  cacheDuration: 5 * 60 * 1000,
};
```

**REPLACE WITH:**
```typescript
import { Product } from '@/data/products';
import { GOOGLE_SHEET_CONFIG } from '@/config/googleSheets';
```

**Note:** Delete all the GOOGLE_SHEET_CONFIG code (lines 3-14) and just keep the two imports.

---

## File 3: **UPDATE** - `src/app/admin/page.tsx`

**Location:** `src/app/admin/page.tsx`

**Action:** Change ONE import line

**FIND (around line 18):**
```typescript
import { GOOGLE_SHEET_CONFIG } from "@/lib/googleSheets";
```

**REPLACE WITH:**
```typescript
import { GOOGLE_SHEET_CONFIG } from "@/config/googleSheets";
```

---

## How to Upload to GitHub (Easy Way)

### Option 1: GitHub Web Interface (Recommended)

1. **Create the new file:**
   - Go to: https://github.com/ariixbox/new_Amazon_Repo
   - Navigate to `src/config/`
   - Click "Add file" > "Create new file"
   - Name it: `googleSheets.ts`
   - Paste the content from File 1 above
   - Click "Commit changes"

2. **Edit googleSheets.ts:**
   - Go to: https://github.com/ariixbox/new_Amazon_Repo/blob/main/src/lib/googleSheets.ts
   - Click the pencil icon (Edit this file)
   - Find lines 1-14 (the imports and GOOGLE_SHEET_CONFIG)
   - Replace with the new content from File 2 above
   - Click "Commit changes"

3. **Edit admin page:**
   - Go to: https://github.com/ariixbox/new_Amazon_Repo/blob/main/src/app/admin/page.tsx
   - Click the pencil icon (Edit this file)
   - Find line 18 with `import { GOOGLE_SHEET_CONFIG } from "@/lib/googleSheets";`
   - Change to: `import { GOOGLE_SHEET_CONFIG } from "@/config/googleSheets";`
   - Click "Commit changes"

### Option 2: Download & Upload

1. I can create a ZIP file with just these 3 files
2. You extract and upload them to GitHub

---

## After Uploading

1. **Wait 2-3 minutes** for Netlify to auto-deploy
2. Check build logs at: https://app.netlify.com/sites/new-amazon-repo/deploys
3. Look for: `✓ Compiled successfully`
4. Visit: https://new-amazon-repo.netlify.app/admin
5. Should see green box with your products!

---

## Why This Fixes the Error

The error happens because Next.js tries to bundle `googleSheets.ts` for both:
- Client-side (admin page)
- Server-side (API routes)

This creates duplicate declarations. By moving the config to a separate file, it can be safely imported in both contexts.

---

**Quick Links:**
- Edit lib/googleSheets.ts: https://github.com/ariixbox/new_Amazon_Repo/edit/main/src/lib/googleSheets.ts
- Edit admin page: https://github.com/ariixbox/new_Amazon_Repo/edit/main/src/app/admin/page.tsx
- Create new file: https://github.com/ariixbox/new_Amazon_Repo/new/main/src/config

---

**Let me know once you've uploaded these and I'll verify the build succeeds!**
