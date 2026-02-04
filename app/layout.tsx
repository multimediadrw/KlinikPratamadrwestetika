import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Klinik Pratama DRW Estetika | Klinik Kecantikan & Estetika Medis Terpercaya',
  description: 'Klinik kecantikan profesional dengan teknologi terkini di Magelang, Purworejo, dan Kutoarjo. Layanan treatment estetika medis terbaik dengan dokter berpengalaman.',
  keywords: ['klinik kecantikan', 'estetika medis', 'treatment kulit', 'DRW Estetika', 'Magelang', 'Purworejo', 'Kutoarjo'],
  authors: [{ name: 'Klinik Pratama DRW Estetika' }],
  creator: 'Klinik Pratama DRW Estetika',
  publisher: 'Klinik Pratama DRW Estetika',
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://drwskincare.com',
    siteName: 'Klinik Pratama DRW Estetika',
    title: 'Klinik Pratama DRW Estetika | Klinik Kecantikan & Estetika Medis',
    description: 'Klinik kecantikan profesional dengan teknologi terkini. Layanan treatment estetika medis terbaik di Jawa Tengah.',
    images: [
      {
        url: 'https://drwskincare.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Klinik Pratama DRW Estetika',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Klinik Pratama DRW Estetika',
    description: 'Klinik kecantikan profesional dengan teknologi terkini',
    images: ['https://drwskincare.com/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://drwskincare.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-EE3FH8DGVT`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EE3FH8DGVT', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="google845dd4e7fdd87b84" />

        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="language" content="Indonesian" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="Klinik Pratama DRW Estetika" />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'MedicalBusiness',
              name: 'Klinik Pratama DRW Estetika',
              image: 'https://drwskincare.com/logo.png',
              description: 'Klinik kecantikan profesional dengan teknologi terkini',
              url: 'https://drwskincare.com',
              telephone: '',
              email: '',
              address: [
                {
                  '@type': 'PostalAddress',
                  streetAddress: 'Jl. Jend. Sudirman, Rejowinangun Sel.',
                  addressLocality: 'Magelang',
                  addressRegion: 'Jawa Tengah',
                  postalCode: '59214',
                  addressCountry: 'ID',
                },
                {
                  '@type': 'PostalAddress',
                  streetAddress: 'Jl. Jenderal Sudirman No.1',
                  addressLocality: 'Purworejo',
                  addressRegion: 'Jawa Tengah',
                  postalCode: '54111',
                  addressCountry: 'ID',
                },
                {
                  '@type': 'PostalAddress',
                  streetAddress: 'Jalan Mardi usodo timur alun-alun No.6',
                  addressLocality: 'Kutoarjo',
                  addressRegion: 'Jawa Tengah',
                  postalCode: '54212',
                  addressCountry: 'ID',
                },
              ],
              sameAs: [
                'https://www.facebook.com/drwestetika',
                'https://www.instagram.com/drwestetika',
              ],
            }),
          }}
        />

        {/* Structured Data - LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Klinik Pratama DRW Estetika',
              image: 'https://drwskincare.com/logo.png',
              url: 'https://drwskincare.com',
              telephone: '',
              priceRange: '$$',
              areaServed: ['Magelang', 'Purworejo', 'Kutoarjo'],
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                reviewCount: '150',
              },
            }),
          }}
        />
      </head>
      <body className="bg-white">
        <nav className="fixed top-0 left-0 right-0 bg-transparent backdrop-blur-sm z-50">
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
      </body>
    </html>
  );
}
