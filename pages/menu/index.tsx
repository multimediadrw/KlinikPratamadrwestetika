
const categories: { [key: string]: string } = {
  anti_acne_treatment: "Anti Acne",
  post_acne_treatment: "Post Acne",
  anti_aging_treatment: "Anti Aging",
  flex_pigment_treatment: "Flek & Pigment",
  glow_skin_treatment: "Glow Skin",
  body_treatment: "Body Treatment",
  lymphatic_treatment: "Lymphatic",
  hair_treatment: "Hair Treatment",
  nail_treatment: "Nail/Hand/Foot",
};

const menuData = {
  anti_acne_treatment: [
    { nama: "Basic Acne Care (Basic)", layanan: ["Facial White", "PDT", "Oxy Glow"], harga: "Rp 177.600", manfaat: "Perawatan dasar untuk kulit berjerawat." },
    { nama: "Clear Acne Solution (Basic)", layanan: ["Facial White", "Chemical Peeling", "Mesotherapy"], harga: "Rp 193.500", manfaat: "Solusi pembersihan jerawat dengan chemical peeling." },
    { nama: "Signature DNA Acne Care (Basic)", layanan: ["Facial White", "Microdermabrasi", "Luxury DNA Salmon"], harga: "Rp 222.000", manfaat: "Perawatan jerawat dengan teknologi DNA Salmon." },
    { nama: "Acne Detox Premium (Basic)", layanan: ["Facial White", "Detox", "Mesotherapy"], harga: "Rp 259.562", manfaat: "Detoksifikasi kulit berjerawat." },
    { nama: "Platinum Acne & Scar Solution (Basic)", layanan: ["Facial White", "Chemical Peeling", "DPL"], harga: "Rp 317.171", manfaat: "Solusi jerawat dan bekas jerawat." },
    { nama: "Oxy Hydra Acne Solution (Basic)", layanan: ["Facial White", "Hydra Premium", "Oxy Prime", "RF Soft"], harga: "Rp 333.000", manfaat: "Kombinasi hydra dan oksigen untuk jerawat." },
    { nama: "Signature Acne Renewal Package (Basic)", layanan: ["Facial White", "DPL Acne", "PICO Acne Removal"], harga: "Rp 466.000", manfaat: "Menghilangkan jerawat dengan teknologi laser PICO." },
    { nama: "Korean Crystal Acne Facial (Premium)", layanan: ["Korean Snow White Facial White", "Oxy Glow", "PDT"], harga: "Rp 348.500", manfaat: "Facial premium Korea untuk kulit berjerawat." },
    { nama: "Luxe Acne Pico Glow (Premium)", layanan: ["Korean Snow White Facial White", "PICO Acne Removal", "DPL Acne"], harga: "Rp 415.695", manfaat: "Teknologi laser tercanggih untuk jerawat." }
  ],
  post_acne_treatment: [
    { nama: "Post Acne Scar Solution (Basic)", layanan: ["Facial White", "Microdermabrasi", "Mesotherapy"], harga: "Rp 638.250", manfaat: "Mengatasi bekas jerawat dengan microdermabrasi." },
    { nama: "Premium Scar Renewal (Premium)", layanan: ["Korean Snow White Facial White", "PICO Scar Removal", "RF Soft"], harga: "Rp 723.500", manfaat: "Perawatan premium untuk bekas jerawat membandel." }
  ],
  anti_aging_treatment: [
    { nama: "Bright & Lift Anti-Aging Care (Basic)", layanan: ["Facial White", "RF All", "Oxy Glow"], harga: "Rp 291.500", manfaat: "Mengencangkan kulit wajah dan memberikan efek kilau muda." },
    { nama: "Signature DNA Youthful Glow (Basic)", layanan: ["Facial White", "RF All", "Luxury DNA Salmon"], harga: "Rp 291.500", manfaat: "Peremajaan kulit menggunakan DNA Salmon untuk hasil kulit kenyal." },
    { nama: "Bright & Lift Anti-Aging Care (Premium)", layanan: ["Korean Snow White Facial White", "RF All", "Oxy Glow"], harga: "Rp 389.665", manfaat: "Kombinasi premium untuk mengangkat dan mencerahkan kulit." },
    { nama: "Platinum Anti-Aging & Radiance (Premium)", layanan: ["Korean Snow White Facial White", "RF All", "Luxury DNA Salmon"], harga: "Rp 389.665", manfaat: "Perawatan premium anti-aging dengan teknologi terkini." }
  ],
  flex_pigment_treatment: [
    { nama: "Bright & Clear Pigment Solution (Basic)", layanan: ["Facial White", "PDT", "Oxy Glow Pigment"], harga: "Rp 177.600", manfaat: "Solusi dasar untuk mencerahkan dan menghilangkan pigmentasi." },
    { nama: "Clear Pigment Detox Package (Basic)", layanan: ["Facial White", "Detox", "Mesotherapy"], harga: "Rp 193.500", manfaat: "Detoksifikasi dan pemberian nutrisi untuk kulit dengan pigmentasi." },
    { nama: "Signature DNA Radiance Package (Basic)", layanan: ["Facial White", "Microdermabrasi", "Luxury DNA Salmon"], harga: "Rp 222.000", manfaat: "Paket radiance dengan teknologi microdermabrasi dan DNA Salmon." },
    { nama: "Melasma Bright Renewal (Basic)", layanan: ["Facial White", "Chemical Peeling", "Mesotherapy"], harga: "Rp 259.562", manfaat: "Mengatasi melasma dengan chemical peeling dan mesotherapy." },
    { nama: "Platinum White & Pigment Solution (Basic)", layanan: ["Facial White", "Chemical Peeling", "DPL"], harga: "Rp 317.171", manfaat: "Solusi platinum untuk pigmentasi membandel." },
    { nama: "Oxy Hydra Melasma Solution (Basic)", layanan: ["Facial White", "Hydra Premium", "Oxy Prime", "RF Soft"], harga: "Rp 333.000", manfaat: "Kombinasi hydra dan oksigen untuk mengatasi melasma." },
    { nama: "Signature Melasma Renewal Package (Basic)", layanan: ["Facial White", "DPL Pigment", "PICO Pigment Removal"], harga: "Rp 466.000", manfaat: "Menghilangkan flek hitam membandel dengan teknologi laser PICO." },
    { nama: "Korean Crystal Glow Facial (Premium)", layanan: ["Korean Snow White Facial White", "Oxy Glow Pigment", "PDT"], harga: "Rp 348.500", manfaat: "Facial premium Korea untuk kulit bercahaya tanpa pigmentasi." },
    { nama: "Snow White Luxe Detox Therapy (Premium)", layanan: ["Korean Snow White Facial White", "Mesotherapy", "Detox"], harga: "Rp 363.500", manfaat: "Terapi detox premium dengan standar Korea." },
    { nama: "Crystal White DNA Salmon Luxe (Premium)", layanan: ["Korean Snow White Facial White", "Luxury DNA Salmon", "Microdermabrasi"], harga: "Rp 398.500", manfaat: "Perawatan premium dengan DNA Salmon untuk hasil maksimal." },
    { nama: "Radiance Snow White Mesopeel (Premium)", layanan: ["Korean Snow White Facial White", "Mesotherapy", "Chemical Peeling"], harga: "Rp 408.500", manfaat: "Kombinasi mesopeel premium untuk radiance maksimal." },
    { nama: "Korean Crystal Peel & DPL Glow (Premium)", layanan: ["Korean Snow White Facial White", "DPL", "Chemical Peeling"], harga: "Rp 523.500", manfaat: "Peeling premium dengan DPL untuk hasil cemerlang." },
    { nama: "Korean Crystal Hydra Prime Therapy (Premium)", layanan: ["Korean Snow White Facial White", "RF Soft", "Hydra Premium", "Oxy Prime"], harga: "Rp 498.499", manfaat: "Terapi hydra premium dengan teknologi Korea terkini." },
    { nama: "Luxe Snow White Pico Glow (Premium)", layanan: ["Korean Snow White Facial White", "PICO Pigment Removal", "DPL Pigment"], harga: "Rp 564.490", manfaat: "Teknologi laser tercanggih untuk wajah bersih dari pigmentasi." }
  ],
  glow_skin_treatment: [
    { nama: "Crystal White Glow Care (Basic)", layanan: ["Facial White", "PDT", "Oxy Glow"], harga: "Rp 177.600", manfaat: "Menjaga kecerahan kulit agar tetap putih bersih." },
    { nama: "Platinum Radiance Glow (Premium)", layanan: ["Facial White", "Skin Booster"], harga: "Rp 475.000", manfaat: "Meningkatkan kualitas kulit secara instan agar tampak bercahaya." }
  ],
  body_treatment: [
    { nama: "Glow Relax Package", layanan: ["Massage", "Lulur"], harga: "Rp 199.000", manfaat: "Memberikan relaksasi tubuh dan kehalusan kulit." },
    { nama: "Milk Luxury Body Spa", layanan: ["Massage", "Lulur", "Milk Bath"], harga: "Rp 250.000", manfaat: "Melembapkan dan memutihkan kulit tubuh dengan mandi susu." },
    { nama: "Detox Relaxation Spa", layanan: ["Massage", "Lulur", "Sauna"], harga: "Rp 250.000", manfaat: "Mengeluarkan racun tubuh melalui uap sauna." }
  ],
  lymphatic_treatment: [
    { nama: "Lymphatic Drainage Therapy", layanan: ["Massage", "Lymphatic Drainage"], harga: "Rp 200.000", manfaat: "Melancarkan aliran limfa untuk detoksifikasi tubuh." },
    { nama: "Premium Lymphatic Detox", layanan: ["Massage", "Lymphatic Drainage", "Sauna"], harga: "Rp 400.000", manfaat: "Terapi premium untuk detoksifikasi dan relaksasi maksimal." }
  ],
  hair_treatment: [
    { nama: "Hair Spa Basic", layanan: ["Hair Wash", "Hair Mask"], harga: "Rp 78.000", manfaat: "Perawatan dasar rambut dengan masker nutrisi." },
    { nama: "Premium Hair Spa", layanan: ["Hair Wash", "Hair Mask", "Hair Serum"], harga: "Rp 150.000", manfaat: "Perawatan premium rambut untuk hasil maksimal." }
  ],
  nail_treatment: [
    { nama: "Basic Manicure", layanan: ["Nail Care", "Polish"], harga: "Rp 145.000", manfaat: "Perawatan kuku dasar dengan cat kuku." },
    { nama: "Premium Pedicure", layanan: ["Nail Care", "Massage", "Polish"], harga: "Rp 170.000", manfaat: "Perawatan kuku premium dengan massage kaki." }
  ]
};

export default function MenuPage() {
  const firstCategory = Object.keys(menuData)[0];
  const treatments = menuData[firstCategory as keyof typeof menuData] || [];

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Menu Treatment</h1>
          <p className="text-xl">Pilih treatment yang sesuai dengan kebutuhan Anda</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-pink-50">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Category Tabs */}
          <div className="mb-12 flex flex-wrap gap-3 justify-center">
            {Object.entries(categories).map(([key, label]) => (
              <a
                key={key}
                href={`/menu?category=${key}`}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  key === firstCategory
                    ? "bg-pink-600 text-white shadow-lg"
                    : "bg-white text-pink-600 border-2 border-pink-600 hover:bg-pink-50"
                }`}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Treatments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatments.map((treatment, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border-t-4 border-pink-600"
              >
                <h3 className="text-xl font-bold text-pink-900 mb-3">
                  {treatment.nama}
                </h3>
                <p className="text-gray-700 mb-4 text-sm">{treatment.manfaat}</p>
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-600 mb-2">
                    Layanan Termasuk:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {treatment.layanan.map((service, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-pink-600 mr-2">•</span>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t pt-4 flex items-center justify-between">
                  <span className="text-2xl font-bold text-pink-600">
                    {treatment.harga}
                  </span>
                  <a
                    href="/lokasi-kontak"
                    className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors text-sm font-semibold"
                  >
                    Pesan
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
