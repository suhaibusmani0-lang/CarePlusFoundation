export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Clear existing data
    await prisma.donation.deleteMany({});
    await prisma.donor.deleteMany({});
    await prisma.blog.deleteMany({});
    await prisma.galleryItem.deleteMany({});

    // 1. Seed Donors and Donations (10 dummy records)
    const donationsData = [];
    for (let i = 1; i <= 10; i++) {
      const donor = await prisma.donor.create({
        data: {
          name: `Donor ${i}`,
          email: `donor${i}@example.com`,
          phone: `987654321${i % 10}`,
          pan_number: `ABCDE1234${String.fromCharCode(64 + i)}`,
        },
      });

      const statuses = ['SUCCESS', 'PENDING', 'FAILED'];
      const status = statuses[i % 3] as 'SUCCESS' | 'PENDING' | 'FAILED';

      const donation = await prisma.donation.create({
        data: {
          donor_id: donor.id,
          amount: i * 1000 + 500,
          razorpay_order_id: `order_dummy_${i}_${Date.now()}`,
          razorpay_payment_id: status === 'SUCCESS' ? `pay_dummy_${i}_${Date.now()}` : null,
          status: status,
        },
      });
      donationsData.push(donation);
    }

    // 2. Seed Blogs (3 realistic blogs)
    const blogsData = [
      {
        title: 'Empowering Women Through Education',
        content: '<p>Education is the key to empowering women and girls, which helps bring about social equality. When you educate a woman, you educate a generation. Our recent programs have reached out to over 500 young girls in rural areas, providing them with school supplies and tutoring.</p>',
        imageUrl: 'https://picsum.photos/seed/blog1/800/400',
        author: 'Lata Kumari',
      },
      {
        title: 'Health and Hygiene Drives in Slums',
        content: '<p>Health and family welfare are one of our core pillars. Recently, we conducted a health and hygiene awareness camp in South Delhi. Over 200 families benefited from free health check-ups and hygiene kits distributed by our team.</p>',
        imageUrl: 'https://picsum.photos/seed/blog2/800/400',
        author: 'Mukesh',
      },
      {
        title: 'Food Processing Training for Rural Youth',
        content: '<p>As part of our livelihood generation program, we organized a food processing training workshop. Young individuals were taught basic food preservation techniques, equipping them with skills to start small-scale enterprises and become self-reliant.</p>',
        imageUrl: 'https://picsum.photos/seed/blog3/800/400',
        author: 'Admin',
      }
    ];

    await prisma.blog.createMany({
      data: blogsData,
    });

    // 3. Seed Gallery Items (4 items)
    const galleryData = [
      {
        title: 'Health Camp 2026',
        imageUrl: 'https://picsum.photos/seed/gallery1/600/400',
      },
      {
        title: 'Education Drive',
        imageUrl: 'https://picsum.photos/seed/gallery2/600/400',
      },
      {
        title: 'Community Outreach',
        imageUrl: 'https://picsum.photos/seed/gallery3/600/400',
      },
      {
        title: 'Skill Development Workshop',
        imageUrl: 'https://picsum.photos/seed/gallery4/600/400',
      }
    ];

    await prisma.galleryItem.createMany({
      data: galleryData,
    });

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      data: {
        donationsSeeded: donationsData.length,
        blogsSeeded: blogsData.length,
        gallerySeeded: galleryData.length,
      }
    });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({ success: false, message: 'Failed to seed database', error: String(error) }, { status: 500 });
  }
}

