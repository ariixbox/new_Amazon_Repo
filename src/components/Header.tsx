"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, Gift, Home, Zap, Gamepad2, Sparkles } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useCategories } from "@/hooks/useCategories";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/lib/translations";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { language } = useLanguage();
  const { categories } = useCategories();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // This will be implemented with search functionality
    console.log("Searching for:", searchQuery);
  };

  const categoryIcons: Record<string, React.ReactNode> = {
    electronics: <Zap className="w-4 h-4" />,
    "home-kitchen": <Home className="w-4 h-4" />,
    toys: <Gamepad2 className="w-4 h-4" />,
    trending: <Sparkles className="w-4 h-4" />,
    "gift-ideas": <Gift className="w-4 h-4" />
  };

  const categoryNames: Record<string, keyof typeof import("@/lib/translations").translations.en> = {
    electronics: "electronics",
    "home-kitchen": "homeKitchen",
    toys: "toys",
    trending: "trendingProducts",
    "gift-ideas": "giftIdeas"
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      {/* Top Bar */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-2 rounded-lg">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-zinc-900 leading-none">
                {getTranslation(language, 'siteTitle')}
              </h1>
              <p className="text-xs text-zinc-500">{getTranslation(language, 'siteSubtitle')}</p>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <Input
                type="text"
                placeholder={getTranslation(language, 'searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 w-full"
              />
            </div>
          </form>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>

          {/* Language Switcher & CTA - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
            <Link href="/blog">
              <Button variant="outline" size="sm">
                {getTranslation(language, 'blogGuides')}
              </Button>
            </Link>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="md:hidden mt-3 space-y-2">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <Input
                type="text"
                placeholder={getTranslation(language, 'searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </form>
          <div className="flex items-center justify-between">
            <LanguageSwitcher />
            <Link href="/blog">
              <Button variant="outline" size="sm">
                {getTranslation(language, 'blogGuides')}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`border-t bg-zinc-50 ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
        <div className="container mx-auto px-4">
          <ul className="flex flex-col md:flex-row md:items-center md:justify-center gap-1 md:gap-6 py-3">
            <li>
              <Link
                href="/"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold text-zinc-700 hover:bg-white hover:text-orange-600 transition-colors"
              >
                {getTranslation(language, 'allProducts')}
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/category/${category.id}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold text-zinc-700 hover:bg-white hover:text-orange-600 transition-colors"
                >
                  {categoryIcons[category.id] || (category.icon && <span>{category.icon}</span>)}
                  {categoryNames[category.id] ? getTranslation(language, categoryNames[category.id]) : category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
