"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRegistrations = async () => {
    const token = localStorage.getItem("access");
    try {
      const res = await fetch("http://127.0.0.1:8000/api/registrations/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        setRegistrations(await res.json());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#F26522]" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Recent Registrations</h2>
          <p className="text-slate-500 mt-1">Review the latest applications for your programs.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
              <th className="py-4 px-6 text-slate-900 font-bold">Applicant Name</th>
              <th className="py-4 px-6">Email Contact</th>
              <th className="py-4 px-6">Institution</th>
              <th className="py-4 px-6">Category</th>
              <th className="py-4 px-6">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {registrations.map((reg) => (
              <tr key={reg.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-4 px-6 font-semibold text-slate-900">{reg.full_name}</td>
                <td className="py-4 px-6 text-sm text-slate-600">{reg.email}</td>
                <td className="py-4 px-6 text-sm text-slate-600">{reg.institution}</td>
                <td className="py-4 px-6 text-sm">
                  <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-semibold capitalize border border-blue-100">
                    {reg.category}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-slate-500">
                  {new Date(reg.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {registrations.length === 0 && (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-500">
                  No registrations found yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
