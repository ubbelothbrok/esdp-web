import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegistrationForm from "@/components/RegistrationForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#0A192F] selection:bg-[#F26522] selection:text-white">
      <Navbar />
      
      <div className="pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <RegistrationForm standalone={true} />
      </div>

      <Footer />
    </main>
  );
}
