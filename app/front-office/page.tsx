'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';

interface DashboardStats {
  totalReservations: number;
  pendingReservations: number;
  confirmedReservations: number;
  completedReservations: number;
  totalToday: number;
}

interface Reservation {
  id: string;
  patientName: string;
  treatment: {
    name: string;
  };
  reservationDate: string;
  reservationTime: string;
  status: string;
}

export default function FrontOfficeDashboard() {
  const { userId, isLoaded } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    if (!isLoaded) return;

    const fetchData = async () => {
      try {
        const [statsRes, reservationsRes] = await Promise.all([
          fetch('/api/front-office/dashboard/stats'),
          fetch('/api/front-office/reservations')
        ]);

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }

        if (reservationsRes.ok) {
          const reservationsData = await reservationsRes.json();
          setReservations(reservationsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isLoaded]);

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
          <p className="mt-4 text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-6">You need to be logged in to access this page.</p>
          <Link href="/sign-in" className="text-yellow-500 hover:text-yellow-400 font-semibold">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const filteredReservations = reservations.filter(res => {
    const statusMatch = selectedStatus === 'all' || res.status === selectedStatus;
    const dateMatch = !selectedDate || res.reservationDate === selectedDate;
    return statusMatch && dateMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-900/30 text-yellow-500 border border-yellow-700';
      case 'confirmed': return 'bg-blue-900/30 text-blue-400 border border-blue-700';
      case 'completed': return 'bg-green-900/30 text-green-400 border border-green-700';
      case 'cancelled': return 'bg-red-900/30 text-red-400 border border-red-700';
      default: return 'bg-gray-800 text-gray-400';
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-yellow-500 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
              Front Office Dashboard
            </h1>
            <p className="text-gray-400">Manage reservations and appointments</p>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/front-office/affiliate-codes"
              className="text-yellow-500 hover:text-yellow-400 transition-colors flex items-center gap-2"
            >
              → Manage Affiliate Codes
            </Link>
            <Image 
              src="/logo.png" 
              alt="DRW Prime" 
              width={120} 
              height={40}
              className="object-contain"
            />
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border border-yellow-800/30 rounded-lg p-6">
              <div className="text-gray-400 text-sm font-medium mb-2">Pending</div>
              <div className="text-5xl font-bold text-yellow-500">{stats.pendingReservations}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-800/30 rounded-lg p-6">
              <div className="text-gray-400 text-sm font-medium mb-2">Confirmed</div>
              <div className="text-5xl font-bold text-blue-400">{stats.confirmedReservations || 0}</div>
            </div>
            <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-800/30 rounded-lg p-6">
              <div className="text-gray-400 text-sm font-medium mb-2">Completed</div>
              <div className="text-5xl font-bold text-green-400">{stats.completedReservations}</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border border-yellow-800/30 rounded-lg p-6">
              <div className="text-gray-400 text-sm font-medium mb-2">Total Today</div>
              <div className="text-5xl font-bold text-yellow-500">{stats.totalToday || stats.pendingReservations}</div>
            </div>
          </div>
        )}

        {/* Reservations Section */}
        <div className="bg-gradient-to-br from-yellow-900/10 to-transparent border border-yellow-800/20 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Reservations</h2>
          
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-yellow-900/20 border border-yellow-800/30 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-600"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <input 
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              placeholder="hh/bb/tttt"
              className="bg-yellow-900/20 border border-yellow-800/30 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-600"
            />
          </div>

          {/* Reservations List */}
          <div className="space-y-4">
            {filteredReservations.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No reservations found
              </div>
            ) : (
              filteredReservations.map((reservation) => (
                <div 
                  key={reservation.id}
                  className="bg-yellow-900/10 border border-yellow-800/20 rounded-lg p-6 hover:bg-yellow-900/20 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">{reservation.patientName}</h3>
                        <span className={`text-xs px-3 py-1 rounded-full uppercase font-semibold ${getStatusColor(reservation.status)}`}>
                          {reservation.status}
                        </span>
                      </div>
                      <p className="text-gray-400">{reservation.treatment.name}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">
                        {new Date(reservation.reservationDate).toLocaleDateString('id-ID', { 
                          weekday: 'long', 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </div>
                      <div className="text-yellow-500 font-bold text-lg">{reservation.reservationTime}</div>
                    </div>
                    <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
