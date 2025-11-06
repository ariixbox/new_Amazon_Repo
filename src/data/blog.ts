export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Top 10 Smart Home Gadgets That Will Transform Your Living Space",
    slug: "top-10-smart-home-gadgets",
    excerpt: "Discover the latest smart home devices that make your life easier, from voice-activated assistants to automated lighting systems.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop",
    category: "Home & Kitchen",
    date: "2025-10-15",
    readTime: "5 min read"
  },
  {
    id: "2",
    title: "Best Noise-Cancelling Headphones: A Comprehensive Buyer's Guide",
    slug: "best-noise-cancelling-headphones-guide",
    excerpt: "Everything you need to know before buying noise-cancelling headphones, including features to look for and our top recommendations.",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=600&fit=crop",
    category: "Electronics",
    date: "2025-10-20",
    readTime: "7 min read"
  },
  {
    id: "3",
    title: "Perfect Gift Ideas for Every Occasion and Budget",
    slug: "perfect-gift-ideas-guide",
    excerpt: "Struggling to find the perfect gift? Our curated list has something special for everyone, whether it's a birthday, anniversary, or holiday.",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&h=600&fit=crop",
    category: "Gift Ideas",
    date: "2025-10-25",
    readTime: "6 min read"
  },
  {
    id: "4",
    title: "Educational Toys That Make Learning Fun for Kids",
    slug: "educational-toys-for-kids",
    excerpt: "Explore the best STEM toys and educational games that combine fun with learning, helping children develop critical thinking skills.",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&h=600&fit=crop",
    category: "Toys",
    date: "2025-10-28",
    readTime: "5 min read"
  },
  {
    id: "5",
    title: "Kitchen Gadgets That Will Make You Love Cooking Again",
    slug: "must-have-kitchen-gadgets",
    excerpt: "From air fryers to smart coffee makers, these innovative kitchen tools will revolutionize your cooking experience and save you time.",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=600&fit=crop",
    category: "Home & Kitchen",
    date: "2025-11-01",
    readTime: "8 min read"
  },
  {
    id: "6",
    title: "Trending Tech Products You Need to See This Month",
    slug: "trending-tech-products-november",
    excerpt: "Stay ahead of the curve with our roundup of the hottest tech products that are taking the market by storm this month.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop",
    category: "Electronics",
    date: "2025-11-05",
    readTime: "4 min read"
  }
];
