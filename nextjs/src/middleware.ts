import { NextRequest, NextResponse } from "next/server"
import createIntlMiddleware from "next-intl/middleware"

import { locales, defaultLocale } from "./i18n"

export const middleware = (request: NextRequest) => {
  const handleI18nRouting = createIntlMiddleware({
    locales,
    defaultLocale,
  })

  const response = handleI18nRouting(request)
  return response
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
