'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      return;
    }

    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });

      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
      } else {
        alert('Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression');
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Produits</h1>
        <Link
          href="/products/new"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Ajouter un produit
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
          >
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {product.name}
              </h3>
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {product.category}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Prix:</span>
                <span className="font-semibold text-green-600">
                  {product.price.toFixed(2)} €
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Stock:</span>
                <span
                  className={`font-semibold ${
                    product.stock < 20 ? 'text-red-600' : 'text-gray-800'
                  }`}
                >
                  {product.stock} unités
                </span>
              </div>
            </div>

            <div className="flex space-x-2 pt-4 border-t">
              <Link
                href={`/products/${product.id}/edit`}
                className="flex-1 text-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Modifier
              </Link>
              <button
                onClick={() => handleDelete(product.id)}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
