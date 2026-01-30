import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 via-pink-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-pink-900 mb-6">
            Klinik Pratama DRW Estetika
          </h1>
          <p className="text-xl md:text-2xl text-pink-700 mb-8 max-w-3xl mx-auto">
            Klinik Kecantikan dan Estetika Medis Profesional dengan Teknologi Terkini
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              href="/layanan" 
              className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Lihat Layanan Kami
            </Link>
            <Link 
              href="/kontak" 
              className="bg-white hover:bg-pink-50 text-pink-600 border-2 border-pink-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-pink-900 mb-6">Tentang Kami</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Klinik Pratama DRW Estetika adalah bagian dari PT DRW Corpora Indonesia yang didirikan oleh 
              <strong className="text-pink-700"> dr. Wahyu Triasmara, M.Kes., AAAM, AIFO-K</strong>. 
              Kami berkomitmen memberikan layanan perawatan kecantikan dan estetika medis terbaik dengan 
              teknologi terkini dan tenaga medis profesional.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Dengan pengalaman sejak tahun 2015, kami telah melayani ribuan pasien yang puas dengan hasil 
              perawatan yang aman, efektif, dan terpercaya. Setiap treatment dilakukan di bawah pengawasan 
              dokter spesialis estetika medis yang berpengalaman.
            </p>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-12">Layanan Unggulan</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-pink-500">
              <div className="text-5xl mb-4">💆‍♀️</div>
              <h3 className="text-2xl font-bold text-pink-900 mb-4">Facial Treatment</h3>
              <p className="text-gray-700 mb-4">
                Perawatan wajah lengkap dari basic hingga premium dengan serum khusus untuk berbagai jenis kulit.
              </p>
              <Link href="/layanan#facial" className="text-pink-600 font-semibold hover:text-pink-700">
                Selengkapnya →
              </Link>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-pink-500">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-2xl font-bold text-pink-900 mb-4">Advanced Treatment</h3>
              <p className="text-gray-700 mb-4">
                HIFU, IPL, Dermapen, dan teknologi terkini untuk hasil maksimal tanpa operasi.
              </p>
              <Link href="/layanan#advanced" className="text-pink-600 font-semibold hover:text-pink-700">
                Selengkapnya →
              </Link>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-pink-500">
              <div className="text-5xl mb-4">💉</div>
              <h3 className="text-2xl font-bold text-pink-900 mb-4">Injection Treatment</h3>
              <p className="text-gray-700 mb-4">
                Botox, filler, dan treatment injeksi lainnya untuk anti-aging dan peremajaan kulit.
              </p>
              <Link href="/layanan#injection" className="text-pink-600 font-semibold hover:text-pink-700">
                Selengkapnya →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-12">Mengapa Memilih Kami?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">👨‍⚕️</span>
              </div>
              <h3 className="text-xl font-bold text-pink-900 mb-2">Dokter Profesional</h3>
              <p className="text-gray-700">Ditangani langsung oleh dokter spesialis estetika medis</p>
            </div>

            <div className="text-center">
              <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🔬</span>
              </div>
              <h3 className="text-xl font-bold text-pink-900 mb-2">Teknologi Terkini</h3>
              <p className="text-gray-700">Menggunakan alat dan teknologi medis terbaru</p>
            </div>

            <div className="text-center">
              <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">✅</span>
              </div>
              <h3 className="text-xl font-bold text-pink-900 mb-2">Aman & Terpercaya</h3>
              <p className="text-gray-700">Produk dan prosedur berstandar medis internasional</p>
            </div>

            <div className="text-center">
              <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">💝</span>
              </div>
              <h3 className="text-xl font-bold text-pink-900 mb-2">Harga Terjangkau</h3>
              <p className="text-gray-700">Kualitas premium dengan harga yang kompetitif</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-pink-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Siap Memulai Perjalanan Kecantikan Anda?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Konsultasikan kebutuhan perawatan kulit dan kecantikan Anda dengan dokter kami sekarang!
          </p>
          <Link 
            href="/kontak" 
            className="bg-white text-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-50 transition-all duration-300 inline-block shadow-lg hover:shadow-xl"
          >
            Konsultasi Gratis
          </Link>
        </div>
      </section>
    </main>
  );
}
