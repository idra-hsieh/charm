"use client";

import { StoredCMIResult } from "@/lib/cmi/api-types";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface Props {
  resultData: StoredCMIResult;
}

export default function CMIResultBody({ resultData }: Props) {
  // 1. Load UI translations (for navigation labels)
  const tUi = useTranslations("cmi.ui");
  
  // 2. Load Type-specific translations (for content)
  // Dynamically select the namespace based on type.id (1-32)
  const typeId = resultData.result.type.id;
  const tType = useTranslations(`cmi.types.${typeId}`);
  
  const [activeSection, setActiveSection] = useState("section-1");

  // Scroll Spy: Update the active sidebar link based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["section-1", "section-2", "section-3"];
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Logic: If section top is near viewport top OR user is scrolling inside a long section
          if ((rect.top >= 0 && rect.top <= 350) || (rect.top < 0 && rect.bottom > 150)) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Offset for sticky header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  const navItems = [
    { id: "section-1", label: tUi("result_body_item1") },
    { id: "section-2", label: tUi("result_body_item2") },
    { id: "section-3", label: tUi("result_body_item3") },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-15 py-15 slide:py-20 bg-marble rounded-3xl">
      <div className="flex flex-col slide:flex-row gap-15 relative">
        
        {/* Sidebar Navigation */}
        {/* The entire aside is the sticky marble card */}
        <aside className="hidden slide:block w-55 flex-shrink-0 sticky top-32 h-fit bg-background/40 bg-cover bg-center rounded-2xl shadow-2xl border border-stone-100/50">
          <nav className="p-6 space-y-5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "block text-left text-sm transition-all duration-300 w-full pl-3 border-l-2",
                  activeSection === item.id 
                    ? "font-bold text-accent border-accent" // Active
                    : "text-foreground/50 border-transparent hover:text-foreground/80 hover:font-medium hover:border-stone-300" // Inactive
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-15">
          
          {/* Section 1: Type Insights */}
          <section id="section-1" className="scroll-mt-32 space-y-6">
            <h2 className="font-primary font-semibold text-2xl mb-6 text-foreground">
              {tUi("result_body_item1")}
            </h2>
            <div className="prose prose-stone max-w-none">
              <p className="leading-loose text-md whitespace-pre-line text-foreground/70">
                {tType("insights")}
              </p>
            </div>
          </section>

          {/* Section 2: Growth Direction */}
          <section id="section-2" className="scroll-mt-32 space-y-6">
            <h2 className="font-primary font-semibold text-2xl mb-6 text-foreground">
              {tUi("result_body_item2")}
            </h2>
            <div className="prose prose-stone max-w-none">
              <p className="leading-loose text-md whitespace-pre-line text-foreground/70">
                {tType("directions")}
              </p>
            </div>
          </section>

          {/* Section 3: What to Do Next */}
          <section id="section-3" className="scroll-mt-32 space-y-6">
             <h2 className="font-primary font-semibold text-2xl mb-6 text-foreground">
              {tUi("result_body_item3")}
            </h2>
            <div className="prose prose-stone max-w-none">
              <p className="leading-loose text-md whitespace-pre-line text-foreground/70">
                {tType("nextSteps")}
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}