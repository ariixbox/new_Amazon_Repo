# Holidays Google Sheets Integration ✅

## Overview

Your site now supports **Holidays** management via Google Sheets! This allows you to showcase products for specific holidays like Jewish holidays, Black Friday, and other special occasions.

## How It Works

### Google Sheets Setup

**Sheet Name:** `Holidays` (tab in your Google Sheet)

**Required Columns:**
| Column | Description | Example |
|--------|-------------|---------|
| `id` | Unique ID (URL-friendly) | `hanukkah`, `black-friday`, `passover` |
| `name` | Holiday name | "Hanukkah", "Black Friday" |
| `date` | Holiday date (YYYY-MM-DD) | "2025-12-14" |
| `icon` | Emoji icon | "🕎", "🛍️" |
| `description` | Short description | "Festival of Lights" |
| `categoryFilter` | Product category to filter | "judaica", "black-friday" |

### Example Holidays

```csv
id,name,date,icon,description,categoryFilter
hanukkah,Hanukkah,2025-12-14,🕎,Festival of Lights,judaica
passover,Passover,2026-04-01,🍷,Feast of Unleavened Bread,judaica
rosh-hashanah,Rosh Hashanah,2025-09-22,🍎,Jewish New Year,judaica
black-friday,Black Friday,2025-11-28,🛍️,Black Friday Deals,black-friday
purim,Purim,2026-03-05,🎭,Festival of Lots,judaica
```

## Features

### 1. **Upcoming Holidays Section**
- Automatically displays holidays within the next 90 days
- Shows on the homepage above category filters
- Sorted by date (soonest first)

### 2. **Holiday-Based Product Filtering**
- Click a holiday to filter products by its `categoryFilter`
- Products must have the matching category in their `category` field
- Example: "Hanukkah" filters products with `judaica` category

### 3. **Smart Display**
- Only shows holidays with a valid date
- Displays holiday icon and name
- Shows date in user-friendly format (e.g., "Dec 14")

## Product Integration

To show products for a specific holiday:

1. **Add the holiday to the Holidays sheet**
2. **Set the `categoryFilter`** (e.g., `judaica`)
3. **Tag products** with that category in the Products sheet
   - In the `category` column, add: `judaica` or `judaica,gift-ideas`

### Example Product for Hanukkah:

```csv
id,title,description,price,image,category,asin
h1,Menorah Set,Beautiful 9-branch menorah,49.99,https://...,judaica,B0EXAMPLE
h2,Hanukkah Gift Box,Gelt and dreidel set,24.99,https://...,judaica,B0EXAMPLE2
```

## How Users See It

### Homepage Experience:

1. **Upcoming Holidays Bar** (visible when holidays are within 90 days)
   - Blue/indigo gradient background
   - Calendar icon
   - Clickable holiday buttons with icons and dates

2. **Click a Holiday**
   - Products filter to show only items tagged with that holiday's category
   - Heading updates: "🕎 Hanukkah Gift Ideas"
   - Product count updates

3. **Clear Filter**
   - Click "All Products" button
   - Or click any other category/filter

## API & Hooks

### API Endpoint
- **URL:** `/api/holidays`
- **Clear cache:** `/api/holidays?clearCache=true`
- **Returns:** All holidays from Google Sheets with fallback

### React Hook
```typescript
import { useHolidays } from '@/hooks/useHolidays';

const { holidays, loading, error, fromGoogleSheets } = useHolidays();
```

### Data Functions
```typescript
import { getUpcomingHolidays } from '@/data/holidays';

const upcoming = getUpcomingHolidays(holidays); // Next 90 days
```

## Files Added/Updated

### New Files:
- `src/data/holidays.ts` - Holiday type and data loader
- `src/hooks/useHolidays.ts` - React hook for holidays
- `src/app/api/holidays/route.ts` - API endpoint

### Updated Files:
- `src/config/googleSheets.ts` - Added `holidaysSheetName: 'Holidays'`
- `src/lib/googleSheets.ts` - Added holiday fetching and parsing
- `src/app/page.tsx` - Added Upcoming Holidays section and filtering

## Caching

- **Cache Duration:** 5 minutes (same as other data)
- **Clear Cache:** Admin dashboard or `/api/holidays?clearCache=true`
- **Fallback Data:** Shows default holidays if Google Sheets fails

## Tips

### Jewish Holidays
For a Jewish holiday site, add all major holidays:
- Rosh Hashanah
- Yom Kippur
- Sukkot
- Hanukkah
- Purim
- Passover
- Shavuot

### Retail Holidays
For general retail:
- Black Friday
- Cyber Monday
- Christmas
- Valentine's Day
- Mother's Day
- Father's Day

### Category Mapping
Make sure your `categoryFilter` matches categories in your Products sheet:
- `judaica` → Jewish holiday products
- `black-friday` → Black Friday deals
- `gift-ideas` → General gifts

## Troubleshooting

**Q: Holidays not showing up?**
- Check the `Holidays` tab exists in your Google Sheet
- Verify sheet is published to web
- Make sure dates are in `YYYY-MM-DD` format
- Dates must be within next 90 days

**Q: Products not filtering correctly?**
- Verify `categoryFilter` in Holidays sheet matches category in Products sheet
- Check product `category` column includes the filter value
- Case-sensitive: use lowercase (e.g., `judaica` not `Judaica`)

**Q: Want to show past holidays?**
- Edit the 90-day window in `src/data/holidays.ts` → `getUpcomingHolidays` function

## Next Steps

1. ✅ **Create Holidays tab** in your Google Sheet
2. ✅ **Add holidays** with required columns
3. ✅ **Tag products** with holiday categories
4. ✅ **Publish sheet** to web
5. ✅ **Test** by clicking holiday buttons on homepage

---

**Status:** ✅ Ready to use!
**Live Updates:** Holidays refresh every 5 minutes
**Admin Control:** Clear cache in admin dashboard
