// Importing NextResponse and NextRequest from 'next/server' to handle middleware responses and requests.
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getCookieAuthenticated } from './utils/cookie-authenticated';

// Middleware function to handle incoming requests.
export async function middleware(request: NextRequest) {

    if (request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/home', request.url));
    }

    if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') {
        const token = await getCookieAuthenticated();
        if (token) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    if (request.nextUrl.pathname === '/dashboard') {
        const token = await getCookieAuthenticated();
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        } else {
            return NextResponse.redirect(new URL('/dashboard/overview', request.url));
        }
    }

}