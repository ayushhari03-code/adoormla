"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { GraduationCap } from "lucide-react";
import { useTranslations } from "next-intl";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const t = useTranslations("About");

  const timelineEvents = [
    {
      year: t("timelineYear1"),
      event: t("timelineEvent1"),
      role: t("timelineRole1"),
      significance: t("timelineDesc1"),
    },
    {
      year: t("timelineYear2"),
      event: t("timelineEvent2"),
      role: t("timelineRole2"),
      significance: t("timelineDesc2"),
    },
    {
      year: t("timelineYear3"),
      event: t("timelineEvent3"),
      role: t("timelineRole3"),
      significance: t("timelineDesc3"),
    },
    {
      year: t("timelineYear4"),
      event: t("timelineEvent4"),
      role: t("timelineRole4"),
      significance: t("timelineDesc4"),
    },
    {
      year: t("timelineYear5"),
      event: t("timelineEvent5"),
      role: t("timelineRole5"),
      significance: t("timelineDesc5"),
    }
  ];

  return (
    <div className="w-full pt-32 pb-24 bg-background">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <header className="mb-24 text-center">
          <h2 className="text-gold tracking-[0.2em] uppercase text-sm font-bold mb-4">{t("biography")}</h2>
          <h1 className="text-5xl md:text-7xl font-sans font-bold leading-tight tracking-tighter mb-8 text-charcoal dark:text-ivory whitespace-pre-line">
            {t("title")}
          </h1>
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14 mt-12 mb-16 max-w-5xl mx-auto text-left bg-charcoal/[0.02] dark:bg-ivory/[0.02] p-6 sm:p-8 md:p-10 rounded-3xl border border-charcoal/10 dark:border-ivory/10 shadow-xl backdrop-blur-sm">
            <div className="w-full md:w-5/12 aspect-[4/5] sm:aspect-square md:aspect-[4/5] relative rounded-2xl overflow-hidden shadow-2xl border-2 border-ivory/80 dark:border-charcoal-light shrink-0">
              <Image 
                src="/mla-about.jpeg" 
                alt="Adv. CV Santhakumar MLA" 
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                priority
                className="object-cover object-[50%_15%] hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="w-full md:w-7/12 flex flex-col justify-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-green/10 dark:bg-gold/10 text-forest-green dark:text-gold text-xs font-bold uppercase tracking-wider w-fit">
                <span className="w-2 h-2 rounded-full bg-forest-green dark:bg-gold animate-pulse" />
                MLA Adoor
              </div>
              <p className="text-lg md:text-xl opacity-90 leading-relaxed font-sans text-charcoal dark:text-ivory">
                {t("desc")}
              </p>
            </div>
          </div>
        </header>

        <div className="relative" ref={containerRef}>
          {/* Vertical Timeline Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-charcoal/10 dark:bg-ivory/10 transform md:-translate-x-1/2">
            <motion.div 
              className="absolute top-0 w-full bg-forest-green dark:bg-gold origin-top"
              style={{ scaleY: pathLength, height: "100%" }}
            />
          </div>

          {/* Timeline Events */}
          <div className="flex flex-col gap-16 md:gap-32 py-16">
            {timelineEvents.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="hidden md:block w-1/2" />
                
                {/* Timeline Node */}
                <div className="absolute left-[16px] md:left-1/2 w-3 h-3 rounded-full bg-forest-green dark:bg-gold transform -translate-x-1/2 mt-2 md:mt-0 z-10 shadow-[0_0_0_4px_var(--background)]" />
                
                <div className={`pl-12 md:pl-0 md:w-1/2 ${
                  index % 2 === 0 ? "md:pr-16 text-left md:text-right" : "md:pl-16 text-left"
                }`}>
                  <span className="text-gold font-bold tracking-widest text-lg mb-2 block">{item.year}</span>
                  <h3 className="text-2xl font-bold mb-2">{item.event}</h3>
                  <h4 className="text-sm uppercase tracking-wider opacity-70 mb-4">{item.role}</h4>
                  <p className="opacity-80 leading-relaxed bg-charcoal/5 dark:bg-ivory/5 p-6 rounded-2xl">
                    {item.significance}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Education Section */}
      <section className="bg-charcoal/5 dark:bg-ivory/5 border-y border-black/5 dark:border-white/5 py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-forest-green/20 dark:border-gold/20 bg-forest-green/5 dark:bg-gold/5 px-4 py-1.5 text-[10px] font-bold tracking-[0.22em] uppercase text-forest-green dark:text-gold">
              {t("educationLabel")}
            </div>
            <h2 className="mt-6 font-sans text-4xl leading-tight font-bold">{t("educationTitle")}</h2>
            <div className="mt-4 h-1 w-16 bg-forest-green dark:bg-gold rounded-full"></div>
          </div>
          
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { degree: t("edu1Degree"), institution: t("edu1Inst") },
              { degree: t("edu2Degree"), institution: t("edu2Inst") },
              { degree: t("edu3Degree"), institution: t("edu3Inst") }
            ].map((edu, idx) => (
              <div key={idx} className="rounded-2xl border border-black/5 dark:border-white/5 bg-background p-6 shadow-sm">
                <div className="rounded-lg bg-gold/15 p-3 inline-flex text-gold">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-sans text-lg font-bold">{edu.degree}</h3>
                <p className="mt-2 text-sm opacity-70 leading-relaxed">{edu.institution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roots & Family Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-forest-green/20 dark:border-gold/20 bg-forest-green/5 dark:bg-gold/5 px-4 py-1.5 text-[10px] font-bold tracking-[0.22em] uppercase text-forest-green dark:text-gold">
              {t("rootsLabel")}
            </div>
            <h2 className="mt-6 font-sans text-4xl leading-tight font-bold">{t("rootsTitle")}</h2>
            <div className="mt-4 h-1 w-16 bg-forest-green dark:bg-gold rounded-full"></div>
          </div>
          
          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr] items-start">
            <div className="text-lg leading-relaxed opacity-85 space-y-4">
              <p>
                {t("rootsDesc")}
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { relation: t("fatherRelation"), name: t("fatherName") },
                { relation: t("motherRelation"), name: t("motherName") },
                { relation: t("wifeRelation"), name: t("wifeName") },
                { relation: t("childrenRelation"), name: t("childrenName") }
              ].map((member, idx) => (
                <div key={idx} className="rounded-xl border border-black/5 dark:border-white/5 bg-charcoal/5 dark:bg-ivory/5 p-5 shadow-sm">
                  <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-forest-green dark:text-gold">{member.relation}</div>
                  <div className="mt-2 font-sans text-lg font-bold">{member.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
