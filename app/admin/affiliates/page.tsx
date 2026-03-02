'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Affiliator {
  id: string;
  name: string;
  email: string;
  affiliateCode: string;
  status: string;
  totalCommission: number;
  totalReservations: number;
  completedReservations: number;
  pendingReservations: number;
  totalRevenue: number;
  registrationDate: string;
  usageCount: number;
}

interface WithdrawalItem {
  id: string;
  amount: number;
  status: string;
  requestDate: string;
  processedDate: string | null;
  adminNotes: string | null;
  user: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
    affiliateCode: string;
  };
  bankAccount: {
    accountType: string;
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
}

export default function AdminAffiliatesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'affiliates' | 'withdrawals'>('affiliates');
  const [affiliators, setAffiliators] = useState<Affiliator[]>([]);
  const [withdrawals, setWithdrawals] = useState<WithdrawalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [withdrawalFilter, setWithdrawalFilter] = useState('all');
  const [processing, setProcessing] = useState<string | null>(null);
  const [adminNotes, setAdminNotes] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/check');
        if (!res.ok) { router.push('/login'); return; }
        fetchData();
      } catch { router.push('/login'); }
    };
    checkAuth();
  }, [router]);

  const fetchData = async () => {
    try {
      const [affRes, wdRes] = await Promise.all([
        fetch('/api/front-office/affiliators'),
        fetch('/api/front-office/withdrawals'),
      ]);
      if (affRes.ok) {
        const d = await affRes.json();
        setAffiliators(d.affiliators || []);
      }
      if (wdRes.ok) {
        const d = await wdRes.json();
        setWithdrawals(d.withdrawals || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawalAction = async (withdrawalId: string, status: 'approved' | 'rejected') => {
    setProcessing(withdrawalId);
    setMessage('');
    try {
      const res = await fetch('/api/front-office/withdrawals', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          withdrawalId,
          status,
          adminNotes: adminNotes[withdrawalId] || '',
        }),
      });
      const json = await res.json();
      if (res.ok) {
        setMessage(`✅ Withdrawal berhasil di-${status}`);
        fetchData();
      } else {
        setMessage('❌ ' + json.error);
      }
    } catch {
      setMessage('❌ Terjadi kesalahan');
    } finally {
      setProcessing(null);
    }
  };

  const fmt = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;
  const fmtDate = (d: string) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800',
      claimed: 'bg-green-100 text-green-800',
    };
    return map[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredWithdrawals = withdrawalFilter === 'all'
    ? withdrawals
    : withdrawals.filter(w => w.status === withdrawalFilter);

  const pendingWithdrawals = withdrawals.filter(w => w.status === 'pending');

  if (loading) return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
        <p className="mt-4 text-zinc-400">Memuat data...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/codes" className="text-zinc-400 hover:text-white text-sm">← Admin</Link>
            <h1 className="text-white font-bold">Manajemen Affiliate</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/front-office" className="text-xs text-zinc-400 hover:text-white border border-zinc-700 px-3 py-1 rounded-lg">Front Office</Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {message && (
          <div className={`mb-4 p-4 rounded-lg text-sm ${message.startsWith('✅') ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
            {message}
          </div>
        )}

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <p className="text-zinc-400 text-xs mb-1">Total Affiliate</p>
            <p className="text-3xl font-bold text-white">{affiliators.length}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <p className="text-zinc-400 text-xs mb-1">Total Komisi</p>
            <p className="text-2xl font-bold text-green-400">{fmt(affiliators.reduce((s, a) => s + a.totalCommission, 0))}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <p className="text-zinc-400 text-xs mb-1">Withdrawal Pending</p>
            <p className="text-3xl font-bold text-yellow-400">{pendingWithdrawals.length}</p>
            <p className="text-zinc-500 text-xs mt-1">{fmt(pendingWithdrawals.reduce((s, w) => s + w.amount, 0))}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <p className="text-zinc-400 text-xs mb-1">Total Referral</p>
            <p className="text-3xl font-bold text-blue-400">{affiliators.reduce((s, a) => s + a.totalReservations, 0)}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-zinc-900 border border-zinc-800 rounded-xl p-1 mb-6 w-fit">
          <button onClick={() => setActiveTab('affiliates')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'affiliates' ? 'bg-yellow-500 text-black' : 'text-zinc-400 hover:text-white'}`}>
            Daftar Affiliate
          </button>
          <button onClick={() => setActiveTab('withdrawals')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors relative ${activeTab === 'withdrawals' ? 'bg-yellow-500 text-black' : 'text-zinc-400 hover:text-white'}`}>
            Withdrawal
            {pendingWithdrawals.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {pendingWithdrawals.length}
              </span>
            )}
          </button>
        </div>

        {/* Affiliates Tab */}
        {activeTab === 'affiliates' && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-zinc-800">
              <h2 className="text-white font-semibold">Daftar Affiliate ({affiliators.length})</h2>
            </div>
            {affiliators.length === 0 ? (
              <p className="text-zinc-500 text-sm text-center py-12">Belum ada affiliate terdaftar.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-zinc-500 border-b border-zinc-800 bg-zinc-900/50">
                      <th className="text-left px-6 py-3">Nama / Email</th>
                      <th className="text-left px-4 py-3">Kode</th>
                      <th className="text-left px-4 py-3">Status</th>
                      <th className="text-right px-4 py-3">Referral</th>
                      <th className="text-right px-4 py-3">Komisi</th>
                      <th className="text-right px-4 py-3">Revenue</th>
                      <th className="text-left px-4 py-3">Bergabung</th>
                    </tr>
                  </thead>
                  <tbody>
                    {affiliators.map(a => (
                      <tr key={a.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                        <td className="px-6 py-4">
                          <p className="text-white font-medium">{a.name}</p>
                          <p className="text-zinc-500 text-xs">{a.email}</p>
                        </td>
                        <td className="px-4 py-4">
                          <span className="font-mono text-yellow-400 bg-yellow-900/30 px-2 py-1 rounded text-xs">{a.affiliateCode}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(a.status)}`}>{a.status}</span>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <p className="text-white">{a.totalReservations}</p>
                          <p className="text-zinc-500 text-xs">{a.completedReservations} selesai</p>
                        </td>
                        <td className="px-4 py-4 text-right text-green-400 font-medium">{fmt(a.totalCommission)}</td>
                        <td className="px-4 py-4 text-right text-zinc-300">{fmt(a.totalRevenue)}</td>
                        <td className="px-4 py-4 text-zinc-400 text-xs">{fmtDate(a.registrationDate)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Withdrawals Tab */}
        {activeTab === 'withdrawals' && (
          <div className="space-y-4">
            {/* Filter */}
            <div className="flex gap-2">
              {['all', 'pending', 'approved', 'rejected'].map(f => (
                <button key={f} onClick={() => setWithdrawalFilter(f)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${withdrawalFilter === f ? 'bg-yellow-500 text-black' : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'}`}>
                  {f === 'all' ? 'Semua' : f.charAt(0).toUpperCase() + f.slice(1)}
                  {f === 'pending' && pendingWithdrawals.length > 0 && ` (${pendingWithdrawals.length})`}
                </button>
              ))}
            </div>

            {filteredWithdrawals.length === 0 ? (
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
                <p className="text-zinc-500">Tidak ada withdrawal dengan status ini.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredWithdrawals.map(w => (
                  <div key={w.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-white font-bold text-xl">{fmt(w.amount)}</p>
                        <p className="text-zinc-400 text-sm mt-1">
                          {w.user.firstName} {w.user.lastName} ({w.user.email})
                        </p>
                        <p className="text-zinc-500 text-xs">Kode: <span className="text-yellow-400 font-mono">{w.user.affiliateCode}</span></p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(w.status)}`}>{w.status}</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 p-4 bg-zinc-800/50 rounded-lg">
                      <div>
                        <p className="text-zinc-500 text-xs">Tipe</p>
                        <p className="text-zinc-300 text-sm capitalize">{w.bankAccount.accountType}</p>
                      </div>
                      <div>
                        <p className="text-zinc-500 text-xs">Bank / E-Wallet</p>
                        <p className="text-zinc-300 text-sm">{w.bankAccount.bankName}</p>
                      </div>
                      <div>
                        <p className="text-zinc-500 text-xs">Nomor Rekening</p>
                        <p className="text-zinc-300 text-sm font-mono">{w.bankAccount.accountNumber}</p>
                      </div>
                      <div>
                        <p className="text-zinc-500 text-xs">Nama Pemilik</p>
                        <p className="text-zinc-300 text-sm">{w.bankAccount.accountName}</p>
                      </div>
                      <div>
                        <p className="text-zinc-500 text-xs">Tanggal Request</p>
                        <p className="text-zinc-300 text-sm">{fmtDate(w.requestDate)}</p>
                      </div>
                      {w.processedDate && (
                        <div>
                          <p className="text-zinc-500 text-xs">Tanggal Proses</p>
                          <p className="text-zinc-300 text-sm">{fmtDate(w.processedDate)}</p>
                        </div>
                      )}
                    </div>

                    {w.status === 'pending' && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-zinc-400 text-xs mb-1">Catatan Admin (opsional)</label>
                          <input
                            type="text"
                            value={adminNotes[w.id] || ''}
                            onChange={e => setAdminNotes(p => ({ ...p, [w.id]: e.target.value }))}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Catatan untuk affiliate..."
                          />
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleWithdrawalAction(w.id, 'approved')}
                            disabled={processing === w.id}
                            className="flex-1 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white font-semibold py-2 rounded-lg text-sm transition-colors"
                          >
                            {processing === w.id ? 'Memproses...' : '✓ Setujui'}
                          </button>
                          <button
                            onClick={() => handleWithdrawalAction(w.id, 'rejected')}
                            disabled={processing === w.id}
                            className="flex-1 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-semibold py-2 rounded-lg text-sm transition-colors"
                          >
                            {processing === w.id ? 'Memproses...' : '✗ Tolak'}
                          </button>
                        </div>
                      </div>
                    )}

                    {w.adminNotes && (
                      <p className="text-zinc-400 text-xs mt-3 italic">Catatan: {w.adminNotes}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
