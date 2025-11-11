"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// All Judaica tags organized by category
const JUDAICA_FILTERS = {
  holidays: [
    { id: "hanukkah", name: "Hanukkah", icon: "🕎" },
    { id: "passover", name: "Passover", icon: "🍷" },
    { id: "purim", name: "Purim", icon: "🎭" },
    { id: "rosh-hashanah", name: "Rosh Hashanah", icon: "🍎" },
    { id: "yom-kippur", name: "Yom Kippur", icon: "📖" },
    { id: "sukkot", name: "Sukkot", icon: "🏡" },
    { id: "shavuot", name: "Shavuot", icon: "📜" },
    { id: "shabbat", name: "Shabbat", icon: "🕯️" },
  ],
  lifeEvents: [
    { id: "bar-mitzvah", name: "Bar Mitzvah", icon: "🎉" },
    { id: "bat-mitzvah", name: "Bat Mitzvah", icon: "🎉" },
    { id: "wedding", name: "Wedding", icon: "💍" },
    { id: "brit-milah", name: "Brit Milah", icon: "👶" },
    { id: "baby-naming", name: "Baby Naming", icon: "👶" },
  ],
  productTypes: [
    { id: "home-decor", name: "Home Décor", icon: "🏠" },
    { id: "jewelry", name: "Jewelry", icon: "💎" },
    { id: "books", name: "Books", icon: "📚" },
    { id: "kids", name: "Kids & Family", icon: "👨‍👩‍👧‍👦" },
    { id: "gifts", name: "Gift Ideas", icon: "🎁" },
    { id: "kitchen", name: "Kitchen", icon: "🍽️" },
    { id: "art", name: "Art", icon: "🖼️" },
    { id: "clothing", name: "Clothing", icon: "👕" },
  ],
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeFilterSection, setActiveFilterSection] = useState<"holidays" | "lifeEvents" | "productTypes" | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products', {
          cache: 'no-store',
        });
        const data = await response.json();

        if (data.success && data.products) {
          // Filter by category
          const categoryProducts = data.products.filter((p: Product) =>
            p.category.includes(slug)
          );
          setProducts(categoryProducts);
          setFilteredProducts(categoryProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [slug]);

  // Filter by selected tags
  useEffect(() => {
    if (selectedTags.length === 0) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(p => 
        selectedTags.some(tag => p.tags?.includes(tag))
      );
      setFilteredProducts(filtered);
    }
  }, [selectedTags, products]);

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId)
        ? prev.filter(t => t !== tagId)
        : [...prev, tagId]
    );
  };

  const clearAllFilters = () => {
    setSelectedTags([]);
  };

  const categoryName = slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const isJudaica = slug === "judaica";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="container mx-auto px-4">
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-zinc-900 mb-2">
            {categoryName}
          </h1>
          <p className="text-zinc-600">
            {filteredProducts.length} products found
            {selectedTags.length > 0 && ` (${selectedTags.length} filter${selectedTags.length > 1 ? 's' : ''} active)`}
          </p>
        </div>

        {/* Filters (only for Judaica) */}
        {isJudaica && (
          <div className="mb-8 bg-white rounded-lg shadow-sm border p-6">
            {/* Filter Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-zinc-900">
                Filter Products
              </h2>
              {selectedTags.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-orange-600 hover:text-orange-700"
                >
                  Clear All Filters
                </Button>
              )}
            </div>

            {/* Holidays Section */}
            <div className="mb-6">
              <button
                onClick={() => setActiveFilterSection(
                  activeFilterSection === "holidays" ? null : "holidays"
                )}
                className="flex items-center justify-between w-full text-left font-medium text-zinc-900 mb-3 hover:text-orange-600 transition-colors"
              >
                <span className="text-base">🕎 Jewish Holidays</span>
                <span className="text-zinc-400">
                  {activeFilterSection === "holidays" ? "−" : "+"}
                </span>
              </button>
              {(activeFilterSection === "holidays" || activeFilterSection === null) && (
                <div className="flex flex-wrap gap-2 ml-6">
                  {JUDAICA_FILTERS.holidays.map((filter) => (
                    <Button
                      key={filter.id}
                      variant={selectedTags.includes(filter.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleTag(filter.id)}
                      className="gap-2"
                    >
                      <span>{filter.icon}</span>
                      <span>{filter.name}</span>
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* Life Events Section */}
            <div className="mb-6">
              <button
                onClick={() => setActiveFilterSection(
                  activeFilterSection === "lifeEvents" ? null : "lifeEvents"
                )}
                className="flex items-center justify-between w-full text-left font-medium text-zinc-900 mb-3 hover:text-orange-600 transition-colors"
              >
                <span className="text-base">🎉 Life Events & Celebrations</span>
                <span className="text-zinc-400">
                  {activeFilterSection === "lifeEvents" ? "−" : "+"}
                </span>
              </button>
              {(activeFilterSection === "lifeEvents" || activeFilterSection === null) && (
                <div className="flex flex-wrap gap-2 ml-6">
                  {JUDAICA_FILTERS.lifeEvents.map((filter) => (
                    <Button
                      key={filter.id}
                      variant={selectedTags.includes(filter.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleTag(filter.id)}
                      className="gap-2"
                    >
                      <span>{filter.icon}</span>
                      <span>{filter.name}</span>
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Types Section */}
            <div>
              <button
                onClick={() => setActiveFilterSection(
                  activeFilterSection === "productTypes" ? null : "productTypes"
                )}
                className="flex items-center justify-between w-full text-left font-medium text-zinc-900 mb-3 hover:text-orange-600 transition-colors"
              >
                <span className="text-base">📦 Product Types</span>
                <span className="text-zinc-400">
                  {activeFilterSection === "productTypes" ? "−" : "+"}
                </span>
              </button>
              {(activeFilterSection === "productTypes" || activeFilterSection === null) && (
                <div className="flex flex-wrap gap-2 ml-6">
                  {JUDAICA_FILTERS.productTypes.map((filter) => (
                    <Button
                      key={filter.id}
                      variant={selectedTags.includes(filter.id) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleTag(filter.id)}
                      className="gap-2"
                    >
                      <span>{filter.icon}</span>
                      <span>{filter.name}</span>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-zinc-600 mb-4">
              No products found {selectedTags.length > 0 ? 'with selected filters' : 'in this category'}.
            </p>
            {selectedTags.length > 0 && (
              <Button onClick={clearAllFilters} variant="outline">
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
