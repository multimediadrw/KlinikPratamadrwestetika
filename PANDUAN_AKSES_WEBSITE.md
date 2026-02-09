# 🌐 Panduan Akses Website Klinik DRW

## 🎉 Website Sudah Live!

**URL Production**: https://klinik.drwskincare.com  
**Status**: ✅ READY & DEPLOYED  
**Last Updated**: Feb 9, 2026

---

## 👥 Akses untuk User (Affiliator)

### 1. **Cara Login**
1. Buka: https://klinik.drwskincare.com
2. Klik tombol **"SIGN IN"** di pojok kanan atas navbar
3. Klik **"Continue with Google"**
4. Pilih akun Google Anda
5. Otomatis redirect ke **My Dashboard**

### 2. **My Dashboard - Fitur Affiliator**

**URL**: https://klinik.drwskincare.com/my-dashboard

#### 📊 Stats Dashboard
Menampilkan:
- **Total Commission**: Total komisi yang sudah didapat
- **Total Reservations**: Jumlah reservasi dari referral Anda
- **Pending Reservations**: Reservasi yang masih pending
- **Total Customers**: Jumlah customer unik

#### 🔗 Referral Section
- **Affiliate Code**: Kode unik Anda (contoh: `FRONTOFICE`)
- **Referral Link**: Link untuk dibagikan ke customer
  - Format: `https://klinik.drwskincare.com/?ref=KODEANADA`
  - Klik **"Copy Link"** untuk copy otomatis
- **QR Code**: 
  - Scan untuk langsung ke referral link
  - Klik **"Download QR Code"** untuk save sebagai PNG
  - Bisa di-print atau share di sosmed

#### 💰 Withdrawal (Penarikan Komisi)
1. Klik tombol **"Request Withdrawal"**
2. Isi form:
   - **Bank/E-wallet**: Pilih (BCA, Mandiri, BNI, BRI, GoPay, OVO, DANA, ShopeePay)
   - **Account Number**: Nomor rekening/e-wallet
   - **Account Name**: Nama pemilik rekening
   - **Amount**: Jumlah yang ingin ditarik (Rp)
3. Klik **"Submit Request"**
4. Status akan muncul di **Withdrawal History**:
   - 🟡 **Pending**: Menunggu approval admin
   - 🟢 **Approved**: Sudah disetujui, akan ditransfer
   - 🔴 **Rejected**: Ditolak (lihat notes)

#### 📋 Withdrawal History
Tabel menampilkan:
- **Date**: Tanggal request
- **Amount**: Jumlah penarikan
- **Bank**: Bank/e-wallet tujuan
- **Account**: Nomor rekening
- **Status**: Status approval
- **Notes**: Catatan dari admin (jika ada)

#### 📊 Reservation History
Tabel menampilkan semua reservasi dari referral Anda:
- **Date**: Tanggal reservasi
- **Patient**: Nama customer
- **Treatment**: Jenis treatment
- **Price**: Harga treatment
- **Commission**: Komisi yang didapat (10%)
- **Status**: Status reservasi

---

## 👨‍💼 Akses untuk Admin (Front Office)

### 1. **Cara Login Admin**
1. Buka: https://klinik.drwskincare.com/login
2. Masukkan email admin
3. Klik **"Send Magic Link"**
4. Cek email, klik link verifikasi
5. Otomatis login

**ATAU** gunakan Google Sign In jika email admin sudah terdaftar.

### 2. **Front Office Dashboard**

**URL**: https://klinik.drwskincare.com/front-office

Menu utama:
- **Dashboard**: Stats overview
- **Affiliate Codes**: Manage kode affiliate
- **Reservations**: Manage reservasi
- **Withdrawals**: Manage penarikan komisi ⭐ NEW
- **Report**: Laporan affiliator ⭐ NEW

---

### 3. **Withdrawals Management** ⭐ NEW

**URL**: https://klinik.drwskincare.com/front-office/withdrawals

#### Fitur:
- **View All Requests**: Lihat semua request withdrawal
- **Filter by Status**: 
  - All
  - Pending (perlu action)
  - Approved
  - Rejected
- **Search**: Cari by user email atau account number

#### Tabel Withdrawals:
| Column | Deskripsi |
|--------|-----------|
| Date | Tanggal request |
| User | Email affiliator |
| Amount | Jumlah penarikan |
| Bank | Bank/e-wallet |
| Account | Nomor rekening |
| Account Name | Nama pemilik |
| Status | Pending/Approved/Rejected |
| Actions | Approve/Reject buttons |

#### Cara Approve Withdrawal:
1. Cek detail request (amount, bank, account)
2. Klik tombol **"Approve"** (hijau)
3. Transfer dana ke rekening yang tertera
4. Status berubah jadi **"Approved"**
5. User akan lihat status approved di dashboard

#### Cara Reject Withdrawal:
1. Klik tombol **"Reject"** (merah)
2. Isi **Notes** (alasan reject)
   - Contoh: "Saldo komisi tidak cukup"
   - Contoh: "Nomor rekening tidak valid"
3. Klik **"Confirm Reject"**
4. User akan lihat status rejected + notes

---

### 4. **Affiliator Report** ⭐ NEW

**URL**: https://klinik.drwskincare.com/front-office/report

#### Fitur:
- **View All Affiliators**: Lihat semua affiliator dan performanya
- **Export to Excel**: Download laporan lengkap
- **Real-time Data**: Data langsung dari database

#### Tabel Report:
| Column | Deskripsi |
|--------|-----------|
| Affiliate Code | Kode unik affiliator |
| Email | Email affiliator |
| Total Reservations | Jumlah reservasi |
| Total Commission | Total komisi (Rp) |
| Pending Withdrawals | Total withdrawal pending |
| Approved Withdrawals | Total withdrawal approved |
| Available Balance | Sisa saldo yang bisa ditarik |
| Status | Active/Inactive |

#### Cara Export Excel:
1. Klik tombol **"Export to Excel"** (hijau)
2. File akan otomatis download
3. Nama file: `Affiliator_Report_YYYY-MM-DD.xlsx`
4. Buka dengan Excel/Google Sheets

#### Isi Excel Export:
- **Sheet 1: Summary**
  - Total affiliators
  - Total commissions paid
  - Total pending withdrawals
  - Charts & graphs
- **Sheet 2: Detailed Report**
  - Semua data affiliator
  - Sortable & filterable
  - Formatted currency

---

## 🔐 User Roles & Permissions

### **Affiliator (User)**
✅ Akses My Dashboard  
✅ Lihat stats & commission  
✅ Request withdrawal  
✅ Download QR code  
✅ Lihat reservation history  
❌ Tidak bisa akses Front Office  

### **Admin (Front Office)**
✅ Akses Front Office  
✅ Manage affiliate codes  
✅ Manage reservations  
✅ Approve/Reject withdrawals  
✅ View & export reports  
✅ Akses semua data  

---

## 📱 Mobile Access

Website **fully responsive** dan bisa diakses dari:
- 📱 **Mobile**: Smartphone (Android/iOS)
- 💻 **Desktop**: PC/Laptop
- 📱 **Tablet**: iPad, Android tablet

**Rekomendasi**: Gunakan Chrome atau Safari untuk pengalaman terbaik.

---

## 🔗 Quick Links

### User (Affiliator):
- **Homepage**: https://klinik.drwskincare.com
- **Sign In**: https://klinik.drwskincare.com/sign-in
- **My Dashboard**: https://klinik.drwskincare.com/my-dashboard

### Admin (Front Office):
- **Login**: https://klinik.drwskincare.com/login
- **Front Office**: https://klinik.drwskincare.com/front-office
- **Withdrawals**: https://klinik.drwskincare.com/front-office/withdrawals
- **Report**: https://klinik.drwskincare.com/front-office/report
- **Affiliate Codes**: https://klinik.drwskincare.com/front-office/affiliate-codes

### Public Pages:
- **Treatments**: https://klinik.drwskincare.com/treatment
- **Gallery**: https://klinik.drwskincare.com/galeri
- **Testimonials**: https://klinik.drwskincare.com/testimoni
- **FAQ**: https://klinik.drwskincare.com/faq
- **Contact**: https://klinik.drwskincare.com/kontak

---

## 🆘 Troubleshooting

### "Sign In button tidak muncul"
**Solusi**: 
- Setup Google OAuth dulu (lihat `GOOGLE_OAUTH_SETUP_GUIDE.md`)
- Clear browser cache
- Refresh page

### "No affiliate code assigned"
**Solusi**:
- Hubungi admin untuk assign code
- Admin: Front Office → Affiliate Codes → Assign ke email user

### "Withdrawal request tidak muncul"
**Solusi**:
- Refresh page
- Logout dan login ulang
- Cek apakah request berhasil di-submit

### "Cannot access Front Office"
**Solusi**:
- Pastikan login sebagai admin
- Cek email sudah terdaftar sebagai admin di database
- Hubungi developer untuk set admin permission

---

## 📞 Support

Jika ada masalah teknis:
1. Screenshot error yang muncul
2. Catat URL halaman saat error
3. Hubungi developer dengan info di atas

---

## 🎊 Selamat!

Website Klinik DRW Estetika sudah **LIVE** dan siap digunakan!

**Features yang tersedia**:
✅ Google Sign In authentication  
✅ Affiliate dashboard dengan QR code  
✅ Withdrawal system (request & approval)  
✅ Front Office management  
✅ Excel report export  
✅ Mobile responsive  
✅ Real-time data  

**Nikmati fitur-fitur baru dan tingkatkan penjualan Anda!** 🚀
