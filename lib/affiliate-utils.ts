/**
 * Utility functions untuk Affiliate System
 */

/**
 * Generate kode affiliate unik berdasarkan nama user
 * Format: NAMA + 3 digit random
 * Contoh: JOHN123, BUDI456
 */
export function generateAffiliateCode(firstName: string, lastName?: string): string {
  const name = (firstName + (lastName || '')).toUpperCase().replace(/[^A-Z]/g, '');
  const truncated = name.slice(0, 4); // Ambil 4 huruf pertama
  const randomNum = Math.floor(Math.random() * 900) + 100; // 100-999
  
  return `${truncated}${randomNum}`;
}

/**
 * Generate random kode affiliate untuk unclaimed codes
 * Format: 6-8 karakter uppercase + angka
 */
export function generateRandomAffiliateCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Validasi format kode affiliate
 */
export function isValidAffiliateCode(code: string): boolean {
  // Kode harus 4-10 karakter, alphanumeric, uppercase
  return /^[A-Z0-9]{4,10}$/.test(code);
}

/**
 * Calculate komisi berdasarkan final price dan commission rate
 */
export function calculateCommission(finalPrice: number, commissionRate: number = 10): number {
  return (finalPrice * commissionRate) / 100;
}

/**
 * Format referral link
 */
export function generateReferralLink(baseUrl: string, affiliateCode: string): string {
  const url = new URL('/reservation', baseUrl);
  url.searchParams.set('ref', affiliateCode);
  return url.toString();
}

/**
 * Extract affiliate code dari URL parameter
 */
export function extractAffiliateCodeFromUrl(searchParams: URLSearchParams): string | null {
  return searchParams.get('ref');
}
