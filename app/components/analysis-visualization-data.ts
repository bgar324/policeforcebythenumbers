import type { CSSProperties } from "react";

export type RichTextSegment =
  | { type: "text"; text: string }
  | { type: "citation"; label: string; bibliographyId: string };

export type RichTextContent = RichTextSegment[][];

export type TableauVisualization = {
  id: string;
  title: string;
  path: string;
  visualizationHeading: string;
  chartTypeAndWhatItShows: RichTextContent;
  whatItMeansInContext: RichTextContent;
};

export type ShootingsVisualization = {
  id: string;
  title: string;
  src: string;
  style: CSSProperties;
  visualizationHeading: string;
  chartTypeAndWhatItShows: RichTextContent;
  whatItMeansInContext: RichTextContent;
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

export const TABLEAU_VISUALIZATIONS: TableauVisualization[] = [
  {
    id: "fatal-over-time",
    title: "Fatal Police Shootings Over Time in the U.S. (2015-2024)",
    path: "FatalPoliceShootingOvertimeintheU_S_/Sheet1",
    visualizationHeading:
      "Visualization 1: Fatal Police Shootings Over Time (Line Graph)",
    chartTypeAndWhatItShows: rich(
      "This is a line graph that tracks the annual number of fatal police shootings in the United States from 2015 to 2024. The x-axis marks the year, while the y-axis measures the count of fatal shootings. An orange background region beginning at 2020 and extending to 2024 demarcates what the authors label the \"Post-Pandemic Period,\" with a vertical pandemic reference line anchored at 2020. The line reveals a generally stable trend from 2015 to 2019, and then a sharp upward climb beginning in 2020 that levels off near 1,175 by 2023-2024. The chart uses a single continuous line against a highlighted post-pandemic zone to make the temporal shift in shooting frequency visually self-evident.",
    ),
    whatItMeansInContext: [
      paragraph(
        text(
          "The upward trend visible after 2020 aligns with what the broader research literature characterizes as a systemic and multi-causal problem. ",
        ),
        citation("Hemenway et al. (2019)", "hemenway-2019"),
        text(
          " establish that the United States records approximately 1,000 civilian deaths annually in police encounters, most resulting from gunshots, which makes the post-pandemic surge, pushing that figure significantly higher, a meaningful escalation beyond the already elevated pre-pandemic baseline. ",
        ),
        citation("Henderson et al. (2024)", "henderson-2024"),
        text(
          " provide further structural context by demonstrating that police shootings are most strongly predicted by community-level mental health concerns, food insecurity, and violent crime rates. Given that the COVID-19 pandemic severely disrupted social services, deepened economic precarity, and strained mental health infrastructure across the country, the post-2020 rise visible in this chart is consistent with Henderson et al.'s regression model linking socio-economic deterioration to increased lethal police encounters. Taken together, the line graph answers the research question directly: fatal police shootings increased substantially after the pandemic began, and the literature suggests this increase reflects the compound effects of social vulnerability, reduced community resources, and sustained institutional barriers to policing reform.",
        ),
      ),
    ],
  },
  {
    id: "post-pandemic-increase",
    title: "Fatal Police Shootings Before vs. After the Pandemic",
    path: "FatalPoliceShootingIncreased12AfterPandemic/Sheet2",
    visualizationHeading:
      "Visualization 2: Fatal Police Shootings Before vs. After the Pandemic (Grouped Bar Chart)",
    chartTypeAndWhatItShows: rich(
      "This is a grouped bar chart comparing the total number of fatal police shootings across two distinct periods: the pre-pandemic era (2015-2019, shown in blue) and the post-pandemic era (2020-2024, shown in orange). The y-axis measures the cumulative count of fatal shootings, while the x-axis distinguishes the two time blocks. The blue bar reaches 4,923 total shootings across the pre-pandemic five-year window, while the orange bar climbs to 5,507 for the post-pandemic equivalent. The chart's headline translates the absolute difference of 584 additional deaths into a percentage change to aid interpretability. By aggregating data into two symmetrical five-year windows rather than year-by-year values, the chart reduces year-to-year noise and foregrounds the cumulative magnitude of the post-pandemic increase.",
    ),
    whatItMeansInContext: [
      paragraph(
        text(
          "The upward trend visible after 2020 aligns with what the broader research literature characterizes as a systemic and multi-causal problem. ",
        ),
        citation("Hemenway et al. (2019)", "hemenway-2019"),
        text(
          " establish that the United States records approximately 1,000 civilian deaths annually in police encounters, most resulting from gunshots, which makes the post-pandemic surge, pushing that figure significantly higher, a meaningful escalation beyond the already elevated pre-pandemic baseline. ",
        ),
        citation("Henderson et al. (2024)", "henderson-2024"),
        text(
          " provide further structural context by demonstrating that police shootings are most strongly predicted by community-level mental health concerns, food insecurity, and violent crime rates. Given that the COVID-19 pandemic severely disrupted social services, deepened economic precarity, and strained mental health infrastructure across the country, the post-2020 rise visible in this chart is consistent with Henderson et al.'s regression model linking socio-economic deterioration to increased lethal police encounters. To conclude, this bar chart confirms the same answer as the line graph: fatal police shootings increased substantially after the pandemic began, and the literature suggests this increase reflects the compound effects of social vulnerability, reduced community resources, and sustained institutional barriers to policing reform.",
        ),
      ),
    ],
  },
  {
    id: "racial-distribution-over-time",
    title: "Racial Disparity Ratio of Fatal Police Shootings (2015-2024)",
    path: "RacialDistributionofFatalPoliceShootingsOverTime/Sheet3",
    visualizationHeading:
      "Visualization 1: Racial Disparity Ratio of Fatal Police Shootings (Multi-Line Chart)",
    chartTypeAndWhatItShows: rich(
      "This is a multi-line chart displaying the racial disparity ratio of fatal police shootings for five racial groups (Asian, Black, Hispanic, Native American, and White) from 2015 to 2024. The y-axis measures a disparity ratio, where the dashed horizontal reference line at 1.0 represents proportional representation: a group being killed at exactly the rate its share of the U.S. population would predict. Values above 1.0 indicate overrepresentation in fatal shootings; values below indicate underrepresentation. The Black line consistently sits between approximately 1.95 and 2.25 across the entire decade, meaning Black Americans are killed at roughly twice the rate their population share would predict. The Native American line is the most volatile, spiking as high as approximately 1.85 around 2017 before dropping and then climbing again toward approximately 1.35 by 2024, reflecting a smaller population base that makes year-to-year fluctuations more pronounced. The Hispanic line hovers near the 1.0 proportional threshold throughout, while the White line trends slightly below 1.0 across most years, indicating marginal underrepresentation. The Asian line remains the furthest below proportionality, consistently near 0.25-0.35 throughout the period, showing persistent and significant underrepresentation. Crucially, despite a decade of public attention, racial justice movements, and reform discourse, no group's ratio converges meaningfully toward proportionality over time, and the gaps remain structurally stable.",
    ),
    whatItMeansInContext: [
      paragraph(
        text(
          "The persistent elevation of the Black disparity ratio above 2.0 across all ten years is one of the chart's most significant findings, and it directly corroborates what the literature identifies as a deeply embedded structural problem rather than a temporal anomaly. ",
        ),
        citation("Lett et al. (2021)", "lett-2021"),
        text(
          ", analyzing the same Washington Post dataset across 2015-2020, characterize racial disparities in fatal police shootings as a sustained public health crisis, finding that Black, Hispanic, and Native American communities face measurably higher death rates and years of life lost, a pattern this chart confirms extends unabated through 2024. The volatility of the Native American line is also theoretically meaningful. ",
        ),
        citation("Zare et al. (2025)", "zare-2025"),
        text(
          " demonstrate that fatal police shootings concentrate most intensely in communities with high Social Vulnerability Index scores, and Native American communities disproportionately occupy high-vulnerability geographies, which may explain both the elevated ratio and its instability across years given the small population denominator. ",
        ),
        citation("Scott et al. (2017)", "scott-2017"),
        text(
          " further support the chart's overall pattern by showing through DOJ data across 213 metropolitan areas that police are more likely to shoot Black suspects even after statistically controlling for differences in crime and arrest rates, directly countering the argument that the disparity ratios visible in this chart merely reflect differential crime exposure. Taken together, we can conclude that the racial distribution of fatal police shootings has not meaningfully changed from 2015 to the present. The overrepresentation of Black and, at times, Native American individuals is not a product of any single year or event, but a durable structural feature of American policing.",
        ),
      ),
    ],
  },
  {
    id: "racial-composition-by-year",
    title: "Racial Composition of Fatal Police Shootings by Year",
    path: "RacialCOmpositionofFatalPoliceShootingsbyYear/Sheet4",
    visualizationHeading:
      "Visualization 2: Racial Composition of Fatal Police Shootings by Year (100% Stacked Bar Chart)",
    chartTypeAndWhatItShows: rich(
      "This is a 100% stacked bar chart showing the annual racial composition of fatal police shootings from 2015 to 2024. Each bar represents a single year and is subdivided into colored segments corresponding to six racial categories: White (red), Black (orange), Hispanic (green), Native American (pink), Other (yellow), and Asian (blue). Because each bar sums to 100%, the chart communicates the proportional share each group contributes to total fatal shootings in a given year rather than absolute counts. White victims consistently account for the largest single segment, occupying roughly 46-52% of each bar. Black victims form the second-largest share at approximately 26-28% annually. Hispanic victims represent around 17-20%, while Native American, Asian, and Other categories each account for small slivers near the top of every bar. The overall composition remains visually stable across all ten years, with no dramatic shifts in the relative size of any segment.",
    ),
    whatItMeansInContext: [
      paragraph(
        text(
          "While the stacked bar chart shows that White individuals constitute the largest raw proportion of fatal police shooting victims each year, this finding must be interpreted carefully against population benchmarks, a distinction the disparity ratio chart above makes explicit. ",
        ),
        citation("Zare et al. (2022)", "zare-2022"),
        text(
          " use Washington Post Fatal Force data from 2015-2020 to demonstrate that when shooting counts are adjusted for population size, Black and Hispanic individuals face substantially elevated rates of police-involved death, meaning their approximately 26-28% and 17-20% shares in this chart represent a far heavier per-capita burden than the White majority's 46-52% share. ",
        ),
        citation("Walsh (2022)", "walsh-2022"),
        text(
          " similarly contextualizes raw proportions by emphasizing that Black Americans are disproportionately shot and killed relative to their share of the national population, and that focusing on absolute or proportional counts without this adjustment risks obscuring the true depth of racial inequity. The compositional stability visible across all ten bars reinforces the conclusion drawn from the disparity ratio chart: the racial distribution of fatal police shootings has changed very little from 2015 to the present.",
        ),
      ),
    ],
  },
];

export const SHOOTINGS_VISUALIZATIONS: ShootingsVisualization[] = [
  {
    id: "map",
    title: "US State Choropleth Map",
    src: "/static/charts_json/map_state_choropleth.json",
    style: { width: "100%", minHeight: 480 },
    visualizationHeading: "Visualization 1: US State Choropleth Map",
    chartTypeAndWhatItShows: rich(
      "A choropleth map was chosen because geographic distribution is best communicated through spatial encoding - color intensity on a map immediately signals regional patterns in a way a table or bar chart cannot. This map shades each U.S. state by the percentage of police shootings flagged as mental-illness-related, ranging from light blue (lower rates) to dark blue (higher rates). States like New Hampshire (42.4%), South Dakota (34.3%), and New York (31.7%) appear darkest, while Kentucky (11.2%), Mississippi (12.2%), and Colorado (12.5%) appear lightest, with the national average sitting around 20%.",
    ),
    whatItMeansInContext: rich(
      "The geographic variation in mental-illness labeling raises important questions about whether this difference reflects actual differences in crisis rates across states, or differences in how agencies document and classify incidents. States in the Northeast tend to show higher rates, which could reflect stronger mental health crisis intervention infrastructure that routes more calls to police, or simply more rigorous record-keeping. The map does not tell us that mental illness is more prevalent in these states - it tells us that police encounters labeled mental-illness-related are more common there, which may be as much a product of policy and reporting culture as of underlying social conditions.",
    ),
  },
  {
    id: "states",
    title: "Top & Bottom 10 States Bar Chart",
    src: "/static/charts_json/bar_top_bottom_states.json",
    style: { width: "100%", minHeight: 460 },
    visualizationHeading: "Visualization 2: Top & Bottom 10 States Bar Chart",
    chartTypeAndWhatItShows: rich(
      "A horizontal bar chart was used here to make direct state-by-state comparison easy to read - horizontal orientation accommodates state abbreviation labels cleanly and allows viewers to rank states at a glance. The chart filters to states with at least 20 incidents to avoid misleading rates from tiny sample sizes. The top states (NH, SD, NY, MA, MN) have MI rates between 27-42%, while the bottom states (KY, MS, CO, MT, ID) cluster between 11-13%.",
    ),
    whatItMeansInContext: rich(
      "The spread between the highest and lowest states - over 30 percentage points - is striking and suggests the mental illness label is applied very inconsistently across the country. This inconsistency is significant for this project because it means the data cannot be treated as a uniform national measure. A shooting flagged as mental-illness-related in New Hampshire may reflect a different set of criteria than one flagged the same way in Kentucky. Any conclusions drawn from this dataset must account for the fact that what counts as \"mental-illness-related\" is partly a function of where the incident happened and who is filling out the report.",
    ),
  },
  {
    id: "threat",
    title: "Threat Type Bar Chart",
    src: "/static/charts_json/bar_threat_type.json",
    style: { width: "100%", minHeight: 420 },
    visualizationHeading: "Visualization 3: Threat Type Bar Chart",
    chartTypeAndWhatItShows: rich(
      "A horizontal bar chart ranked by MI rate was selected to show how the mental illness label varies across the different types of threat a subject was perceived to pose. The chart reveals a clear pattern: incidents coded as point (25.8%) and threat (23.9%) are most associated with mental illness, followed by attack (20.5%) and move (19%). At the bottom, flee (6.8%) and accident (0%) have the lowest MI rates.",
    ),
    whatItMeansInContext: rich(
      "This pattern is consistent with what researchers describe as \"suicide by cop\" scenarios - situations where a person in mental health crisis deliberately provokes a police response without necessarily fleeing or launching a physical attack. The high MI rate for point and threat categories suggests that individuals flagged as mentally ill are more likely to be standing their ground or making a threatening gesture than actively attacking or running. For this project, this is a key finding: mental illness in police shooting data is not randomly distributed across threat types, but concentrated in specific behavioral profiles that likely reflect crisis rather than criminal intent.",
    ),
  },
  {
    id: "flee",
    title: "Flee Status Bar Chart",
    src: "/static/charts_json/bar_flee_status.json",
    style: { width: "100%", minHeight: 420 },
    visualizationHeading: "Visualization 4: Flee Status Bar Chart",
    chartTypeAndWhatItShows: rich(
      "A horizontal bar chart was used to compare MI rates across flee status categories, making the contrast between groups immediately visible. The results are stark: subjects who did not flee had a 27.4% MI rate - more than three times higher than those fleeing by car (8%) or by other means (7.8%). Subjects fleeing on foot fell in between at 10.1%.",
    ),
    whatItMeansInContext: rich(
      "The strong association between not fleeing and mental illness labeling is one of the most interpretively significant findings in this dataset. People experiencing a mental health crisis are less likely to attempt escape - they may be confused, dissociated, or actively seeking confrontation. This data pattern reinforces the argument that a substantial portion of police shootings involve people who are not evading law enforcement but are instead in acute psychiatric distress. For a project examining police violence, this raises urgent questions about whether lethal force is an appropriate response to what are often mental health emergencies, and whether better crisis intervention training or co-responder programs could prevent these deaths.",
    ),
  },
  {
    id: "armed",
    title: "Armed With Bar Chart",
    src: "/static/charts_json/bar_armed_with.json",
    style: { width: "100%", minHeight: 460 },
    visualizationHeading: "Visualization 5: Armed With Bar Chart",
    chartTypeAndWhatItShows: rich(
      "A horizontal bar chart ranked by MI rate was chosen to show which weapon types most co-occur with the mental illness label among the 12 most common weapon categories. Replica weapons (36.3%), knives (32.9%), and blunt objects (29.4%) top the chart, while vehicles (4.6%) and vehicle/gun combinations (4%) are at the bottom. Notably, even unarmed subjects show an 18.6% MI rate, above the rate for those armed with guns (16.8%).",
    ),
    whatItMeansInContext: rich(
      "The prominence of replica weapons and knives in mental-illness-related shootings is a critical finding. Replica weapons are by definition non-lethal, yet they produce the highest MI association rate in the dataset - suggesting that individuals in mental health crisis may brandish fake guns in ways consistent with suicidal behavior. The relatively lower rate for actual guns (16.8%) compared to replicas and knives further supports this interpretation. For this project, these patterns collectively argue that mental-illness-related police shootings form a distinct category of incident: not crimes being stopped, but crises being mismanaged - with fatal consequences.",
    ),
  },
];
