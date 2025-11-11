"use client";

import Image from 'next/image';
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock } from "lucide-react";
import { BlogPost } from "@/data/blog";
import Link from "next/link";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-shadow h-full">
        <div className="aspect-video overflow-hidden bg-zinc-100">
          <Image
            src={post.image}
            alt={post.title}
            width={800}
            height={450}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="text-xs">
              {post.category}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-zinc-500">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h3 className="font-bold text-xl mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
            {post.title}
          </h3>

          <p className="text-zinc-600 line-clamp-3 mb-4">
            {post.excerpt}
          </p>

          <div className="text-sm text-zinc-500">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
