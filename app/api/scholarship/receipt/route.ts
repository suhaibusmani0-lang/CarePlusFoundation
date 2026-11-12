import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const enrollmentNumber = searchParams.get('enrollmentNumber');
    const paymentId = searchParams.get('paymentId');
    const orderId = searchParams.get('orderId');
    const id = searchParams.get('id');

    if (!enrollmentNumber && !paymentId && !orderId && !id) {
      return NextResponse.json({ error: 'Missing identifier' }, { status: 400 });
    }

    const conditions = [];
    if (enrollmentNumber) conditions.push({ enrollment_number: enrollmentNumber });
    if (paymentId) conditions.push({ razorpay_payment_id: paymentId });
    if (orderId) conditions.push({ razorpay_order_id: orderId });
    if (id) conditions.push({ id });

    const application = await prisma.scholarshipApplication.findFirst({
      where: {
        OR: conditions,
      },
    });

    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json(application);
  } catch (error: any) {
    console.error('Error fetching scholarship receipt data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
