import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "EcoDrone Systems",
    category: "Smart Manufacturing",
    description: "Autonomous aerial vehicles optimized for precision agriculture and MSME supply chain monitoring.",
    image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "BioSense Analytics",
    category: "Bio-Entrepreneurship",
    description: "Affordable, portable diagnostic kits leveraging AI for rapid rural healthcare screening.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "CleanWatt Innovators",
    category: "Clean Tech",
    description: "Modular, scalable micro-grid solutions integrating renewable sources for MSME factories.",
    image: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?q=80&w=800&auto=format&fit=crop"
  }
];

export default function Showcase() {
  return (
    <section id="showcase" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-[#F26522] font-bold tracking-wider uppercase text-sm mb-2">Innovation Hub</h2>
            <h3 className="text-3xl md:text-5xl font-black text-[#0A192F] tracking-tight">
              Past Cohort Prototypes
            </h3>
          </div>
          <p className="text-slate-500 max-w-sm text-sm">
            Explore the groundbreaking ideas our previous participants transformed from concept to prototype during the A-ESDP.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="w-full aspect-video rounded-3xl bg-slate-100 flex items-center justify-center mb-6 border border-slate-100 shadow-sm group-hover:shadow-xl transition-all duration-500 overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-500" />

                {/* Overlay link icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 text-[#0A192F]" />
                </div>
              </div>

              <div className="px-2">
                <div className="text-xs font-bold text-[#F26522] uppercase tracking-wider mb-2">
                  {project.category}
                </div>
                <h4 className="text-2xl font-bold text-[#0A192F] mb-3 group-hover:text-blue-700 transition-colors">
                  {project.title}
                </h4>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
