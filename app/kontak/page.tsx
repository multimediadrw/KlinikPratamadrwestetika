'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { LocationMap } from '@/app/components/ui/expand-map';

export default function KontakPage() {
  const [selectedLocation, setSelectedLocation] = useState<number>(1);

  const locations = [
    {
      id: 1,
      name: 'Magelang',
      alamat: 'Jl. Merdeka No. 123, Magelang, Jawa Tengah 56115',
      telepon: '+62 274-123-456',
      jam: 'Senin - Jumat: 08:00 - 17:00\nSabtu: 08:00 - 15:00\nMinggu: Tutup',
      mapsUrl: 'https://maps.app.goo.gl/Y6LRRxuRz8SCDTuq7',
    },
    {
      id: 2,
      name: 'Purworejo',
      alamat: 'Jl. Ahmad Yani No. 456, Purworejo, Jawa Tengah 54111',
      telepon: '+62 752-34-567',
      jam: 'Senin - Jumat: 08:00 - 17:00\nSabtu: 08:00 - 15:00\nMinggu: Tutup',
      mapsUrl: 'https://maps.app.goo.gl/TGAZe47Lgt25MKub6',
    },
    {
      id: 3,
      name: 'Kutoarjo',
      alamat: 'Jl. Diponegoro No. 789, Kutoarjo, Jawa Tengah 54211',
      telepon: '+62 756-45-678',
      jam: 'Senin - Jumat: 08:00 - 17:00\nSabtu: 08:00 - 15:00\nMinggu: Tutup',
      mapsUrl: 'https://maps.app.goo.gl/QuCy6UBdZQw8KWFe9',
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

      {/* Location Selector & Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Location Tabs */}
            <div className="flex justify-center gap-4 mb-12">
              {locations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => setSelectedLocation(location.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    selectedLocation === location.id
                      ? 'bg-pink-600 text-white shadow-lg scale-105'
                      : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
                  }`}
                >
                  {location.name}
                </button>
              ))}
            </div>

            {/* Map Container */}
            {selected && (
              <div className="space-y-8">
                {/* Location Map Component */}
                <div className="flex justify-center">
                  <button
                    onClick={() => window.open(selected.mapsUrl, '_blank')}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <LocationMap
                      location={selected.name}
                      coordinates={selected.alamat}
                      className="w-full max-w-sm"
                    />
                  </button>
                </div>

                {/* Location Details Below Map */}
                <div className="bg-pink-50 rounded-2xl p-8 border-2 border-pink-200">
                  <h2 className="text-3xl font-bold text-pink-900 mb-8">{selected.name}</h2>

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
