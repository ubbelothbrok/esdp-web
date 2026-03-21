import { MapPin, Navigation } from "lucide-react";

export default function VenueMap() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          
          <div className="lg:pr-8">
            <h2 className="text-[#F26522] font-bold tracking-wider uppercase text-sm mb-2">Location</h2>
            <h3 className="text-3xl md:text-5xl font-black text-[#0A192F] mb-6 tracking-tight">
              Event Venue
            </h3>
            
            <p className="text-lg text-slate-600 mb-8">
              The program will be hosted at the beautiful Jagti Campus of IIT Jammu, offering state-of-the-art labs for prototyping and serene surroundings for deep work.
            </p>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-8">
              <div className="flex items-start mb-4">
                <MapPin className="w-6 h-6 text-[#F26522] flex-shrink-0 mt-1 mr-4" />
                <div>
                  <h4 className="font-bold text-[#0A192F] text-lg">IIT Jammu, Jagti Campus</h4>
                  <p className="text-slate-600 mt-1">
                    National Highway 44, PO Nagrota,<br />
                    Jammu - 181221, Jammu and Kashmir
                  </p>
                </div>
              </div>
            </div>

            <a 
              href="https://goo.gl/maps/Q3zT3TxhPZq2D3f9A" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-[#0A192F] text-white rounded-xl font-semibold hover:bg-[#F26522] transition-colors shadow-md group"
            >
              <Navigation className="w-4 h-4 mr-2 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              Get Directions
            </a>
          </div>

          <div className="lg:col-span-2">
            <div className="w-full aspect-video md:aspect-[21/9] lg:aspect-video rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-100 relative group">
              <iframe 
                title="IIT Jammu Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3353.9455322967276!2d74.89674!3d32.7937397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391e8140307ee4b7%3A0xeab50d2bb2d63426!2sIndian%20Institute%20Of%20Technology%E2%80%93Jammu%20(IIT%E2%80%93Jammu)!5e0!3m2!1sen!2sin!4v1710927690000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none border-4 border-transparent group-hover:border-[#F26522]/20 rounded-3xl transition-colors duration-500"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
