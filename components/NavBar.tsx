'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function NavBar() {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/check');
      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);
        setIsAdmin(data.user?.isAdmin || false);
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Hide navbar on certain pages
  if (pathname?.startsWith('/front-office') || pathname?.startsWith('/my-prime') || pathname?.startsWith('/reservation')) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="DRW Estetika - Klinik Kecantikan" className="h-16 w-auto" />
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-pink-600 font-medium">Beranda</Link>
            <Link href="/galeri" className="text-gray-700 hover:text-pink-600 font-medium">Galeri</Link>
            <Link href="/testimoni" className="text-gray-700 hover:text-pink-600 font-medium">Testimoni</Link>
            <Link href="/harga" className="text-gray-700 hover:text-pink-600 font-medium">Harga</Link>
            <Link href="/faq" className="text-gray-700 hover:text-pink-600 font-medium">FAQ</Link>
            {!loading && isLoggedIn && (
              <Link href="/my-prime" className="text-yellow-600 hover:text-yellow-700 font-bold">MY PRIME</Link>
            )}
            {!loading && isAdmin && (
              <Link href="/front-office" className="text-gray-700 hover:text-pink-600 font-medium">FRONT OFFICE</Link>
            )}
            <Link href="/kontak" className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full font-semibold">Kontak</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
