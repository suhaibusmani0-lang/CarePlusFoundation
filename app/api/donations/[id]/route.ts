import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const { amount, status, razorpay_payment_id } = await req.json();
    const updated = await prisma.donation.update({
      where: { id },
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

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    await prisma.donation.delete({
      where: { id }
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

