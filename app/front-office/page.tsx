'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check');
        if (response.ok) {
          setIsAuthenticated(true);
          fetchData();
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
    return null; // Will redirect to login
  }

  const filteredReservations = reservations.filter(res => {
    const statusMatch = selectedStatus === 'all' || res.status === selectedStatus;
    const dateMatch = !selectedDate || res.reservationDate === selectedDate;
    return statusMatch && dateMatch;
  });

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
      <header className="border-b-2 border-pink-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-pink-600 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
              Front Office Dashboard
            </h1>
            <p className="text-gray-600">Manage reservations and appointments</p>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/front-office/affiliate-codes"
              className="text-pink-600 hover:text-pink-700 transition-colors flex items-center gap-2 font-medium"
            >
              → Manage Affiliate Codes
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-pink-600 transition-colors px-4 py-2 border-2 border-pink-200 rounded-lg hover:bg-pink-50"
            >
              Logout
            </button>
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
            <div className="bg-white border-2 border-yellow-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-gray-600 text-sm font-medium mb-2">Pending</div>
              <div className="text-5xl font-bold text-yellow-600">{stats.pendingReservations}</div>
            </div>
            <div className="bg-white border-2 border-blue-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-gray-600 text-sm font-medium mb-2">Confirmed</div>
              <div className="text-5xl font-bold text-blue-600">{stats.confirmedReservations || 0}</div>
            </div>
            <div className="bg-white border-2 border-green-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-gray-600 text-sm font-medium mb-2">Completed</div>
              <div className="text-5xl font-bold text-green-600">{stats.completedReservations}</div>
            </div>
            <div className="bg-white border-2 border-pink-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-gray-600 text-sm font-medium mb-2">Total Today</div>
              <div className="text-5xl font-bold text-pink-600">{stats.totalToday || stats.pendingReservations}</div>
            </div>
          </div>
        )}

        {/* Reservations Section */}
        <div className="bg-white border-2 border-pink-200 rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Reservations</h2>
          
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-pink-50 border-2 border-pink-200 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-400"
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
              className="bg-pink-50 border-2 border-pink-200 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-400"
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
                  className="bg-pink-50 border-2 border-pink-200 rounded-xl p-6 hover:bg-pink-100 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-800">{reservation.patientName}</h3>
                        <span className={`text-xs px-3 py-1 rounded-full uppercase font-semibold ${getStatusColor(reservation.status)}`}>
                          {reservation.status}
                        </span>
                      </div>
                      <p className="text-gray-600">{reservation.treatment.name}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-700 font-medium">
                        {new Date(reservation.reservationDate).toLocaleDateString('id-ID', { 
                          weekday: 'long', 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </div>
                      <div className="text-pink-600 font-bold text-lg">{reservation.reservationTime}</div>
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
