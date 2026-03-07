type TableauView = {
  id: string;
  title: string;
  path: string;
};

type TableauNarrative = {
  visualizationHeading: string;
  chartTypeAndWhatItShows: string;
  whatItMeansInContext: string;
};

const TABLEAU_VIEWS: TableauView[] = [
  {
    id: "fatal-over-time",
    title: "Fatal Police Shootings Over Time in the U.S. (2015-2024)",
    path: "FatalPoliceShootingOvertimeintheU_S_/Sheet1",
  },
  {
    id: "post-pandemic-increase",
    title: "Fatal Police Shootings Increased 12% After COVID-19 Pandemic (2020)",
    path: "FatalPoliceShootingIncreased12AfterPandemic/Sheet2",
  },
  {
    id: "racial-distribution-over-time",
    title: "Racial Distribution of Fatal Police Shootings Over Time (2015-2024)",
    path: "RacialDistributionofFatalPoliceShootingsOverTime/Sheet3",
  },
  {
    id: "racial-composition-by-year",
    title: "Racial Composition of Fatal Police Shootings by Year",
    path: "RacialCOmpositionofFatalPoliceShootingsbyYear/Sheet4",
  },
];

const TABLEAU_EMBED_QUERY =
  "?:showVizHome=no&:embed=y&:device=desktop&:tabs=no&:toolbar=no&:showShareOptions=false&:display_count=n&:language=en-US&publish=yes";

const TABLEAU_NARRATIVES: Record<string, TableauNarrative> = {
  "fatal-over-time": {
    visualizationHeading:
      "Visualization 1: Fatal Police Shootings Over Time (Line Chart)",
    chartTypeAndWhatItShows:
      "A line chart was selected for this visualization because it is the most effective chart type for showing continuous change over time. The X-axis represents each year from 2015 to 2024, while the Y-axis shows the total number of fatal police shootings. A vertical reference line marks 2020 as the start of the pandemic era, and a shaded band highlights the post-pandemic period, making it easy to visually distinguish the two periods at a glance.",
    whatItMeansInContext:
      "This visualization directly addresses the research question of how fatal police shootings have changed after the pandemic. The data shows that between 2015 and 2019, shootings remained relatively stable, hovering around 960-1,000 per year. However, starting in 2020, there is a clear and sustained upward trend, reaching approximately 1,175 by 2024. This suggests that the pandemic period coincided with a notable and ongoing increase in fatal police shootings, raising important questions about how social instability, defunding debates, and strained police-community relations during COVID-19 may have contributed to this shift.",
  },
  "post-pandemic-increase": {
    visualizationHeading:
      "Visualization 2: Fatal Police Shootings Before vs. After the Pandemic (Bar Chart)",
    chartTypeAndWhatItShows:
      "A bar chart was chosen for this visualization because it excels at direct comparison between two discrete categories. The two bars represent the pre-pandemic period (2015-2019) and the post-pandemic period (2020-2024), with each bar displaying the total number of fatal shootings for that period. Different colors are used for each bar to visually reinforce the distinction between the two eras, and data labels at the top of each bar make the exact figures immediately readable without requiring the viewer to estimate from the axis.",
    whatItMeansInContext:
      "This chart complements the line chart by providing a clear aggregate comparison rather than year-by-year detail. With 4,923 shootings pre-pandemic and 5,507 post-pandemic, there was approximately a 12% increase in fatal police shootings after COVID-19. This finding is significant because it suggests the pandemic was not just a temporary disruption but may have contributed to a structural shift in the rate of fatal encounters between police and civilians - a trend that has persisted even as the acute phase of the pandemic has ended.",
  },
  "racial-distribution-over-time": {
    visualizationHeading:
      "Visualization 3: Racial Distribution of Fatal Police Shootings Over Time (Line Chart)",
    chartTypeAndWhatItShows:
      "A multi-line chart was selected for this visualization because it allows each racial group to be tracked independently across time, making individual trends visible in a way that a stacked area chart cannot achieve. Each colored line represents a different racial group (White, Black, Hispanic, Native American, Asian, and Other) plotted from 2015 to 2024. This format makes it easy to compare both the magnitude of shootings per group and whether those numbers have changed over the decade.",
    whatItMeansInContext:
      "This visualization addresses the research question of how the racial distribution of fatal police shootings has changed over time. The data shows that White Americans consistently have the highest absolute number of fatal shootings each year, followed by Black and Hispanic Americans. However, absolute numbers alone are misleading - Black Americans represent approximately 25-27% of all fatal shootings despite making up only about 13% of the U.S. population, indicating a severe and persistent racial disparity. Importantly, the relative proportions across all groups have remained largely stable from 2015 to 2024, suggesting that while the total number of shootings has increased post-pandemic, the racial breakdown of who is being killed has not meaningfully changed.",
  },
  "racial-composition-by-year": {
    visualizationHeading:
      "Visualization 4: Racial Composition of Fatal Police Shootings by Year (100% Stacked Bar Chart)",
    chartTypeAndWhatItShows:
      "A 100% stacked bar chart was chosen for this visualization because it is the ideal format for showing proportional composition across multiple categories over time. Unlike a regular bar chart that shows raw counts, this chart normalizes each year to 100%, allowing the viewer to directly compare what share of total fatal shootings each racial group represents in any given year, regardless of whether the overall total was higher or lower that year. This makes year-over-year proportional comparisons far more accurate and intuitive.",
    whatItMeansInContext:
      "This visualization reinforces and deepens the findings from the previous chart. By showing percentages rather than raw numbers, it becomes clear that the racial composition of fatal police shootings has been remarkably consistent across the entire 2015-2024 period. White Americans have consistently represented around 46-52% of victims, Black Americans approximately 25-27%, and Hispanic Americans around 17-19%. The stability of these proportions over a decade, despite significant social events like the Black Lives Matter movement, pandemic-era policing changes, and nationwide policy debates, suggests that systemic racial disparities in fatal police encounters have not been meaningfully reduced. This is one of the most important findings of the project.",
  },
};

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
      {views.map((view) => {
        const narrative = TABLEAU_NARRATIVES[view.id];

        return (
          <article key={view.id} className="space-y-4">
            <div className="border border-black">
              <iframe
                src={`https://public.tableau.com/views/${view.path}${TABLEAU_EMBED_QUERY}`}
                title={view.title}
                className="h-[420px] w-full sm:h-[520px] lg:h-[620px]"
                width="100%"
                loading="lazy"
                allowFullScreen
              />
            </div>

            {narrative ? (
              <div className="space-y-4 border border-black px-4 py-4">
                <h3 className="text-xl font-medium leading-tight">
                  {narrative.visualizationHeading}
                </h3>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">
                    Chart type &amp; what it shows:
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-black/80">
                    {narrative.chartTypeAndWhatItShows}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">
                    What it means in context:
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-black/80">
                    {narrative.whatItMeansInContext}
                  </p>
                </div>
              </div>
            ) : includeDescriptionPlaceholders ? (
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
        );
      })}
    </div>
  );
}
