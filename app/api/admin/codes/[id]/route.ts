import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { requireAuth } from '@/lib/simple-auth';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAuth();

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
    });

    if (!user?.isAdmin) {
      return NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 });
    }

    // Get the code
    const code = await prisma.preClaimAffiliateCode.findUnique({
      where: { id: params.id },
    });

    if (!code) {
      return NextResponse.json({ error: 'Code not found' }, { status: 404 });
    }

    // Check if code can be deleted
    if (code.status === 'claimed') {
      return NextResponse.json({ 
        error: 'Cannot delete claimed code' 
      }, { status: 400 });
    }

    if (code.usageCount > 0) {
      return NextResponse.json({ 
        error: 'Cannot delete code that has been used' 
      }, { status: 400 });
    }

    // Delete the code
    await prisma.preClaimAffiliateCode.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true, message: 'Code deleted successfully' });
  } catch (error) {
    console.error('Error deleting code:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
