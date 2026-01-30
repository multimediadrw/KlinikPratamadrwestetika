export default function GaleriPage() {
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

      {/* Before After Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-4">Before & After</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Hasil nyata dari pasien kami yang telah melakukan berbagai treatment di klinik kami
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-pink-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
                <div className="aspect-square bg-gradient-to-br from-pink-200 to-pink-100 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-6xl mb-2 block">✨</span>
                    <p className="text-pink-700 font-semibold">Before & After</p>
                    <p className="text-pink-600 text-sm">Treatment Result</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-pink-900 mb-1">Treatment Name</h3>
                  <p className="text-sm text-gray-600">Hasil setelah X sesi</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinic Facilities */}
      <section className="py-20 bg-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-4">Fasilitas Klinik</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Klinik modern dengan fasilitas lengkap dan nyaman untuk kenyamanan Anda
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: '🏥', title: 'Ruang Treatment' },
              { icon: '🛋️', title: 'Ruang Tunggu' },
              { icon: '💻', title: 'Konsultasi Room' },
              { icon: '🧴', title: 'Product Display' },
              { icon: '🚿', title: 'Ruang Cuci' },
              { icon: '❄️', title: 'AC Room' },
              { icon: '📱', title: 'Free WiFi' },
              { icon: '🅿️', title: 'Parking Area' }
            ].map((facility, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-center">
                <div className="text-5xl mb-3">{facility.icon}</div>
                <h3 className="font-bold text-pink-900">{facility.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-4">Proses Treatment</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Langkah-langkah profesional untuk hasil maksimal
          </p>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { step: '1', title: 'Konsultasi', desc: 'Analisis kulit & kebutuhan' },
              { step: '2', title: 'Persiapan', desc: 'Pembersihan & sterilisasi' },
              { step: '3', title: 'Treatment', desc: 'Prosedur oleh dokter' },
              { step: '4', title: 'After Care', desc: 'Perawatan pasca treatment' }
            ].map((process) => (
              <div key={process.step} className="text-center">
                <div className="w-20 h-20 bg-pink-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-xl font-bold text-pink-900 mb-2">{process.title}</h3>
                <p className="text-gray-600">{process.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="py-20 bg-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-4">Peralatan Modern</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Teknologi terkini untuk hasil treatment yang optimal
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: 'HIFU Ultraformer MPT', desc: 'Non-invasive facelift technology' },
              { name: 'IPL Machine', desc: 'Intense Pulsed Light therapy' },
              { name: 'Dermapen EPN', desc: 'Advanced microneedling device' },
              { name: 'LED Light Therapy', desc: 'Multi-spectrum light treatment' },
              { name: 'Skin Analyzer', desc: 'Digital skin analysis system' },
              { name: 'Sterilization Equipment', desc: 'Medical-grade sterilizer' }
            ].map((equipment, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="aspect-video bg-gradient-to-br from-pink-200 to-pink-100 rounded-xl mb-4 flex items-center justify-center">
                  <span className="text-5xl">🔬</span>
                </div>
                <h3 className="text-xl font-bold text-pink-900 mb-2">{equipment.name}</h3>
                <p className="text-gray-600 text-sm">{equipment.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-4">Testimoni Pasien</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Apa kata mereka yang telah merasakan layanan kami
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: 'Sarah M.', treatment: 'Facial Prime', rating: 5, text: 'Pelayanan sangat memuaskan! Kulit saya jadi lebih glowing dan sehat. Dokternya ramah dan profesional.' },
              { name: 'Dina K.', treatment: 'HIFU Treatment', rating: 5, text: 'Hasil HIFU nya amazing! Wajah lebih kencang tanpa operasi. Sangat recommended!' },
              { name: 'Rina P.', treatment: 'Chemical Peeling', rating: 5, text: 'Bekas jerawat saya berkurang signifikan setelah peeling. Harga juga terjangkau. Thank you DRW!' }
            ].map((testimonial, index) => (
              <div key={index} className="bg-pink-50 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-pink-300 rounded-full flex items-center justify-center text-2xl mr-3">
                    👤
                  </div>
                  <div>
                    <h3 className="font-bold text-pink-900">{testimonial.name}</h3>
                    <p className="text-sm text-pink-600">{testimonial.treatment}</p>
                  </div>
                </div>
                <div className="text-yellow-500 mb-3">
                  {'⭐'.repeat(testimonial.rating)}
                </div>
                <p className="text-gray-700 italic">&quot;{testimonial.text}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-pink-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ingin Hasil Seperti Mereka?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Jadwalkan konsultasi gratis dan dapatkan treatment terbaik untuk kulit Anda!
          </p>
          <a 
            href="/kontak" 
            className="bg-white text-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-50 transition-all duration-300 inline-block shadow-lg"
          >
            Booking Sekarang
          </a>
        </div>
      </section>
    </main>
  );
}
