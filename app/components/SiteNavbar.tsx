"use client";

import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type DropdownKey = "narrative" | "data" | "about";

type MenuSection = {
  key: DropdownKey;
  label: string;
  items: Array<{ label: string; href: string }>;
};

const SHRINK_THRESHOLD = 96;

const PRIMARY_LINKS = [
  { label: "Timeline", href: "/timeline" },
];

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
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<DropdownKey | null>(null);
  const closeMenus = () => {
    setActiveDropdown(null);
    setMobileOpen(false);
    setMobileSection(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY > SHRINK_THRESHOLD);
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

      <header className="sticky top-0 z-50 w-full bg-white" style={{ viewTransitionName: "site-navbar" }}>
        <div
          className={`relative flex w-full items-center justify-between border-b border-black transition-all duration-300 ease-out ${
            isCompact ? "h-[60px]" : "h-[104px]"
          }`}
        >
          <Link
            href="/"
            className="group flex h-full min-w-0 items-center border-x border-black px-3 sm:px-4"
            aria-label="Police Force by the Numbers Home"
            onClick={closeMenus}
          >
            <span className="relative block overflow-hidden">
              <span
                className={`whitespace-nowrap text-[1.3rem] font-semibold leading-none tracking-tight transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] sm:text-[1.7rem] ${
                  isCompact
                    ? "pointer-events-none absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 opacity-0"
                    : "relative translate-x-0 opacity-100"
                }`}
              >
                Police Force by the Numbers
              </span>
              <span
                className={`block text-xl font-semibold leading-none tracking-[0.08em] transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] sm:text-[1.7rem] ${
                  isCompact
                    ? "relative translate-x-0 opacity-100"
                    : "pointer-events-none absolute left-0 top-1/2 translate-x-2 -translate-y-1/2 opacity-0"
                }`}
              >
                PFBN
              </span>
            </span>
          </Link>

          <nav className="hidden h-full items-stretch font-[family:var(--font-nav)] md:flex" aria-label="Primary navigation">
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
                  aria-expanded={activeDropdown === section.key}
                >
                  {section.label}
                  <span
                    className={`text-sm leading-none transition-transform duration-200 ${
                      activeDropdown === section.key ? "rotate-45" : "rotate-0"
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
                  {section.items.map((item, itemIndex) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenus}
                      className={`block px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors duration-150 ${
                        itemIndex === 0 ? "" : "border-t border-black"
                      } ${
                        isActive(item.href)
                          ? "bg-black !text-white"
                          : "text-black hover:bg-black hover:!text-white focus-visible:bg-black focus-visible:!text-white"
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
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-1/2 block h-[2px] w-full bg-black transition-transform duration-200 ${
                  mobileOpen ? "translate-y-0 rotate-45" : "-translate-y-[6px]"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-[2px] w-full bg-black transition-opacity duration-200 ${
                  mobileOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-[2px] w-full bg-black transition-transform duration-200 ${
                  mobileOpen ? "translate-y-0 -rotate-45" : "translate-y-[6px]"
                }`}
              />
            </span>
          </button>

          <div
            className={`absolute left-0 top-full w-full border-b border-black bg-white font-[family:var(--font-nav)] transition-[opacity,transform,visibility] duration-200 md:hidden ${
              mobileOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
            }`}
          >
            <div className="flex flex-col">
              {PRIMARY_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenus}
                  className={`${MOBILE_ITEM} ${isActive(link.href) ? "bg-black !text-white" : "text-black"}`}
                >
                  {link.label}
                </Link>
              ))}

              {MENU_SECTIONS.map((section) => (
                <div key={section.key} className="border-t border-black">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.14em]"
                    onClick={() =>
                      setMobileSection((openSection) =>
                        openSection === section.key ? null : section.key,
                      )
                    }
                    aria-expanded={mobileSection === section.key}
                  >
                    {section.label}
                    <span className="text-sm leading-none">{mobileSection === section.key ? "-" : "+"}</span>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-200 ${
                      mobileSection === section.key ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden border-t border-black">
                      {section.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeMenus}
                          className={`block border-b border-black px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] ${
                            isActive(item.href) ? "bg-black !text-white" : "text-black"
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
