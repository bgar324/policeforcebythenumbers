"use client";

import { SiteButton } from "@/app/components/SiteButton";
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
const ACTIVE_NAV_STATE =
  "bg-black !text-white dark:!bg-[rgb(var(--site-ink-rgb))] dark:!text-[rgb(var(--site-surface-rgb))]";
const INACTIVE_NAV_STATE =
  "text-black hover:bg-black hover:!text-white focus-visible:bg-black focus-visible:!text-white dark:hover:!bg-[rgb(var(--site-ink-rgb))] dark:hover:!text-[rgb(var(--site-surface-rgb))] dark:focus-visible:!bg-[rgb(var(--site-ink-rgb))] dark:focus-visible:!text-[rgb(var(--site-surface-rgb))]";

export default function SiteNavbar() {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey | null>(
    null,
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMenus = () => {
    setActiveDropdown(null);
    setMobileOpen(false);
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const toggleTheme = () => {
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");
    const nextTheme = isDark ? "light" : "dark";
    root.classList.toggle("dark", nextTheme === "dark");

    try {
      localStorage.setItem("pfbn-theme", nextTheme);
    } catch {
    }
  };

  const handleDropdownToggle = (key: DropdownKey) => {
    setActiveDropdown((prev) => (prev === key ? null : key));
  };

  const isActive = (href: string) => pathname === href;
  const overlayActive = Boolean(activeDropdown || mobileOpen);

  return (
    <>
      <SiteButton
        aria-label="Close navigation"
        tabIndex={overlayActive ? 0 : -1}
        onClick={closeMenus}
        variant="overlay"
        active={overlayActive}
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
            className={`group relative flex h-full min-w-0 flex-1 flex-col items-start justify-center border-r border-black px-3 sm:px-4 md:w-min md:flex-none ${
              isActive("/") ? ACTIVE_NAV_STATE : INACTIVE_NAV_STATE
            }`}
          >
            <div className="flex flex-col leading-none">
              <span className="text-[0.94rem] font-semibold leading-[0.92] tracking-tight transition-colors duration-200 min-[380px]:text-[1rem] sm:whitespace-nowrap sm:text-[1.15rem] sm:leading-none">
                Police Force by the Numbers
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
                  isActive(link.href) ? ACTIVE_NAV_STATE : INACTIVE_NAV_STATE
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
                <SiteButton
                  onClick={() => handleDropdownToggle(section.key)}
                  variant="navControl"
                  active={activeDropdown === section.key}
                  className="gap-2"
                >
                  {section.label}
                  <span
                    className={`text-sm transition-transform duration-200 ${
                      activeDropdown === section.key ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </SiteButton>

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
                          ? ACTIVE_NAV_STATE
                          : INACTIVE_NAV_STATE
                      }`}
                    >
                      {item.label}
                    </TransitionLink>
                  ))}
                </div>
              </div>
            ))}

            <SiteButton
              aria-label="Toggle light and dark mode"
              onClick={toggleTheme}
              variant="navControl"
              className="w-[56px] border-l border-black px-0 cursor-pointer"
            >
              <span className="text-[15px] leading-none" aria-hidden>
                ●
              </span>
            </SiteButton>
          </nav>

          {/* Mobile Toggle Button */}
          <SiteButton
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-site-menu"
            aria-expanded={mobileOpen}
            variant="mobileMenuToggle"
            active={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span className="w-10 text-center text-[9px] font-semibold uppercase tracking-[0.16em] min-[380px]:w-12 min-[380px]:text-[10px] min-[380px]:tracking-[0.18em]">
              {mobileOpen ? "Close" : "Menu"}
            </span>
            <span className="relative block h-4 w-5 shrink-0">
              <span
                className={`absolute left-0 top-1/2 h-[2px] w-full bg-current transition-transform duration-200 ${
                  mobileOpen ? "rotate-45" : "-translate-y-[6px]"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-[2px] w-full bg-current transition-opacity duration-200 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-[2px] w-full bg-current transition-transform duration-200 ${
                  mobileOpen ? "-rotate-45" : "translate-y-[6px]"
                }`}
              />
            </span>
          </SiteButton>
        </div>

        {/* Mobile Dropdown View */}
        <div
          id="mobile-site-menu"
          className={`overflow-hidden border-b border-black bg-white transition-[max-height,opacity] duration-300 ease-out md:hidden ${
            mobileOpen ? "max-h-[calc(100dvh-60px)] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="max-h-[calc(100dvh-60px)] overflow-y-auto">
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
                    <li
                      key={item.href}
                      className={`${itemIndex > 0 ? "border-t border-black" : ""}`}
                    >
                      <TransitionLink
                        href={item.href}
                        onClick={closeMenus}
                        className={`block px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] ${
                          isActive(item.href)
                            ? ACTIVE_NAV_STATE
                            : INACTIVE_NAV_STATE
                        }`}
                      >
                        {item.label}
                      </TransitionLink>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
            <section className="border-t border-black">
              <SiteButton
                onClick={toggleTheme}
                aria-label="Toggle light and dark mode"
                variant="mobileThemeToggle"
                className = "cursor-pointer"
              >
                <span aria-hidden>●</span>
              </SiteButton>
            </section>
          </div>
        </div>
      </header>
    </>
  );
}
