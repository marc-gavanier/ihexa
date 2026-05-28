import { type NextRequest, NextResponse } from 'next/server';

const ANONYMOUS_ID_COOKIE = 'arckit_aid';
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export const proxy = (request: NextRequest): NextResponse => {
  const response = NextResponse.next();
  if (request.cookies.has(ANONYMOUS_ID_COOKIE)) return response;
  response.cookies.set(ANONYMOUS_ID_COOKIE, crypto.randomUUID(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: ONE_YEAR_SECONDS,
    path: '/'
  });
  return response;
};

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.*\\.xml).*)']
};
