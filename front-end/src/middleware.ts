// Importing NextResponse and NextRequest from 'next/server' to handle middleware responses and requests.
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware function to handle incoming requests.
export async function middleware(request: NextRequest) {

    if (request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/home', request.url));
    }

    if (request.nextUrl.pathname === '/dashboard') {
        return NextResponse.redirect(new URL('/dashboard/overview', request.url));
    }
    
}