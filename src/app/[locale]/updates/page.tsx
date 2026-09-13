import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function Updates({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  const { data: events } = await supabase
    .from("events")
    .select("*")
    .eq("published", true)
    .order("event_date", { ascending: true });

  const featuredPost = posts?.[0];
  const remainingPosts = posts?.slice(1) || [];

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <header className="mb-16 text-center">
          <h2 className="text-gold tracking-[0.2em] uppercase text-sm font-bold mb-4">News & Updates</h2>
          <h1 className="text-4xl md:text-6xl font-sans font-bold leading-tight tracking-tighter mb-6 text-charcoal dark:text-ivory">
            Latest from Adoor
          </h1>
        </header>

        {featuredPost && (
          <Link href={`/${locale}/updates/${featuredPost.slug}`} className="block mb-24 group cursor-pointer relative" data-cursor="view">
            <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden mb-8 bg-charcoal/5 dark:bg-ivory/5 shadow-xl">
              {featuredPost.cover_image_url ? (
                <img src={featuredPost.cover_image_url} alt={featuredPost.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center border-4 border-gold/20 m-4 rounded-2xl">
                  <p className="text-gold font-bold uppercase tracking-widest text-sm opacity-50">[ Featured Image ]</p>
                </div>
              )}
            </div>
            <div className="max-w-4xl mx-auto text-center">
              <span className="text-sm font-bold uppercase tracking-widest text-forest-green dark:text-gold mb-4 block">
                {new Date(featuredPost.published_at || featuredPost.created_at).toLocaleDateString()} • {featuredPost.category || 'Constituency'}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 group-hover:text-forest-green dark:group-hover:text-gold transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-lg opacity-80 leading-relaxed mb-8">
                {featuredPost.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 font-bold uppercase tracking-wider text-sm hover:text-gold transition-colors">
                Read Full Article <ArrowRight size={16} />
              </span>
            </div>
          </Link>
        )}

        {remainingPosts.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8">
            {remainingPosts.map(item => (
              <Link href={`/${locale}/updates/${item.slug}`} key={item.id} className="bg-ivory dark:bg-charcoal-light rounded-3xl overflow-hidden shadow-sm border border-black/5 dark:border-white/5 group cursor-pointer hover:-translate-y-2 transition-transform" data-cursor="view">
                <div className="aspect-[4/3] bg-charcoal/5 dark:bg-ivory/5 relative overflow-hidden">
                  {item.cover_image_url ? (
                    <img src={item.cover_image_url} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center border-2 border-gold/10 m-2 rounded-2xl">
                      <p className="text-gold font-bold uppercase tracking-widest text-[10px] opacity-30">[ Image ]</p>
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <span className="text-xs font-bold uppercase tracking-widest text-forest-green dark:text-gold mb-2 block">
                    {new Date(item.published_at || item.created_at).toLocaleDateString()}
                  </span>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-forest-green dark:group-hover:text-gold transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="opacity-70 text-sm leading-relaxed mb-6 line-clamp-3">{item.excerpt}</p>
                  <span className="inline-flex items-center gap-2 font-bold uppercase tracking-wider text-xs group-hover:text-gold transition-colors">
                    Read More <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!posts?.length && !events?.length && (
          <div className="text-center opacity-50 py-24">
            <p>No updates available at the moment. Please check back later.</p>
          </div>
        )}

        {/* EVENTS SECTION */}
        {events && events.length > 0 && (
          <div className="mt-32 border-t border-charcoal/10 dark:border-white/10 pt-24">
            <header className="mb-12 text-center">
              <h2 className="text-gold tracking-[0.2em] uppercase text-sm font-bold mb-4">Schedule</h2>
              <h1 className="text-3xl md:text-4xl font-sans font-bold leading-tight tracking-tighter mb-6 text-charcoal dark:text-ivory">
                Upcoming Events
              </h1>
            </header>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <div key={event.id} className="bg-ivory dark:bg-charcoal-light p-8 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-gold font-bold uppercase tracking-widest text-xs mb-4">
                    {new Date(event.event_date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                  {event.location && (
                    <div className="opacity-70 text-sm mb-4 font-medium flex items-center gap-2">
                      📍 {event.location}
                    </div>
                  )}
                  <p className="opacity-70 text-sm leading-relaxed">
                    {event.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
