import Link from 'next/link';

export default function LayananPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Layanan Kami</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Treatment estetika medis profesional dengan teknologi terkini dan dokter berpengalaman
          </p>
        </div>
      </section>

      {/* Facial Treatment */}
      <section id="facial" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-12">Facial Treatment</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-pink-50 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-pink-900 mb-4">Facial Basic</h3>
              <p className="text-gray-700 mb-4">
                Perawatan wajah dasar yang cocok untuk semua jenis kulit. Meliputi pembersihan mendalam, 
                ekstraksi komedo, masker, dan moisturizer.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Deep cleansing</li>
                <li>✓ Ekstraksi komedo</li>
                <li>✓ Masker sesuai jenis kulit</li>
                <li>✓ Moisturizer & sunscreen</li>
              </ul>
            </div>

            <div className="bg-pink-50 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-pink-900 mb-4">Facial Prime</h3>
              <p className="text-gray-700 mb-4">
                Perawatan wajah premium dengan serum khusus dan teknologi canggih untuk hasil maksimal 
                dan kulit lebih sehat bercahaya.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Semua benefit Facial Basic</li>
                <li>✓ Serum premium (Vitamin C, Hyaluronic Acid)</li>
                <li>✓ LED Light Therapy</li>
                <li>✓ Massage wajah profesional</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Treatment */}
      <section id="advanced" className="py-20 bg-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-12">Advanced Treatment</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-pink-900 mb-4">HIFU Ultraformer MPT</h3>
              <p className="text-gray-700 mb-4">
                High-Intensity Focused Ultrasound untuk mengencangkan kulit wajah dan mengurangi 
                kerutan tanpa operasi.
              </p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>✓ Non-invasive facelift</li>
                <li>✓ Mengencangkan kulit kendur</li>
                <li>✓ Mengurangi garis halus</li>
                <li>✓ Hasil tahan hingga 1-2 tahun</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-pink-900 mb-4">IPL (Intense Pulsed Light)</h3>
              <p className="text-gray-700 mb-4">
                Teknologi cahaya untuk mengatasi berbagai masalah kulit seperti flek hitam, 
                kemerahan, dan pori-pori besar.
              </p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>✓ Menghilangkan flek hitam</li>
                <li>✓ Mencerahkan kulit</li>
                <li>✓ Mengurangi kemerahan</li>
                <li>✓ Mengecilkan pori-pori</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-pink-900 mb-4">Dermapen EPN</h3>
              <p className="text-gray-700 mb-4">
                Microneedling untuk merangsang produksi kolagen, mengatasi bekas jerawat, 
                dan meremajakan kulit.
              </p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>✓ Mengurangi bekas jerawat</li>
                <li>✓ Merangsang kolagen</li>
                <li>✓ Menghaluskan tekstur kulit</li>
                <li>✓ Menyamarkan stretch marks</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Injection Treatment */}
      <section id="injection" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-12">Injection Treatment</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-pink-50 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-pink-900 mb-4">Botox</h3>
              <p className="text-gray-700 mb-4">
                Treatment anti-aging untuk mengurangi kerutan dan garis halus di wajah dengan 
                hasil natural dan aman.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Mengurangi kerutan dahi</li>
                <li>✓ Menghaluskan garis senyum</li>
                <li>✓ Mengatasi crow's feet</li>
                <li>✓ Hasil bertahan 4-6 bulan</li>
              </ul>
            </div>

            <div className="bg-pink-50 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-pink-900 mb-4">Filler</h3>
              <p className="text-gray-700 mb-4">
                Dermal filler untuk mengisi volume wajah, membentuk kontur, dan mengatasi 
                kerutan dalam.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Membentuk hidung (nose filler)</li>
                <li>✓ Mempertegas dagu</li>
                <li>✓ Mengisi pipi yang cekung</li>
                <li>✓ Memperbesar bibir</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Chemical Peeling */}
      <section id="peeling" className="py-20 bg-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-12">Chemical Peeling</h2>
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
            <p className="text-lg text-gray-700 mb-6">
              Peeling medis untuk regenerasi kulit dengan mengangkat sel kulit mati dan merangsang 
              pertumbuhan sel kulit baru yang lebih sehat.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-pink-900 mb-3">Manfaat:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Mencerahkan kulit kusam</li>
                  <li>✓ Mengatasi jerawat aktif</li>
                  <li>✓ Mengurangi bekas jerawat</li>
                  <li>✓ Menghaluskan tekstur kulit</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-pink-900 mb-3">Jenis Peeling:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Glycolic Acid Peel</li>
                  <li>• Salicylic Acid Peel</li>
                  <li>• Lactic Acid Peel</li>
                  <li>• TCA Peel</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-pink-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Tertarik dengan Layanan Kami?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Konsultasikan kebutuhan perawatan Anda dengan dokter kami untuk mendapatkan 
            rekomendasi treatment yang tepat.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              href="/kontak" 
              className="bg-white text-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-50 transition-all duration-300 inline-block shadow-lg"
            >
              Konsultasi Sekarang
            </Link>
            <Link 
              href="/harga" 
              className="bg-pink-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-800 transition-all duration-300 inline-block shadow-lg"
            >
              Lihat Harga
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
