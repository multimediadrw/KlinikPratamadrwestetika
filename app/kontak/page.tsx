

export const revalidate = 60;
export default function KontakPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Hubungi Kami</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Kami siap membantu Anda dengan konsultasi gratis dan informasi lengkap
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            <div className="text-center bg-pink-50 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📍</span>
              </div>
              <h3 className="text-xl font-bold text-pink-900 mb-2">Alamat</h3>
              <p className="text-gray-700">
                Jl. Contoh No. 123<br />
                Kota, Provinsi 12345<br />
                Indonesia
              </p>
            </div>

            <div className="text-center bg-pink-50 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📞</span>
              </div>
              <h3 className="text-xl font-bold text-pink-900 mb-2">Telepon</h3>
              <p className="text-gray-700">
                +62 XXX-XXXX-XXXX<br />
                +62 XXX-XXXX-XXXX<br />
                (WhatsApp Available)
              </p>
            </div>

            <div className="text-center bg-pink-50 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✉️</span>
              </div>
              <h3 className="text-xl font-bold text-pink-900 mb-2">Email</h3>
              <p className="text-gray-700">
                info@drwestetika.com<br />
                konsultasi@drwestetika.com
              </p>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="max-w-3xl mx-auto bg-pink-50 p-8 rounded-2xl mb-16">
            <h2 className="text-3xl font-bold text-pink-900 text-center mb-6">Jam Operasional</h2>
            <div className="grid md:grid-cols-2 gap-6 text-center">
              <div>
                <h3 className="text-xl font-bold text-pink-900 mb-3">Senin - Jumat</h3>
                <p className="text-gray-700 text-lg">09:00 - 20:00 WIB</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-pink-900 mb-3">Sabtu - Minggu</h3>
                <p className="text-gray-700 text-lg">09:00 - 18:00 WIB</p>
              </div>
            </div>
            <p className="text-center text-gray-600 mt-6">
              * Hari libur nasional tutup atau by appointment
            </p>
          </div>

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-pink-900 text-center mb-8">Formulir Konsultasi</h2>
            <form className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                    placeholder="Nama Anda"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                    No. Telepon/WhatsApp *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                    placeholder="+62 XXX-XXXX-XXXX"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                  placeholder="email@example.com"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="service" className="block text-gray-700 font-semibold mb-2">
                  Layanan yang Diminati
                </label>
                <select
                  id="service"
                  name="service"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                >
                  <option value="">Pilih Layanan</option>
                  <option value="facial-basic">Facial Basic</option>
                  <option value="facial-prime">Facial Prime</option>
                  <option value="hifu">HIFU Ultraformer MPT</option>
                  <option value="ipl">IPL (Intense Pulsed Light)</option>
                  <option value="dermapen">Dermapen EPN</option>
                  <option value="botox">Botox</option>
                  <option value="filler">Filler</option>
                  <option value="peeling">Chemical Peeling</option>
                  <option value="konsultasi">Konsultasi Umum</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                  Pesan/Pertanyaan
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                  placeholder="Ceritakan keluhan atau pertanyaan Anda..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Kirim Pesan
              </button>

              <p className="text-center text-gray-600 mt-4 text-sm">
                * Wajib diisi. Kami akan merespons dalam 1x24 jam.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-pink-900 text-center mb-8">Lokasi Kami</h2>
          <div className="max-w-5xl mx-auto bg-gray-200 rounded-2xl overflow-hidden" style={{height: '400px'}}>
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <div className="text-center">
                <span className="text-6xl mb-4 block">🗺️</span>
                <p className="text-lg">Google Maps akan ditampilkan di sini</p>
                <p className="text-sm mt-2">Embed Google Maps iframe untuk lokasi klinik</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-pink-900 mb-8">Ikuti Kami di Media Sosial</h2>
          <div className="flex justify-center gap-6 flex-wrap">
            <a href="#" className="w-16 h-16 bg-pink-600 hover:bg-pink-700 rounded-full flex items-center justify-center text-white text-2xl transition-all">
              📷
            </a>
            <a href="#" className="w-16 h-16 bg-pink-600 hover:bg-pink-700 rounded-full flex items-center justify-center text-white text-2xl transition-all">
              📘
            </a>
            <a href="#" className="w-16 h-16 bg-pink-600 hover:bg-pink-700 rounded-full flex items-center justify-center text-white text-2xl transition-all">
              💬
            </a>
            <a href="#" className="w-16 h-16 bg-pink-600 hover:bg-pink-700 rounded-full flex items-center justify-center text-white text-2xl transition-all">
              🎵
            </a>
          </div>
          <p className="text-gray-600 mt-6">
            Instagram • Facebook • WhatsApp • TikTok
          </p>
        </div>
      </section>
    </main>
  );
}
