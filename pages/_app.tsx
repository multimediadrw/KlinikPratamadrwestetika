import type { AppProps } from 'next/app';
import Link from 'next/link';
import './globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-md z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img 
                src="/logo-drw.jpg" 
                alt="Klinik Pratama DRW Estetika" 
                className="h-16 w-auto object-contain"
              />
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
                Beranda
              </Link>
              <Link href="/galeri" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
                Galeri
              </Link>
              <Link href="/menu" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
                Menu Treatment
              </Link>
              <Link href="/faq" className="text-gray-700 hover:text-pink-600 font-medium transition-colors">
                FAQ
              </Link>
              <Link href="/lokasi-kontak" className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg">
                Lokasi & Kontak
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
        <Component {...pageProps} />
      </div>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 text-center">
        <p className="text-gray-400 text-sm">© 2026 Klinik Pratama DRW Estetika. Bagian dari PT DRW Corpora. Melayani dengan hati.</p>
      </footer>
    </>
  );
}

export default MyApp;
