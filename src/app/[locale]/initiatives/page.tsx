"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, BookOpen, HeartPulse, Bus, TreePine, Wifi } from "lucide-react";

const categories = [
  { id: "all", label: "All Projects" },
  { id: "infrastructure", label: "Infrastructure", icon: Activity },
  { id: "education", label: "Education", icon: BookOpen },
  { id: "healthcare", label: "Healthcare", icon: HeartPulse },
  { id: "transportation", label: "Transportation", icon: Bus },
];

const projects = [
  {
    id: 1,
    title: "Adoor Ring Road Development",
    category: "infrastructure",
    status: "In Progress",
    description: "Expansion and modernization of the Adoor ring road to reduce traffic congestion and improve connectivity between major junctions.",
    timeline: "2026 - 2028",
  },
  {
    id: 2,
    title: "Smart Classrooms Initiative",
    category: "education",
    status: "Completed Phase 1",
    description: "Upgrading 15 government schools with interactive smart boards and high-speed internet connectivity.",
    timeline: "2026 - 2027",
  },
  {
    id: 3,
    title: "Taluk Hospital Upgradation",
    category: "healthcare",
    status: "Planning",
    description: "Proposal to add a new modernized trauma care unit and maternity ward to the Adoor Taluk Hospital.",
    timeline: "2027 - 2029",
  },
  {
    id: 4,
    title: "Rural Connectivity Hubs",
    category: "transportation",
    status: "In Progress",
    description: "Establishing new waiting shelters and improving road conditions in 3 remote panchayats connecting to Adoor town.",
    timeline: "2026 - 2027",
  }
];

export default function Initiatives() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = projects.filter(p => activeCategory === "all" || p.category === activeCategory);

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <header className="mb-16 text-center">
          <h2 className="text-gold tracking-[0.2em] uppercase text-sm font-bold mb-4">Development Dashboard</h2>
          <h1 className="text-4xl md:text-6xl font-sans font-bold leading-tight tracking-tighter mb-6 text-charcoal dark:text-ivory">
            Progress in Action
          </h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto leading-relaxed">
            Track verified development initiatives across Adoor Assembly Constituency.
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-colors ${
                activeCategory === cat.id 
                  ? "bg-forest-green text-ivory dark:bg-gold dark:text-charcoal" 
                  : "bg-charcoal/5 hover:bg-charcoal/10 dark:bg-ivory/5 dark:hover:bg-ivory/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-ivory dark:bg-charcoal-light p-8 rounded-3xl shadow-sm border border-black/5 dark:border-white/5 group"
                data-cursor="view"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                  <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                    project.status.includes("Progress") ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" :
                    project.status.includes("Completed") ? "bg-green-500/10 text-green-600 dark:text-green-400" :
                    "bg-orange-500/10 text-orange-600 dark:text-orange-400"
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 group-hover:text-forest-green dark:group-hover:text-gold transition-colors">
                  {project.title}
                </h3>
                <p className="opacity-70 leading-relaxed mb-6">
                  {project.description}
                </p>
                
                <div className="flex items-center gap-2 mt-auto pt-6 border-t border-charcoal/10 dark:border-ivory/10 opacity-60 text-sm font-medium">
                  <span>Timeline:</span>
                  <span>{project.timeline}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
