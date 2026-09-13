import { Activity, BookOpen, HeartPulse, Bus, TreePine, Wifi } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function Initiatives() {
  const supabase = await createClient();

  const { data: dbProjects } = await supabase
    .from("projects")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  // Use DB projects if available, otherwise fallback to empty array
  const projects = dbProjects || [];

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <header className="mb-16 text-center">
          <h2 className="text-gold tracking-[0.2em] uppercase text-sm font-bold mb-4">Development Dashboard</h2>
          <h1 className="text-4xl md:text-6xl font-sans font-bold leading-tight tracking-tighter mb-6 text-charcoal dark:text-ivory">
            Progress in Action
          </h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto leading-relaxed">
            Track verified development initiatives across Adoor Assembly Constituency.
          </p>
        </header>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-ivory dark:bg-charcoal-light p-8 rounded-3xl shadow-sm border border-black/5 dark:border-white/5 group"
              data-cursor="view"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full">
                  Constituency Project
                </span>
                <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                  project.status?.includes("Ongoing") ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" :
                  project.status?.includes("Completed") ? "bg-green-500/10 text-green-600 dark:text-green-400" :
                  "bg-orange-500/10 text-orange-600 dark:text-orange-400"
                }`}>
                  {project.status || 'Planned'}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold mb-4 group-hover:text-forest-green dark:group-hover:text-gold transition-colors">
                {project.title}
              </h3>
              <p className="opacity-70 leading-relaxed mb-6">
                {project.description}
              </p>
              
              <div className="flex items-center gap-2 mt-auto pt-6 border-t border-charcoal/10 dark:border-ivory/10 opacity-60 text-sm font-medium">
                <span>Updated:</span>
                <span>{new Date(project.updated_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
          
          {projects.length === 0 && (
            <div className="col-span-2 text-center opacity-50 py-12">
              No projects have been published yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
