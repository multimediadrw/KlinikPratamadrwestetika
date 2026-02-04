import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    // Only admin can grant front office access
    await requireAdmin();

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Grant front office access
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { isFrontOffice: true },
    });

    return NextResponse.json({
      message: 'Front office access granted successfully',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        isFrontOffice: updatedUser.isFrontOffice,
        isAdmin: updatedUser.isAdmin,
      },
    });
  } catch (error) {
    console.error('Error granting front office access:', error);
    
    if (error instanceof Error && (error.message === 'Unauthorized' || error.message.includes('Forbidden'))) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message === 'Unauthorized' ? 401 : 403 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to grant front office access' },
      { status: 500 }
    );
  }
}
