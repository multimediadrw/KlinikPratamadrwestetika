import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/simple-auth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { codeId } = body;

    if (!codeId) {
      return NextResponse.json(
        { error: 'Code ID is required' },
        { status: 400 }
      );
    }

    // Find the code
    const code = await prisma.preClaimAffiliateCode.findUnique({
      where: { id: codeId },
    });

    if (!code) {
      return NextResponse.json({ error: 'Code not found' }, { status: 404 });
    }

    // Only allow deleting unclaimed codes
    if (code.status === 'claimed') {
      return NextResponse.json(
        { error: 'Cannot delete claimed codes' },
        { status: 400 }
      );
    }

    // Check if code has been used
    if (code.usageCount > 0) {
      return NextResponse.json(
        { error: 'Cannot delete codes that have been used' },
        { status: 400 }
      );
    }

    // Delete the code
    await prisma.preClaimAffiliateCode.delete({
      where: { id: codeId },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: 'DELETE_CODE',
        entity: 'PreClaimAffiliateCode',
        entityId: code.id,
        userId: session.email, // Admin email who performed the action
        changes: JSON.stringify({
          code: code.code,
          assignedEmail: code.assignedEmail,
          status: code.status,
          action: 'deleted',
        }),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Code deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting code:', error);
    return NextResponse.json(
      { error: 'Failed to delete code' },
      { status: 500 }
    );
  }
}
