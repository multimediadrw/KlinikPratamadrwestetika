import { auth } from '@clerk/nextjs/server';
import { prisma } from './prisma';

export async function getCurrentUser() {
  const { userId } = await auth();
  
  if (!userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  return user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error('Unauthorized');
  }

  return user;
}

export async function requireAdmin() {
  const user = await requireAuth();
  
  if (!user.isAdmin) {
    throw new Error('Forbidden: Admin access required');
  }

  return user;
}

export async function requireFrontOffice() {
  const user = await requireAuth();
  
  if (!user.isFrontOffice && !user.isAdmin) {
    throw new Error('Forbidden: Front office access required');
  }

  return user;
}
