'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Oops! Terjadi Kesalahan</h2>
        <p className="text-gray-600 mb-8">Maaf, terjadi kesalahan saat memuat halaman.</p>
        <button
          onClick={() => reset()}
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full font-semibold"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
}
