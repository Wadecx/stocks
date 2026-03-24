'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Client, Product } from '@/types';

export default function NewOrderPage() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedClientId, setSelectedClientId] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<
    { productId: number; quantity: number; price: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [clientsRes, productsRes] = await Promise.all([
        fetch('/api/clients'),
        fetch('/api/products'),
      ]);

      const clientsData = await clientsRes.json();
      const productsData = await productsRes.json();

      setClients(clientsData);
      setProducts(productsData);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const existingProduct = selectedProducts.find((p) => p.productId === productId);
    if (existingProduct) {
      alert('Ce produit est déjà ajouté');
      return;
    }

    setSelectedProducts([
      ...selectedProducts,
      { productId, quantity: 1, price: product.price },
    ]);
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    setSelectedProducts(
      selectedProducts.map((p) =>
        p.productId === productId ? { ...p, quantity } : p
      )
    );
  };

  const handleRemoveProduct = (productId: number) => {
    setSelectedProducts(selectedProducts.filter((p) => p.productId !== productId));
  };

  const calculateTotal = () => {
    return selectedProducts.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedClientId) {
      alert('Veuillez sélectionner un client');
      return;
    }

    if (selectedProducts.length === 0) {
      alert('Veuillez ajouter au moins un produit');
      return;
    }

    const orderData = {
      clientId: parseInt(selectedClientId),
      products: selectedProducts,
      status: 'en cours',
      total: calculateTotal(),
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        router.push('/orders');
      } else {
        alert('Erreur lors de la création de la commande');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la création de la commande');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Nouvelle Commande</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Client</h2>
          <select
            value={selectedClientId}
            onChange={(e) => setSelectedClientId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Sélectionner un client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Produits</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ajouter un produit
            </label>
            <select
              onChange={(e) => {
                if (e.target.value) {
                  handleAddProduct(parseInt(e.target.value));
                  e.target.value = '';
                }
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Sélectionner un produit</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} - {product.price.toFixed(2)} € (Stock: {product.stock})
                </option>
              ))}
            </select>
          </div>

          {selectedProducts.length > 0 && (
            <div className="space-y-3">
              {selectedProducts.map((sp) => {
                const product = products.find((p) => p.id === sp.productId);
                return (
                  <div
                    key={sp.productId}
                    className="flex items-center justify-between border-b pb-3"
                  >
                    <div className="flex-1">
                      <p className="font-semibold">{product?.name}</p>
                      <p className="text-sm text-gray-500">
                        {sp.price.toFixed(2)} € / unité
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <input
                        type="number"
                        min="1"
                        max={product?.stock}
                        value={sp.quantity}
                        onChange={(e) =>
                          handleQuantityChange(sp.productId, parseInt(e.target.value))
                        }
                        className="w-20 px-2 py-1 border border-gray-300 rounded"
                      />
                      <p className="font-semibold w-24 text-right">
                        {(sp.price * sp.quantity).toFixed(2)} €
                      </p>
                      <button
                        type="button"
                        onClick={() => handleRemoveProduct(sp.productId)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                );
              })}

              <div className="pt-3 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">Total:</span>
                  <span className="text-2xl font-bold text-green-600">
                    {calculateTotal().toFixed(2)} €
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Créer la commande
          </button>
          <Link
            href="/orders"
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition"
          >
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}
