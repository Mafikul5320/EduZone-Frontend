import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { UserService } from './service/user.service'
import { userRole } from './constant/role.type';


export async function proxy(request: NextRequest) {

    const session = await UserService.getSession();

    const { pathname } = request.nextUrl
    console.log(pathname)

    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    const role = session.user.role;


    if (pathname.startsWith('/admin-dashboard') && role !== userRole.ADMIN) {
        return NextResponse.redirect(new URL('/unauthorized', request.url))
    }


    if (pathname.startsWith('/student-dashboard') && role !== userRole.STUDENT) {
        return NextResponse.redirect(new URL('/unauthorized', request.url))
    }


    if (pathname.startsWith('/tutor-dashboard') && role !== userRole.TUTOR) {
        return NextResponse.redirect(new URL('/unauthorized', request.url))
    }


    return NextResponse.next()
}


export const config = {
    matcher: [
        "/admin-dashboard",
        "/admin-dashboard/:path*",
        "/student-dashboard",
        "/student-dashboard/:path*",
        "/tutor-dashboard",
        "/tutor-dashboard/:path*",
    ]
}