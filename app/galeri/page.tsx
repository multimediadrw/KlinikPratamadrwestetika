import Image from 'next/image';

export default function GaleriPage() {
  const facilityImages = [
    { id: 1, title: 'Ruang Konsultasi', image: '/DSC00303.JPG' },
    { id: 2, title: 'Ruang Treatment', image: '/DSC00368.JPG' },
    { id: 3, title: 'Peralatan Medis', image: '/DSC00924.JPG' },
    { id: 4, title: 'Area Sterilisasi', image: '/DSC00980.JPG' },
    { id: 5, title: 'Ruang Tunggu', image: '/DSC00981.JPG' },
    { id: 6, title: 'Ruang Operasi', image: '/DSC00984.JPG' },
    { id: 7, title: 'Teknologi Laser', image: '/DSC01022.JPG' },
    { id: 8, title: 'Ruang Pemulihan', image: '/DSC01715.JPG' },
    { id: 9, title: 'Laboratorium', image: '/DSC01721.JPG' },
    { id: 10, title: 'Ruang Perawatan', image: '/DSC02863.JPG' },
    { id: 11, title: 'Area Administrasi', image: '/DSC02868.JPG' },
    { id: 12, title: 'Area Parkir', image: '/IMG_1124.JPG' },
    { id: 13, title: 'Lobby Klinik', image: '/IMG_1127.JPG' },
    { id: 14, title: 'Ruang Edukasi', image: '/IMG_1157.JPG' },
    { id: 15, title: 'Fasilitas Tambahan', image: '/MRY03299.JPG' },
    { id: 16, title: 'Ruang VIP', image: '/MRY03321.JPG' },
  ];

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

      {/* Facilities Gallery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-4">Fasilitas Klinik Kami</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Fasilitas lengkap dengan standar internasional untuk kenyamanan dan keamanan pasien
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {facilityImages.map((item) => (
              <div key={item.id} className="bg-pink-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-48 bg-gray-200">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-pink-900">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
