import {
  type RichTextContent,
  SHOOTINGS_VISUALIZATIONS,
  TABLEAU_VISUALIZATIONS,
  type ShootingsVisualization,
  type TableauVisualization,
} from "@/app/components/analysis-visualization-data";
import ShootingsViz from "@/app/components/ShootingsViz";
import TableauEmbeds from "@/app/components/TableauEmbeds";
import {
  PageHeader,
  PageShell,
  pageDescriptionWideClassName,
  pageMetaLabelClassName,
  pageTitleStrongClassName,
} from "@/app/components/page-chrome";
import { cn } from "@/lib/utils";

type VisualizationRef = {
  source: "tableau" | "plotly";
  id: string;
};

type AnalysisSection = {
  id: string;
  slug: string;
  question: string;
  summary: string;
  visualizations: VisualizationRef[];
};

type VisualizationMetadata = {
  id: string;
  visualizationHeading: string;
  chartTypeAndWhatItShows: RichTextContent;
  whatItMeansInContext: RichTextContent;
};

const TABLEAU_VISUALIZATION_MAP = Object.fromEntries(
  TABLEAU_VISUALIZATIONS.map((visualization) => [
    visualization.id,
    visualization,
  ]),
) satisfies Record<string, TableauVisualization>;

const SHOOTINGS_VISUALIZATION_MAP = Object.fromEntries(
  SHOOTINGS_VISUALIZATIONS.map((visualization) => [
    visualization.id,
    visualization,
  ]),
) satisfies Record<string, ShootingsVisualization>;

const ANALYSIS_SECTIONS: AnalysisSection[] = [
  {
    id: "01",
    slug: "question-1",
    question:
      "How have fatal police shootings changed after the pandemic? Have they increased? Decreased?",
    summary:
      "Shootings rose from 4,923 in 2015-2019 to 5,507 in 2020-2024, a roughly 12% increase that persists beyond the immediate pandemic period.",
    visualizations: [
      { source: "tableau", id: "fatal-over-time" },
      { source: "tableau", id: "post-pandemic-increase" },
    ],
  },
  {
    id: "02",
    slug: "question-2",
    question:
      "How has the racial distribution of people killed in fatal police shootings in the United States changed from 2015 to the present?",
    summary:
      "Total shootings increased, but racial composition remained relatively stable, with persistent overrepresentation of Black victims versus U.S. population share.",
    visualizations: [
      { source: "tableau", id: "racial-distribution-over-time" },
      { source: "tableau", id: "racial-composition-by-year" },
    ],
  },
  {
    id: "03",
    slug: "question-3",
    question:
      "How does the likelihood that a shooting is marked as mental-illness-related differ across agency types and states, and what incident context (threat_type, armed_with, flee_status) is most associated with the mental illness label?",
    summary:
      "Labeling varies sharply by state and context, clustering in non-flee incidents and specific threat and weapon profiles, suggesting strong reporting and policy effects.",
    visualizations: [
      { source: "plotly", id: "map" },
      { source: "plotly", id: "states" },
      { source: "plotly", id: "threat" },
      { source: "plotly", id: "flee" },
      { source: "plotly", id: "armed" },
    ],
  },
];

function getVisualizationMetadata(
  visualizationRef: VisualizationRef,
): VisualizationMetadata {
  return visualizationRef.source === "tableau"
    ? TABLEAU_VISUALIZATION_MAP[visualizationRef.id]
    : SHOOTINGS_VISUALIZATION_MAP[visualizationRef.id];
}

function renderVisualizationChart(visualizationRef: VisualizationRef) {
  if (visualizationRef.source === "tableau") {
    return (
      <TableauEmbeds
        ids={[visualizationRef.id]}
        includeDescriptionPlaceholders={false}
        showNarratives={false}
      />
    );
  }

  return <ShootingsViz ids={[visualizationRef.id]} showNarratives={false} />;
}

function AnalysisNarrativeCard({
  title,
  body,
}: {
  title: string;
  body: RichTextContent;
}) {
  return (
    <article className="min-h-[220px] border border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex h-full flex-col justify-start p-5 sm:p-6">
        <div>
          <h4 className="mt-2 max-w-2xl text-2xl font-semibold leading-tight sm:text-[2rem]">
            {title}
          </h4>
          <AnalysisRichText
            content={body}
            paragraphClassName="mt-3 max-w-3xl text-sm leading-relaxed text-black/80 sm:text-base"
          />
        </div>
      </div>
    </article>
  );
}

function AnalysisRichText({
  content,
  paragraphClassName,
}: {
  content: RichTextContent;
  paragraphClassName: string;
}) {
  return (
    <>
      {content.map((paragraph, paragraphIndex) => (
        <p
          key={paragraphIndex}
          className={cn(paragraphClassName, paragraphIndex > 0 && "mt-4")}
        >
          {paragraph.map((segment, segmentIndex) =>
            segment.type === "citation" ? (
              <a
                key={`${paragraphIndex}-${segmentIndex}`}
                href={`/bibliography#${segment.bibliographyId}`}
                className="font-semibold underline decoration-black/35 underline-offset-2 transition-colors hover:text-black hover:decoration-black"
              >
                {segment.label}
              </a>
            ) : (
              <span key={`${paragraphIndex}-${segmentIndex}`}>
                {segment.text}
              </span>
            ),
          )}
        </p>
      ))}
    </>
  );
}

export default function DataAnalysisPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Analysis"
        title="Data Analysis"
        titleClassName={pageTitleStrongClassName}
        description="Research questions, visual evidence, and chart-specific interpretation for our police force analysis."
        descriptionClassName={pageDescriptionWideClassName}
      />

      {ANALYSIS_SECTIONS.map((section, index) => (
        <section
          id={section.slug}
          key={section.id}
          className={cn(
            "scroll-mt-32",
            index < ANALYSIS_SECTIONS.length - 1 && "border-b border-black",
          )}
        >
          <header className="sticky top-[60px] z-20 border-b border-black bg-white/90 px-6 py-4 backdrop-blur-sm sm:px-10">
            <p className={cn(pageMetaLabelClassName, "mb-0")}>
              Research Question {section.id}
            </p>
            <h2 className="mt-3 max-w-5xl text-xl font-bold leading-tight sm:text-2xl">
              {section.question}
            </h2>
          </header>

          <div className="px-6 py-8 sm:px-10 sm:py-12">
            <div className="space-y-10">
              {section.visualizations.map((visualizationRef) => {
                const visualization =
                  getVisualizationMetadata(visualizationRef);

                return (
                  <article
                    key={`${section.id}-${visualization.id}`}
                    className="group"
                  >
                    {/* NEW HEADER DESIGN */}
                    <header className="flex border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">

                      <div className="flex-1 p-5 sm:p-6">
                        <h3 className="mt-2 max-w-full text-2xl font-black leading-tight sm:text-[2.5rem] tracking-tighter">
                          {visualization.visualizationHeading}
                        </h3>
                      </div>
                    </header>

                    <div className="mt-8">
                      <div className="border-2 border-black bg-zinc-50 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        {renderVisualizationChart(visualizationRef)}
                      </div>
                    </div>

                    <div className="mt-6 grid gap-6 lg:grid-cols-2">
                      <AnalysisNarrativeCard
                        title="Chart Type & What It Shows"
                        body={visualization.chartTypeAndWhatItShows}
                      />
                      <AnalysisNarrativeCard
                        title="What It Means in Context"
                        body={visualization.whatItMeansInContext}
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ))}
    </PageShell>
  );
}
