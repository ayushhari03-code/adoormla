import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import PostForm from '../../_components/PostForm';

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ locale: string, id: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const id = resolvedParams.id;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (!post) {
    redirect(`/${locale}/admin/posts`);
  }

  return (
    <div>
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Edit Post</h1>
        <p className="opacity-70">Make changes to the post.</p>
      </header>

      <PostForm locale={locale} post={post} />
    </div>
  );
}
