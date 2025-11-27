"use client";

import { GlobeIcon } from "@/components/ui/icons/lucide-globe";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNavItems } from "@/lib/navigation";
import { CiMenuFries } from "react-icons/ci";
import NavLink from "./NavLink";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

function MobileNav() {
  const t = useTranslations("header");

  return (
    <Sheet>
      {/* Trigger button */}
      <SheetTrigger asChild>
        <button
          aria-label="Open navigation menu"
          className="
          inline-flex items-center justify-center rounded-md
          transition-all duration-150 hover:opacity-80 hover:scale-[1.05]
          active:scale-[0.97] focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-accent
        "
        >
          <CiMenuFries className="h-6 w-6 text-accent stroke-[1]" />
        </button>
      </SheetTrigger>

      {/* Slide-over Panel */}
      <SheetContent
        side="right"
        className={cn(
          "flex h-full w-full max-w-xs flex-col",
          "border-l border-foreground/10 bg-marble backdrop-blur-xl",
          "px-4 pt-6 pb-6 gap-6"
        )}
      >
        {/* Centered Logo */}
        <div className="flex w-full justify-center items-center gap-6 mt-4">
          <Link
            href="/"
            aria-label="Charm home"
            className="flex items-center gap-2"
          >
            <Image
              src="/images/charm-logo.png"
              alt="Charm logo"
              width={116}
              height={43}
              priority
            />
          </Link>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-foreground/10 mt-2" />

        {/* Main navigation */}
        <nav className="flex flex-col gap-2 mt-2">
          {mainNavItems.map((item) => {
            const label = t(item.labelKey);

            return (
              <SheetClose asChild key={item.href}>
                <NavLink item={item} label={label} variant="mobile" />
              </SheetClose>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="h-px w-full bg-foreground/10 mt-2" />

        {/* Auth actions */}
        <div className="mt-1 flex flex-col gap-2">
          {/* Log In */}
          <SheetClose asChild>
            <Link
              href="/login"
              className="w-full rounded-full border border-foreground/20 bg-background/80 px-4 py-2 text-sm font-secondary font-semibold text-foreground/85 text-center hover:border-accent/70 hover:bg-accent/5 transition-all"
            >
              {t("utility.login")}
            </Link>
          </SheetClose>

          {/* Try Charm for Free */}
          <SheetClose asChild>
            <Link
              href="/signup"
              className="w-full rounded-full bg-foreground/80 px-4 py-2 text-sm font-secondary font-semibold text-white text-center shadow-md hover:bg-foreground transition-colors"
            >
              {t("utility.signup")}
            </Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;
