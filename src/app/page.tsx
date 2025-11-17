"use client";

import { useState, useMemo } from "react";
import { categories } from "@/data/products";
import { blogPosts } from "@/data/blog";
import ProductCard from "@/components/ProductCard";
import BlogCard from "@/components/BlogCard";
import Newsletter from "@/components/Newsletter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Sparkles, Gift, ArrowRight, Loader2, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/lib/translations";
import { useProducts } from "@/hooks/useProducts";
import { useHolidays } from "@/hooks/useHolidays";
import { getUpcomingHolidays } from "@/data/holidays";

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [selectedHoliday, setSelectedHoliday] = useState<string | null>(null);
  const { language } = useLanguage();
  const { products, loading, error } = useProducts();
  const { holidays } = useHolidays();

  const upcomingHolidays = useMemo(() => getUpcomingHolidays(holidays), [holidays]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Holiday filter - if a holiday is selected, filter by its category
    if (selectedHoliday) {
      const holiday = holidays.find(h => h.id === selectedHoliday);
      if (holiday?.categoryFilter) {
        filtered = filtered.filter(p => p.category.includes(holiday.categoryFilter!));
      }
    }
    // Category filter
    else if (selectedFilter === "trending") {
      filtered = filtered.filter(p => p.trending);
    } else if (selectedFilter === "featured") {
      filtered = filtered.filter(p => p.featured);
    } else if (selectedFilter !== "all") {
      filtered = filtered.filter(p => p.category.includes(selectedFilter));
    }

    // Price filter
    if (priceRange === "under50") {
      filtered = filtered.filter(p => p.price < 50);
    } else if (priceRange === "50to100") {
      filtered = filtered.filter(p => p.price >= 50 && p.price < 100);
    } else if (priceRange === "100to200") {
      filtered = filtered.filter(p => p.price >= 100 && p.price < 200);
    } else if (priceRange === "over200") {
      filtered = filtered.filter(p => p.price >= 200);
    }

    return filtered;
  }, [selectedFilter, priceRange, selectedHoliday, products, holidays]);

  const featuredProducts = products.filter(p => p.featured);
  const trendingProducts = products.filter(p => p.trending);

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 text-sm px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              {getTranslation(language, 'updatedMonthly')}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {getTranslation(language, 'heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl text-orange-50 mb-8">
              {getTranslation(language, 'heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg">
                <TrendingUp className="mr-2" />
                {getTranslation(language, 'viewTrending')}
              </Button>
              <Button size="lg" variant="outline" className="text-lg border-2 border-white text-white hover:bg-white hover:text-orange-600">
                <Gift className="mr-2" />
                {getTranslation(language, 'viewGiftIdeas')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Holidays */}
      {upcomingHolidays.length > 0 && (
        <section className="py-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-semibold text-zinc-900">Upcoming Holidays</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant={!selectedHoliday ? "default" : "outline"}
                onClick={() => {
                  setSelectedHoliday(null);
                  setSelectedFilter("all");
                }}
                size="sm"
                className="rounded-full"
              >
                All Products
              </Button>
              {upcomingHolidays.map((holiday) => (
                <Button
                  key={holiday.id}
                  variant={selectedHoliday === holiday.id ? "default" : "outline"}
                  onClick={() => {
                    setSelectedHoliday(holiday.id);
                    setSelectedFilter("all");
                  }}
                  size="sm"
                  className="rounded-full"
                >
                  {holiday.icon} {holiday.name}
                  {holiday.date && (
                    <span className="ml-2 text-xs opacity-75">
                      {new Date(holiday.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Categories */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              variant={selectedFilter === "all" && !selectedHoliday ? "default" : "outline"}
              onClick={() => {
                setSelectedFilter("all");
                setSelectedHoliday(null);
              }}
              className="rounded-full"
            >
              {getTranslation(language, 'allProducts')}
            </Button>
            <Button
              variant={selectedFilter === "trending" ? "default" : "outline"}
              onClick={() => {
                setSelectedFilter("trending");
                setSelectedHoliday(null);
              }}
              className="rounded-full"
            >
              🔥 {getTranslation(language, 'trending')}
            </Button>
            <Button
              variant={selectedFilter === "featured" ? "default" : "outline"}
              onClick={() => {
                setSelectedFilter("featured");
                setSelectedHoliday(null);
              }}
              className="rounded-full"
            >
              ⭐ {getTranslation(language, 'featured')}
            </Button>
            {categories.map((cat) => {
              const catNameKey: keyof typeof import("@/lib/translations").translations.en =
                cat.id === 'electronics' ? 'electronics' :
                cat.id === 'home-kitchen' ? 'homeKitchen' :
                cat.id === 'toys' ? 'toys' :
                cat.id === 'trending' ? 'trendingProducts' :
                'giftIdeas';
              return (
                <Button
                  key={cat.id}
                  variant={selectedFilter === cat.id ? "default" : "outline"}
                  onClick={() => {
                    setSelectedFilter(cat.id);
                    setSelectedHoliday(null);
                  }}
                  className="rounded-full"
                >
                  {cat.icon} {getTranslation(language, catNameKey)}
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Price Filter */}
      <section className="py-4 bg-zinc-100 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-zinc-700">{getTranslation(language, 'priceRange')}</span>
            <Button
              variant={priceRange === "all" ? "default" : "ghost"}
              size="sm"
              onClick={() => setPriceRange("all")}
            >
              {getTranslation(language, 'all')}
            </Button>
            <Button
              variant={priceRange === "under50" ? "default" : "ghost"}
              size="sm"
              onClick={() => setPriceRange("under50")}
            >
              {getTranslation(language, 'under50')}
            </Button>
            <Button
              variant={priceRange === "50to100" ? "default" : "ghost"}
              size="sm"
              onClick={() => setPriceRange("50to100")}
            >
              {getTranslation(language, 'range50to100')}
            </Button>
            <Button
              variant={priceRange === "100to200" ? "default" : "ghost"}
              size="sm"
              onClick={() => setPriceRange("100to200")}
            >
              {getTranslation(language, 'range100to200')}
            </Button>
            <Button
              variant={priceRange === "over200" ? "default" : "ghost"}
              size="sm"
              onClick={() => setPriceRange("over200")}
            >
              {getTranslation(language, 'over200')}
            </Button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 mb-2">
                {selectedHoliday ? (() => {
                   const holiday = holidays.find(h => h.id === selectedHoliday);
                   return holiday ? `${holiday.icon} ${holiday.name} Gift Ideas` : getTranslation(language, 'allProductsTitle');
                 })() :
                 selectedFilter === "all" ? getTranslation(language, 'allProductsTitle') :
                 selectedFilter === "trending" ? getTranslation(language, 'trendingNow') :
                 selectedFilter === "featured" ? getTranslation(language, 'featuredProducts') :
                 (() => {
                   const catNameKey: keyof typeof import("@/lib/translations").translations.en =
                     selectedFilter === 'electronics' ? 'electronics' :
                     selectedFilter === 'home-kitchen' ? 'homeKitchen' :
                     selectedFilter === 'toys' ? 'toys' :
                     selectedFilter === 'trending' ? 'trendingProducts' :
                     'giftIdeas';
                   return getTranslation(language, catNameKey);
                 })()}
              </h2>
              <p className="text-zinc-600">
                {filteredProducts.length} {getTranslation(language, 'productsFound')}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
              <span className="ml-3 text-lg text-zinc-600">Loading products from Google Sheets...</span>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
              <p className="text-red-800 font-semibold mb-2">Error loading products</p>
              <p className="text-red-600 text-sm">{error}</p>
              <p className="text-zinc-600 text-sm mt-4">Using fallback product data</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-xl text-zinc-600 mb-4">No products found in this range</p>
                  <Button onClick={() => { setSelectedFilter("all"); setPriceRange("all"); }}>
                    View All Products
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 mb-2">
                {getTranslation(language, 'latestGuides')}
              </h2>
              <p className="text-zinc-600">
                {getTranslation(language, 'blogSubtitle')}
              </p>
            </div>
            <Button variant="outline" className="hidden md:flex">
              {getTranslation(language, 'viewAllArticles')}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {blogPosts.slice(0, 3).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          <div className="text-center md:hidden">
            <Button variant="outline">
              {getTranslation(language, 'viewAllArticles')}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Newsletter />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">500+</div>
              <div className="text-zinc-600">{getTranslation(language, 'productsReviewed')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">50K+</div>
              <div className="text-zinc-600">{getTranslation(language, 'happyShoppers')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">4.8★</div>
              <div className="text-zinc-600">{getTranslation(language, 'averageRating')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-zinc-600">{getTranslation(language, 'updatedDeals')}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
