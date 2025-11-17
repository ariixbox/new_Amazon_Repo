"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  RefreshCw,
  ExternalLink,
  Copy,
  AlertCircle,
  FileSpreadsheet,
  Database,
  Loader2
} from "lucide-react";
import { GOOGLE_SHEET_CONFIG } from "@/config/googleSheets";
import { useProducts } from "@/hooks/useProducts";

export default function AdminPage() {
  const { products, loading, error, source, fromGoogleSheets, refetch } = useProducts();
  const [copied, setCopied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefresh = async (clearCache = true) => {
    setRefreshing(true);
    refetch(clearCache);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const sheetUrl = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_CONFIG.sheetId}/edit`;
  const csvUrl = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_CONFIG.sheetId}/gviz/tq?tqx=out:csv&sheet=${GOOGLE_SHEET_CONFIG.sheetName}`;

  const isConfigured = GOOGLE_SHEET_CONFIG.sheetId &&
                       !GOOGLE_SHEET_CONFIG.sheetId.includes('example') &&
                       !GOOGLE_SHEET_CONFIG.sheetId.includes('REPLACE');

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-zinc-900 mb-3">
            Admin Dashboard
          </h1>
          <p className="text-lg text-zinc-600">
            Manage your Google Sheets backend and monitor product data
          </p>
        </div>

        {/* Connection Status */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Google Sheets Connection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Configuration Status */}
              <div className="bg-zinc-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  {isConfigured ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className="font-semibold">
                    {isConfigured ? 'Sheet Configured' : 'Not Configured'}
                  </span>
                </div>
                <p className="text-sm text-zinc-600">
                  {isConfigured
                    ? 'Sheet ID is set in configuration'
                    : 'Please configure your Google Sheet ID'}
                </p>
              </div>

              {/* Data Loading Status */}
              <div className="bg-zinc-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  {loading ? (
                    <Loader2 className="w-5 h-5 text-orange-600 animate-spin" />
                  ) : error ? (
                    <XCircle className="w-5 h-5 text-red-600" />
                  ) : products.length > 0 ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                  )}
                  <span className="font-semibold">
                    {loading ? 'Loading...' : error ? 'Error' : products.length > 0 ? 'Data Loaded' : 'No Data'}
                  </span>
                </div>
                <p className="text-sm text-zinc-600">
                  {loading
                    ? 'Fetching products from sheet...'
                    : error
                    ? error
                    : `${products.length} products loaded`}
                </p>
              </div>
            </div>

            {/* Data Source Indicator */}
            {!loading && products.length > 0 && (
              <div className={`mt-4 p-4 rounded-lg border-2 ${
                fromGoogleSheets
                  ? 'bg-green-50 border-green-200'
                  : 'bg-yellow-50 border-yellow-200'
              }`}>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    {fromGoogleSheets ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="font-semibold text-green-900">
                            ✅ Live Data from Google Sheets
                          </div>
                          <div className="text-sm text-green-700">
                            Your site is showing {products.length} products from your Google Sheet
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                        <div className="flex-1">
                          <div className="font-semibold text-yellow-900">
                            ⚠️ Using Fallback Data (16 Products)
                          </div>
                          <div className="text-sm text-yellow-700 mb-2">
                            Google Sheets data couldn't load. Using demo products instead.
                          </div>
                          <div className="text-sm text-yellow-800 font-medium">
                            Fix: Make sure your Google Sheet is publicly viewable and published to web
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Current Configuration */}
            <div className="space-y-3 pt-4 border-t">
              <div>
                <label className="text-sm font-semibold text-zinc-700 mb-1 block">
                  Sheet ID:
                </label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-white px-3 py-2 rounded border text-sm font-mono break-all">
                    {GOOGLE_SHEET_CONFIG.sheetId}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopy(GOOGLE_SHEET_CONFIG.sheetId)}
                  >
                    {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-zinc-700 mb-1 block">
                  Sheet Name:
                </label>
                <code className="bg-white px-3 py-2 rounded border text-sm font-mono block">
                  {GOOGLE_SHEET_CONFIG.sheetName}
                </code>
              </div>

              <div>
                <label className="text-sm font-semibold text-zinc-700 mb-1 block">
                  Cache Duration:
                </label>
                <code className="bg-white px-3 py-2 rounded border text-sm font-mono block">
                  {GOOGLE_SHEET_CONFIG.cacheDuration / 1000 / 60} minutes
                </code>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4 border-t">
              <a
                href={sheetUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="default" className="w-full">
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Open Sheet
                  <ExternalLink className="w-3 h-3 ml-2" />
                </Button>
              </a>

              <a
                href={csvUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="w-full">
                  <Database className="w-4 h-4 mr-2" />
                  View CSV Data
                  <ExternalLink className="w-3 h-3 ml-2" />
                </Button>
              </a>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleRefresh(true)}
                disabled={refreshing}
              >
                {refreshing ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Clear Cache & Refresh
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Product Statistics */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Product Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">
                  {products.length}
                </div>
                <div className="text-sm text-zinc-600">Total Products</div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {products.filter(p => p.featured).length}
                </div>
                <div className="text-sm text-zinc-600">Featured</div>
              </div>

              <div className="bg-red-50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-red-600 mb-1">
                  {products.filter(p => p.trending).length}
                </div>
                <div className="text-sm text-zinc-600">Trending</div>
              </div>

              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {new Set(products.flatMap(p => p.category)).size}
                </div>
                <div className="text-sm text-zinc-600">Categories</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Setup Instructions */}
        {!isConfigured && (
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-900">
                <AlertCircle className="w-5 h-5" />
                Setup Required
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-orange-800">
                Your Google Sheet is not configured yet. Follow these steps:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-sm text-orange-900">
                <li>Create or import your Google Sheet</li>
                <li>Publish it to the web (File → Share → Publish to web)</li>
                <li>Copy your Sheet ID from the URL</li>
                <li>Update <code className="bg-white px-2 py-1 rounded">src/lib/googleSheets.ts</code></li>
                <li>Refresh this page</li>
              </ol>
              <div className="flex gap-3 pt-3">
                <a
                  href="/GOOGLE-SHEETS-QUICKSTART.md"
                  target="_blank"
                  className="flex-1"
                >
                  <Button variant="default" className="w-full">
                    Quick Start Guide
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </Button>
                </a>
                <a
                  href="/GOOGLE-SHEETS-SETUP.md"
                  target="_blank"
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full">
                    Full Documentation
                    <ExternalLink className="w-3 h-3 ml-2" />
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Product Preview */}
        {products.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {products.slice(0, 5).map(product => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 p-3 bg-zinc-50 rounded-lg"
                  >
                    <div className="w-16 h-16 rounded overflow-hidden bg-zinc-200 flex-shrink-0">
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm truncate">
                        {product.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-orange-600 font-bold">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.rating && (
                          <span className="text-xs text-zinc-600">
                            ⭐ {product.rating}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
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
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* API Endpoint Test */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>API Endpoint</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-zinc-600">
              Test your products API endpoint directly:
            </p>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-white px-3 py-2 rounded border text-sm font-mono">
                /api/products
              </code>
              <a href="/api/products" target="_blank">
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Test API
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
