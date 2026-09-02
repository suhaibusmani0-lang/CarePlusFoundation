import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.galleryItem.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Gallery item deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting gallery item:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { title, imageUrl } = await req.json();

    const updatedItem = await prisma.galleryItem.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(imageUrl !== undefined && { imageUrl }),
      },
    });

    return NextResponse.json(updatedItem);
  } catch (error: any) {
    console.error('Error updating gallery item:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
