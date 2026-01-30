export const revalidate = 60;

export default function FAQPage() {
  const faqs = [
    { q: 'Apa itu estetika medis?', a: 'Estetika medis adalah prosedur kecantikan yang dilakukan oleh dokter spesialis dengan menggunakan teknologi dan produk medis berkualitas tinggi.' },
    { q: 'Apakah treatment aman?', a: 'Ya, semua treatment dilakukan oleh dokter bersertifikat dengan standar keamanan internasional dan menggunakan peralatan steril.' },
    { q: 'Berapa lama hasil terlihat?', a: 'Hasil dapat terlihat dalam beberapa minggu tergantung jenis treatment. Hasil optimal biasanya terlihat setelah 4-6 minggu.' },
    { q: 'Apakah ada efek samping?', a: 'Efek samping minimal jika treatment dilakukan oleh profesional. Biasanya hanya kemerahan ringan yang hilang dalam beberapa jam.' },
    { q: 'Berapa biaya treatment?', a: 'Biaya treatment bervariasi tergantung jenis dan area yang ditangani. Hubungi kami untuk konsultasi dan penawaran harga.' },
    { q: 'Apakah perlu persiapan khusus?', a: 'Kami akan memberikan panduan persiapan sebelum treatment. Hindari matahari langsung dan gunakan sunscreen setelah treatment.' },
  ];

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">FAQ</h1>
          <p className="text-xl">Pertanyaan yang sering diajakan</p>
        </div>
      </section>

      <section className="py-20 bg-pink-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold text-pink-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
