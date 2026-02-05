'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface AffiliateData {
  code: string;
  assignedEmail: string | null;
  status: string;
  usageCount: number;
  totalCommission: number;
  referralLink: string;
}

interface Reservation {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  treatmentName: string;
  reservationDate: string;
  reservationTime: string;
  status: string;
  finalPrice: number;
  commissionAmount: number;
  createdAt: string;
}

interface Stats {
  totalCommission: number;
  totalReservations: number;
  pendingReservations: number;
  totalCustomers: number;
}

export default function MyPrimePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [affiliateData, setAffiliateData] = useState<AffiliateData | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check');
        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            setIsAuthenticated(true);
            fetchAffiliateData();
          } else {
            setIsAuthenticated(false);
            router.push('/login');
          }
        } else {
          setIsAuthenticated(false);
          router.push('/login');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  const fetchAffiliateData = async () => {
    try {
      const response = await fetch('/api/my-prime/dashboard');
      if (response.ok) {
        const data = await response.json();
        setAffiliateData(data.affiliate);
        setReservations(data.reservations || []);
        setStats(data.stats);
      } else {
        // User belum punya kode affiliate
        console.error('No affiliate code assigned');
      }
    } catch (error) {
      console.error('Error fetching affiliate data:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyReferralLink = () => {
    if (affiliateData) {
      navigator.clipboard.writeText(affiliateData.referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isAuthenticated === null || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!affiliateData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-6">🎟️</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Belum Ada Kode Affiliate</h1>
          <p className="text-gray-600 mb-8">
            Anda belum memiliki kode affiliate. Silakan hubungi admin untuk mendapatkan kode affiliate Anda.
          </p>
          <Link
            href="/"
            className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-bold px-8 py-3 rounded-lg transition-colors"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 border border-yellow-300';
      case 'confirmed': return 'bg-blue-100 text-blue-700 border border-blue-300';
      case 'completed': return 'bg-green-100 text-green-700 border border-green-300';
      case 'cancelled': return 'bg-red-100 text-red-700 border border-red-300';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      {/* Header */}
      <header className="border-b border-pink-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-pink-600 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                MY PRIME
              </h1>
              <p className="text-gray-600">Dashboard Afiliator</p>
            </div>
            <div className="flex items-center gap-4">
              <Image 
                src="/logo.png" 
                alt="DRW Prime" 
                width={120} 
                height={40}
                className="object-contain"
              />
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-pink-600 text-sm transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Affiliate Code Card */}
        <div className="bg-gradient-to-br from-pink-100 to-pink-50 border-2 border-pink-300 rounded-xl p-8 mb-8 shadow-lg">
          <div className="text-sm text-gray-600 mb-2">Kode Affiliate</div>
          <div className="text-5xl font-bold text-pink-600 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            {affiliateData.code}
          </div>
          
          <div className="bg-white border-2 border-pink-200 rounded-lg p-4 mb-4">
            <div className="text-xs text-gray-600 mb-2">💡 Hubungi admin untuk mengubah kode affiliate</div>
            <div className="text-sm text-gray-700 mb-2 font-medium">Link Referral:</div>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={affiliateData.referralLink}
                readOnly
                className="flex-1 bg-pink-50 border-2 border-pink-200 text-pink-700 rounded px-4 py-2 text-sm font-mono"
              />
              <button
                onClick={copyReferralLink}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 py-2 rounded transition-colors whitespace-nowrap"
              >
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white border-2 border-green-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">💰</span>
                <div className="text-gray-600 text-sm font-medium">Total Komisi</div>
              </div>
              <div className="text-3xl font-bold text-green-600">
                Rp {stats.totalCommission.toLocaleString('id-ID')}
              </div>
            </div>

            <div className="bg-white border-2 border-blue-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">📋</span>
                <div className="text-gray-600 text-sm font-medium">Total Reservasi</div>
              </div>
              <div className="text-3xl font-bold text-blue-600">
                {stats.totalReservations}
                <span className="text-sm text-gray-500 ml-2">Selesai: 0</span>
              </div>
            </div>

            <div className="bg-white border-2 border-yellow-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">⏳</span>
                <div className="text-gray-600 text-sm font-medium">Pending</div>
              </div>
              <div className="text-3xl font-bold text-yellow-600">
                {stats.pendingReservations}
                <span className="text-sm text-gray-500 ml-2">Menunggu konfirmasi</span>
              </div>
            </div>

            <div className="bg-white border-2 border-purple-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">👥</span>
                <div className="text-gray-600 text-sm font-medium">Customer</div>
              </div>
              <div className="text-3xl font-bold text-purple-600">
                {stats.totalCustomers}
                <span className="text-sm text-gray-500 ml-2">Total dilayani</span>
              </div>
            </div>
          </div>
        )}

        {/* Create Reservation Button */}
        <div className="mb-8">
          <Link
            href={`/?ref=${affiliateData.code}`}
            className="block w-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-center px-8 py-4 rounded-xl transition-colors text-lg shadow-lg hover:shadow-xl"
          >
            + Buat Reservasi Baru
          </Link>
        </div>

        {/* Reservations List */}
        <div className="bg-white border-2 border-pink-200 rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
            Daftar Reservasi
          </h2>

          {reservations.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">Belum ada reservasi</h3>
              <p className="text-gray-500 mb-6">
                Bagikan link referral Anda untuk mendapatkan komisi!
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-pink-200">
                    <th className="text-left py-4 px-4 text-gray-600 font-semibold">Tanggal</th>
                    <th className="text-left py-4 px-4 text-gray-600 font-semibold">Customer</th>
                    <th className="text-left py-4 px-4 text-gray-600 font-semibold">Treatment</th>
                    <th className="text-left py-4 px-4 text-gray-600 font-semibold">Waktu</th>
                    <th className="text-left py-4 px-4 text-gray-600 font-semibold">Status</th>
                    <th className="text-left py-4 px-4 text-gray-600 font-semibold">Harga</th>
                    <th className="text-left py-4 px-4 text-gray-600 font-semibold">Komisi</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation) => (
                    <tr key={reservation.id} className="border-b border-pink-100 hover:bg-pink-50 transition-colors">
                      <td className="py-4 px-4 text-gray-700">
                        {new Date(reservation.reservationDate).toLocaleDateString('id-ID')}
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-gray-800 font-medium">{reservation.patientName}</div>
                        <div className="text-sm text-gray-500">{reservation.patientEmail}</div>
                      </td>
                      <td className="py-4 px-4 text-gray-700">
                        {reservation.treatmentName}
                      </td>
                      <td className="py-4 px-4 text-gray-700">
                        {reservation.reservationTime}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`text-xs px-3 py-1 rounded-full uppercase font-semibold ${getStatusColor(reservation.status)}`}>
                          {reservation.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-800 font-bold">
                        Rp {Number(reservation.finalPrice).toLocaleString('id-ID')}
                      </td>
                      <td className="py-4 px-4 text-green-600 font-bold">
                        Rp {Number(reservation.commissionAmount).toLocaleString('id-ID')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
