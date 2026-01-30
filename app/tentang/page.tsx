export default function TentangPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Tentang Kami</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Mengenal lebih dekat Klinik Pratama DRW Estetika
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-pink-900 mb-6">Sejarah dan Visi Kami</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Klinik Pratama DRW Estetika adalah bagian dari <strong className="text-pink-700">PT DRW Corpora Indonesia</strong>, 
              sebuah perusahaan holding yang didirikan pada Januari 2021 oleh <strong className="text-pink-700">dr. Wahyu Triasmara, M.Kes., AAAM, AIFO-K</strong>. 
              Perjalanan kami dimulai dari sebuah klinik tunggal pada tahun 2015 yang kemudian berkembang menjadi 
              jaringan klinik kecantikan dan estetika medis terkemuka di Indonesia.
            </p>

            <p className="text-gray-700 leading-relaxed mb-6">
              Dengan pengalaman lebih dari 10 tahun di bidang estetika medis, dr. Wahyu Triasmara telah 
              mentransformasi keahliannya menjadi bisnis yang sukses, melayani ribuan pasien dengan hasil 
              yang memuaskan. Beliau tidak hanya membangun brand DRW Skincare, tetapi juga memberdayakan 
              ribuan ibu rumah tangga untuk menjadi konsultan kecantikan yang mandiri secara finansial.
            </p>

            <h2 className="text-3xl font-bold text-pink-900 mb-6 mt-12">Visi Kami</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Menjadi klinik estetika medis yang terpercaya dan terdepan dalam memberikan solusi kecantikan 
              yang aman, efektif, dan terjangkau bagi masyarakat Indonesia. Kami berkomitmen untuk terus 
              berinovasi dan menghadirkan teknologi terkini dalam setiap layanan kami.
            </p>

            <h2 className="text-3xl font-bold text-pink-900 mb-6 mt-12">Misi Kami</h2>
            <ul className="space-y-3 text-gray-700 mb-6">
              <li className="flex items-start">
                <span className="text-pink-600 mr-2">✓</span>
                <span>Memberikan layanan estetika medis berkualitas tinggi dengan standar internasional</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-600 mr-2">✓</span>
                <span>Menggunakan teknologi dan produk terkini yang telah teruji keamanan dan efektivitasnya</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-600 mr-2">✓</span>
                <span>Mengedukasi masyarakat tentang pentingnya perawatan kulit yang tepat dan aman</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-600 mr-2">✓</span>
                <span>Menciptakan pengalaman perawatan yang nyaman dan memuaskan bagi setiap pasien</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-600 mr-2">✓</span>
                <span>Terus berinovasi untuk memberikan solusi kecantikan yang berkelanjutan</span>
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-pink-900 mb-6 mt-12">Keunggulan Kami</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-pink-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-pink-900 mb-3">Dokter Berpengalaman</h3>
                <p className="text-gray-700">
                  Semua treatment dilakukan atau di bawah supervisi langsung dokter spesialis 
                  estetika medis yang berpengalaman dan tersertifikasi.
                </p>
              </div>

              <div className="bg-pink-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-pink-900 mb-3">Teknologi Terkini</h3>
                <p className="text-gray-700">
                  Kami menggunakan peralatan medis terbaru dan teknologi canggih untuk hasil 
                  yang optimal dan aman.
                </p>
              </div>

              <div className="bg-pink-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-pink-900 mb-3">Produk Berkualitas</h3>
                <p className="text-gray-700">
                  Semua produk yang kami gunakan telah teruji secara klinis dan memiliki 
                  sertifikasi dari BPOM dan lembaga internasional.
                </p>
              </div>

              <div className="bg-pink-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-pink-900 mb-3">Harga Terjangkau</h3>
                <p className="text-gray-700">
                  Kami menawarkan berbagai paket treatment dengan harga yang kompetitif tanpa 
                  mengurangi kualitas layanan.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-pink-900 mb-6 mt-12">Komitmen Kami</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Kami berkomitmen untuk memberikan yang terbaik bagi setiap pasien. Kepuasan dan keamanan 
              Anda adalah prioritas utama kami. Setiap treatment dirancang khusus sesuai dengan kebutuhan 
              dan kondisi kulit Anda, dengan konsultasi menyeluruh sebelum dan sesudah perawatan.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Bergabunglah dengan ribuan pasien yang telah mempercayakan perawatan kecantikan mereka 
              kepada Klinik Pratama DRW Estetika. Mari bersama-sama mencapai kulit sehat dan cantik 
              yang Anda impikan!
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-12">Tim Medis Kami</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-32 h-32 bg-pink-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-6xl">👨‍⚕️</span>
              </div>
              <h3 className="text-2xl font-bold text-pink-900 mb-2">dr. Wahyu Triasmara</h3>
              <p className="text-pink-600 font-semibold mb-4">M.Kes., AAAM, AIFO-K</p>
              <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
                Dokter spesialis estetika medis dengan pengalaman lebih dari 10 tahun. Pendiri dan 
                direktur PT DRW Corpora Indonesia. Telah menangani ribuan kasus dengan tingkat 
                kepuasan pasien yang tinggi. Aktif dalam edukasi publik tentang perawatan kulit 
                yang aman dan efektif melalui media sosial.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
