require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://zarnetic:ii4CtWkFbpKDDa7V@cluster0.3u9nmlh.mongodb.net/careplus?retryWrites=true&w=majority';

const DonorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  pan_number: { type: String, required: false },
  created_at: { type: Date, default: Date.now },
});
const Donor = mongoose.models.Donor || mongoose.model('Donor', DonorSchema);

const DonationSchema = new mongoose.Schema({
  donor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor', required: true },
  amount: { type: Number, required: true },
  razorpay_order_id: { type: String, required: true, unique: true },
  razorpay_payment_id: { type: String, required: false, unique: true, sparse: true },
  status: { type: String, enum: ['PENDING', 'SUCCESS', 'FAILED'], default: 'PENDING' },
  created_at: { type: Date, default: Date.now },
});
const Donation = mongoose.models.Donation || mongoose.model('Donation', DonationSchema);

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String, required: false },
  author: { type: String, default: 'Admin' },
}, { timestamps: true });
const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

const GalleryItemSchema = new mongoose.Schema({
  title: { type: String, required: false },
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const GalleryItem = mongoose.models.GalleryItem || mongoose.model('GalleryItem', GalleryItemSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB');

    await Donation.deleteMany({});
    await Donor.deleteMany({});
    await Blog.deleteMany({});
    await GalleryItem.deleteMany({});
    console.log('Cleared old data');

    for (let i = 1; i <= 10; i++) {
      const donor = await Donor.create({
        name: `Donor ${i}`,
        email: `donor${i}@example.com`,
        phone: `987654321${i % 10}`,
        pan_number: `ABCDE1234${String.fromCharCode(64 + i)}`,
      });
      const statuses = ['SUCCESS', 'PENDING', 'FAILED'];
      const status = statuses[i % 3];
      await Donation.create({
        donor_id: donor._id,
        amount: i * 1000 + 500,
        razorpay_order_id: `order_dummy_${i}_${Date.now()}`,
        razorpay_payment_id: status === 'SUCCESS' ? `pay_dummy_${i}_${Date.now()}` : undefined,
        status: status,
      });
    }
    console.log('Seeded donors & donations');

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
    await Blog.insertMany(blogsData);
    console.log('Seeded blogs');

    const galleryData = [
      { title: 'Health Camp 2026', imageUrl: 'https://picsum.photos/seed/gallery1/600/400' },
      { title: 'Education Drive', imageUrl: 'https://picsum.photos/seed/gallery2/600/400' },
      { title: 'Community Outreach', imageUrl: 'https://picsum.photos/seed/gallery3/600/400' },
      { title: 'Skill Development Workshop', imageUrl: 'https://picsum.photos/seed/gallery4/600/400' }
    ];
    await GalleryItem.insertMany(galleryData);
    console.log('Seeded gallery');

    console.log('Done!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();

