"use client";

import TransitionLink from "@/app/components/transition/TransitionLink";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type DropdownKey = "narrative" | "data" | "about";
type NavItem = { label: string; href: string };

type MenuSection = {
  key: DropdownKey;
  label: string;
  items: NavItem[];
};

const LABEL_SWAP_AT = 24;

const PRIMARY_LINKS = [{ label: "Timeline", href: "/timeline" }];

const MENU_SECTIONS: MenuSection[] = [
  {
    key: "narrative",
    label: "Narrative",
    items: [
      { label: "Introduction", href: "/introduction" },
      { label: "Data Analysis", href: "/data-analysis" },
      { label: "Conclusion", href: "/conclusion" },
    ],
  },
  {
    key: "data",
    label: "Data",
    items: [
      { label: "Datasets", href: "/datasets" },
      { label: "Data Critique", href: "/data-critique" },
    ],
  },
  {
    key: "about",
    label: "About",
    items: [
      { label: "Overview", href: "/overview" },
      { label: "Bibliography", href: "/bibliography" },
      { label: "Meet the Team", href: "/meet-the-team" },
      { label: "Acknowledgements", href: "/acknowledgements" },
    ],
  },
];

const MOBILE_SECTIONS: Array<{ heading: string; items: NavItem[] }> = [
  {
    heading: "Core",
    items: [{ label: "Home", href: "/" }, ...PRIMARY_LINKS],
  },
  ...MENU_SECTIONS.map((section) => ({
    heading: section.label,
    items: section.items,
  })),
];

const DESKTOP_ITEM =
  "inline-flex h-full items-center px-4 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors duration-150";

export default function SiteNavbar() {
  const pathname = usePathname();
  const [isCompact, setIsCompact] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMenus = () => {
    setActiveDropdown(null);
    setMobileOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const nextCompact = window.scrollY > LABEL_SWAP_AT;
      setIsCompact((prev) => (prev === nextCompact ? prev : nextCompact));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const isActive = (href: string) => pathname === href;
  const overlayActive = Boolean(activeDropdown || mobileOpen);

  // The "Insane" easing curve
  const premiumEase = "cubic-bezier(0.23, 1, 0.32, 1)";

  return (
    <>
      <button
        type="button"
        aria-label="Close navigation"
        tabIndex={overlayActive ? 0 : -1}
        onClick={closeMenus}
        className={`fixed inset-0 z-40 transition-all duration-200 ${
          overlayActive
            ? "pointer-events-auto backdrop-blur-[2px] bg-white/10 opacity-100"
            : "pointer-events-none bg-transparent opacity-0"
        }`}
      />

      <header
        className="sticky top-0 z-50 w-full bg-white"
        style={{ viewTransitionName: "site-navbar" }}
      >
        <div className="relative flex h-[60px] w-full items-center justify-between border-b border-black">
          
          <TransitionLink
            href="/"
            onClick={closeMenus}
            aria-label="Police Force by the Numbers Home"
            className={`group relative flex h-full items-center overflow-hidden border-x border-black px-3 sm:px-4 transition-all duration-700 ${
              isActive("/")
                ? "bg-black !text-white"
                : "text-black hover:bg-black hover:!text-white"
            }`}
            style={{ 
              transitionTimingFunction: premiumEase,
              // Animating the width of the box to follow the text
              // Adjust these pixel values if your font size differs slightly
              width: isCompact ? '105px' : '350px' 
            }}
          >
            <div className="relative grid w-full grid-cols-1 grid-rows-1 items-center">
              {/* Full Title Label */}
              <span
                className={`col-start-1 row-start-1 block whitespace-nowrap text-[clamp(1rem,4vw,1.3rem)] font-semibold leading-none tracking-tight transition-all duration-700 sm:text-[1.7rem] ${
                  isCompact
                    ? "pointer-events-none -translate-x-8 opacity-0 blur-md"
                    : "translate-x-0 opacity-100 blur-0"
                }`}
                style={{ transitionTimingFunction: premiumEase }}
              >
                Police Force by the Numbers
              </span>

              {/* Compact Label (PFBN) */}
              <span
                className={`col-start-1 row-start-1 block whitespace-nowrap text-xl font-semibold leading-none tracking-[0.06em] transition-all duration-700 sm:text-[1.7rem] ${
                  isCompact
                    ? "translate-x-0 opacity-100 blur-0"
                    : "pointer-events-none translate-x-8 opacity-0 blur-md"
                } ${isActive("/") ? "!text-white" : "group-hover:!text-white"}`}
                style={{ transitionTimingFunction: premiumEase }}
              >
                PFBN
              </span>
            </div>
          </TransitionLink>

          <nav
            className="hidden h-full items-stretch font-[family:var(--font-nav)] md:flex"
            aria-label="Primary navigation"
          >
            {PRIMARY_LINKS.map((link) => (
              <TransitionLink
                key={link.href}
                href={link.href}
                onClick={closeMenus}
                className={`${DESKTOP_ITEM} border-l border-black ${
                  isActive(link.href)
                    ? "bg-black !text-white"
                    : "text-black hover:bg-black hover:!text-white focus-visible:bg-black focus-visible:!text-white"
                }`}
              >
                {link.label}
              </TransitionLink>
            ))}

            {MENU_SECTIONS.map((section) => (
              <div
                key={section.key}
                className="relative h-full border-l border-black"
                onMouseEnter={() => setActiveDropdown(section.key)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  className={`${DESKTOP_ITEM} gap-2 ${
                    activeDropdown === section.key
                      ? "bg-black !text-white"
                      : "text-black hover:bg-black hover:!text-white focus-visible:bg-black focus-visible:!text-white"
                  }`}
                >
                  {section.label}
                  <span
                    className={`text-sm transition-transform duration-200 ${
                      activeDropdown === section.key ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                <div
                  className={`absolute right-0 top-full min-w-[230px] border border-black bg-white transition-all duration-200 ${
                    activeDropdown === section.key
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-1 opacity-0"
                  }`}
                >
                  {section.items.map((item, i) => (
                    <TransitionLink
                      key={item.href}
                      href={item.href}
                      onClick={closeMenus}
                      className={`block px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] ${
                        i === 0 ? "" : "border-t border-black"
                      } ${
                        isActive(item.href)
                          ? "bg-black !text-white"
                          : "text-black hover:bg-black hover:!text-white"
                      }`}
                    >
                      {item.label}
                    </TransitionLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-site-menu"
            aria-expanded={mobileOpen}
            className="ml-3 mr-3 inline-flex h-11 w-11 items-center justify-center border border-black text-black md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-1/2 h-[2px] w-full bg-black transition-transform duration-200 ${
                  mobileOpen ? "rotate-45" : "-translate-y-[6px]"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-[2px] w-full bg-black transition-opacity duration-200 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-[2px] w-full bg-black transition-transform duration-200 ${
                  mobileOpen ? "-rotate-45" : "translate-y-[6px]"
                }`}
              />
            </span>
          </button>
        </div>

        <div
          id="mobile-site-menu"
          className={`overflow-hidden border-b border-black bg-white transition-[max-height,opacity] duration-300 ease-out md:hidden ${
            mobileOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="max-h-[calc(100vh-60px)] overflow-y-auto">
            {MOBILE_SECTIONS.map((section, index) => (
              <section
                key={section.heading}
                className={`${index > 0 ? "border-t border-black" : ""}`}
              >
                <p className="px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/60">
                  {section.heading}
                </p>
                <ul className="border-t border-black">
                  {section.items.map((item, itemIndex) => (
                    <li key={item.href} className={`${itemIndex > 0 ? "border-t border-black" : ""}`}>
                      <TransitionLink
                        href={item.href}
                        onClick={closeMenus}
                        className={`block px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] ${
                          isActive(item.href)
                            ? "bg-black !text-white"
                            : "text-black hover:bg-black hover:!text-white"
                        }`}
                      >
                        {item.label}
                      </TransitionLink>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}