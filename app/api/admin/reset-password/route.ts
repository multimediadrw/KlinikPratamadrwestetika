import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// SECRET KEY - hanya bisa digunakan dengan secret yang benar
const RESET_SECRET = process.env.ADMIN_RESET_SECRET || 'drw-reset-2026';

// POST /api/admin/reset-password
// Body: { secret: string, email: string, newPassword: string }
export async function POST(request: NextRequest) {
  try {
    const { secret, email, newPassword } = await request.json();

    // Validasi secret
    if (secret !== RESET_SECRET) {
      return NextResponse.json({ error: 'Invalid secret key' }, { status: 403 });
    }

    if (!email || !newPassword) {
      return NextResponse.json({ error: 'Email and newPassword are required' }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    // Cari user berdasarkan email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found with that email' }, { status: 404 });
    }

    // Hash password baru
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password dan pastikan isAdmin = true
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        isAdmin: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Password berhasil direset untuk ${updatedUser.email}. Akun ini sekarang memiliki akses admin.`,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } catch (error: any) {
    console.error('Reset password error:', error);
    return NextResponse.json({
      error: 'Internal server error',
      details: error.message,
    }, { status: 500 });
  }
}

// GET - Cek daftar user admin yang ada
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  if (secret !== RESET_SECRET) {
    return NextResponse.json({ error: 'Invalid secret key' }, { status: 403 });
  }

  const admins = await prisma.user.findMany({
    where: { isAdmin: true },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      isAdmin: true,
      password: true,
    },
  });

  return NextResponse.json({
    admins: admins.map(a => ({
      id: a.id,
      email: a.email,
      name: `${a.firstName || ''} ${a.lastName || ''}`.trim(),
      isAdmin: a.isAdmin,
      hasPassword: !!a.password,
    })),
  });
}
