import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Klinik Pratama DRW Estetika',
  description: 'Klinik kecantikan dan estetika medis profesional',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-white">
        <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <Link href="/" className="text-2xl font-bold text-pink-600">
                DRW Estetika
              </Link>
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/" className="text-gray-700 hover:text-pink-600 font-medium">Beranda</Link>
                <Link href="/galeri" className="text-gray-700 hover:text-pink-600 font-medium">Galeri</Link>
                <Link href="/harga" className="text-gray-700 hover:text-pink-600 font-medium">Harga</Link>
                <Link href="/faq" className="text-gray-700 hover:text-pink-600 font-medium">FAQ</Link>
                <Link href="/kontak" className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full font-semibold">Kontak</Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="pt-20">
          {children}
        </div>

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
                  <li><Link href="/harga" className="hover:text-white">Harga</Link></li>
                  <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Kontak</h4>
                <ul className="space-y-2 text-pink-200">
                  <li>📍 Magelang, Jawa Tengah</li>
                  <li>📞 +62 274-123-456</li>
                  <li>✉️ info@drwestetika.com</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-pink-800 pt-8 text-center text-pink-200">
              <p>&copy; 2026 Klinik Pratama DRW Estetika. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
