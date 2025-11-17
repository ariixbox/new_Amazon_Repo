"use client";

import { useState } from "react";
import { getProductLink } from "@/data/products";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Star, Check, X, Loader2 } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";

export default function Comparison() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const maxComparison = 4;
  const { products, loading, error } = useProducts();

  const toggleProduct = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else if (selectedProducts.length < maxComparison) {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const comparisonProducts = products.filter(p => selectedProducts.includes(p.id));
  const availableProducts = products.filter(p => !selectedProducts.includes(p.id));

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-zinc-900 mb-3">
            Product Comparison
          </h1>
          <p className="text-lg text-zinc-600">
            Compare up to {maxComparison} products side-by-side to make the best buying decision
          </p>
        </div>

        {/* Product Selection */}
        {selectedProducts.length < maxComparison && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="font-bold text-xl mb-4">
                Select Products to Compare ({selectedProducts.length}/{maxComparison})
              </h3>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-orange-600" />
                  <span className="ml-3 text-zinc-600">Loading products...</span>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <p className="text-red-800 font-semibold">Error loading products</p>
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {availableProducts.slice(0, 8).map(product => (
                    <button
                      key={product.id}
                      onClick={() => toggleProduct(product.id)}
                      className="text-left p-3 rounded-lg border-2 border-zinc-200 hover:border-orange-500 transition-colors"
                    >
                      <div className="relative aspect-square mb-2 rounded overflow-hidden bg-zinc-100">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-sm font-semibold line-clamp-2">{product.title}</p>
                      <p className="text-orange-600 font-bold mt-1">${product.price}</p>
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Comparison Table */}
        {comparisonProducts.length > 0 && (
          <div className="overflow-x-auto">
            <Card>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="p-4 text-left bg-zinc-50 font-bold sticky left-0 z-10">
                        Feature
                      </th>
                      {comparisonProducts.map(product => (
                        <th key={product.id} className="p-4 min-w-[250px] bg-zinc-50">
                          <div className="relative aspect-square mb-3 rounded overflow-hidden bg-zinc-100">
                            <Image
                              src={product.image}
                              alt={product.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <h3 className="font-bold text-sm mb-2 line-clamp-2">
                            {product.title}
                          </h3>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleProduct(product.id)}
                            className="w-full"
                          >
                            Remove
                          </Button>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Price */}
                    <tr className="border-b hover:bg-zinc-50">
                      <td className="p-4 font-semibold sticky left-0 bg-white">
                        Price
                      </td>
                      {comparisonProducts.map(product => (
                        <td key={product.id} className="p-4 text-center">
                          <span className="text-2xl font-bold text-orange-600">
                            ${product.price.toFixed(2)}
                          </span>
                        </td>
                      ))}
                    </tr>

                    {/* Rating */}
                    <tr className="border-b hover:bg-zinc-50">
                      <td className="p-4 font-semibold sticky left-0 bg-white">
                        Rating
                      </td>
                      {comparisonProducts.map(product => (
                        <td key={product.id} className="p-4 text-center">
                          {product.rating ? (
                            <div className="flex flex-col items-center gap-1">
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < Math.floor(product.rating!)
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-zinc-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-zinc-600">
                                {product.rating} ({product.reviewCount?.toLocaleString()})
                              </span>
                            </div>
                          ) : (
                            <span className="text-zinc-400">N/A</span>
                          )}
                        </td>
                      ))}
                    </tr>

                    {/* Categories */}
                    <tr className="border-b hover:bg-zinc-50">
                      <td className="p-4 font-semibold sticky left-0 bg-white">
                        Categories
                      </td>
                      {comparisonProducts.map(product => (
                        <td key={product.id} className="p-4">
                          <div className="flex flex-wrap gap-1 justify-center">
                            {product.category.map(cat => (
                              <Badge key={cat} variant="secondary" className="text-xs">
                                {cat}
                              </Badge>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>

                    {/* Trending */}
                    <tr className="border-b hover:bg-zinc-50">
                      <td className="p-4 font-semibold sticky left-0 bg-white">
                        Trending
                      </td>
                      {comparisonProducts.map(product => (
                        <td key={product.id} className="p-4 text-center">
                          {product.trending ? (
                            <Check className="w-6 h-6 text-green-600 mx-auto" />
                          ) : (
                            <X className="w-6 h-6 text-zinc-300 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>

                    {/* Featured */}
                    <tr className="border-b hover:bg-zinc-50">
                      <td className="p-4 font-semibold sticky left-0 bg-white">
                        Featured
                      </td>
                      {comparisonProducts.map(product => (
                        <td key={product.id} className="p-4 text-center">
                          {product.featured ? (
                            <Check className="w-6 h-6 text-green-600 mx-auto" />
                          ) : (
                            <X className="w-6 h-6 text-zinc-300 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>

                    {/* Description */}
                    <tr className="border-b hover:bg-zinc-50">
                      <td className="p-4 font-semibold sticky left-0 bg-white">
                        Description
                      </td>
                      {comparisonProducts.map(product => (
                        <td key={product.id} className="p-4">
                          <p className="text-sm text-zinc-600">
                            {product.description}
                          </p>
                        </td>
                      ))}
                    </tr>

                    {/* Saves */}
                    <tr className="border-b hover:bg-zinc-50">
                      <td className="p-4 font-semibold sticky left-0 bg-white">
                        Community Saves
                      </td>
                      {comparisonProducts.map(product => (
                        <td key={product.id} className="p-4 text-center">
                          <span className="font-bold text-lg">{product.saves}</span>
                          <span className="text-sm text-zinc-600"> saves</span>
                        </td>
                      ))}
                    </tr>

                    {/* Action */}
                    <tr>
                      <td className="p-4 font-semibold sticky left-0 bg-white">

                      </td>
                      {comparisonProducts.map(product => (
                        <td key={product.id} className="p-4 text-center">
                          <a
                            href={getProductLink(product)}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            onClick={(e) => {
                              e.preventDefault();
                              window.open(getProductLink(product), '_blank', 'noopener,noreferrer');
                            }}
                          >
                            <Button className="w-full">
                              Check It Out
                            </Button>
                          </a>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        )}

        {comparisonProducts.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <h3 className="text-2xl font-bold text-zinc-900 mb-3">
                No Products Selected
              </h3>
              <p className="text-zinc-600 mb-6">
                Select products above to start comparing
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
