"use client";

import { useSession } from "next-auth/react";

const ROLE_LABELS: Record<string, string> = {
  superadmin: "Super Admin",
  admin: "Admin",
  admin_equipo: "Admin Equipo",
};

const ROLE_DESCRIPTIONS: Record<string, string> = {
  superadmin: "Tienes acceso completo al sistema. Puedes gestionar usuarios, ligas, equipos y toda la configuracion.",
  admin: "Puedes gestionar ligas y equipos asignados a tu cuenta.",
  admin_equipo: "Puedes gestionar tu equipo, sus jugadores y participar como jugador si es necesario.",
};

export default function DashboardPage() {
  const { data: session } = useSession();
  if (!session) return null;

  const role = session.user.role;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Bienvenido, {session.user.name}
        </h2>
        <p className="text-gray-500 mt-1">{ROLE_DESCRIPTIONS[role]}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Rol</p>
          <p className="text-xl font-bold text-gray-900">{ROLE_LABELS[role]}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Email</p>
          <p className="text-xl font-bold text-gray-900 truncate">{session.user.email}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500 mb-1">Estado</p>
          <p className="text-xl font-bold text-green-600">Activo</p>
        </div>
      </div>
    </div>
  );
}
