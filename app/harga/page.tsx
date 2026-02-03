import Link from 'next/link';

export default function HargaPage() {
  const treatments = {
    'Anti Acne Treatment': [
      { nama: 'Acne Solution (Basic)', layanan: ['Facial Acne', 'PDT', 'Oxy Glow Acne'], harga: 'Rp 177.600', manfaat: 'Perawatan dasar untuk meredakan jerawat aktif dengan terapi cahaya dan oksigen.' },
      { nama: 'Action Acne Solution (Basic)', layanan: ['Facial Acne', 'Detox', 'Mesotheraphy'], harga: 'Rp 193.500', manfaat: 'Detoksifikasi kulit dan pemberian nutrisi mendalam untuk wajah berjerawat.' },
      { nama: 'Acne Resurface (Basic)', layanan: ['Facial Acne', 'Chemical Peeling', 'Mesotheraphy'], harga: 'Rp 259.562', manfaat: 'Memperbaiki tekstur kulit yang tidak rata akibat bekas jerawat.' },
      { nama: 'Complete Acne Fighter (Basic)', layanan: ['Facial Acne', 'Chemical Peeling', 'DPL'], harga: 'Rp 300.000', manfaat: 'Solusi intensif untuk membunuh bakteri jerawat dan mencerahkan noda.' },
      { nama: '3 In 1 Korean Acne Glow (Premium)', layanan: ['Korean Snow White Facial Acne', 'Oxy Glow Acne', 'PDT'], harga: 'Rp 253.690', manfaat: 'Perawatan jerawat ala Korea untuk hasil kulit yang bersih dan bercahaya.' },
      { nama: 'Inject Spot Go', layanan: ['Inject Acne'], harga: 'Rp 83.000/Titik', manfaat: 'Suntikan langsung pada jerawat untuk mempercepat penyembuhan instan.' },
    ],
    'Post Acne Treatment': [
      { nama: 'Acne Repair Plasma (Basic)', layanan: ['Facial Acne', 'PRP'], harga: 'Rp 638.250', manfaat: 'Menggunakan plasma darah (PRP) untuk memperbaiki struktur bopeng.' },
      { nama: 'Korean Acne Repair Plasma (Premium)', layanan: ['Korean Snow White Facial Acne', 'PRP'], harga: 'Rp 750.000 (Start From)', manfaat: 'Regenerasi kulit tingkat tinggi dengan standar Snow White Korea.' },
    ],
    'Anti Aging Treatment': [
      { nama: 'Luminous Youth Glow Package', layanan: ['Facial White', 'RF All', 'Oxy Glow'], harga: 'Rp 291.500', manfaat: 'Mengencangkan kulit wajah dan memberikan efek kilau muda.' },
      { nama: 'Signature DNA Youthful Glow', layanan: ['Facial White', 'RF All', 'Luxury DNA Salmon'], harga: 'Rp 723.500', manfaat: 'Peremajaan kulit menggunakan DNA Salmon untuk hasil kulit kenyal.' },
      { nama: 'Platinum Anti-Aging & Radiance', layanan: ['Korean Snow White Facial White', 'RF All', 'Luxury DNA Salmon'], harga: 'Rp 389.665', manfaat: 'Kombinasi premium untuk mengangkat kulit kendur dan mencerahkan.' },
    ],
    'Flex Pigment Treatment': [
      { nama: 'Signature Melasma Renewal Package', layanan: ['Facial White', 'DPL Pigment', 'PICO Pigment Removal'], harga: 'Rp 466.000', manfaat: 'Menghilangkan flek hitam membandel dengan teknologi laser PICO.' },
      { nama: 'Luxe Snow White Pico Glow', layanan: ['Korean Snow White Facial White', 'PICO Pigment Removal', 'DPL Pigment'], harga: 'Rp 564.490', manfaat: 'Teknologi laser tercanggih untuk wajah bersih dari pigmentasi.' },
    ],
    'Glow Skin Treatment': [
      { nama: 'Crystal White Glow Care', layanan: ['Facial White', 'PDT', 'Oxy Glow'], harga: 'Rp 177.600', manfaat: 'Menjaga kecerahan kulit agar tetap putih bersih.' },
      { nama: 'Platinum Radiance Glow', layanan: ['Facial White', 'Skin Booster'], harga: 'Rp 475.000', manfaat: 'Meningkatkan kualitas kulit secara instan agar tampak bercahaya.' },
    ],
    'Body Treatment': [
      { nama: 'Glow Relax Package', layanan: ['Massage', 'Lulur'], harga: 'Rp 199.000', manfaat: 'Memberikan relaksasi tubuh dan kehalusan kulit.' },
      { nama: 'Milk Luxury Body Spa', layanan: ['Massage', 'Lulur', 'Milk Bath'], harga: 'Rp 250.000', manfaat: 'Melembapkan dan memutihkan kulit tubuh dengan mandi susu.' },
      { nama: 'Detox Relaxation Spa', layanan: ['Massage', 'Lulur', 'Sauna'], harga: 'Rp 250.000', manfaat: 'Mengeluarkan racun tubuh melalui uap sauna.' },
    ],
    'Lymphatic Treatment': [
      { nama: 'Full Body Lymphatic Massage', layanan: ['Detoksifikasi', 'Metabolisme'], harga: 'Rp 400.000', manfaat: 'Mempercepat pemulihan tubuh dan memperbaiki metabolisme.' },
      { nama: 'Lymphatic Slimming Massage', layanan: ['Slimming', 'Cellulite Reduction'], harga: 'Rp 200.000', manfaat: 'Membantu mengecilkan tubuh dan mengurangi selulit.' },
    ],
    'Hair Treatment': [
      { nama: 'Silky Glow Hair Spa', layanan: ['Hair Spa'], harga: 'Rp 78.000', manfaat: 'Memberikan kilau dan kelembutan pada rambut.' },
      { nama: 'Luxe Hair Treatment Package', layanan: ['Hairspa', 'Catok', 'Vitamin'], harga: 'Rp 150.000', manfaat: 'Perawatan rambut lengkap untuk hasil yang rapi dan sehat.' },
    ],
    'Nail Hand Foot Aesthetic': [
      { nama: 'Manicure Spa', layanan: ['Manicure Spa'], harga: 'Rp 145.000', manfaat: 'Perawatan kuku tangan lengkap agar tampak cantik.' },
      { nama: 'Pedicure Spa Callus Remover', layanan: ['Pedicure', 'Callus Removal'], harga: 'Rp 170.000', manfaat: 'Membersihkan kuku kaki dan menghilangkan kulit kapalan.' },
    ],
  };

  return (
    <main>
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Daftar Harga & Paket</h1>
          <p className="text-xl">Harga kompetitif dengan kualitas treatment terbaik</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-gray-600 mb-16 text-lg">
            Kami menawarkan berbagai paket treatment dengan harga yang kompetitif dan kualitas terbaik. Hubungi kami untuk konsultasi dan penawaran khusus.
          </p>

          <div className="space-y-16">
            {Object.entries(treatments).map(([category, items]) => (
              <div key={category}>
                <h2 className="text-3xl font-bold text-pink-900 mb-8 pb-4 border-b-2 border-pink-200">
                  {category}
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
              { icon: '📱', name: 'E-wallet (GCash, OVO, Dana)' },
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
            <a href="https://wa.me/62857128599999" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
