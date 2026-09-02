import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";

const newsItems = [
  {
    id: 1,
    date: "August 20, 2026",
    title: "MLA Inaugurates New Digital Library in Adoor Town",
    summary: "A modern digital library equipped with high-speed internet and computers was inaugurated to support students.",
    category: "Development",
  },
  {
    id: 2,
    date: "August 15, 2026",
    title: "Independence Day Celebrations at Constituency Office",
    summary: "Adv. CV Santhakumar hoisted the national flag and distributed sweets to children from local schools.",
    category: "Events",
  },
  {
    id: 3,
    date: "August 10, 2026",
    title: "Review Meeting Held for Adoor Bypass Road Project",
    summary: "A comprehensive review meeting with PWD officials to expedite the bypass construction.",
    category: "Infrastructure",
  }
];

export default function Updates() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <header className="mb-16 text-center">
          <h2 className="text-gold tracking-[0.2em] uppercase text-sm font-bold mb-4">News & Updates</h2>
          <h1 className="text-4xl md:text-6xl font-sans font-bold leading-tight tracking-tighter mb-6 text-charcoal dark:text-ivory">
            Latest from Adoor
          </h1>
        </header>

        {/* Featured Article */}
        <div className="mb-24 group cursor-pointer relative" data-cursor="view">
          <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden mb-8 bg-charcoal/5 dark:bg-ivory/5 shadow-xl">
            {/* Placeholder for featured image */}
            <div className="absolute inset-0 flex items-center justify-center border-4 border-gold/20 m-4 rounded-2xl">
              <p className="text-gold font-bold uppercase tracking-widest text-sm opacity-50">[ Featured Image ]</p>
            </div>
          </div>
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-forest-green dark:text-gold mb-4 block">August 25, 2026 • Constituency</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 group-hover:text-forest-green dark:group-hover:text-gold transition-colors">
              Comprehensive Health Camp Organized Across 5 Panchayats
            </h2>
            <p className="text-lg opacity-80 leading-relaxed mb-8">
              Over 2,000 residents benefited from the free medical checkups and medicine distribution organized in collaboration with the District Medical Office.
            </p>
            <span className="inline-flex items-center gap-2 font-bold uppercase tracking-wider text-sm hover:text-gold transition-colors">
              Read Full Article <ArrowRight size={16} />
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {newsItems.map(item => (
            <div key={item.id} className="bg-ivory dark:bg-charcoal-light rounded-3xl overflow-hidden shadow-sm border border-black/5 dark:border-white/5 group cursor-pointer hover:-translate-y-2 transition-transform" data-cursor="view">
              <div className="aspect-[4/3] bg-charcoal/5 dark:bg-ivory/5 relative">
                <div className="absolute inset-0 flex items-center justify-center border-2 border-gold/10 m-2 rounded-2xl">
                   <p className="text-gold font-bold uppercase tracking-widest text-[10px] opacity-30">[ Image ]</p>
                </div>
              </div>
              <div className="p-8">
                <span className="text-xs font-bold uppercase tracking-widest text-forest-green dark:text-gold mb-2 block">{item.date}</span>
                <h3 className="text-xl font-bold mb-4 group-hover:text-forest-green dark:group-hover:text-gold transition-colors">{item.title}</h3>
                <p className="opacity-70 text-sm leading-relaxed mb-6">{item.summary}</p>
                <span className="inline-flex items-center gap-2 font-bold uppercase tracking-wider text-xs group-hover:text-gold transition-colors">
                  Read More <ArrowRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
