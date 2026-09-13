'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
  const supabase = await createClient()
  const locale = formData.get('locale') as string || 'en'
  
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const content = formData.get('content') as string
  const excerpt = formData.get('excerpt') as string
  const category = formData.get('category') as string
  const published = formData.get('published') === 'true'
  
  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('posts')
    .insert([
      { 
        title, 
        slug, 
        content, 
        excerpt, 
        category, 
        published,
        published_at: published ? new Date().toISOString() : null,
        created_by: user?.id
      }
    ])
    .select()

  if (error) {
    console.error('Error creating post:', error);
    throw new Error(error.message);
  }

  revalidatePath(`/${locale}/admin/posts`)
  revalidatePath(`/${locale}/updates`)
  redirect(`/${locale}/admin/posts`)
}

export async function updatePost(formData: FormData) {
  const supabase = await createClient()
  const locale = formData.get('locale') as string || 'en'
  const id = formData.get('id') as string
  
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const content = formData.get('content') as string
  const excerpt = formData.get('excerpt') as string
  const category = formData.get('category') as string
  const published = formData.get('published') === 'true'

  // fetch existing to see if published state changed
  const { data: existing } = await supabase.from('posts').select('published').eq('id', id).single()

  const { error } = await supabase
    .from('posts')
    .update({ 
      title, 
      slug, 
      content, 
      excerpt, 
      category, 
      published,
      published_at: (!existing?.published && published) ? new Date().toISOString() : undefined,
    })
    .eq('id', id)

  if (error) {
    console.error('Error updating post:', error);
    throw new Error(error.message);
  }

  revalidatePath(`/${locale}/admin/posts`)
  revalidatePath(`/${locale}/updates`)
  redirect(`/${locale}/admin/posts`)
}

export async function deletePost(formData: FormData) {
  const supabase = await createClient()
  const locale = formData.get('locale') as string || 'en'
  const id = formData.get('id') as string

  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting post:', error)
    return { error: error.message }
  }

  revalidatePath(`/${locale}/admin/posts`)
  revalidatePath(`/${locale}/updates`)
}
