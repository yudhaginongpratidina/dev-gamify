import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();

    // REWRITE: / to /home
    if (url.pathname === '/') {
        url.pathname = '/home';
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}