// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const unprotectedRoutes = ['/', '/login', 'register'];
const protectedRoutes = ['/app'];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const url = request.nextUrl.clone();
  if (token && unprotectedRoutes.includes(request.nextUrl.pathname)) {
    url.pathname = '/app';
    return NextResponse.redirect(url);
  }

  if (!token && protectedRoutes.includes(request.nextUrl.pathname)) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/login', '/register', '/app'],
};
