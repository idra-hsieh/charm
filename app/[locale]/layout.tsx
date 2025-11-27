// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const optima = localFont({
  src: [
    {
      path: "../fonts/Optima/optima-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Optima/optima-italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/Optima/optima-medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Optima/optima-bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-optima",
});

export const metadata: Metadata = {
  title: {
    default: "Charm",
    template: "%s | Charm",
  },
  description:
    "Charm helps you build a calm, confident relationship with money — grounded in psychology, clarity, and daily practice.",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${optima.variable} antialiased`}>
        {/* next-intl plugin + i18n/request.ts will inject locale + messages here */}
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}

export default RootLayout;
