"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/lib/navigation";
import { useLocale } from "next-intl";
import { routing } from "@/i18n/routing";

type NavLinkProps = {
  item: NavItem;
  label: string;
  exact?: boolean;
  className?: string;
  onClick?: () => void;
  variant?: "desktop" | "mobile";
};

const LOCALES = routing.locales;
type Locale = (typeof LOCALES)[number];

function stripLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return "/";

  const maybeLocale = segments[0] as Locale;

  if (LOCALES.includes(maybeLocale)) {
    const rest = segments.slice(1); // ["cmi-test"]
    return "/" + rest.join("/"); // "/cmi-test"
  }

  return pathname;
}

function NavLink({
  item,
  label,
  exact = false,
  className = "",
  onClick,
  variant = "desktop",
}: NavLinkProps) {
  const pathname = usePathname();
  const locale = useLocale();

  const normalizedPath = stripLocale(pathname);

  const isActive =
    !item.external &&
    (exact
      ? normalizedPath === item.href
      : normalizedPath === item.href ||
        normalizedPath.startsWith(item.href + "/"));

  const baseClasses =
    "text-sm font-secondary font-semibold transition-colors duration-150";

  const activeClasses =
    variant === "mobile"
      ? "block w-full rounded-full px-4 py-2 bg-accent text-white shadow-md"
      : "rounded-full px-4 py-1.5 bg-accent text-white rounded-full px-4 py-1.5 shadow-md";

  const inactiveClasses =
    variant === "mobile"
      ? "block w-full rounded-full px-4 py-2 bg-background/70 text-foreground/85 border border-foreground/10 transition-all duration-200 hover:-translate-y-[1.5px] hover:bg-accent/5 hover:border-accent/60 hover:text-accent hover:shadow-md active:scale-[0.97] active:bg-accent/10 active:border-accent/60 active:text-accent"
      : "rounded-full px-4 py-1.5 text-foreground/80 hover:bg-accent hover:text-white hover:rounded-full hover:px-4 hover:py-1.5 hover:shadow-md transition-all duration-200";

  // external links: <a> + new tab

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer"
        onClick={onClick}
        className={cn(
          baseClasses,
          isActive ? activeClasses : inactiveClasses,
          className
        )}
      >
        {label}
      </a>
    );
  }

  const localizedHref =
    item.href === "/" ? `/${locale}` : `/${locale}${item.href}`;

  // internal links: next/link
  return (
    <Link
      href={localizedHref}
      aria-current={isActive ? "page" : undefined}
      onClick={onClick}
      className={cn(
        baseClasses,
        isActive ? activeClasses : inactiveClasses,
        className
      )}
    >
      {label}
    </Link>
  );
}

export default NavLink;
