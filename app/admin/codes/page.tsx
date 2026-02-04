'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';

interface Code {
  id: string;
  code: string;
  assignedEmail: string | null;
  status: string;
  usageCount: number;
  totalCommission: number;
  claimedAt: string | null;
  user: {
    email: string;
    firstName: string | null;
    lastName: string | null;
  } | null;
}

export default function AdminCodesPage() {
  const { userId, isLoaded } = useAuth();
  const [codes, setCodes] = useState<Code[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedCode, setSelectedCode] = useState<Code | null>(null);
  const [newCodeValue, setNewCodeValue] = useState('');
  const [assignEmail, setAssignEmail] = useState('');
  const [transferEmail, setTransferEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!isLoaded) return;
    fetchCodes();
  }, [isLoaded]);

  const fetchCodes = async () => {
    try {
      const response = await fetch('/api/admin/codes');
      if (response.ok) {
        const data = await response.json();
        setCodes(data.codes);
      } else if (response.status === 403) {
        setError('Access denied - Admin only');
      }
    } catch (error) {
      console.error('Error fetching codes:', error);
      setError('Failed to load codes');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCode = async () => {
    if (!newCodeValue.trim()) {
      setError('Code cannot be empty');
      return;
    }

    try {
      const response = await fetch('/api/admin/codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: newCodeValue.trim() }),
      });

      if (response.ok) {
        setSuccess('Code created successfully');
        setShowCreateModal(false);
        setNewCodeValue('');
        fetchCodes();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to create code');
      }
    } catch (error) {
      setError('Failed to create code');
    }
  };

  const handleAssign = async () => {
    if (!selectedCode || !assignEmail.trim()) {
      setError('Email is required');
      return;
    }

    try {
      const response = await fetch(`/api/admin/codes/${selectedCode.id}/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: assignEmail.trim() }),
      });

      if (response.ok) {
        setSuccess('Email assigned successfully');
        setShowAssignModal(false);
        setAssignEmail('');
        setSelectedCode(null);
        fetchCodes();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to assign email');
      }
    } catch (error) {
      setError('Failed to assign email');
    }
  };

  const handleClaim = async () => {
    if (!selectedCode) return;

    try {
      const response = await fetch(`/api/admin/codes/${selectedCode.id}/claim`, {
        method: 'POST',
      });

      if (response.ok) {
        setSuccess('Code claimed successfully');
        setShowClaimModal(false);
        setSelectedCode(null);
        fetchCodes();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to claim code');
      }
    } catch (error) {
      setError('Failed to claim code');
    }
  };

  const handleTransfer = async () => {
    if (!selectedCode || !transferEmail.trim()) {
      setError('New owner email is required');
      return;
    }

    try {
      const response = await fetch(`/api/admin/codes/${selectedCode.id}/transfer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newEmail: transferEmail.trim() }),
      });

      if (response.ok) {
        setSuccess('Code transferred successfully');
        setShowTransferModal(false);
        setTransferEmail('');
        setSelectedCode(null);
        fetchCodes();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to transfer code');
      }
    } catch (error) {
      setError('Failed to transfer code');
    }
  };

  const handleDelete = async (code: Code) => {
    if (!confirm(`Are you sure you want to delete code "${code.code}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/codes/${code.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSuccess('Code deleted successfully');
        fetchCodes();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to delete code');
      }
    } catch (error) {
      setError('Failed to delete code');
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You need to be logged in as admin.</p>
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
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard Front-Office Afiliasi</h1>
            <p className="text-gray-600">Kelola kode affiliate untuk mitra</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors font-semibold"
          >
            + Buat Kode Baru
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError('')} className="text-red-700 hover:text-red-900">✕</button>
          </div>
        )}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex justify-between items-center">
            <span>{success}</span>
            <button onClick={() => setSuccess('')} className="text-green-700 hover:text-green-900">✕</button>
          </div>
        )}

        {/* Status Legend */}
        <div className="mb-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">📊 Memahami Status Kode</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">UNCLAIMED</span>
              <div className="text-sm">
                <p className="font-medium text-gray-900">Kode belum punya pemilik</p>
                <p className="text-gray-600">Tindakan: Assign → Claim → Delete (jika belum dipakai)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">CLAIMED</span>
              <div className="text-sm">
                <p className="font-medium text-gray-900">Kode sudah punya pemilik</p>
                <p className="text-gray-600">Tindakan: Transfer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Codes Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kode
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Komisi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {codes.map((code) => (
                  <tr key={code.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{code.code}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {code.assignedEmail || <span className="text-gray-400">-</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        code.status === 'claimed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {code.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {code.usageCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Rp {Number(code.totalCommission).toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      {code.status === 'unclaimed' && (
                        <>
                          {!code.assignedEmail ? (
                            <button
                              onClick={() => {
                                setSelectedCode(code);
                                setShowAssignModal(true);
                              }}
                              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                              Assign
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setSelectedCode(code);
                                setAssignEmail(code.assignedEmail || '');
                                setShowClaimModal(true);
                              }}
                              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                              Claim
                            </button>
                          )}
                          {code.usageCount === 0 && (
                            <button
                              onClick={() => handleDelete(code)}
                              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                              Delete
                            </button>
                          )}
                        </>
                      )}
                      {code.status === 'claimed' && (
                        <button
                          onClick={() => {
                            setSelectedCode(code);
                            setShowTransferModal(true);
                          }}
                          className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                        >
                          Transfer
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Buat Kode Baru</h3>
              <input
                type="text"
                value={newCodeValue}
                onChange={(e) => setNewCodeValue(e.target.value)}
                placeholder="Masukkan kode (contoh: DRW001)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
              />
              <div className="flex gap-3">
                <button
                  onClick={handleCreateCode}
                  className="flex-1 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                >
                  Buat
                </button>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewCodeValue('');
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Assign Modal */}
        {showAssignModal && selectedCode && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-2">🔵 Assign Email ke Kode</h3>
              <p className="text-sm text-gray-600 mb-4">Kode: <span className="font-semibold">{selectedCode.code}</span></p>
              <input
                type="email"
                value={assignEmail}
                onChange={(e) => setAssignEmail(e.target.value)}
                placeholder="mitra@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
              />
              <div className="flex gap-3">
                <button
                  onClick={handleAssign}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Assign
                </button>
                <button
                  onClick={() => {
                    setShowAssignModal(false);
                    setAssignEmail('');
                    setSelectedCode(null);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Claim Modal */}
        {showClaimModal && selectedCode && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-2">🟢 Claim Kode untuk User</h3>
              <p className="text-sm text-gray-600 mb-2">Kode: <span className="font-semibold">{selectedCode.code}</span></p>
              <p className="text-sm text-gray-600 mb-4">Email: <span className="font-semibold">{assignEmail}</span></p>
              <p className="text-sm text-gray-500 mb-4">Kode akan langsung menjadi milik user dengan email ini.</p>
              <div className="flex gap-3">
                <button
                  onClick={handleClaim}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Claim
                </button>
                <button
                  onClick={() => {
                    setShowClaimModal(false);
                    setAssignEmail('');
                    setSelectedCode(null);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Transfer Modal */}
        {showTransferModal && selectedCode && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-2">🟡 Transfer Kepemilikan</h3>
              <p className="text-sm text-gray-600 mb-2">Kode: <span className="font-semibold">{selectedCode.code}</span></p>
              <p className="text-sm text-gray-600 mb-4">Pemilik saat ini: <span className="font-semibold">{selectedCode.assignedEmail}</span></p>
              <input
                type="email"
                value={transferEmail}
                onChange={(e) => setTransferEmail(e.target.value)}
                placeholder="pemilikbaru@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
              />
              <p className="text-sm text-gray-500 mb-4">⚠️ Semua komisi dan riwayat akan pindah ke pemilik baru.</p>
              <div className="flex gap-3">
                <button
                  onClick={handleTransfer}
                  className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                >
                  Transfer
                </button>
                <button
                  onClick={() => {
                    setShowTransferModal(false);
                    setTransferEmail('');
                    setSelectedCode(null);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
