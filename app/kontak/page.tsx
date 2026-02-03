'use client';

import { Button } from '@/app/components/ui/button';

export default function KontakPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Hubungi Kami</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Kami memiliki 3 cabang di Jawa Tengah siap melayani Anda
          </p>
        </div>
      </section>

      {/* Main Content - 2 Column Layout */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-start">
            {/* Left Column - Map */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-pink-900">Lokasi Cabang Kami</h2>
              
              {/* Map Container */}
              <div className="bg-gradient-to-br from-pink-100 to-pink-50 rounded-2xl overflow-hidden shadow-lg h-96 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=400&fit=crop"
                  alt="Lokasi Klinik DRW Estetika"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Map Info */}
              <div className="bg-pink-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-pink-900 mb-3">Jangkauan Kami</h3>
                <p className="text-gray-700 text-sm">
                  Klinik DRW Estetika memiliki 3 cabang strategis di Jawa Tengah untuk melayani Anda dengan lebih baik.
                </p>
              </div>
            </div>

            {/* Right Column - Location Details */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-pink-900">Informasi Cabang</h2>

              {/* Magelang */}
              <div className="bg-white border-2 border-pink-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-600 text-white font-bold">
                      1
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-pink-900">Magelang</h3>
                    <p className="text-sm text-gray-600">Cabang Utama</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-gray-700 ml-14">
                  <div>
                    <p className="font-semibold text-gray-900">📍 Alamat</p>
                    <p>Jl. Merdeka No. 123, Magelang, Jawa Tengah 56115</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">📞 Telepon</p>
                    <a href="tel:+6274123456" className="text-pink-600 hover:text-pink-700 font-medium">
                      +62 274-123-456
                    </a>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">⏰ Jam Operasional</p>
                    <p>Senin - Jumat: 08:00 - 17:00</p>
                    <p>Sabtu: 08:00 - 15:00</p>
                    <p>Minggu: Tutup</p>
                  </div>
                </div>

                <Button asChild className="w-full mt-4 ml-14">
                  <a href="https://wa.me/6285712859999" target="_blank" rel="noopener noreferrer">
                    💬 Chat WhatsApp
                  </a>
                </Button>
              </div>

              {/* Purworejo */}
              <div className="bg-white border-2 border-pink-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-600 text-white font-bold">
                      2
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-pink-900">Purworejo</h3>
                    <p className="text-sm text-gray-600">Cabang Cabang</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-gray-700 ml-14">
                  <div>
                    <p className="font-semibold text-gray-900">📍 Alamat</p>
                    <p>Jl. Ahmad Yani No. 456, Purworejo, Jawa Tengah 54111</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">📞 Telepon</p>
                    <a href="tel:+6275234567" className="text-pink-600 hover:text-pink-700 font-medium">
                      +62 752-34-567
                    </a>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">⏰ Jam Operasional</p>
                    <p>Senin - Jumat: 08:00 - 17:00</p>
                    <p>Sabtu: 08:00 - 15:00</p>
                    <p>Minggu: Tutup</p>
                  </div>
                </div>

                <Button asChild className="w-full mt-4 ml-14">
                  <a href="https://wa.me/6285712859999" target="_blank" rel="noopener noreferrer">
                    💬 Chat WhatsApp
                  </a>
                </Button>
              </div>

              {/* Kutoarjo */}
              <div className="bg-white border-2 border-pink-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-600 text-white font-bold">
                      3
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-pink-900">Kutoarjo</h3>
                    <p className="text-sm text-gray-600">Cabang Cabang</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-gray-700 ml-14">
                  <div>
                    <p className="font-semibold text-gray-900">📍 Alamat</p>
                    <p>Jl. Diponegoro No. 789, Kutoarjo, Jawa Tengah 54211</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">📞 Telepon</p>
                    <a href="tel:+6275645678" className="text-pink-600 hover:text-pink-700 font-medium">
                      +62 756-45-678
                    </a>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">⏰ Jam Operasional</p>
                    <p>Senin - Jumat: 08:00 - 17:00</p>
                    <p>Sabtu: 08:00 - 15:00</p>
                    <p>Minggu: Tutup</p>
                  </div>
                </div>

                <Button asChild className="w-full mt-4 ml-14">
                  <a href="https://wa.me/6285712859999" target="_blank" rel="noopener noreferrer">
                    💬 Chat WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-pink-900 mb-12">
            Hubungi Kami Melalui Formulir
          </h2>

          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                  placeholder="Masukkan nama Anda"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                    placeholder="email@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                    placeholder="+62 xxx-xxxx-xxxx"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                  Subjek
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                  placeholder="Topik pertanyaan Anda"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none resize-none"
                  placeholder="Tulis pesan Anda di sini..."
                  required
                />
              </div>

              <Button type="submit" className="w-full py-3 text-base font-semibold">
                Kirim Pesan
              </Button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Kami akan merespon pesan Anda dalam waktu 24 jam
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
