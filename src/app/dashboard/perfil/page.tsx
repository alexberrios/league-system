"use client";

import { useSession } from "next-auth/react";

const ROLE_LABELS: Record<string, string> = {
  superadmin: "Super Admin",
  admin: "Admin",
  admin_equipo: "Admin Equipo",
};

export default function PerfilPage() {
  const { data: session } = useSession();
  if (!session) return null;

  return (
    <div className="p-8 max-w-xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Mi Perfil</h2>
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
            {session.user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">{session.user.name}</p>
            <p className="text-gray-500 text-sm">{session.user.email}</p>
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Rol</p>
            <p className="font-medium text-gray-900 mt-0.5">{ROLE_LABELS[session.user.role]}</p>
          </div>
          <div>
            <p className="text-gray-400">ID</p>
            <p className="font-medium text-gray-900 mt-0.5 font-mono text-xs">{session.user.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
