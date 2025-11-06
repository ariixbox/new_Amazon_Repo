import { blogPosts } from "@/data/blog";
import BlogCard from "@/components/BlogCard";
import { Newspaper } from "lucide-react";

export default function Blog() {
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

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
