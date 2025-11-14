import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header>
      <Link href="/">
        <Image
          src="/images/charm-logo.png"
          width={120}
          height={60}
          alt="logo"
        />
      </Link>
    </header>
  );
}

export default Header;
