import TransitionLink from "@/app/components/transition/TransitionLink";

const TEAM_MEMBERS = [
  "Mattin Aframian",
  "Benjamin Garcia",
  "Zoe Santos",
  "Lily Sarkissian",
  "Maelynn Vu",
  "Elaine Xia",
];

const NAVIGATE_GROUPS = [
  {
    heading: "Core",
    links: [
      { label: "Home", href: "/" },
      { label: "Timeline", href: "/timeline" },
    ],
  },
  {
    heading: "Narrative",
    links: [
      { label: "Introduction", href: "/introduction" },
      { label: "Data Analysis", href: "/data-analysis" },
      { label: "Conclusion", href: "/conclusion" },
    ],
  },
  {
    heading: "Data",
    links: [
      { label: "Datasets", href: "/datasets" },
      { label: "Data Critique", href: "/data-critique" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "Overview", href: "/overview" },
      { label: "Bibliography", href: "/bibliography" },
      { label: "Meet the Team", href: "/meet-the-team" },
      { label: "Acknowledgements", href: "/acknowledgements" },
    ],
  },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-black bg-white">
      <div className="mx-auto w-full max-w-[1200px] border-x border-black">
        <div className="grid grid-cols-1 md:grid-cols-12">
          <section className="border-b border-black px-6 py-6 md:col-span-3 md:border-b-0 md:border-r">
            <div className="space-y-3">
              <p className="font-[family:var(--font-masthead)] text-3xl font-medium leading-none tracking-[0.08em]">PFBN</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/65">
                DGT HUM 101 Research Project
              </p>
            </div>
          </section>

          <section className="border-b border-black px-6 py-6 md:col-span-3 md:border-b-0 md:border-r">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">Project Details</p>
            <dl className="mt-3 space-y-2 text-sm leading-relaxed">
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/55">Group</dt>
                <dd>B1 Culture, justice, representation</dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/55">Team</dt>
                <dd className="break-words text-black/80">{TEAM_MEMBERS.join(" · ")}</dd>
              </div>
            </dl>
          </section>

          <section className="px-6 py-6 md:col-span-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">Navigate</p>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {NAVIGATE_GROUPS.map((group) => (
                <div key={group.heading}>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/55">{group.heading}</p>
                  <ul className="mt-1.5 space-y-1.5">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <TransitionLink
                          href={link.href}
                          className="inline-block text-sm text-black/80 transition-colors duration-150 hover:text-black"
                        >
                          {link.label}
                        </TransitionLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-1 border-t border-black px-6 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/65 sm:flex-row sm:items-center sm:justify-between">
          <p>Police Force by the Numbers</p>
          <p>© {year}</p>
        </div>
      </div>
    </footer>
  );
}
