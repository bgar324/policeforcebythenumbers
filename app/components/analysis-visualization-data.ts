import type { CSSProperties } from "react";

export type TableauVisualization = {
  id: string;
  title: string;
  path: string;
  visualizationHeading: string;
  chartTypeAndWhatItShows: string;
  whatItMeansInContext: string;
};

export const TABLEAU_VISUALIZATIONS: TableauVisualization[] = [
  {
    id: "fatal-over-time",
    title: "Fatal Police Shootings Over Time in the U.S. (2015-2024)",
    path: "FatalPoliceShootingOvertimeintheU_S_/Sheet1",
    visualizationHeading:
      "Visualization 1: Fatal Police Shootings Over Time (Line Chart)",
    chartTypeAndWhatItShows:
      "A line chart was selected for this visualization because it is the most effective chart type for showing continuous change over time. The X-axis represents each year from 2015 to 2024, while the Y-axis shows the total number of fatal police shootings. A vertical reference line marks 2020 as the start of the pandemic era, and a shaded band highlights the post-pandemic period, making it easy to visually distinguish the two periods at a glance.",
    whatItMeansInContext:
      "This visualization directly addresses the research question of how fatal police shootings have changed after the pandemic. The data shows that between 2015 and 2019, shootings remained relatively stable, hovering around 960-1,000 per year. However, starting in 2020, there is a clear and sustained upward trend, reaching approximately 1,175 by 2024. This suggests that the pandemic period coincided with a notable and ongoing increase in fatal police shootings, raising important questions about how social instability, defunding debates, and strained police-community relations during COVID-19 may have contributed to this shift.",
  },
  {
    id: "post-pandemic-increase",
    title: "Fatal Police Shootings Increased 12% After COVID-19 Pandemic (2020)",
    path: "FatalPoliceShootingIncreased12AfterPandemic/Sheet2",
    visualizationHeading:
      "Visualization 2: Fatal Police Shootings Before vs. After the Pandemic (Bar Chart)",
    chartTypeAndWhatItShows:
      "A bar chart was chosen for this visualization because it excels at direct comparison between two discrete categories. The two bars represent the pre-pandemic period (2015-2019) and the post-pandemic period (2020-2024), with each bar displaying the total number of fatal shootings for that period. Different colors are used for each bar to visually reinforce the distinction between the two eras, and data labels at the top of each bar make the exact figures immediately readable without requiring the viewer to estimate from the axis.",
    whatItMeansInContext:
      "This chart complements the line chart by providing a clear aggregate comparison rather than year-by-year detail. With 4,923 shootings pre-pandemic and 5,507 post-pandemic, there was approximately a 12% increase in fatal police shootings after COVID-19. This finding is significant because it suggests the pandemic was not just a temporary disruption but may have contributed to a structural shift in the rate of fatal encounters between police and civilians - a trend that has persisted even as the acute phase of the pandemic has ended.",
  },
  {
    id: "racial-distribution-over-time",
    title: "Racial Distribution of Fatal Police Shootings Over Time (2015-2024)",
    path: "RacialDistributionofFatalPoliceShootingsOverTime/Sheet3",
    visualizationHeading:
      "Visualization 3: Racial Distribution of Fatal Police Shootings Over Time (Line Chart)",
    chartTypeAndWhatItShows:
      "A multi-line chart was selected for this visualization because it allows each racial group to be tracked independently across time, making individual trends visible in a way that a stacked area chart cannot achieve. Each colored line represents a different racial group (White, Black, Hispanic, Native American, Asian, and Other) plotted from 2015 to 2024. This format makes it easy to compare both the magnitude of shootings per group and whether those numbers have changed over the decade.",
    whatItMeansInContext:
      "This visualization addresses the research question of how the racial distribution of fatal police shootings has changed over time. The data shows that White Americans consistently have the highest absolute number of fatal shootings each year, followed by Black and Hispanic Americans. However, absolute numbers alone are misleading - Black Americans represent approximately 25-27% of all fatal shootings despite making up only about 13% of the U.S. population, indicating a severe and persistent racial disparity. Importantly, the relative proportions across all groups have remained largely stable from 2015 to 2024, suggesting that while the total number of shootings has increased post-pandemic, the racial breakdown of who is being killed has not meaningfully changed.",
  },
  {
    id: "racial-composition-by-year",
    title: "Racial Composition of Fatal Police Shootings by Year",
    path: "RacialCOmpositionofFatalPoliceShootingsbyYear/Sheet4",
    visualizationHeading:
      "Visualization 4: Racial Composition of Fatal Police Shootings by Year (100% Stacked Bar Chart)",
    chartTypeAndWhatItShows:
      "A 100% stacked bar chart was chosen for this visualization because it is the ideal format for showing proportional composition across multiple categories over time. Unlike a regular bar chart that shows raw counts, this chart normalizes each year to 100%, allowing the viewer to directly compare what share of total fatal shootings each racial group represents in any given year, regardless of whether the overall total was higher or lower that year. This makes year-over-year proportional comparisons far more accurate and intuitive.",
    whatItMeansInContext:
      "This visualization reinforces and deepens the findings from the previous chart. By showing percentages rather than raw numbers, it becomes clear that the racial composition of fatal police shootings has been remarkably consistent across the entire 2015-2024 period. White Americans have consistently represented around 46-52% of victims, Black Americans approximately 25-27%, and Hispanic Americans around 17-19%. The stability of these proportions over a decade, despite significant social events like the Black Lives Matter movement, pandemic-era policing changes, and nationwide policy debates, suggests that systemic racial disparities in fatal police encounters have not been meaningfully reduced. This is one of the most important findings of the project.",
  },
];

export type ShootingsVisualization = {
  id: string;
  title: string;
  src: string;
  style: CSSProperties;
  visualizationHeading: string;
  chartTypeAndWhatItShows: string;
  whatItMeansInContext: string;
};

export const SHOOTINGS_VISUALIZATIONS: ShootingsVisualization[] = [
  {
    id: "map",
    title: "US State Choropleth Map",
    src: "/static/charts_json/map_state_choropleth.json",
    style: { width: "100%", minHeight: 480 },
    visualizationHeading: "Visualization 5: U.S. State Choropleth Map",
    chartTypeAndWhatItShows:
      "A choropleth map was chosen because geographic distribution is best communicated through spatial encoding - color intensity on a map immediately signals regional patterns in a way a table or bar chart cannot. This map shades each U.S. state by the percentage of police shootings flagged as mental-illness-related, ranging from light blue (lower rates) to dark blue (higher rates). States like New Hampshire (42.4%), South Dakota (34.3%), and New York (31.7%) appear darkest, while Kentucky (11.2%), Mississippi (12.2%), and Colorado (12.5%) appear lightest, with the national average sitting around 20%.",
    whatItMeansInContext:
      "The geographic variation in mental-illness labeling raises important questions about whether this difference reflects actual differences in crisis rates across states, or differences in how agencies document and classify incidents. States in the Northeast tend to show higher rates, which could reflect stronger mental health crisis intervention infrastructure that routes more calls to police, or simply more rigorous record-keeping. The map does not tell us that mental illness is more prevalent in these states - it tells us that police encounters labeled mental-illness-related are more common there, which may be as much a product of policy and reporting culture as of underlying social conditions.",
  },
  {
    id: "states",
    title: "Top & Bottom 10 States Bar Chart",
    src: "/static/charts_json/bar_top_bottom_states.json",
    style: { width: "100%", minHeight: 460 },
    visualizationHeading: "Visualization 6: Top & Bottom 10 States Bar Chart",
    chartTypeAndWhatItShows:
      "A horizontal bar chart was used here to make direct state-by-state comparison easy to read - horizontal orientation accommodates state abbreviation labels cleanly and allows viewers to rank states at a glance. The chart filters to states with at least 20 incidents to avoid misleading rates from tiny sample sizes. The top states (NH, SD, NY, MA, MN) have MI rates between 27-42%, while the bottom states (KY, MS, CO, MT, ID) cluster between 11-13%.",
    whatItMeansInContext:
      "The spread between the highest and lowest states - over 30 percentage points - is striking and suggests the mental illness label is applied very inconsistently across the country. This inconsistency is significant for this project because it means the data cannot be treated as a uniform national measure. A shooting flagged as mental-illness-related in New Hampshire may reflect a different set of criteria than one flagged the same way in Kentucky. Any conclusions drawn from this dataset must account for the fact that what counts as \"mental-illness-related\" is partly a function of where the incident happened and who is filling out the report.",
  },
  {
    id: "threat",
    title: "Threat Type Bar Chart",
    src: "/static/charts_json/bar_threat_type.json",
    style: { width: "100%", minHeight: 420 },
    visualizationHeading: "Visualization 7: Threat Type Bar Chart",
    chartTypeAndWhatItShows:
      "A horizontal bar chart ranked by MI rate was selected to show how the mental illness label varies across the different types of threat a subject was perceived to pose. The chart reveals a clear pattern: incidents coded as point (25.8%) and threat (23.9%) are most associated with mental illness, followed by attack (20.5%) and move (19%). At the bottom, flee (6.8%) and accident (0%) have the lowest MI rates.",
    whatItMeansInContext:
      "This pattern is consistent with what researchers describe as \"suicide by cop\" scenarios - situations where a person in mental health crisis deliberately provokes a police response without necessarily fleeing or launching a physical attack. The high MI rate for point and threat categories suggests that individuals flagged as mentally ill are more likely to be standing their ground or making a threatening gesture than actively attacking or running. For this project, this is a key finding: mental illness in police shooting data is not randomly distributed across threat types, but concentrated in specific behavioral profiles that likely reflect crisis rather than criminal intent.",
  },
  {
    id: "flee",
    title: "Flee Status Bar Chart",
    src: "/static/charts_json/bar_flee_status.json",
    style: { width: "100%", minHeight: 420 },
    visualizationHeading: "Visualization 8: Flee Status Bar Chart",
    chartTypeAndWhatItShows:
      "A horizontal bar chart was used to compare MI rates across flee status categories, making the contrast between groups immediately visible. The results are stark: subjects who did not flee had a 27.4% MI rate - more than three times higher than those fleeing by car (8%) or by other means (7.8%). Subjects fleeing on foot fell in between at 10.1%.",
    whatItMeansInContext:
      "The strong association between not fleeing and mental illness labeling is one of the most interpretively significant findings in this dataset. People experiencing a mental health crisis are less likely to attempt escape - they may be confused, dissociated, or actively seeking confrontation. This data pattern reinforces the argument that a substantial portion of police shootings involve people who are not evading law enforcement but are instead in acute psychiatric distress. For a project examining police violence, this raises urgent questions about whether lethal force is an appropriate response to what are often mental health emergencies, and whether better crisis intervention training or co-responder programs could prevent these deaths.",
  },
  {
    id: "armed",
    title: "Armed With Bar Chart",
    src: "/static/charts_json/bar_armed_with.json",
    style: { width: "100%", minHeight: 460 },
    visualizationHeading: "Visualization 9: Armed With Bar Chart",
    chartTypeAndWhatItShows:
      "A horizontal bar chart ranked by MI rate was chosen to show which weapon types most co-occur with the mental illness label among the 12 most common weapon categories. Replica weapons (36.3%), knives (32.9%), and blunt objects (29.4%) top the chart, while vehicles (4.6%) and vehicle/gun combinations (4%) are at the bottom. Notably, even unarmed subjects show an 18.6% MI rate, above the rate for those armed with guns (16.8%).",
    whatItMeansInContext:
      "The prominence of replica weapons and knives in mental-illness-related shootings is a critical finding. Replica weapons are by definition non-lethal, yet they produce the highest MI association rate in the dataset - suggesting that individuals in mental health crisis may brandish fake guns in ways consistent with suicidal behavior. The relatively lower rate for actual guns (16.8%) compared to replicas and knives further supports this interpretation. For this project, these patterns collectively argue that mental-illness-related police shootings form a distinct category of incident: not crimes being stopped, but crises being mismanaged - with fatal consequences.",
  },
];
