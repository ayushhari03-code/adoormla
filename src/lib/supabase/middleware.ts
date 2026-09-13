import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest, response: NextResponse) {
  let supabaseResponse = response

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isApiRoute = request.nextUrl.pathname.startsWith('/api')
  const isAdminRoute = request.nextUrl.pathname.match(/^\/(en|ml)\/admin/) || request.nextUrl.pathname.startsWith('/admin')
  const isLoginRoute = request.nextUrl.pathname.match(/^\/(en|ml)\/admin\/login/) || request.nextUrl.pathname.startsWith('/admin/login')

  if (isAdminRoute && !isLoginRoute) {
    const localeMatch = request.nextUrl.pathname.match(/^\/(en|ml)/)
    const locale = localeMatch ? localeMatch[1] : 'en' // Default to en if no locale found

    if (!user) {
      // Redirect unauthenticated users
      const url = request.nextUrl.clone()
      url.pathname = `/${locale}/admin/login`
      return NextResponse.redirect(url)
    }

    // Verify user is an admin
    const { data: adminData, error } = await supabase
      .from('admins')
      .select('user_id')
      .eq('user_id', user.id)
      .single()

    if (error || !adminData) {
      // Authenticated but not an admin
      const url = request.nextUrl.clone()
      url.pathname = `/${locale}/admin/login`
      url.searchParams.set('error', 'Unauthorized: You do not have administrator access.')
      
      // Optionally sign them out completely so they don't get stuck
      await supabase.auth.signOut()
      
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
