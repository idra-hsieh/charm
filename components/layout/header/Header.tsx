import Image from "next/image";
import Link from "next/link";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import LanguageSwitcher from "./LanguageSwitcher";
import UtilityNav from "./UtilityNav";

function Header() {
  return (
    <header className="w-full h-[88px] sticky top-0 z-40 x-40 bg-marble bg-[#050505] bg-center rounded-b-3xl overflow-hidden">
      <div className="max-w-[1200px] md:max-w-[1512px] mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        {/* Left: Logo + Desktop Nav */}
        <div className="flex items-center gap-6 translate-y-[-4px]">
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
          <LanguageSwitcher />

          {/* Log In */}
          <UtilityNav variant="login" />

          {/* Try Charm for Free (signup) */}
          <UtilityNav variant="signup" />
        </div>

        {/* Right: Language Switch + Mobile Nav Trigger */}
        <div className="nav:hidden flex items-center gap-6">
          {/* Language Switch */}
          <LanguageSwitcher />

          {/* Mobile Nav Trigger */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

export default Header;
