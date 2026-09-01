import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const donations = await prisma.donation.findMany({
      include: {
        donor: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    return NextResponse.json(donations);
  } catch (error: any) {
    console.error('Error fetching donations:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
