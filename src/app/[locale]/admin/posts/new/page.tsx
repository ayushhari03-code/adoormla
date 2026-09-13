import PostForm from '../_components/PostForm';

export default async function NewPostPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  return (
    <div>
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Create New Post</h1>
        <p className="opacity-70">Publish news, updates, and announcements.</p>
      </header>

      <PostForm locale={locale} />
    </div>
  );
}
