import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";

const handleI18nRouting = createMiddleware({
  locales: ["en", "zh", "ja"],
  defaultLocale: "en",
});

export default function proxy(request: NextRequest) {
  return handleI18nRouting(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
