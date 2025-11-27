"use client";

import { mainNavItems } from "@/lib/navigation";
import NavLink from "./NavLink";
import React from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type DesktopNavProps = {
  className?: string;
};

function DesktopNav({ className }: DesktopNavProps) {
  const t = useTranslations("header");

  return (
    <nav
      className={cn(
        "flex items-center gap-6", // display behavior handled by parent (e.g. hidden nav:flex)
        className
      )}
    >
      {mainNavItems.map((item, index) => (
        <React.Fragment key={item.href}>
          {/* divider line */}
          {index > 0 && (
            <span className="h-6 w-px bg-foreground" aria-hidden="true" />
          )}

          <NavLink item={item} label={t(item.labelKey)} />
        </React.Fragment>
      ))}
    </nav>
  );
}

export default DesktopNav;