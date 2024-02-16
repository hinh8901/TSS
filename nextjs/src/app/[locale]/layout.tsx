import type { Metadata } from "next";
import localFont from "next/font/local"
import { Open_Sans } from "next/font/google";

import "./../globals.css";
import TanStackQueryClientProvider from "@/providers/QueryClientProvider";
import NextIntlClientProvider from "@/providers/NextIntlClientProvider";

const openSans = Open_Sans({
  subsets: ["vietnamese"],
  variable: "--font-open-sans"
});

const pacifico = localFont({
  src: "./../../../public/fonts/Pacifico-Regular.ttf",
  variable: "--font-pacifico",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale} className={`${pacifico.variable} ${openSans.variable}`}>
      <body suppressHydrationWarning>
        <NextIntlClientProvider>
          <TanStackQueryClientProvider>
            {children}
          </TanStackQueryClientProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
