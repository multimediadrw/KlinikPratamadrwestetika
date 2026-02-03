'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';

export default function KontakPage() {
  const [selectedLocation, setSelectedLocation] = useState<number>(1);

  const locations = [
    {
      id: 1,
      name: 'Magelang',
      position: { top: '20%', left: '15%' },
      alamat: 'Jl. Merdeka No. 123, Magelang, Jawa Tengah 56115',
      telepon: '+62 274-123-456',
      jam: 'Senin - Jumat: 08:00 - 17:00\nSabtu: 08:00 - 15:00\nMinggu: Tutup',
    },
    {
      id: 2,
      name: 'Purworejo',
      position: { top: '30%', right: '20%' },
      alamat: 'Jl. Ahmad Yani No. 456, Purworejo, Jawa Tengah 54111',
      telepon: '+62 752-34-567',
      jam: 'Senin - Jumat: 08:00 - 17:00\nSabtu: 08:00 - 15:00\nMinggu: Tutup',
    },
    {
      id: 3,
      name: 'Kutoarjo',
      position: { bottom: '20%', left: '25%' },
      alamat: 'Jl. Diponegoro No. 789, Kutoarjo, Jawa Tengah 54211',
      telepon: '+62 756-45-678',
      jam: 'Senin - Jumat: 08:00 - 17:00\nSabtu: 08:00 - 15:00\nMinggu: Tutup',
    },
  ];

  const selected = locations.find(loc => loc.id === selectedLocation);

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

      {/* Map Section with Location Overlays */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Map Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-96 bg-white">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000&h=600&fit=crop"
                alt="Lokasi Klinik DRW Estetika"
                className="w-full h-full object-cover"
              />

              {/* Location Markers */}
              {locations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => setSelectedLocation(location.id)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 group"
                  style={location.position}
                >
                  {/* Marker Circle */}
                  <div
                    className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                      selectedLocation === location.id
                        ? 'bg-pink-600 scale-125 shadow-lg'
                        : 'bg-white border-4 border-pink-400 hover:scale-110'
                    }`}
                  >
                    <span className={`text-lg font-bold ${selectedLocation === location.id ? 'text-white' : 'text-pink-600'}`}>
                      📍
                    </span>
                  </div>

                  {/* Label Badge */}
                  <div
                    className={`absolute top-full mt-3 px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${
                      selectedLocation === location.id
                        ? 'bg-pink-600 text-white shadow-lg'
                        : 'bg-white text-pink-600 border-2 border-pink-200 group-hover:bg-pink-50'
                    }`}
                  >
                    {location.name}
                  </div>
                </button>
              ))}
            </div>

            {/* Location Details Below Map */}
            {selected && (
              <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg border-2 border-pink-100">
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Alamat */}
                  <div>
                    <h3 className="text-lg font-bold text-pink-900 mb-3 flex items-center gap-2">
                      <span className="text-2xl">📍</span> Alamat
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selected.alamat}
                    </p>
                  </div>

                  {/* Telepon */}
                  <div>
                    <h3 className="text-lg font-bold text-pink-900 mb-3 flex items-center gap-2">
                      <span className="text-2xl">📞</span> Telepon
                    </h3>
                    <a
                      href={`tel:${selected.telepon.replace(/\s/g, '')}`}
                      className="text-pink-600 hover:text-pink-700 font-semibold text-lg block mb-4"
                    >
                      {selected.telepon}
                    </a>
                    <Button asChild className="w-full">
                      <a href="https://wa.me/6285712859999" target="_blank" rel="noopener noreferrer">
                        💬 Chat WhatsApp
                      </a>
                    </Button>
                  </div>

                  {/* Jam Operasional */}
                  <div>
                    <h3 className="text-lg font-bold text-pink-900 mb-3 flex items-center gap-2">
                      <span className="text-2xl">⏰</span> Jam Operasional
                    </h3>
                    <div className="text-gray-700 space-y-1">
                      {selected.jam.split('\n').map((line, idx) => (
                        <p key={idx} className="text-sm">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
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
