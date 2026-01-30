export const revalidate = 60;

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Klinik Pratama DRW Estetika</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Klinik kecantikan dan estetika medis profesional dengan teknologi terkini
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-12">Layanan Kami</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Kami menyediakan berbagai treatment kecantikan dan estetika medis dengan dokter spesialis berpengalaman
          </p>
        </div>
      </section>
    </main>
  );
}
