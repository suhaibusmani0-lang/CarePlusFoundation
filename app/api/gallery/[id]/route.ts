import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const item = await prisma.galleryItem.findUnique({
      where: { id },
    });

    if (!item) {
      return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error: any) {
    console.error('Error fetching gallery item:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await prisma.galleryItem.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Gallery item deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting gallery item:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
