import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSponsors from "@/components/AboutSponsors";
import Schedule from "@/components/Schedule";
import Speakers from "@/components/Speakers";
import Showcase from "@/components/Showcase";
import RegistrationForm from "@/components/RegistrationForm";
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
      <RegistrationForm />
      <FAQ />
      <VenueMap />
      <Footer />
    </main>
  );
}
