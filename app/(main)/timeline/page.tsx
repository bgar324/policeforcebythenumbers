import {
  PageHeader,
  PageShell,
  pageDescriptionWideClassName,
  pageMetaLabelClassName,
  pageTitleStrongClassName,
} from "@/app/components/page-chrome";
import { cn } from "@/lib/utils";

const TIMELINE_CONTEXT_ITEMS = [
  {
    title: "Scope of the Timeline",
    body: "This timeline situates our project within major U.S. events, including mass shootings, presidential elections, the COVID-19 pandemic, and key police accountability moments. It frames our analysis within a broader national context so shifts in data can be read alongside changes in public discourse, governance, and collective crisis.",
    className: "lg:col-span-2",
  },
  {
    title: "Coverage Window",
    body: "2016 to 2023",
  },
];

export default function TimelinePage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Core"
        title="Timeline"
        titleClassName={pageTitleStrongClassName}
        description="A chronological frame for the political, social, and cultural events surrounding the project’s analysis of fatal police shootings."
        descriptionClassName={pageDescriptionWideClassName}
      />

      <section id="timeline-context" className="border-b border-black scroll-mt-16">
        <header className="sticky top-[60px] z-20 flex w-full items-center justify-between border-b border-black bg-white/90 px-6 py-4 backdrop-blur-sm sm:px-10">
          <div className="flex items-center gap-6">
            <p className={cn(pageMetaLabelClassName, "mb-0")}>Section 01</p>
            <h2 className="text-xl font-bold uppercase tracking-tight sm:text-2xl">
              Timeline Context
            </h2>
          </div>
        </header>

        <div className="px-6 py-8 sm:px-10 sm:py-12">
          <div className="grid gap-6 lg:grid-cols-3">
            {TIMELINE_CONTEXT_ITEMS.map((item, index) => (
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

      <section id="interactive-timeline" className="scroll-mt-16">
        <header className="sticky top-[60px] z-20 flex w-full items-center justify-between border-b border-black bg-white/90 px-6 py-4 backdrop-blur-sm sm:px-10">
          <div className="flex items-center gap-6">
            <p className={cn(pageMetaLabelClassName, "mb-0")}>Section 02</p>
            <h2 className="text-xl font-bold uppercase tracking-tight sm:text-2xl">
              Interactive Timeline
            </h2>
          </div>
        </header>

        <div className="px-6 py-8 sm:px-10 sm:py-12">
          <article className="border border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="border-b border-black px-5 py-4 sm:px-6">
              <div className="flex items-start justify-between gap-4">
                <p className={pageMetaLabelClassName}>Embedded Source</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/45">
                  02.01
                </p>
              </div>
              <h3 className="mt-2 max-w-4xl text-2xl font-semibold leading-tight sm:text-[2rem]">
                Police Force by the Numbers Timeline
              </h3>
            </div>

            <div className="p-4 sm:p-6">
              <div className="overflow-hidden border border-black bg-zinc-50">
                <iframe
                  src="https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=v2%3A2PACX-1vRfK2PjloX2RwqcVcUgiO-r75I75-N-B6Fdq4RcrG5ZzMXydvZQetW1l9ikXuqVoDE4f-ZPR99VuNHx&font=Default&lang=en&initial_zoom=2&width=100%25&height=650"
                  width="100%"
                  height="650"
                  allowFullScreen
                  frameBorder={0}
                  title="Police Force by the Numbers Timeline"
                  className="w-full"
                />
              </div>
            </div>
          </article>
        </div>
      </section>
    </PageShell>
  );
}
