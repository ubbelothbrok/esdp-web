"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Who is eligible to apply for A-ESDP 2026?",
    answer: "The program is open to engineering students, recent graduates, aspiring entrepreneurs, and innovators looking to build hardware or software prototypes. Strong preference is given to deep-tech, bio-tech, and clean-tech domains."
  },
  {
    question: "Do I get an official certificate?",
    answer: "Yes, all participants who successfully complete the prototyping phase and final presentation will receive a joint certification from the Ministry of MSME and IIT Jammu I3C."
  },
  {
    question: "What is the policy regarding TA/DA?",
    answer: "As a fully sponsored MSME program, selected outstation participants will be provided Travel Allowance (TA) and Dearness Allowance (DA) as per the official Central Government norms. Accommodation will be arranged at the Jagti Campus hostels."
  },
  {
    question: "Do I need a fully formed startup to apply?",
    answer: "No. You can apply with a Proof of Concept (PoC) or a strong idea. The program is designed to help you transition from idea to prototype, and eventually a viable MSME entity."
  },
  {
    question: "What happens after the program?",
    answer: "Top prototypes will be evaluated for incubation opportunities at I3C IIT Jammu and may be fast-tracked for further MSME grant schemes."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-[#F26522] font-bold tracking-wider uppercase text-sm mb-2">Got Questions?</h2>
          <h3 className="text-3xl md:text-5xl font-black text-[#0A192F] tracking-tight">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-2xl border transition-colors duration-300 overflow-hidden ${openIndex === idx ? 'border-[#F26522] shadow-md' : 'border-slate-200 hover:border-slate-300'
                }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex justify-between items-center p-6 sm:p-8 text-left focus:outline-none"
              >
                <span className="text-lg font-bold text-[#0A192F] pr-8">{faq.question}</span>
                <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === idx ? 'bg-[#F26522] text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                  {openIndex === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-slate-600 leading-relaxed border-t border-slate-100 pt-4 mt-2">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
