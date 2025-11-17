import { fetchHolidaysFromSheets } from '@/lib/googleSheets';

export type Holiday = {
  id: string;
  name: string;
  date?: string;
  icon?: string;
  description?: string;
  categoryFilter?: string; // Which product category to filter by
};

// Fallback holidays (used if Google Sheets fails to load)
export const fallbackHolidays: Holiday[] = [
  {
    id: 'rosh-hashanah',
    name: 'Rosh Hashanah',
    date: '2025-09-22',
    icon: '🍎',
    description: 'Jewish New Year',
    categoryFilter: 'judaica'
  },
  {
    id: 'yom-kippur',
    name: 'Yom Kippur',
    date: '2025-10-01',
    icon: '🕊️',
    description: 'Day of Atonement',
    categoryFilter: 'judaica'
  },
  {
    id: 'sukkot',
    name: 'Sukkot',
    date: '2025-10-06',
    icon: '🏕️',
    description: 'Feast of Tabernacles',
    categoryFilter: 'judaica'
  },
  {
    id: 'hanukkah',
    name: 'Hanukkah',
    date: '2025-12-14',
    icon: '🕎',
    description: 'Festival of Lights',
    categoryFilter: 'judaica'
  },
  {
    id: 'purim',
    name: 'Purim',
    date: '2026-03-05',
    icon: '🎭',
    description: 'Festival of Lots',
    categoryFilter: 'judaica'
  },
  {
    id: 'passover',
    name: 'Passover',
    date: '2026-04-01',
    icon: '🍷',
    description: 'Feast of Unleavened Bread',
    categoryFilter: 'judaica'
  },
  {
    id: 'shavuot',
    name: 'Shavuot',
    date: '2026-05-21',
    icon: '📜',
    description: 'Feast of Weeks',
    categoryFilter: 'judaica'
  },
  {
    id: 'black-friday',
    name: 'Black Friday',
    date: '2025-11-28',
    icon: '🛍️',
    description: 'Black Friday Deals',
    categoryFilter: 'black-friday'
  },
];

// Data source tracking
let currentHolidaySource: 'google-sheets' | 'fallback' = 'fallback';
let holidaysCache: Holiday[] | null = null;

/**
 * Load holidays from Google Sheets with fallback to hardcoded data
 */
export async function loadHolidays(): Promise<Holiday[]> {
  try {
    console.log('📅 Loading holidays from Google Sheets...');
    const sheetsData = await fetchHolidaysFromSheets();

    if (sheetsData && sheetsData.length > 0) {
      console.log(`✅ Loaded ${sheetsData.length} holidays from Google Sheets`);
      currentHolidaySource = 'google-sheets';
      holidaysCache = sheetsData;
      return sheetsData;
    } else {
      console.warn('⚠️ No holidays found in Google Sheets, using fallback data');
      currentHolidaySource = 'fallback';
      holidaysCache = fallbackHolidays;
      return fallbackHolidays;
    }
  } catch (error) {
    console.error('❌ Error loading holidays from Google Sheets:', error);
    console.log('📋 Using fallback holiday data');
    currentHolidaySource = 'fallback';
    holidaysCache = fallbackHolidays;
    return fallbackHolidays;
  }
}

/**
 * Get the current data source
 */
export function getHolidayDataSource(): 'google-sheets' | 'fallback' {
  return currentHolidaySource;
}

/**
 * Clear the holidays cache
 */
export function clearHolidaysCache(): void {
  holidaysCache = null;
  currentHolidaySource = 'fallback';
}

/**
 * Get upcoming holidays (next 90 days)
 */
export function getUpcomingHolidays(holidays: Holiday[]): Holiday[] {
  const today = new Date();
  const ninetyDaysFromNow = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000);

  return holidays
    .filter(h => {
      if (!h.date) return false;
      const holidayDate = new Date(h.date);
      return holidayDate >= today && holidayDate <= ninetyDaysFromNow;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date!);
      const dateB = new Date(b.date!);
      return dateA.getTime() - dateB.getTime();
    });
}

// For backward compatibility - export as holidays
export const holidays = fallbackHolidays;
