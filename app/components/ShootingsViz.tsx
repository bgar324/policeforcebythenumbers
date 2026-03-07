"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

type PlotFigure = {
  data: unknown[];
  layout: Record<string, unknown>;
};

type ChartConfig = {
  id: string;
  src: string;
  style: CSSProperties;
};

type PlotlyInstance = {
  newPlot: (
    root: HTMLDivElement,
    data: unknown[],
    layout: Record<string, unknown>,
    config: Record<string, unknown>,
  ) => Promise<unknown>;
  purge: (root: HTMLDivElement) => void;
  Plots: {
    resize: (root: HTMLDivElement) => void;
  };
};

const CHARTS: ChartConfig[] = [
  {
    id: "map",
    src: "/static/charts_json/map_state_choropleth.json",
    style: { width: "100%", minHeight: 480 },
  },
  {
    id: "states",
    src: "/static/charts_json/bar_top_bottom_states.json",
    style: { width: "100%", minHeight: 460 },
  },
  {
    id: "threat",
    src: "/static/charts_json/bar_threat_type.json",
    style: { width: "100%", minHeight: 420 },
  },
  {
    id: "flee",
    src: "/static/charts_json/bar_flee_status.json",
    style: { width: "100%", minHeight: 420 },
  },
  {
    id: "armed",
    src: "/static/charts_json/bar_armed_with.json",
    style: { width: "100%", minHeight: 460 },
  },
];

function ChartBlock({
  figure,
  style,
}: {
  figure: PlotFigure;
  style: CSSProperties;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const plotlyRef = useRef<PlotlyInstance | null>(null);

  const layout = useMemo(
    () => ({
      ...figure.layout,
      autosize: true,
    }),
    [figure.layout],
  );

  useEffect(() => {
    let cancelled = false;
    let resizeObserver: ResizeObserver | null = null;
    const root = rootRef.current;

    const renderPlot = async () => {
      if (!root) {
        return;
      }

      const plotlyModule = await import("plotly.js/dist/plotly");
      const plotly = (plotlyModule.default ?? plotlyModule) as PlotlyInstance;
      plotlyRef.current = plotly;

      if (cancelled) {
        return;
      }

      await plotly.newPlot(root, figure.data, layout, {
        displaylogo: false,
        responsive: true,
        scrollZoom: false,
      });

      if (cancelled) {
        return;
      }

      if (typeof ResizeObserver !== "undefined") {
        resizeObserver = new ResizeObserver(() => {
          if (!root || !plotlyRef.current) {
            return;
          }
          plotlyRef.current.Plots.resize(root);
        });
        resizeObserver.observe(root);
      }
    };

    void renderPlot();

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();

      if (root && plotlyRef.current) {
        try {
          plotlyRef.current.purge(root);
        } catch {
          // Best effort cleanup. Plotly sometimes throws if already purged.
        }
      }
    };
  }, [figure.data, layout]);

  return <div ref={rootRef} style={style} />;
}

export default function ShootingsViz() {
  const [figures, setFigures] = useState<Record<string, PlotFigure>>({});
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadCharts = async () => {
      try {
        const entries = await Promise.all(
          CHARTS.map(async (chart) => {
            const response = await fetch(chart.src);
            if (!response.ok) {
              throw new Error(
                `Failed to load chart data from ${chart.src} (status ${response.status}).`,
              );
            }

            const figure = (await response.json()) as PlotFigure;
            return [chart.id, figure] as const;
          }),
        );

        if (!cancelled) {
          setFigures(Object.fromEntries(entries));
        }
      } catch {
        if (!cancelled) {
          setLoadError("Unable to load chart data right now.");
        }
      }
    };

    void loadCharts();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loadError) {
    return (
      <p className="border border-black px-4 py-3 text-sm text-black/70">{loadError}</p>
    );
  }

  const isLoading = CHARTS.some((chart) => !figures[chart.id]);
  if (isLoading) {
    return <p className="text-sm text-black/70">Loading charts...</p>;
  }

  return (
    <div className="space-y-12">
      <article className="space-y-5">
        <h3 className="text-2xl font-medium leading-tight">
          1. US State Choropleth Map
        </h3>
        <div className="border border-black p-2">
          <ChartBlock figure={figures.map} style={CHARTS[0].style} />
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">
            Chart type &amp; what it shows:
          </p>
          <p className="mt-2 text-sm leading-relaxed text-black/80">
            A choropleth map was chosen because geographic distribution is best
            communicated through spatial encoding - color intensity on a map
            immediately signals regional patterns in a way a table or bar chart
            cannot. This map shades each U.S. state by the percentage of police
            shootings flagged as mental-illness-related, ranging from light
            blue (lower rates) to dark blue (higher rates). States like New
            Hampshire (42.4%), South Dakota (34.3%), and New York (31.7%)
            appear darkest, while Kentucky (11.2%), Mississippi (12.2%), and
            Colorado (12.5%) appear lightest, with the national average sitting
            around 20%.
          </p>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">
            What it means in context:
          </p>
          <p className="mt-2 text-sm leading-relaxed text-black/80">
            The geographic variation in mental-illness labeling raises
            important questions about whether this difference reflects actual
            differences in crisis rates across states, or differences in how
            agencies document and classify incidents. States in the Northeast
            tend to show higher rates, which could reflect stronger mental
            health crisis intervention infrastructure that routes more calls to
            police, or simply more rigorous record-keeping. The map does not
            tell us that mental illness is more prevalent in these states - it
            tells us that police encounters labeled mental-illness-related are
            more common there, which may be as much a product of policy and
            reporting culture as of underlying social conditions.
          </p>
        </div>
      </article>

      <article className="space-y-5 border-t border-black pt-8">
        <h3 className="text-2xl font-medium leading-tight">
          2. Top &amp; Bottom 10 States Bar Chart
        </h3>
        <div className="border border-black p-2">
          <ChartBlock figure={figures.states} style={CHARTS[1].style} />
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">
            Chart type &amp; what it shows:
          </p>
          <p className="mt-2 text-sm leading-relaxed text-black/80">
            A horizontal bar chart was used here to make direct state-by-state
            comparison easy to read - horizontal orientation accommodates state
            abbreviation labels cleanly and allows viewers to rank states at a
            glance. The chart filters to states with at least 20 incidents to
            avoid misleading rates from tiny sample sizes. The top states (NH,
            SD, NY, MA, MN) have MI rates between 27-42%, while the bottom
            states (KY, MS, CO, MT, ID) cluster between 11-13%.
          </p>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">
            What it means in context:
          </p>
          <p className="mt-2 text-sm leading-relaxed text-black/80">
            The spread between the highest and lowest states - over 30
            percentage points - is striking and suggests the mental illness
            label is applied very inconsistently across the country. This
            inconsistency is significant for this project because it means the
            data cannot be treated as a uniform national measure. A shooting
            flagged as mental-illness-related in New Hampshire may reflect a
            different set of criteria than one flagged the same way in
            Kentucky. Any conclusions drawn from this dataset must account for
            the fact that what counts as &quot;mental-illness-related&quot; is
            partly a
            function of where the incident happened and who is filling out the
            report.
          </p>
        </div>
      </article>

      <article className="space-y-5 border-t border-black pt-8">
        <h3 className="text-2xl font-medium leading-tight">
          3. Threat Type Bar Chart
        </h3>
        <div className="border border-black p-2">
          <ChartBlock figure={figures.threat} style={CHARTS[2].style} />
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">
            Chart type &amp; what it shows:
          </p>
          <p className="mt-2 text-sm leading-relaxed text-black/80">
            A horizontal bar chart ranked by MI rate was selected to show how
            the mental illness label varies across the different types of threat
            a subject was perceived to pose. The chart reveals a clear pattern:
            incidents coded as point (25.8%) and threat (23.9%) are most
            associated with mental illness, followed by attack (20.5%) and move
            (19%). At the bottom, flee (6.8%) and accident (0%) have the lowest
            MI rates.
          </p>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">
            What it means in context:
          </p>
          <p className="mt-2 text-sm leading-relaxed text-black/80">
            This pattern is consistent with what researchers describe as
            &quot;suicide by cop&quot; scenarios - situations where a person in
            mental health crisis deliberately provokes a police response without
            necessarily fleeing or launching a physical attack. The high MI rate
            for point and threat categories suggests that individuals flagged as
            mentally ill are more likely to be standing their ground or making a
            threatening gesture than actively attacking or running.
            For this project, this is a key finding: mental illness in police
            shooting data is not randomly distributed across threat types, but
            concentrated in specific behavioral profiles that likely reflect
            crisis rather than criminal intent.
          </p>
        </div>
      </article>

      <article className="space-y-5 border-t border-black pt-8">
        <h3 className="text-2xl font-medium leading-tight">
          4. Flee Status Bar Chart
        </h3>
        <div className="border border-black p-2">
          <ChartBlock figure={figures.flee} style={CHARTS[3].style} />
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">
            Chart type &amp; what it shows:
          </p>
          <p className="mt-2 text-sm leading-relaxed text-black/80">
            A horizontal bar chart was used to compare MI rates across flee
            status categories, making the contrast between groups immediately
            visible. The results are stark: subjects who did not flee had a
            27.4% MI rate - more than three times higher than those fleeing by
            car (8%) or by other means (7.8%). Subjects fleeing on foot fell in
            between at 10.1%.
          </p>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">
            What it means in context:
          </p>
          <p className="mt-2 text-sm leading-relaxed text-black/80">
            The strong association between not fleeing and mental illness
            labeling is one of the most interpretively significant findings in
            this dataset. People experiencing a mental health crisis are less
            likely to attempt escape - they may be confused, dissociated, or
            actively seeking confrontation. This data pattern reinforces the
            argument that a substantial portion of police shootings involve
            people who are not evading law enforcement but are instead in acute
            psychiatric distress. For a project examining police violence, this
            raises urgent questions about whether lethal force is an appropriate
            response to what are often mental health emergencies, and whether
            better crisis intervention training or co-responder programs could
            prevent these deaths.
          </p>
        </div>
      </article>

      <article className="space-y-5 border-t border-black pt-8">
        <h3 className="text-2xl font-medium leading-tight">
          5. Armed With Bar Chart
        </h3>
        <div className="border border-black p-2">
          <ChartBlock figure={figures.armed} style={CHARTS[4].style} />
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">
            Chart type &amp; what it shows:
          </p>
          <p className="mt-2 text-sm leading-relaxed text-black/80">
            A horizontal bar chart ranked by MI rate was chosen to show which
            weapon types most co-occur with the mental illness label among the
            12 most common weapon categories. Replica weapons (36.3%), knives
            (32.9%), and blunt objects (29.4%) top the chart, while vehicles
            (4.6%) and vehicle/gun combinations (4%) are at the bottom.
            Notably, even unarmed subjects show an 18.6% MI rate, above the
            rate for those armed with guns (16.8%).
          </p>
        </div>

        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">
            What it means in context:
          </p>
          <p className="mt-2 text-sm leading-relaxed text-black/80">
            The prominence of replica weapons and knives in
            mental-illness-related shootings is a critical finding. Replica
            weapons are by definition non-lethal, yet they produce the highest
            MI association rate in the dataset - suggesting that individuals in
            mental health crisis may brandish fake guns in ways consistent with
            suicidal behavior. The relatively lower rate for actual guns (16.8%)
            compared to replicas and knives further supports this
            interpretation. For this project, these patterns collectively argue
            that mental-illness-related police shootings form a distinct
            category of incident: not crimes being stopped, but crises being
            mismanaged - with fatal consequences.
          </p>
        </div>
      </article>
    </div>
  );
}
