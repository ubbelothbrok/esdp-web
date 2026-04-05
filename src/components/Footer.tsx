import Link from "next/link";
import { MapPin, Mail, Phone, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A192F] text-slate-300 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">

          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-black tracking-tighter text-white">
              A-ESDP <span className="text-[#F26522]">2026</span>
            </h3>
            <p className="text-sm text-slate-400 max-w-sm">
              Advanced Entrepreneurship and Skill Development Programme. Nurturing MSME Innovation at IIT Jammu.
            </p>
            <div className="pt-2 flex items-center space-x-4">
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-white/10 text-white border border-white/20">
                Sponsored by MSME
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#about" className="text-sm hover:text-[#F26522] transition-colors">
                  About the Program
                </Link>
              </li>
              <li>
                <Link href="#schedule" className="text-sm hover:text-[#F26522] transition-colors">
                  Event Schedule
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-sm hover:text-[#F26522] transition-colors">
                  FAQ & Eligibility
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm">
                <MapPin className="w-5 h-5 text-[#F26522] flex-shrink-0 mt-0.5" />
                <span>
                  IIT Jammu, Jagti Campus<br />
                  NH-44, PO Nagrota<br />
                  Jammu - 181221, J&K, India
                </span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Mail className="w-5 h-5 text-[#F26522] flex-shrink-0" />
                <a href="mailto:i3c@iitjammu.ac.in" className="hover:text-white transition-colors">
                  i3c@iitjammu.ac.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} IIT Jammu I3C. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-slate-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
