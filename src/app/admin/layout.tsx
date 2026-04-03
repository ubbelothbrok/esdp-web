"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, LogOut, CheckSquare } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    router.push("/login");
  };

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200 shadow-sm flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center">
          <div className="w-8 h-8 rounded-lg bg-[#F26522] flex items-center justify-center mr-3 text-white font-bold">
            ES
          </div>
          <h1 className="font-bold tracking-tight text-lg">Admin Portal</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/admin/programs"
            className={`flex items-center px-4 py-3 rounded-xl transition-colors font-medium text-sm ${
              pathname.includes("/admin/programs")
                ? "bg-orange-50 text-[#F26522]"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Manage Programs
          </Link>
          <Link
            href="/admin/registrations"
            className={`flex items-center px-4 py-3 rounded-xl transition-colors font-medium text-sm ${
              pathname.includes("/admin/registrations")
                ? "bg-orange-50 text-[#F26522]"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <CheckSquare className="w-5 h-5 mr-3" />
            Registrations
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Log Out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
