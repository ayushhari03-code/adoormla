import { createClient } from '@/lib/supabase/server';
import { Link } from '@/i18n/routing';
import { Plus, Edit } from 'lucide-react';
import { deleteProject } from './actions';
import DeleteProjectButton from './_components/DeleteProjectButton';

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const supabase = await createClient();

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Projects</h1>
          <p className="opacity-70">Manage development projects and initiatives.</p>
        </div>
        <Link 
          href={`/admin/projects/new`}
          className="bg-gold text-charcoal px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-sm flex items-center gap-2 hover:bg-gold/90 transition-colors"
        >
          <Plus size={18} /> New Project
        </Link>
      </header>

      <div className="bg-ivory dark:bg-charcoal-light rounded-3xl border border-black/5 dark:border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-black/5 dark:bg-white/5 border-b border-black/5 dark:border-white/5">
              <tr>
                <th className="p-4 font-bold uppercase text-xs tracking-wider opacity-70">Project Title</th>
                <th className="p-4 font-bold uppercase text-xs tracking-wider opacity-70">Status</th>
                <th className="p-4 font-bold uppercase text-xs tracking-wider opacity-70 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {projects?.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-8 text-center opacity-50">
                    No projects found. Create your first project!
                  </td>
                </tr>
              )}
              {projects?.map((project) => (
                <tr key={project.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <td className="p-4 font-medium">{project.title}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      project.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      project.status === 'Ongoing' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                      'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                    }`}>
                      {project.status || 'Planned'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link 
                        href={`/admin/projects/${project.id}/edit`}
                        className="p-2 bg-charcoal/5 dark:bg-white/5 rounded-lg hover:text-gold transition-colors"
                      >
                        <Edit size={16} />
                      </Link>
                      <DeleteProjectButton id={project.id} locale={locale} deleteAction={deleteProject} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
