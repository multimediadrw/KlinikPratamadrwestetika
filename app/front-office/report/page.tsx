'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ExcelJS from 'exceljs';

interface BankAccount {
  accountType: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

interface Affiliator {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  affiliateCode: string;
  totalCommission: number;
  totalReservations: number;
  registrationDate: string;
  bankAccount: BankAccount | null;
}

export default function FrontOfficeReportPage() {
  const [affiliators, setAffiliators] = useState<Affiliator[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchAffiliators();
  }, []);

  const fetchAffiliators = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/front-office/affiliators');
      if (response.ok) {
        const data = await response.json();
        setAffiliators(data.affiliators || []);
      } else {
        console.error('Failed to fetch affiliators');
      }
    } catch (error) {
      console.error('Error fetching affiliators:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = async () => {
    try {
      setExporting(true);

      // Create workbook and worksheet
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Affiliator Report');

      // Define columns
      worksheet.columns = [
        { header: 'No', key: 'no', width: 5 },
        { header: 'Nama', key: 'name', width: 25 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Kode Affiliate', key: 'code', width: 15 },
        { header: 'Total Komisi (Rp)', key: 'commission', width: 18 },
        { header: 'Total Reservasi', key: 'reservations', width: 15 },
        { header: 'Tanggal Daftar', key: 'date', width: 15 },
        { header: 'Tipe Rekening', key: 'accountType', width: 15 },
        { header: 'Bank/E-Wallet', key: 'bankName', width: 15 },
        { header: 'Nomor Rekening', key: 'accountNumber', width: 20 },
        { header: 'Nama Pemilik', key: 'accountName', width: 25 },
      ];

      // Style header row
      worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
      worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFEC4899' } // Pink color
      };
      worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };

      // Add data rows
      affiliators.forEach((aff, index) => {
        worksheet.addRow({
          no: index + 1,
          name: `${aff.firstName || ''} ${aff.lastName || ''}`.trim() || 'N/A',
          email: aff.email,
          code: aff.affiliateCode,
          commission: Number(aff.totalCommission),
          reservations: aff.totalReservations,
          date: new Date(aff.registrationDate).toLocaleDateString('id-ID'),
          accountType: aff.bankAccount?.accountType || '-',
          bankName: aff.bankAccount?.bankName || '-',
          accountNumber: aff.bankAccount?.accountNumber || '-',
          accountName: aff.bankAccount?.accountName || '-',
        });
      });

      // Format commission column as currency
      worksheet.getColumn('commission').numFmt = '#,##0';

      // Add borders to all cells
      worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell) => {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
        });
      });

      // Add summary row
      const summaryRow = worksheet.addRow({
        no: '',
        name: '',
        email: '',
        code: 'TOTAL',
        commission: affiliators.reduce((sum, aff) => sum + Number(aff.totalCommission), 0),
        reservations: affiliators.reduce((sum, aff) => sum + aff.totalReservations, 0),
        date: '',
        accountType: '',
        bankName: '',
        accountNumber: '',
        accountName: '',
      });

      summaryRow.font = { bold: true };
      summaryRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFCE7F3' } // Light pink
      };

      // Generate Excel file
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Affiliator_Report_${new Date().toISOString().split('T')[0]}.xlsx`;
      link.click();
      window.URL.revokeObjectURL(url);

      alert('Excel file berhasil di-download!');
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      alert('Gagal export ke Excel');
    } finally {
      setExporting(false);
    }
  };

  const stats = {
    totalAffiliators: affiliators.length,
    totalCommission: affiliators.reduce((sum, aff) => sum + Number(aff.totalCommission), 0),
    totalReservations: affiliators.reduce((sum, aff) => sum + aff.totalReservations, 0),
    withBankAccount: affiliators.filter(aff => aff.bankAccount !== null).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-pink-200 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-pink-600 mb-1">Report Affiliator</h1>
              <p className="text-gray-600">Front Office - Affiliator Management</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={exportToExcel}
                disabled={exporting || affiliators.length === 0}
                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-bold px-6 py-2 rounded transition-colors"
              >
                {exporting ? '⏳ Exporting...' : '📥 Export Excel'}
              </button>
              <Link
                href="/front-office"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-2 rounded transition-colors"
              >
                ← Kembali
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border-2 border-pink-200 rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">👥</span>
              <div className="text-gray-600 text-sm font-medium">Total Affiliator</div>
            </div>
            <div className="text-4xl font-bold text-pink-600">{stats.totalAffiliators}</div>
          </div>

          <div className="bg-white border-2 border-green-200 rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">💰</span>
              <div className="text-gray-600 text-sm font-medium">Total Komisi</div>
            </div>
            <div className="text-2xl font-bold text-green-600">
              Rp {stats.totalCommission.toLocaleString('id-ID')}
            </div>
          </div>

          <div className="bg-white border-2 border-blue-200 rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">📋</span>
              <div className="text-gray-600 text-sm font-medium">Total Reservasi</div>
            </div>
            <div className="text-4xl font-bold text-blue-600">{stats.totalReservations}</div>
          </div>

          <div className="bg-white border-2 border-purple-200 rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">🏦</span>
              <div className="text-gray-600 text-sm font-medium">Punya Rekening</div>
            </div>
            <div className="text-4xl font-bold text-purple-600">{stats.withBankAccount}</div>
          </div>
        </div>

        {/* Affiliators Table */}
        <div className="bg-white border-2 border-pink-200 rounded-xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
              <p className="mt-4 text-gray-600">Loading affiliators...</p>
            </div>
          ) : affiliators.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">Belum ada affiliator</h3>
              <p className="text-gray-500">Belum ada data affiliator yang terdaftar</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-pink-50">
                  <tr>
                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">No</th>
                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Nama</th>
                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Email</th>
                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Kode</th>
                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Total Komisi</th>
                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Reservasi</th>
                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Tanggal Daftar</th>
                    <th className="text-left py-4 px-4 text-gray-700 font-semibold">Rekening</th>
                  </tr>
                </thead>
                <tbody>
                  {affiliators.map((affiliator, index) => (
                    <tr key={affiliator.id} className="border-b border-pink-100 hover:bg-pink-50 transition-colors">
                      <td className="py-4 px-4 text-gray-700">{index + 1}</td>
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-800">
                          {affiliator.firstName} {affiliator.lastName}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-700">{affiliator.email}</td>
                      <td className="py-4 px-4">
                        <span className="font-bold text-pink-600">{affiliator.affiliateCode}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-green-600">
                          Rp {Number(affiliator.totalCommission).toLocaleString('id-ID')}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-blue-600">{affiliator.totalReservations}</div>
                      </td>
                      <td className="py-4 px-4 text-gray-700">
                        {new Date(affiliator.registrationDate).toLocaleDateString('id-ID')}
                      </td>
                      <td className="py-4 px-4">
                        {affiliator.bankAccount ? (
                          <div className="text-sm">
                            <div className="font-medium text-gray-800">
                              {affiliator.bankAccount.bankName}
                            </div>
                            <div className="text-gray-600">{affiliator.bankAccount.accountNumber}</div>
                            <div className="text-gray-500">{affiliator.bankAccount.accountName}</div>
                            <div className="text-xs text-gray-400 uppercase">
                              {affiliator.bankAccount.accountType}
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">Belum ada rekening</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-pink-50 font-bold">
                  <tr>
                    <td colSpan={4} className="py-4 px-4 text-right text-gray-800">TOTAL:</td>
                    <td className="py-4 px-4 text-green-600">
                      Rp {stats.totalCommission.toLocaleString('id-ID')}
                    </td>
                    <td className="py-4 px-4 text-blue-600">{stats.totalReservations}</td>
                    <td colSpan={2} className="py-4 px-4"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
