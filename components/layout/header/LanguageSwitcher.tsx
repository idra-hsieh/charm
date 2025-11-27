"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GlobeIcon } from "@/components/ui/icons/lucide-globe";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const LANGUAGES = [
  { code: "en", flag: "🇺🇸", label: "English" },
  { code: "ja", flag: "🇯🇵", label: "日本語" },
];

function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const current =
    LANGUAGES.find((option) => option.code === locale) ?? LANGUAGES[0];

  function handleSelect(nextLocale: string) {
    if (nextLocale === locale) return;

    startTransition(() => {
      // 1 year
      document.cookie = `locale=${nextLocale}; pasth=/; max-age=41536000`;
      router.refresh();
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Change language"
          disabled={isPending}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border border-foreground/5",
            "bg-accent/5 px-3 py-1.5 text-xs font-semibold uppercase",
            "shadow-sm backdrop-blur-md transition-all duration-150",
            "hover:border-foreground/10 hover:shadow-md hover:-translate-y-[1px]",
            "active:translate-y-0 active:shadow-sm"
          )}
        >
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-foreground/5">
            <GlobeIcon />
          </span>
          {current.label}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="min-w-[190px] rounded-2xl border border-foreground/5 bg-accent/5 p-1.5 shadow-xl backdrop-blur-md"
      >
        <DropdownMenuLabel className="px-2 py-1.5 text-[11px] font-medium uppercase tracking-wide text-foreground/60">
          Language
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {LANGUAGES.map((language) => {
          const selected = language.code === locale;

          return (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleSelect(language.code)}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-xl px-2 py-2 text-sm",
                "focus:bg-accent/10 focus:text-foreground",
                selected && "bg-accent/10"
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  selected ? "bg-accent" : "border border-foreground/30"
                )}
              />
              <span className="flex-1 text-foreground/90">
                {language.label}
              </span>
              <span className="text-base uppercase text-foreground/90">
                {language.flag}
              </span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LanguageSwitcher;
