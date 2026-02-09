# Panduan Setup Google OAuth untuk NextAuth.js

## 🎯 Langkah-Langkah Setup

### 1. Buka Google Cloud Console
- Kunjungi: https://console.cloud.google.com
- Login dengan akun Google Anda

### 2. Buat Project Baru (atau Pilih Project yang Ada)
- Klik dropdown project di bagian atas
- Klik "New Project"
- Nama project: **Klinik DRW Estetika**
- Klik "Create"

### 3. Enable Google+ API
- Di sidebar, pilih **APIs & Services** → **Library**
- Cari "Google+ API"
- Klik dan pilih **Enable**

### 4. Buat OAuth Consent Screen
- Di sidebar, pilih **APIs & Services** → **OAuth consent screen**
- Pilih **External** (untuk testing dengan email manapun)
- Klik **Create**

#### Isi Form:
- **App name**: Klinik Pratama DRW Estetika
- **User support email**: [email Anda]
- **Developer contact email**: [email Anda]
- Klik **Save and Continue**

#### Scopes:
- Klik **Add or Remove Scopes**
- Pilih:
  - `.../auth/userinfo.email`
  - `.../auth/userinfo.profile`
- Klik **Update** → **Save and Continue**

#### Test Users (Optional untuk development):
- Tambahkan email yang akan digunakan untuk testing
- Klik **Save and Continue**

### 5. Buat OAuth 2.0 Credentials
- Di sidebar, pilih **APIs & Services** → **Credentials**
- Klik **Create Credentials** → **OAuth client ID**

#### Isi Form:
- **Application type**: Web application
- **Name**: Klinik DRW Web App

#### Authorized JavaScript origins:
```
https://klinik.drwskincare.com
http://localhost:3000
```

#### Authorized redirect URIs:
```
https://klinik.drwskincare.com/api/auth/callback/google
http://localhost:3000/api/auth/callback/google
```

- Klik **Create**

### 6. Copy Credentials
Setelah dibuat, akan muncul popup dengan:
- **Client ID**: `xxxxx.apps.googleusercontent.com`
- **Client Secret**: `xxxxxxxxxxxxxxx`

**PENTING**: Copy kedua nilai ini!

---

## 🔧 Konfigurasi Environment Variables

### Di Local (.env.local):
```env
GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret-here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=klinik-drw-estetika-secret-key-2026
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Di Vercel (Production):
1. Buka project di Vercel
2. Settings → Environment Variables
3. Tambahkan:

| Name | Value |
|------|-------|
| `GOOGLE_CLIENT_ID` | [Client ID dari Google Console] |
| `GOOGLE_CLIENT_SECRET` | [Client Secret dari Google Console] |
| `NEXTAUTH_URL` | `https://klinik.drwskincare.com` |
| `NEXTAUTH_SECRET` | `klinik-drw-estetika-secret-key-2026` |
| `NEXT_PUBLIC_APP_URL` | `https://klinik.drwskincare.com` |

4. Centang semua environment (Production, Preview, Development)
5. Klik **Save**

---

## ✅ Testing

### Test di Local:
1. Update `.env.local` dengan credentials
2. Run: `pnpm dev`
3. Buka: `http://localhost:3000`
4. Klik **SIGN IN**
5. Pilih **Continue with Google**
6. Login dengan Google account
7. Seharusnya redirect ke `/my-dashboard`

### Test di Production:
1. Pastikan environment variables sudah ditambahkan di Vercel
2. Redeploy project
3. Buka: `https://klinik.drwskincare.com`
4. Klik **SIGN IN**
5. Login dengan Google
6. Check dashboard muncul dengan data affiliate

---

## 🔐 Security Notes

### NEXTAUTH_SECRET
- Untuk production, gunakan secret yang lebih kuat
- Generate dengan: `openssl rand -base64 32`
- Jangan commit ke Git!

### Google OAuth Credentials
- Jangan share Client Secret ke siapapun
- Jangan commit ke Git!
- Simpan di environment variables saja

---

## 🐛 Troubleshooting

### Error: "redirect_uri_mismatch"
- Pastikan redirect URI di Google Console sama persis dengan yang digunakan
- Format: `https://klinik.drwskincare.com/api/auth/callback/google`
- Tidak boleh ada trailing slash

### Error: "Access blocked: This app's request is invalid"
- Pastikan OAuth Consent Screen sudah dikonfigurasi
- Pastikan email yang digunakan sudah ditambahkan sebagai test user (jika masih dalam testing mode)

### Error: "Invalid client"
- Pastikan Client ID dan Secret sudah benar
- Pastikan environment variables sudah ter-set di Vercel

### Dashboard tidak muncul data
- Pastikan email yang login sudah ter-assign ke affiliate code di database
- Pastikan affiliate code berstatus "claimed"
- Check API response di browser console

---

## 📝 Checklist

Sebelum deploy ke production:

- [ ] Google Cloud Project sudah dibuat
- [ ] OAuth Consent Screen sudah dikonfigurasi
- [ ] OAuth 2.0 Credentials sudah dibuat
- [ ] Client ID dan Secret sudah di-copy
- [ ] Environment variables sudah ditambahkan di Vercel
- [ ] Redirect URIs sudah benar
- [ ] Test di local berhasil
- [ ] Code sudah di-push ke GitHub
- [ ] Vercel auto-deploy berhasil
- [ ] Test di production berhasil

---

## 🎉 Selesai!

Setelah semua langkah di atas selesai, sistem Google Sign In dan MY DASHBOARD akan berfungsi dengan baik!

**Support**: Jika ada masalah, check logs di:
- Browser Console (F12)
- Vercel Deployment Logs
- Google Cloud Console Logs
