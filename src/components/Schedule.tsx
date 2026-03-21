"use client";

import { useState } from "react";
import { Clock, User, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const scheduleData = [
  {
    day: "Day 1",
    date: "April 15, 2026",
    events: [
      { time: "09:00 AM", title: "Registration & Welcome Tea", speaker: "", track: "General", type: "break" },
      { time: "10:00 AM", title: "Inaugural Keynote: Shaping MSME Future", speaker: "Dr. A. Sharma (Director, IIT Jammu)", track: "Keynote", type: "session" },
      { time: "11:30 AM", title: "Introduction to Smart Manufacturing", speaker: "Prof. Rajesh Kumar", track: "Smart Manufacturing", type: "session" },
      { time: "01:00 PM", title: "Networking Lunch", speaker: "", track: "General", type: "break" },
      { time: "02:30 PM", title: "Prototyping Workshop I", speaker: "I3C Mentors", track: "Workshop", type: "session" }
    ]
  },
  {
    day: "Day 2",
    date: "April 16, 2026",
    events: [
      { time: "09:30 AM", title: "Bio-Entrepreneurship Fundamentals", speaker: "Dr. Sneha Patel", track: "Bio-Entrepreneurship", type: "session" },
      { time: "11:00 AM", title: "Tea Break", speaker: "", track: "General", type: "break" },
      { time: "11:30 AM", title: "Funding & MSME Schemes", speaker: "Mr. R. Desai (MSME Rep)", track: "Finance", type: "session" },
      { time: "01:00 PM", title: "Lunch", speaker: "", track: "General", type: "break" },
      { time: "02:00 PM", title: "Design Thinking lab", speaker: "Prof. M. Singh", track: "Workshop", type: "session" }
    ]
  }
];

export default function Schedule() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="schedule" className="py-24 bg-[#0A192F] relative overflow-hidden">
      {/* Abstract Backgrounds */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-900/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#F26522]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-[#F26522] font-bold tracking-wider uppercase text-sm mb-2">Event Timeline</h2>
          <h3 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Dynamic Schedule
          </h3>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Three days of intensive workshops, expert keynotes, and hands-on prototyping sessions.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="glass-dark inline-flex rounded-full p-1.5 backdrop-blur-md border border-white/10">
            {scheduleData.map((day, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === idx ? "text-[#0A192F]" : "text-slate-300 hover:text-white"
                }`}
              >
                {activeTab === idx && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white rounded-full shadow-md"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{day.day} <span className="hidden sm:inline-block ml-1 font-normal opacity-80">- {day.date}</span></span>
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Content */}
        <div className="glass-dark rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="relative border-l-2 border-white/10 ml-4 sm:ml-8"
            >
              {scheduleData[activeTab].events.map((event, idx) => (
                <div key={idx} className="mb-10 last:mb-0 relative pl-8 sm:pl-12 group">
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 border-[#0A192F] transition-colors duration-300 ${event.type === 'break' ? 'bg-slate-500 group-hover:bg-slate-400' : 'bg-[#F26522] group-hover:bg-[#FF834A]'}`} />
                  
                  <div className={`p-6 rounded-2xl border transition-all duration-300 ${
                    event.type === 'break' 
                      ? 'bg-white/5 border-white/5 border-dashed' 
                      : 'bg-gradient-to-br from-white/5 to-transparent border-white/10 hover:border-white/20 hover:bg-white/10 hover:shadow-lg hover:shadow-black/20'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-3">
                      <div>
                        <div className="flex items-center text-[#F26522] text-sm font-semibold mb-2">
                          <Clock className="w-4 h-4 mr-1.5" />
                          {event.time}
                        </div>
                        <h4 className={`text-xl font-bold ${event.type === 'break' ? 'text-slate-400' : 'text-white'}`}>
                          {event.title}
                        </h4>
                      </div>
                      
                      {event.type !== 'break' && (
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/50 border border-blue-800 text-blue-200 text-xs font-semibold whitespace-nowrap hidden md:inline-flex">
                          <Tag className="w-3 h-3 mr-1.5" />
                          {event.track}
                        </div>
                      )}
                    </div>

                    {event.speaker && (
                      <div className="flex items-center text-slate-300 text-sm mt-4 pt-4 border-t border-white/10">
                        <User className="w-4 h-4 mr-2 text-slate-400" />
                        {event.speaker}
                      </div>
                    )}
                    
                    {event.type !== 'break' && (
                      <div className="inline-flex md:hidden items-center mt-3 px-3 py-1 rounded-full bg-blue-900/50 border border-blue-800 text-blue-200 text-xs font-semibold">
                        {event.track}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
