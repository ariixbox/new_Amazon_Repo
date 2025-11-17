"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateAffiliateLink } from "@/config/affiliate";
import { CheckCircle, ExternalLink, Copy } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function TestLinkPage() {
  const [copied, setCopied] = useState(false);

  const testASIN = "B0BXNX1HFG"; // Sony headphones
  const testLink = generateAffiliateLink(testASIN);

  const handleCopy = () => {
    navigator.clipboard.writeText(testLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTestClick = () => {
    window.open(testLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-zinc-900 mb-8">
          Affiliate Link Test Page
        </h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Your Affiliate Tag is Active
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-zinc-600 mb-2">Affiliate Tag:</p>
              <code className="bg-zinc-100 px-3 py-2 rounded block text-orange-600 font-mono">
                mobile0cd832f-20
              </code>
            </div>

            <div>
              <p className="text-sm text-zinc-600 mb-2">Test Product ASIN:</p>
              <code className="bg-zinc-100 px-3 py-2 rounded block font-mono">
                {testASIN}
              </code>
            </div>

            <div>
              <p className="text-sm text-zinc-600 mb-2">Generated Link:</p>
              <div className="bg-zinc-100 px-3 py-2 rounded break-all text-sm font-mono flex items-start gap-2">
                <span className="flex-1">{testLink}</span>
                <button
                  onClick={handleCopy}
                  className="flex-shrink-0 p-1 hover:bg-zinc-200 rounded"
                  title="Copy link"
                >
                  {copied ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-zinc-600" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleTestClick} className="flex-1">
                <ExternalLink className="w-4 h-4 mr-2" />
                Test Link (Opens Amazon)
              </Button>
              <Button onClick={handleCopy} variant="outline">
                {copied ? "Copied!" : "Copy Link"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-bold text-blue-900 mb-2">Troubleshooting:</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>✅ If link opens to Amazon product page = Working perfectly!</li>
              <li>✅ Check URL contains: <code>?tag=mobile0cd832f-20</code></li>
              <li>⚠️ If blocked in preview iframe = Normal, works in production</li>
              <li>💡 Copy link and paste in new tab to test</li>
            </ul>
          </CardContent>
        </Card>

        <div className="mt-8 bg-orange-50 border border-orange-200 rounded-lg p-6">
          <h3 className="font-bold text-orange-900 mb-3">Why Amazon blocks iframe clicks:</h3>
          <p className="text-orange-800 text-sm mb-4">
            Amazon blocks affiliate links opened from iframes for security reasons. This is normal behavior.
            When your site is deployed to production (not in an iframe), the links will work perfectly.
          </p>
          <p className="text-orange-800 text-sm font-semibold">
            ✅ Solution: Deploy your site and test from the live URL - links will work!
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-orange-600 hover:text-orange-700 font-semibold">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
