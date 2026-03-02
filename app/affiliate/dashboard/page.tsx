'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface DashboardData {
  user: { id: string; name: string; email: string; isAdmin: boolean };
  affiliateCode: string;
  referralLink: string;
  stats: {
    totalReferrals: number;
    completedReferrals: number;
    pendingReferrals: number;
    totalCommission: number;
    availableBalance: number;
    commissionPending: number;
    commissionPaid: number;
    totalEarnings: number;
  };
  reservations: Array<{
    id: string;
    patientName: string;
    treatment: string;
    reservationDate: string;
    status: string;
    finalPrice: number;
    commissionAmount: number;
    commissionRate: number;
    commissionPaid: boolean;
  }>;
  withdrawals: Array<{
    id: string;
    amount: number;
    status: string;
    bankName: string;
    accountNumber: string;
    accountName: string;
    accountType: string;
    requestDate: string;
    processedDate: string | null;
    adminNotes: string | null;
  }>;
  bankAccounts: Array<{
    id: string;
    accountType: string;
    bankName: string;
    accountNumber: string;
    accountName: string;
    isDefault: boolean;
  }>;
}

export default function AffiliateDashboard() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'referrals' | 'withdrawals'>('overview');
  const [copied, setCopied] = useState(false);
  const [showWithdrawalForm, setShowWithdrawalForm] = useState(false);
  const [withdrawalForm, setWithdrawalForm] = useState({
    amount: '',
    accountType: 'bank',
    bankName: '',
    accountNumber: '',
    accountName: '',
  });
  const [withdrawalLoading, setWithdrawalLoading] = useState(false);
  const [withdrawalMessage, setWithdrawalMessage] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/check');
        if (!res.ok) { router.push('/login'); return; }
        fetchDashboard();
      } catch { router.push('/login'); }
    };
    checkAuth();
  }, [router]);

  const fetchDashboard = async () => {
    try {
      const res = await fetch('/api/affiliate/dashboard');
      if (res.ok) { const json = await res.json(); setData(json); }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const copyReferralLink = () => {
    if (data?.referralLink) {
      navigator.clipboard.writeText(data.referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();
    setWithdrawalLoading(true);
    setWithdrawalMessage('');
    try {
      const res = await fetch('/api/affiliate/withdrawal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseFloat(withdrawalForm.amount), ...withdrawalForm }),
      });
      const json = await res.json();
      if (res.ok) {
        setWithdrawalMessage('✅ ' + json.message);
        setShowWithdrawalForm(false);
        setWithdrawalForm({ amount: '', accountType: 'bank', bankName: '', accountNumber: '', accountName: '' });
        fetchDashboard();
      } else { setWithdrawalMessage('❌ ' + json.error); }
    } catch { setWithdrawalMessage('❌ Terjadi kesalahan.'); }
    finally { setWithdrawalLoading(false); }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const getStatusBadge = (status: string) => {
    const map: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800', confirmed: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800', cancelled: 'bg-red-100 text-red-800',
      approved: 'bg-green-100 text-green-800', rejected: 'bg-red-100 text-red-800',
    };
    return map[status] || 'bg-gray-100 text-gray-800';
  };

  const fmt = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;
  const fmtDate = (d: string) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

  if (loading) return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="text-center"><div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div><p className="mt-4 text-zinc-400">Memuat dashboard...</p></div>
    </div>
  );

  if (!data) return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="text-center text-white"><p>Gagal memuat. <button onClick={() => router.push('/login')} className="text-yellow-500 underline">Login ulang</button></p></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="DRW" width={100} height={32} className="h-8 w-auto" />
            <span className="text-zinc-400 text-sm hidden sm:block">Dashboard Affiliate</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-zinc-300 text-sm hidden sm:block">{data.user.name}</span>
            {data.user.isAdmin && <a href="/front-office" className="text-xs bg-yellow-500 text-black px-3 py-1 rounded-full font-medium">Admin Panel</a>}
            <button onClick={handleLogout} className="text-xs text-zinc-400 hover:text-white border border-zinc-700 px-3 py-1 rounded-lg">Keluar</button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Selamat datang, {data.user.name.split(' ')[0]}!</h1>
          <p className="text-zinc-400 mt-1">Pantau performa affiliate dan komisi Anda.</p>
        </div>

        {/* Referral Link */}
        <div className="bg-gradient-to-r from-pink-900/40 to-yellow-900/40 border border-pink-800/50 rounded-xl p-6 mb-8">
          <h2 className="text-white font-semibold mb-1">Link Referral Anda</h2>
          <p className="text-zinc-400 text-sm mb-4">Bagikan link ini untuk mendapatkan komisi dari setiap reservasi</p>
          <div className="flex gap-2">
            <div className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-300 text-sm font-mono overflow-hidden text-ellipsis whitespace-nowrap">{data.referralLink}</div>
            <button onClick={copyReferralLink} className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-4 py-3 rounded-lg text-sm">{copied ? '✓ Tersalin!' : 'Salin Link'}</button>
          </div>
          <p className="text-zinc-500 text-xs mt-2">Kode: <span className="text-yellow-400 font-mono font-bold">{data.affiliateCode}</span></p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Referral', value: data.stats.totalReferrals.toString(), sub: `${data.stats.completedReferrals} selesai`, color: 'text-white' },
            { label: 'Total Komisi', value: fmt(data.stats.totalCommission), sub: 'dari reservasi selesai', color: 'text-green-400' },
            { label: 'Saldo Tersedia', value: fmt(data.stats.availableBalance), sub: 'siap ditarik', color: 'text-yellow-400' },
            { label: 'Komisi Dibayar', value: fmt(data.stats.commissionPaid), sub: 'sudah dicairkan', color: 'text-blue-400' },
          ].map(s => (
            <div key={s.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <p className="text-zinc-400 text-xs mb-1">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-zinc-500 text-xs mt-1">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-zinc-900 border border-zinc-800 rounded-xl p-1 mb-6 w-fit">
          {(['overview', 'referrals', 'withdrawals'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab ? 'bg-yellow-500 text-black' : 'text-zinc-400 hover:text-white'}`}>
              {tab === 'overview' ? 'Ringkasan' : tab === 'referrals' ? 'Riwayat Referral' : 'Penarikan Dana'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Cara Kerja</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[{s:'1',t:'Bagikan Link',d:'Bagikan link referral ke calon pasien'},{s:'2',t:'Pasien Reservasi',d:'Pasien reservasi menggunakan link Anda'},{s:'3',t:'Dapatkan Komisi',d:'Komisi 10% masuk setelah reservasi selesai'}].map(i => (
                  <div key={i.s} className="flex gap-3">
                    <div className="w-8 h-8 bg-yellow-500 text-black rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">{i.s}</div>
                    <div><p className="text-white font-medium text-sm">{i.t}</p><p className="text-zinc-400 text-xs mt-0.5">{i.d}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Referral Terbaru</h3>
              {data.reservations.length === 0 ? <p className="text-zinc-500 text-sm text-center py-8">Belum ada referral.</p> : (
                <div className="overflow-x-auto"><table className="w-full text-sm">
                  <thead><tr className="text-zinc-500 border-b border-zinc-800">
                    <th className="text-left py-2 pr-4">Pasien</th><th className="text-left py-2 pr-4">Treatment</th>
                    <th className="text-left py-2 pr-4">Tanggal</th><th className="text-left py-2 pr-4">Status</th><th className="text-right py-2">Komisi</th>
                  </tr></thead>
                  <tbody>{data.reservations.slice(0,5).map(r => (
                    <tr key={r.id} className="border-b border-zinc-800/50">
                      <td className="py-3 pr-4 text-zinc-300">{r.patientName}</td>
                      <td className="py-3 pr-4 text-zinc-400 text-xs">{r.treatment}</td>
                      <td className="py-3 pr-4 text-zinc-400 text-xs">{fmtDate(r.reservationDate)}</td>
                      <td className="py-3 pr-4"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(r.status)}`}>{r.status}</span></td>
                      <td className="py-3 text-right text-green-400 font-medium">{r.status === 'completed' ? fmt(r.commissionAmount) : '-'}</td>
                    </tr>
                  ))}</tbody>
                </table></div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'referrals' && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Semua Referral ({data.reservations.length})</h3>
            {data.reservations.length === 0 ? <p className="text-zinc-500 text-sm text-center py-8">Belum ada referral.</p> : (
              <div className="overflow-x-auto"><table className="w-full text-sm">
                <thead><tr className="text-zinc-500 border-b border-zinc-800">
                  <th className="text-left py-2 pr-4">Pasien</th><th className="text-left py-2 pr-4">Treatment</th>
                  <th className="text-left py-2 pr-4">Tanggal</th><th className="text-left py-2 pr-4">Status</th>
                  <th className="text-right py-2 pr-4">Harga</th><th className="text-right py-2">Komisi</th>
                </tr></thead>
                <tbody>{data.reservations.map(r => (
                  <tr key={r.id} className="border-b border-zinc-800/50">
                    <td className="py-3 pr-4 text-zinc-300">{r.patientName}</td>
                    <td className="py-3 pr-4 text-zinc-400 text-xs">{r.treatment}</td>
                    <td className="py-3 pr-4 text-zinc-400 text-xs">{fmtDate(r.reservationDate)}</td>
                    <td className="py-3 pr-4"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(r.status)}`}>{r.status}</span></td>
                    <td className="py-3 pr-4 text-right text-zinc-300">{fmt(r.finalPrice)}</td>
                    <td className="py-3 text-right font-medium">{r.status === 'completed' ? <span className="text-green-400">{fmt(r.commissionAmount)}</span> : <span className="text-zinc-600">-</span>}</td>
                  </tr>
                ))}</tbody>
                <tfoot><tr className="border-t border-zinc-700">
                  <td colSpan={5} className="py-3 text-zinc-400 font-medium">Total Komisi</td>
                  <td className="py-3 text-right text-green-400 font-bold">{fmt(data.stats.totalCommission)}</td>
                </tr></tfoot>
              </table></div>
            )}
          </div>
        )}

        {activeTab === 'withdrawals' && (
          <div className="space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-zinc-400 text-sm">Saldo Tersedia</p>
                  <p className="text-3xl font-bold text-yellow-400 mt-1">{fmt(data.stats.availableBalance)}</p>
                </div>
                <button onClick={() => setShowWithdrawalForm(!showWithdrawalForm)}
                  disabled={data.stats.availableBalance < 50000}
                  className="bg-yellow-500 hover:bg-yellow-400 disabled:bg-zinc-700 disabled:text-zinc-500 text-black font-semibold px-6 py-3 rounded-lg">
                  Tarik Dana
                </button>
              </div>
              {data.stats.availableBalance < 50000 && <p className="text-zinc-500 text-xs">Minimum penarikan Rp 50.000</p>}
              {withdrawalMessage && <div className={`mt-3 p-3 rounded-lg text-sm ${withdrawalMessage.startsWith('✅') ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>{withdrawalMessage}</div>}
            </div>

            {showWithdrawalForm && (
              <div className="bg-zinc-900 border border-yellow-800/50 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">Form Penarikan Dana</h3>
                <form onSubmit={handleWithdrawal} className="space-y-4">
                  <div><label className="block text-zinc-400 text-sm mb-1">Jumlah (Rp)</label>
                    <input type="number" value={withdrawalForm.amount} onChange={e => setWithdrawalForm(p => ({...p, amount: e.target.value}))} max={data.stats.availableBalance} min={50000} required className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder="Min. 50000" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-zinc-400 text-sm mb-1">Tipe</label>
                      <select value={withdrawalForm.accountType} onChange={e => setWithdrawalForm(p => ({...p, accountType: e.target.value, bankName: ''}))} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500">
                        <option value="bank">Bank</option><option value="ewallet">E-Wallet</option>
                      </select></div>
                    <div><label className="block text-zinc-400 text-sm mb-1">Bank / E-Wallet</label>
                      <select value={withdrawalForm.bankName} onChange={e => setWithdrawalForm(p => ({...p, bankName: e.target.value}))} required className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500">
                        <option value="">Pilih...</option>
                        {withdrawalForm.accountType === 'bank' ? <><option>BCA</option><option>BRI</option><option>BNI</option><option>Mandiri</option><option>BSI</option><option>CIMBNIAGA</option><option>BPD DIY</option></> : <><option>DANA</option><option>GOPAY</option><option>OVO</option><option>SHOPEEPAY</option></>}
                      </select></div>
                  </div>
                  <div><label className="block text-zinc-400 text-sm mb-1">Nomor Rekening / Akun</label>
                    <input type="text" value={withdrawalForm.accountNumber} onChange={e => setWithdrawalForm(p => ({...p, accountNumber: e.target.value}))} required className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500" /></div>
                  <div><label className="block text-zinc-400 text-sm mb-1">Nama Pemilik</label>
                    <input type="text" value={withdrawalForm.accountName} onChange={e => setWithdrawalForm(p => ({...p, accountName: e.target.value}))} required className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500" /></div>
                  <div className="flex gap-3">
                    <button type="submit" disabled={withdrawalLoading} className="flex-1 bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-black font-semibold py-3 rounded-lg">{withdrawalLoading ? 'Memproses...' : 'Ajukan Penarikan'}</button>
                    <button type="button" onClick={() => setShowWithdrawalForm(false)} className="px-6 py-3 border border-zinc-700 text-zinc-400 hover:text-white rounded-lg">Batal</button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Riwayat Penarikan</h3>
              {data.withdrawals.length === 0 ? <p className="text-zinc-500 text-sm text-center py-8">Belum ada riwayat penarikan.</p> : (
                <div className="space-y-3">{data.withdrawals.map(w => (
                  <div key={w.id} className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
                    <div>
                      <p className="text-white font-medium">{fmt(w.amount)}</p>
                      <p className="text-zinc-400 text-xs mt-0.5">{w.bankName} • {w.accountNumber} • {w.accountName}</p>
                      <p className="text-zinc-500 text-xs">{fmtDate(w.requestDate)}</p>
                      {w.adminNotes && <p className="text-zinc-400 text-xs mt-1 italic">Catatan: {w.adminNotes}</p>}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(w.status)}`}>{w.status}</span>
                  </div>
                ))}</div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
