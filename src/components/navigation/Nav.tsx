"use client";

import { useState } from "react";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Menu, X, Phone, Mail, HeartPulse } from "lucide-react";

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
    <>
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
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center gap-4 py-3 md:py-4">
          
          {/* Logo Area */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-11 h-11 md:w-14 md:h-14 rounded-full overflow-hidden relative shadow-md border-2 border-forest-green/20 dark:border-gold/30 bg-white dark:bg-charcoal transform group-hover:scale-105 transition-transform shrink-0">
               <Image
                 src="/logo-circle.png"
                 alt="Adoor Sparsham Logo"
                 fill
                 sizes="(max-width: 768px) 44px, 56px"
                 priority
                 className="object-contain p-0.5"
               />
            </div>
            <div className="leading-tight border-l-2 border-forest-green/20 pl-3">
              <div className="text-[10px] uppercase tracking-[0.18em] text-forest-green dark:text-gold font-bold">{t("portalForPeoples")}</div>
              <div className="text-base md:text-xl font-bold text-foreground">{t("adoorSparsham")}</div>
              <div className="hidden sm:block text-[11px] text-foreground/60">Adoor Constituency • കേരളം</div>
            </div>
          </Link>
          
          {/* Middle Pill */}
          <div className="hidden md:flex justify-center flex-1">
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
          <div className="flex items-center justify-end gap-2 sm:gap-3 shrink-0">
             {/* Minimal Top Right Corner Hospital Help Pill */}
             <Link
               href="/adoor#hospitals"
               className="group inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border border-red-500/25 dark:border-red-400/30 bg-red-500/[0.06] hover:bg-red-500/15 text-red-600 dark:text-red-400 text-[11px] sm:text-xs font-bold transition-all duration-200 active:scale-95 shadow-sm"
               title={locale === 'ml' ? 'അടൂരിലെ ആശുപത്രികൾ' : 'Adoor Hospitals & Emergency'}
             >
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-60"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
               </span>
               <HeartPulse size={13} className="text-red-500 group-hover:scale-110 transition-transform" />
               <span className="hidden sm:inline">{locale === 'ml' ? 'ആശുപത്രികൾ' : 'Hospitals'}</span>
             </Link>

             <div className="flex rounded-md border border-charcoal/10 dark:border-ivory/10 overflow-hidden text-[10px] sm:text-xs font-bold">
               <button type="button" suppressHydrationWarning onClick={toggleLocale} className={`px-2 sm:px-3 py-1.5 transition-colors ${locale === 'en' ? 'bg-forest-green text-white' : 'bg-transparent hover:bg-charcoal/5 dark:hover:bg-ivory/5'}`}>EN</button>
               <button type="button" suppressHydrationWarning onClick={toggleLocale} className={`px-2 sm:px-3 py-1.5 transition-colors ${locale === 'ml' ? 'bg-forest-green text-white' : 'bg-transparent hover:bg-charcoal/5 dark:hover:bg-ivory/5'}`}>മലയാളം</button>
             </div>
             <Link href="/public-service" className="hidden lg:inline-flex items-center rounded-md bg-forest-green px-5 py-2.5 text-sm font-bold text-white hover:bg-forest-green/90 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
               {t("publicServiceHub")}
             </Link>
             
             {/* Mobile Menu Toggle */}
             <button
               type="button"
               className="relative z-50 lg:hidden p-2 border border-forest-green/20 rounded-md bg-forest-green text-white shadow-md cursor-pointer active:scale-95 transition-transform"
               onClick={() => {
                 console.log("Menu toggled: ", !mobileMenuOpen);
                 setMobileMenuOpen(!mobileMenuOpen);
               }}
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
    </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100]">
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-charcoal/60 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          />
          <div className="absolute top-0 right-0 bottom-0 w-[85vw] max-w-[400px] bg-background shadow-2xl flex flex-col border-l border-charcoal/5 dark:border-ivory/5 animate-in slide-in-from-right duration-300">
            <div className="p-5 flex items-center justify-between border-b border-charcoal/5 dark:border-ivory/5">
                <span className="font-bold text-lg tracking-tight">{t("adoorSparsham") || "Menu"}</span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 bg-charcoal/5 dark:bg-ivory/5 rounded-full hover:bg-charcoal/10 dark:hover:bg-ivory/10 transition-colors text-foreground"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-2">
                {links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`text-base font-bold p-3.5 rounded-xl transition-colors ${isActive ? 'bg-forest-green/10 dark:bg-gold/10 text-forest-green dark:text-gold' : 'text-foreground hover:bg-charcoal/5 dark:hover:bg-ivory/5'}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
              <div className="p-5 border-t border-charcoal/5 dark:border-ivory/5 flex flex-col gap-4 bg-charcoal/[0.02] dark:bg-ivory/[0.02]">
                <button onClick={toggleLocale} className="w-full bg-charcoal/5 dark:bg-ivory/5 py-3.5 rounded-xl font-bold text-sm hover:bg-charcoal/10 dark:hover:bg-ivory/10 transition-colors">
                  {t("switchLang")}
                </button>
                <Link 
                  href="/public-service" 
                  className="w-full bg-forest-green text-white text-center py-4 rounded-xl font-bold uppercase tracking-wider shadow-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("publicServiceHub")}
                </Link>
              </div>
            </div>
          </div>
      )}
    </>
  );
}
