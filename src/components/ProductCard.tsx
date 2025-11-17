"use client";

import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Heart, Star } from "lucide-react";
import { Product, getProductLink } from "@/data/products";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/lib/translations";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [saved, setSaved] = useState(false);
  const [saveCount, setSaveCount] = useState(product.saves);
  const { language } = useLanguage();

  const handleSave = () => {
    if (saved) {
      setSaveCount(saveCount - 1);
    } else {
      setSaveCount(saveCount + 1);
    }
    setSaved(!saved);
  };

  return (
    <Card className="group overflow-hidden h-full flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.trending && (
            <Badge variant="trending" className="shadow-md">
              🔥 {getTranslation(language, 'trending')}
            </Badge>
          )}
          {product.featured && (
            <Badge variant="featured" className="shadow-md">
              ⭐ {getTranslation(language, 'featured')}
            </Badge>
          )}
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all shadow-md"
        >
          <Heart
            className={`w-5 h-5 ${saved ? 'fill-red-500 text-red-500' : 'text-zinc-600'}`}
          />
        </button>
      </div>

      <CardContent className="flex-1 flex flex-col p-4">
        {/* Title */}
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <h3 className="font-bold text-lg text-zinc-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors cursor-help">
                {product.title}
              </h3>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p className="text-sm">{product.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Description */}
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <p className="text-sm text-zinc-600 mb-3 line-clamp-2 flex-1 cursor-help">
                {product.description}
              </p>
            </TooltipTrigger>
            <TooltipContent className="max-w-sm">
              <p className="text-sm whitespace-normal">{product.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-2 mb-3">
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
        )}

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 mt-auto pt-3 border-t">
          <div>
            <p className="text-2xl font-bold text-zinc-900">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-xs text-zinc-500 flex items-center gap-1">
              <Heart className="w-3 h-3" />
              {saveCount} {getTranslation(language, 'saves')}
            </p>
          </div>
          <a
            href={getProductLink(product)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={(e) => {
              // Ensure link opens in new window even from iframe
              e.preventDefault();
              window.open(getProductLink(product), '_blank', 'noopener,noreferrer');
            }}
            className="flex-shrink-0"
          >
            <Button size="sm">
              {getTranslation(language, 'checkItOut')}
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
