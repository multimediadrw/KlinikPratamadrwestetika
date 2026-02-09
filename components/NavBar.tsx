'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function NavBar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      checkAdmin();
    }
  }, [session]);

  const checkAdmin = async () => {
    try {
      const response = await fetch('/api/auth/check');
      if (response.ok) {
        const data = await response.json();
        setIsAdmin(data.user?.isAdmin || false);
      }
    } catch (error) {
      console.error('Auth check error:', error);
    }
  };

  // Hide navbar on certain pages
  if (pathname?.startsWith('/front-office') || pathname?.startsWith('/reservation') || pathname?.startsWith('/my-dashboard') || pathname?.startsWith('/sign-in')) {
    return null;
  }

  const isLoggedIn = status === 'authenticated';
  const loading = status === 'loading';

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
            <Link href="/treatment" className="text-gray-700 hover:text-pink-600 font-medium">Treatment</Link>
            <Link href="/faq" className="text-gray-700 hover:text-pink-600 font-medium">FAQ</Link>
            
            {/* Show SIGN IN button for non-logged-in users */}
            {!loading && !isLoggedIn && (
              <Link 
                href="/sign-in" 
                className="border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white px-6 py-2 rounded-full font-semibold transition-all duration-200"
              >
                SIGN IN
              </Link>
            )}

            {/* Show MY DASHBOARD dropdown for logged-in users */}
            {!loading && isLoggedIn && (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white px-6 py-2 rounded-full font-semibold transition-all duration-200 flex items-center gap-2"
                >
                  MY DASHBOARD
                  <svg 
                    className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                    <Link
                      href="/my-dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      📊 Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        signOut({ callbackUrl: '/' });
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                    >
                      🚪 Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Admin link */}
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
