"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";

const categories = ["All", "Events", "Constituency", "Legislature", "Videos"];

const mediaItems = [
  { id: 1, type: "image", category: "Events", src: "/mla-new-1.jpg" },
  { id: 2, type: "image", category: "Constituency", src: "/mla-new-2.jpg" },
  { id: 3, type: "video", category: "Videos", thumbnail: "/mla-portrait-1.jpeg" },
  { id: 4, type: "image", category: "Legislature", src: "/mla-portrait-2.jpeg" },
  { id: 5, type: "image", category: "Events", src: "/mla-portrait-1.jpeg" },
  { id: 6, type: "image", category: "Constituency", src: "/mla-portrait-2.jpeg" },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = mediaItems.filter(item => 
    activeCategory === "All" || item.category === activeCategory
  );

  return (
    <div className="min-h-screen pt-32 pb-24 bg-charcoal text-ivory">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <header className="mb-16 text-center">
          <h2 className="text-gold tracking-[0.2em] uppercase text-sm font-bold mb-4">Media Gallery</h2>
          <h1 className="text-4xl md:text-6xl font-sans font-bold leading-tight tracking-tighter mb-6">
            Moments in Service
          </h1>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-colors ${
                activeCategory === cat 
                  ? "bg-gold text-charcoal" 
                  : "bg-ivory/10 hover:bg-ivory/20 text-ivory"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-3xl break-inside-avoid group cursor-pointer"
                data-cursor={item.type === "video" ? "play" : "view"}
              >
                <div className="relative w-full pb-[120%] bg-ivory/5">
                  <Image 
                    src={item.type === "image" ? (item.src as string) : (item.thumbnail as string)} 
                    alt={`Gallery ${item.id}`} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-gold/90 text-charcoal flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                        <Play fill="currentColor" size={24} className="ml-1" />
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                    <span className="text-xs font-bold uppercase tracking-widest text-gold mb-2 block">{item.category}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
