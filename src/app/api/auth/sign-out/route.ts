import { NextResponse } from 'next/server';

export async function POST(_req: Request) {
  console.log('Signed out');

  return NextResponse.json({ success: true });
}
