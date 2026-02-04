# 📊 SEO Setup Guide - Klinik Pratama DRW Estetika

## ✅ Sudah Diimplementasikan

### 1. **Meta Tags & Metadata**
- ✅ Title tag yang SEO-friendly
- ✅ Meta description
- ✅ Keywords
- ✅ Open Graph tags (untuk social media)
- ✅ Twitter Card tags
- ✅ Canonical URL

### 2. **Structured Data (Schema.org)**
- ✅ MedicalBusiness schema
- ✅ LocalBusiness schema
- ✅ Organization schema dengan multiple locations

### 3. **XML Sitemap**
- ✅ `sitemap.xml` - Semua halaman penting sudah listed
- Location: `https://drwskincare.com/sitemap.xml`

### 4. **Robots.txt**
- ✅ `robots.txt` - Untuk mengatur crawling bots
- Location: `https://drwskincare.com/robots.txt`

---

## 🔧 Setup yang Perlu Dilakukan Manual

### Step 1: Setup Google Analytics 4

1. **Buka Google Analytics** → https://analytics.google.com
2. **Create Property** untuk domain `drwskincare.com`
3. **Dapatkan Measurement ID** (format: G-XXXXXXXXXX)
4. **Update di `app/layout.tsx`:**
   ```
   Ganti "G-XXXXXXXXXX" dengan Measurement ID Anda
   ```
5. **Deploy ke production**

### Step 2: Setup Google Search Console

1. **Buka Google Search Console** → https://search.google.com/search-console
2. **Add Property** → Pilih "URL prefix"
3. **Masukkan:** `https://drwskincare.com`
4. **Verify dengan DNS record** atau HTML file
5. **Submit sitemap:**
   - Klik "Sitemaps" di sidebar
   - Masukkan: `https://drwskincare.com/sitemap.xml`
   - Klik "Submit"

### Step 3: Verify Google Search Console (Choose One)

#### Option A: HTML File Verification (Recommended)
1. Download HTML file dari GSC
2. Upload ke `/public/` folder
3. Deploy
4. Verify di GSC

#### Option B: DNS Record Verification
1. Copy verification code dari GSC
2. Add TXT record di Cloudflare DNS:
   - **Type:** TXT
   - **Name:** @ (root domain)
   - **Content:** [verification code dari GSC]
3. Verify di GSC

#### Option C: Meta Tag Verification
1. Copy meta tag dari GSC
2. Sudah ada di `app/layout.tsx`
3. Ganti placeholder dengan code dari GSC
4. Deploy
5. Verify di GSC

---

## 📋 Checklist Setelah Setup

- [ ] Google Analytics 4 tracking code ditambahkan
- [ ] Google Search Console property verified
- [ ] Sitemap submitted di GSC
- [ ] Website di-crawl oleh Google (cek di GSC)
- [ ] Indexed pages muncul di GSC
- [ ] Traffic mulai terlihat di Google Analytics

---

## 🎯 SEO Best Practices (Sudah Diterapkan)

✅ Mobile-responsive design
✅ Fast page load (Next.js optimization)
✅ Proper heading hierarchy (H1, H2, H3)
✅ Internal linking structure
✅ Image alt text
✅ Structured data markup
✅ Clean URL structure
✅ Meta descriptions
✅ Open Graph tags

---

## 📈 Monitoring & Optimization

### Google Search Console
- Monitor impressions & clicks
- Check indexing status
- Fix crawl errors
- Submit new pages

### Google Analytics
- Track user behavior
- Monitor bounce rate
- Check conversion goals
- Analyze traffic sources

### Regular Tasks
- Update sitemap.xml ketika ada halaman baru
- Monitor keyword rankings
- Check backlinks
- Optimize underperforming pages

---

## 🔗 Useful Links

- **Google Analytics:** https://analytics.google.com
- **Google Search Console:** https://search.google.com/search-console
- **Google Mobile-Friendly Test:** https://search.google.com/test/mobile-friendly
- **Google PageSpeed Insights:** https://pagespeed.web.dev
- **Schema.org Validator:** https://validator.schema.org

---

## 📞 Support

Jika ada pertanyaan tentang setup SEO, hubungi tim development.
