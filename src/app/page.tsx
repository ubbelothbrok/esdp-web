import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSponsors from "@/components/AboutSponsors";
import Schedule from "@/components/Schedule";
import Speakers from "@/components/Speakers";
import Showcase from "@/components/Showcase";
import RegisterCTA from "@/components/RegisterCTA";
import FAQ from "@/components/FAQ";
import VenueMap from "@/components/VenueMap";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 selection:bg-[#F26522] selection:text-white">
      <Navbar />
      <Hero />
      <AboutSponsors />
      <Schedule />
      <Speakers />
      <Showcase />
      <RegisterCTA />
      <FAQ />
      <VenueMap />
      <Footer />
    </main>
  );
}
