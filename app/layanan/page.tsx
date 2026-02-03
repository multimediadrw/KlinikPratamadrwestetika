export default function LayananPage() {
  return (
    <main>
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Layanan Kami</h1>
          <p className="text-xl">Berbagai pilihan treatment kecantikan dan estetika medis</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-pink-900 mb-6">💆‍♀️ Facial Treatment</h2>
            <p className="text-lg text-gray-700 mb-6">Perawatan wajah lengkap dari basic hingga premium dengan serum berkualitas tinggi</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-pink-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-pink-900 mb-3">Facial Basic</h3>
                <p className="text-gray-700 mb-3">Perawatan dasar untuk membersihkan dan mencerahkan kulit</p>
                <p className="text-pink-600 font-semibold">Durasi: 60 menit</p>
              </div>
              <div className="bg-pink-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-pink-900 mb-3">Facial Prime</h3>
                <p className="text-gray-700 mb-3">Perawatan premium dengan serum dan treatment tambahan</p>
                <p className="text-pink-600 font-semibold">Durasi: 90 menit</p>
              </div>
              <div className="bg-pink-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-pink-900 mb-3">Facial Brightening</h3>
                <p className="text-gray-700 mb-3">Khusus untuk mencerahkan dan meratakan warna kulit</p>
                <p className="text-pink-600 font-semibold">Durasi: 75 menit</p>
              </div>
              <div className="bg-pink-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-pink-900 mb-3">Facial Anti-Aging</h3>
                <p className="text-gray-700 mb-3">Untuk mengurangi garis halus dan meremajakan kulit</p>
                <p className="text-pink-600 font-semibold">Durasi: 90 menit</p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-4xl font-bold text-pink-900 mb-6">✨ Advanced Treatment</h2>
            <p className="text-lg text-gray-700 mb-6">Treatment teknologi terkini untuk hasil maksimal tanpa operasi</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-pink-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-pink-900 mb-3">HIFU</h3>
                <p className="text-gray-700 mb-3">Teknologi ultrasonik untuk lifting dan mengencangkan kulit</p>
                <p className="text-pink-600 font-semibold">Durasi: 60-90 menit</p>
              </div>
              <div className="bg-pink-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-pink-900 mb-3">IPL</h3>
                <p className="text-gray-700 mb-3">Untuk menghilangkan bintik hitam dan meratakan warna kulit</p>
                <p className="text-pink-600 font-semibold">Durasi: 30-45 menit</p>
              </div>
              <div className="bg-pink-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-pink-900 mb-3">Dermapen</h3>
                <p className="text-gray-700 mb-3">Micro-needling untuk merangsang produksi kolagen</p>
                <p className="text-pink-600 font-semibold">Durasi: 45-60 menit</p>
              </div>
              <div className="bg-pink-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-pink-900 mb-3">Chemical Peeling</h3>
                <p className="text-gray-700 mb-3">Untuk mengangkat sel kulit mati dan regenerasi kulit</p>
                <p className="text-pink-600 font-semibold">Durasi: 45 menit</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-pink-900 mb-6">💉 Injection Treatment</h2>
            <p className="text-lg text-gray-700 mb-6">Treatment injeksi untuk anti-aging dan peremajaan kulit</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-pink-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-pink-900 mb-3">Botox</h3>
                <p className="text-gray-700 mb-3">Untuk menghilangkan garis halus dan kerutan di wajah</p>
                <p className="text-pink-600 font-semibold">Durasi: 15-20 menit</p>
              </div>
              <div className="bg-pink-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-pink-900 mb-3">Filler</h3>
                <p className="text-gray-700 mb-3">Untuk menambah volume dan mengisi kerutan di wajah</p>
                <p className="text-pink-600 font-semibold">Durasi: 20-30 menit</p>
              </div>
              <div className="bg-pink-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-pink-900 mb-3">Mesotherapy</h3>
                <p className="text-gray-700 mb-3">Injeksi vitamin dan nutrisi untuk meremajakan kulit</p>
                <p className="text-pink-600 font-semibold">Durasi: 30-45 menit</p>
              </div>
              <div className="bg-pink-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-pink-900 mb-3">Thread Lift</h3>
                <p className="text-gray-700 mb-3">Lifting non-operasi menggunakan benang khusus</p>
                <p className="text-pink-600 font-semibold">Durasi: 45-60 menit</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
