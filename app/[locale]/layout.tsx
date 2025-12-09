import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

export const dynamic = "force-dynamic";

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

// TO-DO: update formal url
const BASE_URL = "https://charm-money.web.app";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "Metadata.default" });

  const currentUrl = locale === "en" ? BASE_URL : `${BASE_URL}/${locale}`;

  return {
    title: {
      default: t("title"),
      template: t("title_template"),
    },
    description: t("description"),
    keywords: t("keywords").split(",").map((k) => k.trim()),
    openGraph: {
      title: {
        default: t("title"),
        template: t("title_template"),
      },
      description: t("description"),
      url: currentUrl,
      siteName: t("open_graph.site_name"),
      locale: t("open_graph.locale"), // Automatically read language
      type: "website",
      images: [
        {
          url: "/images/charm-logo.png",
          width: 1200,
          height: 630,
          alt: t("title"),
        },
      ],
    },
  };
}

type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// export function generateStaticParams() {
//   return routing.locales.map((locale) => ({ locale }));
// }

async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.variable} ${optima.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export default RootLayout;