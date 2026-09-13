import ProjectForm from '../_components/ProjectForm';

export default async function NewProjectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  return (
    <div>
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Create New Project</h1>
        <p className="opacity-70">Add a new development project or initiative.</p>
      </header>

      <ProjectForm locale={locale} />
    </div>
  );
}
