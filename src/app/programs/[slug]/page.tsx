import { programs } from "@/data/programs";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import CoordinatorImage from "@/components/CoordinatorImage";

export function generateStaticParams() {
  return programs.map((prog) => ({
    slug: prog.slug,
  }));
}

export default async function ProgramDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);

  if (!program) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-[#F26522] selection:text-white">
      <Navbar />
      
      <div className="pt-32 pb-20 lg:pt-40 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-screen">
        <Link href="/programs" className="inline-flex items-center text-[#F26522] font-semibold hover:text-[#0A192F] transition-colors mb-8 group">
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to all programs
        </Link>

        {/* Header */}
        <div className="bg-[#0A192F] rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 mb-12 relative overflow-hidden group min-h-[300px] flex flex-col justify-end">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src={program.image} 
              alt="" 
              className="w-full h-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/60 to-transparent" />
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur rounded-full px-4 py-1.5 mb-6 border border-white/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F26522] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F26522]"></span>
              </span>
              <span className="text-xs font-bold text-white uppercase tracking-wider">MSME Sponsored Programme</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight">
              {program.title}
            </h1>

            <div className="flex flex-wrap gap-6 text-sm font-semibold text-slate-200">
              <div className="flex items-center bg-white/5 px-4 py-2 rounded-xl border border-white/10 shadow-sm backdrop-blur-sm">
                <Calendar className="w-5 h-5 mr-2 text-[#F26522]" />
                {program.dates}
              </div>
              <div className="flex items-center bg-white/5 px-4 py-2 rounded-xl border border-white/10 shadow-sm backdrop-blur-sm">
                <MapPin className="w-5 h-5 mr-2 text-[#F26522]" />
                IIT Jammu
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-[#0A192F] mb-4">About The Programme</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {program.description}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0A192F] mb-6">Key Highlights</h2>
              <ul className="space-y-4 text-slate-700">
                {program.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-[#F26522] mr-3 shrink-0" />
                    <span className="leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#0A192F] mb-4">Who Can Apply</h2>
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                <p className="text-blue-900 font-medium leading-relaxed">
                  {program.whoCanApply}
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-[#0A192F] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F26522] mix-blend-screen opacity-20 rounded-full blur-2xl"></div>
              
              <h3 className="text-xl font-bold mb-2 relative z-10">Important Dates</h3>
              <div className="text-slate-400 text-sm mb-6 relative z-10">Don't miss the deadline</div>
              
              <div className="bg-white/10 rounded-xl p-4 border border-white/10 mb-8 backdrop-blur-sm relative z-10">
                <div className="text-xs uppercase tracking-wider font-semibold text-slate-300 mb-1">Registration Closes</div>
                <div className="text-xl font-black text-[#F26522]">{program.deadline}</div>
              </div>

              <Link
                href="/#register"
                className="w-full flex items-center justify-center bg-[#F26522] text-white rounded-xl px-4 py-4 font-bold hover:bg-[#FF834A] hover:scale-[1.02] transition-all duration-300 shadow-lg relative z-10"
              >
                Apply Now For This Track
              </Link>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
              <h3 className="text-xl font-bold text-[#0A192F] mb-6">Programme Coordinators</h3>
              
              <div className="space-y-8 relative z-10">
                {program.coordinators.map((coord, idx) => (
                  <div key={idx} className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 flex-shrink-0 border-2 border-slate-200 shadow-sm flex items-center justify-center">
                      <CoordinatorImage src={coord.image} alt={coord.name} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0A192F]">{coord.name}</h4>
                      <p className="text-xs font-semibold text-[#F26522] mt-0.5 mb-1">{coord.role}</p>
                      <a href={`mailto:${coord.email}`} className="text-xs text-slate-500 hover:text-[#0A192F] transition-colors">{coord.email}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
