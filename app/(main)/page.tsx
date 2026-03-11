import { SiteButton } from "@/app/components/SiteButton";
import TransitionLink from "@/app/components/transition/TransitionLink";
import {
  PageHeader,
  PageSection,
  PageShell,
  pageMetaLabelClassName,
  pageSectionEyebrowClassName,
} from "@/app/components/page-chrome";

type ResearchQuestion = {
  id: string;
  question: string;
  takeaway: string;
  route: string;
  routeLabel: string;
};

type LandingSection = {
  id: string;
  heading: string;
  body: string;
};

const RESEARCH_QUESTIONS: ResearchQuestion[] = [
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

const LANDING_SECTIONS: LandingSection[] = [
  {
    id: "01",
    heading: "Introduction",
    body: `Our project follows a dataset containing detailed records of fatal police shootings in the United States, taken from The Washington Post. This data was drawn from federal law enforcement datasets. The data itself includes information such as the manner of death, whether body camera footage exists, city, county, state, latitude, longitude, and the precision of the location. It also includes information about the person who was killed. Victim variables include name, age, gender, race, whether the incident was related to mental illness, the type of threat reported, whether the person was armed and with what, flee status, and agency identifiers. The dataset also includes a separate set of agency-level data. These fields include agency ID, agency name, agency type, state, ORI codes, and the total number of shootings linked to that agency.`,
  },
  {
    id: "02",
    heading: "Place in the literature",
    body: `Existing findings on fatal police shootings has largely focused on patterns of race, mental health, and institutional variation. Many studies find that people experiencing mental illness are overrepresented among those killed by police, particularly during crisis encounters, though researchers disagree on how reliably mental illness is identified and recorded in available data. Some scholars argue that the classification of an incident as mental-illness-related depends heavily on agency practices, state policies, and reporting norms rather than consistent criteria. Others note that contextual factors such as perceived threat, whether the individual was armed, and whether they attempted to flee often shape how incidents are interpreted and documented. Various pieces of literature also examine changes over time, with mixed findings about whether fatal police shootings increased, decreased, or remained stable following the onset of the COVID-19 pandemic. While there is broad agreement that racial disparities in fatal police shootings persist, there is less consensus on how the racial composition of victims has shifted since 2015. Scholars consistently find that fatal police shootings are not evenly distributed across racial groups, though they argue whether these disparities stem from structural inequalities, over-policing, situational dynamics, or agency-level variation. Researchers also question the reliability and completeness of existing federal reporting systems, noting that methodological limitations shape how incidents are categorized and ultimately how conclusions about accountability are drawn. Overall, scholars agree on the importance of detailed, transparent data, but questions remain about how institutional context, mental health labeling, and temporal change interact within existing datasets.`,
  },
  {
    id: "03",
    heading: "Significance",
    body: `The way this dataset turns events into data has ideological effects. By focusing only on fatal shootings, it centers death by gunfire as the key measure of police violence. Other forms of harm become less visible. The structure also relies on official or media-reported categories such as threat type or armed status. These categories may reflect law enforcement narratives or early reports rather than full investigations. The ontology of the dataset treats each incident as a discrete event tied to an individual victim. It does not capture long histories of community police relations or systemic conditions. The dataset is powerful, but it is shaped by choices about what counts as data and what does not.`,
  },
] as const;

export default function HomePage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="DGT HUM 101 Research Project"
        title="Police Force by the Numbers"
        description="A collaborative digital humanities project that studies fatal police shooting records through literature review, data critique, and interactive analysis of post-pandemic change, racial distribution, and mental-illness labeling."
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
                <dt className={pageSectionEyebrowClassName}>Core Questions</dt>
                <dd className="mt-1 text-2xl font-semibold leading-none">3</dd>
              </div>
              <div className="border border-black px-4 py-3">
                <dt className={pageSectionEyebrowClassName}>Primary Source</dt>
                <dd className="mt-1 text-base leading-snug text-black/85">
                  Washington Post fatal police shootings dataset
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
            <TransitionLink href="/datasets">inspect dataset</TransitionLink>
          </SiteButton>
          <SiteButton asChild variant="action">
            <TransitionLink href="/data-critique">read critique</TransitionLink>
          </SiteButton>
        </div>
      </PageHeader>

      {LANDING_SECTIONS.map((section) => (
        <section
          key={section.id}
          className="grid gap-0 border-b border-black lg:grid-cols-[150px_1fr]"
        >
          <aside className="border-b border-black px-6 py-6 sm:px-10 lg:border-r lg:border-b-0 lg:px-6 lg:py-10">
            <p className={pageMetaLabelClassName}>Section</p>
            <p className="mt-3 text-3xl font-semibold leading-none">
              {section.id}
            </p>
          </aside>

          <div className="px-6 py-8 sm:px-10 sm:py-10">
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
              {section.heading}
            </h2>
            <p className="mt-6 max-w-5xl text-base leading-relaxed text-black/80">
              {section.body}
            </p>
          </div>
        </section>
      ))}

      <PageSection innerClassName="py-0">
          <p className={pageSectionEyebrowClassName}>Research Questions</p>
          <h2 className="mt-3 max-w-5xl text-4xl font-medium leading-tight sm:text-5xl">
            Three guiding questions structure our analysis.
          </h2>

        <div className="border-y border-black mt-8">
          {RESEARCH_QUESTIONS.map((question, index) => (
            <article
              key={question.id}
              className={`grid gap-0 lg:grid-cols-[120px_minmax(0,1fr)_240px] ${
                index > 0 ? "border-t border-black" : ""
              }`}
            >
              <div className="border-b border-black px-6 py-6 sm:px-10 lg:border-r lg:border-b-0 lg:px-4 lg:py-8">
                <p className={pageMetaLabelClassName}>Finding</p>
                <p className="mt-3 text-3xl font-semibold leading-none">
                  {question.id}
                </p>
              </div>

              <div className="border-b border-black px-6 py-8 sm:px-10 lg:border-b-0 lg:px-6 lg:py-8">
                <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">
                  {question.question}
                </h2>
                <p className="mt-4 max-w-4xl text-base leading-relaxed text-black/80">
                  {question.takeaway}
                </p>
              </div>

              <div className="px-6 py-6 sm:px-10 lg:border-l lg:px-4 lg:py-8">
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

      <section className="px-6 py-10 sm:px-10 sm:py-12">
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
