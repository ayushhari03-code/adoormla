import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest, response: NextResponse) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY) are missing in this environment.')
    return response
  }

  try {
    let supabaseResponse = response

    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    const isAdminRoute = request.nextUrl.pathname.match(/^\/(en|ml)\/admin/) || request.nextUrl.pathname.startsWith('/admin')
    const isLoginRoute = request.nextUrl.pathname.match(/^\/(en|ml)\/admin\/login/) || request.nextUrl.pathname.startsWith('/admin/login')

    if (!isAdminRoute) {
      return supabaseResponse
    }

    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser()

    if (isAdminRoute && !isLoginRoute) {
      const localeMatch = request.nextUrl.pathname.match(/^\/(en|ml)/)
      const locale = localeMatch ? localeMatch[1] : 'en'

      if (userError || !user) {
        const url = request.nextUrl.clone()
        url.pathname = `/${locale}/admin/login`
        return NextResponse.redirect(url)
      }

      // Verify user is an admin
      const { data: adminData, error } = await supabase
        .from('admins')
        .select('user_id')
        .eq('user_id', user.id)
        .limit(1)
        .maybeSingle()

      if (error || !adminData) {
        const url = request.nextUrl.clone()
        url.pathname = `/${locale}/admin/login`
        url.searchParams.set('error', 'Unauthorized: You do not have administrator access.')
        
        try {
          await supabase.auth.signOut()
        } catch {
          // Ignore signout error
        }
        
        return NextResponse.redirect(url)
      }
    }

    return supabaseResponse
  } catch (err) {
    console.error('Error in Supabase middleware session check:', err)
    return response
  }
}
