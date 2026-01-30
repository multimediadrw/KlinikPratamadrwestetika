export const revalidate = 60;

export default function LokasiKontakPage() {
  const branches = [
    {
      nama: 'Klinik Pratama DRW Estetika Magelang',
      alamat: 'Jl. Jendral Sudirman No. 89, Rejowinangun Selatan, Kec. Magelang Selatan, Magelang 59214',
      telp: '(0293) 3195 392',
      wa: '085799643777',
    },
    {
      nama: 'Klinik Pratama DRW Estetika Purworejo',
      alamat: 'Jl Jendral Sudirman No 1, Purworejo, Jawa Tengah, Indonesia 54111',
      telp: '0275-7530777',
      wa: ['085712859999', '082323606087'],
    },
    {
      nama: 'Klinik Pratama DRW Estetika Kutoarjo',
      alamat: 'Jl. Mardi Usodo Timur Alun-alun No. 6, Kutoarjo',
      telp: '0275-6451864',
      wa: '085360005684',
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Lokasi & Kontak</h1>
          <p className="text-xl">Kunjungi cabang kami di berbagai lokasi</p>
        </div>
      </section>

      <section className="py-20 bg-pink-50">
        <div className="container mx-auto px-4">
          <div className="space-y-8 max-w-4xl mx-auto">
            {branches.map((branch, idx) => (
              <div key={idx} className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-pink-900 mb-6">{branch.nama}</h3>
                <div className="space-y-4 text-gray-700">
                  <p><strong>📍 Alamat:</strong> {branch.alamat}</p>
                  <p><strong>📞 Telepon:</strong> {branch.telp}</p>
                  <p><strong>💬 WhatsApp:</strong> {Array.isArray(branch.wa) ? branch.wa.join(', ') : branch.wa}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
