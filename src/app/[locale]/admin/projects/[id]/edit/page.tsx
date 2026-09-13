import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import ProjectForm from '../../_components/ProjectForm';

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ locale: string, id: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const id = resolvedParams.id;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (!project) {
    redirect(`/${locale}/admin/projects`);
  }

  return (
    <div>
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Edit Project</h1>
        <p className="opacity-70">Make changes to the project details.</p>
      </header>

      <ProjectForm locale={locale} project={project} />
    </div>
  );
}
