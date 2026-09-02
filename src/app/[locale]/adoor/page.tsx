"use client";

import { motion } from "framer-motion";
import { MapPin, Users, Building, TreePine, GraduationCap, BookOpen, Stethoscope } from "lucide-react";
import HeroScene from "@/components/three/HeroScene"; // We'll reuse the abstract 3D component for now as a topographic placeholder

const quickStats = [
  { label: "Population", value: "2.1L+", icon: Users },
  { label: "Panchayats", value: "9", icon: MapPin },
  { label: "Institutions", value: "45+", icon: Building },
  { label: "Agriculture", value: "60%", icon: TreePine },
];

export default function Adoor() {
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
