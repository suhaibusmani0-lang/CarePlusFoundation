import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';
import { sendDonationConfirmationEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!).update(sign).digest('hex');
    if (razorpay_signature === expectedSign) {
      const updatedDonation = await prisma.donation.update({
        where: { razorpay_order_id },
        data: { razorpay_payment_id, status: 'SUCCESS' },
        include: { donor: true },
      });

      if (updatedDonation && updatedDonation.donor) {
        sendDonationConfirmationEmail(updatedDonation, updatedDonation.donor).catch((mailErr) => {
          console.error('Background donation email error:', mailErr);
        });
      }

      return NextResponse.json({ message: 'Payment verified successfully' });
    } else {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Error verifying payment:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
