import Image from "next/image";
import { SiteButton } from "@/app/components/SiteButton";
import TransitionLink from "@/app/components/transition/TransitionLink";
import {
  PageHeader,
  PageSection,
  PageShell,
  pageMetaLabelClassName,
  pageSectionEyebrowClassName,
} from "@/app/components/page-chrome";
import { cn } from "@/lib/utils";

type ResearchQuestion = {
  id: string;
  question: string;
  takeaway: string;
  route: string;
  routeLabel: string;
};

type LandingSubsection = {
  title: string;
  body: string;
  className?: string;
  imageSrc?: string;
  imageAlt?: string;
  imagePlacement?: "left" | "right";
};

type LandingSection = {
  id: string;
  slug: string;
  title: string;
  items: LandingSubsection[];
};

const RESEARCH_QUESTIONS: ResearchQuestion[] = [
  {
    id: "Question 1",
    question: "How did fatal police shootings change after COVID-19?",
    takeaway:
      "Shootings rose from 4,923 (2015-2019) to 5,507 (2020-2024), a roughly 12% increase that persists beyond the immediate pandemic period.",
    route: "/data-analysis#question-1",
    routeLabel: "View Question 1 Analysis",
  },
  {
    id: "Question 2",
    question:
      "How has the racial distribution changed from 2015 to the present?",
    takeaway:
      "Total shootings increased, but racial composition remained relatively stable, with persistent overrepresentation of Black victims versus U.S. population share.",
    route: "/data-analysis#question-2",
    routeLabel: "View Question 2 Analysis",
  },
  {
    id: "Question 3",
    question:
      "How does the likelihood that a shooting is marked as mental-illness-related differ across agency types and states, and what incident context are most associated with the mental illness label?",
    takeaway:
      "Labeling varies sharply by state and context, clustering in non-flee incidents and specific threat/weapon profiles, suggesting strong reporting and policy effects.",
    route: "/data-analysis#question-3",
    routeLabel: "View Question 3 Analysis",
  },
];

const LANDING_SECTIONS: LandingSection[] = [
  {
    id: "01",
    slug: "introduction",
    title: "Introduction",
    items: [
      {
        title: "Core Data Sources and Scope",
        body: "Our project combines the Washington Post fatal police shootings records with a companion agency file, a cleaned analysis-ready incident table, and a U.S. population reference series. The main shooting records track fatal police shootings in the United States and include details such as the manner of death, whether body camera footage exists, city, county, state, latitude, longitude, and the precision of the location.",
        className: "lg:col-span-2",
      },
      {
        title: "Victim Information",
        body: "The incident records also include information about the person who was killed. Victim variables include name, age, gender, race, whether the incident was related to mental illness, the type of threat reported, whether the person was armed and with what, flee status, and agency identifiers.",
      },
      {
        title: "Agency-Level Data",
        body: "The companion agency file adds department-level data. These fields include agency ID, agency name, agency type, state, ORI codes, and the total number of shootings linked to that agency.",
      },
      {
        title: "Population Reference Data",
        body: "A separate U.S. population CSV provides annual national totals from 1950 to 2025. We use it as year-level context for population-share and denominator-based comparisons in the analysis.",
      },
    ],
  },
  {
    id: "02",
    slug: "place-in-the-literature",
    title: "Place in the Literature",
    items: [
      {
        title: "Patterns Examined in Prior Research",
        body: "Existing findings on fatal police shootings has largely focused on patterns of race, mental health, and institutional variation. Many studies find that people experiencing mental illness are overrepresented among those killed by police, particularly during crisis encounters, though researchers disagree on how reliably mental illness is identified and recorded in available data. Some scholars argue that the classification of an incident as mental-illness-related depends heavily on agency practices, state policies, and reporting norms rather than consistent criteria.",
        className: "lg:col-span-2",
      },
      {
        title: "Contextual Factors and Documentation",
        body: "Others note that contextual factors such as perceived threat, whether the individual was armed, and whether they attempted to flee often shape how incidents are interpreted and documented. Various pieces of literature also examine changes over time, with mixed findings about whether fatal police shootings increased, decreased, or remained stable following the onset of the COVID-19 pandemic.",
        className: "lg:col-span-2",
        imageSrc:
          "/static/images/Contextual%20Factors%20and%20Documentation_Graph.png",
        imageAlt:
          "Graph for contextual factors and documentation in fatal police shooting research.",
        imagePlacement: "right",
      },
      {
        title: "Racial Disparities and Reporting Limitations",
        body: "While there is broad agreement that racial disparities in fatal police shootings persist, there is less consensus on how the racial composition of victims has shifted since 2015. Scholars consistently find that fatal police shootings are not evenly distributed across racial groups, though they argue whether these disparities stem from structural inequalities, over-policing, situational dynamics, or agency-level variation. Researchers also question the reliability and completeness of existing federal reporting systems, noting that methodological limitations shape how incidents are categorized and ultimately how conclusions about accountability are drawn.",
        className: "lg:col-span-2",
      },
      {
        title: "Data Transparency and Ongoing Questions",
        body: "Overall, scholars agree on the importance of detailed, transparent data, but questions remain about how institutional context, mental health labeling, and temporal change interact within existing datasets.",
        className: "lg:col-span-2",
        imageSrc:
          "/static/images/Data%20Transparency%20and%20Ongoing%20Questions_picture.png",
        imageAlt:
          "Visual for data transparency and ongoing questions in fatal police shooting research.",
        imagePlacement: "left",
      },
    ],
  },
  {
    id: "03",
    slug: "significance",
    title: "Significance",
    items: [
      {
        title: "What the Dataset Makes Visible",
        body: "The way this dataset turns events into data has ideological effects. By focusing only on fatal shootings, it centers death by gunfire as the key measure of police violence. Other forms of harm become less visible.",
      },
      {
        title: "Categories and Interpretation",
        body: "The structure also relies on official or media-reported categories such as threat type or armed status. These categories may reflect law enforcement narratives or early reports rather than full investigations.",
      },
      {
        title: "Structural Limits of the Dataset",
        body: "The ontology of the dataset treats each incident as a discrete event tied to an individual victim. It does not capture long histories of community police relations or systemic conditions. The dataset is powerful, but it is shaped by choices about what counts as data and what does not.",
        className: "lg:col-span-2",
      },
    ],
  },
];

export default function HomePage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="DGT HUM 101 Research Project"
        title="Police Force by the Numbers"
        description="A collaborative digital humanities project that studies fatal police shooting records, agency metadata, and U.S. population reference data through literature review, data critique, and interactive analysis of post-pandemic change, racial distribution, and mental-illness labeling."
        descriptionClassName="mt-4 max-w-4xl text-base leading-relaxed text-black/75 sm:text-lg"
        mainClassName="py-12 sm:py-16"
        asideClassName="py-10 sm:py-16"
        aside={
          <>
            <p className={pageSectionEyebrowClassName}>Project Snapshot</p>
            <dl className="mt-5 grid gap-3">
              <div className="border border-black px-4 py-3">
                <dt className={pageSectionEyebrowClassName}>Time Span</dt>
                <dd className="mt-1 text-2xl font-semibold leading-none">
                  2015-2024
                </dd>
              </div>
              <div className="border border-black px-4 py-3">
                <dt className={pageSectionEyebrowClassName}>
                  Research Questions
                </dt>
                <dd className="mt-1 text-2xl font-semibold leading-none">3</dd>
              </div>
              <div className="border border-black px-4 py-3">
                <dt className={pageSectionEyebrowClassName}>Data Sources</dt>
                <dd className="mt-1 text-base leading-snug text-black/85">
                  Washington Post shooting and agency files and U.S. population totals
                </dd>
              </div>
            </dl>
          </>
        }
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <SiteButton asChild variant="action">
            <TransitionLink href="/data-analysis">
              open data analysis
            </TransitionLink>
          </SiteButton>
          <SiteButton asChild variant="action">
            <TransitionLink href="/datasets">inspect datasets</TransitionLink>
          </SiteButton>
          <SiteButton asChild variant="action">
            <TransitionLink href="/data-critique">read critique</TransitionLink>
          </SiteButton>
        </div>
      </PageHeader>

      {LANDING_SECTIONS.map((section) => (
        <section
          id={section.slug}
          key={section.slug}
          className="scroll-mt-16 border-b border-black"
        >
          {/* STICKY TOP BAR (THE RIBBON) */}
          <header className="sticky top-0 z-20 flex w-full items-center justify-between border-b border-black bg-white/90 px-6 py-4 backdrop-blur-sm sm:px-10">
            <div className="flex items-center gap-6">
              <p className={cn(pageMetaLabelClassName, "mb-0")}>
                Section {section.id}
              </p>
              <h2 className="text-xl font-bold uppercase tracking-tight sm:text-2xl">
                {section.title}
              </h2>
            </div>
          </header>

          <div className="px-6 py-8 sm:px-10 sm:py-12">
            <div className="grid gap-6 lg:grid-cols-2">
              {section.items.map((item, index) => (
                <article
                  key={item.title}
                  className={cn(
                    "min-h-[220px] border border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
                    item.className,
                  )}
                >
                  {item.imageSrc ? (
                    <div
                      className={cn(
                        "grid h-full",
                        item.imagePlacement === "left"
                          ? "lg:grid-cols-[0.92fr_minmax(0,1fr)]"
                          : "lg:grid-cols-[minmax(0,1fr)_0.92fr]",
                      )}
                    >
                      {item.imagePlacement === "left" ? (
                        <>
                          <div className="relative min-h-[250px] border-b border-black bg-[#f2f2f2] lg:min-h-[320px] lg:border-r lg:border-b-0">
                            <Image
                              src={item.imageSrc}
                              alt={item.imageAlt ?? item.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 1023px) 100vw, 34vw"
                            />
                          </div>
                          <div className="flex h-full flex-col justify-between p-5 sm:p-6">
                            <div>
                              <div className="flex items-start justify-between gap-4">
                                <p className={pageMetaLabelClassName}>
                                  Subsection
                                </p>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/45">
                                  {section.id}.
                                  {String(index + 1).padStart(2, "0")}
                                </p>
                              </div>
                              <h3 className="mt-4 max-w-2xl text-2xl font-semibold leading-tight sm:text-[2rem]">
                                {item.title}
                              </h3>
                            </div>
                            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-black/80 sm:text-base">
                              {item.body}
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex h-full flex-col justify-between p-5 sm:p-6">
                            <div>
                              <div className="flex items-start justify-between gap-4">
                                <p className={pageMetaLabelClassName}>
                                  Subsection
                                </p>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/45">
                                  {section.id}.
                                  {String(index + 1).padStart(2, "0")}
                                </p>
                              </div>
                              <h3 className="mt-4 max-w-2xl text-2xl font-semibold leading-tight sm:text-[2rem]">
                                {item.title}
                              </h3>
                            </div>
                            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-black/80 sm:text-base">
                              {item.body}
                            </p>
                          </div>
                          <div className="relative min-h-[250px] border-t border-black bg-[#f2f2f2] lg:min-h-[320px] lg:border-l lg:border-t-0">
                            <Image
                              src={item.imageSrc}
                              alt={item.imageAlt ?? item.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 1023px) 100vw, 34vw"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="flex h-full flex-col justify-between p-5 sm:p-6">
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <p className={pageMetaLabelClassName}>Subsection</p>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/45">
                            {section.id}.{String(index + 1).padStart(2, "0")}
                          </p>
                        </div>
                        <h3 className="mt-4 max-w-2xl text-2xl font-semibold leading-tight sm:text-[2rem]">
                          {item.title}
                        </h3>
                      </div>
                      <p className="mt-6 max-w-3xl text-sm leading-relaxed text-black/80 sm:text-base">
                        {item.body}
                      </p>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <PageSection innerClassName="py-12 sm:py-16">
        <p className={pageSectionEyebrowClassName}>Research Questions</p>
        <h2 className="mt-3 max-w-5xl text-4xl font-medium leading-tight sm:text-5xl">
          Three guiding questions structure our analysis.
        </h2>

        {/* Changed to a 3-column grid on large screens */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {RESEARCH_QUESTIONS.map((question) => (
            <article
              key={question.id}
              // Vertical stack layout with the same elevated styling
              className="flex flex-col border border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="flex justify-around border-b-2 border-black bg-zinc-800 py-1.5">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-3 w-3 rounded-full bg-white border border-black shadow-inner"
                  />
                ))}
              </div>
              <div className="border-b border-black bg-zinc-100 px-6 py-4 flex justify-between items-end">
                <div>
                  <p className="text-3xl font-bold leading-none">
                    {question.id}
                  </p>
                </div>
              </div>
              <div className="flex flex-grow flex-col px-6 py-6">
                <h3 className="text-xl font-semibold leading-tight">
                  {question.question}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-black/80">
                  {question.takeaway}
                </p>
              </div>

              {/* Bottom: Action */}
              <div className="mt-auto border-t border-black p-4">
                <SiteButton asChild variant="action" className="w-full">
                  <TransitionLink href={question.route}>
                    {question.routeLabel}
                  </TransitionLink>
                </SiteButton>
              </div>
            </article>
          ))}
        </div>
      </PageSection>

      <section className="px-6 py-10 sm:px-10 sm:py-16">
        <p className={pageSectionEyebrowClassName}>About the Team</p>
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
          <SiteButton asChild variant="action">
            <TransitionLink href="/meet-the-team">meet the team</TransitionLink>
          </SiteButton>
          <SiteButton asChild variant="action">
            <TransitionLink href="/acknowledgements">
              acknowledgements
            </TransitionLink>
          </SiteButton>
        </div>
      </section>
    </PageShell>
  );
}
