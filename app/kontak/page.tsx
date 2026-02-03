'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { LocationMap } from '@/app/components/ui/expand-map';

export default function KontakPage() {
  const [selectedLocation, setSelectedLocation] = useState<number>(1);
  const [showContactModal, setShowContactModal] = useState(false);
  const [modalType, setModalType] = useState<'hubungi' | 'whatsapp'>('hubungi');

  const locations = [
    {
      id: 1,
      name: 'Magelang',
      alamat: 'Jl. Jend. Sudirman, Rejowinangun Sel., Kec. Magelang Sel., Kota Magelang, Jawa Tengah 59214',
      telepon: '+62 857-9964-3777',
      teleponClean: '6285712859999',
      mapsUrl: 'https://maps.app.goo.gl/Y6LRRxuRz8SCDTuq7',
    },
    {
      id: 2,
      name: 'Purworejo',
      alamat: 'Jl. Jenderal Sudirman No.1, Krajan, Pangenjurutengah, Kec. Purworejo, Kabupaten Purworejo, Jawa Tengah 54111',
      telepon: '+62 857-9964-3777',
      teleponClean: '6285712859999',
      mapsUrl: 'https://maps.app.goo.gl/TGAZe47Lgt25MKub6',
    },
    {
      id: 3,
      name: 'Kutoarjo',
      alamat: 'Jalan Mardi usodo timur alun-alun No.6, Kutoarjo, Kec. Kutoarjo, Kabupaten Purworejo, Jawa Tengah 54212',
      telepon: '+62 275 6451864',
      teleponClean: '62275645186',
      mapsUrl: 'https://maps.app.goo.gl/QuCy6UBdZQw8KWFe9',
    },
  ];

  const selected = locations.find(loc => loc.id === selectedLocation);

  const handleContactClick = (type: 'hubungi' | 'whatsapp') => {
    setModalType(type);
    setShowContactModal(true);
  };

  const handleSelectLocation = (locationId: number) => {
    const location = locations.find(loc => loc.id === locationId);
    if (!location) return;

    if (modalType === 'whatsapp') {
      window.open(`https://wa.me/${location.teleponClean}`, '_blank');
    } else {
      // For hubungi kami, just close modal and scroll to form
      setShowContactModal(false);
      setTimeout(() => {
        document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

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

      {/* Contact Info Section - 3 Cabang */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {locations.map((location) => (
              <div
                key={location.id}
                className="bg-gradient-to-br from-pink-600 to-pink-500 text-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-2xl font-bold mb-6">{location.name}</h3>

                <div className="space-y-4">
                  {/* Alamat */}
                  <div className="flex gap-3">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="text-sm opacity-90">Alamat</p>
                      <p className="text-sm font-semibold">{location.alamat}</p>
                    </div>
                  </div>

                  {/* Telepon */}
                  <div className="flex gap-3">
                    <span className="text-2xl">📞</span>
                    <div>
                      <p className="text-sm opacity-90">Telepon</p>
                      <a
                        href={`tel:${location.telepon.replace(/\s/g, '')}`}
                        className="text-sm font-semibold hover:underline"
                      >
                        {location.telepon}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Selector & Map Section */}
      <section className="py-20 bg-pink-50">
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
                      : 'bg-white text-pink-700 hover:bg-pink-100 border-2 border-pink-200'
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

                {/* Action Buttons */}
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={() => handleContactClick('hubungi')}
                    className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 text-lg"
                  >
                    📧 Hubungi Kami
                  </Button>
                  <Button
                    onClick={() => handleContactClick('whatsapp')}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                  >
                    💬 WhatsApp
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-pink-900 mb-12">
            Hubungi Kami Melalui Formulir
          </h2>

          <div className="max-w-2xl mx-auto bg-pink-50 rounded-2xl p-8 shadow-lg border-2 border-pink-200">
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

      {/* Modal untuk Pilih Cabang */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-pink-900 mb-6">
              {modalType === 'whatsapp' ? 'Chat WhatsApp ke Cabang Mana?' : 'Hubungi Cabang Mana?'}
            </h3>

            <div className="space-y-3">
              {locations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => handleSelectLocation(location.id)}
                  className="w-full bg-pink-50 hover:bg-pink-100 border-2 border-pink-200 rounded-lg p-4 text-left transition-all hover:shadow-lg"
                >
                  <div className="font-semibold text-pink-900">{location.name}</div>
                  <div className="text-sm text-gray-600 mt-1">{location.telepon}</div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowContactModal(false)}
              className="w-full mt-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg transition-all"
            >
              Batal
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
