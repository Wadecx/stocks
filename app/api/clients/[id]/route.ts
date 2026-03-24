import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const client = await prisma.client.findUnique({
    where: { id: parseInt(id) },
  });

  if (!client) {
    return NextResponse.json({ error: 'Client non trouvé' }, { status: 404 });
  }

  return NextResponse.json(client);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  try {
    const client = await prisma.client.update({
      where: { id: parseInt(id) },
      data: body,
    });

    return NextResponse.json(client);
  } catch (error) {
    return NextResponse.json({ error: 'Client non trouvé' }, { status: 404 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const hasOrders = await prisma.order.count({
    where: { clientId: parseInt(id) },
  });

  if (hasOrders > 0) {
    return NextResponse.json(
      { error: 'Impossible de supprimer un client ayant des commandes' },
      { status: 400 }
    );
  }

  try {
    await prisma.client.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Client supprimé avec succès' });
  } catch (error) {
    return NextResponse.json({ error: 'Client non trouvé' }, { status: 404 });
  }
}
