import { NextResponse } from 'next/server';
import { loadProducts } from '@/data/products';

export const dynamic = 'force-dynamic';
export const revalidate = 300; // Revalidate every 5 minutes

export async function GET() {
  try {
    const products = await loadProducts();

    return NextResponse.json({
      success: true,
      products,
      count: products.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in products API:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to load products',
        products: [],
        count: 0,
      },
      { status: 500 }
    );
  }
}
