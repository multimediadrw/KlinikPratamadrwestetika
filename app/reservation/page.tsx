'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface Treatment {
  id: string;
  name: string;
  price: number;
  category: string;
}

function ReservationContent() {
  const searchParams = useSearchParams();
  const refCode = searchParams.get('ref');
  
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    treatmentId: '',
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    reservationDate: '',
    reservationTime: '',
    patientNotes: '',
  });

  useEffect(() => {
    fetchTreatments();
  }, []);

  const fetchTreatments = async () => {
    try {
      const response = await fetch('/api/treatments/list');
      if (response.ok) {
        const data = await response.json();
        setTreatments(data);
      }
    } catch (error) {
      console.error('Error fetching treatments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const selectedTreatment = treatments.find(t => t.id === formData.treatmentId);
      if (!selectedTreatment) {
        alert('Please select a treatment');
        setSubmitting(false);
        return;
      }

      const payload = {
        ...formData,
        referredBy: refCode || null,
        originalPrice: selectedTreatment.price,
        finalPrice: selectedTreatment.price,
      };

      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Reservasi berhasil dibuat! Kami akan menghubungi Anda segera.');
        // Reset form
        setFormData({
          treatmentId: '',
          patientName: '',
          patientEmail: '',
          patientPhone: '',
          reservationDate: '',
          reservationTime: '',
          patientNotes: '',
        });
      } else {
        const error = await response.json();
        alert(error.error || 'Gagal membuat reservasi');
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
      alert('Terjadi kesalahan saat membuat reservasi');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-white text-gray-800">
      {/* Header */}
      <header className="border-b border-pink-200 bg-gradient-to-br from-pink-50 to-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/" className="text-pink-600 hover:text-pink-500 transition-colors inline-flex items-center gap-2 mb-2">
            ← Kembali ke Beranda
          </Link>
          <h1 className="text-4xl font-bold text-pink-600" style={{ fontFamily: 'Playfair Display, serif' }}>
            Form Reservasi
          </h1>
          <p className="text-gray-600 mt-2">Isi form di bawah untuk membuat reservasi treatment</p>
          {refCode && (
            <div className="mt-3 inline-flex items-center gap-2 bg-pink-100 border border-pink-300 rounded-lg px-4 py-2">
              <span className="text-pink-600 font-bold">🎟️ Kode Referral:</span>
              <span className="text-pink-500 font-mono font-bold">{refCode}</span>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white to-pink-50 border border-pink-200 rounded-lg p-8">
          {/* Treatment Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Pilih Treatment <span className="text-red-500">*</span>
            </label>
            <select
              name="treatmentId"
              value={formData.treatmentId}
              onChange={handleChange}
              required
              className="w-full bg-white border border-pink-300 text-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-400"
            >
              <option value="">Pilih treatment...</option>
              {treatments.map((treatment) => (
                <option key={treatment.id} value={treatment.id}>
                  {treatment.name} - Rp {Number(treatment.price).toLocaleString('id-ID')}
                </option>
              ))}
            </select>
          </div>

          {/* Patient Name */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              required
              placeholder="Masukkan nama lengkap"
              className="w-full bg-white border border-pink-300 text-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-400"
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="patientEmail"
              value={formData.patientEmail}
              onChange={handleChange}
              required
              placeholder="email@example.com"
              className="w-full bg-white border border-pink-300 text-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-400"
            />
          </div>

          {/* Phone */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Nomor Telepon <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="patientPhone"
              value={formData.patientPhone}
              onChange={handleChange}
              required
              placeholder="08xx xxxx xxxx"
              className="w-full bg-white border border-pink-300 text-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-400"
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Tanggal <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="reservationDate"
                value={formData.reservationDate}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full bg-white border border-pink-300 text-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Waktu <span className="text-red-500">*</span>
              </label>
              <select
                name="reservationTime"
                value={formData.reservationTime}
                onChange={handleChange}
                required
                className="w-full bg-white border border-pink-300 text-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-400"
              >
                <option value="">Pilih jam...</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-2">
              Catatan (Opsional)
            </label>
            <textarea
              name="patientNotes"
              value={formData.patientNotes}
              onChange={handleChange}
              rows={4}
              placeholder="Tambahkan catatan..."
              className="w-full bg-white border border-pink-300 text-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:border-pink-400 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting || loading}
            className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-black font-bold px-8 py-4 rounded-lg transition-colors text-lg"
          >
            {submitting ? 'Mengirim...' : 'Kirim Reservasi'}
          </button>
        </form>

        {/* Info Box */}
        <div className="mt-8 bg-blue-900/20 border border-blue-800/30 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-400 mb-3">ℹ️ Informasi Penting</h3>
          <ul className="text-gray-700 space-y-2 text-sm">
            <li>• Reservasi akan dikonfirmasi oleh tim kami melalui WhatsApp/Email</li>
            <li>• Harap datang 10 menit sebelum waktu reservasi</li>
            <li>• Untuk pembatalan, hubungi kami minimal 1 hari sebelumnya</li>
            <li>• Pembayaran dapat dilakukan di klinik setelah treatment</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

export default function ReservationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white text-gray-800">Loading...</div>}>
      <ReservationContent />
    </Suspense>
  );
}
