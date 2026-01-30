'use client';

export const dynamic = 'force-dynamic';
interface Branch {
  nama: string;
  alamat: string;
  telp: string;
  whatsapp: string[];
  jam?: string;
  mapsLink: string;
  keterangan?: string;
}

const branches: Branch[] = [
  {
    nama: 'Klinik Pratama DRW Estetika Magelang',
    alamat: 'Jl. Jendral Sudirman No. 89, Rejowinangun Selatan, Kec. Magelang Selatan, Magelang 59214',
    telp: '(0293) 3195 392',
    whatsapp: ['085799643777'],
    mapsLink: 'https://maps.app.goo.gl/example-magelang',
    keterangan: 'Cabang Magelang'
  },
  {
    nama: 'Klinik Pratama DRW Estetika Purworejo',
    alamat: 'Jl. Jendral Sudirman No. 1, Purworejo, Jawa Tengah, Indonesia 54111',
    telp: '0275-7530777',
    whatsapp: ['085712859999', '082323606087'],
    mapsLink: 'https://maps.app.goo.gl/example-purworejo',
    keterangan: 'Cabang Purworejo - KONSULTASI GRATIS'
  },
  {
    nama: 'Klinik Pratama DRW Estetika Kutoarjo',
    alamat: 'Jl. Mardi Usodo Timur Alun-alun No. 6, Kutoarjo',
    telp: '0275-6451864',
    whatsapp: ['085360005684'],
    mapsLink: 'https://maps.app.goo.gl/VtQpUWGEh3b2xLVF8',
    jam: '08:00 - 18:00',
    keterangan: 'Cabang Kutoarjo - KONSULTASI GRATIS'
  }
];

export default function LokasiKontakPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Lokasi & Kontak Kami</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Kunjungi salah satu cabang kami atau hubungi untuk konsultasi gratis
          </p>
        </div>
      </section>

      {/* Branches */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {branches.map((branch, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-8 items-start">
                {/* Map */}
                <div className="bg-gray-200 rounded-2xl overflow-hidden shadow-lg" style={{ height: '400px' }}>
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <span className="text-6xl mb-4 block">🗺️</span>
                      <p className="text-lg">Google Maps</p>
                      <p className="text-sm mt-2">{branch.alamat}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-pink-900 mb-2">{branch.nama}</h2>
                    {branch.keterangan && (
                      <p className="text-pink-600 font-semibold text-lg">{branch.keterangan}</p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="bg-pink-50 p-6 rounded-xl">
                    <h3 className="text-lg font-bold text-pink-900 mb-2">📍 Alamat</h3>
                    <p className="text-gray-700 leading-relaxed">{branch.alamat}</p>
                  </div>

                  {/* Phone */}
                  <div className="bg-pink-50 p-6 rounded-xl">
                    <h3 className="text-lg font-bold text-pink-900 mb-3">📞 Telepon</h3>
                    <a 
                      href={`tel:${branch.telp.replace(/\D/g, '')}`}
                      className="text-pink-600 hover:text-pink-700 font-semibold text-lg block mb-2"
                    >
                      {branch.telp}
                    </a>
                  </div>

                  {/* WhatsApp */}
                  <div className="bg-green-50 p-6 rounded-xl">
                    <h3 className="text-lg font-bold text-green-900 mb-3">💬 WhatsApp</h3>
                    <div className="space-y-2">
                      {branch.whatsapp.map((wa, idx) => (
                        <a
                          key={idx}
                          href={`https://wa.me/62${wa.replace(/^0/, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-700 font-semibold block"
                        >
                          {wa} {branch.whatsapp.length > 1 && `(Admin ${idx + 1})`}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Operating Hours */}
                  {branch.jam && (
                    <div className="bg-blue-50 p-6 rounded-xl">
                      <h3 className="text-lg font-bold text-blue-900 mb-2">🕐 Jam Operasional</h3>
                      <p className="text-blue-700 font-semibold">{branch.jam}</p>
                    </div>
                  )}

                  {/* Maps Link */}
                  <a
                    href={branch.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 px-6 rounded-lg font-semibold text-center transition-all duration-300 block"
                  >
                    Buka di Google Maps
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-12">Hubungi Kami Sekarang</h2>
          
          <div className="max-w-3xl mx-auto">
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
                <label htmlFor="branch" className="block text-gray-700 font-semibold mb-2">
                  Pilih Cabang
                </label>
                <select
                  id="branch"
                  name="branch"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
                >
                  <option value="">Pilih Cabang</option>
                  {branches.map((branch, idx) => (
                    <option key={idx} value={branch.nama}>
                      {branch.keterangan || branch.nama}
                    </option>
                  ))}
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

      {/* Quick Contact */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-pink-900 text-center mb-12">Hubungi Kami Dengan Cepat</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {branches.map((branch, idx) => (
              <div key={idx} className="bg-pink-50 p-6 rounded-2xl text-center">
                <h3 className="font-bold text-pink-900 mb-4">{branch.keterangan || `Cabang ${idx + 1}`}</h3>
                
                <div className="space-y-3">
                  <a 
                    href={`tel:${branch.telp.replace(/\D/g, '')}`}
                    className="block bg-white hover:bg-pink-100 text-pink-600 font-semibold py-2 px-4 rounded-lg transition-all"
                  >
                    📞 {branch.telp}
                  </a>
                  
                  <a
                    href={`https://wa.me/62${branch.whatsapp[0].replace(/^0/, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-green-100 hover:bg-green-200 text-green-700 font-semibold py-2 px-4 rounded-lg transition-all"
                  >
                    💬 WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
