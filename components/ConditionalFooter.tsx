'use client';

import { useIsMobile } from '@/lib/useIsMobile';
import Link from 'next/link';

export default function ConditionalFooter() {
  const isMobile = useIsMobile();

  // Don't show footer on mobile (mobile app has bottom navigation)
  if (isMobile) {
    return null;
  }

  return (
    <footer className="bg-pink-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">DRW Estetika</h3>
            <p className="text-pink-200">Klinik kecantikan profesional dengan teknologi terkini</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Menu</h4>
            <ul className="space-y-2 text-pink-200">
              <li><Link href="/galeri" className="hover:text-white">Galeri</Link></li>
              <li><Link href="/testimoni" className="hover:text-white">Testimoni</Link></li>
              <li><Link href="/harga" className="hover:text-white">Harga</Link></li>
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak</h4>
            <ul className="space-y-2 text-pink-200">
              {/* Contact information removed */}
            </ul>
          </div>
        </div>
        <div className="border-t border-pink-800 pt-8 text-center text-pink-200">
          <p>&copy; 2026 Klinik Pratama DRW Estetika. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
