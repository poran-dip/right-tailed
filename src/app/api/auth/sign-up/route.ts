import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { name, email, password, confirmPassword } = await req.json();

  if (!name || !email || !password || !confirmPassword) {
    return NextResponse.json(
      { success: false, error: "All fields are required" },
      { status: 400 }
    );
  }

  if (password !== confirmPassword) {
    return NextResponse.json(
      { success: false, error: "Passwords don't match" },
      { status: 400 }
    )
  }

  console.log(name, email, password, confirmPassword);

  return NextResponse.json({ success: true });
}
