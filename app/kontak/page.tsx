export const revalidate = 60;

export default function KontakPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Hubungi Kami</h1>
          <p className="text-xl">Kami siap membantu Anda</p>
        </div>
      </section>

      <section className="py-20 bg-pink-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-pink-900 text-center mb-12">Informasi Kontak</h2>
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-pink-900 mb-4">📞 Telepon</h3>
              <p className="text-gray-600 mb-2">Hubungi kami melalui nomor telepon untuk konsultasi</p>
              <p className="text-pink-600 font-bold">Tersedia di setiap cabang</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-pink-900 mb-4">💬 WhatsApp</h3>
              <p className="text-gray-600 mb-2">Chat langsung dengan tim kami untuk konsultasi gratis</p>
              <p className="text-green-600 font-bold">Respon cepat dan profesional</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-pink-900 mb-4">📍 Lokasi</h3>
              <p className="text-gray-600">Kami memiliki 3 cabang di Magelang, Purworejo, dan Kutoarjo</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
