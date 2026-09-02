"use client";

import { useState } from "react";
import { Search, ChevronDown, FileText, Mic } from "lucide-react";

const legislativeRecords = [
  {
    id: 1,
    date: "2026-06-15",
    session: "Budget Session",
    topic: "Infrastructure Development in Pathanamthitta",
    type: "Question",
    status: "Answered",
    summary: "Raised a starred question regarding the allocation of funds for the expansion of the Adoor ring road.",
  },
  {
    id: 2,
    date: "2026-07-02",
    session: "Monsoon Session",
    topic: "Healthcare Facilities in Rural Panchayats",
    type: "Discussion",
    status: "Recorded",
    summary: "Participated in the discussion on improving primary healthcare centers and highlighted the need for more doctors in Adoor Taluk.",
  }
];

export default function LegislativeWork() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecords = legislativeRecords.filter(record => 
    record.topic.toLowerCase().includes(searchTerm.toLowerCase()) || 
    record.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <header className="mb-16 text-center">
          <h2 className="text-gold tracking-[0.2em] uppercase text-sm font-bold mb-4">Legislative Dashboard</h2>
          <h1 className="text-4xl md:text-6xl font-sans font-bold leading-tight tracking-tighter mb-6 text-charcoal dark:text-ivory">
            Inside the Legislature
          </h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto leading-relaxed">
            A transparent record of questions raised, discussions participated in, and bills reviewed in the Kerala Legislative Assembly.
          </p>
        </header>

        {/* Search & Filter Bar */}
        <div className="bg-ivory dark:bg-charcoal-light p-4 rounded-2xl shadow-sm border border-black/5 dark:border-white/5 mb-12 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40" />
            <input 
              type="text" 
              placeholder="Search topics, questions, or summaries..." 
              className="w-full bg-transparent pl-12 pr-4 py-3 outline-none font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-charcoal/5 dark:bg-ivory/5 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-charcoal/10 dark:hover:bg-ivory/10 transition-colors">
              Session <ChevronDown size={16} />
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-charcoal/5 dark:bg-ivory/5 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-charcoal/10 dark:hover:bg-ivory/10 transition-colors">
              Type <ChevronDown size={16} />
            </button>
          </div>
        </div>

        {/* Records List */}
        <div className="space-y-6">
          {filteredRecords.map(record => (
            <div key={record.id} className="bg-ivory dark:bg-charcoal-light p-8 rounded-3xl shadow-sm border border-black/5 dark:border-white/5 hover:border-gold/50 transition-colors group">
              <div className="flex flex-wrap justify-between items-start mb-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-forest-green/10 text-forest-green dark:text-gold rounded-xl">
                    {record.type === "Question" ? <FileText size={20} /> : <Mic size={20} />}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl group-hover:text-forest-green dark:group-hover:text-gold transition-colors">{record.topic}</h3>
                    <p className="text-sm opacity-60 font-medium">{new Date(record.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} • {record.session}</p>
                  </div>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-charcoal/5 dark:bg-ivory/5 rounded-full">
                  {record.status}
                </span>
              </div>
              <p className="opacity-80 leading-relaxed pl-14">
                {record.summary}
              </p>
            </div>
          ))}
          
          {filteredRecords.length === 0 && (
            <div className="text-center py-12 opacity-50 font-bold uppercase tracking-widest">
              No records found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
