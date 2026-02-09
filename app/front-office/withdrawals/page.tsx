'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface BankAccount {
  accountType: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

interface User {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  affiliateCode: string;
  totalEarnings: number;
}

interface Withdrawal {
  id: string;
  amount: number;
  status: string;
  requestDate: string;
  processedDate: string | null;
  adminNotes: string | null;
  user: User;
  bankAccount: BankAccount;
}

export default function FrontOfficeWithdrawalsPage() {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    fetchWithdrawals();
  }, [statusFilter]);

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const url = statusFilter === 'all' 
        ? '/api/front-office/withdrawals'
        : `/api/front-office/withdrawals?status=${statusFilter}`;
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setWithdrawals(data.withdrawals || []);
      } else {
        console.error('Failed to fetch withdrawals');
      }
    } catch (error) {
      console.error('Error fetching withdrawals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (withdrawalId: string, newStatus: string) => {
    const adminNotes = prompt('Catatan admin (opsional):');
    
    if (newStatus === 'rejected' && !confirm('Yakin ingin menolak penarikan ini? Saldo akan dikembalikan ke user.')) {
      return;
    }

    if (newStatus === 'approved' && !confirm('Yakin ingin menyetujui penarikan ini?')) {
      return;
    }

    try {
      setProcessing(withdrawalId);
      const response = await fetch('/api/front-office/withdrawals', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          withdrawalId,
          status: newStatus,
          adminNotes
        })
      });

      if (response.ok) {
        alert('Status berhasil diupdate!');
        fetchWithdrawals();
      } else {
        const data = await response.json();
        alert(data.error || 'Gagal mengupdate status');
      }
    } catch (error) {
      console.error('Error updating withdrawal:', error);
      alert('Terjadi kesalahan saat mengupdate status');
    } finally {
      setProcessing(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-700 border border-yellow-300';
      case 'approved': return 'bg-green-100 text-green-700 border border-green-300';
      case 'rejected': return 'bg-red-100 text-red-700 border border-red-300';
      case 'completed': return 'bg-blue-100 text-blue-700 border border-blue-300';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const stats = {
    total: withdrawals.length,
    pending: withdrawals.filter(w => w.status === 'pending').length,
    approved: withdrawals.filter(w => w.status === 'approved').length,
    rejected: withdrawals.filter(w => w.status === 'rejected').length,
    completed: withdrawals.filter(w => w.status === 'completed').length,
    totalAmount: withdrawals.reduce((sum, w) => sum + Number(w.amount), 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-pink-200 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-pink-600 mb-1">Kelola Penarikan</h1>
              <p className="text-gray-600">Front Office - Withdrawal Management</p>
            </div>
            <Link
              href="/front-office"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-2 rounded transition-colors"
            >
              ← Kembali
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Total</div>
            <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
          </div>
          <div className="bg-white border-2 border-yellow-200 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Pending</div>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          </div>
          <div className="bg-white border-2 border-green-200 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Approved</div>
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
          </div>
          <div className="bg-white border-2 border-red-200 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Rejected</div>
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
          </div>
          <div className="bg-white border-2 border-blue-200 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Completed</div>
            <div className="text-2xl font-bold text-blue-600">{stats.completed}</div>
          </div>
          <div className="bg-white border-2 border-pink-200 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Total Amount</div>
            <div className="text-lg font-bold text-pink-600">
              Rp {stats.totalAmount.toLocaleString('id-ID')}
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white border-2 border-pink-200 rounded-xl p-6 mb-6">
          <label className="block text-gray-700 font-medium mb-3">Filter Status:</label>
          <div className="flex flex-wrap gap-2">
            {['all', 'pending', 'approved', 'rejected', 'completed'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  statusFilter === status
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Withdrawals Table */}
        <div className="bg-white border-2 border-pink-200 rounded-xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
              <p className="mt-4 text-gray-600">Loading withdrawals...</p>
            </div>
          ) : withdrawals.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">Tidak ada data penarikan</h3>
              <p className="text-gray-500">Belum ada request penarikan untuk filter ini</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-pink-50">
                  <tr>
                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Tanggal</th>
                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Affiliator</th>
                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Jumlah</th>
                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Rekening</th>
                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Status</th>
                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Catatan</th>
                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawals.map((withdrawal) => (
                    <tr key={withdrawal.id} className="border-b border-pink-100 hover:bg-pink-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="text-sm">
                          <div className="font-medium text-gray-800">
                            {new Date(withdrawal.requestDate).toLocaleDateString('id-ID')}
                          </div>
                          <div className="text-gray-500">
                            {new Date(withdrawal.requestDate).toLocaleTimeString('id-ID')}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm">
                          <div className="font-medium text-gray-800">
                            {withdrawal.user.firstName} {withdrawal.user.lastName}
                          </div>
                          <div className="text-gray-500">{withdrawal.user.email}</div>
                          <div className="text-pink-600 font-bold">{withdrawal.user.affiliateCode}</div>
                          <div className="text-xs text-gray-500">
                            Saldo: Rp {Number(withdrawal.user.totalEarnings).toLocaleString('id-ID')}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-lg font-bold text-gray-800">
                          Rp {Number(withdrawal.amount).toLocaleString('id-ID')}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm">
                          <div className="font-medium text-gray-800">
                            {withdrawal.bankAccount.bankName}
                          </div>
                          <div className="text-gray-600">{withdrawal.bankAccount.accountNumber}</div>
                          <div className="text-gray-500">{withdrawal.bankAccount.accountName}</div>
                          <div className="text-xs text-gray-400 uppercase">
                            {withdrawal.bankAccount.accountType}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`text-xs px-3 py-1 rounded-full uppercase font-semibold ${getStatusColor(withdrawal.status)}`}>
                          {withdrawal.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm text-gray-600 max-w-xs">
                          {withdrawal.adminNotes || '-'}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {withdrawal.status === 'pending' && (
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => handleUpdateStatus(withdrawal.id, 'approved')}
                              disabled={processing === withdrawal.id}
                              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white text-xs font-bold px-4 py-2 rounded transition-colors"
                            >
                              ✓ Approve
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(withdrawal.id, 'rejected')}
                              disabled={processing === withdrawal.id}
                              className="bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white text-xs font-bold px-4 py-2 rounded transition-colors"
                            >
                              ✗ Reject
                            </button>
                          </div>
                        )}
                        {withdrawal.status === 'approved' && (
                          <button
                            onClick={() => handleUpdateStatus(withdrawal.id, 'completed')}
                            disabled={processing === withdrawal.id}
                            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white text-xs font-bold px-4 py-2 rounded transition-colors"
                          >
                            ✓ Mark Completed
                          </button>
                        )}
                        {(withdrawal.status === 'rejected' || withdrawal.status === 'completed') && (
                          <span className="text-xs text-gray-500">No action</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
