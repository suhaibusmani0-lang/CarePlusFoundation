import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Total Donations (SUCCESS only)
    const successDonations = await prisma.donation.findMany({
      where: { status: 'SUCCESS' },
      select: { amount: true },
    });
    const totalAmount = successDonations.reduce((sum, d) => sum + d.amount, 0);

    // 2. Total Supporters
    const totalSupporters = await prisma.donor.count();

    // 3. Published Blogs
    const totalBlogs = await prisma.blog.count();

    // 4. Gallery Items
    const totalGalleryItems = await prisma.gallery.count();

    // 5. Recent Donations
    const recentDonations = await prisma.donation.findMany({
      take: 5,
      orderBy: { created_at: 'desc' },
      include: { donor: true },
    });

    return NextResponse.json({
      totalAmount,
      totalSupporters,
      totalBlogs,
      totalGalleryItems,
      recentDonations: recentDonations.map(d => ({
        id: d.id,
        name: d.donor?.name || 'Unknown',
        amount: d.amount,
        date: d.created_at,
        status: d.status,
      }))
    });
  } catch (error: any) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
