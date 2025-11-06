import Link from "next/link";
import { Gift, Mail, Twitter, Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-900 text-zinc-300 pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-2 rounded-lg">
                <Gift className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">BestDeals</h3>
                <p className="text-xs text-zinc-400">Amazon Finds</p>
              </div>
            </div>
            <p className="text-sm text-zinc-400 mb-4">
              Your trusted source for the best Amazon products. We curate and review top-rated items to help you make smart shopping decisions.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-orange-600 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-orange-600 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-orange-600 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-orange-600 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/category/electronics" className="hover:text-orange-500 transition-colors">Electronics</Link></li>
              <li><Link href="/category/home-kitchen" className="hover:text-orange-500 transition-colors">Home & Kitchen</Link></li>
              <li><Link href="/category/toys" className="hover:text-orange-500 transition-colors">Toys</Link></li>
              <li><Link href="/category/trending" className="hover:text-orange-500 transition-colors">Trending Products</Link></li>
              <li><Link href="/category/gift-ideas" className="hover:text-orange-500 transition-colors">Gift Ideas</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog" className="hover:text-orange-500 transition-colors">Blog & Guides</Link></li>
              <li><Link href="/comparison" className="hover:text-orange-500 transition-colors">Product Comparison</Link></li>
              <li><Link href="/about" className="hover:text-orange-500 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-orange-500 transition-colors">Contact</Link></li>
              <li><Link href="/update-products" className="hover:text-orange-500 transition-colors">Update System</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-orange-500 transition-colors">Terms of Service</Link></li>
              <li><Link href="/affiliate-disclosure" className="hover:text-orange-500 transition-colors">Affiliate Disclosure</Link></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-zinc-800 pt-6 mb-6">
          <div className="bg-zinc-800 rounded-lg p-4 text-sm text-zinc-400">
            <p className="mb-2">
              <strong className="text-zinc-300">Affiliate Disclosure:</strong> BestDeals is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
            </p>
            <p>
              Prices and availability are subject to change. We make every effort to provide accurate information, but we cannot guarantee all product details or prices shown are correct.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-zinc-500 border-t border-zinc-800 pt-6">
          <p>&copy; {currentYear} BestDeals. All rights reserved. Made with passion for great products.</p>
        </div>
      </div>
    </footer>
  );
}
