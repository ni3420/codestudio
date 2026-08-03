import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected and public auth route patterns
const protectedRoutes = ['/projects', '/ide', '/settings', '/dashboard'];
const authRoutes = ['/auth'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for session cookie created by Better Auth
  // Better Auth defaults to 'better-auth.session_token' (or '__Secure-better-auth.session_token' in HTTPS/production)
  const sessionToken =
    request.cookies.get('better-auth.session_token') ||
    request.cookies.get('__Secure-better-auth.session_token');

  const isAuthenticated = Boolean(sessionToken?.value);

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // 1. Redirect unauthenticated users trying to access protected routes -> /auth
  if (isProtectedRoute && !isAuthenticated) {
    const signInUrl = new URL('/auth', request.url);
    signInUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(signInUrl);
  }

  // 2. Redirect authenticated users away from auth pages -> /projects
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/projects', request.url));
  }

  return NextResponse.next();
}

// Config matcher to exclude static assets, API routes, and Next.js internal files
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};