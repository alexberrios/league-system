"use client";

import { useSession } from "next-auth/react";

export default function EquiposPage() {
  const { data: session } = useSession();
  if (!session) return null;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Equipos</h2>
      <p className="text-gray-500 text-sm">Proximamente: gestion completa de equipos.</p>
    </div>
  );
}
