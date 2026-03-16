import {
  PageHeader,
  PageShell,
  pageDescriptionWideClassName,
  pageMetaLabelClassName,
  pageTitleStrongClassName,
} from "@/app/components/page-chrome";
import { cn } from "@/lib/utils";

type ConclusionSubsection = {
  title: string;
  body: string;
  className?: string;
};

const CONCLUSION_ITEMS: ConclusionSubsection[] = [
  {
    title: "Overview and Racial Disparities",
    body: "In this project, we examined fatal police shootings in the United States. Our visualizations showed the effects of the pandemic, race, and mental illness on police shootings. The vast size of our dataset, containing over 10,000 entries, demonstrated how common violent police force remains in the United States in recent years. While there were many entries, each belonging to its own unique victim, we found prevalent racial disparities across the people represented in the data. Although more White victims are killed each year in raw totals, once shooting counts are adjusted for population size, Black, Hispanic, and Native American communities face higher death rates than other groups. These patterns suggest that the disparities may be shaped both by racial bias in policing and by the higher levels of social vulnerability and wealth disparity that often structure crime exposure in minority communities.",
    className: "lg:col-span-2",
  },
  {
    title: "Pandemic Trends and Mental Illness Labeling",
    body: "Our findings also showed that fatal police shootings increased after the COVID-19 pandemic, rising from 4,923 incidents between 2015-2019 to 5,507 incidents between 2020-2024. This increase seems to point to higher levels of unrest within the United States after the pandemic, as well as an increase in police opting for more violent measures before non-violent ones, which may reflect growing distrust in the police and the government as a whole in the post-pandemic period. In addition, our analysis of mental illness labeling revealed uneven patterns across states and incident contexts. Mental illness was more frequently reported in specific types of incidents and geographic regions, suggesting that differences in reporting practices, local policies, and documentation standards may influence how these cases are categorized in the dataset. However, mental illness is a broad umbrella term for many different conditions, which raises further questions about which forms of crisis are most associated with fatal shootings and what kinds of law-enforcement policies could reduce these deaths as much as possible.",
  },
  {
    title: "Data Limitations and Future Research",
    body: "Because the Washington Post Fatal Police Shootings database relies on news coverage and public reporting, some incidents may be missing or inconsistently documented. Future research could focus on developing more comprehensive and standardized systems for collecting police use of force data so that researchers can obtain more precise and reliable information. In addition, further research could explore policy changes, training programs, or community-based approaches that may help reduce rates of police violence, especially toward racial minorities and people experiencing mental health crises. Expanding the availability and accuracy of data will be an important step toward better understanding these incidents and identifying ways to properly address the patterns revealed in this project.",
  },
];

export default function ConclusionPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Narrative"
        title="Conclusion"
        titleClassName={pageTitleStrongClassName}
        description="A final synthesis of the project’s findings on post-pandemic change, racial disparity, mental illness labeling, and the limits of the underlying data."
        descriptionClassName={pageDescriptionWideClassName}
      />

      <section id="project-conclusion" className="scroll-mt-16">
        <header className="sticky top-[60px] z-20 flex w-full items-center justify-between border-b border-black bg-white/90 px-6 py-4 backdrop-blur-sm sm:px-10">
          <div className="flex items-center gap-6">
            <p className={cn(pageMetaLabelClassName, "mb-0")}>Section 01</p>
            <h2 className="text-xl font-bold uppercase tracking-tight sm:text-2xl">
              Conclusion
            </h2>
          </div>
        </header>

        <div className="px-6 py-8 sm:px-10 sm:py-12">
          <div className="grid gap-6 lg:grid-cols-2">
            {CONCLUSION_ITEMS.map((item, index) => (
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
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/65">
                      01.{String(index + 1).padStart(2, "0")}
                    </p>
                  </div>

                  <h3 className="mt-2 max-w-3xl text-2xl font-semibold leading-tight sm:text-[2rem]">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-black/80 sm:text-base">
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
