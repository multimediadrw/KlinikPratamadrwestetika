export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Premium Hero Section with Animations */}
      <section className="relative min-h-screen bg-gradient-to-br from-pink-600 via-pink-500 to-rose-600 overflow-hidden flex items-center justify-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          {/* Animated Badge */}
          <div className="inline-block mb-6 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 animate-fade-in">
            <span className="text-white text-sm font-semibold">✨ Klinik Kecantikan Terpercaya</span>
          </div>

          {/* Main Headline with Animation */}
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up leading-tight">
            Transformasi Kecantikan <br />
            <span className="bg-gradient-to-r from-yellow-200 to-pink-100 bg-clip-text text-transparent">Anda Dimulai Di Sini</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto animate-fade-in-up animation-delay-200 leading-relaxed">
            Teknologi terkini & dokter profesional untuk hasil kecantikan yang maksimal dan aman
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
            <button className="group relative px-8 py-4 bg-white text-pink-600 font-bold text-lg rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105">
              <span className="relative z-10">Konsultasi Gratis</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-rose-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm hover:scale-105">
              Lihat Testimoni
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Services Section with Stagger Animation */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Layanan Unggulan Kami</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Solusi kecantikan lengkap dengan teknologi terdepan dan tim profesional</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="group relative bg-gradient-to-br from-pink-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-pink-100">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">✨</div>
                <h3 className="text-2xl font-bold text-pink-900 mb-3">Anti Acne</h3>
                <p className="text-gray-600 leading-relaxed">Treatment profesional untuk mengatasi jerawat dan bekas jerawat dengan teknologi laser terkini</p>
              </div>
            </div>

            {/* Service Card 2 */}
            <div className="group relative bg-gradient-to-br from-rose-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-rose-100">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🌟</div>
                <h3 className="text-2xl font-bold text-rose-900 mb-3">Anti Aging</h3>
                <p className="text-gray-600 leading-relaxed">Perawatan premium untuk menjaga kulit tetap muda, kencang, dan bercahaya alami</p>
              </div>
            </div>

            {/* Service Card 3 */}
            <div className="group relative bg-gradient-to-br from-pink-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-pink-100">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">💆</div>
                <h3 className="text-2xl font-bold text-pink-900 mb-3">Body Treatment</h3>
                <p className="text-gray-600 leading-relaxed">Perawatan lengkap untuk seluruh tubuh dengan teknologi advanced dan hasil maksimal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gradient-to-b from-pink-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-center text-gray-900 mb-16">Mengapa Memilih Kami?</h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-pink-600 text-white">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Dokter Bersertifikat</h3>
                <p className="text-gray-600">Tim dokter spesialis berpengalaman dengan sertifikasi internasional</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-pink-600 text-white">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Teknologi Terkini</h3>
                <p className="text-gray-600">Peralatan medis terbaru dengan standar internasional</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-pink-600 text-white">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Hasil Terjamin</h3>
                <p className="text-gray-600">Ribuan pelanggan puas dengan hasil nyata dan aman</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-pink-600 text-white">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Harga Kompetitif</h3>
                <p className="text-gray-600">Paket treatment terjangkau dengan kualitas premium</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Styles for Animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }

        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </main>
  );
}
