"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

const categories = ["All", "Events", "Constituency", "Legislature", "Videos", "Gallery"];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGallery() {
      const supabase = createClient();
      const { data } = await supabase
        .from('gallery')
        .select('*')
        .eq('published', true)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });
      
      if (data) {
        setMediaItems(data.map(item => ({
          ...item,
          type: item.image_url.includes('.mp4') ? 'video' : 'image',
          src: item.image_url,
          thumbnail: item.image_url // Simplified for demo
        })));
      }
      setLoading(false);
    }
    
    fetchGallery();
  }, []);

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

        {loading ? (
          <div className="text-center opacity-50 py-24">Loading gallery...</div>
        ) : (
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
                      alt={item.title || `Gallery ${item.id}`} 
                      fill 
                      unoptimized
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
                      {item.title && <p className="font-bold text-sm">{item.title}</p>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
        
        {!loading && filteredItems.length === 0 && (
          <div className="text-center opacity-50 py-24">No media available in this category.</div>
        )}
      </div>
    </div>
  );
}
