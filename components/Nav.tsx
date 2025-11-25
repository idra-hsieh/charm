"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Charm Money Indicator", path: "/charm-money-indicator" },
  { name: "Money Types", path: "/money-types" },
  { name: "Resources", path: "/resources" },
];

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-8">
      {links.map((link, index) => {
        const isActive = link.path === pathname;
        return (
          <Link
            href={link.path}
            key={index}
            className="flex items-center justify-center"
          >
            {isActive ? (
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2 rounded-full bg-[#C5A028] text-white text-sm font-semibold shadow-md hover:bg-[#b08d1e] transition-colors"
              >
                {link.name}
              </motion.button>
            ) : (
              <span className="capitalize font-medium text-gray-900 hover:text-[#C5A028] transition-all px-3 py-2">
                {link.name}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
