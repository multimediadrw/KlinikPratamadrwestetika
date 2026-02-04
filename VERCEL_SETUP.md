# 🚀 Setup Environment Variables di Vercel

## 📋 Environment Variables yang Diperlukan

Untuk menjalankan website Klinik Pratama DRW Estetika di Vercel, Anda perlu setup environment variables berikut:

---

## 1. DATABASE_URL

**Deskripsi:** Connection string ke PostgreSQL database

**Value:**
```
postgresql://berkomunitas:berkomunitas688@213.190.4.159/klinikdrw
```

**Environment:** Production, Preview, Development (pilih semua)

---

## 2. NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

**Deskripsi:** Clerk publishable key untuk authentication

**Cara mendapatkan:**
1. Buka https://dashboard.clerk.com
2. Pilih project Anda
3. Klik **API Keys**
4. Copy **Publishable key**

**Environment:** Production, Preview, Development

---

## 3. CLERK_SECRET_KEY

**Deskripsi:** Clerk secret key untuk server-side authentication

**Cara mendapatkan:**
1. Buka https://dashboard.clerk.com
2. Pilih project Anda
3. Klik **API Keys**
4. Copy **Secret key**

**Environment:** Production, Preview, Development

---

## 4. CLERK_WEBHOOK_SECRET

**Deskripsi:** Secret untuk verify Clerk webhooks

**Cara mendapatkan:**
1. Buka https://dashboard.clerk.com
2. Pilih project Anda
3. Klik **Webhooks**
4. Buat webhook endpoint: `https://your-domain.vercel.app/api/webhooks/clerk`
5. Subscribe ke events: `user.created`, `user.updated`, `user.deleted`
6. Copy **Signing Secret**

**Environment:** Production, Preview, Development

---

## 5. NEXT_PUBLIC_APP_URL

**Deskripsi:** URL utama website

**Value:**
```
https://klinik.drwskincare.com
```

**Environment:** Production, Preview, Development

---

## 🔧 Cara Setup di Vercel

### Step 1: Buka Project Settings
1. Buka https://vercel.com/multimediadrws-projects/klinik-pratamadrwestetika
2. Klik tab **Settings**
3. Klik **Environment Variables** di sidebar

### Step 2: Tambah Environment Variables
Untuk setiap variable di atas:
1. Klik **Add New**
2. **Key:** Masukkan nama variable (contoh: `DATABASE_URL`)
3. **Value:** Masukkan value sesuai dokumentasi di atas
4. **Environment:** Pilih **Production, Preview, Development**
5. Klik **Save**

### Step 3: Redeploy
1. Kembali ke tab **Deployments**
2. Klik **...** (three dots) pada deployment terakhir
3. Klik **Redeploy**
4. Tunggu sampai deployment selesai

---

## ✅ Verifikasi

Setelah setup selesai, cek:
1. ✅ Website bisa diakses
2. ✅ Clerk authentication berfungsi (sign in/sign up)
3. ✅ Database connection berhasil
4. ✅ Webhook dari Clerk berfungsi

---

## 📊 Database Schema

Database `klinikdrw` sudah berisi tables berikut:
- `User` - Data user dan affiliate
- `Treatment` - Data treatment/layanan
- `Reservation` - Data reservasi customer
- `PreClaimAffiliateCode` - Kode affiliate yang belum di-claim

Schema sudah di-push menggunakan Prisma. Tidak perlu migration manual.

---

## 🔒 Keamanan

⚠️ **PENTING:**
- Jangan commit file `.env` ke Git
- File `.env` sudah ada di `.gitignore`
- Hanya commit `.env.example` sebagai template
- Jangan share secret keys di public

---

## 📞 Support

Jika ada masalah:
1. Cek Vercel deployment logs
2. Cek browser console untuk error
3. Cek Clerk dashboard untuk webhook status

---

**Last Updated:** Feb 04, 2026
