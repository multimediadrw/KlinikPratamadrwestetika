import Image from 'next/image';

export default function GaleriPage() {
  const beforeAfterImages = [
    {
      id: 1,
      title: 'Facial Treatment Result',
      description: 'Hasil perawatan facial yang memberikan kulit lebih cerah dan segar',
      image: '/pasted_file_SQjfAM_image.png'
    },
    {
      id: 2,
      title: 'HIFU Treatment Result',
      description: 'Hasil lifting kulit yang terlihat lebih kencang dan muda',
      image: '/pasted_file_fNcxfh_image.png'
    },
    {
      id: 3,
      title: 'IPL Treatment Result',
      description: 'Hasil penghilangan bintik hitam dan perataan warna kulit',
      image: '/pasted_file_dKeFHo_image.png'
    },
    {
      id: 4,
      title: 'Filler Treatment Result',
      description: 'Hasil penambahan volume dan pengisian kerutan',
      image: '/pasted_file_EqD5T0_image.png'
    },
    {
      id: 5,
      title: 'Botox Treatment Result',
      description: 'Hasil pengurangan garis halus dan kerutan di wajah',
      image: '/pasted_file_qcYvPo_image.png'
    },
    {
      id: 6,
      title: 'Dermapen Treatment Result',
      description: 'Hasil perbaikan tekstur kulit dan pengurangan bekas jerawat',
      image: '/pasted_file_9zK78k_image.png'
    },
    {
      id: 7,
      title: 'Chemical Peeling Result',
      description: 'Hasil pengelupasan kulit untuk tekstur lebih halus',
      image: '/pasted_file_GnBcXp_image.png'
    },
    {
      id: 8,
      title: 'Laser Treatment Result',
      description: 'Hasil perawatan laser untuk kulit yang lebih mulus',
      image: '/pasted_file_lmVBPP_image.png'
    },
    {
      id: 9,
      title: 'PRP Treatment Result',
      description: 'Hasil regenerasi kulit menggunakan plasma darah',
      image: '/pasted_file_et7yhb_image.png'
    },
    {
      id: 10,
      title: 'Microneedling Result',
      description: 'Hasil perawatan mikro jarum untuk kulit lebih muda',
      image: '/pasted_file_hYY9Mx_image.png'
    },
    {
      id: 11,
      title: 'Acne Treatment Result',
      description: 'Hasil perawatan jerawat yang efektif dan aman',
      image: '/pasted_file_mnZQTV_image.png'
    },
    {
      id: 12,
      title: 'Whitening Treatment Result',
      description: 'Hasil perawatan pemutihan kulit yang alami',
      image: '/pasted_file_n6iIGo_image.png'
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Siti Nurhaliza',
      rating: 5,
      text: 'Hasil treatment saya sangat memuaskan! Kulit terasa lebih cerah dan segar. Dokter dan staff sangat profesional dan ramah.',
      image: '/pasted_file_r2PO27_image.png'
    },
    {
      id: 2,
      name: 'Rina Wijaya',
      rating: 5,
      text: 'Saya sudah mencoba beberapa treatment dan semuanya memberikan hasil yang bagus. Harga juga sangat kompetitif!',
      image: '/pasted_file_qcYvPo_image.png'
    },
    {
      id: 3,
      name: 'Dewi Lestari',
      rating: 5,
      text: 'Klinik ini benar-benar terpercaya. Dokter menjelaskan setiap treatment dengan detail dan tidak ada biaya tersembunyi.',
      image: '/pasted_file_SQjfAM_image.png'
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

      {/* Gallery Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-4">Before & After</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Hasil nyata dari pasien kami yang telah melakukan berbagai treatment di klinik kami
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beforeAfterImages.map((item) => (
              <div key={item.id} className="bg-pink-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative h-64 bg-gray-200">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-pink-900 mb-2">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
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
                  <div className="relative w-16 h-16 mr-4 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-pink-900">{testimonial.name}</p>
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-12">Fasilitas Kami</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-pink-100">
              <div className="h-48 bg-gradient-to-br from-pink-200 to-pink-300 rounded-lg flex items-center justify-center mb-6">
                <span className="text-6xl">🏥</span>
              </div>
              <h3 className="text-2xl font-bold text-pink-900 mb-3">Ruang Konsultasi Modern</h3>
              <p className="text-gray-700">Ruang konsultasi yang nyaman dan modern untuk diskusi dengan dokter</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-pink-100">
              <div className="h-48 bg-gradient-to-br from-pink-200 to-pink-300 rounded-lg flex items-center justify-center mb-6">
                <span className="text-6xl">🛏️</span>
              </div>
              <h3 className="text-2xl font-bold text-pink-900 mb-3">Ruang Treatment Nyaman</h3>
              <p className="text-gray-700">Ruang treatment yang dirancang untuk kenyamanan dan privasi pasien</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-pink-100">
              <div className="h-48 bg-gradient-to-br from-pink-200 to-pink-300 rounded-lg flex items-center justify-center mb-6">
                <span className="text-6xl">🔬</span>
              </div>
              <h3 className="text-2xl font-bold text-pink-900 mb-3">Peralatan Medis Terkini</h3>
              <p className="text-gray-700">Menggunakan peralatan medis terbaru dan teknologi terdepan</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-pink-100">
              <div className="h-48 bg-gradient-to-br from-pink-200 to-pink-300 rounded-lg flex items-center justify-center mb-6">
                <span className="text-6xl">🧼</span>
              </div>
              <h3 className="text-2xl font-bold text-pink-900 mb-3">Standar Kebersihan Tinggi</h3>
              <p className="text-gray-700">Menjaga standar kebersihan dan sterilisasi yang ketat</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
