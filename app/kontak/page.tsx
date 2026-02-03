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
      teleponClean: '6285799643777',
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
      teleponClean: '6285360005684',
      mapsUrl: 'https://maps.app.goo.gl/QuCy6UBdZQw8KWFe9',
    },
  ];

  const selected = locations.find(loc => loc.id === selectedLocation);

  const handleContactClick = (type: 'hubungi' | 'whatsapp') => {
    setModalType(type);
    setShowContactModal(true);
  };

  const handleSelectLocation = (locationId: number, whatsappNumber?: string) => {
    if (modalType === 'whatsapp' && whatsappNumber) {
      window.open(`https://wa.me/${whatsappNumber}`, '_blank');
    } else if (modalType === 'whatsapp') {
      const location = locations.find(loc => loc.id === locationId);
      if (location) {
        window.open(`https://wa.me/${location.teleponClean}`, '_blank');
      }
    } else {
      // For hubungi kami, just close modal
      setShowContactModal(false);
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

      {/* Location Selector & Map Section */}
      <section className="py-20 bg-pink-50 min-h-screen flex items-center">
        <div className="container mx-auto px-4 w-full">
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

                {/* Location Details */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-pink-200 max-w-2xl mx-auto">
                  <h3 className="text-3xl font-bold text-pink-900 mb-6">{selected.name}</h3>

                  <div className="space-y-4 mb-8">
                    {/* Alamat */}
                    <div className="flex gap-4">
                      <span className="text-3xl">📍</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-600 uppercase">Alamat</p>
                        <p className="text-lg text-gray-800">{selected.alamat}</p>
                      </div>
                    </div>

                    {/* Telepon */}
                    <div className="flex gap-4">
                      <span className="text-3xl">📞</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-600 uppercase">Telepon</p>
                        <a
                          href={`tel:${selected.telepon.replace(/\s/g, '')}`}
                          className="text-lg text-pink-600 font-semibold hover:underline"
                        >
                          {selected.telepon}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-center gap-4 pt-6 border-t-2 border-pink-200">
                    <Button
                      onClick={() => handleContactClick('hubungi')}
                      className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 text-base"
                    >
                      📧 Hubungi Kami
                    </Button>
                    <Button
                      onClick={() => handleContactClick('whatsapp')}
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-base"
                    >
                      💬 WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modal untuk Pilih Cabang */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl max-h-96 overflow-y-auto">
            <h3 className="text-2xl font-bold text-pink-900 mb-6">
              {modalType === 'whatsapp' ? 'Chat WhatsApp ke Cabang Mana?' : 'Hubungi Cabang Mana?'}
            </h3>

            <div className="space-y-3">
              {/* Magelang */}
              <button
                onClick={() => handleSelectLocation(1)}
                className="w-full bg-pink-50 hover:bg-pink-100 border-2 border-pink-200 rounded-lg p-4 text-left transition-all hover:shadow-lg"
              >
                <div className="font-semibold text-pink-900">Magelang</div>
                <div className="text-sm text-gray-600 mt-1">085799643777</div>
              </button>

              {/* Purworejo - 2 Admin */}
              <div className="space-y-2">
                <div className="font-semibold text-pink-900 text-sm px-2">Purworejo (2 Admin)</div>
                <button
                  onClick={() => handleSelectLocation(2, '6285712859999')}
                  className="w-full bg-pink-50 hover:bg-pink-100 border-2 border-pink-200 rounded-lg p-4 text-left transition-all hover:shadow-lg ml-2"
                >
                  <div className="font-semibold text-pink-900">Admin 1</div>
                  <div className="text-sm text-gray-600 mt-1">085712859999</div>
                </button>
                <button
                  onClick={() => handleSelectLocation(2, '6282323606087')}
                  className="w-full bg-pink-50 hover:bg-pink-100 border-2 border-pink-200 rounded-lg p-4 text-left transition-all hover:shadow-lg ml-2"
                >
                  <div className="font-semibold text-pink-900">Admin 2</div>
                  <div className="text-sm text-gray-600 mt-1">082323606087</div>
                </button>
              </div>

              {/* Kutoarjo */}
              <button
                onClick={() => handleSelectLocation(3)}
                className="w-full bg-pink-50 hover:bg-pink-100 border-2 border-pink-200 rounded-lg p-4 text-left transition-all hover:shadow-lg"
              >
                <div className="font-semibold text-pink-900">Kutoarjo</div>
                <div className="text-sm text-gray-600 mt-1">085360005684</div>
              </button>
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
