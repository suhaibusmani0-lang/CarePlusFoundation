const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  try {
    console.log('Connected to DB via Prisma');

    // Remove all old data
    await prisma.donation.deleteMany({});
    await prisma.donor.deleteMany({});
    await prisma.blog.deleteMany({});
    await prisma.galleryItem.deleteMany({});
    console.log('Cleared all old data completely.');

    // Seed Realistic Indian NGO Blogs
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
    console.log('Seeded real NGO blogs');

    // Seed Realistic Indian NGO Gallery Images
    const galleryData = [
      { title: 'Food Distribution Drive During Winter', imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop' },
      { title: 'Children Studying at Our Learning Center', imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop' },
      { title: 'Women Empowerment and Skill Training', imageUrl: 'https://images.unsplash.com/photo-1596423735880-5f2a689b903e?q=80&w=800&auto=format&fit=crop' },
      { title: 'Free Medical and Health Camp', imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop' },
      { title: 'Community Outreach Program', imageUrl: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=800&auto=format&fit=crop' },
      { title: 'Smiling Faces: Blanket Distribution', imageUrl: 'https://images.unsplash.com/photo-1593113565251-ce0566236b28?q=80&w=800&auto=format&fit=crop' }
    ];
    await prisma.galleryItem.createMany({ data: galleryData });
    console.log('Seeded real NGO gallery items');

    // Seed some realistic looking dummy donors so dashboard doesn't look empty
    const names = ['Ramesh Sharma', 'Anjali Gupta', 'Vikram Singh', 'Priya Desai', 'Suresh Kumar'];
    for (let i = 0; i < 5; i++) {
      const donor = await prisma.donor.create({
        data: {
          name: names[i],
          email: `${names[i].split(' ')[0].toLowerCase()}@example.com`,
          phone: `98765${Math.floor(10000 + Math.random() * 90000)}`,
          panNumber: `ABCDE${1234 + i}F`,
        }
      });
      await prisma.donation.create({
        data: {
          donorId: donor.id,
          amount: (i + 1) * 1100,
          razorpayOrderId: `order_realngo_${i}_${Date.now()}`,
          razorpayPaymentId: `pay_realngo_${i}_${Date.now()}`,
          status: 'SUCCESS',
        }
      });
    }
    console.log('Seeded Indian dummy donors & donations');

    console.log('Done! All data updated.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
