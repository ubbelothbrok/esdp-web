import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { programs } from "@/data/programs";

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-slate-50 selection:bg-[#F26522] selection:text-white pb-0">
      <Navbar />
      
      <div className="pt-32 pb-20 lg:pt-40 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-[#F26522] font-bold tracking-wider uppercase text-sm mb-2">A-ESDP Tracks</h1>
          <h2 className="text-4xl md:text-5xl font-black text-[#0A192F] tracking-tight mb-6">
            Upcoming Programs
          </h2>
          <p className="text-lg text-slate-600">
            Explore our specialized five-day intensive programs sponsored by the Ministry of MSME, Govt. of India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((prog, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full group">
              {/* Program Image */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden">
                <img
                  src={prog.image}
                  alt={prog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur rounded-full px-3 py-1 border border-white/20 shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F26522] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F26522]"></span>
                    </span>
                    <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider">MSME Sponsored</span>
                  </div>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-[#0A192F] mb-6 leading-tight group-hover:text-[#F26522] transition-colors">{prog.title}</h3>
                
                <div className="space-y-4 text-sm font-medium text-slate-600 mb-8">
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 mr-3 text-slate-400 shrink-0" />
                    <div>
                      <div className="text-slate-800 font-semibold">{prog.dates}</div>
                      <div className="text-xs text-red-500 font-bold mt-0.5">Deadline: {prog.deadline}</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 text-slate-400 shrink-0" />
                    <span className="text-slate-800">IIT Jammu</span>
                  </div>
                  <div className="flex items-start">
                    <Users className="w-5 h-5 mr-3 text-slate-400 shrink-0" />
                    <span className="text-slate-800 leading-snug">Coords: {prog.coordinatorsText}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-auto">
                <Link
                  href={`/programs/${prog.slug}`}
                  className="w-full flex items-center justify-center bg-slate-50 text-[#0A192F] border border-slate-200 rounded-xl px-4 py-3 font-bold hover:bg-[#0A192F] hover:text-white transition-colors group/btn"
                >
                  View Details
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
