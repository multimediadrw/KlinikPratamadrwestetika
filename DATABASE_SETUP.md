# 🗄️ Database Setup Guide

Panduan lengkap untuk setup database PostgreSQL dan Prisma untuk Klinik DRW Estetika.

## 📋 Prerequisites

- Node.js 18+
- pnpm (sudah installed)
- PostgreSQL database (Vercel Postgres, Supabase, Neon, atau Railway)

---

## 🚀 Setup Steps

### Step 1: Buat Database

Pilih salah satu provider:

#### **Option A: Vercel Postgres (Recommended)**
1. Buka: https://vercel.com/dashboard
2. Klik project: `klinik-pratamadrwestetika`
3. Klik tab **Storage**
4. Klik **Create Database** → **Postgres**
5. Nama: `drw_klinik`
6. Copy **CONNECTION STRING**

#### **Option B: Supabase**
1. Buka: https://supabase.com
2. Create new project
3. Tunggu project ready
4. Buka **Settings** → **Database**
5. Copy **Connection string** (URI format)

#### **Option C: Neon**
1. Buka: https://neon.tech
2. Create new project
3. Copy **Connection string**

#### **Option D: Railway**
1. Buka: https://railway.app
2. Create new project
3. Add PostgreSQL
4. Copy **DATABASE_URL**

---

### Step 2: Setup Environment Variables

1. **Buka `.env.local`** di root project
2. **Update `DATABASE_URL`** dengan connection string dari Step 1:

```bash
DATABASE_URL="postgresql://user:password@host:port/database?schema=public"
```

3. **Setup Clerk** (jika belum):
   - Buka: https://dashboard.clerk.com
   - Create new application
   - Copy keys:
     ```
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
     CLERK_SECRET_KEY="sk_test_..."
     CLERK_WEBHOOK_SECRET="whsec_..."
     ```
   - Paste ke `.env.local`

---

### Step 3: Generate Prisma Client

```bash
pnpm prisma:generate
```

---

### Step 4: Push Schema ke Database

```bash
pnpm db:push
```

Ini akan:
- ✅ Create semua tables
- ✅ Create indexes
- ✅ Setup relationships

---

### Step 5: Seed Data (Optional)

```bash
pnpm db:seed
```

Ini akan create:
- ✅ 3 Treatment Categories
- ✅ 6 Treatments
- ✅ 2 Unclaimed Affiliate Codes

---

## ✅ Verify Setup

### Check Database Connection

```bash
pnpm prisma db execute --stdin
```

Ketik:
```sql
SELECT version();
```

Jika berhasil, Anda akan lihat PostgreSQL version.

### Check Tables

```bash
pnpm prisma studio
```

Ini akan buka Prisma Studio di browser untuk visualisasi database.

---

## 🔐 Setup Clerk Webhook

Untuk auto-create user saat sign up:

1. Buka: https://dashboard.clerk.com
2. Klik project
3. Klik **Webhooks**
4. Klik **Create Endpoint**
5. **URL**: `https://your-domain.com/api/webhooks/clerk`
6. **Events**: Select `user.created`, `user.updated`, `user.deleted`
7. Copy **Signing Secret** → paste ke `.env.local` sebagai `CLERK_WEBHOOK_SECRET`

---

## 📊 Database Schema

### Users
- `id`: Unique identifier
- `clerkUserId`: Link ke Clerk
- `email`: Email address
- `affiliateCode`: Kode affiliate unik
- `isAdmin`: Admin flag
- `totalReferrals`: Jumlah referral
- `totalEarnings`: Total komisi
- `commissionPending`: Komisi yang belum dibayar
- `commissionPaid`: Komisi yang sudah dibayar

### Reservations
- `id`: Unique identifier
- `patientName`: Nama pasien
- `patientEmail`: Email pasien
- `patientPhone`: Nomor telepon
- `treatmentId`: Link ke treatment
- `referredBy`: Kode affiliate
- `referrerId`: Link ke user (affiliate)
- `status`: pending, confirmed, completed, cancelled
- `originalPrice`: Harga asli
- `finalPrice`: Harga akhir
- `commissionAmount`: Komisi untuk affiliate
- `commissionPaid`: Flag pembayaran komisi

### PreClaimAffiliateCode
- `id`: Unique identifier
- `code`: Kode affiliate
- `status`: unclaimed, claimed
- `claimedBy`: User ID yang claim
- `usageCount`: Jumlah penggunaan
- `totalCommission`: Total komisi dari kode ini

### Treatments
- `id`: Unique identifier
- `name`: Nama treatment
- `price`: Harga
- `duration`: Durasi (menit)
- `categoryId`: Link ke category

### TreatmentCategory
- `id`: Unique identifier
- `name`: Nama kategori
- `slug`: URL-friendly name

---

## 🐛 Troubleshooting

### Error: "Can't reach database server"
- ✅ Verify connection string di `.env.local`
- ✅ Check firewall/network rules
- ✅ Verify database is running

### Error: "User not found in Clerk"
- ✅ Setup Clerk webhook
- ✅ Check webhook secret di `.env.local`
- ✅ Test webhook di Clerk dashboard

### Error: "Prisma schema not found"
- ✅ Run: `pnpm prisma:generate`
- ✅ Verify `prisma/schema.prisma` exists

### Error: "Table already exists"
- ✅ Jika ingin reset: `pnpm db:reset`
- ✅ Ini akan drop semua tables dan recreate

---

## 📚 Useful Commands

```bash
# Generate Prisma client
pnpm prisma:generate

# Push schema ke database
pnpm db:push

# Create migration (production)
pnpm db:migrate

# Seed data
pnpm db:seed

# Reset database (WARNING: deletes all data)
pnpm db:reset

# Open Prisma Studio
pnpm prisma studio

# Check Prisma version
pnpm prisma --version
```

---

## 🚀 Deploy ke Vercel

1. **Push ke GitHub**
   ```bash
   git add .
   git commit -m "Add database and affiliate system"
   git push origin main
   ```

2. **Vercel auto-deploy** (jika connected)

3. **Set environment variables di Vercel**:
   - Buka: https://vercel.com/dashboard
   - Klik project
   - Klik **Settings** → **Environment Variables**
   - Add semua variables dari `.env.local`

4. **Vercel akan auto-run** `pnpm db:push` saat deploy

---

## 📞 Support

Jika ada error, cek:
1. `.env.local` - verify semua variables
2. Database connection - test dengan `psql` atau Prisma Studio
3. Clerk setup - verify webhook dan keys
4. Logs - cek Vercel logs untuk error details

---

**Selamat! Database Anda sudah siap!** 🎉
