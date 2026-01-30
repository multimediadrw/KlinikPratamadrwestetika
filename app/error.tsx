'use client';

import Link from 'next/link';

export default function Error() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-pink-600 mb-4">Error</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Terjadi Kesalahan</h2>
        <p className="text-gray-600 mb-8 text-lg">Maaf, terjadi kesalahan pada sistem kami.</p>
        <Link href="/" className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full font-semibold transition-all">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
