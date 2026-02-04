'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';

interface AffiliateData {
  id: string;
  firstName: string | null;
  lastName: string | null;
  affiliateCode: string;
  totalReferrals: number;
  totalEarnings: number;
  commissionPending: number;
  commissionPaid: number;
}

export default function AffiliateDashboard() {
  const { userId, isLoaded } = useAuth();
  const [affiliate, setAffiliate] = useState<AffiliateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    const fetchAffiliate = async () => {
      try {
        const response = await fetch('/api/affiliate/profile');
        if (response.ok) {
          const data = await response.json();
          setAffiliate(data);
        }
      } catch (error) {
        console.error('Error fetching affiliate data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAffiliate();
  }, [isLoaded]);

  const copyReferralLink = () => {
    if (affiliate) {
      const link = `${window.location.origin}/reservation?ref=${affiliate.affiliateCode}`;
      navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userId || !affiliate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You need to be logged in to access this page.</p>
          <Link href="/sign-in" className="text-pink-600 hover:text-pink-700 font-semibold">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Affiliate Dashboard</h1>
          <p className="text-gray-600">Kelola kode affiliate dan komisi Anda</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {affiliate.firstName} {affiliate.lastName}
            </h2>
            <p className="text-gray-600">Affiliate Member</p>
          </div>

          {/* Affiliate Code Section */}
          <div className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-lg p-6 mb-8">
            <div className="text-sm font-medium text-gray-600 mb-2">Kode Affiliate Anda</div>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold text-pink-600">{affiliate.affiliateCode}</div>
              <button
                onClick={copyReferralLink}
                className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
              >
                {copied ? '✓ Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-gray-500 text-sm font-medium mb-2">Total Referral</div>
              <div className="text-3xl font-bold text-gray-900">{affiliate.totalReferrals}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-gray-500 text-sm font-medium mb-2">Komisi Pending</div>
              <div className="text-3xl font-bold text-yellow-600">
                Rp {affiliate.commissionPending.toLocaleString('id-ID')}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-gray-500 text-sm font-medium mb-2">Komisi Dibayar</div>
              <div className="text-3xl font-bold text-green-600">
                Rp {affiliate.commissionPaid.toLocaleString('id-ID')}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-gray-500 text-sm font-medium mb-2">Total Earnings</div>
              <div className="text-3xl font-bold text-pink-600">
                Rp {affiliate.totalEarnings.toLocaleString('id-ID')}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/affiliate/referrals"
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
          >
            <div className="text-2xl mb-2">📊</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Lihat Referral</h3>
            <p className="text-gray-600 text-sm">Lihat detail semua referral dan komisi Anda</p>
          </Link>

          <Link
            href="/affiliate/claim-code"
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
          >
            <div className="text-2xl mb-2">🎟️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Claim Kode</h3>
            <p className="text-gray-600 text-sm">Claim kode affiliate yang sudah diberikan admin</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
