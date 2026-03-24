import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const orders = await prisma.order.findMany({
    include: {
      products: true,
    },
    orderBy: { id: 'desc' },
  });

  return NextResponse.json(orders.map(order => ({
    ...order,
    products: order.products.map(op => ({
      productId: op.productId,
      quantity: op.quantity,
      price: op.price,
    })),
  })));
}

export async function POST(request: Request) {
  const body = await request.json();

  const newOrder = await prisma.order.create({
    data: {
      clientId: body.clientId,
      status: body.status,
      total: body.total,
      date: new Date().toISOString().split('T')[0],
      products: {
        create: body.products.map((p: any) => ({
          productId: p.productId,
          quantity: p.quantity,
          price: p.price,
        })),
      },
    },
    include: {
      products: true,
    },
  });

  return NextResponse.json({
    ...newOrder,
    products: newOrder.products.map(op => ({
      productId: op.productId,
      quantity: op.quantity,
      price: op.price,
    })),
  }, { status: 201 });
}
