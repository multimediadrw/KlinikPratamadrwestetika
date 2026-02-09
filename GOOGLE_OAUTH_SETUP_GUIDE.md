# 🔐 Panduan Setup Google OAuth untuk Klinik DRW

## ✅ Status Deployment
**Website**: https://klinik.drwskincare.com  
**Status**: ✅ READY (Live di Production)  
**Build**: Berhasil tanpa error

---

## 📋 Langkah-Langkah Setup

### **STEP 1: Buat Google OAuth Credentials**

#### 1.1 Buka Google Cloud Console
1. Buka: https://console.cloud.google.com
2. Login dengan akun Google Anda
3. Pilih atau buat project baru:
   - Klik dropdown project di atas
   - Klik "New Project"
   - Nama: `Klinik DRW Estetika`
   - Klik "Create"

#### 1.2 Enable Google+ API
1. Di sidebar kiri, klik **"APIs & Services"** → **"Library"**
2. Search: `Google+ API`
3. Klik **"Google+ API"**
4. Klik **"Enable"**

#### 1.3 Configure OAuth Consent Screen
1. Di sidebar, klik **"OAuth consent screen"**
2. Pilih **"External"** → Klik **"Create"**
3. Isi form:
   - **App name**: `Klinik Pratama DRW Estetika`
   - **User support email**: Email Anda
   - **App logo**: (Optional) Upload logo klinik
   - **Application home page**: `https://klinik.drwskincare.com`
   - **Authorized domains**: `drwskincare.com`
   - **Developer contact email**: Email Anda
4. Klik **"Save and Continue"**

5. **Scopes** (Step 2):
   - Klik **"Add or Remove Scopes"**
   - Pilih:
     - `userinfo.email`
     - `userinfo.profile`
     - `openid`
   - Klik **"Update"** → **"Save and Continue"**

6. **Test Users** (Step 3):
   - Klik **"Add Users"**
   - Tambahkan email Anda dan email admin lain
   - Klik **"Save and Continue"**

7. Klik **"Back to Dashboard"**

#### 1.4 Create OAuth Credentials
1. Di sidebar, klik **"Credentials"**
2. Klik **"+ Create Credentials"** → **"OAuth client ID"**
3. Pilih:
   - **Application type**: `Web application`
   - **Name**: `Klinik DRW Website`
4. **Authorized JavaScript origins**:
   - Klik **"+ Add URI"**
   - Tambahkan: `https://klinik.drwskincare.com`
5. **Authorized redirect URIs**:
   - Klik **"+ Add URI"**
   - Tambahkan: `https://klinik.drwskincare.com/api/auth/callback/google`
6. Klik **"Create"**

7. **PENTING**: Copy credentials yang muncul:
   - ✅ **Client ID** (contoh: `123456789-abc...apps.googleusercontent.com`)
   - ✅ **Client Secret** (contoh: `GOCSPX-abc...xyz`)
   - **SIMPAN BAIK-BAIK!** Anda akan butuh ini di Step 2

---

### **STEP 2: Setup Environment Variables di Vercel**

#### 2.1 Buka Vercel Dashboard
1. Buka: https://vercel.com/dashboard
2. Login dengan akun GitHub Anda
3. Pilih project: **klinik-pratamadrwestetika**

#### 2.2 Tambahkan Environment Variables
1. Klik tab **"Settings"**
2. Klik **"Environment Variables"** di sidebar
3. Tambahkan 4 variables berikut:

**Variable 1: GOOGLE_CLIENT_ID**
- **Key**: `GOOGLE_CLIENT_ID`
- **Value**: Paste Client ID dari Step 1.4
- **Environment**: Pilih semua (Production, Preview, Development)
- Klik **"Save"**

**Variable 2: GOOGLE_CLIENT_SECRET**
- **Key**: `GOOGLE_CLIENT_SECRET`
- **Value**: Paste Client Secret dari Step 1.4
- **Environment**: Pilih semua
- Klik **"Save"**

**Variable 3: NEXTAUTH_SECRET**
- **Key**: `NEXTAUTH_SECRET`
- **Value**: Generate random string (lihat cara di bawah)
- **Environment**: Pilih semua
- Klik **"Save"**

**Variable 4: NEXTAUTH_URL**
- **Key**: `NEXTAUTH_URL`
- **Value**: `https://klinik.drwskincare.com`
- **Environment**: Production only
- Klik **"Save"**

#### 2.3 Generate NEXTAUTH_SECRET
Pilih salah satu cara:

**Cara 1: Online Generator**
- Buka: https://generate-secret.vercel.app/32
- Copy string yang muncul
- Paste ke Vercel

**Cara 2: Terminal/Command Line**
```bash
openssl rand -base64 32
```

**Cara 3: Manual**
- Buat string random minimal 32 karakter
- Contoh: `klinik-drw-secret-2026-super-secure-key-xyz123`

---

### **STEP 3: Redeploy Website**

#### 3.1 Trigger Redeploy
1. Masih di Vercel dashboard
2. Klik tab **"Deployments"**
3. Klik deployment paling atas (yang READY)
4. Klik tombol **"⋮"** (3 dots) di kanan atas
5. Klik **"Redeploy"**
6. Klik **"Redeploy"** lagi untuk konfirmasi

#### 3.2 Tunggu Build Selesai
- Status akan berubah: Building → Ready
- Biasanya 2-3 menit
- Tunggu sampai status **"Ready"** (hijau)

---

### **STEP 4: Testing**

#### 4.1 Test Google Sign In
1. Buka: https://klinik.drwskincare.com
2. Klik tombol **"SIGN IN"** di navbar
3. Klik **"Continue with Google"**
4. Pilih akun Google Anda
5. Seharusnya redirect ke **My Dashboard**

#### 4.2 Test My Dashboard
1. Setelah login, Anda akan di `/my-dashboard`
2. Cek apakah data muncul:
   - ✅ Affiliate code
   - ✅ Referral link
   - ✅ QR Code
   - ✅ Stats (commission, reservations, customers)
   - ✅ Withdrawal form

#### 4.3 Test Withdrawal
1. Isi form withdrawal:
   - Bank/E-wallet
   - Account number
   - Account name
   - Amount
2. Klik **"Request Withdrawal"**
3. Cek apakah muncul di withdrawal history

#### 4.4 Test Front Office (Admin)
1. Login sebagai admin
2. Akses: https://klinik.drwskincare.com/front-office
3. Klik **"Withdrawals"**
4. Cek apakah withdrawal request muncul
5. Test approve/reject
6. Klik **"Report"**
7. Test Excel export

---

## 🔧 Troubleshooting

### Error: "redirect_uri_mismatch"
**Penyebab**: Redirect URI tidak match di Google Console

**Solusi**:
1. Buka Google Cloud Console
2. Credentials → Edit OAuth client
3. Pastikan redirect URI: `https://klinik.drwskincare.com/api/auth/callback/google`
4. Save dan coba lagi

### Error: "Access blocked: This app's request is invalid"
**Penyebab**: OAuth consent screen belum di-publish

**Solusi**:
1. Buka Google Cloud Console
2. OAuth consent screen
3. Klik **"Publish App"**
4. Atau tambahkan email Anda ke Test Users

### Sign In button tidak muncul
**Penyebab**: Environment variables belum di-set atau redeploy belum selesai

**Solusi**:
1. Cek Vercel environment variables
2. Pastikan semua 4 variables sudah ada
3. Redeploy ulang
4. Clear browser cache

### Dashboard shows "No affiliate code assigned"
**Penyebab**: User belum di-assign affiliate code oleh admin

**Solusi**:
1. Login sebagai admin
2. Buka Front Office → Affiliate Codes
3. Assign code ke email user
4. User logout dan login ulang

---

## 📝 Checklist Setup

- [ ] Google Cloud project created
- [ ] Google+ API enabled
- [ ] OAuth consent screen configured
- [ ] OAuth credentials created
- [ ] Client ID & Secret copied
- [ ] NEXTAUTH_SECRET generated
- [ ] All 4 env vars added to Vercel
- [ ] Website redeployed
- [ ] Google Sign In tested
- [ ] My Dashboard accessible
- [ ] Withdrawal form working
- [ ] Front Office accessible (admin)

---

## 🎯 Summary

Setelah semua langkah selesai:

✅ User bisa login dengan Google  
✅ My Dashboard menampilkan data affiliate  
✅ QR Code bisa di-download  
✅ Withdrawal system berfungsi  
✅ Admin bisa manage withdrawals  
✅ Excel export berfungsi  

**Website siap production!** 🚀

---

## 📞 Support

Jika ada masalah:
1. Cek Vercel deployment logs
2. Cek browser console untuk errors
3. Verify semua environment variables
4. Pastikan Google OAuth credentials benar
5. Test dengan akun yang sudah di-add sebagai Test User

**Selamat! Website Anda sudah siap digunakan!** 🎉
