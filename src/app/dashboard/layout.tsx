"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

const ROLE_LABELS: Record<string, string> = {
  superadmin: "Super Admin",
  admin: "Admin",
  admin_equipo: "Admin Equipo",
};

const ROLE_COLORS: Record<string, string> = {
  superadmin: "bg-purple-100 text-purple-800",
  admin: "bg-blue-100 text-blue-800",
  admin_equipo: "bg-green-100 text-green-800",
};

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        active ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {children}
    </Link>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  const role = session.user.role;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-lg font-bold text-gray-900">League System</h1>
          <p className="text-xs text-gray-400 mt-0.5">SouthGo</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavLink href="/dashboard">Inicio</NavLink>
          {["superadmin", "admin"].includes(role) && (
            <NavLink href="/dashboard/ligas">Ligas</NavLink>
          )}
          <NavLink href="/dashboard/equipos">Equipos</NavLink>
          {["superadmin"].includes(role) && (
            <NavLink href="/dashboard/usuarios">Usuarios</NavLink>
          )}
          <NavLink href="/dashboard/perfil">Mi Perfil</NavLink>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              {session.user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{session.user.name}</p>
              <span className={`inline-block text-xs px-1.5 py-0.5 rounded font-medium ${ROLE_COLORS[role]}`}>
                {ROLE_LABELS[role]}
              </span>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full text-sm text-gray-500 hover:text-red-600 text-left transition-colors"
          >
            Cerrar sesion
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
