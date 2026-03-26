import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const users = [
    { email: "superadmin@league.com", name: "Super Admin", role: "superadmin" as const, password: "superadmin123" },
    { email: "admin@league.com", name: "Admin Liga", role: "admin" as const, password: "admin123" },
    { email: "adminequipo@league.com", name: "Admin Equipo", role: "admin_equipo" as const, password: "adminequipo123" },
  ];

  for (const u of users) {
    const hashed = await bcrypt.hash(u.password, 10);
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: { email: u.email, name: u.name, role: u.role, password: hashed },
    });
  }

  return NextResponse.json({ ok: true, message: "Usuarios creados correctamente" });
}
