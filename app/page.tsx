'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
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
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Klinik Pratama <br/> DRW Estetika
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-pink-100 max-w-2xl mx-auto">
            Klinik Kecantikan dan Estetika Medis Profesional dengan Teknologi Terkini
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/layanan" className="bg-white text-pink-600 hover:bg-pink-50 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
              Lihat Layanan
            </Link>
            <Link href="/kontak" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-pink-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300">
              Hubungi Kami
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Layanan Unggulan Kami</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Kami menyediakan berbagai treatment kecantikan dan estetika medis dengan teknologi terkini
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '💆‍♀️',
                title: 'Facial Treatment',
                desc: 'Perawatan wajah lengkap dari basic hingga premium untuk kulit lebih cerah dan segar',
                color: 'from-pink-500 to-rose-400'
              },
              {
                icon: '✨',
                title: 'Advanced Treatment',
                desc: 'HIFU, IPL, Dermapen dengan teknologi terkini untuk hasil maksimal tanpa operasi',
                color: 'from-purple-500 to-pink-400'
              },
              {
                icon: '💉',
                title: 'Injection Treatment',
                desc: 'Botox, filler, dan treatment injeksi untuk anti-aging dan peremajaan kulit',
                color: 'from-rose-500 to-pink-400'
              }
            ].map((service, i) => (
              <div key={i} className={`bg-gradient-to-br ${service.color} rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}>
                <div className="text-6xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-white/90 mb-6">{service.desc}</p>
                <Link href="/layanan" className="inline-block bg-white text-pink-600 font-bold px-6 py-2 rounded-full hover:bg-pink-50 transition-colors">
                  Pelajari Lebih →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-pink-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center text-gray-900 mb-16">Mengapa Memilih Kami?</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '👨‍⚕️', title: 'Dokter Profesional', desc: 'Spesialis estetika medis berpengalaman dan tersertifikasi internasional' },
              { icon: '🔬', title: 'Teknologi Terkini', desc: 'Menggunakan alat dan teknologi medis terbaru dan teruji secara klinis' },
              { icon: '✅', title: 'Aman & Terpercaya', desc: 'Standar medis internasional dengan produk berlisensi BPOM' },
              { icon: '💝', title: 'Harga Terjangkau', desc: 'Kualitas premium dengan harga yang kompetitif dan terjangkau' }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-rose-500 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10+', label: 'Tahun Pengalaman' },
              { number: '5000+', label: 'Pasien Puas' },
              { number: '3', label: 'Cabang Klinik' },
              { number: '50+', label: 'Jenis Treatment' }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <p className="text-pink-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center text-gray-900 mb-16">Testimoni Pasien Kami</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Siti Nurhaliza', text: 'Hasil treatment sangat memuaskan! Kulit terasa lebih cerah dan segar. Dokter dan staff sangat profesional.' },
              { name: 'Rina Wijaya', text: 'Saya sudah mencoba beberapa treatment dan semuanya memberikan hasil yang bagus. Harga juga sangat kompetitif!' },
              { name: 'Dewi Lestari', text: 'Klinik ini benar-benar terpercaya. Dokter menjelaskan setiap treatment dengan detail dan tidak ada biaya tersembunyi.' }
            ].map((testimonial, i) => (
              <div key={i} className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-yellow-400">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-bold text-pink-600">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">Siap Memulai Perjalanan Kecantikan Anda?</h2>
          <p className="text-xl mb-8 text-pink-100">
            Konsultasikan kebutuhan perawatan kulit dan kecantikan Anda dengan dokter kami sekarang!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/kontak" className="bg-white text-pink-600 hover:bg-pink-50 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl">
              Konsultasi Gratis Sekarang
            </Link>
            <a href="https://wa.me/62274123456" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl">
              💬 Chat WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
