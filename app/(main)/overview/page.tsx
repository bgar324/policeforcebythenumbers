import {
  PageHeader,
  PageShell,
  pageDescriptionWideClassName,
  pageMetaLabelClassName,
  pageTitleStrongClassName,
} from "@/app/components/page-chrome";
import { cn } from "@/lib/utils";

type RichTextSegment =
  | { type: "text"; text: string }
  | { type: "citation"; label: string; bibliographyId: string };

type RichTextContent = RichTextSegment[][];

type OverviewSubsection = {
  title: string;
  body?: RichTextContent;
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

const text = (value: string): RichTextSegment => ({
  type: "text",
  text: value,
});

const citation = (
  label: string,
  bibliographyId: string,
): RichTextSegment => ({
  type: "citation",
  label,
  bibliographyId,
});

const paragraph = (...segments: RichTextSegment[]) => segments;

const rich = (value: string): RichTextContent => [[text(value)]];

const OVERVIEW_SECTIONS: OverviewSection[] = [
  {
    id: "01",
    slug: "sources",
    title: "Sources",
    gridClassName: "lg:grid-cols-3",
    items: [
      {
        title: "Use of the Washington Post Dataset",
        body: rich(
          "Our project uses the Washington Post fatal police shootings records to focus on the patterns of fatal police shootings across the United States over a period of 10 years from 2015 to 2024, put into context with the social, cultural, and political events and tendencies within the U.S. at the time via numerous related scholarly articles.",
        ),
        className: "lg:col-span-3",
      },
      {
        title: "Secondary Literature on Race and Mental Health",
        body: rich(
          "Due to an already prevalent narrative of police shootings being associated with racial and mental discrimination, we were able to narrow down our search of secondary sources using key words like “racial violence” and “mental illness” to get deeper into the history behind these topics. We found a number of sources that explored patterns of socio-economic conditions and community factors playing a role in how likely police officers were to take a more drastic approach.",
        ),
      },
      {
        title: "Evidence from Prior Research",
        body: [
          paragraph(
            text(
              "For example, one of the sources argues that fatal police shootings account for a sustained public health crisis marked by measurable and persistent racial inequities, particularly for Black, Hispanic, and Native American communities, especially among unarmed victims ",
            ),
            citation("(Lett et al., 2021)", "lett-2021"),
            text("."),
          ),
          paragraph(
            text(
              "Another one of the sources document that a substantial share of lethal police encounters involve individuals with signs of a mental health condition, including crisis indicators or substance use, and that these encounters disproportionately result in fatalities compared with other officer-involved shootings ",
            ),
            citation("(Khan et al., 2024)", "khan-2024"),
            text("."),
          ),
        ],
      },
      {
        title: "Integrating Multiple Perspectives",
        body: rich(
          "The arguments presented throughout these various sources provided us with plenty of information from different perspectives, which allowed us to form a significantly more holistic understanding of how the social determinants play a role in fatal police shootings in the United States.",
        ),
        className: "lg:col-span-3",
      },
      {
        title: "Timeline Sources and Contextual Events",
        body: rich(
          "For our timeline, we used a combination of primary and secondary sources. To analyze what contexts might have influenced the changes in law enforcement behavior we identified in the number of fatal police shootings pre and post the COVID-19 pandemic, we utilized a combination of both prominent mass shootings and fatal individual police encounters, along with the most culturally or politically significant events in our country, such as shifts in our government administration.",
        ),
        className: "lg:col-span-2",
      },
      {
        title: "Use of News Reporting for Political Context",
        body: rich(
          "To help us with the latter aspect of our analysis, we found it necessary to use secondary sources from online news outlets.",
        ),
      },
      {
        title: "Addressing Dataset Limitations Through Research",
        body: rich(
          "Despite the limitations of our dataset, our extensive research for this project allowed us to fill in some of the gaps and put together a more thorough analysis of the increase in fatal police shootings post COVID-19, the way race and racial discrimination influences the use of lethal force, and how perceived mental illness alters the likelihood of an encounter with law enforcement turning fatal.",
        ),
        className: "lg:col-span-3",
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
        body: rich(
          "To analyze and present this data, we used R as our primary environment for data cleaning and preparation, leveraging packages including the Tidyverse for data wrangling, and ggplot2 and Plotly for generating statistical visualizations. Interactive and supplementary visualizations were built in Tableau to provide additional analytical depth. Finalized outputs were then exported and integrated into this site to make the findings accessible to a general audience.",
        ),
      },
      {
        title: "Data Grouping and Visualization Constraints",
        body: rich(
          "Data was grouped and summarized across several dimensions to appropriately show correlation between important variables of data. Minimum sample thresholds and category limits were applied where necessary to ensure the accuracy and clarity of the visualizations.",
        ),
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
        body: rich(
          "To create our website, our team was given permission to create, develop, and host independently from UCLA HumSpace. In turn, we chose to build a custom Next.js application (using the App Router and Tailwind CSS) so we could fully control the structure, styling, and user flow rather than relying on a template-based site builder.",
        ),
      },
      {
        title: "Planning the Site Structure",
        body: rich(
          "We began by meeting during discussion section to plan the site architecture and map out what each page should communicate, including our core narrative pages (Introduction, Data Analysis, Conclusion), supporting pages (Datasets, Data Critique, Bibliography), and team/context pages (Meet the Team, Acknowledgements).",
        ),
      },
      {
        title: "Collaborative Development and Visual System",
        body: rich(
          "From there, we delegated sections across team members based on role and technical focus, then merged and revised the work collaboratively. To keep the site cohesive, we maintained a consistent black-and-white visual system, shared typography and layout patterns, and reusable navigation/footer structure across all routes.",
        ),
      },
      {
        title: "Interaction Design and Final Review",
        body: rich(
          "We also implemented a custom page-transition system so movement between sections feels intentional and consistent, and added interactive visualizations in the Data Analysis section using Plotly with chart data loaded from our static project files. After individual contributions were complete, we reviewed every page together to tighten clarity, remove redundancy, and ensure the final site was concise, readable, and aligned in both argument and design.",
        ),
      },
    ],
  },
];

function SubsectionCard({
  item,
  sectionId,
  index,
}: {
  item: OverviewSubsection;
  sectionId: string;
  index: number;
}) {
  return (
    <article
      className={cn(
        "min-h-[220px] border border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        item.className,
      )}
    >
      <div className="flex h-full flex-col justify-start p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <p className={pageMetaLabelClassName}>Subsection</p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/65">
            {sectionId}.{String(index + 1).padStart(2, "0")}
          </p>
        </div>

        <h3 className="mt-2 max-w-3xl text-2xl font-semibold leading-tight sm:text-[2rem]">
          {item.title}
        </h3>

        {item.body && (
          <OverviewRichText
            content={item.body}
            paragraphClassName="mt-3 max-w-3xl text-sm leading-relaxed text-black/80 sm:text-base"
          />
        )}
      </div>
    </article>
  );
}

function OverviewRichText({
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
                className="font-semibold underline decoration-black/35 underline-offset-2 transition-colors hover:text-black hover:decoration-black dark:decoration-white/30 dark:hover:text-white dark:hover:decoration-white"
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
          <header className="sticky top-[60px] z-20 flex w-full items-center justify-between border-b border-black bg-white/90 px-6 py-4 backdrop-blur-sm sm:px-10">
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
              {section.id === "01" ? (
                <>
                  <SubsectionCard
                    item={section.items[0]}
                    sectionId={section.id}
                    index={0}
                  />

                  <div className="lg:col-span-3 grid gap-6 lg:grid-cols-2">
                    <SubsectionCard
                      item={section.items[1]}
                      sectionId={section.id}
                      index={1}
                    />
                    <SubsectionCard
                      item={section.items[2]}
                      sectionId={section.id}
                      index={2}
                    />
                  </div>

                  {section.items.slice(3).map((item, i) => (
                    <SubsectionCard
                      key={item.title}
                      item={item}
                      sectionId={section.id}
                      index={i + 3}
                    />
                  ))}
                </>
              ) : (
                section.items.map((item, itemIndex) => (
                  <SubsectionCard
                    key={item.title}
                    item={item}
                    sectionId={section.id}
                    index={itemIndex}
                  />
                ))
              )}
            </div>
          </div>
        </section>
      ))}
    </PageShell>
  );
}
