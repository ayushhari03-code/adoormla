'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProject(formData: FormData) {
  const supabase = await createClient();
  const locale = formData.get('locale') as string;
  
  const title = formData.get('title') as string;
  const status = formData.get('status') as string;
  const description = formData.get('description') as string;
  const published = formData.get('published') === 'true';

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 8);

  const { error } = await supabase.from('projects').insert({
    title,
    slug,
    status,
    description,
    published,
  });

  if (error) throw new Error(error.message);

  revalidatePath(`/${locale}/admin/projects`);
  redirect(`/${locale}/admin/projects`);
}

export async function updateProject(formData: FormData) {
  const supabase = await createClient();
  const locale = formData.get('locale') as string;
  const id = formData.get('id') as string;
  
  const title = formData.get('title') as string;
  const status = formData.get('status') as string;
  const description = formData.get('description') as string;
  const published = formData.get('published') === 'true';

  const { error } = await supabase.from('projects').update({
    title,
    status,
    description,
    published,
  }).eq('id', id);

  if (error) throw new Error(error.message);

  revalidatePath(`/${locale}/admin/projects`);
  redirect(`/${locale}/admin/projects`);
}

export async function deleteProject(formData: FormData) {
  const supabase = await createClient();
  const locale = formData.get('locale') as string;
  const id = formData.get('id') as string;

  const { error } = await supabase.from('projects').delete().eq('id', id);

  if (error) throw new Error(error.message);

  revalidatePath(`/${locale}/admin/projects`);
}
