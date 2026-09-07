import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { amount, status, razorpay_payment_id } = await req.json();
    const updated = await prisma.donation.update({
      where: { id: params.id },
      data: {
        ...(amount && { amount: Number(amount) }),
        ...(status && { status }),
        ...(razorpay_payment_id && { razorpay_payment_id }),
      },
      include: { donor: true }
    });
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.donation.delete({
      where: { id: params.id }
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
