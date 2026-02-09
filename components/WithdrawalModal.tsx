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
  const [displayAmount, setDisplayAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const resetForm = () => {
    setStep(1);
    setAccountType('');
    setSelectedProvider('');
    setAmount('');
    setDisplayAmount('');
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

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Remove all non-digit characters
    const numericValue = value.replace(/\D/g, '');
    
    if (numericValue === '') {
      setAmount('');
      setDisplayAmount('');
      return;
    }
    
    // Store raw number
    setAmount(numericValue);
    
    // Format with thousand separator
    const formatted = parseInt(numericValue).toLocaleString('id-ID');
    setDisplayAmount(formatted);
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
      setError('Pilih bank atau e-wallet terlebih dahulu');
      return;
    }

    if (!accountNumber.trim()) {
      setError('Nomor rekening/HP harus diisi');
      return;
    }

    if (!accountName.trim()) {
      setError('Nama pemilik rekening harus diisi');
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
          provider: selectedProvider,
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
      {/* Mobile: Bottom Sheet, Desktop: Modal */}
      <div className="bg-white w-full sm:max-w-2xl sm:rounded-3xl rounded-t-3xl shadow-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 sm:px-6 py-4 sm:py-6 rounded-t-3xl">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold">Tarik Komisi</h2>
              <p className="text-pink-100 text-sm sm:text-base mt-1">
                Saldo Tersedia: <span className="font-bold">Rp {availableBalance.toLocaleString('id-ID')}</span>
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-all ml-2 flex-shrink-0"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full font-bold text-lg ${step >= 1 ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                1
              </div>
              <div className={`h-1 w-12 sm:w-20 ${step >= 2 ? 'bg-pink-600' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full font-bold text-lg ${step >= 2 ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                2
              </div>
            </div>
          </div>

          {/* Step 1: Choose Account Type */}
          {step === 1 && (
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 text-center mb-4 sm:mb-6">
                Pilih Metode Penarikan
              </h3>

              {/* Bank Option */}
              <button
                onClick={() => handleTypeSelect('bank')}
                className="w-full bg-white border-2 border-pink-200 hover:border-pink-500 active:border-pink-600 hover:bg-pink-50 active:bg-pink-100 rounded-2xl p-4 sm:p-5 transition-all group"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-pink-100 group-hover:bg-pink-200 rounded-full p-3 sm:p-4 transition-all flex-shrink-0">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <h4 className="text-base sm:text-lg font-bold text-gray-800">Transfer Bank</h4>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">Mandiri, BRI, BCA, BSI, CIMBNIAGA, BPD DIY</p>
                  </div>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              {/* E-Wallet Option */}
              <button
                onClick={() => handleTypeSelect('ewallet')}
                className="w-full bg-white border-2 border-pink-200 hover:border-pink-500 active:border-pink-600 hover:bg-pink-50 active:bg-pink-100 rounded-2xl p-4 sm:p-5 transition-all group"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-pink-100 group-hover:bg-pink-200 rounded-full p-3 sm:p-4 transition-all flex-shrink-0">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <h4 className="text-base sm:text-lg font-bold text-gray-800">E-Wallet</h4>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">DANA, GOPAY, ShopeePay, OVO</p>
                  </div>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>
          )}

          {/* Step 2: Fill Details */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Back Button */}
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-gray-600 hover:text-pink-600 active:text-pink-700 font-medium text-sm sm:text-base"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Kembali
              </button>

              <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                {accountType === 'bank' ? 'Transfer Bank' : 'E-Wallet'}
              </h3>

              {/* Provider Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pilih {accountType === 'bank' ? 'Bank' : 'E-Wallet'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {(accountType === 'bank' ? BANKS : EWALLETS).map((provider) => (
                    <button
                      key={provider}
                      type="button"
                      onClick={() => handleProviderSelect(provider)}
                      className={`p-3 sm:p-4 rounded-xl font-semibold text-sm sm:text-base transition-all ${
                        selectedProvider === provider
                          ? 'bg-pink-600 text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
                      }`}
                    >
                      {provider}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah Penarikan
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-base sm:text-lg">
                    Rp
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={displayAmount}
                    onChange={handleAmountChange}
                    placeholder="0"
                    className="w-full pl-12 pr-4 py-3 sm:py-4 border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none text-base sm:text-lg font-semibold"
                  />
                </div>
              </div>

              {/* Account Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {accountType === 'bank' ? 'Nomor Rekening' : 'Nomor HP/Akun'}
                </label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder={accountType === 'bank' ? '1234567890' : '081234567890'}
                  className="w-full px-4 py-3 sm:py-4 border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none text-sm sm:text-base"
                />
              </div>

              {/* Account Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Pemilik Rekening
                </label>
                <input
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder="Nama sesuai rekening/akun"
                  className="w-full px-4 py-3 sm:py-4 border-2 border-gray-300 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none text-sm sm:text-base"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 active:from-pink-700 active:to-pink-800 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-base sm:text-lg"
              >
                {loading ? 'Memproses...' : 'Ajukan Penarikan'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
