import { getRequestConfig } from "next-intl/server"

export const defaultLocale = "en"
// export const locales = [defaultLocale, "vi"]
export const locales = [defaultLocale]
export const localePrefix = "as-needed"

export default getRequestConfig(async ({ locale }) => {
  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
