"use client";

import { mainNavItems } from "@/lib/navigation";
import NavLink from "./NavLink";
import React from "react";

function DesktopNav() {
  return (
    <nav className="hidden lg:flex items-center gap-6">
      {mainNavItems.map((item, index) => (
        <React.Fragment key={item.href}>
          {/* divider line */}
          {index > 0 && (
            <span className="h-6 w-px bg-foreground" aria-hidden="true" />
          )}

          <NavLink item={item} />
        </React.Fragment>
      ))}
    </nav>
  );
}

export default DesktopNav;