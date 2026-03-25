"use client";

import { motion } from "framer-motion";
import { Landmark, Rocket, Users, ShieldCheck, Microscope, Globe, Lightbulb, TrendingUp } from "lucide-react";

const Section = ({ title, subtitle, icon: Icon, children, reverse = false }: { title: string, subtitle: string, icon: any, children: React.ReactNode, reverse?: boolean }) => (
  <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 items-start mb-32`}>
    <div className="flex-1">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-purple-100 rounded-2xl">
          <Icon className="w-6 h-6 text-purple-600" />
        </div>
        <span className="text-purple-600 font-bold uppercase tracking-widest text-sm">{subtitle}</span>
      </div>
      <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">{title}</h3>
      <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium">
        {children}
      </div>
    </div>
    <div className="flex-1 w-full bg-slate-50 rounded-[40px] p-8 lg:p-12 border border-slate-100 shadow-inner relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Placeholder for dynamic content or specific highlights */}
        <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <Lightbulb className="w-8 h-8 text-yellow-500 mb-4" />
          <h4 className="font-bold text-slate-900 mb-2">Innovation First</h4>
          <p className="text-sm text-slate-500">Fostering a culture where every idea has a pathway to reality.</p>
        </div>
        <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <TrendingUp className="w-8 h-8 text-green-500 mb-4" />
          <h4 className="font-bold text-slate-900 mb-2">Scalable Growth</h4>
          <p className="text-sm text-slate-500">Providing the business tools needed to scale startups globally.</p>
        </div>
      </div>
    </div>
  </div>
);

export default function AboutDetailed() {
  return (
    <section className="py-24 px-8 sm:px-16 lg:px-24 max-w-7xl mx-auto">
      
      {/* ── Ministry of MSME Section ── */}
      <Section 
        title="Transforming Youth into Job Creators" 
        subtitle="Ministry of MSME" 
        icon={Landmark}
      >
        <p>
          The Ministry of Micro, Small & Medium Enterprises (MSME) is the backbone of the Indian economy. Through the 
          <strong> Entrepreneurship and Skill Development Programme (ESDP)</strong>, the Ministry aims to cultivate 
          an entrepreneurial mindset and enhance the skills of aspiring innovators across the nation.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="flex items-start space-x-3">
            <ShieldCheck className="w-5 h-5 text-purple-500 flex-shrink-0 mt-1" />
            <span className="text-sm">Inclusive growth through targeted skill-building for all communities.</span>
          </div>
          <div className="flex items-start space-x-3">
            <ShieldCheck className="w-5 h-5 text-purple-500 flex-shrink-0 mt-1" />
            <span className="text-sm">Transformation of youth from job seekers to job providers.</span>
          </div>
        </div>
      </Section>

      {/* ── IIT Jammu Section ── */}
      <Section 
        title="Engineering the Next Tech Revolution" 
        subtitle="IIT Jammu Incubation Center (I3C)" 
        icon={Rocket}
        reverse
      >
        <p>
          IIT Jammu's <strong>Institute Incubation and Innovation Council (I3C)</strong> serves as a premier 
          hub for technology-driven startups. It provides a robust ecosystem where students, faculty, and entrepreneurs 
          can translate cutting-edge research into market-ready products.
        </p>
        <p>
          With access to <strong>50+ state-of-the-art laboratories</strong>, including specialized facilities for 
          AI, Mechatronics, and Sustainable Agriculture, I3C offers the technical foundation required for modern industrial innovation.
        </p>
        <div className="flex flex-wrap gap-4 mt-8">
          {["Co-working Space", "Seed Funding", "Expert Mentorship", "Prototyping Labs"].map((tag) => (
            <span key={tag} className="px-4 py-2 bg-slate-100 rounded-full text-xs font-bold text-slate-600 uppercase tracking-tighter">
              {tag}
            </span>
          ))}
        </div>
      </Section>

      {/* ── Joint Vision ── */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-[#0A192F] rounded-[40px] p-12 lg:p-20 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/20 to-transparent" />
        <div className="relative z-10">
          <h3 className="text-3xl md:text-5xl font-black text-white mb-8">A Synergy of Policy and Excellence</h3>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12">
            A-ESDP 2026 is where the Government of India's supportive vision meets the technical prowess of IIT Jammu. 
            Together, we are bridging the gap between innovative engineering and sustainable entrepreneurship.
          </p>
          <div className="flex justify-center items-center space-x-12 opacity-50 grayscale hover:grayscale-0 transition-all">
             <img src="/msme-logo.png" alt="MSME" className="h-16 object-contain inverse-filter" />
             <div className="w-px h-12 bg-white/20" />
             <img src="/iit-jammu-logo.png" alt="IIT Jammu" className="h-16 object-contain" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
