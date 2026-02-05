import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const treatments = await prisma.treatment.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: [
        {
          category: {
            name: 'asc',
          },
        },
        {
          name: 'asc',
        },
      ],
    });

    const formatted = treatments.map((t) => ({
      id: t.id,
      name: t.name,
      price: Number(t.price),
      category: t.category.name,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error('Error fetching treatments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch treatments' },
      { status: 500 }
    );
  }
}
