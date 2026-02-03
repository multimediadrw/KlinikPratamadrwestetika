export default function GaleriPage() {
  return (
    <main>
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Galeri</h1>
          <p className="text-xl">Lihat hasil perawatan dan fasilitas klinik kami</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-4">Before & After</h2>
          <p className="text-center text-gray-600 mb-12">Hasil nyata dari pasien kami yang telah melakukan berbagai treatment</p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-pink-50 rounded-xl overflow-hidden shadow-lg">
                <div className="h-64 bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center">
                  <span className="text-6xl">📸</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-pink-900 mb-2">Treatment Result {i}</h3>
                  <p className="text-gray-700">Hasil nyata dari treatment di klinik kami</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-4xl font-bold text-pink-900 text-center mb-12">Fasilitas Kami</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="h-48 bg-gradient-to-br from-pink-200 to-pink-300 rounded-lg flex items-center justify-center mb-6">
                <span className="text-6xl">🏥</span>
              </div>
              <h3 className="text-2xl font-bold text-pink-900 mb-3">Ruang Konsultasi Modern</h3>
              <p className="text-gray-700">Ruang konsultasi yang nyaman dan modern untuk diskusi dengan dokter</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="h-48 bg-gradient-to-br from-pink-200 to-pink-300 rounded-lg flex items-center justify-center mb-6">
                <span className="text-6xl">🛏️</span>
              </div>
              <h3 className="text-2xl font-bold text-pink-900 mb-3">Ruang Treatment Nyaman</h3>
              <p className="text-gray-700">Ruang treatment yang dirancang untuk kenyamanan dan privasi pasien</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="h-48 bg-gradient-to-br from-pink-200 to-pink-300 rounded-lg flex items-center justify-center mb-6">
                <span className="text-6xl">🔬</span>
              </div>
              <h3 className="text-2xl font-bold text-pink-900 mb-3">Peralatan Medis Terkini</h3>
              <p className="text-gray-700">Menggunakan peralatan medis terbaru dan teknologi terdepan</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="h-48 bg-gradient-to-br from-pink-200 to-pink-300 rounded-lg flex items-center justify-center mb-6">
                <span className="text-6xl">🧼</span>
              </div>
              <h3 className="text-2xl font-bold text-pink-900 mb-3">Standar Kebersihan Tinggi</h3>
              <p className="text-gray-700">Menjaga standar kebersihan dan sterilisasi yang ketat</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-pink-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-12">Testimoni Pasien</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {['Siti Nurhaliza', 'Rina Wijaya', 'Dewi Lestari'].map((name) => (
              <div key={name} className="bg-white p-8 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <span className="text-3xl">⭐⭐⭐⭐⭐</span>
                </div>
                <p className="text-gray-700 mb-4">
                  "Hasil treatment saya sangat memuaskan! Kulit terasa lebih cerah dan segar. Dokter dan staff sangat profesional dan ramah."
                </p>
                <p className="font-semibold text-pink-900">- {name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
