import { Link } from "@/i18n/routing";


export default function Footer() {
  return (
    <footer className="bg-forest-green text-ivory py-16 border-t border-forest-green-light">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-bold uppercase tracking-widest mb-4">
            Adv. CV Santhakumar
          </h2>
          <p className="text-sm opacity-80 mb-6 max-w-sm leading-relaxed">
            Member of the Legislative Assembly<br />
            Adoor Assembly Constituency<br />
            Kerala, India
          </p>
          <div className="flex gap-4">
            <a 
              href="https://www.facebook.com/share/14k3JuxjfVX/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-gold transition-colors" 
              aria-label="Facebook"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a 
              href="https://www.instagram.com/c_v_santhakumar_mla/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-gold transition-colors" 
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" className="hover:text-gold transition-colors" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
            </a>
            <a href="#" className="hover:text-gold transition-colors" aria-label="X (Twitter)">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4 opacity-50">Explore</h3>
          <ul className="flex flex-col gap-2">
            <li><Link href="/" className="hover:text-gold transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-gold transition-colors">About</Link></li>
            <li><Link href="/adoor" className="hover:text-gold transition-colors">Adoor</Link></li>
            <li><Link href="/initiatives" className="hover:text-gold transition-colors">Initiatives</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4 opacity-50">Connect</h3>
          <ul className="flex flex-col gap-2">
            <li><Link href="/public-service" className="hover:text-gold transition-colors">Public Service</Link></li>
            <li><Link href="/legislative" className="hover:text-gold transition-colors">Legislative Work</Link></li>
            <li><Link href="/updates" className="hover:text-gold transition-colors">Updates</Link></li>
            <li><Link href="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-ivory/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs opacity-60">
        <p>&copy; {new Date().getFullYear()} Logsphere Technologies. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-ivory transition-colors">Privacy Policy</Link>
          <Link href="/accessibility" className="hover:text-ivory transition-colors">Accessibility</Link>
          <Link href="/terms" className="hover:text-ivory transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
