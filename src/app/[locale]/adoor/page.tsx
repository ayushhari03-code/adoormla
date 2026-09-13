"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Users, 
  Building, 
  TreePine, 
  GraduationCap, 
  BookOpen, 
  Stethoscope, 
  HeartPulse, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Ambulance, 
  ExternalLink,
  Activity
} from "lucide-react";
import HeroScene from "@/components/three/HeroScene"; // Topographic placeholder

const quickStats = [
  { label: "Population", value: "2.1L+", icon: Users },
  { label: "Panchayats", value: "9", icon: MapPin },
  { label: "Institutions", value: "45+", icon: Building },
  { label: "Agriculture", value: "60%", icon: TreePine },
];

interface Hospital {
  name: string;
  category: "Government" | "Super Speciality" | "Medical College" | "Multi-Speciality";
  location: string;
  features: string[];
  contact: string;
  isEmergency24x7: boolean;
  highlight: string;
}

const hospitals: Hospital[] = [
  {
    name: "General Hospital, Adoor (Taluk Headquarters)",
    category: "Government",
    location: "Adoor Town Center",
    features: [
      "24/7 Casualty & Trauma Care",
      "Comprehensive In-Patient & ICU",
      "Maternity, Gynec & Pediatric Ward",
      "Dialysis Centre & Blood Storage",
      "Government Karunya Pharmacy"
    ],
    contact: "04734 224 233",
    isEmergency24x7: true,
    highlight: "Primary Government Tertiary Hospital for Adoor LAC"
  },
  {
    name: "Mount Zion Medical College Hospital",
    category: "Medical College",
    location: "Chayalode, Ezhamkulam, Adoor",
    features: [
      "Multi-Super-Speciality Departments",
      "High-Tech Surgical OT & Advanced ICU",
      "24/7 Emergency & Critical Trauma Care",
      "CT, MRI & Modern Diagnostic Labs",
      "Ambulance & Blood Bank Services"
    ],
    contact: "04734 241 163",
    isEmergency24x7: true,
    highlight: "Premier Teaching & Tertiary Care Medical Campus"
  },
  {
    name: "Lifeline Super Speciality Hospital",
    category: "Super Speciality",
    location: "Melood, Adoor",
    features: [
      "Pioneering Fertility & IVF Center",
      "Interventional Cardiology & Cath Lab",
      "High-Risk Obstetrics & Gynaecology",
      "Minimally Invasive & Laparoscopic Surgery",
      "Advanced Neonatal ICU (NICU)"
    ],
    contact: "04734 223 333",
    isEmergency24x7: true,
    highlight: "Acclaimed Multi-Speciality & Reproductive Medicine Hub"
  },
  {
    name: "Holy Cross Hospital",
    category: "Multi-Speciality",
    location: "Adoor Bypass Road",
    features: [
      "General Medicine & General Surgery",
      "Dedicated Hemodialysis Unit",
      "Orthopaedics & Joint Replacement",
      "24/7 Casualty, Lab & Pharmacy",
      "Community Outreach Healthcare"
    ],
    contact: "04734 224 812",
    isEmergency24x7: true,
    highlight: "Decades of Compassionate Community Healthcare"
  },
  {
    name: "Adoor Co-operative Medical Centre",
    category: "Multi-Speciality",
    location: "Near KSRTC, Adoor",
    features: [
      "Subsidized & Affordable Public Health",
      "Multi-Disciplinary Specialist Clinics",
      "Emergency Casualty Support",
      "Diagnostic Lab & Digital X-Ray",
      "In-House Pharmacy"
    ],
    contact: "04734 225 500",
    isEmergency24x7: false,
    highlight: "Co-operative Sector Healthcare Initiative"
  },
  {
    name: "St. Mary's Multi-Speciality Hospital",
    category: "Multi-Speciality",
    location: "Central Adoor",
    features: [
      "General & Laparoscopic Surgery",
      "Pediatrics & Obstetrics Care",
      "Internal Medicine & Diabetology",
      "24-Hour Emergency & Ambulance"
    ],
    contact: "04734 229 000",
    isEmergency24x7: true,
    highlight: "Comprehensive Inpatient & Outpatient Care"
  },
  {
    name: "Community Health Centre (CHC) Pandalam",
    category: "Government",
    location: "Pandalam Municipality",
    features: [
      "Round-the-clock Emergency Outpatient",
      "Antenatal & Child Immunization",
      "Lifestyle Disease Screening",
      "National Health Mission Facilities"
    ],
    contact: "04734 252 040",
    isEmergency24x7: true,
    highlight: "Government Primary Healthcare Center for Pandalam Area"
  },
  {
    name: "Community Health Centre (CHC) Kadampanad",
    category: "Government",
    location: "Kadampanad",
    features: [
      "Primary & Preventive Care",
      "Diagnostic Lab & Pharmacy",
      "Elderly Care & Palliative Services",
      "Grassroots Public Health Delivery"
    ],
    contact: "04734 282 220",
    isEmergency24x7: false,
    highlight: "Essential Rural Public Healthcare Hub"
  }
];

export default function Adoor() {
  const [filter, setFilter] = useState<string>("all");

  const filteredHospitals = hospitals.filter((h) => {
    if (filter === "all") return true;
    if (filter === "government") return h.category === "Government";
    if (filter === "speciality") return h.category === "Super Speciality" || h.category === "Medical College" || h.category === "Multi-Speciality";
    if (filter === "emergency") return h.isEmergency24x7;
    return true;
  });

  return (
    <div className="w-full">
      {/* 3D Map Header */}
      <section className="relative w-full h-[60vh] flex items-center justify-center bg-forest-green overflow-hidden">
        <HeroScene />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal to-transparent z-0" />
        
        <div className="relative z-10 text-center text-ivory mt-20" data-cursor="explore">
          <h2 className="text-gold tracking-[0.2em] uppercase text-sm font-bold mb-4">Constituency</h2>
          <h1 className="text-5xl md:text-7xl font-sans font-bold leading-tight tracking-tighter mb-4">
            Explore Adoor
          </h1>
          <p className="opacity-80 max-w-xl mx-auto text-lg">
            A rich blend of Kerala's cultural heritage, natural beauty, and progressing civic infrastructure.
          </p>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-24 bg-charcoal text-ivory">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
            {quickStats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-ivory/5 border border-ivory/10 rounded-2xl p-6 text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-gold" />
                <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                <p className="text-sm uppercase tracking-wider opacity-60">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Geography & Culture</h2>
              <p className="opacity-80 leading-relaxed mb-6">
                Adoor is strategically located in Pathanamthitta district, acting as a gateway to the region. 
                Known for its vibrant local economy and significant agricultural base, the constituency comprises several panchayats that reflect the traditional Kerala agrarian lifestyle intertwined with modern development.
              </p>
              <p className="opacity-80 leading-relaxed">
                The constituency is also home to important educational and healthcare institutions, serving not just Adoor but neighboring areas as well.
              </p>
            </div>
            
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-ivory/10 relative group border border-black/5 dark:border-white/5">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14976.448552163578!2d76.72038294432801!3d9.153467054605045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06117fd96592e3%3A0xdb10856f42d5c637!2sAdoor%2C%20Kerala!5e1!3m2!1sen!2sin!4v1787933598123!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 opacity-80 hover:opacity-100"
              ></iframe>
            </div>
          </div>

          {/* Local Bodies Section */}
          <div className="mt-32">
            <h2 className="text-3xl font-bold mb-4 text-center">Local Bodies</h2>
            <p className="opacity-80 text-center mb-12 max-w-2xl mx-auto">
              The Adoor Legislative Assembly constituency comprises two municipalities and seven grama panchayats.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Municipalities */}
              <div className="lg:col-span-3 mb-4">
                <h3 className="text-xl font-semibold text-gold border-b border-white/10 pb-2 inline-block">Municipalities</h3>
              </div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-ivory/5 border border-ivory/10 rounded-xl p-6 flex items-center gap-4 group hover:bg-forest-green-light transition-all duration-300"
              >
                <Building className="text-gold w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-lg font-medium">Adoor Municipality</span>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-ivory/5 border border-ivory/10 rounded-xl p-6 flex items-center gap-4 group hover:bg-forest-green-light transition-all duration-300"
              >
                <Building className="text-gold w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-lg font-medium">Pandalam Municipality</span>
              </motion.div>

              {/* Panchayats */}
              <div className="lg:col-span-3 mt-8 mb-4">
                <h3 className="text-xl font-semibold text-gold border-b border-white/10 pb-2 inline-block">Grama Panchayats</h3>
              </div>
              {[
                "Pandalam Thekkekara",
                "Kodumon",
                "Ezhamkulam",
                "Erathu",
                "Pallickal",
                "Kadampanad",
                "Thumpamon"
              ].map((panchayat, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="bg-ivory/5 border border-ivory/10 rounded-xl p-6 flex items-center gap-4 group hover:bg-forest-green-light transition-all duration-300"
                >
                  <MapPin className="text-gold w-6 h-6 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  <span className="text-lg font-medium">{panchayat}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Healthcare & Hospitals Section */}
          <div id="hospitals" className="mt-32 scroll-mt-28">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-green/20 border border-forest-green/30 text-gold text-xs font-bold uppercase tracking-widest mb-4">
                <HeartPulse className="w-3.5 h-3.5 text-red-400" />
                Healthcare Infrastructure
              </span>
              <h2 className="text-3xl md:text-5xl font-bold font-sans tracking-tight mb-4">
                Hospitals & Medical Centers in Adoor
              </h2>
              <p className="opacity-80 text-base md:text-lg leading-relaxed">
                Comprehensive healthcare access for the residents of Adoor constituency, ranging from government tertiary care and medical colleges to premier super-speciality facilities.
              </p>
            </div>

            {/* 24/7 Emergency Helplines Bar */}
            <div className="mb-12 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-red-950/40 via-forest-green/20 to-charcoal border border-red-500/20 backdrop-blur-md shadow-2xl">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center shrink-0">
                    <Ambulance className="w-7 h-7 text-red-400 animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                      <h3 className="text-lg font-bold text-ivory">Emergency Medical Services</h3>
                    </div>
                    <p className="text-sm opacity-75">Toll-free 24/7 ambulance and government emergency response across Adoor</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                  <a 
                    href="tel:108" 
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg transition-transform active:scale-95"
                  >
                    <Phone className="w-4 h-4" />
                    Ambulance: 108
                  </a>
                  <a 
                    href="tel:04734224233" 
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-ivory/10 hover:bg-ivory/20 border border-ivory/15 text-ivory font-bold text-sm transition-colors"
                  >
                    <Clock className="w-4 h-4 text-gold" />
                    Adoor Casualty: 04734 224 233
                  </a>
                  <a 
                    href="tel:1056" 
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-ivory/5 hover:bg-ivory/10 border border-ivory/10 text-ivory/90 text-sm font-semibold transition-colors"
                  >
                    DISHA Helpline: 1056
                  </a>
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10">
              {[
                { id: "all", label: "All Hospitals", count: hospitals.length },
                { id: "emergency", label: "24x7 Emergency", count: hospitals.filter(h => h.isEmergency24x7).length },
                { id: "government", label: "Government Health", count: hospitals.filter(h => h.category === "Government").length },
                { id: "speciality", label: "Speciality & Colleges", count: hospitals.filter(h => h.category !== "Government").length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                    filter === tab.id
                      ? "bg-gold text-charcoal shadow-md scale-105"
                      : "bg-ivory/5 text-ivory/80 hover:bg-ivory/10 border border-ivory/10"
                  }`}
                >
                  {tab.label}
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    filter === tab.id ? "bg-charcoal/20 text-charcoal" : "bg-white/10 text-ivory/60"
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Hospital Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
              {filteredHospitals.map((hospital, idx) => (
                <motion.div
                  key={hospital.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-ivory/[0.03] hover:bg-ivory/[0.06] border border-ivory/10 hover:border-gold/40 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl group relative overflow-hidden"
                >
                  <div>
                    {/* Badge Row */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                        hospital.category === "Government" 
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                          : hospital.category === "Medical College"
                          ? "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                          : hospital.category === "Super Speciality"
                          ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                          : "bg-purple-500/15 text-purple-400 border border-purple-500/30"
                      }`}>
                        {hospital.category}
                      </span>

                      {hospital.isEmergency24x7 && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-500/15 text-red-300 border border-red-500/25">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                          24x7 Casualty
                        </span>
                      )}
                    </div>

                    {/* Name & Location */}
                    <h3 className="text-xl font-bold font-sans text-ivory mb-2 group-hover:text-gold transition-colors leading-snug">
                      {hospital.name}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 text-sm text-ivory/70 mb-3">
                      <MapPin className="w-4 h-4 text-gold shrink-0" />
                      <span>{hospital.location}</span>
                    </div>

                    <p className="text-xs text-gold/90 font-medium mb-5 italic border-l-2 border-gold/40 pl-3">
                      {hospital.highlight}
                    </p>

                    {/* Features / Services */}
                    <div className="space-y-2 mb-6 border-t border-white/5 pt-4">
                      <div className="text-[11px] uppercase tracking-wider text-ivory/50 font-bold mb-2">Key Services</div>
                      {hospital.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-ivory/80">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-2.5">
                    <a
                      href={`tel:${hospital.contact.replace(/\s+/g, '')}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-forest-green hover:bg-forest-green-light text-white text-xs font-bold transition-all shadow-md active:scale-95"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {hospital.contact}
                    </a>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.name + ' ' + hospital.location)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-ivory/5 hover:bg-ivory/15 border border-ivory/15 text-ivory text-xs font-semibold transition-colors"
                      title="View directions on Google Maps"
                    >
                      <MapPin className="w-3.5 h-3.5 text-gold" />
                      Directions
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Educational Institutions Section */}
          <div className="mt-24">
            <h2 className="text-3xl font-bold mb-4 text-center">Educational Institutions</h2>
            <p className="opacity-80 text-center mb-12 max-w-2xl mx-auto">
              Adoor is home to prominent educational institutions spanning engineering, arts, science, and medical fields.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Engineering & Technical */}
              <div className="lg:col-span-3 mb-2">
                <h3 className="text-xl font-semibold text-gold border-b border-white/10 pb-2 inline-flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Engineering & Technical
                </h3>
              </div>
              {[
                "College of Engineering, Adoor (CEA)",
                "Government Polytechnic College, Adoor",
                "Sree Narayana Institute of Technology (SNIT)"
              ].map((college, idx) => (
                <motion.div 
                  key={`eng-${idx}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="bg-ivory/5 border border-ivory/10 rounded-xl p-6 flex items-start gap-4 group hover:bg-forest-green-light transition-all duration-300"
                >
                  <Building className="text-gold w-6 h-6 shrink-0 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all mt-1" />
                  <span className="text-lg font-medium">{college}</span>
                </motion.div>
              ))}

              {/* Arts, Science & Other */}
              <div className="lg:col-span-3 mt-8 mb-2">
                <h3 className="text-xl font-semibold text-gold border-b border-white/10 pb-2 inline-flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Arts, Science & Education
                </h3>
              </div>
              {[
                "St. Cyril's College",
                "Mar Chrysostom College of Arts and Science",
                "College of Applied Science, Adoor",
                "College of Teacher Education",
                "Elshaddai College of Advanced Studies"
              ].map((college, idx) => (
                <motion.div 
                  key={`arts-${idx}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="bg-ivory/5 border border-ivory/10 rounded-xl p-6 flex items-start gap-4 group hover:bg-forest-green-light transition-all duration-300"
                >
                  <Building className="text-gold w-6 h-6 shrink-0 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all mt-1" />
                  <span className="text-lg font-medium">{college}</span>
                </motion.div>
              ))}

              {/* Medical */}
              <div className="lg:col-span-3 mt-8 mb-2">
                <h3 className="text-xl font-semibold text-gold border-b border-white/10 pb-2 inline-flex items-center gap-2">
                  <Stethoscope className="w-5 h-5" />
                  Medical & Professional
                </h3>
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-ivory/5 border border-ivory/10 rounded-xl p-6 flex items-start gap-4 group hover:bg-forest-green-light transition-all duration-300 md:col-span-2 lg:col-span-1"
              >
                <Building className="text-gold w-6 h-6 shrink-0 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all mt-1" />
                <span className="text-lg font-medium">Mount Zion Medical College</span>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
