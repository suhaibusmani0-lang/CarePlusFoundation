import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

function getRazorpay() {
  const key_id = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    throw new Error('Razorpay keys are not configured properly');
  }

  return new Razorpay({
    key_id,
    key_secret,
  });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.student_name || !data.dob || !data.gender || !data.class || !data.school_name || !data.parent_name || !data.parent_mobile || !data.address) {
      return NextResponse.json({ error: 'Please fill in all mandatory fields' }, { status: 400 });
    }
    
    // Create razorpay order for ₹199
    const razorpay = getRazorpay();
    const order = await razorpay.orders.create({
      amount: 199 * 100, // in paise
      currency: 'INR',
      receipt: `buniyaad_${Date.now()}`,
    });

    // Generate a unique enrollment number (e.g., BSE26-123456)
    let enrollment_number = 'BSE26-' + Math.floor(100000 + Math.random() * 900000).toString();
    const existing = await prisma.scholarshipApplication.findUnique({
      where: { enrollment_number }
    });
    if (existing) {
      enrollment_number = 'BSE26-' + Date.now().toString().slice(-6);
    }

    // Save initial application in DB
    const application = await prisma.scholarshipApplication.create({
      data: {
        enrollment_number,
        student_name: data.student_name.trim(),
        dob: data.dob,
        gender: data.gender,
        class: data.class,
        section: data.section ? data.section.trim() : null,
        school_name: data.school_name.trim(),
        school_address: data.school_address ? data.school_address.trim() : null,
        student_mobile: data.student_mobile ? data.student_mobile.trim() : null,
        parent_name: data.parent_name.trim(),
        mother_name: data.mother_name ? data.mother_name.trim() : null,
        parent_mobile: data.parent_mobile.trim(),
        email: data.email ? data.email.trim() : null,
        address: data.address.trim(),
        city: data.city ? data.city.trim() : null,
        state: data.state ? data.state.trim() : null,
        pin_code: data.pin_code ? data.pin_code.trim() : null,
        category: data.category || null,
        religion: data.religion ? data.religion.trim() : null,
        referral_id: data.referral_id ? data.referral_id.trim() : null,
        razorpay_order_id: order.id,
        amount: 199,
        status: 'PENDING'
      }
    });

    return NextResponse.json({ 
      order, 
      application_id: application.id, 
      enrollment_number,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID 
    });
  } catch (error: any) {
    console.error('Error creating scholarship order:', error);
    const message = error.message || 'Failed to create registration order. Please try again.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
