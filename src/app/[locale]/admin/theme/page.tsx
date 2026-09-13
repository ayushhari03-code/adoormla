import { updateTheme } from './actions';
import { getActiveTheme } from '@/lib/theme';
import { Palette, Sparkles, Star, Moon } from 'lucide-react';

export default async function ThemeManagementPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ success?: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const resolvedSearchParams = await searchParams;
  const activeTheme = await getActiveTheme();

  const themes = [
    { id: 'default', label: 'Default Theme', icon: Palette, color: 'bg-charcoal text-ivory', desc: 'The standard professional look.' },
    { id: 'onam', label: 'Onam', icon: Sparkles, color: 'bg-amber-100 text-amber-800 border-amber-300', desc: 'Adds Pookkalam elements and Kerala gold accents.' },
    { id: 'christmas', label: 'Christmas', icon: Star, color: 'bg-red-50 text-red-800 border-red-300', desc: 'Adds stars, snow effects, and festive red/green accents.' },
    { id: 'eid', label: 'Eid', icon: Moon, color: 'bg-emerald-50 text-emerald-800 border-emerald-300', desc: 'Adds crescent moon and lantern decorations.' },
  ];

  return (
    <div>
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Theme Management</h1>
        <p className="opacity-70">Instantly switch the public website's design for festivals and events.</p>
      </header>

      {resolvedSearchParams.success && (
        <div className="mb-8 p-4 bg-green-100 text-green-800 rounded-xl font-bold border border-green-200">
          Theme successfully updated! The public website has been changed.
        </div>
      )}

      <div className="bg-ivory dark:bg-charcoal-light p-8 rounded-3xl border border-black/5 dark:border-white/5">
        <h2 className="text-xl font-bold mb-6">Select Active Theme</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {themes.map((theme) => (
            <form key={theme.id} action={updateTheme}>
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="theme" value={theme.id} />
              
              <button
                type="submit"
                className={`w-full text-left p-6 rounded-2xl border-2 transition-all group ${
                  activeTheme === theme.id 
                    ? 'border-gold shadow-md ring-4 ring-gold/20' 
                    : 'border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${theme.color}`}>
                    <theme.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{theme.label}</h3>
                    {activeTheme === theme.id && (
                      <span className="text-xs font-bold uppercase tracking-wider text-gold">Active Theme</span>
                    )}
                  </div>
                </div>
                <p className="text-sm opacity-70 ml-16">{theme.desc}</p>
              </button>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
}
