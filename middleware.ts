import { NextRequest, NextResponse } from 'next/server';
export function middleware(request: NextRequest) { if (request.cookies.get('gearup_session')) return NextResponse.next(); const login = new URL('/auth/login', request.url); login.searchParams.set('next', request.nextUrl.pathname); return NextResponse.redirect(login); }
export const config = { matcher: ['/dashboard/:path*', '/profile'] };
