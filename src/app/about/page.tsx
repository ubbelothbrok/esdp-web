"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutDetailed from "@/components/AboutDetailed";
import BlurText from "@/components/BlurText";
import ClickSpark from "@/components/ClickSpark";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-[#F26522] selection:text-white">
      <Navbar />
      
      {/* ── Premium About Hero ── */}
      <ClickSpark sparkColor="#8B5CF6" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
        <section className="relative w-full pt-44 pb-32 overflow-hidden flex flex-col items-center justify-center">
          {/* Background Ribbon Ornament */}
          <div className="absolute inset-x-0 top-0 h-[600px] pointer-events-none z-0">
             <svg className="w-full h-full opacity-40" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  initial={{ d: "M-100,200 C300,300 600,100 900,250 C1200,400 1500,200 1800,300" }}
                  animate={{ 
                    d: [
                      "M-100,200 C300,300 600,100 900,250 C1200,400 1500,200 1800,300",
                      "M-100,250 C300,200 600,150 900,200 C1200,250 1500,350 1800,250",
                      "M-100,200 C300,300 600,100 900,250 C1200,400 1500,200 1800,300"
                    ]
                  }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                  stroke="url(#about_grad)"
                  strokeWidth="80"
                  strokeLinecap="round"
                  className="blur-[60px]"
                />
                <defs>
                  <linearGradient id="about_grad" x1="-100" y1="200" x2="1800" y2="300" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#A855F7" />
                    <stop offset="1" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
             </svg>
          </div>

          <div className="relative z-20 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
               <div className="inline-flex items-center space-x-2 bg-purple-50 border border-purple-100 rounded-full px-4 py-1.5 mb-8 shadow-sm">
                <span className="text-[10px] font-bold text-purple-600 uppercase tracking-[0.2em]">Institutional Partnership</span>
              </div>

              <BlurText
                text="The Power of Collaboration"
                delay={50}
                animateBy="words"
                direction="top"
                className="text-6xl md:text-8xl lg:text-9xl font-black text-black leading-[0.9] tracking-tighter mb-10"
              />

              <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
                Learn about the visionaries behind A-ESDP 2026: The Ministry of MSME and IIT Jammu. A joint commitment to India's entrepreneurial future.
              </p>
            </motion.div>
          </div>
        </section>
      </ClickSpark>

      <AboutDetailed />
      
      <Footer />
    </main>
  );
}
