"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    src: "/hero1.png",
    heading: "Nurturing MSME Innovation",
    sub: "A 5-day intensive programme at IIT Jammu, fully sponsored by the Ministry of MSME, designed to transform aspiring entrepreneurs into tomorrow's changemakers.",
  },
  {
    src: "/hero2.png",
    heading: "Empowering Entrepreneurs",
    sub: "Unlock cutting-edge skills in AI, Smart Manufacturing, Bio-Entrepreneurship, and Sustainable Agriculture — all under one roof.",
  },
  {
    src: "/hero3.png",
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

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <section className="relative w-full min-h-screen overflow-hidden">

      {/* ── Sliding Backgrounds ── */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
            idx === current ? "opacity-100 z-0" : "opacity-0 -z-10"
          }`}
        >
          <img
            src={slide.src}
            alt={slide.heading}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              const fallbacks = [
                "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2000&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2000&auto=format&fit=crop",
              ];
              e.currentTarget.src = fallbacks[idx] ?? fallbacks[0];
            }}
          />
          {/* Dark gradient overlay so text is readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>
      ))}

      {/* ── Foreground Content ── */}
      <div className="relative z-10 flex flex-col items-start justify-center min-h-screen px-8 sm:px-16 lg:px-24 pt-28 pb-20 max-w-5xl">

        {/* MSME badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 mb-6"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F26522] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F26522]" />
          </span>
          <span className="text-xs font-semibold text-white uppercase tracking-wider">Fully Sponsored by MSME</span>
        </motion.div>

        {/* Animated Heading */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={`heading-${current}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.05] tracking-tight mb-6"
          >
            {slides[current].heading}
          </motion.h1>
        </AnimatePresence>

        {/* Animated Subheading */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`sub-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg lg:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed"
          >
            {slides[current].sub}
          </motion.p>
        </AnimatePresence>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link
            href="#register"
            className="px-8 py-4 bg-white text-[#0A192F] rounded-full font-bold text-lg hover:bg-[#F26522] hover:text-white transition-all shadow-xl flex items-center justify-center group"
          >
            Apply Now
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/programs"
            className="px-8 py-4 bg-transparent text-white border-2 border-white/60 rounded-full font-bold text-lg hover:border-white hover:bg-white/10 transition-all flex items-center justify-center"
          >
            Browse Programs
          </Link>
        </div>

      </div>



      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-8 h-3 bg-white" : "w-3 h-3 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

    </section>
  );
}
