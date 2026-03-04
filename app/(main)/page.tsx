import TransitionLink from "@/app/components/transition/TransitionLink";

const AUTHORS = [
  "Mattin Aframian",
  "Zoe Santos",
  "Maelynn Vu",
  "Benjamin Garcia",
  "Elaine Xia",
  "Lily Sarkissian",
];

const PAPER_FRAME = [
  {
    label: "Source",
    value: "The Washington Post fatal police shootings dataset",
  },
  {
    label: "Scope",
    value: "Victim, incident, and agency-level records",
  },
  {
    label: "Focus",
    value: "Data structure, literature context, and interpretive limits",
  },
] as const;

const ABSTRACT_BODY =
  "Our project follows a dataset containing detailed records of fatal police shootings in the United States, taken from The Washington Post. This data was drawn from federal law enforcement datasets. The data itself includes information such as the manner of death, whether body camera footage exists, city, county, state, latitude, longitude, and the precision of the location. It also includes information about the person who was killed. Victim variables include name, age, gender, race, whether the incident was related to mental illness, the type of threat reported, whether the person was armed and with what, flee status, and agency identifiers. The dataset also includes a separate set of agency-level data. These fields include agency ID, agency name, agency type, state, ORI codes, and the total number of shootings linked to that agency.";

const LITERATURE_COLUMNS = [
  "Existing findings on fatal police shootings have largely focused on patterns of race, mental health, and institutional variation. Many studies find that people experiencing mental illness are overrepresented among those killed by police, particularly during crisis encounters, though researchers disagree on how reliably mental illness is identified and recorded in available data. Some scholars argue that the classification of an incident as mental-illness-related depends heavily on agency practices, state policies, and reporting norms rather than consistent criteria. Others note that contextual factors such as perceived threat, whether the individual was armed, and whether they attempted to flee often shape how incidents are interpreted and documented.",
  "Various pieces of literature also examine changes over time, with mixed findings about whether fatal police shootings increased, decreased, or remained stable following the onset of the COVID-19 pandemic. While there is broad agreement that racial disparities in fatal police shootings persist, there is less consensus on how the racial composition of victims has shifted since 2015. Scholars consistently find that fatal police shootings are not evenly distributed across racial groups, though they argue whether these disparities stem from structural inequalities, over-policing, situational dynamics, or agency-level variation. Researchers also question the reliability and completeness of existing federal reporting systems, noting that methodological limitations shape how incidents are categorized and ultimately how conclusions about accountability are drawn. Overall, scholars agree on the importance of detailed, transparent data, but questions remain about how institutional context, mental health labeling, and temporal change interact within existing datasets.",
] as const;

const SIGNIFICANCE_BODY =
  "The way this dataset turns events into data has ideological effects. By focusing only on fatal shootings, it centers death by gunfire as the key measure of police violence. Other forms of harm become less visible. The structure also relies on official or media-reported categories such as threat type or armed status. These categories may reflect law enforcement narratives or early reports rather than full investigations. The ontology of the dataset treats each incident as a discrete event tied to an individual victim. It does not capture long histories of community police relations or systemic conditions. The dataset is powerful, but it is shaped by choices about what counts as data and what does not.";

const NEXT_STEPS = [
  {
    href: "/datasets",
    label: "Inspect the Dataset",
    summary:
      "Read the source files, variable definitions, and record structure before moving into interpretation.",
  },
  {
    href: "/data-critique",
    label: "Read the Critique",
    summary:
      "Continue into the project's methodological limits and representational cautions.",
  },
] as const;

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] border-x border-black font-[family:var(--font-nav)]">
      <header className="border-b border-black bg-[linear-gradient(180deg,#ffffff_0%,#fbfbfb_68%,#f6f6f6_100%)]">
        <div className="px-6 py-12 sm:px-10 sm:py-16">
          <div className="max-w-5xl">
            <h1 className="font-[family:var(--font-masthead)] text-5xl font-medium leading-[0.98] sm:text-7xl">
              Police Force by the Numbers
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-black/75 sm:text-lg">
              A research paper built around fatal police shooting records,
              existing scholarship, and the limits of how this dataset frames
              what can be seen.
            </p>
          </div>

          <div className="mt-8 border border-black bg-white/80">
            <div className="border-b border-black px-5 py-5 sm:px-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/60">
                Authors
              </p>
              <p className="mt-2 max-w-4xl text-sm leading-relaxed text-black/80 sm:text-base">
                {AUTHORS.join(" · ")}
              </p>
            </div>

            <dl className="grid gap-0 sm:grid-cols-3">
              {PAPER_FRAME.map((item, index) => (
                <div
                  key={item.label}
                  className={`px-5 py-4 sm:px-6 ${
                    index > 0 ? "border-t border-black sm:border-t-0 sm:border-l" : ""
                  }`}
                >
                  <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/55">
                    {item.label}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-black/80">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </header>

      <section className="border-b border-black px-6 py-10 sm:px-10 sm:py-12">
        <div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/60">
              Introduction
            </p>
            <h2 className="mt-3 font-[family:var(--font-masthead)] text-4xl font-medium leading-none sm:text-5xl">
              What the Dataset Contains
            </h2>
          </div>

          <article className="mt-8 border-t border-black pt-6">
            <p className="max-w-5xl text-[1.02rem] leading-8 text-black/80 sm:text-[1.08rem]">
              {ABSTRACT_BODY}
            </p>
          </article>
        </div>
      </section>

      <section className="border-b border-black bg-black/[0.02] px-6 py-10 sm:px-10 sm:py-12">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/60">
          Literature Review
        </p>
        <h2 className="mt-3 font-[family:var(--font-masthead)] text-4xl font-medium leading-none sm:text-5xl">
          Place in the Literature
        </h2>

        <div className="mt-8 grid gap-8 border-t border-black pt-6 lg:grid-cols-2">
          {LITERATURE_COLUMNS.map((column) => (
            <p
              key={column}
              className="text-sm leading-relaxed text-black/80 sm:text-base"
            >
              {column}
            </p>
          ))}
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#f8f8f8_0%,#ffffff_100%)]">
        <div className="grid gap-0 lg:grid-cols-[1.02fr_0.98fr]">
          <section className="border-b border-black px-6 py-10 sm:px-10 sm:py-12 lg:border-r lg:border-b-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/60">
              Significance
            </p>
            <h2 className="mt-3 max-w-2xl font-[family:var(--font-masthead)] text-4xl font-medium leading-tight sm:text-5xl">
              Why the framing of the dataset matters
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-black/80">
              {SIGNIFICANCE_BODY}
            </p>
          </section>

          <aside className="px-6 py-10 sm:px-10 sm:py-12">
            <div className="border border-black bg-[linear-gradient(180deg,#ffffff_0%,#fafafa_100%)] px-5 py-6 sm:px-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/60">
              Next
              </p>
              <h3 className="mt-3 max-w-sm text-3xl font-semibold leading-tight sm:text-4xl">
                Keep reading from the data outward.
              </h3>

              <div className="mt-6 grid gap-0 border-y border-black">
                {NEXT_STEPS.map((step, index) => (
                  <TransitionLink
                    key={step.href}
                    href={step.href}
                    className={`group block px-0 py-5 transition-colors duration-150 hover:bg-black hover:!text-white ${
                      index > 0 ? "border-t border-black" : ""
                    }`}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between p-2">
                      <div>
                        <h4 className="text-xl font-semibold leading-tight sm:text-2xl">
                          {step.label}
                        </h4>
                        <p className="mt-2 max-w-md text-sm leading-relaxed text-black/70 transition-colors duration-150 group-hover:text-white/80">
                          {step.summary}
                        </p>
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] sm:mt-1">
                        Open
                      </span>
                    </div>
                  </TransitionLink>
                ))}
              </div>

              <p className="mt-5 text-sm leading-relaxed text-black/70">
                The rest of the paper remains available in the main navigation.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
