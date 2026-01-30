export const revalidate = 60;

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-6">Klinik Pratama DRW Estetika</h1>
          <p className="text-2xl mb-8 max-w-2xl mx-auto">
            Klinik kecantikan dan estetika medis profesional dengan teknologi terkini
          </p>
          <button className="bg-white text-pink-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-pink-50 transition">
            Konsultasi Gratis
          </button>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-16">Layanan Kami</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-2xl font-bold text-pink-900 mb-4">Anti Acne</h3>
              <p className="text-gray-600">Treatment profesional untuk mengatasi jerawat dan bekas jerawat</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="text-2xl font-bold text-pink-900 mb-4">Anti Aging</h3>
              <p className="text-gray-600">Perawatan untuk menjaga kecantikan dan mencegah penuaan dini</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-5xl mb-4">💎</div>
              <h3 className="text-2xl font-bold text-pink-900 mb-4">Glow Skin</h3>
              <p className="text-gray-600">Treatment untuk kulit bercahaya dan sehat alami</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-16">Mengapa Memilih Kami?</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="flex gap-4">
              <div className="text-3xl">👨‍⚕️</div>
              <div>
                <h3 className="text-xl font-bold text-pink-900 mb-2">Dokter Spesialis</h3>
                <p className="text-gray-600">Tim dokter berpengalaman dan tersertifikasi di bidang estetika medis</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">🔬</div>
              <div>
                <h3 className="text-xl font-bold text-pink-900 mb-2">Teknologi Terkini</h3>
                <p className="text-gray-600">Menggunakan peralatan dan teknologi terbaru untuk hasil maksimal</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">🏥</div>
              <div>
                <h3 className="text-xl font-bold text-pink-900 mb-2">Standar Keamanan Tinggi</h3>
                <p className="text-gray-600">Fasilitas steril dan prosedur keamanan yang ketat</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl">💰</div>
              <div>
                <h3 className="text-xl font-bold text-pink-900 mb-2">Harga Terjangkau</h3>
                <p className="text-gray-600">Paket treatment dengan harga kompetitif dan terjangkau</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Siap Memulai Perjalanan Kecantikan Anda?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Hubungi kami sekarang untuk konsultasi gratis dan dapatkan penawaran spesial
          </p>
          <button className="bg-white text-pink-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-pink-50 transition">
            Hubungi Kami Sekarang
          </button>
        </div>
      </section>
    </main>
  );
}
