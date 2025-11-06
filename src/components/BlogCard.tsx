"use client";

import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, Clock } from "lucide-react";
import { BlogPost } from "@/data/blog";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="group overflow-hidden h-full hover:shadow-lg transition-shadow">
        <div className="relative aspect-video overflow-hidden bg-zinc-100">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="shadow-md">
              {post.category}
            </Badge>
          </div>
        </div>

        <CardContent className="p-5">
          <h3 className="font-bold text-xl text-zinc-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
            {post.title}
          </h3>

          <p className="text-sm text-zinc-600 mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-4 text-xs text-zinc-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span suppressHydrationWarning>
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
