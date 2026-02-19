import TransitionLink from "@/app/components/transition/TransitionLink";

const EDITION_NOTES = [
  "Fatal shootings are analyzed as a specific subset of policing outcomes, not the total system.",
  "Methodological limits are surfaced before interpretation to reduce over-claiming.",
  "Narrative and data sections are designed to be read together, not in isolation.",
];

const REPORT_ROUTES = [
  {
    href: "/introduction",
    label: "Introduction",
    summary: "Project context, framing, and core questions for the reporting cycle.",
  },
  {
    href: "/datasets",
    label: "Datasets",
    summary: "Source boundaries, variable coverage, and data construction notes.",
  },
  {
    href: "/data-critique",
    label: "Data Critique",
    summary: "Full editorial critique of exclusions, assumptions, and interpretive risks.",
  },
  {
    href: "/data-analysis",
    label: "Data Analysis",
    summary: "Pattern-focused findings and comparative observations across variables.",
  },
  {
    href: "/timeline",
    label: "Timeline",
    summary: "Chronological context for policy shifts, incidents, and public response.",
  },
  {
    href: "/conclusion",
    label: "Conclusion",
    summary: "Final synthesis, implications, and limitations of the overall investigation.",
  },
];

const READING_ORDER = [
  "Start with Introduction for scope and context.",
  "Review Datasets and Data Critique before evaluating findings.",
  "Read Data Analysis with methodological limits in mind.",
  "Use Timeline for historical grounding before final conclusions.",
];

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] border-x border-black font-[family:var(--font-nav)]">
      <header className="border-b border-black">
        <div className="grid gap-0 lg:grid-cols-[1.25fr_0.75fr]">
          <section className="border-b border-black px-6 py-12 sm:px-10 sm:py-16 lg:border-r lg:border-b-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">Front Page</p>
            <h1 className="mt-5 max-w-4xl  text-4xl font-semibold leading-[1.02] sm:text-6xl">
              Police Force by the Numbers
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-black/75">
              A large-scale research editorial examining fatal police shootings through structured data, narrative
              context, and documented methodological critique.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <TransitionLink
                href="/introduction"
                className="inline-flex w-full items-center justify-center border border-black px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-150 hover:bg-black hover:!text-white sm:w-auto"
              >
                Begin Reading
              </TransitionLink>
              <TransitionLink
                href="/data-critique"
                className="inline-flex w-full items-center justify-center border border-black px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-150 hover:bg-black hover:!text-white sm:w-auto"
              >
                Methodology First
              </TransitionLink>
            </div>
          </section>

          <aside className="border-t border-black px-6 py-8 sm:px-10 sm:py-10 lg:border-t-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/60">Edition Focus</p>
            <div className="mt-4 space-y-4 border-l border-black pl-4">
              {EDITION_NOTES.map((note) => (
                <p key={note} className="text-sm leading-relaxed text-black/80">
                  {note}
                </p>
              ))}
            </div>
          </aside>
        </div>
      </header>

      <section className="border-b border-black">
        <div className="grid gap-0 lg:grid-cols-[1fr_1fr]">
          <article className="border-b border-black px-6 py-10 sm:px-10 sm:py-12 lg:border-r lg:border-b-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/60">Navigation</p>
            <h2 className="mt-4  text-3xl font-semibold leading-tight sm:text-4xl">
              How to read this investigation
            </h2>
            <ol className="mt-6 space-y-4 border-l border-black pl-4">
              {READING_ORDER.map((step) => (
                <li key={step} className="text-sm leading-relaxed text-black/80">
                  {step}
                </li>
              ))}
            </ol>
          </article>

          <article className="px-6 py-10 sm:px-10 sm:py-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/60">Scope Note</p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-black/80">
              This project centers documented fatal shootings by on-duty officers. That scope improves definitional
              clarity while also excluding many forms of police contact and harm. Every major section calls out those
              boundaries directly.
            </p>
          </article>
        </div>
      </section>

      <section className="px-6 py-10 sm:px-10 sm:py-12">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/60">Report Index</p>
        <div className="mt-5 grid gap-0 border-y border-black">
          {REPORT_ROUTES.map((route, index) => (
            <TransitionLink
              key={route.href}
              href={route.href}
              className={`group block px-5 py-5 transition-colors duration-150 hover:bg-black hover:!text-white ${
                index > 0 ? "border-t border-black" : ""
              }`}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className=" text-2xl font-semibold leading-tight">
                    {route.label}
                  </h3>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-black/75 transition-colors duration-150 group-hover:text-white/80">
                    {route.summary}
                  </p>
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] sm:mt-1">Open</span>
              </div>
            </TransitionLink>
          ))}
        </div>
      </section>
    </main>
  );
}
