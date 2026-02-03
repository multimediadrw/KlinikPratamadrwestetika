'use client';

import { useState } from 'react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: 'Apakah treatment di DRW Estetika aman?', a: 'Ya, sangat aman. Semua treatment dilakukan oleh dokter spesialis estetika medis yang berpengalaman dan tersertifikasi.' },
    { q: 'Apakah perlu konsultasi sebelum treatment?', a: 'Ya, konsultasi sangat penting. Konsultasi pertama di klinik kami gratis.' },
    { q: 'Berapa lama durasi setiap treatment?', a: 'Durasi bervariasi tergantung jenis treatment. Facial basic sekitar 60 menit, HIFU 60-90 menit.' },
    { q: 'Apakah ada efek samping dari treatment?', a: 'Efek samping minimal dan bersifat sementara, seperti kemerahan ringan yang akan hilang dalam beberapa jam.' },
    { q: 'Metode pembayaran apa saja yang diterima?', a: 'Kami menerima tunai, transfer bank, kartu debit/kredit, dan e-wallet.' },
    { q: 'Berapa kali harus melakukan facial untuk hasil maksimal?', a: 'Untuk hasil optimal, disarankan melakukan facial rutin setiap 2-4 minggu sekali.' },
    { q: 'Kapan hasil treatment mulai terlihat?', a: 'Facial terlihat langsung. HIFU dan IPL bertahap dalam 2-3 bulan. Botox 3-7 hari.' },
    { q: 'Bagaimana cara booking appointment?', a: 'Anda bisa booking melalui WhatsApp, telepon, atau mengisi form di website kami.' },
  ];

  return (
    <main>
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">FAQ</h1>
          <p className="text-xl">Pertanyaan yang Sering Diajukan</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-center text-gray-600 mb-12">
            Temukan jawaban untuk pertanyaan umum seputar layanan kami
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-pink-50 rounded-xl overflow-hidden shadow-md">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left p-6 flex justify-between items-center hover:bg-pink-100 transition-colors"
                >
                  <span className="font-semibold text-pink-900 pr-4">{faq.q}</span>
                  <span className="text-pink-600 text-2xl flex-shrink-0">
                    {openIndex === index ? '−' : '+'}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-pink-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-pink-900 mb-4">Masih Ada Pertanyaan?</h2>
          <p className="text-gray-700 mb-8">Tim kami siap membantu menjawab semua pertanyaan Anda</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/kontak" className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-full text-lg font-semibold">
              Hubungi Kami
            </a>
            <a href="https://wa.me/62274123456" target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold">
              💬 Chat WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
