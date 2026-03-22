"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const RegistrationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Name is too short")
    .max(50, "Name is too long")
    .required("Full name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Must be exactly 10 digits")
    .required("Phone number is required"),
  institution: Yup.string()
    .required("Institution/Company name is required"),
  category: Yup.string()
    .required("Please select a category"),
  prototypeIdea: Yup.string()
    .min(20, "Please provide a bit more detail (min 20 chars)")
    .required("A brief description of your idea is required")
});

export default function RegistrationForm({ standalone = false }: { standalone?: boolean }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const FormContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      
      <div className="text-white">
        <h2 className="text-[#F26522] font-bold tracking-wider uppercase text-sm mb-2">Join The Cohort</h2>
        <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
          Secure Your Spot
        </h3>
        <p className="text-lg text-slate-300 mb-8 max-w-lg leading-relaxed">
          We are looking for passionate innovators ready to build the next generation of MSME startups. Admission is highly competitive and fully sponsored.
        </p>
        
        <div className="space-y-6">
          <div className="flex items-start group">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4 border border-white/20 group-hover:bg-[#F26522] group-hover:border-[#F26522] transition-colors duration-300">
              <span className="text-white font-bold">1</span>
            </div>
            <div>
              <h4 className="font-bold text-lg">Submit Application</h4>
              <p className="text-sm text-slate-400 mt-1">Fill out the form with your details and prototype concept.</p>
            </div>
          </div>
          <div className="flex items-start group">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4 border border-white/20 group-hover:bg-[#F26522] group-hover:border-[#F26522] transition-colors duration-300">
              <span className="text-white font-bold">2</span>
            </div>
            <div>
              <h4 className="font-bold text-lg">Screening</h4>
              <p className="text-sm text-slate-400 mt-1">Our panel from IIT Jammu and MSME will review your idea.</p>
            </div>
          </div>
          <div className="flex items-start group">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4 border border-white/20 group-hover:bg-[#F26522] group-hover:border-[#F26522] transition-colors duration-300">
              <span className="text-white font-bold">3</span>
            </div>
            <div>
              <h4 className="font-bold text-lg">Interview & Selection</h4>
              <p className="text-sm text-slate-400 mt-1">Shortlisted candidates will be invited for a virtual interaction.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl inline-block backdrop-blur-sm">
          <p className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Scan to apply on mobile</p>
          <div className="bg-white p-2 rounded-xl inline-block shadow-lg">
            <img src="/qr-code.png" alt="Registration QR Code" className="w-32 h-32 object-contain" />
          </div>
        </div>
      </div>

      <div className="glass-dark rounded-3xl p-8 sm:p-10 border border-white/10 shadow-2xl relative backdrop-blur-xl">
        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 mb-6 border border-emerald-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-bold text-white mb-3">Application Received!</h4>
            <p className="text-slate-300 mb-8">
              Thank you for applying to A-ESDP 2026. Our team will review your prototype idea and get back to you shortly.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-2.5 bg-white/10 text-white rounded-full text-sm font-semibold hover:bg-white/20 transition-colors border border-white/20"
            >
              Submit Another Application
            </button>
          </motion.div>
        ) : (
          <Formik
            initialValues={{
              fullName: "",
              email: "",
              phone: "",
              institution: "",
              category: "",
              prototypeIdea: ""
            }}
            validationSchema={RegistrationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setIsSubmitted(true);
                setSubmitting(false);
              }, 1500);
            }}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">Full Name *</label>
                    <Field
                      type="text"
                      name="fullName"
                      className={`w-full bg-white/5 border ${errors.fullName && touched.fullName ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#F26522]'} rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#F26522] transition-colors`}
                      placeholder="John Doe"
                    />
                    <ErrorMessage name="fullName" component="div" className="text-red-400 text-xs mt-1.5 font-medium" />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">Email Address *</label>
                    <Field
                      type="email"
                      name="email"
                      className={`w-full bg-white/5 border ${errors.email && touched.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#F26522]'} rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#F26522] transition-colors`}
                      placeholder="john@example.com"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-400 text-xs mt-1.5 font-medium" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">Phone Number *</label>
                    <Field
                      type="tel"
                      name="phone"
                      className={`w-full bg-white/5 border ${errors.phone && touched.phone ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#F26522]'} rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#F26522] transition-colors`}
                      placeholder="9876543210"
                    />
                    <ErrorMessage name="phone" component="div" className="text-red-400 text-xs mt-1.5 font-medium" />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">Institution/Company *</label>
                    <Field
                      type="text"
                      name="institution"
                      className={`w-full bg-white/5 border ${errors.institution && touched.institution ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#F26522]'} rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#F26522] transition-colors`}
                      placeholder="IIT Jammu / Startup"
                    />
                    <ErrorMessage name="institution" component="div" className="text-red-400 text-xs mt-1.5 font-medium" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">Participation Category *</label>
                  <Field
                    as="select"
                    name="category"
                    className={`w-full bg-white/5 border ${errors.category && touched.category ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#F26522]'} rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-[#F26522] transition-colors appearance-none`}
                  >
                    <option value="" className="bg-[#0A192F] text-slate-400">Select Category</option>
                    <option value="student" className="bg-[#0A192F] text-white">Engineering Student</option>
                    <option value="professional" className="bg-[#0A192F] text-white">Working Professional</option>
                    <option value="founder" className="bg-[#0A192F] text-white">Startup Founder</option>
                  </Field>
                  <div className="absolute right-12 mt[-2.5rem] pointer-events-none opacity-50 hidden sm:block">
                    <svg className="w-4 h-4 fill-current text-white mt-[14px]" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                  </div>
                  <ErrorMessage name="category" component="div" className="text-red-400 text-xs mt-1.5 font-medium" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">Prototype Idea Summary *</label>
                  <Field
                    as="textarea"
                    rows={4}
                    name="prototypeIdea"
                    className={`w-full bg-white/5 border ${errors.prototypeIdea && touched.prototypeIdea ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#F26522]'} rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#F26522] transition-colors resize-none`}
                    placeholder="Briefly describe the problem you're solving and your proposed solution..."
                  />
                  <ErrorMessage name="prototypeIdea" component="div" className="text-red-400 text-xs mt-1.5 font-medium" />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#F26522] text-white rounded-xl py-4 font-bold text-lg hover:bg-[#FF834A] hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center group shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                
                <p className="text-center text-xs text-slate-400 mt-4 leading-relaxed">
                  By submitting this form, you agree to our Terms of Service and Privacy Policy. All data is securely processed according to Govt guidelines.
                </p>
              </Form>
            )}
          </Formik>
        )}
      </div>

    </div>
  );

  if (standalone) {
    return <FormContent />;
  }

  return (
    <section id="register" className="py-24 bg-[#0A192F] relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/40 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#F26522]/20 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FormContent />
      </div>
    </section>
  );
}

