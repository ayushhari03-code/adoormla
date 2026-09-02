"use client";

import { useState } from "react";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail } from "lucide-react";

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Nav");

  const links = [
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/about" },
    { name: t("adoor"), href: "/adoor" },
    { name: t("publicService"), href: "/public-service" },
    { name: t("initiatives"), href: "/initiatives" },
    { name: t("legislative"), href: "/legislative" },
    { name: t("updates"), href: "/updates" },
    { name: t("gallery"), href: "/gallery" },
    { name: t("contact"), href: "/contact" },
  ];

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "ml" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <header className="w-full z-50 flex flex-col bg-background/95 backdrop-blur-xl shadow-sm border-b border-charcoal/5 dark:border-ivory/5 sticky top-0 transition-colors">
      
      {/* Tier 1: Top Bar */}
      <div className="bg-forest-green text-white text-[11px] py-1.5 hidden sm:block">
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <span className="opacity-90 tracking-wide font-medium">{t("servingPeople")}</span>
          <div className="flex items-center gap-5 font-bold">
            <a href="tel:+919447504529" className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <Phone size={12} /> +91 94475 04529
            </a>
            <a href="mailto:cvsanthakumar@niyamasabha.nic.in" className="hidden md:flex items-center gap-1.5 hover:text-gold transition-colors">
              <Mail size={12} /> cvsanthakumar@niyamasabha.nic.in
            </a>
          </div>
        </div>
      </div>
      
      {/* Tier 2: Main Logo Bar */}
      <div className="bg-background transition-colors">
        <div className="container mx-auto px-6 md:px-12 grid grid-cols-[auto_1fr_auto] items-center gap-4 py-3 md:py-4">
          
          {/* Logo Area */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 md:w-14 md:h-14 bg-forest-green rounded-full flex items-center justify-center text-ivory shadow-inner transform group-hover:scale-105 transition-transform">
               <span className="font-serif font-bold text-lg md:text-xl tracking-tighter">CV</span>
            </div>
            <div className="leading-tight border-l-2 border-forest-green/20 pl-3">
              <div className="text-[10px] uppercase tracking-[0.18em] text-forest-green dark:text-gold font-bold">{t("portalForPeoples")}</div>
              <div className="text-base md:text-xl font-bold text-foreground">{t("adoorSparsham")}</div>
              <div className="hidden sm:block text-[11px] text-foreground/60">Adoor Constituency • കേരളം</div>
            </div>
          </Link>
          
          {/* Middle Pill */}
          <div className="hidden md:flex justify-center">
             <div className="flex items-center gap-3 rounded-xl border border-charcoal/10 dark:border-ivory/10 bg-charcoal/5 dark:bg-ivory/5 px-3 py-2 hover:bg-charcoal/10 dark:hover:bg-ivory/10 transition-colors">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gold/60 relative shrink-0">
                  <Image src="/mla-portrait-2.jpeg" alt="Adv. CV Santhakumar" fill className="object-cover" />
                </div>
                <div className="leading-tight pr-2">
                  <div className="text-[10px] uppercase tracking-[0.16em] text-gold font-bold">{t("currentRole")}</div>
                  <div className="text-sm font-bold text-foreground">Adv. CV Santhakumar</div>
                </div>
             </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0">
             <div className="hidden sm:flex rounded-md border border-charcoal/10 dark:border-ivory/10 overflow-hidden text-xs font-bold">
               <button onClick={toggleLocale} className={`px-3 py-1.5 transition-colors ${locale === 'en' ? 'bg-forest-green text-white' : 'bg-transparent hover:bg-charcoal/5 dark:hover:bg-ivory/5'}`}>EN</button>
               <button onClick={toggleLocale} className={`px-3 py-1.5 transition-colors ${locale === 'ml' ? 'bg-forest-green text-white' : 'bg-transparent hover:bg-charcoal/5 dark:hover:bg-ivory/5'}`}>മലയാളം</button>
             </div>
             <Link href="/public-service" className="hidden lg:inline-flex items-center rounded-md bg-forest-green px-5 py-2.5 text-sm font-bold text-white hover:bg-forest-green/90 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
               {t("publicServiceHub")}
             </Link>
             
             {/* Mobile Menu Toggle */}
             <button
               className="lg:hidden p-2 border border-charcoal/10 dark:border-ivory/10 rounded-md bg-charcoal/5 dark:bg-ivory/5 text-foreground"
               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
             >
               {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
             </button>
          </div>
          
        </div>
      </div>
      
      {/* Tier 3: Desktop Navigation Links */}
      <nav className="hidden lg:block border-t border-charcoal/5 dark:border-ivory/5 bg-charcoal/[0.02] dark:bg-ivory/[0.02]">
        <div className="container mx-auto px-6 md:px-12 flex items-center gap-1">
           {links.map((link) => {
             const isActive = pathname === link.href;
             return (
               <Link
                 key={link.name}
                 href={link.href}
                 className={`relative px-4 py-3.5 text-[12px] font-bold uppercase tracking-widest transition-colors ${
                   isActive ? 'text-forest-green dark:text-gold' : 'text-foreground/70 hover:text-forest-green dark:hover:text-gold'
                 }`}
               >
                 {link.name}
                 {isActive && (
                   <span className="absolute bottom-0 left-4 right-4 h-[3px] bg-forest-green dark:bg-gold rounded-t-full" />
                 )}
               </Link>
             );
           })}
        </div>
      </nav>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden w-full bg-background border-t border-charcoal/10 dark:border-ivory/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-lg font-bold uppercase border-b border-charcoal/5 dark:border-ivory/5 pb-3 ${isActive ? 'text-forest-green dark:text-gold' : 'text-foreground'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="flex items-center gap-4 mt-2">
                <button onClick={toggleLocale} className="flex-1 bg-charcoal/5 dark:bg-ivory/5 py-3 rounded-lg font-bold text-sm">
                  {t("switchLang")}
                </button>
              </div>
              <Link 
                href="/public-service" 
                className="mt-2 bg-forest-green text-white text-center py-4 rounded-lg font-bold uppercase tracking-wider"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("publicServiceHub")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </header>
  );
}
