'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import QRCode from 'qrcode';

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
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [codes, setCodes] = useState<AffiliateCode[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [customCode, setCustomCode] = useState('');
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedCodeForQR, setSelectedCodeForQR] = useState<string | null>(null);
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>('');
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

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

  const handleGenerateCodes = async () => {
    if (!customCode.trim()) {
      alert('Please enter a code');
      return;
    }

    try {
      const response = await fetch('/api/admin/codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customCode: customCode.trim().toUpperCase() }),
      });

      if (response.ok) {
        setShowGenerateModal(false);
        setCustomCode('');
        // Refresh data
        window.location.reload();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to create code');
      }
    } catch (error) {
      console.error('Error generating code:', error);
      alert('Error creating code');
    }
  };

  const copyToClipboard = (code: string) => {
    const link = `${window.location.origin}/?ref=${code}`;
    navigator.clipboard.writeText(link);
    alert('Referral link copied to clipboard!');
  };

  const generateQRCode = async (code: string) => {
    try {
      const link = `${window.location.origin}/?ref=${code}`;
      const dataURL = await QRCode.toDataURL(link, {
        width: 400,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeDataURL(dataURL);
      setSelectedCodeForQR(code);
      setShowQRModal(true);
    } catch (error) {
      console.error('Error generating QR code:', error);
      alert('Failed to generate QR code');
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeDataURL || !selectedCodeForQR) return;
    
    const link = document.createElement('a');
    link.download = `QR-${selectedCodeForQR}.png`;
    link.href = qrCodeDataURL;
    link.click();
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
          <p className="mt-4 text-gray-600">Loading codes...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  if (false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You need to be logged in to access this page.</p>
          <Link href="/sign-in" className="text-pink-600 hover:text-pink-500 font-semibold">
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
      case 'unclaimed': return 'bg-yellow-100 text-yellow-700 border border-yellow-300';
      case 'claimed': return 'bg-green-100 text-green-700 border border-green-300';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-white text-gray-800">
      {/* Header */}
      <header className="border-b border-pink-200 bg-gradient-to-br from-pink-50 to-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <Link 
            href="/front-office"
            className="text-pink-600 hover:text-pink-500 transition-colors inline-flex items-center gap-2 mb-4"
          >
            ← Back to Reservations
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-pink-600 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                Affiliate Codes
              </h1>
              <p className="text-gray-600">Generate and manage pre-claim affiliate codes</p>
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
            <div className="bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border border-pink-300 rounded-lg p-6">
              <div className="text-gray-600 text-sm font-medium mb-2">Total Codes</div>
              <div className="text-5xl font-bold text-pink-600">{stats.totalCodes}</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border border-pink-300 rounded-lg p-6">
              <div className="text-gray-600 text-sm font-medium mb-2">Unclaimed</div>
              <div className="text-5xl font-bold text-pink-600">{stats.unclaimedCodes}</div>
            </div>
            <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-800/30 rounded-lg p-6">
              <div className="text-gray-600 text-sm font-medium mb-2">Claimed</div>
              <div className="text-5xl font-bold text-green-400">{stats.claimedCodes}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-800/30 rounded-lg p-6">
              <div className="text-gray-600 text-sm font-medium mb-2">Total Usage</div>
              <div className="text-5xl font-bold text-blue-400">{stats.totalUsage}</div>
            </div>
          </div>
        )}

        {/* Codes Section */}
        <div className="bg-gradient-to-br from-yellow-900/10 to-transparent border border-pink-200 rounded-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Codes</h2>
            <button
              onClick={() => setShowGenerateModal(true)}
              className="bg-pink-500 hover:bg-pink-600 text-black font-bold px-6 py-3 rounded-lg transition-colors"
            >
              + Generate Code
            </button>
          </div>

          {/* Filter */}
          <div className="mb-6">
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-pink-100 border border-pink-300 text-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-400"
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
                <tr className="border-b border-pink-200">
                  <th className="text-left py-4 px-4 text-gray-600 font-medium">Code</th>
                  <th className="text-left py-4 px-4 text-gray-600 font-medium">Assigned Email</th>
                  <th className="text-left py-4 px-4 text-gray-600 font-medium">Status</th>
                  <th className="text-left py-4 px-4 text-gray-600 font-medium">Usage</th>
                  <th className="text-left py-4 px-4 text-gray-600 font-medium">Commission</th>
                  <th className="text-left py-4 px-4 text-gray-600 font-medium">Actions</th>
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
                    <tr key={code.id} className="border-b border-pink-200/50 hover:bg-yellow-900/5">
                      <td className="py-4 px-4">
                        <span className="font-mono text-pink-600 font-bold">{code.code}</span>
                      </td>
                      <td className="py-4 px-4 text-gray-700">
                        {code.assignedEmail || '-'}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`text-xs px-3 py-1 rounded-full uppercase font-semibold ${getStatusColor(code.status)}`}>
                          {code.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-700">
                        <span className="font-bold">{code.usageCount}</span> reservations
                      </td>
                      <td className="py-4 px-4 text-green-400 font-bold">
                        Rp {Number(code.totalCommission).toLocaleString('id-ID')}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => copyToClipboard(code.code)}
                            className="bg-yellow-900/30 hover:bg-yellow-900/50 text-pink-600 text-xs px-3 py-1 rounded border border-yellow-700 transition-colors"
                          >
                            Copy Link
                          </button>
                          <button
                            onClick={() => generateQRCode(code.code)}
                            className="bg-purple-900/30 hover:bg-purple-900/50 text-purple-400 text-xs px-3 py-1 rounded border border-purple-700 transition-colors"
                          >
                            QR Code
                          </button>
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
                            <button className="bg-yellow-900/30 hover:bg-yellow-900/50 text-pink-600 text-xs px-3 py-1 rounded border border-yellow-700 transition-colors">
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

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-gradient-to-br from-pink-50 to-white/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowQRModal(false)}>
          <div className="bg-white border border-purple-800/30 rounded-lg p-8 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-purple-400 mb-4">QR Code - {selectedCodeForQR}</h3>
            <p className="text-gray-600 mb-6">Scan QR code ini untuk langsung ke form reservasi dengan kode affiliate</p>
            
            <div className="bg-white p-6 rounded-lg mb-6 flex items-center justify-center">
              {qrCodeDataURL && (
                <img src={qrCodeDataURL} alt="QR Code" className="w-full max-w-[300px]" />
              )}
            </div>
            
            <div className="text-sm text-gray-600 mb-6 break-all">
              Link: {window.location.origin}/?ref={selectedCodeForQR}
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => setShowQRModal(false)}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-800 font-bold px-6 py-3 rounded-lg transition-colors"
              >
                Close
              </button>
              <button
                onClick={downloadQRCode}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-gray-800 font-bold px-6 py-3 rounded-lg transition-colors"
              >
                Download QR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generate Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 bg-gradient-to-br from-pink-50 to-white/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white border border-pink-300 rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-pink-600 mb-4">Generate New Code</h3>
            <p className="text-gray-600 mb-6">Enter a custom affiliate code</p>
            <input
              type="text"
              placeholder="Enter code"
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value.toUpperCase())}
              className="w-full bg-pink-100 border border-pink-300 text-gray-800 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:border-pink-400 font-mono text-lg"
              maxLength={20}
            />
            <div className="flex gap-4">
              <button
                onClick={() => setShowGenerateModal(false)}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-800 font-bold px-6 py-3 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateCodes}
                className="flex-1 bg-pink-500 hover:bg-pink-600 text-black font-bold px-6 py-3 rounded-lg transition-colors"
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
