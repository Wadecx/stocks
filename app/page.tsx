'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Client, Product, Order } from '@/types';

export default function DashboardPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientsRes, productsRes, ordersRes] = await Promise.all([
          fetch('/api/clients'),
          fetch('/api/products'),
          fetch('/api/orders'),
        ]);

        const clientsData = await clientsRes.json();
        const productsData = await productsRes.json();
        const ordersData = await ordersRes.json();

        setClients(clientsData);
        setProducts(productsData);
        setOrders(ordersData);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/clients">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition cursor-pointer border-t-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">
                  Clients
                </p>
                <p className="text-4xl font-bold text-gray-800 mt-2">
                  {clients.length}
                </p>
              </div>
              <div className="bg-blue-100 rounded-full p-4">
                <svg
                  className="w-8 h-8 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Voir tous les clients →
            </p>
          </div>
        </Link>

        <Link href="/products">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition cursor-pointer border-t-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">
                  Produits
                </p>
                <p className="text-4xl font-bold text-gray-800 mt-2">
                  {products.length}
                </p>
              </div>
              <div className="bg-green-100 rounded-full p-4">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Voir tous les produits →
            </p>
          </div>
        </Link>

        <Link href="/orders">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition cursor-pointer border-t-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">
                  Commandes
                </p>
                <p className="text-4xl font-bold text-gray-800 mt-2">
                  {orders.length}
                </p>
              </div>
              <div className="bg-purple-100 rounded-full p-4">
                <svg
                  className="w-8 h-8 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Voir toutes les commandes →
            </p>
          </div>
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Commandes récentes
          </h2>
          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => {
              const client = clients.find((c) => c.id === order.clientId);
              return (
                <div
                  key={order.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="font-semibold">{client?.name}</p>
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
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Produits en stock faible
          </h2>
          <div className="space-y-3">
            {products
              .filter((p) => p.stock < 20)
              .slice(0, 5)
              .map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{product.stock} unités</p>
                    <p className="text-sm text-gray-500">
                      {product.price.toFixed(2)} €
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
