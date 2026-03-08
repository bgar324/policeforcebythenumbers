import {
  PageHeader,
  PageShell,
  pageMetaLabelClassName,
} from "@/app/components/page-chrome";

const PROCESSING_PARAGRAPHS = [
  "To analyze and present this data, we used R as our primary environment for data cleaning and preparation, leveraging packages including the Tidyverse for data wrangling, and ggplot2 and Plotly for generating statistical visualizations. Interactive and supplementary visualizations were built in Tableau to provide additional analytical depth. Finalized outputs were then exported and integrated into this site to make the findings accessible to a general audience.",
  "Data was grouped and summarized across several dimensions to appropriately show correlation between important variables of data. Minimum sample thresholds and category limits were applied where necessary to ensure the accuracy and clarity of the visualizations.",
] as const;

const PRESENTATION_PARAGRAPHS = [
  "To create our website, our team was given permission to create, develop, and host independently from UCLA HumSpace. In turn, we chose to build a custom Next.js application (using the App Router and Tailwind CSS) so we could fully control the structure, styling, and user flow rather than relying on a template-based site builder. We began by meeting during discussion section to plan the site architecture and map out what each page should communicate, including our core narrative pages (Introduction, Data Analysis, Conclusion), supporting pages (Datasets, Data Critique, Bibliography), and team/context pages (Meet the Team, Acknowledgements).",
  "From there, we delegated sections across team members based on role and technical focus, then merged and revised the work collaboratively. To keep the site cohesive, we maintained a consistent black-and-white visual system, shared typography and layout patterns, and reusable navigation/footer structure across all routes. We also implemented a custom page-transition system so movement between sections feels intentional and consistent, and added interactive visualizations in the Data Analysis section using Plotly with chart data loaded from our static project files. After individual contributions were complete, we reviewed every page together to tighten clarity, remove redundancy, and ensure the final site was concise, readable, and aligned in both argument and design.",
] as const;

type OverviewSection = {
  id: string;
  heading: string;
  paragraphs?: readonly string[];
  sourcesPlaceholder?: boolean;
};

const OVERVIEW_SECTIONS: OverviewSection[] = [
  {
    id: "01",
    heading: "Sources",
    sourcesPlaceholder: true,
  },
  {
    id: "02",
    heading: "Processing",
    paragraphs: PROCESSING_PARAGRAPHS,
  },
  {
    id: "03",
    heading: "Presentation",
    paragraphs: PRESENTATION_PARAGRAPHS,
  },
] as const;

export default function OverviewPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="About"
        title="Overview"
        description="How this project moves from source work to data processing and final web presentation."
        descriptionClassName="mt-4 max-w-3xl text-base leading-relaxed text-black/75 sm:text-lg"
      />

      {OVERVIEW_SECTIONS.map((section, index) => (
        <section
          key={section.id}
          className={`grid gap-0 lg:grid-cols-[150px_1fr] ${
            index < OVERVIEW_SECTIONS.length - 1 ? "border-b border-black" : ""
          }`}
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

            {section.sourcesPlaceholder ? (
              <>
                <div className="mt-6 flex min-h-[180px] items-center justify-center border border-black bg-[linear-gradient(180deg,#ffffff_0%,#fbfbfb_100%)] px-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/55">
                    Under Construction
                  </p>
                </div>
                <p className="sr-only">
                  No source text was provided for the Sources section.
                </p>
              </>
            ) : (
              <div className="mt-6 space-y-5">
                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="max-w-5xl text-base leading-relaxed text-black/80"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}
    </PageShell>
  );
}
