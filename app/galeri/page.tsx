export const revalidate = 60;

export default function GaleriPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Galeri</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Lihat hasil perawatan dan transformasi pelanggan kami
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-16">Before & After</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="aspect-square bg-gradient-to-br from-pink-200 to-pink-100 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-6xl block mb-2">✨</span>
                    <p className="text-pink-700 font-semibold">Before & After</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-center">Hasil treatment profesional</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-16">Testimoni Pelanggan</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-pink-50 p-8 rounded-lg">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                Hasil treatment sangat memuaskan! Kulit saya jadi lebih cerah dan halus. Dokternya sangat profesional dan ramah.
              </p>
              <p className="font-bold text-pink-900">- Siti Nurhaliza</p>
            </div>
            <div className="bg-pink-50 p-8 rounded-lg">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                Bekas jerawat saya berkurang signifikan setelah treatment. Pelayanannya excellent dan harganya terjangkau!
              </p>
              <p className="font-bold text-pink-900">- Dian Sastrowardoyo</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
