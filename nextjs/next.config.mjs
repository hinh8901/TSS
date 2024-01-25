import createNextIntlPlugin from "next-intl/plugin"

/** @type {import('next').NextConfig} */

const withNextIntl = createNextIntlPlugin("./src/i18n.ts")
const nextConfig = {
  ...withNextIntl(),
}

export default nextConfig
