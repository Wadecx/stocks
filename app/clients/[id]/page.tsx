'use client';

import { useEffect, useState } from 'react';
import { use } from 'react';
import Link from 'next/link';
import { Client, Order } from '@/types';

export default function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [client, setClient] = useState<Client | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [clientRes, ordersRes] = await Promise.all([
        fetch(`/api/clients/${id}`),
        fetch('/api/orders'),
      ]);

      const clientData = await clientRes.json();
      const ordersData = await ordersRes.json();

      setClient(clientData);
      setOrders(ordersData.filter((o: Order) => o.clientId === parseInt(id)));
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
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

  if (!client) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-xl text-red-600">Client non trouvé</p>
          <Link href="/clients" className="text-blue-600 hover:underline mt-4 inline-block">
            Retour à la liste
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Détails du Client</h1>
        <div className="space-x-4">
          <Link
            href={`/clients/${id}/edit`}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Modifier
          </Link>
          <Link
            href="/clients"
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition"
          >
            Retour
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Informations</h2>
          <div className="space-y-3">
            <div>
              <span className="font-semibold">Nom:</span> {client.name}
            </div>
            <div>
              <span className="font-semibold">Email:</span> {client.email}
            </div>
            <div>
              <span className="font-semibold">Téléphone:</span> {client.phone}
            </div>
            <div>
              <span className="font-semibold">Adresse:</span> {client.address}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Commandes ({orders.length})
          </h2>
          {orders.length === 0 ? (
            <p className="text-gray-500">Aucune commande</p>
          ) : (
            <div className="space-y-3">
              {orders.map((order) => (
                <div key={order.id} className="border-b pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <Link
                        href={`/orders/${order.id}`}
                        className="text-blue-600 hover:underline font-semibold"
                      >
                        Commande #{order.id}
                      </Link>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{order.total.toFixed(2)} €</p>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          order.status === 'livrée'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
