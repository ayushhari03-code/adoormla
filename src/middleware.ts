import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { updateSession } from './lib/supabase/middleware';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  // First, apply next-intl middleware to handle routing/locales
  const response = intlMiddleware(request);

  // Then, apply Supabase session update to the response
  return await updateSession(request, response);
}

export const config = {
  // Match only internationalized pathnames, and bypass _next, api, and public files
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)']
};
