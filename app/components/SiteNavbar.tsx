"use client";

import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type DropdownKey = "narrative" | "data" | "about";

type MenuSection = {
  key: DropdownKey;
  label: string;
  items: Array<{ label: string; href: string }>;
};

const SHRINK_AT = 96;
const EXPAND_AT = 40;

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

const DESKTOP_ITEM =
  "inline-flex h-full items-center px-4 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors duration-150";

const MOBILE_ITEM =
  "block border-t border-black px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.14em]";

export default function SiteNavbar() {
  const pathname = usePathname();
  const [isCompact, setIsCompact] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey | null>(
    null,
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<DropdownKey | null>(null);

  const closeMenus = () => {
    setActiveDropdown(null);
    setMobileOpen(false);
    setMobileSection(null);
  };

  const compactRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (!compactRef.current && y > SHRINK_AT) {
        compactRef.current = true;
        setIsCompact(true);
      } else if (compactRef.current && y < EXPAND_AT) {
        compactRef.current = false;
        setIsCompact(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-0 z-40 transition-all duration-200 ${
          activeDropdown ? "backdrop-blur-[2px] bg-white/10" : "bg-transparent"
        }`}
      />

      <header
        className="sticky top-0 z-50 w-full bg-white"
        style={{ viewTransitionName: "site-navbar" }}
      >
        <div
          className={`relative flex w-full items-center justify-between border-b border-black transition-all duration-300 ease-out ${
            isCompact ? "h-[60px]" : "h-[104px]"
          }`}
        >
          <Link
            href="/"
            onClick={closeMenus}
            aria-label="Police Force by the Numbers Home"
            className={`group flex h-full items-center border-x border-black px-3 transition-[width,background-color,color] duration-300 ease-out sm:px-4 ${
              isActive("/")
                ? "bg-black !text-white"
                : "text-black hover:bg-black hover:!text-white"
            }`}
          >
            {/* FULL TITLE */}
            <span
              className={`block whitespace-nowrap text-[1.3rem] font-semibold leading-none tracking-tight
  transition-transform transition-opacity duration-220 ease-[cubic-bezier(0.22,1,0.36,1)]
  sm:text-[1.7rem] ${
    isCompact
      ? "pointer-events-none absolute opacity-0 -translate-x-3"
      : "relative opacity-100 translate-x-0"
  }`}
            >
              Police Force by the Numbers
            </span>

            {/* PFBN */}
            <span
              className={`block whitespace-nowrap text-xl font-semibold leading-none tracking-[0.08em]
  transition-transform transition-opacity duration-220 ease-[cubic-bezier(0.22,1,0.36,1)]
  sm:text-[1.7rem] ${
    isCompact
      ? "relative opacity-100 translate-x-0"
      : "pointer-events-none absolute opacity-0 translate-x-3"
  }`}
            >
              PFBN
            </span>
          </Link>

          <nav
            className="hidden h-full items-stretch font-[family:var(--font-nav)] md:flex"
            aria-label="Primary navigation"
          >
            {PRIMARY_LINKS.map((link) => (
              <Link
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
              </Link>
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
                    <Link
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
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <button
            type="button"
            className="ml-3 inline-flex h-11 w-11 items-center justify-center border border-black text-black md:hidden"
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
      </header>
    </>
  );
}
