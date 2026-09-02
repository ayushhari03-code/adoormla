"use client";

import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import PremiumButton from "@/components/ui/PremiumButton";

export default function Contact() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <header className="mb-16 text-center">
          <h2 className="text-gold tracking-[0.2em] uppercase text-sm font-bold mb-4">Get in Touch</h2>
          <h1 className="text-4xl md:text-6xl font-sans font-bold leading-tight tracking-tighter mb-6 text-charcoal dark:text-ivory">
            Contact the Office
          </h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto leading-relaxed">
            Reach out to the constituency office for appointments, inquiries, or assistance.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Contact Details */}
          <div className="space-y-12">
            <div className="flex gap-6 items-start group">
              <div className="w-16 h-16 rounded-2xl bg-forest-green/10 text-forest-green dark:text-gold flex items-center justify-center shrink-0 group-hover:bg-forest-green group-hover:text-ivory transition-colors">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Office Address</h3>
                <p className="opacity-80 leading-relaxed">
                  MLA Office<br />
                  Adoor Town<br />
                  Pathanamthitta District<br />
                  Kerala, India
                </p>
                <PremiumButton href="https://maps.app.goo.gl/vcfkwGuaHh5koDCfA?g_st=aw" variant="outline" className="mt-4 px-6 py-2 text-xs">
                  Get Directions
                </PremiumButton>
              </div>
            </div>

            <div className="flex gap-6 items-start group">
              <div className="w-16 h-16 rounded-2xl bg-forest-green/10 text-forest-green dark:text-gold flex items-center justify-center shrink-0 group-hover:bg-forest-green group-hover:text-ivory transition-colors">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Phone</h3>
                <p className="opacity-80 leading-relaxed mb-4">
                  +91 94475 04529
                </p>
                <div className="flex gap-4">
                  <PremiumButton href="tel:+919447504529" variant="primary" className="px-6 py-2 text-xs">
                    Call Office
                  </PremiumButton>
                  <PremiumButton href="https://wa.me/919447504529" variant="secondary" className="px-6 py-2 text-xs bg-[#25D366] text-white hover:bg-[#128C7E]">
                    <MessageCircle size={16} /> WhatsApp
                  </PremiumButton>
                </div>
              </div>
            </div>

            <div className="flex gap-6 items-start group">
              <div className="w-16 h-16 rounded-2xl bg-forest-green/10 text-forest-green dark:text-gold flex items-center justify-center shrink-0 group-hover:bg-forest-green group-hover:text-ivory transition-colors">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="opacity-80 leading-relaxed mb-4">
                  cvsanthakumar@niyamasabha.nic.in
                </p>
                <PremiumButton href="mailto:cvsanthakumar@niyamasabha.nic.in" variant="outline" className="px-6 py-2 text-xs">
                  Email Office
                </PremiumButton>
              </div>
            </div>

            <div className="flex gap-6 items-start group">
              <div className="w-16 h-16 rounded-2xl bg-forest-green/10 text-forest-green dark:text-gold flex items-center justify-center shrink-0 group-hover:bg-forest-green group-hover:text-ivory transition-colors">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Office Hours</h3>
                <p className="opacity-80 leading-relaxed">
                  Monday – Saturday<br />
                  9:30 AM – 5:30 PM<br />
                  <span className="text-sm opacity-60">(Closed on Sundays and Public Holidays)</span>
                </p>
              </div>
            </div>
          </div>

          {/* Map Embed */}
          <div className="w-full aspect-square md:aspect-auto md:h-full bg-charcoal/5 dark:bg-ivory/5 rounded-3xl overflow-hidden relative border border-black/5 dark:border-white/5" data-cursor="explore">
            <iframe 
              src="https://maps.google.com/maps?q=9.1604079,76.7297834&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500 opacity-80 hover:opacity-100"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
