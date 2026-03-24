'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Client, Product, Order } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Package, ShoppingCart, TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react';

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
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Vue d'ensemble de votre activité</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/clients" className="group">
          <Card className="hover:shadow-lg transition-all hover:border-blue-500/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Clients
              </CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{clients.length}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 group-hover:text-blue-600 transition-colors">
                Voir tous les clients
                <ArrowRight className="h-3 w-3" />
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/products" className="group">
          <Card className="hover:shadow-lg transition-all hover:border-green-500/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Produits
              </CardTitle>
              <Package className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{products.length}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 group-hover:text-green-600 transition-colors">
                Voir tous les produits
                <ArrowRight className="h-3 w-3" />
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/orders" className="group">
          <Card className="hover:shadow-lg transition-all hover:border-purple-500/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Commandes
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{orders.length}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 group-hover:text-purple-600 transition-colors">
                Voir toutes les commandes
                <ArrowRight className="h-3 w-3" />
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              <CardTitle>Commandes récentes</CardTitle>
            </div>
            <CardDescription>
              Les {orders.slice(0, 5).length} dernières commandes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => {
                const client = clients.find((c) => c.id === order.clientId);
                return (
                  <div
                    key={order.id}
                    className="flex items-center justify-between border-b pb-3 last:border-0"
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{client?.name}</p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-semibold text-sm">{order.total.toFixed(2)} €</p>
                      <Badge
                        variant={order.status === 'livrée' ? 'default' : 'secondary'}
                        className={
                          order.status === 'livrée'
                            ? 'bg-green-100 text-green-800 hover:bg-green-100'
                            : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <CardTitle>Stock faible</CardTitle>
            </div>
            <CardDescription>
              Produits nécessitant un réapprovisionnement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products
                .filter((p) => p.stock < 20)
                .slice(0, 5)
                .map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between border-b pb-3 last:border-0"
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="flex items-center gap-2 justify-end">
                        <Badge
                          variant="outline"
                          className="bg-orange-50 text-orange-700 border-orange-200"
                        >
                          {product.stock} unités
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {product.price.toFixed(2)} €
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
