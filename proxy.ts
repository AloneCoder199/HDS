import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Protect admin routes
    if (path.startsWith('/admin') && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Protect regular student routes
    if (path.startsWith('/dashboard/regular') && token?.role !== 'REGULAR_STUDENT') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Protect one-to-one student routes
    if (path.startsWith('/dashboard/onetoone') && token?.role !== 'ONETOONE_STUDENT') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  },
  {
    callbacks: {
      authorized({ req, token }) {
        if (!token) return false;
        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};