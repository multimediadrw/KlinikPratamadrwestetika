export default function GaleriPage() {
  const galeriItems = [
    { id: 1, image: "/galeri/galeri-1.jpg", title: "Konsultasi Treatment Profesional" },
    { id: 2, image: "/galeri/galeri-2.jpg", title: "Perawatan Wajah Intensif" },
    { id: 3, image: "/galeri/galeri-3.jpg", title: "Facial Mask Treatment" },
    { id: 4, image: "/galeri/galeri-4.jpg", title: "Perawatan Kulit Premium" },
    { id: 5, image: "/galeri/galeri-5.jpg", title: "LED Light Therapy - Blue Light" },
    { id: 6, image: "/galeri/galeri-6.jpg", title: "LED Light Therapy - Red Light" },
    { id: 7, image: "/galeri/galeri-7.jpg", title: "LED Light Therapy - Green Light" },
    { id: 8, image: "/galeri/galeri-8.jpg", title: "Laser Treatment Session" },
    { id: 9, image: "/galeri/galeri-9.jpg", title: "Spa Facial Treatment" }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Galeri Kami</h1>
          <p className="text-xl">Dokumentasi Perawatan dan Teknologi Terkini</p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-pink-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galeriItems.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                <div className="relative h-80 overflow-hidden bg-gray-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 w-full">
                      <h3 className="text-white text-lg font-bold">{item.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Gallery Matters */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Galeri Kami Menunjukkan</h2>
            <p className="text-xl text-gray-600">
              Setiap foto adalah bukti nyata dari komitmen kami terhadap kualitas perawatan dan kepuasan pelanggan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-bold text-pink-600 mb-3">100%</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Profesional</h3>
              <p className="text-gray-600">Semua treatment dilakukan oleh tim profesional bersertifikat</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-pink-600 mb-3">✓</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Teknologi Terkini</h3>
              <p className="text-gray-600">Menggunakan peralatan medis terbaru dan tercanggih</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-pink-600 mb-3">★</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Hasil Maksimal</h3>
              <p className="text-gray-600">Hasil nyata yang terlihat dan memuaskan</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-600 to-pink-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Tertarik dengan Perawatan Kami?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Hubungi kami sekarang untuk konsultasi gratis dan dapatkan penawaran spesial
          </p>
          <button className="bg-white text-pink-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-pink-50 transition-all duration-300 hover:shadow-lg">
            Hubungi Kami Sekarang
          </button>
        </div>
      </section>
    </main>
  );
}
