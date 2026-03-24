'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AuthUser } from '@/types';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/login');
  };

  if (pathname === '/login') {
    return null;
  }

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold">
              Gestion Commandes
            </Link>
            <div className="flex space-x-4">
              <Link
                href="/"
                className={`hover:bg-blue-700 px-3 py-2 rounded ${
                  pathname === '/' ? 'bg-blue-700' : ''
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/clients"
                className={`hover:bg-blue-700 px-3 py-2 rounded ${
                  pathname.startsWith('/clients') ? 'bg-blue-700' : ''
                }`}
              >
                Clients
              </Link>
              <Link
                href="/products"
                className={`hover:bg-blue-700 px-3 py-2 rounded ${
                  pathname.startsWith('/products') ? 'bg-blue-700' : ''
                }`}
              >
                Produits
              </Link>
              <Link
                href="/orders"
                className={`hover:bg-blue-700 px-3 py-2 rounded ${
                  pathname.startsWith('/orders') ? 'bg-blue-700' : ''
                }`}
              >
                Commandes
              </Link>
              {user?.role === 'admin' && (
                <Link
                  href="/admin/users"
                  className={`hover:bg-blue-700 px-3 py-2 rounded ${
                    pathname.startsWith('/admin') ? 'bg-blue-700' : ''
                  }`}
                >
                  Utilisateurs
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm">
              {user?.name} ({user?.role})
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
