import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";

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
    default: "Dashboard | Charm",
    template: "%s | Charm",
  },
  description: "Manage your financial journey.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${optima.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
