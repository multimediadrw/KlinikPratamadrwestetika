'use client';

import { AnimatedRoadmap } from '@/app/components/ui/animated-roadmap';
import { Button } from '@/app/components/ui/button';

export default function KontakPage() {
  const milestonesData = [
    {
      id: 1,
      name: 'Magelang',
      status: 'complete' as const,
      position: { top: '70%', left: '5%' },
    },
    {
      id: 2,
      name: 'Purworejo',
      status: 'complete' as const,
      position: { top: '15%', left: '40%' },
    },
    {
      id: 3,
      name: 'Kutoarjo',
      status: 'complete' as const,
      position: { top: '45%', right: '10%' },
    },
  ];

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

      {/* Animated Roadmap Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-pink-900 mb-12">
            Lokasi Cabang Kami
          </h2>

          <AnimatedRoadmap
            milestones={milestonesData}
            mapImageSrc="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
            aria-label="Lokasi cabang Klinik DRW Estetika di Magelang, Purworejo, dan Kutoarjo"
          />
        </div>
      </section>

      {/* Location Details Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-pink-900 mb-12">
            Informasi Lengkap Cabang
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Magelang */}
            <div className="bg-pink-50 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-pink-600 rounded-full mb-4">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <h3 className="text-2xl font-bold text-pink-900 mb-4">Magelang</h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Alamat:</strong><br />
                  Jl. Merdeka No. 123<br />
                  Magelang, Jawa Tengah 56115
                </p>
                <p>
                  <strong>Telepon:</strong><br />
                  <a href="tel:+6274123456" className="text-pink-600 hover:text-pink-700">
                    +62 274-123-456
                  </a>
                </p>
                <p>
                  <strong>Jam Operasional:</strong><br />
                  Senin - Jumat: 08:00 - 17:00<br />
                  Sabtu: 08:00 - 15:00<br />
                  Minggu: Tutup
                </p>
              </div>
              <Button asChild className="w-full mt-6">
                <a href="https://wa.me/6285712859999" target="_blank" rel="noopener noreferrer">
                  Chat WhatsApp
                </a>
              </Button>
            </div>

            {/* Purworejo */}
            <div className="bg-pink-50 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-pink-600 rounded-full mb-4">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <h3 className="text-2xl font-bold text-pink-900 mb-4">Purworejo</h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Alamat:</strong><br />
                  Jl. Ahmad Yani No. 456<br />
                  Purworejo, Jawa Tengah 54111
                </p>
                <p>
                  <strong>Telepon:</strong><br />
                  <a href="tel:+6275234567" className="text-pink-600 hover:text-pink-700">
                    +62 752-34-567
                  </a>
                </p>
                <p>
                  <strong>Jam Operasional:</strong><br />
                  Senin - Jumat: 08:00 - 17:00<br />
                  Sabtu: 08:00 - 15:00<br />
                  Minggu: Tutup
                </p>
              </div>
              <Button asChild className="w-full mt-6">
                <a href="https://wa.me/6285712859999" target="_blank" rel="noopener noreferrer">
                  Chat WhatsApp
                </a>
              </Button>
            </div>

            {/* Kutoarjo */}
            <div className="bg-pink-50 rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-pink-600 rounded-full mb-4">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <h3 className="text-2xl font-bold text-pink-900 mb-4">Kutoarjo</h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  <strong>Alamat:</strong><br />
                  Jl. Diponegoro No. 789<br />
                  Kutoarjo, Jawa Tengah 54211
                </p>
                <p>
                  <strong>Telepon:</strong><br />
                  <a href="tel:+6275645678" className="text-pink-600 hover:text-pink-700">
                    +62 756-45-678
                  </a>
                </p>
                <p>
                  <strong>Jam Operasional:</strong><br />
                  Senin - Jumat: 08:00 - 17:00<br />
                  Sabtu: 08:00 - 15:00<br />
                  Minggu: Tutup
                </p>
              </div>
              <Button asChild className="w-full mt-6">
                <a href="https://wa.me/6285712859999" target="_blank" rel="noopener noreferrer">
                  Chat WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-pink-900 mb-12">
            Kirim Pesan Kami
          </h2>

          <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-lg">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                  placeholder="Masukkan nama Anda"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                  placeholder="Masukkan email Anda"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none"
                  placeholder="Masukkan nomor telepon"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-600 focus:border-transparent outline-none resize-none"
                  placeholder="Tulis pesan Anda di sini..."
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Kirim Pesan
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
