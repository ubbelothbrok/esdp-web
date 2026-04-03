"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Edit2, Loader2, X, Save, Linkedin, UserPlus } from "lucide-react";

interface Mentor {
  id: number;
  name: string;
  role: string;
  bio: string;
  initials: string;
  color: string;
  linkedin_url: string;
}

const emptyForm = {
  name: "",
  role: "",
  bio: "",
  initials: "",
  color: "bg-blue-600",
  linkedin_url: "",
};

const colorOptions = [
  { name: "Blue", value: "bg-blue-600" },
  { name: "Orange", value: "bg-orange-500" },
  { name: "Indigo", value: "bg-indigo-600" },
  { name: "Emerald", value: "bg-emerald-600" },
  { name: "Purple", value: "bg-purple-600" },
  { name: "Rose", value: "bg-rose-500" },
  { name: "Slate", value: "bg-slate-600" },
];

export default function AdminMentors() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMentor, setEditingMentor] = useState<Mentor | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchMentors = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/mentors/");
      if (res.ok) setMentors(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchMentors(); }, []);

  const openCreate = () => {
    setEditingMentor(null);
    setForm(emptyForm);
    setError("");
    setShowModal(true);
  };

  const openEdit = (mentor: Mentor) => {
    setEditingMentor(mentor);
    setForm({
      name: mentor.name,
      role: mentor.role,
      bio: mentor.bio,
      initials: mentor.initials,
      color: mentor.color,
      linkedin_url: mentor.linkedin_url || "",
    });
    setError("");
    setShowModal(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError("");
    const token = localStorage.getItem("access");
    const isEdit = !!editingMentor;
    const url = isEdit
      ? `http://127.0.0.1:8000/api/mentors/${editingMentor!.id}/`
      : "http://127.0.0.1:8000/api/mentors/";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setShowModal(false);
        fetchMentors();
      } else {
        const data = await res.json();
        setError(JSON.stringify(data, null, 2));
      }
    } catch (e) {
      setError("Network error. Is the backend running?");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this mentor?")) return;
    const token = localStorage.getItem("access");
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/mentors/${id}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchMentors();
      else alert("Failed to delete.");
    } catch (e) { console.error(e); }
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#F26522]" />
      </div>
    );
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Mentors</h2>
            <p className="text-slate-500 mt-1">Manage the expert guides shown on the landing page.</p>
          </div>
          <button
            onClick={openCreate}
            className="bg-[#0A192F] hover:bg-[#112240] text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Mentor
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="py-4 px-6">Avatar</th>
                <th className="py-4 px-6 text-slate-900 font-bold">Name & Role</th>
                <th className="py-4 px-6">Bio</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mentors.map((mentor) => (
                <tr key={mentor.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className={`w-12 h-12 rounded-full ${mentor.color} flex items-center justify-center text-white font-black text-sm border-2 border-white shadow-sm`}>
                      {mentor.initials}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-semibold text-slate-900">{mentor.name}</div>
                    <div className="text-xs text-[#F26522] font-medium">{mentor.role}</div>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600 max-w-xs truncate">
                    {mentor.bio}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => openEdit(mentor)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(mentor.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {mentors.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-500">
                    No mentors found. Add one to show on the homepage.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm overflow-y-auto py-8 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-xl font-black text-slate-900">
                {editingMentor ? "Edit Mentor" : "Add New Mentor"}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm font-mono whitespace-pre-wrap">{error}</div>}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-slate-200 focus:border-[#F26522] focus:ring-1 focus:ring-[#F26522] rounded-xl px-4 py-2.5 text-sm outline-none"
                    placeholder="Dr. John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Initials</label>
                  <input
                    type="text"
                    maxLength={2}
                    value={form.initials}
                    onChange={(e) => setForm({ ...form, initials: e.target.value.toUpperCase() })}
                    className="w-full border border-slate-200 focus:border-[#F26522] focus:ring-1 focus:ring-[#F26522] rounded-xl px-4 py-2.5 text-sm outline-none"
                    placeholder="JD"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Role / Position</label>
                <input
                  type="text"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full border border-slate-200 focus:border-[#F26522] focus:ring-1 focus:ring-[#F26522] rounded-xl px-4 py-2.5 text-sm outline-none"
                  placeholder="Director, IIT Jammu"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Brief Bio</label>
                <textarea
                  rows={3}
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="w-full border border-slate-200 focus:border-[#F26522] focus:ring-1 focus:ring-[#F26522] rounded-xl px-4 py-2.5 text-sm outline-none resize-none"
                  placeholder="Briefly describe their expertise..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">LinkedIn URL (Optional)</label>
                <input
                  type="url"
                  value={form.linkedin_url}
                  onChange={(e) => setForm({ ...form, linkedin_url: e.target.value })}
                  className="w-full border border-slate-200 focus:border-[#F26522] focus:ring-1 focus:ring-[#F26522] rounded-xl px-4 py-2.5 text-sm outline-none"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Theme Color</label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setForm({ ...form, color: opt.value })}
                      className={`w-8 h-8 rounded-full ${opt.value} border-2 transition-all ${
                        form.color === opt.value ? "border-slate-900 scale-110 shadow-md" : "border-transparent"
                      }`}
                      title={opt.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-100">
              <button onClick={() => setShowModal(false)} className="px-5 py-2 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-5 py-2 text-sm font-semibold text-white bg-[#F26522] rounded-xl hover:bg-[#FF834A] disabled:opacity-70 transition-colors flex items-center"
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                {editingMentor ? "Save Changes" : "Add Mentor"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
