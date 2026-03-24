import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { id: 'asc' },
  });
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();

  const newProduct = await prisma.product.create({
    data: {
      ...body,
      price: parseFloat(body.price),
      stock: parseInt(body.stock),
    },
  });

  return NextResponse.json(newProduct, { status: 201 });
}
