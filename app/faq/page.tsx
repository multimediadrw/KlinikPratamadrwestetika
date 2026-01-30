'use client';

import { useState } from 'react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      category: 'Umum',
      questions: [
        {
          q: 'Apakah treatment di DRW Estetika aman?',
          a: 'Ya, sangat aman. Semua treatment dilakukan oleh atau di bawah supervisi dokter spesialis estetika medis yang berpengalaman dan tersertifikasi. Kami menggunakan produk dan alat yang telah teruji secara klinis dan memiliki izin dari BPOM.'
        },
        {
          q: 'Apakah perlu konsultasi sebelum treatment?',
          a: 'Ya, konsultasi sangat penting untuk mengetahui kondisi kulit Anda dan menentukan treatment yang paling sesuai. Konsultasi pertama di klinik kami gratis.'
        },
        {
          q: 'Berapa lama durasi setiap treatment?',
          a: 'Durasi bervariasi tergantung jenis treatment. Facial basic sekitar 60 menit, facial prime 90 menit, HIFU 60-90 menit, IPL 30-45 menit, dan injection treatment 15-30 menit.'
        },
        {
          q: 'Apakah ada efek samping dari treatment?',
          a: 'Efek samping minimal dan bersifat sementara, seperti kemerahan ringan yang akan hilang dalam beberapa jam. Dokter kami akan menjelaskan secara detail sebelum treatment.'
        }
      ]
    },
    {
      category: 'Pembayaran & Harga',
      questions: [
        {
          q: 'Metode pembayaran apa saja yang diterima?',
          a: 'Kami menerima pembayaran tunai, transfer bank, kartu debit/kredit, dan e-wallet (GoPay, OVO, Dana, ShopeePay).'
        },
        {
          q: 'Apakah ada paket hemat atau promo?',
          a: 'Ya, kami menyediakan berbagai paket hemat dan promo spesial setiap bulannya. Silakan hubungi kami atau follow media sosial kami untuk info promo terbaru.'
        },
        {
          q: 'Apakah bisa cicilan?',
          a: 'Ya, untuk treatment tertentu dengan nilai di atas jumlah minimum, kami menyediakan opsi cicilan melalui kartu kredit atau platform cicilan digital.'
        },
        {
          q: 'Apakah harga sudah termasuk konsultasi?',
          a: 'Konsultasi pertama gratis. Untuk konsultasi lanjutan biasanya sudah termasuk dalam paket treatment yang Anda pilih.'
        }
      ]
    },
    {
      category: 'Treatment Spesifik',
      questions: [
        {
          q: 'Berapa kali harus melakukan facial untuk hasil maksimal?',
          a: 'Untuk hasil optimal, disarankan melakukan facial rutin setiap 2-4 minggu sekali. Namun frekuensi dapat disesuaikan dengan kondisi kulit dan kebutuhan Anda.'
        },
        {
          q: 'Apakah HIFU sakit?',
          a: 'HIFU dapat menimbulkan sensasi panas dan sedikit tidak nyaman, namun masih dalam batas toleransi. Kami akan memberikan anestesi topikal jika diperlukan untuk kenyamanan Anda.'
        },
        {
          q: 'Kapan hasil treatment mulai terlihat?',
          a: 'Tergantung jenis treatment. Facial terlihat langsung setelah treatment. HIFU dan IPL bertahap dalam 2-3 bulan. Botox 3-7 hari, filler langsung terlihat.'
        },
        {
          q: 'Apakah bisa melakukan beberapa treatment sekaligus?',
          a: 'Beberapa treatment bisa dikombinasikan, namun harus dikonsultasikan dengan dokter terlebih dahulu untuk memastikan keamanan dan efektivitasnya.'
        },
        {
          q: 'Berapa lama downtime setelah treatment?',
          a: 'Facial dan IPL: minimal downtime. Chemical peeling: 3-7 hari. Dermapen: 2-3 hari. HIFU: 1-2 hari. Botox/Filler: minimal downtime, hindari aktivitas berat 24 jam.'
        }
      ]
    },
    {
      category: 'Perawatan Pasca Treatment',
      questions: [
        {
          q: 'Apa yang harus dilakukan setelah treatment?',
          a: 'Ikuti instruksi dokter, hindari paparan sinar matahari langsung, gunakan sunscreen, jaga kebersihan wajah, dan gunakan produk perawatan yang direkomendasikan.'
        },
        {
          q: 'Bolehkah menggunakan makeup setelah treatment?',
          a: 'Untuk facial dan peeling, tunggu 24 jam. Untuk injection, tunggu 4-6 jam. Untuk HIFU dan IPL, bisa langsung namun disarankan menggunakan produk yang ringan.'
        },
        {
          q: 'Apakah perlu kontrol setelah treatment?',
          a: 'Ya, kontrol penting untuk memantau hasil dan kondisi kulit. Jadwal kontrol akan ditentukan oleh dokter sesuai jenis treatment yang dilakukan.'
        },
        {
          q: 'Produk apa yang disarankan untuk perawatan di rumah?',
          a: 'Dokter kami akan merekomendasikan produk skincare yang sesuai dengan kondisi kulit dan treatment yang Anda lakukan. Kami juga menyediakan produk DRW Skincare.'
        }
      ]
    },
    {
      category: 'Booking & Jadwal',
      questions: [
        {
          q: 'Bagaimana cara booking appointment?',
          a: 'Anda bisa booking melalui WhatsApp, telepon, atau mengisi form di website kami. Tim kami akan mengonfirmasi jadwal Anda.'
        },
        {
          q: 'Apakah bisa walk-in tanpa appointment?',
          a: 'Bisa, namun kami sangat menyarankan untuk booking terlebih dahulu agar tidak perlu menunggu lama dan mendapat slot waktu yang sesuai.'
        },
        {
          q: 'Bagaimana jika ingin reschedule atau cancel?',
          a: 'Silakan hubungi kami minimal 24 jam sebelum jadwal appointment untuk reschedule atau pembatalan tanpa dikenakan biaya.'
        },
        {
          q: 'Apakah buka di hari libur?',
          a: 'Kami buka Senin-Minggu. Untuk hari libur nasional, silakan konfirmasi jadwal operasional melalui WhatsApp atau telepon.'
        }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">FAQ</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Pertanyaan yang Sering Diajukan
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-center text-gray-600 mb-12">
            Temukan jawaban untuk pertanyaan umum seputar layanan kami. Jika pertanyaan Anda tidak ada di sini, 
            jangan ragu untuk <a href="/kontak" className="text-pink-600 font-semibold hover:text-pink-700">menghubungi kami</a>.
          </p>

          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-3xl font-bold text-pink-900 mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 100 + faqIndex;
                  const isOpen = openIndex === globalIndex;
                  
                  return (
                    <div key={faqIndex} className="bg-pink-50 rounded-xl overflow-hidden shadow-md">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                        className="w-full text-left p-6 flex justify-between items-center hover:bg-pink-100 transition-colors"
                      >
                        <span className="font-semibold text-pink-900 pr-4">{faq.q}</span>
                        <span className="text-pink-600 text-2xl flex-shrink-0">
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6">
                          <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 bg-pink-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-pink-900 mb-4">Masih Ada Pertanyaan?</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Tim kami siap membantu menjawab semua pertanyaan Anda. Hubungi kami melalui WhatsApp, 
            telepon, atau email untuk konsultasi lebih lanjut.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a 
              href="/kontak" 
              className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg"
            >
              Hubungi Kami
            </a>
            <a 
              href="https://wa.me/62XXXXXXXXXX" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg"
            >
              💬 Chat WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-pink-900 text-center mb-12">Tips Sebelum Treatment</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-pink-50 p-6 rounded-xl text-center">
              <div className="text-4xl mb-3">💧</div>
              <h3 className="font-bold text-pink-900 mb-2">Hidrasi Cukup</h3>
              <p className="text-sm text-gray-700">Minum air putih minimal 2L sehari sebelum treatment</p>
            </div>
            <div className="bg-pink-50 p-6 rounded-xl text-center">
              <div className="text-4xl mb-3">🧴</div>
              <h3 className="font-bold text-pink-900 mb-2">Bersihkan Wajah</h3>
              <p className="text-sm text-gray-700">Datang dengan wajah bersih tanpa makeup</p>
            </div>
            <div className="bg-pink-50 p-6 rounded-xl text-center">
              <div className="text-4xl mb-3">☀️</div>
              <h3 className="font-bold text-pink-900 mb-2">Hindari Sinar Matahari</h3>
              <p className="text-sm text-gray-700">Jangan berjemur 1 minggu sebelum treatment</p>
            </div>
            <div className="bg-pink-50 p-6 rounded-xl text-center">
              <div className="text-4xl mb-3">💊</div>
              <h3 className="font-bold text-pink-900 mb-2">Informasikan Obat</h3>
              <p className="text-sm text-gray-700">Beritahu dokter jika sedang konsumsi obat tertentu</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
