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
    <div className="space-y-8">
      <ChartBlock figure={figures.map} style={CHARTS[0].style} />
      <ChartBlock figure={figures.states} style={CHARTS[1].style} />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <ChartBlock figure={figures.threat} style={CHARTS[2].style} />
        <ChartBlock figure={figures.flee} style={CHARTS[3].style} />
      </div>

      <ChartBlock figure={figures.armed} style={CHARTS[4].style} />
    </div>
  );
}
