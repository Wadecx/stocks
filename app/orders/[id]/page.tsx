'use client';

import { useEffect, useState } from 'react';
import { use } from 'react';
import Link from 'next/link';
import { Order, Client, Product } from '@/types';

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [orderRes, clientsRes, productsRes] = await Promise.all([
        fetch(`/api/orders/${id}`),
        fetch('/api/clients'),
        fetch('/api/products'),
      ]);

      const orderData = await orderRes.json();
      const clientsData = await clientsRes.json();
      const productsData = await productsRes.json();

      setOrder(orderData);
      setClient(clientsData.find((c: Client) => c.id === orderData.clientId));
      setProducts(productsData);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Chargement...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-xl text-red-600">Commande non trouvée</p>
          <Link href="/orders" className="text-blue-600 hover:underline mt-4 inline-block">
            Retour à la liste
          </Link>
        </div>
      </div>
    );
  }

  const getProductName = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    return product ? product.name : 'Produit inconnu';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Commande #{order.id}
        </h1>
        <div className="space-x-4">
          <Link
            href={`/orders/${id}/edit`}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Modifier
          </Link>
          <Link
            href="/orders"
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition"
          >
            Retour
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Informations</h2>
          <div className="space-y-3">
            <div>
              <span className="font-semibold">Client:</span>{' '}
              <Link
                href={`/clients/${client?.id}`}
                className="text-blue-600 hover:underline"
              >
                {client?.name}
              </Link>
            </div>
            <div>
              <span className="font-semibold">Date:</span> {order.date}
            </div>
            <div>
              <span className="font-semibold">Statut:</span>{' '}
              <span
                className={`px-3 py-1 rounded text-sm ${
                  order.status === 'livrée'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {order.status}
              </span>
            </div>
            <div>
              <span className="font-semibold">Total:</span>{' '}
              <span className="text-2xl text-green-600 font-bold">
                {order.total.toFixed(2)} €
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Produits ({order.products.length})
          </h2>
          <div className="space-y-3">
            {order.products.map((op, index) => (
              <div key={index} className="border-b pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{getProductName(op.productId)}</p>
                    <p className="text-sm text-gray-500">
                      {op.price.toFixed(2)} € × {op.quantity}
                    </p>
                  </div>
                  <p className="font-semibold text-green-600">
                    {(op.price * op.quantity).toFixed(2)} €
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
