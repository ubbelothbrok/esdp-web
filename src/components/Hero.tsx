"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlurText from "./BlurText";
import ClickSpark from "./ClickSpark";
import FloatingLines from "./FloatingLines";

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



export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ClickSpark sparkColor="#A855F7" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
      <section className="relative w-full min-h-screen overflow-hidden bg-[#030617] flex flex-col items-center justify-center pt-24 pb-20">
        
        {/* ── Background Floating Lines (New) ── */}
        <FloatingLines 
          linesGradient={["#A855F7", "#F26522", "#3B82F6"]} 
          animationSpeed={0.4}
          parallaxStrength={0.1}
        />


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
              className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.9] tracking-tighter mb-10 drop-shadow-2xl"
            />

            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${current}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl text-slate-300 max-w-2xl mb-14 leading-relaxed font-medium"
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
                className="px-10 py-5 bg-white/5 backdrop-blur-md text-white border border-white/10 rounded-2xl font-black text-lg hover:bg-white/10 transition-all duration-300"
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
                i === current ? "bg-white border-white w-10" : "bg-transparent border-white/20 hover:border-white/50"
              }`}
            />
          ))}
        </div>

      </section>
    </ClickSpark>
  );
}



