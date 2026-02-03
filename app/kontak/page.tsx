export default function KontakPage() {
  return (
    <main>
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Hubungi Kami</h1>
          <p className="text-xl">Kami siap melayani Anda dengan sepenuh hati</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-pink-900 mb-6">Kirim Pesan</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Nama Lengkap</label>
                  <input type="text" className="w-full px-4 py-2 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-600" placeholder="Masukkan nama Anda" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-2 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-600" placeholder="Masukkan email Anda" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Nomor Telepon</label>
                  <input type="tel" className="w-full px-4 py-2 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-600" placeholder="Masukkan nomor telepon Anda" />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Pesan</label>
                  <textarea className="w-full px-4 py-2 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-600" rows={5} placeholder="Masukkan pesan Anda"></textarea>
                </div>
                <button type="submit" className="w-full bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                  Kirim Pesan
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-pink-900 mb-6">Informasi Kontak</h2>

              <div className="mb-8 pb-8 border-b-2 border-pink-200">
                <h3 className="text-2xl font-bold text-pink-700 mb-4">📍 Cabang Magelang</h3>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <strong>Alamat:</strong><br/>
                    Jl. Diponegoro No. 123, Magelang, Jawa Tengah 56117
                  </p>
                  <p className="text-gray-700">
                    <strong>Telepon:</strong><br/>
                    <a href="tel:+6274123456" className="text-pink-600 hover:text-pink-700">(0274) 123-456</a>
                  </p>
                  <p className="text-gray-700">
                    <strong>WhatsApp:</strong><br/>
                    <a href="https://wa.me/6287654321098" className="text-pink-600 hover:text-pink-700">+62 876-5432-1098</a>
                  </p>
                  <p className="text-gray-700">
                    <strong>Jam Operasional:</strong><br/>
                    Senin - Sabtu: 09:00 - 20:00<br/>
                    Minggu: 10:00 - 18:00
                  </p>
                </div>
              </div>

              <div className="mb-8 pb-8 border-b-2 border-pink-200">
                <h3 className="text-2xl font-bold text-pink-700 mb-4">📍 Cabang Purworejo</h3>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <strong>Alamat:</strong><br/>
                    Jl. Ahmad Yani No. 456, Purworejo, Jawa Tengah 54111
                  </p>
                  <p className="text-gray-700">
                    <strong>Telepon:</strong><br/>
                    <a href="tel:+6275234567" className="text-pink-600 hover:text-pink-700">(0275) 234-567</a>
                  </p>
                  <p className="text-gray-700">
                    <strong>WhatsApp:</strong><br/>
                    <a href="https://wa.me/6287765432109" className="text-pink-600 hover:text-pink-700">+62 877-6543-2109</a>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-pink-700 mb-4">📍 Cabang Kutoarjo</h3>
                <div className="space-y-3">
                  <p className="text-gray-700">
                    <strong>Alamat:</strong><br/>
                    Jl. Sudirman No. 789, Kutoarjo, Jawa Tengah 54211
                  </p>
                  <p className="text-gray-700">
                    <strong>Telepon:</strong><br/>
                    <a href="tel:+6274345678" className="text-pink-600 hover:text-pink-700">(0274) 345-678</a>
                  </p>
                  <p className="text-gray-700">
                    <strong>WhatsApp:</strong><br/>
                    <a href="https://wa.me/6287876543210" className="text-pink-600 hover:text-pink-700">+62 878-7654-3210</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
