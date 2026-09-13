import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { updateSession } from './lib/supabase/middleware';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. Always execute next-intl middleware for internationalization routing
  const response = intlMiddleware(request);

  // 2. Only invoke Supabase auth checks for admin routes
  const isAdminRoute = pathname.match(/^\/(en|ml)\/admin/) || pathname.startsWith('/admin');

  if (isAdminRoute) {
    try {
      return await updateSession(request, response);
    } catch (err) {
      console.error('Middleware session check failed:', err);
      return response;
    }
  }

  // 3. For all public pages, return response directly
  return response;
}

export const config = {
  // Match only internationalized pathnames, and bypass _next, api, and public static files
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)']
};
