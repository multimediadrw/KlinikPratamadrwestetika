'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface Treatment {
  id: string;
  name: string;
  price: number;
  category: string;
}

export default function ReservationPage() {
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
      const response = await fetch('/api/treatments');
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
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/" className="text-yellow-500 hover:text-yellow-400 transition-colors inline-flex items-center gap-2 mb-2">
            ← Kembali ke Beranda
          </Link>
          <h1 className="text-4xl font-bold text-yellow-500" style={{ fontFamily: 'Playfair Display, serif' }}>
            Form Reservasi
          </h1>
          <p className="text-gray-400 mt-2">Isi form di bawah untuk membuat reservasi treatment</p>
          {refCode && (
            <div className="mt-3 inline-flex items-center gap-2 bg-yellow-900/20 border border-yellow-800/30 rounded-lg px-4 py-2">
              <span className="text-yellow-500 font-bold">🎟️ Kode Referral:</span>
              <span className="text-yellow-400 font-mono font-bold">{refCode}</span>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-900/50 to-transparent border border-gray-800/50 rounded-lg p-8">
          {/* Treatment Selection */}
          <div className="mb-6">
            <label className="block text-gray-300 font-medium mb-2">
              Pilih Treatment <span className="text-red-500">*</span>
            </label>
            <select
              name="treatmentId"
              value={formData.treatmentId}
              onChange={handleChange}
              required
              className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-600"
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
            <label className="block text-gray-300 font-medium mb-2">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              required
              placeholder="Masukkan nama lengkap"
              className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-600"
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-gray-300 font-medium mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="patientEmail"
              value={formData.patientEmail}
              onChange={handleChange}
              required
              placeholder="email@example.com"
              className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-600"
            />
          </div>

          {/* Phone */}
          <div className="mb-6">
            <label className="block text-gray-300 font-medium mb-2">
              Nomor Telepon <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="patientPhone"
              value={formData.patientPhone}
              onChange={handleChange}
              required
              placeholder="08xx xxxx xxxx"
              className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-600"
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Tanggal <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="reservationDate"
                value={formData.reservationDate}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-600"
              />
            </div>
            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Waktu <span className="text-red-500">*</span>
              </label>
              <select
                name="reservationTime"
                value={formData.reservationTime}
                onChange={handleChange}
                required
                className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-600"
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
            <label className="block text-gray-300 font-medium mb-2">
              Catatan (Opsional)
            </label>
            <textarea
              name="patientNotes"
              value={formData.patientNotes}
              onChange={handleChange}
              rows={4}
              placeholder="Tambahkan catatan..."
              className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-600 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting || loading}
            className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-black font-bold px-8 py-4 rounded-lg transition-colors text-lg"
          >
            {submitting ? 'Mengirim...' : 'Kirim Reservasi'}
          </button>
        </form>

        {/* Info Box */}
        <div className="mt-8 bg-blue-900/20 border border-blue-800/30 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-400 mb-3">ℹ️ Informasi Penting</h3>
          <ul className="text-gray-300 space-y-2 text-sm">
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
