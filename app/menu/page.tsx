export const revalidate = 60;

export default function MenuPage() {
  const categories = [
    { name: 'Anti Acne', count: '9 treatment' },
    { name: 'Post Acne', count: '2 treatment' },
    { name: 'Anti Aging', count: '4 treatment' },
    { name: 'Flek & Pigment', count: '14 treatment' },
    { name: 'Glow Skin', count: '2 treatment' },
    { name: 'Body Treatment', count: '3 treatment' },
    { name: 'Lymphatic', count: '2 treatment' },
    { name: 'Hair Treatment', count: '2 treatment' },
    { name: 'Nail/Hand/Foot', count: '2 treatment' },
  ];

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Menu Treatment</h1>
          <p className="text-xl">Pilihan treatment lengkap dengan harga terjangkau</p>
        </div>
      </section>

      <section className="py-20 bg-pink-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-pink-900 text-center mb-16">Kategori Treatment</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div key={cat.name} className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-bold text-pink-900 mb-2">{cat.name}</h3>
                <p className="text-gray-600">{cat.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
