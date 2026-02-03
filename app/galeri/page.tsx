export default function GaleriPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Galeri</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Lihat hasil perawatan dan fasilitas klinik kami
          </p>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-4">Before & After</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Hasil nyata dari pasien kami yang telah melakukan berbagai treatment di klinik kami
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Gallery Item 1 */}
            <div className="bg-pink-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-64 bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center">
                <span className="text-6xl">📸</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-pink-900 mb-2">Facial Treatment Result</h3>
                <p className="text-gray-700">Hasil perawatan facial yang memberikan kulit lebih cerah dan segar</p>
              </div>
            </div>

            {/* Gallery Item 2 */}
            <div className="bg-pink-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-64 bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center">
                <span className="text-6xl">📸</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-pink-900 mb-2">HIFU Treatment Result</h3>
                <p className="text-gray-700">Hasil lifting kulit yang terlihat lebih kencang dan muda</p>
              </div>
            </div>

            {/* Gallery Item 3 */}
            <div className="bg-pink-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-64 bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center">
                <span className="text-6xl">📸</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-pink-900 mb-2">IPL Treatment Result</h3>
                <p className="text-gray-700">Hasil penghilangan bintik hitam dan perataan warna kulit</p>
              </div>
            </div>

            {/* Gallery Item 4 */}
            <div className="bg-pink-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-64 bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center">
                <span className="text-6xl">📸</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-pink-900 mb-2">Filler Treatment Result</h3>
                <p className="text-gray-700">Hasil penambahan volume dan pengisian kerutan</p>
              </div>
            </div>

            {/* Gallery Item 5 */}
            <div className="bg-pink-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-64 bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center">
                <span className="text-6xl">📸</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-pink-900 mb-2">Botox Treatment Result</h3>
                <p className="text-gray-700">Hasil pengurangan garis halus dan kerutan di wajah</p>
              </div>
            </div>

            {/* Gallery Item 6 */}
            <div className="bg-pink-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-64 bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center">
                <span className="text-6xl">📸</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-pink-900 mb-2">Dermapen Treatment Result</h3>
                <p className="text-gray-700">Hasil perbaikan tekstur kulit dan pengurangan bekas jerawat</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-20 bg-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-12">Fasilitas Kami</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-12">Testimoni Pasien</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-pink-50 p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-3">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700 mb-4">
                "Hasil treatment saya sangat memuaskan! Kulit terasa lebih cerah dan segar. Dokter dan staff sangat profesional dan ramah."
              </p>
              <p className="font-semibold text-pink-900">- Siti Nurhaliza</p>
            </div>

            <div className="bg-pink-50 p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-3">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700 mb-4">
                "Saya sudah mencoba beberapa treatment dan semuanya memberikan hasil yang bagus. Harga juga sangat kompetitif!"
              </p>
              <p className="font-semibold text-pink-900">- Rina Wijaya</p>
            </div>

            <div className="bg-pink-50 p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-3">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700 mb-4">
                "Klinik ini benar-benar terpercaya. Dokter menjelaskan setiap treatment dengan detail dan tidak ada biaya tersembunyi."
              </p>
              <p className="font-semibold text-pink-900">- Dewi Lestari</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
