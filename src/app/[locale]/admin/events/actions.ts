'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createEvent(formData: FormData) {
  const supabase = await createClient();
  const locale = formData.get('locale') as string;
  
  const title = formData.get('title') as string;
  const dateStr = formData.get('date') as string;
  const timeStr = formData.get('time') as string;
  const location = formData.get('location') as string;
  const description = formData.get('description') as string;
  const published = formData.get('published') === 'true';

  // Generate a random slug to guarantee uniqueness, or use title
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 8);

  // Combine date and time into event_date timestamptz
  const event_date = new Date(`${dateStr}T${timeStr || '00:00'}:00`).toISOString();

  const { error } = await supabase.from('events').insert({
    title,
    slug,
    event_date,
    location,
    description,
    published,
  });

  if (error) throw new Error(error.message);

  revalidatePath(`/${locale}/admin/events`);
  redirect(`/${locale}/admin/events`);
}

export async function updateEvent(formData: FormData) {
  const supabase = await createClient();
  const locale = formData.get('locale') as string;
  const id = formData.get('id') as string;
  
  const title = formData.get('title') as string;
  const dateStr = formData.get('date') as string;
  const timeStr = formData.get('time') as string;
  const location = formData.get('location') as string;
  const description = formData.get('description') as string;
  const published = formData.get('published') === 'true';

  const event_date = new Date(`${dateStr}T${timeStr || '00:00'}:00`).toISOString();

  const { error } = await supabase.from('events').update({
    title,
    event_date,
    location,
    description,
    published,
  }).eq('id', id);

  if (error) throw new Error(error.message);

  revalidatePath(`/${locale}/admin/events`);
  redirect(`/${locale}/admin/events`);
}

export async function deleteEvent(formData: FormData) {
  const supabase = await createClient();
  const locale = formData.get('locale') as string;
  const id = formData.get('id') as string;

  const { error } = await supabase.from('events').delete().eq('id', id);

  if (error) throw new Error(error.message);

  revalidatePath(`/${locale}/admin/events`);
}
