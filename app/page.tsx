'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const refCode = searchParams.get('ref');

  useEffect(() => {
    if (refCode) {
      // Redirect ke form reservasi dengan ref code
      router.push(`/reservation?ref=${refCode}`);
    }
  }, [refCode, router]);

  return (
    <main className="bg-white">
      {/* Hero Section with Background Image */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-pink-500 to-rose-400">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            Klinik Pratama DRW Estetika
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
            Klinik kecantikan profesional dengan teknologi terkini
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#layanan"
              className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold hover:bg-pink-50 transition-colors shadow-lg"
            >
              Lihat Layanan
            </Link>
            <Link 
              href="#kontak"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-pink-600 transition-colors shadow-lg"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>

      {/* Layanan Section */}
      <section id="layanan" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Layanan Kami
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Perawatan Wajah', desc: 'Treatment wajah dengan teknologi terkini untuk kulit sehat dan bercahaya' },
              { title: 'Perawatan Tubuh', desc: 'Berbagai treatment untuk merawat kesehatan dan kecantikan tubuh Anda' },
              { title: 'Konsultasi Medis', desc: 'Konsultasi dengan dokter berpengalaman untuk solusi kecantikan terbaik' }
            ].map((service, idx) => (
              <div key={idx} className="bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold mb-4 text-pink-600">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimoni Section */}
      <section id="testimoni" className="py-20 px-4 bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Testimoni Pelanggan
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: 'Sarah', text: 'Pelayanan sangat memuaskan dan hasil treatment luar biasa!' },
              { name: 'Maya', text: 'Dokter dan staff sangat profesional. Highly recommended!' }
            ].map((testi, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg">
                <p className="text-gray-600 mb-4 italic">"{testi.text}"</p>
                <p className="font-bold text-pink-600">- {testi.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="kontak" className="py-20 px-4 bg-gradient-to-br from-pink-600 to-rose-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Siap Untuk Transformasi?
          </h2>
          <p className="text-xl mb-8">
            Hubungi kami sekarang untuk konsultasi gratis
          </p>
          <a 
            href="https://wa.me/62274123456"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-pink-600 px-8 py-4 rounded-full font-semibold hover:bg-pink-50 transition-colors shadow-lg"
          >
            WhatsApp Kami
          </a>
        </div>
      </section>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
