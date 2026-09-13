import { Link } from '@/i18n/routing';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { LogOut, LayoutDashboard, FileText, Calendar, Briefcase, Image as ImageIcon, Settings, Palette } from 'lucide-react';
import { revalidatePath } from 'next/cache';

async function signOut() {
  'use server';
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/en/admin', 'layout');
  redirect('/en/admin/login');
}

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  
  let user = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data?.user || null;
  } catch (err) {
    console.error('Auth error in AdminLayout:', err);
  }

  if (!user) {
    // If not authenticated, we don't render the admin sidebar.
    // The middleware handles the actual redirect to the login page.
    // If they are on the login page, this allows it to render cleanly.
    return (
      <div className="min-h-screen bg-charcoal/5 dark:bg-charcoal text-charcoal dark:text-ivory">
        {children}
      </div>
    );
  }

  const navItems = [
    { label: 'Dashboard', href: `/admin`, icon: LayoutDashboard },
    { label: 'Posts', href: `/admin/posts`, icon: FileText },
    { label: 'Events', href: `/admin/events`, icon: Calendar },
    { label: 'Projects', href: `/admin/projects`, icon: Briefcase },
    { label: 'Gallery', href: `/admin/gallery`, icon: ImageIcon },
    { label: 'Theme', href: `/admin/theme`, icon: Palette },
    { label: 'Settings', href: `/admin/settings`, icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-charcoal/5 dark:bg-charcoal text-charcoal dark:text-ivory flex">
      {/* Sidebar */}
      <aside className="w-64 bg-ivory dark:bg-charcoal-light border-r border-black/5 dark:border-white/5 hidden md:flex flex-col">
        <div className="p-6 border-b border-black/5 dark:border-white/5">
          <Link href="/" className="text-xl font-bold font-sans tracking-tight">
            Admin Panel
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors font-medium text-sm"
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-black/5 dark:border-white/5">
          <div className="mb-4 px-4 text-xs opacity-60 truncate">
            {user.email}
          </div>
          <form action={signOut}>
            <button className="flex w-full items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors font-medium text-sm">
              <LogOut size={18} />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <header className="md:hidden bg-ivory dark:bg-charcoal-light p-4 border-b border-black/5 dark:border-white/5 flex justify-between items-center">
          <span className="font-bold">Admin Panel</span>
          <form action={signOut}>
            <button className="p-2 bg-black/5 dark:bg-white/5 rounded-lg">
              <LogOut size={18} />
            </button>
          </form>
        </header>

        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
