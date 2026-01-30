export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-6">Klinik Pratama DRW Estetika</h1>
          <p className="text-2xl mb-8 max-w-2xl mx-auto">
            Klinik kecantikan dan estetika medis profesional dengan teknologi terkini
          </p>
          <button className="bg-white text-pink-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-pink-50 transition">
            Konsultasi Gratis
          </button>
        </div>
      </section>
      {/* Services Overview */}
      <section className="py-20 bg-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-16">Layanan Kami</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-2xl font-bold text-pink-900 mb-4">Anti Acne</h3>
              <p className="text-gray-600">Treatment profesional untuk mengatasi jerawat dan bekas jerawat</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="text-2xl font-bold text-pink-900 mb-4">Anti Aging</h3>
              <p className="text-gray-600">Perawatan premium untuk menjaga kulit tetap muda dan bercahaya</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-5xl mb-4">💆</div>
              <h3 className="text-2xl font-bold text-pink-900 mb-4">Body Treatment</h3>
              <p className="text-gray-600">Perawatan lengkap untuk seluruh tubuh dengan teknologi terkini</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
