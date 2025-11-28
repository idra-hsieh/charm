"use client";

import { Facebook, Icon, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const NAVIGATION_SECTIONS = [
  {
    key: "learn",
    links: ["cmi_framework", "money_identities", "articles_guides"],
  },
  {
    key: "tools",
    links: ["charm_indicator", "daily_companion", "reflection_prompts"],
  },
  {
    key: "support",
    links: ["contact", "faq", "tutorial"],
  },
  {
    key: "company",
    links: ["terms", "privacy", "accessibility"],
  },
] as const;

const SOCIAL_LINKS = [
  { key: "instagram", icon: Instagram },
  { key: "facebook", icon: Facebook },
  { key: "linkedin", icon: Linkedin },
  { key: "x", icon: Twitter },
  { key: "youtube", icon: Youtube },
] as const;

function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-marble bg-cover bg-center pt-12 rounded-t-3xl">
      <div className="mx-auto max-w-[1200px] md:max-w-[1512px] px-4 sm:px-6">
        {/* White box */}
        <div className="overflow-hidden rounded-t-xl border border-black/5 bg-white/80 shadow-[0_20px_120px_rgba(0,0,0,0.15)] backdrop-blur">
          {/* Footer Navigation */}
          <div className="grid grid-cols-2 gap-y-8 gap-x-10 px-6 py-10 md:grid-cols-4 md:px-10 lg:px-14">
            {NAVIGATION_SECTIONS.map((section) => (
              <div key={section.key} className="space-y-4">
                {/* Title */}
                <h2 className="text-lg font-semibold text-primary">{t(`${section.key}.title`)}</h2>

                {/* Bullet points */}
                <ul className="space-y-3 text-sm text-primary/80">
                  {section.links.map((linkKey) => (
                    <li key={linkKey}>
                      <Link
                        href="#"
                        className="inline-flex items-center gap-1.5 rounded-md px-1 py-1 text-left transition duration-200 ease-out hover:-translate-y-[1px] hover:text-accent hover:underline hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent/60"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-accent/70"></span>
                        <span>{t(`${section.key}.${linkKey}`)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Copyroght & Tagline & Socials */}
          <div className="border-t border-black/10 bg-gradient-to-r from-white/70 via-white/60 to-white/70 px-6 py-5 dark:border-white/10 dark:from-white/5 dark:via-white/5 dark:to-white/5 md:px-10 lg:px-14">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Copyroght & Tagline */}
              <p className="text-sm text-primary/70">
                <span className="font-semibold text-primary">{t("meta.copyright")}</span>{" "}
                {t("meta.tagline")}
              </p>

              {/* Socials */}
              <div className="flex items-center gap-3 md:gap-4">
                {SOCIAL_LINKS.map(({ key, icon: Icon }) => {
                  const label = t(`socials.${key}`);

                  return (
                    <div key={key} className="group relative">
                      <Link
                        href="#"
                        aria-label={label}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-transparent bg-primary/5 text-primary/70 transition duration-200 ease-out hover:-translate-y-[2px] hover:border-accent/60 hover:bg-accent/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent/60"
                      ></Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
