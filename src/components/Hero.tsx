"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Set event date to April 15, 2026 for demonstration
    const eventDate = new Date("2026-04-15T09:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50 min-h-screen flex items-center">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/50 blur-3xl opacity-60" />
        <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-orange-100/30 blur-3xl opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-md border border-slate-200 rounded-full px-4 py-1.5 mb-6">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F26522] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F26522]"></span>
              </span>
              <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Fully Sponsored by MSME</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#0A192F] tracking-tight mb-6 leading-[1.1]">
              Nurturing <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A192F] to-[#F26522]">MSME Innovation</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Join the brightest aspiring entrepreneurs and engineering students at IIT Jammu for an intensive program focused on clean-tech, smart manufacturing, and bio-entrepreneurship.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-10">
              <Link
                href="#register"
                className="w-full sm:w-auto px-8 py-4 bg-[#0A192F] text-white rounded-full font-bold text-lg hover:bg-[#F26522] transition-colors shadow-lg shadow-blue-900/20 flex items-center justify-center group"
              >
                Apply Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#schedule"
                className="w-full sm:w-auto px-8 py-4 bg-white text-[#0A192F] border border-slate-200 rounded-full font-bold text-lg hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-center"
              >
                View Schedule
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-8 text-sm font-medium text-slate-500">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-[#F26522]" />
                April 15-18, 2026
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-[#F26522]" />
                IIT Jammu, Jagti Campus
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:ml-auto w-full max-w-md mx-auto lg:max-w-none"
          >
            <div className="glass-dark rounded-3xl p-8 relative overflow-hidden backdrop-blur-2xl border border-white/10 shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F26522] rounded-full mix-blend-screen filter blur-[60px] opacity-30 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-400 rounded-full mix-blend-screen filter blur-[60px] opacity-20 pointer-events-none" />
              
              <h3 className="text-white text-xl font-bold mb-6 text-center antialiased">Registration Closes In</h3>
              
              {mounted && (
                <div className="grid grid-cols-4 gap-3 md:gap-4 text-center">
                  <div className="bg-white/10 rounded-2xl p-3 md:p-4 border border-white/5 backdrop-blur-md">
                    <div className="text-3xl md:text-4xl font-black text-white tabular-nums">{timeLeft.days}</div>
                    <div className="text-[10px] md:text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Days</div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-3 md:p-4 border border-white/5 backdrop-blur-md">
                    <div className="text-3xl md:text-4xl font-black text-white tabular-nums">{timeLeft.hours.toString().padStart(2, '0')}</div>
                    <div className="text-[10px] md:text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Hours</div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-3 md:p-4 border border-white/5 backdrop-blur-md">
                    <div className="text-3xl md:text-4xl font-black text-blue-400 tabular-nums">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                    <div className="text-[10px] md:text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Mins</div>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-3 md:p-4 border border-white/5 backdrop-blur-md">
                    <div className="text-3xl md:text-4xl font-black text-[#F26522] tabular-nums">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                    <div className="text-[10px] md:text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Secs</div>
                  </div>
                </div>
              )}
              
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-sm text-center text-slate-300">
                  Limited seats available. Selection based on prototype merit and interview.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
