import {
  PageHeader,
  PageShell,
  pageDescriptionWideClassName,
  pageMetaLabelClassName,
  pageTitleStrongClassName,
} from "@/app/components/page-chrome";
import { cn } from "@/lib/utils";

type IntroductionSubsection = {
  title: string;
  body: string;
  className?: string;
};

const INTRODUCTION_ITEMS: IntroductionSubsection[] = [
  {
    title: "Growing Public Attention and Data Collection",
    body: "In recent years, fatal police shootings in the United States have become a central topic in national conversations about policing, accountability, and public safety. Many high-profile incidents and public movements have increased attention to how these cases are reported and analyzed. At the same time, researchers and journalists have emphasized the importance of comprehensive data collection in order to better understand patterns in police use of force. However, official federal reporting systems have historically been incomplete, leading journalists and independent organizations to create a database that tracks these incidents more consistently.",
    className: "lg:col-span-2",
  },
  {
    title: "The Washington Post Fatal Police Shootings Dataset",
    body: "One of the most widely used sources is the Washington Post Fatal Police Shootings dataset, which compiles incidents using information gathered from public records, news reporting, and other publicly available sources. Our project focuses on incidents recorded between 2015 and 2024, allowing us to examine patterns across nearly a decade of data.",
  },
  {
    title: "Focus of This Project",
    body: "We focus on how these incidents changed after the COVID-19 pandemic, examine patterns in racial distribution over time, and where mental illness labeling appears most frequently in reported cases. Being able to understand these patterns help highlight how policing outcomes vary across time, demographic groups, and incident contexts, which can then be utilized to implement new policies and changes in policing that can potentially lead to decreases in fatal police shootings in the United States.",
  },
];

export default function IntroductionPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Narrative"
        title="Introduction"
        titleClassName={pageTitleStrongClassName}
        description="Why fatal police shooting data became a central public issue, why the Washington Post dataset matters for this project, and what questions organize our analysis."
        descriptionClassName={pageDescriptionWideClassName}
      />

      <section id="introduction-context" className="scroll-mt-16">
        <header className="sticky top-[60px] z-20 flex w-full items-center justify-between border-b border-black bg-white/90 px-6 py-4 backdrop-blur-sm sm:px-10">
          <div className="flex items-center gap-6">
            <p className={cn(pageMetaLabelClassName, "mb-0")}>Section 01</p>
            <h2 className="text-xl font-bold uppercase tracking-tight sm:text-2xl">
              Introduction
            </h2>
          </div>
        </header>

        <div className="px-6 py-8 sm:px-10 sm:py-12">
          <div className="grid gap-6 lg:grid-cols-2">
            {INTRODUCTION_ITEMS.map((item, index) => (
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
