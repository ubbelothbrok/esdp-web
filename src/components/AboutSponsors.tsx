import { Award, Target, Users } from "lucide-react";

export default function AboutSponsors() {
  const benefits = [
    {
      icon: <Users className="w-6 h-6 text-white" />,
      title: "Mentorship",
      description: "Direct guidance from IIT Jammu faculty and industry experts from MSME."
    },
    {
      icon: <Award className="w-6 h-6 text-white" />,
      title: "Government Certification",
      description: "Receive an official MSME-recognized certificate signifying your proficiency."
    },
    {
      icon: <Target className="w-6 h-6 text-white" />,
      title: "Networking",
      description: "Connect with like-minded aspiring entrepreneurs and prominent business leaders."
    }
  ];

  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[#F26522] font-bold tracking-wider uppercase text-sm mb-2">About The Program</h2>
          <h3 className="text-3xl md:text-4xl font-black text-[#0A192F] mb-6">
            Bridging the gap between engineering and entrepreneurship
          </h3>
          <p className="text-lg text-slate-600">
            The Advanced Entrepreneurship and Skill Development Programme (A-ESDP) 2026 is an initiative hosted at IIT Jammu to transform innovative ideas into viable MSME startups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-[#0A192F] group-hover:bg-[#F26522] transition-colors duration-300 rounded-xl flex items-center justify-center mb-6 shadow-md shadow-blue-900/20">
                {benefit.icon}
              </div>
              <h4 className="text-xl font-bold text-[#0A192F] mb-3">{benefit.title}</h4>
              <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-200 pt-16">
          <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-10">
            Proudly Sponsored & Organized By
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24 opacity-80 hover:opacity-100 transition-all duration-500">
            {/* MSME Placeholder Logo */}
            <div className="flex items-center space-x-4 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-200">
              <div className="w-16 h-16 bg-[#F26522] rounded-full flex items-center justify-center text-white font-black text-xs p-2 text-center leading-tight shadow-md">
                MSME
              </div>
              <div>
                <div className="text-xl font-black text-slate-800 tracking-tight">Ministry of MSME</div>
                <div className="text-xs font-semibold text-slate-500 uppercase">Government of India</div>
              </div>
            </div>
            
            <div className="hidden md:block w-px h-16 bg-slate-200"></div>

            {/* I3C Placeholder Logo */}
            <div className="flex items-center space-x-4 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-200">
              <div className="w-16 h-16 bg-[#0A192F] rounded-lg flex items-center justify-center text-white font-black text-2xl shadow-md">
                I3C
              </div>
              <div>
                <div className="text-xl font-black text-slate-800 tracking-tight">IIT Jammu I3C</div>
                <div className="text-xs font-semibold text-slate-500 uppercase">Incubation Center</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
