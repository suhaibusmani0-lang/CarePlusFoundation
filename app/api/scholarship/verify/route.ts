import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing required payment verification details' }, { status: 400 });
    }

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(sign)
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      const updated = await prisma.scholarshipApplication.update({
        where: { razorpay_order_id },
        data: { razorpay_payment_id, status: 'SUCCESS' },
      });
      return NextResponse.json({ 
        message: 'Payment verified successfully',
        application: updated
      });
    } else {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Error verifying scholarship payment:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
