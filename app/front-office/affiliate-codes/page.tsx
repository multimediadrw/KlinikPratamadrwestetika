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
  
  // New states for assign/claim/delete
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedCodeForAssign, setSelectedCodeForAssign] = useState<AffiliateCode | null>(null);
  const [assignEmail, setAssignEmail] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCodeForDelete, setSelectedCodeForDelete] = useState<AffiliateCode | null>(null);

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
        fetchData();
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
    const url = `${window.location.origin}/?ref=${code}`;
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  const generateQRCode = async (code: string) => {
    const url = `${window.location.origin}/?ref=${code}`;
    try {
      const dataURL = await QRCode.toDataURL(url, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
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
    link.href = qrCodeDataURL;
    link.download = `QR-${selectedCodeForQR}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // New functions for assign/claim/delete
  const openAssignModal = (code: AffiliateCode) => {
    setSelectedCodeForAssign(code);
    setAssignEmail(code.assignedEmail || '');
    setShowAssignModal(true);
  };

  const handleAssignAndClaim = async () => {
    if (!assignEmail.trim()) {
      alert('Please enter an email address');
      return;
    }

    if (!selectedCodeForAssign) return;

    try {
      const response = await fetch('/api/admin/codes/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          codeId: selectedCodeForAssign.id,
          email: assignEmail.trim().toLowerCase(),
        }),
      });

      if (response.ok) {
        alert('Code assigned and claimed successfully!');
        setShowAssignModal(false);
        setAssignEmail('');
        setSelectedCodeForAssign(null);
        fetchData();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to assign code');
      }
    } catch (error) {
      console.error('Error assigning code:', error);
      alert('Error assigning code');
    }
  };

  const openDeleteModal = (code: AffiliateCode) => {
    setSelectedCodeForDelete(code);
    setShowDeleteModal(true);
  };

  const handleDeleteCode = async () => {
    if (!selectedCodeForDelete) return;

    try {
      const response = await fetch('/api/admin/codes/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codeId: selectedCodeForDelete.id }),
      });

      if (response.ok) {
        alert('Code deleted successfully!');
        setShowDeleteModal(false);
        setSelectedCodeForDelete(null);
        fetchData();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to delete code');
      }
    } catch (error) {
      console.error('Error deleting code:', error);
      alert('Error deleting code');
    }
  };

  const filteredCodes = codes.filter((code) => {
    if (selectedStatus === 'all') return true;
    return code.status.toLowerCase() === selectedStatus;
  });

  if (isAuthenticated === null || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/front-office" className="text-pink-600 hover:text-pink-700 mb-2 inline-block">
              ← Back to Reservations
            </Link>
            <h1 className="text-4xl font-bold text-pink-600">Affiliate Codes</h1>
            <p className="text-gray-600 mt-2">Generate and manage pre-claim affiliate codes</p>
          </div>
          <Image
            src="/logo.png"
            alt="Klinik Logo"
            width={80}
            height={80}
            className="rounded-full"
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-pink-100 to-pink-50 border border-pink-300 rounded-lg p-6">
            <div className="text-pink-600 text-sm mb-2">Total Codes</div>
            <div className="text-4xl font-bold text-pink-700">{stats?.totalCodes || 0}</div>
          </div>
          <div className="bg-gradient-to-br from-green-100 to-green-50 border border-green-300 rounded-lg p-6">
            <div className="text-green-600 text-sm mb-2">Unclaimed</div>
            <div className="text-4xl font-bold text-green-700">{stats?.unclaimedCodes || 0}</div>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-300 rounded-lg p-6">
            <div className="text-blue-600 text-sm mb-2">Claimed</div>
            <div className="text-4xl font-bold text-blue-700">{stats?.claimedCodes || 0}</div>
          </div>
          <div className="bg-gradient-to-br from-purple-100 to-purple-50 border border-purple-300 rounded-lg p-6">
            <div className="text-purple-600 text-sm mb-2">Total Usage</div>
            <div className="text-4xl font-bold text-purple-700">{stats?.totalUsage || 0}</div>
          </div>
        </div>

        {/* Codes Section */}
        <div className="bg-white border border-pink-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Codes</h2>
            <button
              onClick={() => setShowGenerateModal(true)}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
            >
              + Generate Code
            </button>
          </div>

          {/* Filter */}
          <div className="mb-6">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-pink-50 border border-pink-300 text-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-400"
            >
              <option value="all">All Status</option>
              <option value="unclaimed">Unclaimed</option>
              <option value="claimed">Claimed</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-pink-200">
                  <th className="text-left py-4 px-4 text-gray-700 font-semibold">Code</th>
                  <th className="text-left py-4 px-4 text-gray-700 font-semibold">Assigned Email</th>
                  <th className="text-left py-4 px-4 text-gray-700 font-semibold">Status</th>
                  <th className="text-left py-4 px-4 text-gray-700 font-semibold">Usage</th>
                  <th className="text-left py-4 px-4 text-gray-700 font-semibold">Commission</th>
                  <th className="text-left py-4 px-4 text-gray-700 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCodes.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">
                      No codes found
                    </td>
                  </tr>
                ) : (
                  filteredCodes.map((code) => (
                    <tr key={code.id} className="border-b border-pink-100 hover:bg-pink-50">
                      <td className="py-4 px-4 font-mono text-pink-600 font-bold">
                        {code.code}
                      </td>
                      <td className="py-4 px-4 text-gray-700">
                        {code.assignedEmail || '-'}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            code.status === 'unclaimed'
                              ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                              : 'bg-green-100 text-green-700 border border-green-300'
                          }`}
                        >
                          {code.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-700">
                        <span className="font-bold">{code.usageCount}</span> reservations
                      </td>
                      <td className="py-4 px-4 text-green-600 font-bold">
                        Rp {Number(code.totalCommission).toLocaleString('id-ID')}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          <button
                            onClick={() => copyToClipboard(code.code)}
                            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 text-xs px-3 py-1 rounded border border-yellow-300 transition-colors"
                          >
                            Copy Link
                          </button>
                          <button
                            onClick={() => generateQRCode(code.code)}
                            className="bg-purple-100 hover:bg-purple-200 text-purple-700 text-xs px-3 py-1 rounded border border-purple-300 transition-colors"
                          >
                            QR Code
                          </button>
                          <button
                            onClick={() => openAssignModal(code)}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs px-3 py-1 rounded border border-blue-300 transition-colors"
                          >
                            {code.status === 'claimed' ? 'Transfer' : 'Assign'}
                          </button>
                          {code.status === 'unclaimed' && (
                            <button
                              onClick={() => openDeleteModal(code)}
                              className="bg-red-100 hover:bg-red-200 text-red-700 text-xs px-3 py-1 rounded border border-red-300 transition-colors"
                            >
                              Delete
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowQRModal(false)}>
          <div className="bg-white border border-purple-300 rounded-lg p-8 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-purple-600 mb-4">QR Code - {selectedCodeForQR}</h3>
            <p className="text-gray-600 mb-6">Scan QR code ini untuk langsung ke form reservasi dengan kode affiliate</p>
            
            <div className="bg-white p-6 rounded-lg mb-6 flex items-center justify-center border border-gray-200">
              {qrCodeDataURL && (
                <img src={qrCodeDataURL} alt="QR Code" className="w-full max-w-[300px]" />
              )}
            </div>
            
            <div className="text-sm text-gray-600 mb-6 break-all bg-gray-50 p-3 rounded border border-gray-200">
              Link: {typeof window !== 'undefined' ? window.location.origin : ''}/?ref={selectedCodeForQR}
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => setShowQRModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-lg transition-colors"
              >
                Close
              </button>
              <button
                onClick={downloadQRCode}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded-lg transition-colors"
              >
                Download QR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generate Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white border border-pink-300 rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-pink-600 mb-4">Generate New Code</h3>
            <p className="text-gray-600 mb-6">Enter a custom affiliate code</p>
            <input
              type="text"
              placeholder="Enter code (e.g., SITIAYU01)"
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value.toUpperCase())}
              className="w-full bg-pink-50 border border-pink-300 text-gray-800 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:border-pink-400 font-mono text-lg"
              maxLength={20}
            />
            <div className="flex gap-4">
              <button
                onClick={() => setShowGenerateModal(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateCodes}
                className="flex-1 bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign/Claim Modal */}
      {showAssignModal && selectedCodeForAssign && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white border border-blue-300 rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-blue-600 mb-4">
              {selectedCodeForAssign.status === 'claimed' ? 'Transfer Ownership' : 'Assign & Claim Code'}
            </h3>
            <p className="text-gray-600 mb-2">Code: <span className="font-mono font-bold text-pink-600">{selectedCodeForAssign.code}</span></p>
            {selectedCodeForAssign.assignedEmail && (
              <p className="text-gray-600 mb-4">Current Owner: <span className="font-semibold">{selectedCodeForAssign.assignedEmail}</span></p>
            )}
            <p className="text-gray-600 mb-6">
              {selectedCodeForAssign.status === 'claimed' 
                ? 'Enter new email to transfer ownership:' 
                : 'Enter email to assign and claim this code:'}
            </p>
            <input
              type="email"
              placeholder="email@example.com"
              value={assignEmail}
              onChange={(e) => setAssignEmail(e.target.value.toLowerCase())}
              className="w-full bg-blue-50 border border-blue-300 text-gray-800 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:border-blue-400"
            />
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowAssignModal(false);
                  setAssignEmail('');
                  setSelectedCodeForAssign(null);
                }}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignAndClaim}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition-colors"
              >
                {selectedCodeForAssign.status === 'claimed' ? 'Transfer' : 'Assign & Claim'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedCodeForDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white border border-red-300 rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-red-600 mb-4">Delete Code</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete code <span className="font-mono font-bold text-pink-600">{selectedCodeForDelete.code}</span>?
            </p>
            <p className="text-red-600 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedCodeForDelete(null);
                }}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCode}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
