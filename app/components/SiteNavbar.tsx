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
      // ignore storage failures in restricted environments
    }
  };

  const isActive = (href: string) => pathname === href;
  const overlayActive = Boolean(activeDropdown || mobileOpen);

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
            className={`group relative flex h-full min-w-0 flex-1 flex-col items-start justify-center border-r border-black px-3 sm:px-4 md:w-min md:flex-none ${
              isActive("/")
                ? "bg-black !text-white dark:!bg-white dark:!text-black"
                : "text-black hover:bg-black hover:!text-white focus-visible:bg-black focus-visible:!text-white dark:hover:!bg-white dark:hover:!text-black dark:focus-visible:!bg-white dark:focus-visible:!text-black"
            }`}
          >
            <div className="flex flex-col leading-none">
              <span className="text-[0.94rem] leading-[0.92] font-semibold tracking-tight transition-colors duration-200 min-[380px]:text-[1rem] sm:whitespace-nowrap sm:text-[1.15rem] sm:leading-none">
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
                  isActive(link.href)
                    ? "bg-black !text-white dark:!bg-white dark:!text-black"
                    : "text-black hover:bg-black hover:!text-white focus-visible:bg-black focus-visible:!text-white dark:hover:!bg-white dark:hover:!text-black dark:focus-visible:!bg-white dark:focus-visible:!text-black"
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
                      ? "bg-black !text-white dark:!bg-white dark:!text-black"
                      : "text-black hover:bg-black hover:!text-white focus-visible:bg-black focus-visible:!text-white dark:hover:!bg-white dark:hover:!text-black dark:focus-visible:!bg-white dark:focus-visible:!text-black"
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
                          ? "bg-black !text-white dark:!bg-white dark:!text-black"
                          : "text-black hover:bg-black hover:!text-white focus-visible:bg-black focus-visible:!text-white dark:hover:!bg-white dark:hover:!text-black dark:focus-visible:!bg-white dark:focus-visible:!text-black"
                      }`}
                    >
                      {item.label}
                    </TransitionLink>
                  ))}
                </div>
              </div>
            ))}

            <button
              type="button"
              aria-label="Toggle light and dark mode"
              onClick={toggleTheme}
              className={`${DESKTOP_ITEM} w-[56px] cursor-pointer justify-center border-l border-black px-0 text-black hover:bg-black hover:!text-white focus-visible:bg-black focus-visible:!text-white dark:hover:!bg-white dark:hover:!text-black dark:focus-visible:!bg-white dark:focus-visible:!text-black`}
            >
              <span className="text-[15px] leading-none" aria-hidden>
                ●
              </span>
            </button>
          </nav>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-site-menu"
            aria-expanded={mobileOpen}
            className={`inline-flex h-full min-w-[82px] items-center justify-center gap-2 border-l border-black px-3 font-[family:var(--font-nav)] transition-colors duration-200 min-[380px]:min-w-[92px] min-[380px]:gap-3 min-[380px]:px-4 md:hidden ${
              mobileOpen
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-black hover:text-white focus-visible:bg-black focus-visible:text-white"
            }`}
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
          </button>
        </div>

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
                            ? "bg-black !text-white dark:!bg-white dark:!text-black"
                            : "text-black hover:bg-black hover:!text-white focus-visible:bg-black focus-visible:!text-white dark:hover:!bg-white dark:hover:!text-black dark:focus-visible:!bg-white dark:focus-visible:!text-black"
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
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle light and dark mode"
                className="cursor-pointer block w-full px-6 py-3 text-center text-[15px] leading-none text-black hover:bg-black hover:!text-white focus-visible:bg-black focus-visible:!text-white dark:hover:!bg-white dark:hover:!text-black dark:focus-visible:!bg-white dark:focus-visible:!text-black"
              >
                <span aria-hidden>●</span>
              </button>
            </section>
          </div>
        </div>
      </header>
    </>
  );
}
