import Image from 'next/image';

export default function GaleriPage() {
  const facilityImages = [
    {
      id: 1,
      title: 'Ruang Konsultasi Modern',
      description: 'Ruang konsultasi yang nyaman dan modern untuk diskusi dengan dokter',
      image: '/DSC00303.JPG'
    },
    {
      id: 2,
      title: 'Ruang Treatment Premium',
      description: 'Ruang treatment yang dirancang untuk kenyamanan dan privasi pasien',
      image: '/DSC00368.JPG'
    },
    {
      id: 3,
      title: 'Peralatan Medis Terkini',
      description: 'Menggunakan peralatan medis terbaru dan teknologi terdepan',
      image: '/DSC00924.JPG'
    },
    {
      id: 4,
      title: 'Fasilitas Sterilisasi',
      description: 'Standar kebersihan dan sterilisasi yang ketat',
      image: '/DSC00980.JPG'
    },
    {
      id: 5,
      title: 'Area Tunggu Pasien',
      description: 'Area tunggu yang nyaman dengan desain modern',
      image: '/DSC00981.JPG'
    },
    {
      id: 6,
      title: 'Ruang Operasi',
      description: 'Ruang operasi dengan standar internasional',
      image: '/DSC00984.JPG'
    },
    {
      id: 7,
      title: 'Teknologi Laser',
      description: 'Peralatan laser terbaru untuk treatment yang presisi',
      image: '/DSC01022.JPG'
    },
    {
      id: 8,
      title: 'Ruang Recovery',
      description: 'Ruang pemulihan yang nyaman setelah treatment',
      image: '/DSC01715.JPG'
    },
    {
      id: 9,
      title: 'Fasilitas Laboratorium',
      description: 'Laboratorium lengkap untuk pemeriksaan medis',
      image: '/DSC01721.JPG'
    },
    {
      id: 10,
      title: 'Ruang Perawatan Khusus',
      description: 'Ruang perawatan dengan teknologi canggih',
      image: '/DSC02863.JPG'
    },
    {
      id: 11,
      title: 'Area Administrasi',
      description: 'Area administrasi yang profesional dan terorganisir',
      image: '/DSC02868.JPG'
    },
    {
      id: 12,
      title: 'Fasilitas Parkir',
      description: 'Parkir yang luas dan aman untuk kenyamanan pasien',
      image: '/IMG_1124.JPG'
    },
    {
      id: 13,
      title: 'Lobby Klinik',
      description: 'Lobby yang elegan dan menyambut pasien dengan baik',
      image: '/IMG_1127.JPG'
    },
    {
      id: 14,
      title: 'Ruang Edukasi',
      description: 'Ruang untuk edukasi dan konsultasi pasien',
      image: '/IMG_1157.JPG'
    },
    {
      id: 15,
      title: 'Fasilitas Tambahan',
      description: 'Fasilitas pendukung untuk kenyamanan maksimal',
      image: '/MRY03299.JPG'
    },
    {
      id: 16,
      title: 'Ruang VIP',
      description: 'Ruang VIP dengan privasi dan kenyamanan eksklusif',
      image: '/MRY03321.JPG'
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Siti Nurhaliza',
      rating: 5,
      text: 'Hasil treatment saya sangat memuaskan! Kulit terasa lebih cerah dan segar. Dokter dan staff sangat profesional dan ramah.',
    },
    {
      id: 2,
      name: 'Rina Wijaya',
      rating: 5,
      text: 'Saya sudah mencoba beberapa treatment dan semuanya memberikan hasil yang bagus. Harga juga sangat kompetitif!',
    },
    {
      id: 3,
      name: 'Dewi Lestari',
      rating: 5,
      text: 'Klinik ini benar-benar terpercaya. Dokter menjelaskan setiap treatment dengan detail dan tidak ada biaya tersembunyi.',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Galeri</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Lihat hasil perawatan dan fasilitas klinik kami
          </p>
        </div>
      </section>

      {/* Facilities Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-4">Fasilitas Klinik Kami</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Fasilitas lengkap dengan standar internasional untuk kenyamanan dan keamanan pasien
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <h3 className="text-lg font-bold text-pink-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-pink-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-12">Testimoni Pasien</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
                <p className="font-semibold text-pink-900">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-12">Mengapa Memilih Kami?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: '👨‍⚕️', title: 'Dokter Profesional', desc: 'Spesialis estetika medis berpengalaman' },
              { icon: '🔬', title: 'Teknologi Terkini', desc: 'Peralatan medis terbaru dan teruji' },
              { icon: '✅', title: 'Aman & Terpercaya', desc: 'Standar medis internasional' },
              { icon: '💝', title: 'Harga Terjangkau', desc: 'Kualitas premium dengan harga kompetitif' }
            ].map((item, i) => (
              <div key={i} className="bg-pink-50 rounded-xl p-6 text-center shadow-lg">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-pink-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
