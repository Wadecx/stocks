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
    <nav className="bg-black text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold">
              STOCKS SUWOOO
            </Link>
            <div className="flex space-x-4">
              <Link
                href="/"
                className={`hover:bg-white hover:text-black px-3 py-2 rounded ${
                  pathname === '/' ? 'bg-black' : ''
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/clients"
                className={`hover:bg-white hover:text-black px-3 py-2 rounded ${
                  pathname.startsWith('/clients') ? 'bg-black' : ''
                }`}
              >
                Clients
              </Link>
              <Link
                href="/products"
                className={`hover:bg-white hover:text-black px-3 py-2 rounded ${
                  pathname.startsWith('/products') ? 'bg-black' : ''
                }`}
              >
                Produits
              </Link>
              <Link
                href="/orders"
                className={`hover:bg-white hover:text-black px-3 py-2 rounded ${
                  pathname.startsWith('/orders') ? 'bg-black' : ''
                }`}
              >
                Commandes
              </Link>
              {user?.role === 'admin' && (
                <Link
                  href="/admin/users"
                  className={`hover:bg-white hover:text-black px-3 py-2 rounded ${
                    pathname.startsWith('/admin') ? 'bg-black' : ''
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
