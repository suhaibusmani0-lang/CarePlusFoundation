import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error: any) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { title, content, imageUrl, author } = await req.json();

    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(author !== undefined && { author }),
      },
    });

    return NextResponse.json(updatedBlog);
  } catch (error: any) {
    console.error('Error updating blog:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await prisma.blog.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
