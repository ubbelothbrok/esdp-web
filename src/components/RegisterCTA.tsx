import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function RegisterCTA() {
  return (
    <section className="py-24 bg-[#0A192F] relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/40 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#F26522]/20 blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-[#F26522] font-bold tracking-wider uppercase text-sm mb-4">Advance Your Career</h2>
        <h3 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight leading-tight">
          Ready to turn your idea <br /> into a <span className="text-[#F26522]">MSME Startup?</span>
        </h3>
        <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Join the A-ESDP 2026 cohort and get expert mentorship, IIT Jammu certification, and a chance to win prototype grants.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/register"
            className="w-full sm:w-auto bg-[#F26522] text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-[#FF834A] hover:scale-105 transition-all duration-300 shadow-xl shadow-[#F26522]/20 flex items-center justify-center group"
          >
            Apply Now for A-ESDP
            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/programs"
            className="w-full sm:w-auto bg-white/10 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/10"
          >
            View All Tracks
          </Link>
        </div>
        
        <p className="mt-10 text-slate-400 text-sm font-medium">
          Limited spots available. Registration closes on March 30, 2026.
        </p>
      </div>
    </section>
  );
}
