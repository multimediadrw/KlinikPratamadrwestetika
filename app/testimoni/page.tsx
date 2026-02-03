'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function TestimoniPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      title: 'Flek Karena Pekerjaan Jaga Stand di Pasar Malam',
      description: 'Flek karena pekerjaan jaga stand di Pasar Malam memudar setelah pakai Paket Radiant Brightening dari DRW Skincare',
      treatment: 'Paket Radiant Brightening',
      beforeImage: '/Screenshot2026-01-30144608.png',
      afterImage: '/Screenshot2026-01-30144608.png',
    },
    {
      id: 2,
      title: 'Siapa Sangka Kulit Kusam Bisa Berubah Jadi Glowing Cuma Dengan Rutin Pakai Ini?',
      description: 'Hasil Pemakaian: Paket Daily Ceramoist, Facial Wash for Normal Skin, Sunscreen Glowing, Daily Ceramoist Hydra Gel',
      treatment: 'Paket Daily Ceramoist',
      beforeImage: '/Screenshot2026-01-30144343.png',
      afterImage: '/Screenshot2026-01-30144343.png',
    },
    {
      id: 3,
      title: "Lia Beauty's Journey",
      description: 'Hasil Pemakaian: Paket Bekas Jerawat, Daily Ceramoist, Serum AHA BHA, Toner Lime, Serum Luminous',
      treatment: 'Paket Bekas Jerawat',
      beforeImage: '/Screenshot2026-01-30144226.png',
      afterImage: '/Screenshot2026-01-30144226.png',
    },
    {
      id: 4,
      title: 'Bekas Jerawat Memudar, Wajah Jadi Makin Glowing!',
      description: 'Hasil Pemakaian: Glowtech Spicule Rejuvenation - Teknologi terkini untuk menghilangkan bekas jerawat dan membuat wajah lebih glowing',
      treatment: 'Glowtech Spicule Rejuvenation',
      beforeImage: '/Screenshot2026-01-30144125.png',
      afterImage: '/Screenshot2026-01-30144125.png',
    },
  ];

  const current = testimonials[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Testimoni Pasien</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Lihat transformasi kulit pasien kami setelah menggunakan treatment dan produk DRW Skincare
          </p>
        </div>
      </section>

      {/* Main Testimonial Carousel */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="inline-block">
                <svg className="w-16 h-16 text-pink-600" viewBox="0 0 100 100" fill="currentColor">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M 50 30 Q 60 40 60 50 Q 60 65 50 70 Q 40 65 40 50 Q 40 40 50 30" fill="currentColor" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
              {current.title}
            </h2>

            {/* Before & After Images */}
            <div className="bg-gradient-to-r from-pink-300 via-pink-400 to-pink-600 rounded-2xl p-8 mb-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Before */}
                <div className="text-center">
                  <div className="relative h-64 md:h-80 mb-4 rounded-xl overflow-hidden bg-gray-200">
                    <Image
                      src={current.beforeImage}
                      alt="Before"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-white text-2xl font-bold">BEFORE</h3>
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-center">
                  <div className="text-white text-4xl font-bold">→</div>
                </div>

                {/* After */}
                <div className="text-center">
                  <div className="relative h-64 md:h-80 mb-4 rounded-xl overflow-hidden bg-gray-200">
                    <Image
                      src={current.afterImage}
                      alt="After"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-white text-2xl font-bold">AFTER</h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-white text-center text-lg">
                {current.description}
              </p>
            </div>

            {/* Treatment Info */}
            <div className="bg-pink-50 rounded-xl p-6 mb-8 text-center">
              <p className="text-gray-600 mb-2">Hasil Pemakaian</p>
              <h3 className="text-2xl font-bold text-pink-900">{current.treatment}</h3>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={handlePrev}
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                ← Sebelumnya
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      idx === currentIndex ? 'bg-pink-600' : 'bg-pink-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Selanjutnya →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="py-20 bg-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-pink-900 mb-12">Semua Testimoni</h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <div
                key={testimonial.id}
                onClick={() => setCurrentIndex(idx)}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-2"
              >
                <div className="bg-gradient-to-r from-pink-300 to-pink-500 p-4">
                  <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={testimonial.beforeImage}
                      alt={testimonial.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-white font-bold text-lg">{testimonial.title}</h3>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm mb-3">{testimonial.description}</p>
                  <p className="text-pink-600 font-semibold text-sm">{testimonial.treatment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-pink-900 mb-6">Ingin Hasil Seperti Mereka?</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Konsultasikan kebutuhan kulit Anda dengan dokter kami dan dapatkan treatment yang tepat untuk hasil maksimal
          </p>
          <a
            href="https://wa.me/6285712859999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
          >
            Hubungi Kami via WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
