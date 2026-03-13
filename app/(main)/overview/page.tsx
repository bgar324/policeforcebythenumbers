import {
  PageHeader,
  PageShell,
  pageDescriptionWideClassName,
  pageMetaLabelClassName,
  pageTitleStrongClassName,
} from "@/app/components/page-chrome";
import { cn } from "@/lib/utils";

type OverviewSubsection = {
  title: string;
  body?: string;
  className?: string;
  placeholderLabel?: string;
};

type OverviewSection = {
  id: string;
  slug: string;
  title: string;
  items: OverviewSubsection[];
  gridClassName?: string;
};

const OVERVIEW_SECTIONS: OverviewSection[] = [
  {
    id: "01",
    slug: "sources",
    title: "Sources",
    items: [
      {
        title: "Source Documentation in Progress",
        body: "This section is reserved for a concise account of the source base and citation workflow used across the project.",
        className: "lg:col-span-2",
        placeholderLabel: "Under Construction",
      },
    ],
  },
  {
    id: "02",
    slug: "processing",
    title: "Processing",
    items: [
      {
        title: "Data Cleaning and Visualization Tools",
        body: "To analyze and present this data, we used R as our primary environment for data cleaning and preparation, leveraging packages including the Tidyverse for data wrangling, and ggplot2 and Plotly for generating statistical visualizations. Interactive and supplementary visualizations were built in Tableau to provide additional analytical depth. Finalized outputs were then exported and integrated into this site to make the findings accessible to a general audience.",
      },
      {
        title: "Data Grouping and Visualization Constraints",
        body: "Data was grouped and summarized across several dimensions to appropriately show correlation between important variables of data. Minimum sample thresholds and category limits were applied where necessary to ensure the accuracy and clarity of the visualizations.",
      },
    ],
  },
  {
    id: "03",
    slug: "presentation",
    title: "Presentation",
    items: [
      {
        title: "Site Development Approach",
        body: "To create our website, our team was given permission to create, develop, and host independently from UCLA HumSpace. In turn, we chose to build a custom Next.js application (using the App Router and Tailwind CSS) so we could fully control the structure, styling, and user flow rather than relying on a template-based site builder.",
      },
      {
        title: "Planning the Site Structure",
        body: "We began by meeting during discussion section to plan the site architecture and map out what each page should communicate, including our core narrative pages (Introduction, Data Analysis, Conclusion), supporting pages (Datasets, Data Critique, Bibliography), and team/context pages (Meet the Team, Acknowledgements).",
      },
      {
        title: "Collaborative Development and Visual System",
        body: "From there, we delegated sections across team members based on role and technical focus, then merged and revised the work collaboratively. To keep the site cohesive, we maintained a consistent black-and-white visual system, shared typography and layout patterns, and reusable navigation/footer structure across all routes.",
      },
      {
        title: "Interaction Design and Final Review",
        body: "We also implemented a custom page-transition system so movement between sections feels intentional and consistent, and added interactive visualizations in the Data Analysis section using Plotly with chart data loaded from our static project files. After individual contributions were complete, we reviewed every page together to tighten clarity, remove redundancy, and ensure the final site was concise, readable, and aligned in both argument and design.",
      },
    ],
  },
];

export default function OverviewPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="About"
        title="Overview"
        titleClassName={pageTitleStrongClassName}
        description="How this project moves from source work to data processing and final web presentation."
        descriptionClassName={pageDescriptionWideClassName}
      />

      {OVERVIEW_SECTIONS.map((section, sectionIndex) => (
        <section
          id={section.slug}
          key={section.id}
          className={cn(
            "scroll-mt-16",
            sectionIndex < OVERVIEW_SECTIONS.length - 1 &&
              "border-b border-black",
          )}
        >
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
            <div
              className={cn("grid gap-6 lg:grid-cols-2", section.gridClassName)}
            >
              {section.items.map((item, itemIndex) => (
                <article
                  key={item.title}
                  className={cn(
                    "min-h-[220px] border border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
                    item.className,
                  )}
                >
                  <div className="flex h-full flex-col justify-start p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <p className={pageMetaLabelClassName}>Subsection</p>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/45">
                        {section.id}.{String(itemIndex + 1).padStart(2, "0")}
                      </p>
                    </div>
                    <h3 className="mt-2 max-w-3xl text-2xl font-semibold leading-tight sm:text-[2rem]">
                      {item.title}
                    </h3>

                    {item.placeholderLabel ? (
                      <div className="mt-5 border border-black bg-[linear-gradient(180deg,#ffffff_0%,#fbfbfb_100%)] px-6 py-10 text-center">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/55">
                          {item.placeholderLabel}
                        </p>
                      </div>
                    ) : null}

                    {item.body ? (
                      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-black/80 sm:text-base">
                        {item.body}
                      </p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}
    </PageShell>
  );
}
