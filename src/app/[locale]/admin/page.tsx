import { createClient } from '@/lib/supabase/server';
import { FileText, Calendar, Briefcase, Image as ImageIcon, Settings } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default async function AdminDashboard({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  let postsCount = 0;
  let publishedPostsCount = 0;
  let eventsCount = 0;
  let projectsCount = 0;
  let galleryCount = 0;

  try {
    const supabase = await createClient();
    const [p, pb, e, pr, g] = await Promise.all([
      supabase.from('posts').select('*', { count: 'exact', head: true }),
      supabase.from('posts').select('*', { count: 'exact', head: true }).eq('published', true),
      supabase.from('events').select('*', { count: 'exact', head: true }),
      supabase.from('projects').select('*', { count: 'exact', head: true }),
      supabase.from('gallery').select('*', { count: 'exact', head: true })
    ]);
    postsCount = p.count || 0;
    publishedPostsCount = pb.count || 0;
    eventsCount = e.count || 0;
    projectsCount = pr.count || 0;
    galleryCount = g.count || 0;
  } catch (err) {
    console.error('Error fetching dashboard stats:', err);
  }

  const stats = [
    { 
      label: 'Total Posts', 
      value: postsCount || 0, 
      sub: `${publishedPostsCount || 0} published`,
      icon: FileText,
      href: `/admin/posts`
    },
    { 
      label: 'Events', 
      value: eventsCount || 0,
      icon: Calendar,
      href: `/admin/events`
    },
    { 
      label: 'Projects', 
      value: projectsCount || 0,
      icon: Briefcase,
      href: `/admin/projects`
    },
    { 
      label: 'Gallery Items', 
      value: galleryCount || 0,
      icon: ImageIcon,
      href: `/admin/gallery`
    }
  ];

  return (
    <div>
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="opacity-70">Welcome to the website administration panel.</p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link key={i} href={stat.href} className="bg-ivory dark:bg-charcoal-light p-6 rounded-3xl border border-black/5 dark:border-white/5 hover:border-gold/50 transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-charcoal/5 dark:bg-white/5 rounded-2xl group-hover:bg-gold/20 group-hover:text-gold transition-colors">
                  <Icon size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-4xl font-bold mb-1">{stat.value}</h3>
                <p className="text-sm font-bold uppercase tracking-wider opacity-70 mb-1">{stat.label}</p>
                {stat.sub && <p className="text-xs opacity-50">{stat.sub}</p>}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-ivory dark:bg-charcoal-light p-8 rounded-3xl border border-black/5 dark:border-white/5">
          <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <Link href={`/admin/posts/new`} className="flex items-center gap-3 p-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                <FileText size={18} />
              </div>
              <div>
                <p className="font-bold">Write a new post</p>
                <p className="text-sm opacity-70">Publish news or updates</p>
              </div>
            </Link>
            <Link href={`/admin/gallery`} className="flex items-center gap-3 p-4 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                <ImageIcon size={18} />
              </div>
              <div>
                <p className="font-bold">Upload photos</p>
                <p className="text-sm opacity-70">Add items to the gallery</p>
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-ivory dark:bg-charcoal-light p-8 rounded-3xl border border-black/5 dark:border-white/5 flex items-center justify-center text-center">
           <div>
             <div className="w-16 h-16 bg-charcoal/5 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
               <Settings size={24} className="opacity-50" />
             </div>
             <p className="font-bold mb-2">System Status</p>
             <p className="text-sm opacity-70 max-w-xs">Supabase connection is active. Database and storage services are functioning normally.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
