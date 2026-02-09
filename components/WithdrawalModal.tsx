'use client';

import { useState } from 'react';

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableBalance: number;
  onSuccess: () => void;
}

const BANKS = [
  'Mandiri',
  'BRI',
  'BCA',
  'BSI',
  'CIMBNIAGA',
  'BPD DIY'
];

const EWALLETS = [
  'DANA',
  'GOPAY',
  'ShopeePay',
  'OVO'
];

export default function WithdrawalModal({ isOpen, onClose, availableBalance, onSuccess }: WithdrawalModalProps) {
  const [step, setStep] = useState(1); // 1: Choose type, 2: Fill details
  const [accountType, setAccountType] = useState<'bank' | 'ewallet' | ''>('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const resetForm = () => {
    setStep(1);
    setAccountType('');
    setSelectedProvider('');
    setAmount('');
    setAccountNumber('');
    setAccountName('');
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleTypeSelect = (type: 'bank' | 'ewallet') => {
    setAccountType(type);
    setSelectedProvider('');
    setStep(2);
  };

  const handleProviderSelect = (provider: string) => {
    setSelectedProvider(provider);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setError('Jumlah penarikan tidak valid');
      return;
    }

    if (amountNum > availableBalance) {
      setError(`Saldo tidak mencukupi. Saldo tersedia: Rp ${availableBalance.toLocaleString('id-ID')}`);
      return;
    }

    if (!selectedProvider) {
      setError(`Pilih ${accountType === 'bank' ? 'bank' : 'e-wallet'} terlebih dahulu`);
      return;
    }

    if (!accountNumber.trim()) {
      setError(`${accountType === 'bank' ? 'Nomor rekening' : 'Nomor HP/Akun'} harus diisi`);
      return;
    }

    if (!accountName.trim()) {
      setError('Nama pemilik akun harus diisi');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/withdrawals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amountNum,
          accountType,
          bankName: selectedProvider,
          accountNumber: accountNumber.trim(),
          accountName: accountName.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Gagal membuat permintaan penarikan');
      }

      // Success
      alert('✅ Permintaan penarikan berhasil dibuat!\n\nPermintaan Anda akan diproses dalam 1-3 hari kerja.');
      handleClose();
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-pink-500 to-pink-600 text-white p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Tarik Komisi</h2>
              <p className="text-pink-100 mt-1">
                Saldo Tersedia: <span className="font-bold">Rp {availableBalance.toLocaleString('id-ID')}</span>
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-4">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 1 ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                1
              </div>
              <div className={`h-1 w-16 ${step >= 2 ? 'bg-pink-600' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 2 ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                2
              </div>
            </div>
          </div>

          {/* Step 1: Choose Account Type */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 text-center mb-6">
                Pilih Metode Penarikan
              </h3>

              {/* Bank Option */}
              <button
                onClick={() => handleTypeSelect('bank')}
                className="w-full bg-white border-2 border-pink-200 hover:border-pink-500 hover:bg-pink-50 rounded-2xl p-6 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-pink-100 group-hover:bg-pink-200 rounded-full p-4 transition-all">
                    <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div className="text-left flex-1">
                    <h4 className="text-lg font-bold text-gray-800">Transfer Bank</h4>
                    <p className="text-sm text-gray-600">Mandiri, BRI, BCA, BSI, CIMBNIAGA, BPD DIY</p>
                  </div>
                  <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              {/* E-Wallet Option */}
              <button
                onClick={() => handleTypeSelect('ewallet')}
                className="w-full bg-white border-2 border-pink-200 hover:border-pink-500 hover:bg-pink-50 rounded-2xl p-6 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-pink-100 group-hover:bg-pink-200 rounded-full p-4 transition-all">
                    <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-left flex-1">
                    <h4 className="text-lg font-bold text-gray-800">E-Wallet</h4>
                    <p className="text-sm text-gray-600">DANA, GOPAY, ShopeePay, OVO</p>
                  </div>
                  <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>
          )}

          {/* Step 2: Fill Details */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Back Button */}
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-gray-600 hover:text-pink-600 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Kembali
              </button>

              {/* Provider Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {accountType === 'bank' ? 'Pilih Bank' : 'Pilih E-Wallet'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {(accountType === 'bank' ? BANKS : EWALLETS).map((provider) => (
                    <button
                      key={provider}
                      type="button"
                      onClick={() => handleProviderSelect(provider)}
                      className={`p-4 rounded-xl border-2 font-semibold transition-all ${
                        selectedProvider === provider
                          ? 'border-pink-600 bg-pink-50 text-pink-600'
                          : 'border-gray-200 hover:border-pink-300 text-gray-700'
                      }`}
                    >
                      {provider}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Jumlah Penarikan
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                    Rp
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none font-semibold"
                    required
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Maksimal: Rp {availableBalance.toLocaleString('id-ID')}
                </p>
              </div>

              {/* Account Number / Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {accountType === 'bank' ? 'Nomor Rekening' : 'Nomor HP/Akun'}
                </label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder={accountType === 'bank' ? 'Contoh: 1234567890' : 'Contoh: 081234567890'}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                  required
                />
              </div>

              {/* Account Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Pemilik Akun
                </label>
                <input
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder="Sesuai dengan nama di rekening/akun"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                  required
                />
                <p className="text-sm text-gray-500 mt-2">
                  Pastikan nama sesuai dengan {accountType === 'bank' ? 'rekening bank' : 'akun e-wallet'} Anda
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                  <p className="text-red-600 font-medium">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-4 rounded-xl transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Memproses...' : 'Ajukan Penarikan'}
                </button>
              </div>

              {/* Info */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <div className="flex gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">Informasi Penting:</p>
                    <ul className="list-disc list-inside space-y-1 text-blue-700">
                      <li>Penarikan akan diproses dalam 1-3 hari kerja</li>
                      <li>Pastikan data yang diisi sudah benar</li>
                      <li>Anda akan menerima notifikasi saat penarikan diproses</li>
                    </ul>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
