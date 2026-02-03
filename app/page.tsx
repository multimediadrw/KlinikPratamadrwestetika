import Link from 'next/link';

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-r from-pink-100 to-pink-50 py-32 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-6xl font-bold text-pink-900 mb-6">Klinik Pratama DRW Estetika</h1>
          <p className="text-2xl text-pink-700 mb-8">Klinik Kecantikan dan Estetika Medis Profesional</p>
          <div className="flex gap-4 justify-center">
            <Link href="/layanan" className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-full font-semibold">
              Lihat Layanan
            </Link>
            <Link href="/kontak" className="bg-white hover:bg-pink-50 text-pink-600 border-2 border-pink-600 px-8 py-4 rounded-full font-semibold">
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-12">Layanan Unggulan</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-pink-50 p-8 rounded-2xl shadow-lg">
              <div className="text-5xl mb-4">💆‍♀️</div>
              <h3 className="text-2xl font-bold text-pink-900 mb-4">Facial Treatment</h3>
              <p className="text-gray-700 mb-4">Perawatan wajah lengkap untuk kulit lebih cerah dan segar</p>
              <Link href="/layanan" className="text-pink-600 font-semibold hover:text-pink-700">Selengkapnya →</Link>
            </div>
            <div className="bg-pink-50 p-8 rounded-2xl shadow-lg">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-2xl font-bold text-pink-900 mb-4">Advanced Treatment</h3>
              <p className="text-gray-700 mb-4">HIFU, IPL, Dermapen dengan teknologi terkini</p>
              <Link href="/layanan" className="text-pink-600 font-semibold hover:text-pink-700">Selengkapnya →</Link>
            </div>
            <div className="bg-pink-50 p-8 rounded-2xl shadow-lg">
              <div className="text-5xl mb-4">💉</div>
              <h3 className="text-2xl font-bold text-pink-900 mb-4">Injection Treatment</h3>
              <p className="text-gray-700 mb-4">Botox, filler, dan treatment injeksi lainnya</p>
              <Link href="/layanan" className="text-pink-600 font-semibold hover:text-pink-700">Selengkapnya →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 bg-pink-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-12">Mengapa Memilih Kami?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">👨‍⚕️</span>
              </div>
              <h3 className="text-xl font-bold text-pink-900 mb-2">Dokter Profesional</h3>
              <p className="text-gray-700">Spesialis estetika medis berpengalaman</p>
            </div>
            <div className="text-center">
              <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🔬</span>
              </div>
              <h3 className="text-xl font-bold text-pink-900 mb-2">Teknologi Terkini</h3>
              <p className="text-gray-700">Alat dan teknologi medis terbaru</p>
            </div>
            <div className="text-center">
              <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">✅</span>
              </div>
              <h3 className="text-xl font-bold text-pink-900 mb-2">Aman & Terpercaya</h3>
              <p className="text-gray-700">Standar medis internasional</p>
            </div>
            <div className="text-center">
              <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">💝</span>
              </div>
              <h3 className="text-xl font-bold text-pink-900 mb-2">Harga Terjangkau</h3>
              <p className="text-gray-700">Kualitas premium dengan harga kompetitif</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Siap Memulai Perjalanan Kecantikan Anda?</h2>
          <p className="text-xl mb-8">Konsultasikan kebutuhan perawatan Anda dengan dokter kami sekarang!</p>
          <Link href="/kontak" className="bg-white text-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-50 inline-block">
            Konsultasi Gratis
          </Link>
        </div>
      </section>
    </main>
  );
}
