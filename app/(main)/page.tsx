import TransitionLink from "@/app/components/transition/TransitionLink";

type Finding = {
  id: string;
  question: string;
  takeaway: string;
  route: string;
  routeLabel: string;
};

type SectionStatus = {
  label: string;
  href: string;
  status: "Complete" | "Partial" | "In Progress";
  note: string;
};

const FINDINGS: Finding[] = [
  {
    id: "Q1",
    question: "How did fatal police shootings change after COVID-19?",
    takeaway:
      "Shootings rose from 4,923 (2015-2019) to 5,507 (2020-2024), a roughly 12% increase that persists beyond the immediate pandemic period.",
    route: "/data-analysis#question-1",
    routeLabel: "View Question 1 Analysis",
  },
  {
    id: "Q2",
    question:
      "How has the racial distribution changed from 2015 to the present?",
    takeaway:
      "Total shootings increased, but racial composition remained relatively stable, with persistent overrepresentation of Black victims versus U.S. population share.",
    route: "/data-analysis#question-2",
    routeLabel: "View Question 2 Analysis",
  },
  {
    id: "Q3",
    question:
      "Where is mental-illness labeling concentrated, and in what incident contexts?",
    takeaway:
      "Labeling varies sharply by state and context, clustering in non-flee incidents and specific threat/weapon profiles, suggesting strong reporting and policy effects.",
    route: "/data-analysis#question-3",
    routeLabel: "View Question 3 Analysis",
  },
];

const SITE_STATUS: SectionStatus[] = [
  {
    label: "Timeline",
    href: "/timeline",
    status: "Complete",
    note: "Political, social, and policing context from 2016 to 2023.",
  },
  {
    label: "Data Analysis",
    href: "/data-analysis",
    status: "Complete",
    note: "Three research questions with Tableau and Plotly visual findings.",
  },
  {
    label: "Datasets",
    href: "/datasets",
    status: "Complete",
    note: "Source files, schema fields, categories, and download links.",
  },
  {
    label: "Data Critique",
    href: "/data-critique",
    status: "Complete",
    note: "Method limits, representational constraints, and ontology critique.",
  },
  {
    label: "Bibliography",
    href: "/bibliography",
    status: "Complete",
    note: "Annotated sources and full citation modal references.",
  },
  {
    label: "Overview",
    href: "/overview",
    status: "Partial",
    note: "Processing and presentation sections complete; sources block still marked under construction.",
  },
  {
    label: "Introduction",
    href: "/introduction",
    status: "In Progress",
    note: "Currently a placeholder route awaiting final narrative text.",
  },
  {
    label: "Conclusion",
    href: "/conclusion",
    status: "In Progress",
    note: "Currently a placeholder route awaiting final synthesis text.",
  },
  {
    label: "Meet the Team",
    href: "/meet-the-team",
    status: "Complete",
    note: "Role-based contributor bios and contact links.",
  },
  {
    label: "Acknowledgements",
    href: "/acknowledgements",
    status: "Complete",
    note: "Instructor and discussion support acknowledgements.",
  },
];

function statusClasses(status: SectionStatus["status"]) {
  if (status === "Complete") {
    return "bg-black text-white";
  }

  if (status === "Partial") {
    return "bg-black/15 text-black";
  }

  return "bg-white text-black border border-black";
}

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] border-x border-black font-[family:var(--font-nav)]">
      <header className="border-b border-black">
        <div className="grid gap-0 lg:grid-cols-[1.25fr_0.75fr]">
          <section className="px-6 py-12 sm:px-10 sm:py-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/65">
              DGT HUM 101 Research Project
            </p>
            <h1 className="mt-4 max-w-4xl text-5xl font-medium leading-[0.96] sm:text-7xl">
              Police Force by the Numbers
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-black/80 sm:text-lg">
              A collaborative digital humanities project that analyzes fatal
              police shooting records to study post-pandemic change, racial
              distribution, and how incident categories shape interpretation.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <TransitionLink
                href="/data-analysis"
                className="inline-flex items-center border border-black px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-150 hover:bg-black hover:!text-white"
              >
                open data analysis
              </TransitionLink>
              <TransitionLink
                href="/datasets"
                className="inline-flex items-center border border-black px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-150 hover:bg-black hover:!text-white"
              >
                inspect dataset
              </TransitionLink>
              <TransitionLink
                href="/data-critique"
                className="inline-flex items-center border border-black px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-150 hover:bg-black hover:!text-white"
              >
                read critique
              </TransitionLink>
            </div>
          </section>

          <aside className="border-t border-black px-6 py-10 sm:px-10 lg:border-l lg:border-t-0 lg:py-16">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/60">
              Project Snapshot
            </p>
            <dl className="mt-5 grid gap-3">
              <div className="border border-black px-4 py-3">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/60">
                  Time Span
                </dt>
                <dd className="mt-1 text-2xl font-semibold leading-none">
                  2015-2024
                </dd>
              </div>
              <div className="border border-black px-4 py-3">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/60">
                  Core Questions
                </dt>
                <dd className="mt-1 text-2xl font-semibold leading-none">3</dd>
              </div>
              <div className="border border-black px-4 py-3">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/60">
                  Primary Source
                </dt>
                <dd className="mt-1 text-base leading-snug text-black/85">
                  Washington Post fatal police shootings dataset
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </header>

      <section className="border-b border-black px-6 py-10 sm:px-10 sm:py-12">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/60">
          Synthesis
        </p>
        <h2 className="mt-3 max-w-4xl text-4xl font-medium leading-tight sm:text-5xl">
          What the project shows so far
        </h2>

        <div className="mt-8 grid gap-0 border-y border-black">
          {FINDINGS.map((finding, index) => (
            <article
              key={finding.id}
              className={`grid gap-0 lg:grid-cols-[90px_1fr_240px] ${
                index > 0 ? "border-t border-black" : ""
              }`}
            >
              <div className="border-b border-black px-5 py-5 lg:border-r lg:border-b-0 lg:px-4 lg:py-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/55">
                  Finding
                </p>
                <p className="mt-2 text-2xl font-semibold leading-none">
                  {finding.id}
                </p>
              </div>

              <div className="border-b border-black px-5 py-5 lg:border-b-0 lg:px-6 lg:py-6">
                <h3 className="text-2xl font-semibold leading-tight sm:text-3xl">
                  {finding.question}
                </h3>
                <p className="mt-3 max-w-4xl text-base leading-relaxed text-black/80">
                  {finding.takeaway}
                </p>
              </div>

              <div className="px-5 py-5 lg:border-l lg:px-4 lg:py-6">
                <TransitionLink
                  href={finding.route}
                  className="inline-flex w-full items-center justify-center border border-black px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors duration-150 hover:bg-black hover:!text-white"
                >
                  {finding.routeLabel}
                </TransitionLink>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-b border-black px-6 py-10 sm:px-10 sm:py-12">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/60">
          Site Status
        </p>
        <h2 className="mt-3 max-w-3xl text-4xl font-medium leading-tight sm:text-5xl">
          Full pass: what is complete and what is still being built
        </h2>
        <div className="mt-8 grid gap-0 border-y border-black">
          {SITE_STATUS.map((section, index) => (
            <article
              key={section.href}
              className={`grid gap-4 px-4 py-4 sm:grid-cols-[180px_1fr_auto] sm:items-center ${
                index > 0 ? "border-t border-black" : ""
              }`}
            >
              <TransitionLink
                href={section.href}
                className="text-xl font-semibold leading-tight transition-opacity duration-150 hover:opacity-70"
              >
                {section.label}
              </TransitionLink>
              <p className="text-sm leading-relaxed text-black/75">
                {section.note}
              </p>
              <span
                className={`inline-flex w-fit items-center px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${statusClasses(
                  section.status,
                )}`}
              >
                {section.status}
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 py-10 sm:px-10 sm:py-12">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/60">
          About the Team
        </p>
        <h2 className="mt-3 max-w-4xl text-4xl font-medium leading-tight sm:text-5xl">
          Built collaboratively across data, writing, design, and web
          development
        </h2>
        <p className="mt-5 max-w-4xl text-base leading-relaxed text-black/80">
          This site integrates quantitative analysis, critical interpretation,
          and narrative presentation. It is designed to make both findings and
          limitations visible in the same interface.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <TransitionLink
            href="/meet-the-team"
            className="inline-flex items-center border border-black px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-150 hover:bg-black hover:!text-white"
          >
            meet the team
          </TransitionLink>
          <TransitionLink
            href="/acknowledgements"
            className="inline-flex items-center border border-black px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-150 hover:bg-black hover:!text-white"
          >
            acknowledgements
          </TransitionLink>
        </div>
      </section>
    </main>
  );
}
