export default function TentangPage() {
  return (
    <main>
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Tentang Kami</h1>
          <p className="text-xl">Mengenal lebih jauh tentang Klinik Pratama DRW Estetika</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-pink-900 mb-6">Visi & Misi</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-pink-700 mb-3">Visi</h3>
                <p className="text-lg text-gray-700">Menjadi klinik estetika medis terdepan di Indonesia yang memberikan layanan perawatan kecantikan berkualitas tinggi dengan teknologi terkini dan standar internasional.</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-pink-700 mb-3">Misi</h3>
                <ul className="text-lg text-gray-700 space-y-2">
                  <li>✓ Memberikan layanan perawatan kecantikan yang aman, efektif, dan terpercaya</li>
                  <li>✓ Menggunakan teknologi dan produk terbaik yang telah teruji secara klinis</li>
                  <li>✓ Memiliki tenaga medis profesional dan berpengalaman</li>
                  <li>✓ Memberikan harga yang kompetitif dan terjangkau</li>
                  <li>✓ Memberikan pelayanan terbaik dengan kepuasan pasien sebagai prioritas</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-4xl font-bold text-pink-900 mb-6">Sejarah Kami</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Klinik Pratama DRW Estetika didirikan pada tahun 2015 oleh <strong>dr. Wahyu Triasmara, M.Kes., AAAM, AIFO-K</strong>, seorang dokter spesialis estetika medis dengan pengalaman lebih dari 15 tahun.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Dengan dedikasi terhadap kualitas, kami telah berkembang menjadi klinik estetika terpercaya yang telah melayani ribuan pasien yang puas.
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-pink-900 mb-6">Tim Kami</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-pink-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-pink-900 mb-3">👨‍⚕️ Dokter Spesialis</h3>
                <p className="text-gray-700">Dokter spesialis estetika medis yang berpengalaman dan tersertifikasi internasional</p>
              </div>
              <div className="bg-pink-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-pink-900 mb-3">👩‍⚕️ Perawat Profesional</h3>
                <p className="text-gray-700">Perawat terlatih dan bersertifikat yang siap membantu treatment Anda</p>
              </div>
              <div className="bg-pink-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-pink-900 mb-3">💼 Staff Administrasi</h3>
                <p className="text-gray-700">Staff yang ramah dan profesional siap membantu booking dan pertanyaan Anda</p>
              </div>
              <div className="bg-pink-50 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-pink-900 mb-3">🎓 Konsultan Kecantikan</h3>
                <p className="text-gray-700">Konsultan berpengalaman untuk membantu Anda memilih treatment yang tepat</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
