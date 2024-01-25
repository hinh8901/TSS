import { getRequestConfig } from "next-intl/server"

export const defaultLocale = "en"
export const locales = [defaultLocale, "vi"]

export default getRequestConfig(async ({ locale }) => {
  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
