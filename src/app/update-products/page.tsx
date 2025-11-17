"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Download, Upload, FileEdit, AlertCircle, CheckCircle } from "lucide-react";

export default function UpdateProducts() {
  const [updateStatus, setUpdateStatus] = useState<"idle" | "success" | "error">("idle");

  const handleDownloadData = () => {
    // This creates a downloadable JSON file of current products
    const dataStr = `// Download current products data and update it, then use the upload feature\n// Or edit src/data/products.ts directly`;
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'products-data-instructions.txt';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-zinc-900 mb-3">
              Product Update System
            </h1>
            <p className="text-lg text-zinc-600">
              Easily update your product catalog monthly. Follow the steps below to keep your affiliate site fresh with the latest Amazon best sellers.
            </p>
          </div>

          {/* Update Methods */}
          <div className="grid gap-6 mb-8">
            {/* Method 1: Direct File Edit */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileEdit className="w-5 h-5 text-orange-600" />
                  Method 1: Direct File Editing (Recommended)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-semibold text-zinc-900 mb-2">Quick Steps:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-700">
                    <li>Navigate to: <code className="bg-white px-2 py-1 rounded text-orange-600 font-mono">src/data/products.ts</code></li>
                    <li>Update product information (title, description, price, image, amazonLink)</li>
                    <li>Add new products by copying the product object format</li>
                    <li>Remove outdated products from the array</li>
                    <li>Save the file - changes will appear immediately!</li>
                  </ol>
                </div>

                <div className="bg-zinc-100 rounded-lg p-4">
                  <h4 className="font-semibold text-zinc-900 mb-2">Product Object Format:</h4>
                  <pre className="text-xs overflow-x-auto bg-white p-3 rounded border">
{`{
  id: "unique-id",
  title: "Product Name",
  description: "Detailed product description...",
  price: 99.99,
  image: "https://images.unsplash.com/...",
  category: ["electronics", "trending"],
  amazonLink: "YOUR_AFFILIATE_LINK_HERE",
  saves: 245,
  featured: true,
  trending: true,
  rating: 4.8,
  reviewCount: 1523
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Method 2: Blog Updates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileEdit className="w-5 h-5 text-blue-600" />
                  Method 2: Update Blog Posts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-zinc-600">
                  Keep your content fresh by updating blog posts monthly:
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-700">
                    <li>Navigate to: <code className="bg-white px-2 py-1 rounded text-blue-600 font-mono">src/data/blog.ts</code></li>
                    <li>Add new blog posts with latest product reviews</li>
                    <li>Update dates to current month/year</li>
                    <li>Use high-quality images from Unsplash</li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            {/* Tips & Best Practices */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-green-600" />
                  Monthly Update Checklist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-700">Check Amazon for current best sellers in each category</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-700">Update prices to match current Amazon listings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-700">Replace your affiliate links with fresh Amazon Associate links</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-700">Update product ratings and review counts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-700">Mark trending products with `trending: true`</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-700">Add 3-5 new products and remove outdated ones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-700">Write at least 1 new blog post per month</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Image Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Finding Product Images</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-zinc-600">
                  Use these resources for high-quality product images:
                </p>
                <div className="grid gap-3">
                  <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg">
                    <div>
                      <h5 className="font-semibold">Unsplash</h5>
                      <p className="text-sm text-zinc-600">Free high-quality stock photos</p>
                    </div>
                    <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="outline">Visit</Button>
                    </a>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg">
                    <div>
                      <h5 className="font-semibold">Amazon Images</h5>
                      <p className="text-sm text-zinc-600">Use official product images from Amazon</p>
                    </div>
                    <Badge>Recommended</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Need Help?</h3>
              <p className="mb-4 text-orange-50">
                If you're not comfortable editing code files directly, consider hiring a developer to set up a CMS (Content Management System) or automated update system for you.
              </p>
              <div className="flex gap-3">
                <Button variant="secondary">
                  View Documentation
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
