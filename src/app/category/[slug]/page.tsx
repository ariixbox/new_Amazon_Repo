"use client";

import { use } from "react";
import ProductCard from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { Loader2 } from "lucide-react";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { products, loading: productsLoading, error: productsError } = useProducts();
  const { categories, loading: categoriesLoading } = useCategories();

  const category = categories.find(c => c.id === slug);

  // If categories are still loading, show loading state
  if (categoriesLoading || productsLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
            <span className="ml-3 text-lg text-zinc-600">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  // If category not found after loading, show 404
  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter(p => p.category.includes(slug));

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Badge variant="secondary" className="mb-4 text-lg px-4 py-2">
            {category.icon} {category.name}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
            Best {category.name}
          </h1>
          <p className="text-lg text-zinc-600">
            Discover our curated selection of {categoryProducts.length} top-rated products in {category.name.toLowerCase()}
          </p>
        </div>

        {/* Products Grid */}
        {productsError ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <p className="text-red-800 font-semibold mb-2">Error loading products</p>
            <p className="text-red-600 text-sm">{productsError}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {categoryProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-zinc-600">No products found in this category</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
