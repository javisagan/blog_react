import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const adminCookie = request.cookies.get(process.env.AUTH_COOKIE_NAME);

  // Proteger rutas de admin
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!adminCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Si el usuario está logueado, redirigir de /login a /admin
  if (pathname === '/admin/login' && adminCookie) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin/login'],
};