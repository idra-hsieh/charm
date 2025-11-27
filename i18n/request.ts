// i18n/request.ts
import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

const SUPPORTED_LOCALES = ["en", "ja"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

async function resolveLocale(): Promise<Locale> {
  const store = await cookies();
  const cookieLocale = store.get("locale")?.value;

  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }

  return "en";
}

export default getRequestConfig(async () => {
  // Decide locale using the cookie pattern from the docs
  const locale = await resolveLocale();

  // Import messages using the dynamic-import pattern from the docs
  // TO-DO: extend if new json added
  const header = (await import(`../messages/${locale}/header.json`)).default;
  const footer = (await import(`../messages/${locale}/footer.json`)).default;

  return {
    locale,
    messages: {
      header,
      footer,
      // TO-DO: extend if new json added
    },
  };
});
