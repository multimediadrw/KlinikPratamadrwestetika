'use client';

import Link from 'next/link';

export default function MobileHome() {
  const treatmentCategories = [
    {
      title: 'Treatment Wajah',
      subtitle: 'Perawatan kulit wajah',
      icon: '💆‍♀️',
      color: 'bg-purple-100',
      href: '/treatment#anti-acne'
    },
    {
      title: 'Treatment Tubuh',
      subtitle: 'Perawatan tubuh & spa',
      icon: '💅',
      color: 'bg-orange-100',
      href: '/treatment#body'
    },
    {
      title: 'Konsultasi Dokter',
      subtitle: 'Konsultasi gratis',
      icon: '👨‍⚕️',
      color: 'bg-blue-100',
      href: '#kontak'
    },
  ];

  const promos = [
    {
      title: 'Diskon 20% Treatment Acne',
      subtitle: 'Hemat hingga Rp 500.000',
      gradient: 'from-blue-500 via-purple-500 to-pink-500',
    },
    {
      title: 'Paket Glow Skin',
      subtitle: 'Mulai dari Rp 177.600',
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
    },
  ];

  const popularTreatments = [
    { name: '3 In 1 Korean Acne Glow', price: 'Rp 253.690', duration: '60 menit' },
    { name: 'Platinum Radiance Glow', price: 'Rp 475.000', duration: '60 menit' },
    { name: 'Signature DNA Youthful Glow', price: 'Rp 723.500', duration: '60 menit' },
  ];

  return (
    <div className="px-4 space-y-6">
      {/* Service Cards */}
      <div className="bg-white rounded-2xl shadow-md p-4 space-y-3">
        {treatmentCategories.map((category, idx) => (
          <Link
            key={idx}
            href={category.href}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center text-2xl`}>
              {category.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{category.title}</h3>
              <p className="text-sm text-gray-500">{category.subtitle}</p>
            </div>
            <span className="text-gray-400">›</span>
          </Link>
        ))}
      </div>

      {/* Promo Section */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-gray-800">Promo Spesial</h2>
          <Link href="/treatment" className="text-sm text-pink-600 font-medium">
            Lihat Semua ›
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {promos.map((promo, idx) => (
            <div
              key={idx}
              className={`min-w-[280px] bg-gradient-to-br ${promo.gradient} rounded-2xl p-6 text-white shadow-lg`}
            >
              <h3 className="text-xl font-bold mb-2">{promo.title}</h3>
              <p className="text-white/90">{promo.subtitle}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Treatments */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-gray-800">Treatment Populer</h2>
          <Link href="/treatment" className="text-sm text-pink-600 font-medium">
            Lihat Semua ›
          </Link>
        </div>
        <div className="space-y-3">
          {popularTreatments.map((treatment, idx) => (
            <Link
              key={idx}
              href="/treatment"
              className="block bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800 flex-1">{treatment.name}</h3>
                <span className="text-pink-600 font-bold">{treatment.price}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>⏱️ {treatment.duration}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 pb-4">
        <Link
          href="/reservation"
          className="bg-pink-600 text-white rounded-xl p-4 text-center font-semibold shadow-lg hover:bg-pink-700 transition-colors"
        >
          📅 Reservasi Sekarang
        </Link>
        <a
          href="https://wa.me/6285712859999"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white rounded-xl p-4 text-center font-semibold shadow-lg hover:bg-green-600 transition-colors"
        >
          💬 WhatsApp Kami
        </a>
      </div>
    </div>
  );
}
