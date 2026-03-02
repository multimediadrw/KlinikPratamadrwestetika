import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { generateAffiliateCode } from '@/lib/affiliate-utils';

export const dynamic = 'force-dynamic';

// POST - Daftar sebagai affiliate baru
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password, referralCode } = body;

    if (!firstName || !email || !password) {
      return NextResponse.json(
        { error: 'firstName, email, dan password harus diisi' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password minimal 8 karakter' },
        { status: 400 }
      );
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email sudah terdaftar' },
        { status: 409 }
      );
    }

    // Generate affiliate code unik
    let affiliateCode = generateAffiliateCode(firstName, lastName);
    let attempts = 0;
    while (attempts < 10) {
      const existing = await prisma.user.findUnique({ where: { affiliateCode } });
      if (!existing) break;
      affiliateCode = generateAffiliateCode(firstName, lastName);
      attempts++;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName: lastName || '',
        email,
        password: hashedPassword,
        affiliateCode,
        isAdmin: false,
      }
    });

    // Jika ada referral code, cek apakah ada kode yang di-assign ke email ini
    if (referralCode) {
      const preClaimCode = await prisma.preClaimAffiliateCode.findFirst({
        where: {
          code: referralCode,
          assignedEmail: email,
          status: 'unclaimed',
        }
      });

      if (preClaimCode) {
        // Auto-claim kode yang sudah di-assign
        await prisma.preClaimAffiliateCode.update({
          where: { id: preClaimCode.id },
          data: {
            claimedBy: newUser.id,
            claimedAt: new Date(),
            status: 'claimed',
          }
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Akun affiliate berhasil dibuat. Silakan login.',
      affiliateCode,
      email,
    }, { status: 201 });
  } catch (error) {
    console.error('Error registering affiliate:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mendaftar' },
      { status: 500 }
    );
  }
}
