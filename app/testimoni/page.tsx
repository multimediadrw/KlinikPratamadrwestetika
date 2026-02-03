import Image from 'next/image';

export default function TestimoniPage() {
  const testimonials = [
    {
      id: 1,
      title: 'Flek Karena Pekerjaan Jaga Stand di Pasar Malam',
      description: 'Flek karena pekerjaan jaga stand di Pasar Malam memudar setelah pakai Paket Radiant Brightening dari DRW Skincare',
      treatment: 'Paket Radiant Brightening',
      beforeImage: '/Screenshot2026-01-30144608.png',
      afterImage: '/Screenshot2026-01-30144608.png',
    },
    {
      id: 2,
      title: 'Kulit Kusam Berubah Jadi Glowing',
      description: 'Hasil Pemakaian: Paket Daily Ceramoist, Facial Wash for Normal Skin, Sunscreen Glowing, Daily Ceramoist Hydra Gel',
      treatment: 'Paket Daily Ceramoist',
      beforeImage: '/Screenshot2026-01-30144343.png',
      afterImage: '/Screenshot2026-01-30144343.png',
    },
    {
      id: 3,
      title: 'Transformasi Kulit Sehat',
      description: 'Hasil Pemakaian: Paket Bekas Jerawat, Daily Ceramoist, Serum AHA BHA, Toner Lime, Serum Luminous',
      treatment: 'Paket Bekas Jerawat',
      beforeImage: '/Screenshot2026-01-30144226.png',
      afterImage: '/Screenshot2026-01-30144226.png',
    },
    {
      id: 4,
      title: 'Bekas Jerawat Memudar, Wajah Makin Glowing',
      description: 'Hasil Pemakaian: Glowtech Spicule Rejuvenation - Teknologi terkini untuk menghilangkan bekas jerawat dan membuat wajah lebih glowing',
      treatment: 'Glowtech Spicule Rejuvenation',
      beforeImage: '/Screenshot2026-01-30144125.png',
      afterImage: '/Screenshot2026-01-30144125.png',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Testimoni Pasien</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Lihat transformasi kulit pasien kami setelah menggunakan treatment dan produk DRW Skincare
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Before & After Images */}
                <div className="bg-gradient-to-r from-pink-300 to-pink-500 p-4">
                  <div className="grid grid-cols-2 gap-3">
                    {/* Before */}
                    <div className="text-center">
                      <div className="relative h-32 mb-2 rounded-lg overflow-hidden bg-gray-200">
                        <Image
                          src={testimonial.beforeImage}
                          alt="Before"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-white text-xs font-bold">BEFORE</p>
                    </div>

                    {/* After */}
                    <div className="text-center">
                      <div className="relative h-32 mb-2 rounded-lg overflow-hidden bg-gray-200">
                        <Image
                          src={testimonial.afterImage}
                          alt="After"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-white text-xs font-bold">AFTER</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-pink-900 mb-3">{testimonial.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{testimonial.description}</p>
                  <div className="pt-4 border-t border-pink-200">
                    <p className="text-pink-600 font-semibold text-sm">{testimonial.treatment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-pink-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-pink-900 mb-6">Ingin Hasil Seperti Mereka?</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Konsultasikan kebutuhan kulit Anda dengan dokter kami dan dapatkan treatment yang tepat untuk hasil maksimal
          </p>
          <a
            href="https://wa.me/6285712859999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
          >
            Hubungi Kami via WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
