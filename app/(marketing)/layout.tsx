import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";
import Header from "@/components/layout/header/Header";
import 
  import Footer from "@/components/layout/footer/Footer";

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
  // 1. Title
  title: {
    default: "Charm | Where your money and life philosophy align.",
    template: "%s | Charm",
  },

  // 2. Description
  description:
    "Discover your financial personality with the Charm Money Indicator®. Charm is a financial educational system offering personalized tracking and advice to align your money with your life philosophy.",

  // 3. Keywords
  keywords: [
    "Financial Personality Test",
    "Charm Money Indicator",
    "CMI-I",
    "Financial Tracking",
    "Money Psychology",
    "Financial Advice",
    "Life Philosophy",
  ],

  // 4. Open Graph (Social Media Previews)
  openGraph: {
    title: "Charm | Where your money and life philosophy align.",
    description: "Take the CMI-I test and discover your financial personality.",
    url: "https://domain.com", // TO-DO: add domain
    siteName: "Charm",
    locale: "en_US",
    type: "website",
    images: [{ url: "images/charm-logo.png", width: 1200, height: 630 }],
  },
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${optima.variable} antialiased`}>
        <div className="flex min-h-screen w-full flex-col">
          <Header />
          <main className="flex flex-1 flex-col px-4 pt-10 lg:px-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
