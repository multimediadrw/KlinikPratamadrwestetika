
export default function LayananPage() {
  const services = [
    { title: 'Anti Acne', desc: 'Treatment untuk jerawat aktif dan bekas jerawat' },
    { title: 'Post Acne', desc: 'Perawatan lanjutan untuk bekas jerawat yang dalam' },
    { title: 'Anti Aging', desc: 'Mencegah dan mengatasi tanda-tanda penuaan' },
    { title: 'Flek & Pigment', desc: 'Menghilangkan flek hitam dan masalah pigmentasi' },
    { title: 'Glow Skin', desc: 'Membuat kulit bercahaya dan sehat' },
    { title: 'Body Treatment', desc: 'Perawatan untuk seluruh tubuh' },
  ];

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Layanan Kami</h1>
          <p className="text-xl">Berbagai treatment kecantikan dan estetika medis profesional</p>
        </div>
      </section>

      <section className="py-20 bg-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-16">Daftar Layanan</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {services.map((service) => (
              <div key={service.title} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-pink-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
