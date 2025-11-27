import Image from "next/image";
import Link from "next/link";
import DesktopNav from "./DesktopNav";
import { GlobeIcon } from "@/components/ui/icons/lucide-globe";
import MobileNav from "./MobileNav";

function Header() {
  return (
    <header className="w-full h-[88px] sticky top-0 x-40 bg-marble bg-cover bg-center rounded-b-3xl overflow-hidden">
      <div className="max-w-[1200px] md:max-w-[1512px] mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        {/* Left: Logo + Desktop Nav */}
        <div className="flex items-center gap-6 translate-y-[-2px]">
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

          <div className="hidden nav:flex translate-y-[2px]">
            <DesktopNav />
          </div>
        </div>

        {/* Right: Desktop Utility Nav*/}
        <div className="hidden nav:flex items-center gap-6">
          {/* Language Switch */}
          <button
            type="button"
            aria-label="Change language"
            className="inline-flex h-9 w-9 items-center justify-center"
          >
            <GlobeIcon />
          </button>

          {/* Log In */}
          <Link
            href="/login"
            className="text-sm font-semibold underline underline-offset-2"
          >
            Log In
          </Link>

          {/* Try Charm for Free (signup) */}
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-full bg-foreground/80 px-4 py-1.5 text-sm font-semibold text-white shadow-md hover:bg-foreground"
          >
            Try Charm for Free
          </Link>
        </div>

        {/* Right: Mobile Nav Trigger */}
        <div className="nav:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

export default Header;
