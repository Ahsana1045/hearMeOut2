import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { firstName, username, email, password } = await req.json();

  if (!firstName || !username || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ username }, { email }] },
  });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const hashedPassword = await hash(password, 10);

  const user = await prisma.user.create({
    data: {
      firstName,
      username,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ id: user.id, username: user.username, email: user.email });
}
