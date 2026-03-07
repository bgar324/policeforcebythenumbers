type TableauView = {
  id: string;
  title: string;
  src: string;
};

const TABLEAU_VIEWS: TableauView[] = [
  {
    id: "fatal-over-time",
    title: "Fatal Police Shootings Over Time in the U.S. (2015-2024)",
    src: "https://public.tableau.com/views/FatalPoliceShootingOvertimeintheU_S_/Sheet1?:showVizHome=no&:toolbar=yes&:language=en-US&publish=yes",
  },
  {
    id: "post-pandemic-increase",
    title: "Fatal Police Shootings Increased 12% After COVID-19 Pandemic (2020)",
    src: "https://public.tableau.com/views/FatalPoliceShootingIncreased12AfterPandemic/Sheet2?:showVizHome=no&:toolbar=yes&:language=en-US&publish=yes",
  },
  {
    id: "racial-distribution-over-time",
    title: "Racial Distribution of Fatal Police Shootings Over Time (2015-2024)",
    src: "https://public.tableau.com/views/RacialDistributionofFatalPoliceShootingsOverTime/Sheet3?:showVizHome=no&:toolbar=yes&:language=en-US&publish=yes",
  },
  {
    id: "racial-composition-by-year",
    title: "Racial Composition of Fatal Police Shootings by Year",
    src: "https://public.tableau.com/views/RacialCOmpositionofFatalPoliceShootingsbyYear/Sheet4?:showVizHome=no&:toolbar=yes&:language=en-US&publish=yes",
  },
];

type TableauEmbedsProps = {
  ids?: string[];
  includeDescriptionPlaceholders?: boolean;
};

export default function TableauEmbeds({
  ids,
  includeDescriptionPlaceholders = true,
}: TableauEmbedsProps) {
  const views = ids
    ? TABLEAU_VIEWS.filter((view) => ids.includes(view.id))
    : TABLEAU_VIEWS;

  return (
    <div className="space-y-8">
      {views.map((view) => (
        <article key={view.id} className="space-y-4">
          <div className="border border-black">
            <iframe
              src={view.src}
              title={view.title}
              className="h-[420px] w-full sm:h-[520px] lg:h-[620px]"
              loading="lazy"
            />
          </div>

          {includeDescriptionPlaceholders ? (
            <div className="border border-dashed border-black/40 px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/60">
                Placeholder
              </p>
              <p className="mt-2 text-sm leading-relaxed text-black/70">
                {`Placeholder for ${view.title} interpretation and narrative summary.`}
              </p>
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}
