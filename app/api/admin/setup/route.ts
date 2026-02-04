import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

// POST - Make current user admin if no admin exists
export async function POST() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if any admin exists
    const adminExists = await prisma.user.findFirst({
      where: { isAdmin: true },
    });

    if (adminExists) {
      return NextResponse.json({ 
        error: 'Admin already exists',
        message: 'An admin user already exists in the system'
      }, { status: 400 });
    }

    // Get current user
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Make user admin
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { isAdmin: true },
    });

    return NextResponse.json({ 
      success: true,
      message: 'You are now an admin',
      user: {
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      }
    });
  } catch (error) {
    console.error('Error setting up admin:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
