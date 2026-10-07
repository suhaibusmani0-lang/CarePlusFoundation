import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const applications = await prisma.scholarshipApplication.findMany({
      orderBy: { created_at: 'desc' },
    });
    return NextResponse.json(applications);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

