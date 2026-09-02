import HeroScene from "@/components/three/HeroScene";
import PremiumButton from "@/components/ui/PremiumButton";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { ArrowRight, MessageSquare, Briefcase, Users, FileText, Vote, Landmark, Quote, Award, Megaphone, Flag } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Home");

  return (
    <div className="w-full relative">
      {/* Cinematic Hero Section */}
      <section className="relative w-full min-h-[100svh] lg:h-screen flex items-center justify-center overflow-hidden py-12 lg:py-0">
        {/* Background color gradient/image placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-ivory via-ivory to-neutral-warm dark:from-charcoal dark:via-charcoal dark:to-charcoal-light z-0" />
        
        {/* Premium Dot Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08] pointer-events-none z-0" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, var(--color-forest-green) 1px, transparent 0)", backgroundSize: "32px 32px" }}></div>
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none z-0 mix-blend-overlay dark:mix-blend-screen" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, var(--color-gold) 1px, transparent 0)", backgroundSize: "32px 32px", backgroundPosition: "16px 16px" }}></div>
        
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-forest-green/5 dark:bg-gold/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-0 w-3/4 h-3/4 bg-gold/10 dark:bg-forest-green/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3 pointer-events-none z-0"></div>
        
        {/* 3D Scene */}
        <HeroScene />
        
        {/* Content & Framed Portrait Grid */}
        <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row items-center justify-between w-full h-full pt-2 lg:pt-20 gap-8 lg:gap-12 mt-4 lg:mt-0">
          
          {/* Text Content */}
          <div className="w-full lg:w-[50%] flex flex-col items-center text-center lg:items-start lg:text-left mt-4 sm:mt-0" data-cursor="view">
            <h2 className="text-gold tracking-[0.2em] uppercase text-xs sm:text-sm font-bold mb-4 bg-ivory/50 dark:bg-charcoal/50 backdrop-blur-md px-5 py-1.5 rounded-full border border-black/5 dark:border-white/5 inline-block shadow-sm">
              {t("heroTagline")}
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-sans font-bold leading-tight tracking-tighter mb-4 sm:mb-6 text-charcoal dark:text-ivory drop-shadow-sm whitespace-pre-line">
              {t("heroName")}
            </h1>
            <div className="w-16 h-1 bg-gold rounded-full mb-6 lg:hidden"></div>
            <p className="text-base sm:text-lg md:text-xl opacity-90 mb-8 sm:mb-10 max-w-md leading-relaxed lg:border-l-2 border-forest-green lg:pl-4 sm:pl-6 font-medium bg-ivory/30 dark:bg-charcoal/30 backdrop-blur-sm py-2 px-4 lg:px-0 rounded-xl lg:rounded-none">
              {t("heroDesc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
              <PremiumButton href="/public-service" variant="primary" className="w-full sm:w-auto justify-center flex">
                {t("explorePublicService")}
              </PremiumButton>
              <PremiumButton href="/contact" variant="outline" className="w-full sm:w-auto justify-center flex bg-ivory/50 dark:bg-charcoal/50 backdrop-blur-md border-transparent hover:border-charcoal dark:hover:border-ivory">
                {t("connectWithOffice")}
              </PremiumButton>
            </div>
          </div>
          
          {/* Stunning Framed Portrait */}
          <div className="w-full lg:w-[45%] h-[45vh] sm:h-[50vh] lg:h-[75vh] max-h-[800px] flex items-center justify-center relative mt-6 sm:mt-8 lg:mt-0 z-10 pb-12 lg:pb-0">
            <div className="relative w-full h-full max-w-[280px] sm:max-w-md group perspective-1000">
              {/* Outer Glow / Halo Effect */}
              <div className="absolute -inset-4 sm:-inset-6 rounded-3xl bg-forest-green/30 dark:bg-gold/30 blur-2xl sm:blur-3xl transition-all duration-700 group-hover:bg-forest-green/40 dark:group-hover:bg-gold/40 group-hover:blur-3xl"></div>
              
              {/* Premium Bordered Frame */}
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden border-[6px] border-white dark:border-charcoal-light shadow-2xl bg-charcoal/5 dark:bg-ivory/5 transform transition-transform duration-700 group-hover:scale-[1.02]">
                <Image 
                  src="/mla-portrait-1.jpeg" 
                  alt="Adv. CV Santhakumar MLA" 
                  fill
                  priority
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Inner Gradient Shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 lg:py-32 bg-ivory dark:bg-charcoal">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-5/12">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 whitespace-pre-line">{t("aboutTitle")}</h2>
            <p className="opacity-80 leading-relaxed mb-8">
              {t("aboutDesc")}
            </p>
            
            {/* At a Glance */}
            <div className="bg-charcoal/5 dark:bg-ivory/5 p-6 rounded-2xl mb-8 border border-black/5 dark:border-white/5">
              <div className="text-xs font-bold tracking-[0.2em] uppercase text-forest-green dark:text-gold mb-4">{t("atAGlance")}</div>
              <ul className="space-y-3 text-sm font-medium">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-forest-green dark:bg-gold" />{t("role1")}</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-forest-green dark:bg-gold" />{t("role2")}</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-forest-green dark:bg-gold" />{t("role3")}</li>
              </ul>
            </div>

            <Link href="/about" className="inline-flex items-center gap-2 font-bold uppercase tracking-wider text-sm hover:text-gold transition-colors group">
              {t("readFullBio")}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="w-full md:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white/60 dark:bg-charcoal-light/40 border border-black/5 dark:border-white/10 rounded-3xl p-8 flex flex-col justify-between shadow-xl backdrop-blur-md relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 text-forest-green/10 dark:text-forest-green/20 transition-transform duration-700 group-hover:scale-110">
                <Landmark size={120} />
              </div>
              <div className="mb-16 relative z-10">
                <div className="w-12 h-12 rounded-full bg-forest-green/10 dark:bg-forest-green/20 flex items-center justify-center text-forest-green dark:text-forest-green-light shadow-sm">
                  <Landmark size={24} />
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="text-5xl font-sans font-bold mb-2 text-charcoal dark:text-ivory">2026</h3>
                <p className="text-forest-green dark:text-forest-green-light text-sm uppercase tracking-widest font-bold">{t("assumedOffice")}</p>
              </div>
            </div>
            
            <div className="bg-white/60 dark:bg-charcoal-light/40 border border-black/5 dark:border-white/10 rounded-3xl p-8 flex flex-col justify-between shadow-xl backdrop-blur-md relative overflow-hidden group mt-0 sm:mt-12">
              <div className="absolute -right-6 -top-6 text-gold/10 dark:text-gold/20 transition-transform duration-700 group-hover:scale-110">
                <Vote size={120} />
              </div>
              <div className="mb-16 relative z-10">
                <div className="w-12 h-12 rounded-full bg-gold/10 dark:bg-gold/20 flex items-center justify-center text-gold shadow-sm mb-6">
                  <Vote size={24} />
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="text-5xl font-sans font-bold mb-2 text-charcoal dark:text-ivory">66.1k</h3>
                <p className="text-gold text-sm uppercase tracking-widest font-bold">{t("votesPolled")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Interventions */}
      <section className="py-20 lg:py-32 bg-background border-t border-charcoal/5 dark:border-ivory/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-forest-green/20 dark:border-gold/20 bg-forest-green/5 dark:bg-gold/5 px-4 py-1.5 text-[10px] font-bold tracking-[0.22em] uppercase text-forest-green dark:text-gold">
              {t("milestonesTag")}
            </div>
            <h2 className="mt-6 font-sans text-4xl md:text-5xl font-bold leading-tight">{t("keyInterventions")}</h2>
            <div className="mt-6 h-1 w-16 bg-forest-green dark:bg-gold rounded-full"></div>
          </div>
          
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {[
              { label: t("milestone1Label"), title: t("milestone1Title"), desc: t("milestone1Desc"), icon: Flag },
              { label: t("milestone2Label"), title: t("milestone2Title"), desc: t("milestone2Desc"), icon: Users },
              { label: t("milestone3Label"), title: t("milestone3Title"), desc: t("milestone3Desc"), icon: Megaphone }
            ].map((item, idx) => (
              <div key={idx} className="rounded-3xl border border-charcoal/10 dark:border-ivory/10 bg-ivory/50 dark:bg-charcoal/50 p-8 shadow-sm hover:shadow-xl transition-all group">
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-forest-green dark:text-gold">{item.label}</div>
                <h3 className="mt-4 font-sans text-2xl font-bold">{item.title}</h3>
                <p className="mt-4 text-sm opacity-80 leading-relaxed">{item.desc}</p>
                <div className="mt-6 w-12 h-12 rounded-full bg-forest-green/10 dark:bg-gold/10 flex items-center justify-center text-forest-green dark:text-gold transform group-hover:scale-110 transition-transform">
                  <item.icon size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Citizen Connect Hub */}
      <section className="py-20 lg:py-32 bg-neutral-warm dark:bg-charcoal-light">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t("yourVoiceMatters")}</h2>
          <p className="opacity-80 text-lg mb-16">{t("voiceDesc")}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: t("submitGrievance"), icon: MessageSquare, href: "/public-service#grievance" },
              { title: t("requestAssistance"), icon: Briefcase, href: "/public-service#assistance" },
              { title: t("requestMeeting"), icon: Users, href: "/public-service#meeting" },
              { title: t("shareSuggestion"), icon: FileText, href: "/public-service#suggestion" }
            ].map((service, idx) => (
              <Link key={idx} href={service.href} className="bg-ivory dark:bg-charcoal p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 border border-black/5 dark:border-white/5" data-cursor="explore">
                <service.icon className="w-8 h-8 mb-6 text-forest-green dark:text-gold group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-sm uppercase tracking-wider">{service.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
