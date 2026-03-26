import {
  PageHeader,
  PageShell,
  pageDescriptionWideClassName,
  pageMetaLabelClassName,
  pageTitleStrongClassName,
} from "@/app/components/page-chrome";
import { cn } from "@/lib/utils";

type Acknowledgement = {
  name: string;
  message: string;
};

const ACKNOWLEDGEMENTS: Acknowledgement[] = [
  {
    name: "Dr. Nicholas Sabo",
    message:
      "Thank you for an engaging and insightful quarter introducing us to digital humanities. Through your lectures and guidance, we were able to explore new tools, methods, and ways of thinking about data, power, and narrative. Your teaching helped us better understand how digital tools can be used to analyze and present complex social issues.",
  },
  {
    name: "Pietro Santachiara",
    message:
      "Thank you for your guidance and support throughout discussion sections and during the research process. Your feedback, patience, and willingness to answer our questions helped us navigate unfamiliar tools and strengthen our project. Your insights greatly improved both our analysis and our final presentation.",
  },
];

export default function AcknowledgementsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="About"
        title="Acknowledgements"
        titleClassName={pageTitleStrongClassName}
        description="Recognition for the people whose teaching, guidance, and feedback shaped the direction of this project."
        descriptionClassName={pageDescriptionWideClassName}
      />

      <section id="project-thanks" className="scroll-mt-16">
        <header className="sticky top-[60px] z-20 flex w-full items-center justify-between border-b border-black bg-white/90 px-6 py-4 backdrop-blur-sm sm:px-10">
          <div className="flex items-center gap-6">
            <p className={cn(pageMetaLabelClassName, "mb-0")}>Section 01</p>
            <h2 className="text-xl font-bold uppercase tracking-tight sm:text-2xl">
              Acknowledgements
            </h2>
          </div>
        </header>

        <div className="px-6 py-8 sm:px-10 sm:py-12">
          <div className="grid gap-6 lg:grid-cols-2">
            {ACKNOWLEDGEMENTS.map((entry, index) => (
              <article
                key={entry.name}
                className="min-h-[220px] border border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex h-full flex-col justify-start p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <p className={pageMetaLabelClassName}>Thank you,</p>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/65">
                      01.{String(index + 1).padStart(2, "0")}
                    </p>
                  </div>

                  <h3 className="mt-2 max-w-3xl text-2xl font-semibold leading-tight sm:text-[2rem]">
                    {entry.name}
                  </h3>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-black/80 sm:text-base">
                    {entry.message}
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
