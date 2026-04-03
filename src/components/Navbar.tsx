"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, LogIn, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Programs", href: "/programs" },
    { name: "About", href: "/about" },
    { name: "Schedule", href: "/schedule" },
    { name: "Speakers", href: "/#speakers" },
    { name: "FAQ", href: "/#faq" },
  ];


  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div
        className={`pointer-events-auto w-full max-w-5xl transition-all duration-300 rounded-full px-6 py-3 flex items-center justify-between shadow-lg ${
          isScrolled 
            ? "bg-white/90 backdrop-blur-xl border border-slate-200/50 shadow-slate-300/30" 
            : "bg-white/80 backdrop-blur-md border border-slate-200/30 shadow-slate-200/20"
        }`}
      >
        <div className="flex-shrink-0 flex items-center">
          <Link href="/" className="text-xl font-black tracking-tighter text-[#0A192F]">
            A-ESDP <span className="text-[#F26522]">2026</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-bold text-slate-700 hover:text-[#F26522] transition-colors tracking-wide"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-5">
          <Link
            href="/login"
            className="flex items-center bg-[#111827] text-white px-7 py-3.5 rounded-full text-[13px] font-bold tracking-widest hover:bg-[#1f2937] hover:scale-105 transform transition-all duration-200 shadow-lg"
          >
            GET STARTED
            <ArrowRight className="w-4 h-4 ml-2 stroke-[2.5]" />
          </Link>
        </div>

        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-700 hover:text-[#0A192F] p-1"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-[calc(100%+16px)] left-4 right-4 pointer-events-auto bg-white/95 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-200 shadow-2xl z-50"
          >
            <div className="px-5 py-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block px-4 py-3 text-lg font-bold text-slate-800 hover:text-[#F26522] hover:bg-slate-50 border border-transparent hover:border-slate-100 rounded-2xl transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-6 pb-2 space-y-3">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full bg-[#111827] text-white px-5 py-4 rounded-full text-sm font-bold tracking-widest hover:bg-[#1f2937] shadow-lg transition-colors"
                >
                  GET STARTED
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
