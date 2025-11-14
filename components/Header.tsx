import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header>
      <Link href="/">
        <Image src="public/images/charm-logo.png" alt="logo" />
      </Link>
    </header>
  );
}

export default Header;
