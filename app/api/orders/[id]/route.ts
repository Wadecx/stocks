import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id: parseInt(id) },
    include: {
      products: true,
    },
  });

  if (!order) {
    return NextResponse.json({ error: 'Commande non trouvée' }, { status: 404 });
  }

  return NextResponse.json({
    ...order,
    products: order.products.map(op => ({
      productId: op.productId,
      quantity: op.quantity,
      price: op.price,
    })),
  });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  try {
    const order = await prisma.order.update({
      where: { id: parseInt(id) },
      data: {
        status: body.status,
      },
      include: {
        products: true,
      },
    });

    return NextResponse.json({
      ...order,
      products: order.products.map(op => ({
        productId: op.productId,
        quantity: op.quantity,
        price: op.price,
      })),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Commande non trouvée' }, { status: 404 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await prisma.order.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Commande supprimée avec succès' });
  } catch (error) {
    return NextResponse.json({ error: 'Commande non trouvée' }, { status: 404 });
  }
}
