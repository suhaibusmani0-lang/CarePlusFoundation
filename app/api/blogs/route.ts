import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(blogs);
  } catch (error: any) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, content, imageUrl, author } = await req.json();

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        imageUrl: imageUrl || null,
        author: author || 'Admin',
      },
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error: any) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
