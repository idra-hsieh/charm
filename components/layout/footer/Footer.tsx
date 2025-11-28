"use client";

import { footerSections } from "@/lib/navigation";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

type SocialKey = "instagram" | "facebook" | "linkedin" | "x" | "youtube";

const SOCIAL_ICONS: Record<SocialKey, LucideIcon> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  x: Twitter,
  youtube: Youtube,
};

function Footer() {
  const t = useTranslations("footer");

  const socialSection = footerSections.find(
    (section) => section.titleKey === "socials.title"
  );

  const navSections = footerSections.filter(
    (section) => section.titleKey !== "socials.title"
  );

  const socialItems = socialSection?.items ?? [];

  return (
    <footer className="bg-marble bg-cover bg-center pt-8 rounded-t-3xl">
      <div className="mx-auto max-w-[1200px] md:max-w-[1512px]lg:px-15 px-8">
        {/* White box */}
        <div className="overflow-hidden rounded-t-xl border border-foreground/5 bg-white/80 shadow-[0_40px_120px_rgba(0,0,0,0.3)] backdrop-blur">
          {/* Footer Navigation */}
          <div className="grid grid-cols-2 gap-y-8 gap-x-10 px-8 py-10 lg:grid-cols-4 sm:px-18 lg:px-14">
            {navSections.map((section) => (
              <div key={section.titleKey} className="space-y-4">
                {/* Title */}
                <h2 className="text-lg font-semibold text-primary">
                  {t(section.titleKey)}
                </h2>

                {/* Bullet points */}
                <ul className="space-y-2 text-sm text-primary/80">
                  {section.items.map((item) => (
                    <li key={item.labelKey}>
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-3.5 rounded-md px-1 py-1 text-left transition duration-200 ease-out hover:-translate-y-[1px] active:-translate-y-[1px] hover:text-accent active:text-accent hover:underline active:underline hover:underline-offset-4 active:underline-offset-4 hover:font-semibold active:font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent/60"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-accent/70"></span>
                        <span>{t(item.labelKey)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Copyroght & Tagline & Socials */}
          <div className="border-t border-black/10 bg-gradient-to-r from-white/70 via-white/60 to-white/70 px-10 sm:px-18 lg:px-14 py-5 dark:border-white/10 dark:from-white/5 dark:via-white/5 dark:to-white/5 md:px-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Copyroght & Tagline */}
              <p className="text-sm text-primary/70">
                <span className="font-semibold text-primary">
                  {t("meta.copyright")}
                </span>{" "}
                <span className="block md:inline mt-0.5">
                  {t("meta.tagline")}
                </span>
              </p>

              {/* Socials */}
              <div className="flex items-center gap-3 md:gap-4">
                {socialItems.map((item) => {
                  const socialKey = item.labelKey.split(".")[1] as SocialKey;
                  const Icon = SOCIAL_ICONS[socialKey];

                  if (!Icon) return null;

                  const label = t(`socials.${socialKey}`);

                  return (
                    <div key={item.labelKey} className="group relative">
                      <Link
                        href={item.href}
                        aria-label={label}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-transparent bg-primary/5 text-primary/70 transition duration-200 ease-out hover:-translate-y-[2px] active:-translate-y-[2px] hover:border-accent/60 active:border-accent/60 hover:bg-accent/10 active:bg-accent/10 hover:text-primary active:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent/60"
                        title={label}
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </Link>

                      <span className="pointer-events-none absolute left-1/2 top-[-44px] -translate-x-1/2 rounded-full bg-primary text-sm text-primary-foreground px-3 py-1 opacity-0 shadow-md transition duration-200 ease-out group-hover:translate-y-1 group-hover:opacity-100">
                        {label}
                      </span>
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
