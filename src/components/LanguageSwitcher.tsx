"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Language } from "@/lib/translations";
import { Languages, Check, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showAutoDetectBadge, setShowAutoDetectBadge] = useState(false);

  useEffect(() => {
    // Show badge if language was auto-detected (not manually set before)
    const wasManuallySet = localStorage.getItem('language-manual');
    if (!wasManuallySet) {
      setShowAutoDetectBadge(true);
      // Hide badge after 5 seconds
      const timer = setTimeout(() => setShowAutoDetectBadge(false), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const languages = [
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
    { code: 'he' as Language, name: 'עברית', flag: '🇮🇱' }
  ];

  const currentLang = languages.find(l => l.code === language) || languages[0];

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode);
    localStorage.setItem('language-manual', 'true');
    setShowAutoDetectBadge(false);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="gap-2"
        >
          <Languages className="w-4 h-4" />
          <span className="hidden sm:inline">{currentLang.flag} {currentLang.name}</span>
          <span className="sm:hidden">{currentLang.flag}</span>
        </Button>

        {showAutoDetectBadge && (
          <div className="absolute -top-1 -right-1">
            <span className="flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
            </span>
          </div>
        )}
      </div>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-zinc-200 py-2 z-50">
            {showAutoDetectBadge && (
              <div className="px-3 py-2 mb-2 bg-orange-50 border-b border-orange-100">
                <div className="flex items-center gap-1 text-xs text-orange-700">
                  <Sparkles className="w-3 h-3" />
                  <span className="font-medium">Auto-detected</span>
                </div>
              </div>
            )}

            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full px-4 py-2 text-left flex items-center justify-between hover:bg-zinc-50 transition-colors ${
                  language === lang.code ? 'bg-orange-50 text-orange-600' : 'text-zinc-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                </span>
                {language === lang.code && (
                  <Check className="w-4 h-4 text-orange-600" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
