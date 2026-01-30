'use client';

export const revalidate = 60;
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Treatment {
  nama: string;
  layanan: string[];
  harga: string;
  manfaat: string;
  source: number[];
}

interface MenuData {
  klinik: string;
  kontak: string;
  sumber: string;
  menu_lengkap: Record<string, Treatment[]>;
}

const categoryNames: Record<string, string> = {
  anti_acne_treatment: 'Anti Acne Treatment',
  post_acne_treatment: 'Post Acne Treatment',
  anti_aging_treatment: 'Anti Aging Treatment',
  flex_pigment_treatment: 'Flek & Pigment Treatment',
  glow_skin_treatment: 'Glow Skin Treatment',
  body_treatment: 'Body Treatment',
  lymphatic_treatment: 'Lymphatic Treatment',
  hair_treatment: 'Hair Treatment',
  nail_hand_foot_aesthetic: 'Nail, Hand & Foot Aesthetic'
};

export default function MenuPage() {
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('anti_acne_treatment');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('/menu.json');
        if (!response.ok) {
          throw new Error('Failed to load menu');
        }
        const data = await response.json();
        setMenuData(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading menu');
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
            <p className="mt-4 text-gray-600">Memuat menu treatment...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !menuData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 font-semibold">Error: {error || 'Menu tidak ditemukan'}</p>
            <Link href="/" className="text-pink-600 hover:text-pink-700 mt-4 inline-block">
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentTreatments = menuData.menu_lengkap[selectedCategory] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Menu Treatment Lengkap
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            {menuData.klinik}
          </p>
          <p className="text-sm text-gray-500">
            Hubungi: <span className="font-semibold text-pink-600">{menuData.kontak}</span>
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {Object.keys(menuData.menu_lengkap).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-pink-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-pink-200 hover:border-pink-600 hover:text-pink-600'
                }`}
              >
                {categoryNames[category] || category}
              </button>
            ))}
          </div>
        </div>

        {/* Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentTreatments.map((treatment, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-pink-100 hover:border-pink-300"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-4">
                <h3 className="text-white font-bold text-lg">{treatment.nama}</h3>
              </div>

              {/* Card Body */}
              <div className="p-6">
                {/* Price */}
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Harga</p>
                  <p className="text-2xl font-bold text-pink-600">{treatment.harga}</p>
                </div>

                {/* Manfaat */}
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Manfaat</p>
                  <p className="text-gray-700 text-sm leading-relaxed">{treatment.manfaat}</p>
                </div>

                {/* Layanan */}
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Layanan Termasuk</p>
                  <div className="flex flex-wrap gap-2">
                    {treatment.layanan.map((service, idx) => (
                      <span
                        key={idx}
                        className="bg-pink-100 text-pink-700 text-xs px-3 py-1 rounded-full font-medium"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href="/kontak"
                  className="block w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-4 rounded-lg text-center transition-all duration-300 mt-4"
                >
                  Pesan Sekarang
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {currentTreatments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Tidak ada treatment di kategori ini</p>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8 border border-pink-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Informasi Penting</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-pink-600 font-bold mt-1">✓</span>
              <span>Semua treatment dilakukan oleh profesional bersertifikat</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-pink-600 font-bold mt-1">✓</span>
              <span>Menggunakan peralatan dan produk berkualitas tinggi</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-pink-600 font-bold mt-1">✓</span>
              <span>Konsultasi gratis sebelum treatment</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-pink-600 font-bold mt-1">✓</span>
              <span>Harga dapat berubah sesuai promo dan paket khusus</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
