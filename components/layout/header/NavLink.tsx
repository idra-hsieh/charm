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

  const baseClasses = "text-sm font-semibold transition-colors duration-150";

  const activeClasses = "bg-accent text-background";
}

export default NavLink;
