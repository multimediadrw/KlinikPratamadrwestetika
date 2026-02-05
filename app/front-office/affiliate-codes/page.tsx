'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';

interface AffiliateCode {
  id: string;
  code: string;
  assignedEmail: string | null;
  status: string;
  usageCount: number;
  totalCommission: number;
  createdAt: string;
}

interface Stats {
  totalCodes: number;
  unclaimedCodes: number;
  claimedCodes: number;
  totalUsage: number;
}

export default function AffiliateCodesPage() {
  const { userId, isLoaded } = useAuth();
  const [codes, setCodes] = useState<AffiliateCode[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [generateCount, setGenerateCount] = useState(1);

  useEffect(() => {
    if (!isLoaded) return;

    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin/codes');
        if (response.ok) {
          const data = await response.json();
          setCodes(data.codes || []);
          setStats(data.stats || null);
        }
      } catch (error) {
        console.error('Error fetching codes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isLoaded]);

  const handleGenerateCodes = async () => {
    try {
      const response = await fetch('/api/admin/codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: generateCount }),
      });

      if (response.ok) {
        const newCodes = await response.json();
        setCodes([...newCodes, ...codes]);
        setShowGenerateModal(false);
        setGenerateCount(1);
        // Refresh data
        window.location.reload();
      }
    } catch (error) {
      console.error('Error generating codes:', error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Code copied to clipboard!');
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
          <p className="mt-4 text-gray-400">Loading codes...</p>
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

  const filteredCodes = codes.filter(code => 
    selectedStatus === 'all' || code.status === selectedStatus
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'unclaimed': return 'bg-yellow-900/30 text-yellow-500 border border-yellow-700';
      case 'claimed': return 'bg-green-900/30 text-green-400 border border-green-700';
      default: return 'bg-gray-800 text-gray-400';
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <Link 
            href="/front-office"
            className="text-yellow-500 hover:text-yellow-400 transition-colors inline-flex items-center gap-2 mb-4"
          >
            ← Back to Reservations
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-yellow-500 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                Affiliate Codes
              </h1>
              <p className="text-gray-400">Generate and manage pre-claim affiliate codes</p>
            </div>
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
              <div className="text-gray-400 text-sm font-medium mb-2">Total Codes</div>
              <div className="text-5xl font-bold text-yellow-500">{stats.totalCodes}</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border border-yellow-800/30 rounded-lg p-6">
              <div className="text-gray-400 text-sm font-medium mb-2">Unclaimed</div>
              <div className="text-5xl font-bold text-yellow-500">{stats.unclaimedCodes}</div>
            </div>
            <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-800/30 rounded-lg p-6">
              <div className="text-gray-400 text-sm font-medium mb-2">Claimed</div>
              <div className="text-5xl font-bold text-green-400">{stats.claimedCodes}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-800/30 rounded-lg p-6">
              <div className="text-gray-400 text-sm font-medium mb-2">Total Usage</div>
              <div className="text-5xl font-bold text-blue-400">{stats.totalUsage}</div>
            </div>
          </div>
        )}

        {/* Codes Section */}
        <div className="bg-gradient-to-br from-yellow-900/10 to-transparent border border-yellow-800/20 rounded-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Codes</h2>
            <button
              onClick={() => setShowGenerateModal(true)}
              className="bg-yellow-600 hover:bg-yellow-700 text-black font-bold px-6 py-3 rounded-lg transition-colors"
            >
              + Generate Code
            </button>
          </div>

          {/* Filter */}
          <div className="mb-6">
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-yellow-900/20 border border-yellow-800/30 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-600"
            >
              <option value="all">All Status</option>
              <option value="unclaimed">Unclaimed</option>
              <option value="claimed">Claimed</option>
            </select>
          </div>

          {/* Codes Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">Code</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">Assigned Email</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">Status</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">Usage</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">Commission</th>
                  <th className="text-left py-4 px-4 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCodes.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-gray-500">
                      No codes found
                    </td>
                  </tr>
                ) : (
                  filteredCodes.map((code) => (
                    <tr key={code.id} className="border-b border-gray-800/50 hover:bg-yellow-900/5">
                      <td className="py-4 px-4">
                        <span className="font-mono text-yellow-500 font-bold">{code.code}</span>
                      </td>
                      <td className="py-4 px-4 text-gray-300">
                        {code.assignedEmail || '-'}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`text-xs px-3 py-1 rounded-full uppercase font-semibold ${getStatusColor(code.status)}`}>
                          {code.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-300">
                        <span className="font-bold">{code.usageCount}</span> reservations
                      </td>
                      <td className="py-4 px-4 text-green-400 font-bold">
                        Rp {Number(code.totalCommission).toLocaleString('id-ID')}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => copyToClipboard(code.code)}
                            className="bg-yellow-900/30 hover:bg-yellow-900/50 text-yellow-500 text-xs px-3 py-1 rounded border border-yellow-700 transition-colors"
                          >
                            Copy Link
                          </button>
                          <span className="text-gray-600">OR</span>
                          {code.status === 'unclaimed' && (
                            <>
                              <button className="bg-blue-900/30 hover:bg-blue-900/50 text-blue-400 text-xs px-3 py-1 rounded border border-blue-700 transition-colors">
                                Assign
                              </button>
                              <button className="bg-red-900/30 hover:bg-red-900/50 text-red-400 text-xs px-3 py-1 rounded border border-red-700 transition-colors">
                                Delete
                              </button>
                            </>
                          )}
                          {code.status === 'claimed' && (
                            <button className="bg-yellow-900/30 hover:bg-yellow-900/50 text-yellow-500 text-xs px-3 py-1 rounded border border-yellow-700 transition-colors">
                              Transfer
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Generate Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-yellow-800/30 rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-yellow-500 mb-4">Generate New Codes</h3>
            <p className="text-gray-400 mb-6">How many affiliate codes do you want to generate?</p>
            <input
              type="number"
              min="1"
              max="100"
              value={generateCount}
              onChange={(e) => setGenerateCount(parseInt(e.target.value) || 1)}
              className="w-full bg-yellow-900/20 border border-yellow-800/30 text-white rounded-lg px-4 py-3 mb-6 focus:outline-none focus:border-yellow-600"
            />
            <div className="flex gap-4">
              <button
                onClick={() => setShowGenerateModal(false)}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold px-6 py-3 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateCodes}
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-black font-bold px-6 py-3 rounded-lg transition-colors"
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
