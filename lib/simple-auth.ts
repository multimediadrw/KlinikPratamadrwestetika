import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';

const SESSION_COOKIE_NAME = 'admin_session';
const USER_ID_COOKIE_NAME = 'admin_user_id';
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSession(userId: string, userEmail?: string): Promise<string> {
  const sessionToken = Math.random().toString(36).substring(2) + Date.now().toString(36);
  const expiresAt = new Date(Date.now() + SESSION_DURATION);
  
  const cookieStore = await cookies();
  
  // Store session token in cookie
  cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  });

  // Store userId so getSession can look up the correct user
  cookieStore.set(USER_ID_COOKIE_NAME, userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  });

  // Also set user_email cookie for My Prime dashboard
  if (userEmail) {
    cookieStore.set('user_email', userEmail, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: expiresAt,
      path: '/',
    });
  }
  
  return sessionToken;
}

export async function getSession(): Promise<{ userId: string; email: string } | null> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME);
  
  if (!sessionToken) {
    return null;
  }

  // Try to get userId from cookie
  const userIdCookie = cookieStore.get(USER_ID_COOKIE_NAME);
  const emailCookie = cookieStore.get('user_email');

  if (userIdCookie?.value) {
    // Look up user by ID stored in cookie
    const user = await prisma.user.findFirst({
      where: {
        id: userIdCookie.value,
        isAdmin: true,
        password: { not: null },
      },
      select: { id: true, email: true }
    });
    return user ? { userId: user.id, email: user.email } : null;
  }

  if (emailCookie?.value) {
    // Fallback: look up by email cookie
    const user = await prisma.user.findFirst({
      where: {
        email: emailCookie.value,
        isAdmin: true,
        password: { not: null },
      },
      select: { id: true, email: true }
    });
    return user ? { userId: user.id, email: user.email } : null;
  }

  // Last fallback: any admin with password
  const user = await prisma.user.findFirst({
    where: {
      isAdmin: true,
      password: { not: null },
    },
    select: { id: true, email: true }
  });

  return user ? { userId: user.id, email: user.email } : null;
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  cookieStore.delete(USER_ID_COOKIE_NAME);
  cookieStore.delete('user_email');
}

export async function requireAuth(): Promise<{ userId: string; email: string }> {
  const session = await getSession();
  
  if (!session) {
    throw new Error('Unauthorized');
  }
  
  return session;
}

export async function login(email: string, password: string): Promise<{ success: boolean; error?: string; userId?: string }> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        isAdmin: true,
      }
    });
    
    if (!user || !user.password) {
      return { success: false, error: 'Invalid email or password' };
    }

    if (!user.isAdmin) {
      return { success: false, error: 'Access denied. Admin only.' };
    }
    
    const isValidPassword = await verifyPassword(password, user.password);
    
    if (!isValidPassword) {
      return { success: false, error: 'Invalid email or password' };
    }
    
    await createSession(user.id, user.email);
    
    return { success: true, userId: user.id };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'An error occurred during login' };
  }
}
