"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    // Load language from localStorage or auto-detect from browser
    const savedLang = localStorage.getItem('language') as Language;

    if (savedLang && ['en', 'he', 'es'].includes(savedLang)) {
      // Use saved preference
      setLanguageState(savedLang);
      setIsRTL(savedLang === 'he');
      document.documentElement.lang = savedLang;
      document.documentElement.dir = savedLang === 'he' ? 'rtl' : 'ltr';
    } else {
      // Auto-detect browser language
      const browserLang = navigator.language || (navigator as { userLanguage?: string }).userLanguage || 'en';
      let detectedLang: Language = 'en'; // Default to English

      // Map browser language codes to our supported languages
      if (browserLang.startsWith('es')) {
        detectedLang = 'es'; // Spanish
      } else if (browserLang.startsWith('he') || browserLang.startsWith('iw')) {
        detectedLang = 'he'; // Hebrew (iw is old code)
      } else {
        detectedLang = 'en'; // English (default for all others)
      }

      setLanguageState(detectedLang);
      setIsRTL(detectedLang === 'he');
      document.documentElement.lang = detectedLang;
      document.documentElement.dir = detectedLang === 'he' ? 'rtl' : 'ltr';

      // Save the auto-detected language
      localStorage.setItem('language', detectedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setIsRTL(lang === 'he');
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
