'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Treatment {
  nama: string;
  layanan: string[];
  harga: string;
  manfaat: string;
}

interface MenuData {
  klinik: string;
  kontak: string;
  sumber: string;
  menu_lengkap: {
    [key: string]: Treatment[];
  };
}

export default function HargaPage() {
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('/menu.json');
        if (!response.ok) {
          throw new Error('Failed to load menu data');
        }
        const data = await response.json();
        setMenuData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) {
    return (
      <main className="bg-white">
        <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Daftar Harga & Paket</h1>
            <p className="text-xl">Loading data...</p>
          </div>
        </section>
        <div className="py-20 text-center">
          <p className="text-gray-600">Memuat data treatment...</p>
        </div>
      </main>
    );
  }

  if (error || !menuData) {
    return (
      <main className="bg-white">
        <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Daftar Harga & Paket</h1>
          </div>
        </section>
        <div className="py-20 text-center max-w-4xl mx-auto px-4">
          <p className="text-red-600 text-lg">Error: {error || 'Data tidak ditemukan'}</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Daftar Harga & Paket</h1>
          <p className="text-xl">{menuData.klinik}</p>
          <p className="text-pink-100 mt-2">Hubungi: {menuData.kontak}</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-gray-600 mb-16 text-lg">
            Kami menawarkan berbagai paket treatment dengan harga yang kompetitif dan kualitas terbaik.
          </p>

          <div className="space-y-16">
            {Object.entries(menuData.menu_lengkap).map(([category, items]) => (
              <div key={category}>
                <h2 className="text-3xl font-bold text-pink-900 mb-8 pb-4 border-b-2 border-pink-200">
                  {category.replace(/_/g, ' ').toUpperCase()}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {items.map((item, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-pink-100">
                      <h3 className="text-xl font-bold text-pink-900 mb-2">{item.nama}</h3>
                      
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-2"><strong>Layanan:</strong></p>
                        <div className="flex flex-wrap gap-2">
                          {item.layanan.map((service, i) => (
                            <span key={i} className="bg-pink-200 text-pink-800 text-xs px-3 py-1 rounded-full font-medium">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4 text-sm">{item.manfaat}</p>

                      <div className="bg-white rounded-lg p-4 mb-4">
                        <p className="text-3xl font-bold text-pink-600">{item.harga}</p>
                      </div>

                      <Link href="/kontak" className="inline-block w-full text-center bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                        Pesan Sekarang
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-rose-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-12">💳 Metode Pembayaran</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: '💰', name: 'Tunai' },
              { icon: '🏦', name: 'Transfer Bank' },
              { icon: '💳', name: 'Kartu Kredit/Debit' },
              { icon: '📱', name: 'E-wallet' },
            ].map((method, i) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center shadow-lg">
                <div className="text-5xl mb-3">{method.icon}</div>
                <p className="font-semibold text-gray-800">{method.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-12">📞 Hubungi Kami</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl p-8 text-center">
              <div className="text-5xl mb-4">📍</div>
              <h3 className="text-2xl font-bold text-pink-900 mb-2">Magelang</h3>
              <p className="text-gray-700 mb-2">Jl. Diponegoro No. 123</p>
              <p className="text-pink-600 font-semibold">(0274) 123-456</p>
            </div>
            <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl p-8 text-center">
              <div className="text-5xl mb-4">📍</div>
              <h3 className="text-2xl font-bold text-pink-900 mb-2">Purworejo</h3>
              <p className="text-gray-700 mb-2">Jl. Ahmad Yani No. 456</p>
              <p className="text-pink-600 font-semibold">(0275) 234-567</p>
            </div>
            <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl p-8 text-center">
              <div className="text-5xl mb-4">📍</div>
              <h3 className="text-2xl font-bold text-pink-900 mb-2">Kutoarjo</h3>
              <p className="text-gray-700 mb-2">Jl. Sudirman No. 789</p>
              <p className="text-pink-600 font-semibold">(0274) 345-678</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-pink-600 to-rose-500 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Dapatkan Konsultasi Gratis!</h2>
          <p className="text-xl mb-8">Hubungi kami sekarang untuk konsultasi dan penawaran spesial</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/kontak" className="bg-white text-pink-600 hover:bg-pink-50 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl">
              Hubungi Sekarang
            </Link>
            <a href={`https://wa.me/${menuData.kontak.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
