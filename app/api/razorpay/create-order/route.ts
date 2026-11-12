import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import prisma from '@/lib/prisma';

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
    const { amount, name, email, phone, pan_number } = await req.json();
    if (!amount || !name || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const razorpay = getRazorpay();
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    });

    let donor = await prisma.donor.findFirst({ where: { email } });
    if (!donor) {
      donor = await prisma.donor.create({ data: { name, email, phone, pan_number } });
    }
    await prisma.donation.create({
      data: { donor_id: donor.id, amount: Number(amount), razorpay_order_id: order.id, status: 'PENDING' },
    });
    return NextResponse.json({ 
      order,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID
    });
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
