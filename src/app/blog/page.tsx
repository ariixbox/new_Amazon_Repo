"use client";

import { useBlog } from "@/hooks/useBlog";
import BlogCard from "@/components/BlogCard";
import { Newspaper, Loader2, AlertCircle } from "lucide-react";

export default function Blog() {
  const { blogPosts, loading, error, fromGoogleSheets } = useBlog();

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mb-6">
            <Newspaper className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4">
            Blog & Buying Guides
          </h1>
          <p className="text-lg text-zinc-600">
            Expert product reviews, buying guides, and shopping tips to help you make informed purchase decisions
          </p>


        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-12 h-12 text-orange-600 animate-spin mb-4" />
            <p className="text-zinc-600">Loading blog posts...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-900 mb-2">Failed to Load Blog Posts</h3>
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Blog Grid */}
        {!loading && !error && blogPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && blogPosts.length === 0 && (
          <div className="max-w-2xl mx-auto bg-zinc-100 rounded-lg p-12 text-center">
            <Newspaper className="w-16 h-16 text-zinc-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-zinc-900 mb-2">No Blog Posts Found</h3>
            <p className="text-zinc-600">
              Add blog posts to your Google Sheet to see them here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
