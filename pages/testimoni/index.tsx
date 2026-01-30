export default function TestimoniPage() {
  const testimonials = [
    {
      id: 1,
      title: "Flek karena pekerjaan jaga stand di Pasar Malam",
      description: "Flek karena pekerjaan jaga stand di Pasar Malam memudari setelah pakai Paket Radiant Brightening dari DRW Skincare",
      image: "/testimoni/testimoni-1.png",
      treatment: "Paket Radiant Brightening",
      hashtag: "#CantikmuBerawalDariSini"
    },
    {
      id: 2,
      title: "Siapa sangka kulit kusam bisa berubah jadi glowing cuma dengan rutin pakai ini?",
      description: "Hasil perawatan dengan Paket Daily Ceramoist - Facial Wash for Normal Skin, Sunscreen Glowing, Daily Ceramoist Hydra Gel",
      image: "/testimoni/testimoni-2.png",
      treatment: "Paket Daily Ceramoist",
      hashtag: "#CantikmuBerawalDariSini"
    },
    {
      id: 3,
      title: "Bekas jerawat memudari, wajah jadi makin glowing!",
      description: "Hasil perawatan dengan Glowtech Spicule Rejuvenation - teknologi terkini untuk mengatasi bekas jerawat",
      image: "/testimoni/testimoni-3.png",
      treatment: "Glowtech Spicule Rejuvenation",
      hashtag: "#CantikmuBerawalDariSini"
    },
    {
      id: 4,
      title: "Lia Beauty's Journey - Transformasi Kulit Luar Biasa",
      description: "Hasil perawatan dengan Paket Bekas Jerawat - Daily Ceramoist, Serum AHA BHA, Toner Lime, Serum Luminous",
      image: "/testimoni/testimoni-4.png",
      treatment: "Paket Bekas Jerawat",
      hashtag: "#CantikmuBerawalDariSini"
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Galeri Testimoni</h1>
          <p className="text-xl">Transformasi Kecantikan dari Pelanggan Kami</p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-pink-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Image */}
                <div className="relative h-96 overflow-hidden bg-gray-200">
                  <img
                    src={testimonial.image}
                    alt={testimonial.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-pink-900 mb-3 line-clamp-2">
                    {testimonial.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {testimonial.description}
                  </p>

                  {/* Treatment Badge */}
                  <div className="mb-4">
                    <span className="inline-block bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-semibold">
                      {testimonial.treatment}
                    </span>
                  </div>

                  {/* Hashtag */}
                  <p className="text-pink-600 font-semibold text-sm">
                    {testimonial.hashtag}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-600 to-pink-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ingin Transformasi Seperti Mereka?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Jadilah bagian dari ribuan pelanggan puas yang telah merasakan perubahan luar biasa
          </p>
          <button className="bg-white text-pink-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-pink-50 transition-all duration-300 hover:shadow-lg">
            Konsultasi Gratis Sekarang
          </button>
        </div>
      </section>
    </main>
  );
}
