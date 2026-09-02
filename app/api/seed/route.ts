import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // 1. Delete all existing data
    await prisma.donation.deleteMany();
    await prisma.donor.deleteMany();
    await prisma.blog.deleteMany();
    await prisma.galleryItem.deleteMany();

    // 2. Seed Realistic Indian NGO Blogs
    const blogsData = [
      {
        title: 'Empowering Women Through Skill Development in Rural India',
        content: '<p>At <strong>Care Plus Foundation</strong>, we firmly believe that empowering a woman means empowering an entire generation. Recently, we inaugurated our new stitching and tailoring training center in a marginalized community in Delhi.</p><p>Over 50 women have enrolled in the first batch. Through this 6-month vocational course, they will learn essential skills to start their own micro-businesses or find employment in the textile industry. Financial independence is the first step towards a life of dignity, and we are committed to making this a reality for thousands of women.</p>',
        imageUrl: 'https://images.unsplash.com/photo-1596423735880-5f2a689b903e?q=80&w=800&auto=format&fit=crop',
        author: 'Lata Kumari',
      },
      {
        title: 'Education for All: Our Mission for Underprivileged Children',
        content: '<p>Education is a fundamental human right, yet countless children across Indian slums are deprived of it due to poverty. Our <strong>Shiksha Abhiyan</strong> initiative is dedicated to identifying out-of-school children and bringing them into mainstream education.</p><p>Last month, we successfully distributed school bags, stationery, and books to 200 children in South Delhi. Our volunteers also conduct free evening tuition classes to ensure these children receive the necessary academic support to stay in school and build a bright future.</p>',
        imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
        author: 'Admin',
      },
      {
        title: 'Mega Health Checkup Camp in Delhi Slums',
        content: '<p>Access to basic healthcare remains a major challenge for families living in urban slums. To bridge this gap, Care Plus Foundation organized a free Mega Medical Camp last week.</p><p>A team of 5 doctors, including pediatricians and general physicians, provided free consultations to over 300 residents. We distributed free medicines, vitamin supplements, and conducted hygiene awareness sessions to prevent seasonal diseases. Health is wealth, and we strive to protect the vulnerable sections of our society.</p>',
        imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop',
        author: 'Dr. R. K. Sharma',
      }
    ];
    await prisma.blog.createMany({ data: blogsData });

    // 3. Seed Realistic Indian NGO Gallery Images
    const galleryData = [
      { title: 'Food Distribution Drive During Winter', imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop' },
      { title: 'Children Studying at Our Learning Center', imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop' },
      { title: 'Women Empowerment and Skill Training', imageUrl: 'https://images.unsplash.com/photo-1596423735880-5f2a689b903e?q=80&w=800&auto=format&fit=crop' },
      { title: 'Free Medical and Health Camp', imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop' },
      { title: 'Community Outreach Program', imageUrl: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=800&auto=format&fit=crop' },
      { title: 'Smiling Faces: Blanket Distribution', imageUrl: 'https://images.unsplash.com/photo-1593113565251-ce0566236b28?q=80&w=800&auto=format&fit=crop' }
    ];
    await prisma.galleryItem.createMany({ data: galleryData });

    // 4. Seed some realistic looking dummy donors so dashboard doesn't look empty
    const names = ['Ramesh Sharma', 'Anjali Gupta', 'Vikram Singh', 'Priya Desai', 'Suresh Kumar'];
    for (let i = 0; i < 5; i++) {
      const donor = await prisma.donor.create({
        data: {
          name: names[i],
          email: `${names[i].split(' ')[0].toLowerCase()}@example.com`,
          phone: `98765${Math.floor(10000 + Math.random() * 90000)}`,
          pan_number: `ABCDE${1234 + i}F`,
        }
      });
      await prisma.donation.create({
        data: {
          donor_id: donor.id,
          amount: (i + 1) * 1100,
          razorpay_order_id: `order_realngo_${i}_${Date.now()}`,
          razorpay_payment_id: `pay_realngo_${i}_${Date.now()}`,
          status: 'SUCCESS',
        }
      });
    }

    return NextResponse.json({ message: 'Real Indian NGO Data Seeded Successfully!' });
  } catch (error: any) {
    console.error('Seed Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
