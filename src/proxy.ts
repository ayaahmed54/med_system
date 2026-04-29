import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
    const token = await getToken({ req: request })
    const { pathname, searchParams } = request.nextUrl

    if (pathname === '/login' || pathname === '/forgot-password') {
        return NextResponse.next()
    }
    if (pathname === '/reset-password') {
        const email = searchParams.get('email')

        if (!email) {
            return NextResponse.redirect(new URL('/forgot-password', request.url))
        }
        return NextResponse.next()
    }

    if (token) {
        return NextResponse.next()
    } else {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
    ],
}
    ;