"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/lib/navigation";
import { useLocale } from "next-intl";

type NavLinkProps = {
  item: NavItem;
  label: string;
  exact?: boolean;
  className?: string;
  onClick?: () => void;
  variant?: "desktop" | "mobile";
};

const LOCALES = ["en", "ja"] as const;
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
      : "bg-accent text-white rounded-full px-4 py-1.5 shadow-md";

  const inactiveClasses =
    variant === "mobile"
      ? "block w-full rounded-full px-4 py-2 bg-background/70 text-foreground/85 border border-foreground/10 hover:border-accent/60 hover:bg-accent/5 hover:text-accent"
      : "text-foreground/80 hover:text-accent";

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
