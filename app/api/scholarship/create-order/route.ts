import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import prisma from '@/lib/prisma';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Create razorpay order for ₹270
    const order = await razorpay.orders.create({
      amount: 270 * 100, // in paise
      currency: 'INR',
      receipt: `buniyaad_${Date.now()}`,
    });

    // Generate a unique enrollment number (e.g., BSE26-123456)
    const enrollment_number = 'BSE26-' + Math.floor(100000 + Math.random() * 900000).toString();

    // Save initial application in DB
    const application = await prisma.scholarshipApplication.create({
      data: {
        enrollment_number,
        student_name: data.student_name,
        dob: data.dob,
        gender: data.gender,
        class: data.class,
        section: data.section || null,
        school_name: data.school_name,
        school_address: data.school_address || null,
        student_mobile: data.student_mobile || null,
        parent_name: data.parent_name,
        mother_name: data.mother_name || null,
        parent_mobile: data.parent_mobile,
        email: data.email || null,
        address: data.address,
        city: data.city || null,
        state: data.state || null,
        pin_code: data.pin_code || null,
        category: data.category || null,
        religion: data.religion || null,
        referral_id: data.referral_id || null,
        razorpay_order_id: order.id,
        amount: 270,
        status: 'PENDING'
      }
    });

    return NextResponse.json({ order, application_id: application.id, enrollment_number });
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

