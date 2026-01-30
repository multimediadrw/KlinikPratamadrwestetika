import Link from 'next/link';

export default function HargaPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Daftar Harga</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Harga terjangkau dengan kualitas premium untuk perawatan kecantikan Anda
          </p>
        </div>
      </section>

      {/* Pricing Notice */}
      <section className="py-12 bg-pink-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-700">
              💡 <strong>Catatan:</strong> Harga dapat berubah sewaktu-waktu. Untuk informasi harga terbaru 
              dan promo spesial, silakan hubungi kami atau kunjungi klinik langsung.
            </p>
          </div>
        </div>
      </section>

      {/* Facial Treatment Pricing */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-12">Facial Treatment</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-pink-50 p-8 rounded-2xl shadow-lg border-2 border-pink-200">
              <h3 className="text-2xl font-bold text-pink-900 mb-4">Facial Basic</h3>
              <div className="text-4xl font-bold text-pink-600 mb-4">Rp 150.000</div>
              <ul className="space-y-3 text-gray-700 mb-6">
                <li>✓ Deep cleansing</li>
                <li>✓ Ekstraksi komedo</li>
                <li>✓ Masker sesuai jenis kulit</li>
                <li>✓ Moisturizer & sunscreen</li>
                <li>✓ Durasi: 60 menit</li>
              </ul>
              <Link 
                href="/kontak" 
                className="block text-center bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-full font-semibold transition-all"
              >
                Booking Sekarang
              </Link>
            </div>

            <div className="bg-gradient-to-br from-pink-100 to-pink-50 p-8 rounded-2xl shadow-lg border-2 border-pink-400">
              <div className="bg-pink-600 text-white px-4 py-1 rounded-full inline-block mb-4 text-sm font-semibold">
                RECOMMENDED
              </div>
              <h3 className="text-2xl font-bold text-pink-900 mb-4">Facial Prime</h3>
              <div className="text-4xl font-bold text-pink-600 mb-4">Rp 300.000</div>
              <ul className="space-y-3 text-gray-700 mb-6">
                <li>✓ Semua benefit Facial Basic</li>
                <li>✓ Serum premium (Vitamin C/HA)</li>
                <li>✓ LED Light Therapy</li>
                <li>✓ Massage wajah profesional</li>
                <li>✓ Durasi: 90 menit</li>
              </ul>
              <Link 
                href="/kontak" 
                className="block text-center bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-full font-semibold transition-all"
              >
                Booking Sekarang
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Treatment Pricing */}
      <section className="py-20 bg-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-12">Advanced Treatment</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-pink-900 mb-4">HIFU Ultraformer MPT</h3>
              <div className="text-3xl font-bold text-pink-600 mb-4">Mulai dari<br/>Rp 2.500.000</div>
              <p className="text-gray-600 text-sm mb-4">*Harga tergantung area treatment</p>
              <ul className="space-y-2 text-gray-700 text-sm mb-6">
                <li>✓ Full face: Rp 3.500.000</li>
                <li>✓ Face + neck: Rp 4.500.000</li>
                <li>✓ Hasil tahan 1-2 tahun</li>
              </ul>
              <Link 
                href="/kontak" 
                className="block text-center bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-full font-semibold transition-all"
              >
                Konsultasi
              </Link>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-pink-900 mb-4">IPL Treatment</h3>
              <div className="text-3xl font-bold text-pink-600 mb-4">Rp 800.000</div>
              <p className="text-gray-600 text-sm mb-4">*Per sesi, full face</p>
              <ul className="space-y-2 text-gray-700 text-sm mb-6">
                <li>✓ Paket 3x: Rp 2.100.000</li>
                <li>✓ Paket 5x: Rp 3.500.000</li>
                <li>✓ Disarankan 3-5 sesi</li>
              </ul>
              <Link 
                href="/kontak" 
                className="block text-center bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-full font-semibold transition-all"
              >
                Konsultasi
              </Link>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-pink-900 mb-4">Dermapen EPN</h3>
              <div className="text-3xl font-bold text-pink-600 mb-4">Rp 600.000</div>
              <p className="text-gray-600 text-sm mb-4">*Per sesi, full face</p>
              <ul className="space-y-2 text-gray-700 text-sm mb-6">
                <li>✓ Paket 3x: Rp 1.650.000</li>
                <li>✓ Paket 5x: Rp 2.700.000</li>
                <li>✓ Interval 4-6 minggu</li>
              </ul>
              <Link 
                href="/kontak" 
                className="block text-center bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-full font-semibold transition-all"
              >
                Konsultasi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Injection Treatment Pricing */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-12">Injection Treatment</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-pink-50 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-pink-900 mb-4">Botox</h3>
              <div className="text-3xl font-bold text-pink-600 mb-4">Mulai dari<br/>Rp 1.500.000</div>
              <p className="text-gray-600 text-sm mb-4">*Harga tergantung area dan jumlah unit</p>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>✓ Dahi: Rp 1.500.000 - 2.000.000</li>
                <li>✓ Crow&apos;s feet: Rp 1.500.000</li>
                <li>✓ Glabella: Rp 1.500.000</li>
                <li>✓ Hasil bertahan 4-6 bulan</li>
              </ul>
              <Link 
                href="/kontak" 
                className="block text-center bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-full font-semibold transition-all"
              >
                Konsultasi
              </Link>
            </div>

            <div className="bg-pink-50 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-pink-900 mb-4">Filler</h3>
              <div className="text-3xl font-bold text-pink-600 mb-4">Mulai dari<br/>Rp 2.500.000</div>
              <p className="text-gray-600 text-sm mb-4">*Harga per 1cc, tergantung area</p>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li>✓ Nose filler: Rp 3.000.000 - 4.000.000</li>
                <li>✓ Chin filler: Rp 2.500.000 - 3.500.000</li>
                <li>✓ Lip filler: Rp 2.500.000 - 3.000.000</li>
                <li>✓ Hasil bertahan 9-12 bulan</li>
              </ul>
              <Link 
                href="/kontak" 
                className="block text-center bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-full font-semibold transition-all"
              >
                Konsultasi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Chemical Peeling Pricing */}
      <section className="py-20 bg-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-12">Chemical Peeling</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-b md:border-b-0 md:border-r border-pink-200 pb-6 md:pb-0 md:pr-6">
                  <h3 className="text-xl font-bold text-pink-900 mb-4">Peeling Basic</h3>
                  <div className="text-3xl font-bold text-pink-600 mb-4">Rp 250.000</div>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>✓ Glycolic Acid</li>
                    <li>✓ Salicylic Acid</li>
                    <li>✓ Lactic Acid</li>
                    <li>✓ Paket 3x: Rp 650.000</li>
                  </ul>
                </div>
                <div className="pt-6 md:pt-0 md:pl-6">
                  <h3 className="text-xl font-bold text-pink-900 mb-4">Peeling Advanced</h3>
                  <div className="text-3xl font-bold text-pink-600 mb-4">Rp 500.000</div>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>✓ TCA Peel</li>
                    <li>✓ Jessner Peel</li>
                    <li>✓ Yellow Peel</li>
                    <li>✓ Paket 3x: Rp 1.350.000</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 text-center">
                <Link 
                  href="/kontak" 
                  className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full font-semibold transition-all"
                >
                  Booking Sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Package Deals */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-4">Paket Hemat</h2>
          <p className="text-center text-gray-600 mb-12">Dapatkan harga lebih hemat dengan paket treatment kami</p>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-pink-100 to-pink-50 p-8 rounded-2xl shadow-lg border-2 border-pink-300">
              <h3 className="text-2xl font-bold text-pink-900 mb-2">Paket Glowing</h3>
              <p className="text-gray-600 text-sm mb-4">Untuk kulit kusam</p>
              <div className="text-3xl font-bold text-pink-600 mb-4">Rp 1.200.000</div>
              <ul className="space-y-2 text-gray-700 text-sm mb-6">
                <li>✓ 3x Facial Prime</li>
                <li>✓ 1x Chemical Peeling</li>
                <li>✓ Hemat Rp 300.000</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-pink-100 to-pink-50 p-8 rounded-2xl shadow-lg border-2 border-pink-300">
              <h3 className="text-2xl font-bold text-pink-900 mb-2">Paket Acne Care</h3>
              <p className="text-gray-600 text-sm mb-4">Untuk kulit berjerawat</p>
              <div className="text-3xl font-bold text-pink-600 mb-4">Rp 1.500.000</div>
              <ul className="space-y-2 text-gray-700 text-sm mb-6">
                <li>✓ 3x Facial Basic</li>
                <li>✓ 3x Peeling Salicylic</li>
                <li>✓ Hemat Rp 450.000</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-pink-100 to-pink-50 p-8 rounded-2xl shadow-lg border-2 border-pink-300">
              <h3 className="text-2xl font-bold text-pink-900 mb-2">Paket Anti-Aging</h3>
              <p className="text-gray-600 text-sm mb-4">Untuk kulit mature</p>
              <div className="text-3xl font-bold text-pink-600 mb-4">Rp 4.500.000</div>
              <ul className="space-y-2 text-gray-700 text-sm mb-6">
                <li>✓ 1x HIFU Full Face</li>
                <li>✓ 3x IPL Treatment</li>
                <li>✓ Hemat Rp 1.000.000</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-pink-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Konsultasi Gratis Sekarang!</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Tidak yakin treatment mana yang cocok? Konsultasikan dengan dokter kami secara gratis!
          </p>
          <Link 
            href="/kontak" 
            className="bg-white text-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-50 transition-all duration-300 inline-block shadow-lg"
          >
            Hubungi Kami
          </Link>
        </div>
      </section>
    </main>
  );
}
