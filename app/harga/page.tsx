import Link from 'next/link';

export default function HargaPage() {
  return (
    <main>
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Harga & Paket</h1>
          <p className="text-xl">Harga kompetitif dengan kualitas terbaik</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-center text-gray-600 mb-12">Kami menawarkan harga yang kompetitif dan terjangkau dengan kualitas treatment terbaik</p>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-pink-900 mb-6">💆‍♀️ Facial Treatment</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-2 border-pink-200 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-pink-900 mb-2">Facial Basic</h3>
                <p className="text-gray-600 mb-4">Perawatan dasar untuk membersihkan dan mencerahkan kulit</p>
                <p className="text-3xl font-bold text-pink-600 mb-4">Rp 350.000</p>
                <p className="text-sm text-gray-600">Durasi: 60 menit</p>
              </div>
              <div className="border-2 border-pink-200 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-pink-900 mb-2">Facial Prime</h3>
                <p className="text-gray-600 mb-4">Perawatan premium dengan serum dan treatment tambahan</p>
                <p className="text-3xl font-bold text-pink-600 mb-4">Rp 550.000</p>
                <p className="text-sm text-gray-600">Durasi: 90 menit</p>
              </div>
              <div className="border-2 border-pink-200 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-pink-900 mb-2">Facial Brightening</h3>
                <p className="text-gray-600 mb-4">Khusus untuk mencerahkan dan meratakan warna kulit</p>
                <p className="text-3xl font-bold text-pink-600 mb-4">Rp 450.000</p>
                <p className="text-sm text-gray-600">Durasi: 75 menit</p>
              </div>
              <div className="border-2 border-pink-200 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-pink-900 mb-2">Facial Anti-Aging</h3>
                <p className="text-gray-600 mb-4">Untuk mengurangi garis halus dan meremajakan kulit</p>
                <p className="text-3xl font-bold text-pink-600 mb-4">Rp 600.000</p>
                <p className="text-sm text-gray-600">Durasi: 90 menit</p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-pink-900 mb-6">✨ Advanced Treatment</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-2 border-pink-200 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-pink-900 mb-2">HIFU</h3>
                <p className="text-gray-600 mb-4">Teknologi ultrasonik untuk lifting dan mengencangkan kulit</p>
                <p className="text-3xl font-bold text-pink-600 mb-4">Rp 2.500.000</p>
                <p className="text-sm text-gray-600">Durasi: 60-90 menit</p>
              </div>
              <div className="border-2 border-pink-200 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-pink-900 mb-2">IPL</h3>
                <p className="text-gray-600 mb-4">Untuk menghilangkan bintik hitam dan meratakan warna kulit</p>
                <p className="text-3xl font-bold text-pink-600 mb-4">Rp 1.200.000</p>
                <p className="text-sm text-gray-600">Durasi: 30-45 menit</p>
              </div>
              <div className="border-2 border-pink-200 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-pink-900 mb-2">Dermapen</h3>
                <p className="text-gray-600 mb-4">Micro-needling untuk merangsang produksi kolagen</p>
                <p className="text-3xl font-bold text-pink-600 mb-4">Rp 1.500.000</p>
                <p className="text-sm text-gray-600">Durasi: 45-60 menit</p>
              </div>
              <div className="border-2 border-pink-200 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-pink-900 mb-2">Chemical Peeling</h3>
                <p className="text-gray-600 mb-4">Untuk mengangkat sel kulit mati dan regenerasi kulit</p>
                <p className="text-3xl font-bold text-pink-600 mb-4">Rp 800.000</p>
                <p className="text-sm text-gray-600">Durasi: 45 menit</p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-pink-900 mb-6">💉 Injection Treatment</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-2 border-pink-200 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-pink-900 mb-2">Botox</h3>
                <p className="text-gray-600 mb-4">Untuk menghilangkan garis halus dan kerutan</p>
                <p className="text-3xl font-bold text-pink-600 mb-4">Rp 1.500.000</p>
                <p className="text-sm text-gray-600">Durasi: 15-20 menit</p>
              </div>
              <div className="border-2 border-pink-200 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-pink-900 mb-2">Filler</h3>
                <p className="text-gray-600 mb-4">Untuk menambah volume dan mengisi kerutan</p>
                <p className="text-3xl font-bold text-pink-600 mb-4">Rp 2.000.000</p>
                <p className="text-sm text-gray-600">Durasi: 20-30 menit</p>
              </div>
              <div className="border-2 border-pink-200 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-pink-900 mb-2">Mesotherapy</h3>
                <p className="text-gray-600 mb-4">Injeksi vitamin dan nutrisi untuk meremajakan kulit</p>
                <p className="text-3xl font-bold text-pink-600 mb-4">Rp 1.200.000</p>
                <p className="text-sm text-gray-600">Durasi: 30-45 menit</p>
              </div>
              <div className="border-2 border-pink-200 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-pink-900 mb-2">Thread Lift</h3>
                <p className="text-gray-600 mb-4">Lifting non-operasi menggunakan benang khusus</p>
                <p className="text-3xl font-bold text-pink-600 mb-4">Rp 3.500.000</p>
                <p className="text-sm text-gray-600">Durasi: 45-60 menit</p>
              </div>
            </div>
          </div>

          <div className="bg-pink-50 p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-pink-900 mb-4">💳 Metode Pembayaran</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <span className="text-2xl mr-3">💰</span>
                <span className="text-gray-700">Tunai</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-3">🏦</span>
                <span className="text-gray-700">Transfer Bank</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-3">💳</span>
                <span className="text-gray-700">Kartu Debit/Kredit</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl mr-3">📱</span>
                <span className="text-gray-700">E-wallet</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Dapatkan Konsultasi Gratis</h2>
          <p className="text-xl mb-8">Hubungi kami sekarang untuk konsultasi gratis dan penawaran khusus</p>
          <Link href="/kontak" className="bg-white text-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-50 inline-block">
            Hubungi Kami Sekarang
          </Link>
        </div>
      </section>
    </main>
  );
}
