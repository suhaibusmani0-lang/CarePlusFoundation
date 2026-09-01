import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const galleryItems = await prisma.galleryItem.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(galleryItems);
  } catch (error: any) {
    console.error('Error fetching gallery items:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    const item = await prisma.galleryItem.create({
      data: {
        title: title || null,
        imageUrl,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error: any) {
    console.error('Error creating gallery item:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
