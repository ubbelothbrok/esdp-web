"use client";

import { useEffect, useState } from "react";

interface Mentor {
  name: string;
  role: string;
  bio: string;
  initials: string;
  color: string;
  linkedin_url?: string;
}

const fallbackMentors: Mentor[] = [
  {
    name: "Dr. Arvind Sharma",
    role: "Director, IIT Jammu",
    bio: "Pioneering research in deep-tech and fostering institutional innovation ecosystems.",
    initials: "AS",
    color: "bg-blue-600"
  },
  {
    name: "Mrs. Meenakshi Iyer",
    role: "Joint Secretary, MSME",
    bio: "Driving nationwide initiatives to subsidize and scale technology-driven MSMEs.",
    initials: "MI",
    color: "bg-orange-500"
  },
  {
    name: "Prof. Rajesh Kumar",
    role: "Head of Smart Manufacturing",
    bio: "Expert in Industry 4.0, IoT integration, and lean manufacturing processes.",
    initials: "RK",
    color: "bg-indigo-600"
  },
  {
    name: "Dr. Sneha Patel",
    role: "Bio-Entrepreneurship Lead",
    bio: "Bridging the gap between life sciences research and commercial medical devices.",
    initials: "SP",
    color: "bg-emerald-600"
  }
];

export default function Speakers() {
  const [mentors, setMentors] = useState<Mentor[]>([]);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/mentors/");
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) {
            setMentors(data);
          } else {
            setMentors(fallbackMentors);
          }
        } else {
          setMentors(fallbackMentors);
        }
      } catch (e) {
        console.error("Failed to fetch mentors:", e);
        setMentors(fallbackMentors);
      }
    };
    fetchMentors();
  }, []);

  const displayMentors = mentors.length > 0 ? mentors : fallbackMentors;

  return (
    <section id="speakers" className="py-24 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[#F26522] font-bold tracking-wider uppercase text-sm mb-2">Expert Guides</h2>
          <h3 className="text-3xl md:text-5xl font-black text-[#0A192F] mb-6 tracking-tight">
            Meet the Mentors
          </h3>
          <p className="text-lg text-slate-600">
            Learn directly from top academia and industry veterans who have successfully navigated the startup ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayMentors.map((speaker, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="relative mb-6 flex justify-center">
                {/* Avatar Placeholder */}
                <div className={`w-32 h-32 rounded-full ${speaker.color} flex items-center justify-center text-3xl font-black text-white shadow-inner group-hover:scale-105 transition-transform duration-300`}>
                  {speaker.initials}
                </div>
                
                {/* LinkedIn Badge */}
                <a 
                  href={speaker.linkedin_url || "#"} 
                  target={speaker.linkedin_url ? "_blank" : undefined}
                  rel={speaker.linkedin_url ? "noopener noreferrer" : undefined}
                  aria-label={`LinkedIn of ${speaker.name}`} 
                  className="absolute bottom-0 right-1/2 translate-x-12 translate-y-2 bg-[#0A66C2] text-white p-2 rounded-full border-2 border-white hover:bg-blue-700 transition-colors shadow-md"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
              
              <div className="text-center">
                <h4 className="text-xl font-bold text-[#0A192F] mb-1">{speaker.name}</h4>
                <p className="text-sm font-semibold text-[#F26522] mb-4">{speaker.role}</p>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {speaker.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
