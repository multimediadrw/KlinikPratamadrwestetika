# 🔐 Front Office Access Setup Guide

Panduan untuk memberikan akses front office kepada user.

---

## 📋 Overview

Sistem front office memerlukan:
1. User sudah terdaftar dan login via Clerk
2. User memiliki flag `isFrontOffice = true` atau `isAdmin = true` di database
3. Role checking sudah diimplementasikan di API routes

---

## 🚀 Cara Memberikan Akses Front Office

### **Metode 1: Via Script (Recommended)**

Jalankan script otomatis untuk grant akses:

```bash
pnpm grant-fo multimediadrw@gmail.com
```

Script ini akan:
- ✅ Mencari user berdasarkan email
- ✅ Set `isFrontOffice = true`
- ✅ Set `isAdmin = true` (untuk full access)
- ✅ Menampilkan konfirmasi

---

### **Metode 2: Via SQL Direct**

Jika Anda punya akses langsung ke database PostgreSQL:

```sql
-- Grant front office + admin access
UPDATE "User" 
SET "isFrontOffice" = true, "isAdmin" = true 
WHERE email = 'multimediadrw@gmail.com';

-- Verify
SELECT email, "isFrontOffice", "isAdmin" 
FROM "User" 
WHERE email = 'multimediadrw@gmail.com';
```

File SQL tersedia di: `scripts/grant-front-office.sql`

---

### **Metode 3: Via Prisma Studio**

1. Jalankan Prisma Studio:
   ```bash
   pnpm prisma studio
   ```

2. Buka browser di `http://localhost:5555`

3. Pilih model **User**

4. Cari user dengan email `multimediadrw@gmail.com`

5. Edit field:
   - `isFrontOffice` → `true`
   - `isAdmin` → `true`

6. Save changes

---

### **Metode 4: Via Admin API (Jika Sudah Ada Admin)**

Jika sudah ada user admin lain, bisa gunakan API endpoint:

```bash
curl -X POST https://klinik.drwskincare.com/api/admin/grant-front-office \
  -H "Content-Type: application/json" \
  -d '{"email": "multimediadrw@gmail.com"}'
```

---

## ✅ Verifikasi Akses

Setelah grant akses, verifikasi dengan:

1. **Login ke website** dengan akun `multimediadrw@gmail.com`

2. **Akses front office dashboard**:
   ```
   https://klinik.drwskincare.com/front-office
   ```

3. **Cek dashboard stats**:
   - Total Reservasi
   - Pending Reservations
   - Completed Reservations
   - Total Affiliates

4. **Cek menu yang tersedia**:
   - 📅 Manage Reservations
   - 🎟️ Affiliate Codes
   - 👥 Affiliate Network

---

## 🔧 Troubleshooting

### Error: "User not found"

**Penyebab**: User belum terdaftar di database

**Solusi**:
1. Pastikan user sudah sign up via website
2. Check webhook Clerk sudah berjalan
3. Verify di database:
   ```sql
   SELECT * FROM "User" WHERE email = 'multimediadrw@gmail.com';
   ```

---

### Error: "Forbidden: Front office access required"

**Penyebab**: Flag `isFrontOffice` masih `false`

**Solusi**:
1. Jalankan script grant-fo lagi
2. Atau update manual via SQL/Prisma Studio
3. Logout dan login kembali

---

### Error: "Unauthorized"

**Penyebab**: User belum login

**Solusi**:
1. Login via `/sign-in`
2. Pastikan Clerk authentication berjalan
3. Check cookies dan session

---

## 📊 Database Schema

Field yang relevan di model **User**:

```prisma
model User {
  id              String   @id @default(cuid())
  clerkUserId     String   @unique
  email           String   @unique
  isAdmin         Boolean  @default(false)
  isFrontOffice   Boolean  @default(false)
  // ... fields lainnya
}
```

---

## 🔐 Role Hierarchy

1. **Admin** (`isAdmin = true`)
   - Full access ke semua fitur
   - Bisa akses admin panel
   - Bisa akses front office
   - Bisa grant akses ke user lain

2. **Front Office** (`isFrontOffice = true`)
   - Akses ke front office dashboard
   - Manage reservations
   - Manage affiliate codes
   - View statistics

3. **Affiliate** (user biasa dengan `affiliateCode`)
   - Akses ke affiliate dashboard
   - Track referrals dan earnings
   - Claim affiliate codes

4. **Public** (tidak login)
   - Browse website
   - Book reservations
   - View public pages

---

## 🚀 Next Steps

Setelah akses front office berhasil, Anda bisa:

1. ✅ Manage reservations dari customer
2. ✅ Generate dan assign affiliate codes
3. ✅ Monitor affiliate performance
4. ✅ View dashboard statistics
5. ✅ Update reservation status
6. ✅ Process commissions

---

## 📞 Support

Jika masih ada masalah:

1. Check logs di Vercel dashboard
2. Verify database connection
3. Check Clerk authentication status
4. Review middleware configuration

---

**Status**: ✅ Front office access system sudah diimplementasikan dan siap digunakan!

*Last updated: 4 Februari 2026*
