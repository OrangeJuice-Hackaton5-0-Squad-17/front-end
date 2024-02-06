import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = localStorage.getItem('@OrangePortfolios:token')

  if (token) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
  matcher: ['/my-profile', '/my-projects', '/discover'],
}
