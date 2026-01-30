import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Klinik Pratama DRW Estetika - Klinik Kecantikan & Estetika Medis",
  description: "Klinik kecantikan dan estetika medis profesional dengan teknologi terkini. Facial, HIFU, IPL, Botox, dan treatment lainnya oleh dokter spesialis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              <Link href="/" className="text-2xl font-bold text-pink-600">
                DRW Estetika
              </Link>
              
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
                  Beranda
                </Link>
                <Link href="/tentang" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
                  Tentang Kami
                </Link>
                <Link href="/layanan" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
                  Layanan
                </Link>
                <Link href="/galeri" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
                  Galeri
                </Link>
                <Link href="/harga" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
                  Harga
                </Link>
                <Link href="/faq" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
                  FAQ
                </Link>
                <Link 
                  href="/kontak" 
                  className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full font-semibold transition-colors"
                >
                  Kontak
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button className="md:hidden text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="pt-20">
          {children}
        </div>

        {/* Footer */}
        <footer className="bg-pink-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">DRW Estetika</h3>
                <p className="text-pink-200">
                  Klinik kecantikan dan estetika medis profesional dengan teknologi terkini.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Layanan</h4>
                <ul className="space-y-2 text-pink-200">
                  <li><Link href="/layanan#facial" className="hover:text-white">Facial Treatment</Link></li>
                  <li><Link href="/layanan#advanced" className="hover:text-white">Advanced Treatment</Link></li>
                  <li><Link href="/layanan#injection" className="hover:text-white">Injection Treatment</Link></li>
                  <li><Link href="/layanan#peeling" className="hover:text-white">Chemical Peeling</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Informasi</h4>
                <ul className="space-y-2 text-pink-200">
                  <li><Link href="/tentang" className="hover:text-white">Tentang Kami</Link></li>
                  <li><Link href="/galeri" className="hover:text-white">Galeri</Link></li>
                  <li><Link href="/harga" className="hover:text-white">Harga</Link></li>
                  <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Kontak</h4>
                <ul className="space-y-2 text-pink-200">
                  <li>📍 Alamat Klinik</li>
                  <li>📞 +62 XXX-XXXX-XXXX</li>
                  <li>✉️ info@drwestetika.com</li>
                  <li>🕒 Senin - Sabtu: 09:00 - 20:00</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-pink-800 mt-8 pt-8 text-center text-pink-200">
              <p>&copy; 2026 Klinik Pratama DRW Estetika. All rights reserved. Part of PT DRW Corpora Indonesia.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
