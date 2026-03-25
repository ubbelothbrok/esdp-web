"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Cpu, Navigation, Zap, TrendingUp } from "lucide-react";
import BlurText from "./BlurText";
import ClickSpark from "./ClickSpark";

const slides = [
  {
    heading: "Nurturing MSME Innovation",
    sub: "A 5-day intensive programme at IIT Jammu, fully sponsored by the Ministry of MSME, designed to transform aspiring entrepreneurs into tomorrow's changemakers.",
  },
  {
    heading: "Empowering Entrepreneurs",
    sub: "Unlock cutting-edge skills in AI, Smart Manufacturing, Bio-Entrepreneurship, and Sustainable Agriculture — all under one roof.",
  },
  {
    heading: "Launch Your Startup Journey",
    sub: "Gain mentorship, hands-on workshops, and networking opportunities with industry leaders and IIT Jammu faculty.",
  },
];

const GlossyCoin = ({ icon: Icon, color, delay = 0, className = "" }: { icon: any, color: string, delay?: number, className?: string }) => (
  <motion.div
    initial={{ y: 0, rotateZ: 0 }}
    animate={{ 
      y: [-15, 15, -15],
      rotateZ: [-10, 10, -10]
    }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
    className={`absolute z-10 ${className}`}
  >
    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center relative overflow-hidden shadow-2xl border-t-2 border-white/50 backdrop-blur-sm`}
         style={{ background: `linear-gradient(135deg, ${color} 0%, #ffffff 100%)` }}>
      {/* Glossy overlay */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-white/30 rounded-full blur-[2px]" />
      <Icon className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" strokeWidth={1.5} />
      {/* Inner Shadow */}
      <div className="absolute inset-0 rounded-full shadow-[inset_0_-4px_12px_rgba(0,0,0,0.2)]" />
    </div>
  </motion.div>
);

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ClickSpark sparkColor="#8B5CF6" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
      <section className="relative w-full min-h-screen overflow-hidden bg-white flex flex-col items-center justify-center pt-24 pb-20">
        
        {/* ── Background Wavy Mesh Ribbon ── */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg className="w-full h-full opacity-60" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              initial={{ d: "M-100,600 C200,500 400,700 800,500 C1200,300 1400,500 1600,400" }}
              animate={{ 
                d: [
                  "M-100,600 C200,500 400,700 800,500 C1200,300 1400,500 1600,400",
                  "M-100,550 C250,550 450,650 850,450 C1250,250 1450,550 1600,350",
                  "M-100,600 C200,500 400,700 800,500 C1200,300 1400,500 1600,400"
                ]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              stroke="url(#paint0_linear)"
              strokeWidth="120"
              strokeLinecap="round"
              className="opacity-20 blur-3xl"
            />
            <defs>
              <linearGradient id="paint0_linear" x1="-100" y1="500" x2="1600" y2="400" gradientUnits="userSpaceOnUse">
                <stop stopColor="#A855F7" />
                <stop offset="1" stopColor="white" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* ── Floating 3D/Glossy Elements ── */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 max-w-7xl mx-auto z-10 w-full hidden lg:block h-full">
          {/* Central Portal Torus */}
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute top-[35%] left-[10%] w-[350px] h-[350px] border-[1px] border-purple-200 rounded-full opacity-20 pointer-events-none"
          />
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: -360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute top-[32%] left-[8%] w-[400px] h-[400px] border-[1px] border-purple-100 rounded-full opacity-10 pointer-events-none"
          />

          {/* Group of Glossy Coins */}
          <GlossyCoin icon={Cpu} color="#A855F7" delay={0} className="top-[30%] left-[15%]" />
          <GlossyCoin icon={Navigation} color="#3B82F6" delay={1.5} className="top-[45%] left-[5%]" />
          <GlossyCoin icon={Zap} color="#EC4899" delay={3} className="top-[55%] left-[18%]" />
          <GlossyCoin icon={TrendingUp} color="#F59E0B" delay={4.5} className="top-[40%] left-[22%]" />
        </div>

        {/* ── Main Foreground Content (Centered) ── */}
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            key={`content-${current}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* MSME badge */}
            <div className="inline-flex items-center space-x-2 bg-slate-100/80 backdrop-blur-md border border-slate-200 rounded-full px-4 py-2 mb-10 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F26522] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F26522]" />
              </span>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">Next-Gen Innovation Platform</span>
            </div>

            <BlurText
              key={`heading-${current}`}
              text={slides[current].heading}
              delay={50}
              animateBy="words"
              direction="top"
              className="text-6xl md:text-8xl lg:text-9xl font-black text-black leading-[0.9] tracking-tighter mb-10"
            />

            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${current}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl text-slate-500 max-w-2xl mb-14 leading-relaxed font-medium"
              >
                {slides[current].sub}
              </motion.p>
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <Link
                href="/register"
                className="px-10 py-5 bg-black text-white hover:bg-purple-600 transition-all duration-300 rounded-2xl font-black text-lg shadow-2xl flex items-center group"
              >
                Join Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/programs"
                className="px-10 py-5 bg-slate-50 text-slate-900 border border-slate-200 rounded-2xl font-black text-lg hover:bg-slate-100 transition-all duration-300"
              >
                Browse Collection
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ── Dot indicators (Centered) ── */}
        <div className="absolute bottom-16 z-20 flex items-center space-x-4">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-3 h-3 rounded-full transition-all duration-500 border-2 ${
                i === current ? "bg-black border-black w-10" : "bg-transparent border-slate-300 hover:border-slate-500"
              }`}
            />
          ))}
        </div>

      </section>
    </ClickSpark>
  );
}



