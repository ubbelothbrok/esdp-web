import Navbar from "@/components/Navbar";
import Schedule from "@/components/Schedule";
import Footer from "@/components/Footer";

export default function SchedulePage() {
  return (
    <main className="min-h-screen bg-[#0A192F] selection:bg-[#F26522] selection:text-white">
      <Navbar />
      <div className="pt-20">
        <Schedule />
      </div>
      <Footer />
    </main>
  );
}
