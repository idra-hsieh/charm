// types
export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type FooterSection = {
  title: string;
  items: NavItem[];
};

// Header Nav
export const mainNavItems: NavItem[] = [
  { label: "Money Identity Test", href: "/cmi-test" },
  { label: "Money Identities", href: "/money-identities" },
  { label: "Resources", href: "/resources" },
  { label: "Charm App", href: "/app" },
];

export const utilityNavItems: NavItem[] = [
  { label: "Log In", href: "/login" },
  { label: "Try Charm for Free", href: "/signup" },
];

// Footer Nav
export const footerSections: FooterSection[] = [
  {
    title: "Learn",
    items: [
      { label: "CMI Framework", href: "/money-framework" },
      { label: "Money Identities", href: "/money-identities" },
      { label: "Articles & Guides", href: "/resources" },
    ],
  },
  {
    title: "Tools",
    items: [
      { label: "Charm Indicator", href: "/cmi-test" },
      { label: "Daily Companion", href: "/app" },
      { label: "Reflection Prompts", href: "/resources/prompts" },
    ],
  },
  {
    title: "Support",
    items: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Tutorial", href: "/tutorial" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
];
