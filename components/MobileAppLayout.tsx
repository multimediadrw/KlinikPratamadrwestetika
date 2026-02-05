'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MobileAppLayoutProps {
  children: ReactNode;
}

export default function MobileAppLayout({ children }: MobileAppLayoutProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: '🏠', label: 'Beranda' },
    { href: '/treatment', icon: '💆', label: 'Treatment' },
    { href: '/reservation', icon: '📅', label: 'Reservasi' },
    { href: '/my-prime', icon: '👤', label: 'Akun' },
    { href: '/faq', icon: '❓', label: 'Bantuan' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-br from-pink-600 via-pink-500 to-rose-400 text-white px-4 pt-6 pb-24 rounded-b-[32px]">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">💅</span>
            </div>
            <span className="font-bold text-lg">DRW Estetika</span>
          </div>
          <div className="flex gap-3">
            <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <span className="text-xl">🔔</span>
            </button>
            <Link href="/my-prime" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <span className="text-xl">👤</span>
            </Link>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-1">Hai, Sahabat DRW 👋</h1>
          <p className="text-pink-100">Mau treatment apa hari ini?</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="-mt-16 relative z-10">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  isActive ? 'text-pink-600' : 'text-gray-500'
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
