'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const locale = formData.get('locale') as string || 'en'

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect(`/${locale}/admin/login?error=Invalid credentials`)
  }

  revalidatePath(`/${locale}/admin`, 'layout')
  redirect(`/${locale}/admin`)
}
