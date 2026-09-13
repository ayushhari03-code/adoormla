'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateTheme(formData: FormData) {
  const locale = formData.get('locale') as string;
  const theme = formData.get('theme') as string;
  const supabase = await createClient();

  // We are hijacking the gallery table to store the global theme setting
  // We'll use a specific category 'GLOBAL_THEME' to identify it
  const { data: existingSettings } = await supabase
    .from('gallery')
    .select('id')
    .eq('category', 'GLOBAL_THEME')
    .limit(1)
    .maybeSingle();

  if (existingSettings) {
    // Update existing theme
    await supabase.from('gallery').update({
      title: theme,
      image_url: 'theme-placeholder.png' // required by schema
    }).eq('id', existingSettings.id);
  } else {
    // Create new theme setting
    await supabase.from('gallery').insert({
      title: theme,
      category: 'GLOBAL_THEME',
      image_url: 'theme-placeholder.png', // required by schema
      published: true
    });
  }

  // Revalidate homepage and admin theme page
  revalidatePath(`/${locale}`);
  revalidatePath(`/${locale}/admin/theme`);
  redirect(`/${locale}/admin/theme?success=true`);
}

