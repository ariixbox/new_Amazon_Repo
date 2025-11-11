"use client";

import Image from 'next/image';
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Bookmark } from "lucide-react";
import { Product, getProductLink } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <a href={getProductLink(product)} target="_blank" rel="noopener noreferrer">
        <div className="aspect-square overflow-hidden bg-zinc-100">
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-orange-600 transition-colors">
              {product.title}
            </h3>
          </div>

          <p className="text-sm text-zinc-600 line-clamp-2 mb-3">
            {product.description}
          </p>

          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-orange-600">
              ${product.price.toFixed(2)}
            </span>
            {product.rating && (
              <div className="flex items-center gap-1 text-sm">
                <span className="text-yellow-500">★</span>
                <span className="font-medium">{product.rating}</span>
                {product.reviewCount && (
                  <span className="text-zinc-500">({product.reviewCount.toLocaleString()})</span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mb-3">
            {product.featured && (
              <Badge variant="featured" className="text-xs">
                Featured
              </Badge>
            )}
            {product.trending && (
              <Badge variant="trending" className="text-xs">
                Trending
              </Badge>
            )}
          </div>

          <Button className="w-full" size="sm">
            View on Amazon
          </Button>

          {product.saves > 0 && (
            <div className="mt-3 flex items-center gap-1 text-sm text-zinc-500">
              <Bookmark className="w-4 h-4" />
              <span>{product.saves.toLocaleString()} saves</span>
            </div>
          )}
        </CardContent>
      </a>
    </Card>
  );
}
