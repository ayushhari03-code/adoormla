"use client";

import { useState } from "react";
import PremiumButton from "@/components/ui/PremiumButton";
import { MessageSquare, Briefcase, Users, FileText, CheckCircle2 } from "lucide-react";

type FormState = "idle" | "submitting" | "success";

export default function PublicService() {
  const [activeTab, setActiveTab] = useState<"grievance" | "assistance" | "meeting" | "suggestion">("grievance");
  const [formState, setFormState] = useState<FormState>("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    // Simulate API call
    setTimeout(() => {
      setFormState("success");
      setTimeout(() => setFormState("idle"), 3000);
    }, 1500);
  };

  const tabs = [
    { id: "grievance", label: "Submit Grievance", icon: MessageSquare },
    { id: "assistance", label: "Request Assistance", icon: Briefcase },
    { id: "meeting", label: "Request Meeting", icon: Users },
    { id: "suggestion", label: "Share Suggestion", icon: FileText },
  ] as const;

  return (
    <div className="min-h-screen pt-32 pb-24 bg-neutral-warm dark:bg-charcoal">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <header className="mb-16 text-center">
          <h2 className="text-gold tracking-[0.2em] uppercase text-sm font-bold mb-4">Citizen Services</h2>
          <h1 className="text-4xl md:text-6xl font-sans font-bold leading-tight tracking-tighter mb-6 text-charcoal dark:text-ivory">
            Your Voice Matters
          </h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto leading-relaxed">
            The constituency office is committed to addressing the needs of every citizen in Adoor. 
            Use the forms below to reach out directly to the MLA's office.
          </p>
        </header>

        <div className="bg-ivory dark:bg-charcoal-light rounded-3xl shadow-xl overflow-hidden border border-black/5 dark:border-white/5 flex flex-col md:flex-row min-h-[600px]">
          {/* Sidebar */}
          <div className="w-full md:w-1/3 bg-forest-green p-8 text-ivory flex flex-col gap-2">
            <h3 className="font-bold uppercase tracking-wider mb-6 opacity-70">Services</h3>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-4 w-full text-left p-4 rounded-xl transition-colors ${
                  activeTab === tab.id 
                    ? "bg-ivory text-forest-green shadow-md" 
                    : "hover:bg-forest-green-light text-ivory"
                }`}
              >
                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? "text-forest-green" : "opacity-70"}`} />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
            
            <div className="mt-auto pt-8">
              <h4 className="font-bold text-sm mb-2 text-gold">Office Location</h4>
              <p className="text-sm opacity-80 mb-4 leading-relaxed">
                MLA Office, Adoor<br/>Pathanamthitta, Kerala
              </p>
              <h4 className="font-bold text-sm mb-2 text-gold">Contact</h4>
              <p className="text-sm opacity-80 leading-relaxed">
                +91 94475 04529<br/>cvsanthakumar@niyamasabha.nic.in
              </p>
            </div>
          </div>

          {/* Form Area */}
          <div className="w-full md:w-2/3 p-8 md:p-12 relative flex items-center justify-center">
            {formState === "success" ? (
              <div className="text-center animate-in fade-in zoom-in duration-500">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-forest-green/10 text-forest-green mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Request Submitted</h3>
                <p className="opacity-70">The constituency office will review your submission and contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto animate-in fade-in duration-300">
                <h3 className="text-2xl font-bold mb-8">
                  {tabs.find(t => t.id === activeTab)?.label}
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold uppercase tracking-wider mb-2 opacity-80">Full Name</label>
                    <input type="text" id="name" required className="w-full bg-transparent border-b-2 border-charcoal/20 dark:border-ivory/20 focus:border-forest-green dark:focus:border-gold py-2 outline-none transition-colors" />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold uppercase tracking-wider mb-2 opacity-80">Phone Number</label>
                    <input type="tel" id="phone" required className="w-full bg-transparent border-b-2 border-charcoal/20 dark:border-ivory/20 focus:border-forest-green dark:focus:border-gold py-2 outline-none transition-colors" />
                  </div>

                  <div>
                    <label htmlFor="panchayat" className="block text-sm font-bold uppercase tracking-wider mb-2 opacity-80">Panchayat / Municipality</label>
                    <input type="text" id="panchayat" required className="w-full bg-transparent border-b-2 border-charcoal/20 dark:border-ivory/20 focus:border-forest-green dark:focus:border-gold py-2 outline-none transition-colors" />
                  </div>
                  
                  <div>
                    <label htmlFor="details" className="block text-sm font-bold uppercase tracking-wider mb-2 opacity-80">Details</label>
                    <textarea id="details" rows={4} required className="w-full bg-charcoal/5 dark:bg-ivory/5 border-2 border-transparent focus:border-forest-green dark:focus:border-gold rounded-xl p-4 outline-none transition-colors resize-none"></textarea>
                  </div>
                  
                  <div className="pt-4">
                    <PremiumButton variant="primary" className="w-full">
                      {formState === "submitting" ? "Submitting..." : "Submit Request"}
                    </PremiumButton>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
