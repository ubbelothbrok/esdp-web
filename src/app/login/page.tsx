"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft, Sun } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        router.push("/admin/programs");
      } else {
        setError("Invalid credentials.");
      }
    } catch (err) {
      setError("An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080d17] flex flex-col relative font-sans">
      {/* Main Content Centered */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-[340px] space-y-6">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-2xl font-semibold text-white tracking-tight">Welcome to I2EDC</h2>
            <p className="text-[15px] text-slate-400">Sign in to continue</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#0d1321] border border-white/5 rounded-2xl px-5 py-3.5 text-[15px] text-white placeholder-slate-500 focus:outline-none focus:border-white/20 transition-colors"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0d1321] border border-white/5 rounded-2xl px-5 py-3.5 text-[15px] text-white placeholder-slate-500 focus:outline-none focus:border-white/20 transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black hover:bg-black/80 text-white rounded-2xl py-3.5 text-[15px] font-medium transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mt-2 shadow-[0_4px_14px_0_rgba(0,0,0,0.39)] border border-white/5"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Continue"}
            </button>
          </form>

          <div className="text-center pt-2">
            <span className="text-[13px] text-slate-400">
              Don't have an account?{" "}
              <Link href="/register" className="text-slate-300 hover:text-white transition-colors">
                Sign up
              </Link>
            </span>
          </div>
        </div>
      </div>

      {/* Floating Bottom Navigation/Icons */}
      <div className="absolute bottom-6 w-full px-6 flex justify-between items-center pointer-events-none">
        <Link href="/" className="pointer-events-auto p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-slate-300 hover:text-white transition-all">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        
        <button className="pointer-events-auto p-3 rounded-full hover:bg-white/5 text-slate-300 hover:text-white border border-transparent hover:border-white/5 transition-all">
          <Sun className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
