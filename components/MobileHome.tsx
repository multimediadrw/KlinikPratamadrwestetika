'use client';

import Link from 'next/link';

export default function MobileHome() {
  const treatmentCategories = [
    {
      title: 'Treatment Wajah',
      subtitle: 'Perawatan kulit wajah',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
        </svg>
      ),
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      href: '/treatment#anti-acne'
    },
    {
      title: 'Treatment Tubuh',
      subtitle: 'Perawatan tubuh & spa',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
        </svg>
      ),
      color: 'bg-orange-100',
      iconColor: 'text-orange-600',
      href: '/treatment#body'
    },
    {
      title: 'Konsultasi Dokter',
      subtitle: 'Konsultasi gratis',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      ),
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
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
    <div className="px-4 space-y-6 pb-24">
      {/* Service Cards */}
      <div className="bg-white rounded-2xl shadow-md p-4 space-y-3">
        {treatmentCategories.map((category, idx) => (
          <Link
            key={idx}
            href={category.href}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center ${category.iconColor}`}>
              {category.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{category.title}</h3>
              <p className="text-sm text-gray-500">{category.subtitle}</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        ))}
      </div>

      {/* Promo Section */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-gray-800">Promo Spesial</h2>
          <Link href="/treatment" className="text-sm text-pink-600 font-medium flex items-center gap-1">
            Lihat Semua
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
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
          <Link href="/treatment" className="text-sm text-pink-600 font-medium flex items-center gap-1">
            Lihat Semua
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <span>{treatment.duration}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Link
          href="/reservation"
          className="bg-pink-600 text-white rounded-xl p-4 text-center font-semibold shadow-lg hover:bg-pink-700 transition-colors flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
          </svg>
          Reservasi
        </Link>
        <a
          href="https://wa.me/6285712859999"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white rounded-xl p-4 text-center font-semibold shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          WhatsApp
        </a>
      </div>
    </div>
  );
}
