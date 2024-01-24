import { NextRequest, NextResponse } from "next/server"

const locales = ["en", "vi"]

const getLocale = (request: NextRequest) => {
  const { pathname } = request.nextUrl
  const locale = locales.find((locale) => pathname.startsWith(`/${locale}`) || pathname === `/${locale}`)
  return locale || "en"
}

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}`) || pathname === `/${locale}`)

  if (pathnameHasLocale) return NextResponse.next()

  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  console.log("request", request)
  return Response.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
}
