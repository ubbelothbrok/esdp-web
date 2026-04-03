"use client";

import { useEffect, useState, useRef } from "react";
import { Plus, Trash2, Edit2, Loader2, X, Save, ImagePlus } from "lucide-react";

interface Program {
  id: number;
  slug: string;
  title: string;
  dates: string;
  deadline: string;
  coordinatorsText: string;
  description: string;
  whoCanApply: string;
  image: string | null;
}

const emptyForm = {
  slug: "",
  title: "",
  dates: "",
  deadline: "",
  coordinatorsText: "",
  description: "",
  whoCanApply: "",
};

export default function AdminPrograms() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchPrograms = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/programs/");
      if (res.ok) setPrograms(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchPrograms(); }, []);

  const openCreate = () => {
    setEditingProgram(null);
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview(null);
    setError("");
    setShowModal(true);
  };

  const openEdit = (prog: Program) => {
    setEditingProgram(prog);
    setForm({
      slug: prog.slug,
      title: prog.title,
      dates: prog.dates,
      deadline: prog.deadline,
      coordinatorsText: prog.coordinatorsText,
      description: prog.description,
      whoCanApply: prog.whoCanApply,
    });
    setImageFile(null);
    setImagePreview(prog.image ? `http://127.0.0.1:8000${prog.image}` : null);
    setError("");
    setShowModal(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError("");
    const token = localStorage.getItem("access");
    const isEdit = !!editingProgram;
    const url = isEdit
      ? `http://127.0.0.1:8000/api/programs/${editingProgram!.slug}/`
      : "http://127.0.0.1:8000/api/programs/";
    const method = isEdit ? "PUT" : "POST";

    // Use FormData to support file uploads
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (imageFile) formData.append("image", imageFile);

    try {
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          // Do NOT set Content-Type — browser sets it automatically with boundary for multipart
        },
        body: formData,
      });

      if (res.ok) {
        setShowModal(false);
        fetchPrograms();
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

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this program?")) return;
    const token = localStorage.getItem("access");
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/programs/${slug}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchPrograms();
      else alert("Failed to delete.");
    } catch (e) { console.error(e); }
  };

  const fields: { key: keyof typeof emptyForm; label: string; multiline?: boolean }[] = [
    { key: "title", label: "Program Title" },
    { key: "slug", label: "Slug (URL identifier, e.g. bio-entrepreneurship)" },
    { key: "dates", label: "Dates (e.g. Feb 16 – Feb 20, 2026)" },
    { key: "deadline", label: "Deadline (e.g. Feb 12, 2026)" },
    { key: "coordinatorsText", label: "Coordinators Text" },
    { key: "whoCanApply", label: "Who Can Apply" },
    { key: "description", label: "Description", multiline: true },
  ];

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
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Active Programs</h2>
            <p className="text-slate-500 mt-1">Manage and edit your upcoming ESDP tracks.</p>
          </div>
          <button
            onClick={openCreate}
            className="bg-[#0A192F] hover:bg-[#112240] text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Program
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="py-4 px-6">Image</th>
                <th className="py-4 px-6 text-slate-900 font-bold">Title</th>
                <th className="py-4 px-6">Dates</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {programs.map((prog) => (
                <tr key={prog.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6">
                    {prog.image ? (
                      <img
                        src={`http://127.0.0.1:8000${prog.image}`}
                        alt={prog.title}
                        className="w-14 h-10 object-cover rounded-lg border border-slate-200"
                      />
                    ) : (
                      <div className="w-14 h-10 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200">
                        <ImagePlus className="w-4 h-4 text-slate-400" />
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-semibold text-slate-900">{prog.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5">/{prog.slug}</div>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600">{prog.dates}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => openEdit(prog)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(prog.slug)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {programs.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-500">
                    No programs found. Create one.
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-xl font-black text-slate-900">
                {editingProgram ? "Edit Program" : "Create New Program"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm whitespace-pre-wrap font-mono">
                  {error}
                </div>
              )}

              {/* Image Upload Section */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Program Image
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative cursor-pointer group border-2 border-dashed border-slate-200 hover:border-[#F26522] rounded-xl transition-colors overflow-hidden"
                >
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="text-white text-sm font-semibold flex items-center gap-2">
                          <ImagePlus className="w-4 h-4" /> Change Image
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="h-40 flex flex-col items-center justify-center text-slate-400 group-hover:text-[#F26522] transition-colors">
                      <ImagePlus className="w-8 h-8 mb-2" />
                      <p className="text-sm font-semibold">Click to upload image</p>
                      <p className="text-xs mt-1">JPG, PNG recommended</p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                {imageFile && (
                  <p className="text-xs text-slate-500 mt-1.5">
                    Selected: <span className="font-medium text-slate-700">{imageFile.name}</span>
                  </p>
                )}
              </div>

              {fields.map(({ key, label, multiline }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    {label}
                  </label>
                  {multiline ? (
                    <textarea
                      rows={4}
                      value={form[key]}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                      className="w-full border border-slate-200 focus:border-[#F26522] focus:ring-1 focus:ring-[#F26522] rounded-xl px-4 py-3 text-sm text-slate-900 outline-none transition-colors resize-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={form[key]}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                      className="w-full border border-slate-200 focus:border-[#F26522] focus:ring-1 focus:ring-[#F26522] rounded-xl px-4 py-3 text-sm text-slate-900 outline-none transition-colors"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-100">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#F26522] rounded-xl hover:bg-[#FF834A] disabled:opacity-70 transition-colors flex items-center"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {editingProgram ? "Save Changes" : "Create Program"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
