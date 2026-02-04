'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';

interface DashboardStats {
  totalReservations: number;
  pendingReservations: number;
  completedReservations: number;
  totalAffiliates: number;
}

export default function FrontOfficeDashboard() {
  const { userId, isLoaded } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    const fetchStats = async () => {
      try {
        const response = await fetch('/api/front-office/dashboard/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [isLoaded]);

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You need to be logged in as an admin to access this page.</p>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Front-Office Dashboard</h1>
          <p className="text-gray-600">Kelola reservasi, affiliate, dan komisi</p>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-gray-500 text-sm font-medium mb-2">Total Reservasi</div>
              <div className="text-3xl font-bold text-gray-900">{stats.totalReservations}</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-gray-500 text-sm font-medium mb-2">Pending</div>
              <div className="text-3xl font-bold text-yellow-600">{stats.pendingReservations}</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-gray-500 text-sm font-medium mb-2">Completed</div>
              <div className="text-3xl font-bold text-green-600">{stats.completedReservations}</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-gray-500 text-sm font-medium mb-2">Total Affiliates</div>
              <div className="text-3xl font-bold text-pink-600">{stats.totalAffiliates}</div>
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/front-office/reservations"
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
          >
            <div className="text-2xl mb-2">📅</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Reservations</h3>
            <p className="text-gray-600 text-sm">View, create, edit, and delete reservations</p>
          </Link>

          <Link
            href="/front-office/affiliate-codes"
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
          >
            <div className="text-2xl mb-2">🎟️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Affiliate Codes</h3>
            <p className="text-gray-600 text-sm">Generate and manage affiliate codes</p>
          </Link>

          <Link
            href="/front-office/affiliates"
            className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6"
          >
            <div className="text-2xl mb-2">👥</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Affiliate Network</h3>
            <p className="text-gray-600 text-sm">View affiliate performance and commissions</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
