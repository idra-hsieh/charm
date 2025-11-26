"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/lib/navigation";

type NavLinkProps = {
  item: NavItem;
  exact?: boolean;
  className: string;
  onClick?: () => void;
};

function NavLink({ item, exact = false, className, onClick }: NavLinkProps) {
  const pathname = usePathname();

  const isActive =
    !item.external &&
    (exact
      ? pathname === item.href
      : pathname === item.href || pathname.startsWith(item.href + "/"));

  const baseClasses =
    "text-sm font-secondary font-semibold transition-colors duration-150";

  const activeClasses =
    "bg-accent text-white rounded-full px-4 py-1.5 shadow-md";

  const inactiveClasses = "text-foreground/80 hover:text-accent";

  // external links: <a> + new tab

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer"
        onClick={onClick}
        className={cn(baseClasses, inactiveClasses, className)}
      >
        {item.label}
      </a>
    );
  }

  // internal links: next/link
  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      onClick={onClick}
      className={cn(
        baseClasses,
        isActive ? activeClasses : inactiveClasses,
        className
      )}
    >
      {item.label}
    </Link>
  );
}

export default NavLink;
