"use client";

import {
  SHOOTINGS_VISUALIZATIONS,
  type RichTextContent,
} from "@/app/components/analysis-visualization-data";
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

type ShootingsVizProps = {
  ids?: string[];
  showNarratives?: boolean;
};

function RichTextNarrative({ content }: { content: RichTextContent }) {
  return (
    <>
      {content.map((paragraph, paragraphIndex) => (
        <p
          key={paragraphIndex}
          className={paragraphIndex > 0 ? "mt-4 text-sm leading-relaxed text-black/80" : "mt-2 text-sm leading-relaxed text-black/80"}
        >
          {paragraph.map((segment, segmentIndex) =>
            segment.type === "citation" ? (
              <a
                key={`${paragraphIndex}-${segmentIndex}`}
                href={`/bibliography#${segment.bibliographyId}`}
                className="font-semibold underline decoration-black/35 underline-offset-2 transition-colors hover:text-black hover:decoration-black"
              >
                {segment.label}
              </a>
            ) : (
              <span key={`${paragraphIndex}-${segmentIndex}`}>
                {segment.text}
              </span>
            ),
          )}
        </p>
      ))}
    </>
  );
}

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

    const safeResize = () => {
      if (!root || !plotlyRef.current) {
        return;
      }

      if (root.offsetWidth < 1 || root.offsetHeight < 1) {
        return;
      }

      try {
        plotlyRef.current.Plots.resize(root);
      } catch {
        // Plotly throws when a resize is requested before the plot is visible.
      }
    };

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
          safeResize();
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

export default function ShootingsViz({
  ids,
  showNarratives = true,
}: ShootingsVizProps) {
  const [figures, setFigures] = useState<Record<string, PlotFigure>>({});
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const selectedCharts = ids
    ? SHOOTINGS_VISUALIZATIONS.filter((chart) => ids.includes(chart.id))
    : SHOOTINGS_VISUALIZATIONS;
  const selectedIdsKey = ids?.join(",") ?? "all";

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");

    const updateIsMobile = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateIsMobile();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateIsMobile);
      return () => mediaQuery.removeEventListener("change", updateIsMobile);
    }

    mediaQuery.addListener(updateIsMobile);
    return () => mediaQuery.removeListener(updateIsMobile);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadCharts = async () => {
      try {
        const chartsToLoad = ids
          ? SHOOTINGS_VISUALIZATIONS.filter((chart) => ids.includes(chart.id))
          : SHOOTINGS_VISUALIZATIONS;

        const entries = await Promise.all(
          chartsToLoad.map(async (chart) => {
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
  }, [ids, selectedIdsKey]);

  if (loadError) {
    return (
      <p className="border border-black px-4 py-3 text-sm text-black/70">
        {loadError}
      </p>
    );
  }

  const isLoading = selectedCharts.some((chart) => !figures[chart.id]);
  if (isLoading) {
    return <p className="text-sm text-black/70">Loading charts...</p>;
  }

  const chartStyles: Record<string, CSSProperties> = isMobile
    ? {
        map: { width: "100%", minHeight: 380 },
        states: { width: "100%", minHeight: 400 },
        threat: { width: "100%", minHeight: 360 },
        flee: { width: "100%", minHeight: 360 },
        armed: { width: "100%", minHeight: 400 },
      }
    : Object.fromEntries(
        SHOOTINGS_VISUALIZATIONS.map((chart) => [chart.id, chart.style]),
      );

  return (
    <div className={showNarratives ? "space-y-12" : "space-y-0"}>
      {selectedCharts.map((chart, chartIndex) => (
        <article
          key={chart.id}
          className={
            showNarratives && chartIndex > 0
              ? "space-y-4 border-t border-black pt-8"
              : "space-y-4"
          }
        >
          <div className="border border-black">
            <ChartBlock figure={figures[chart.id]} style={chartStyles[chart.id]} />
          </div>

          {showNarratives ? (
            <div className="space-y-4 border border-black px-4 py-4 sm:px-5">
              <h3 className="text-xl font-medium leading-tight">
                {chart.visualizationHeading}
              </h3>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">
                  Chart type &amp; what it shows:
                </p>
                <RichTextNarrative content={chart.chartTypeAndWhatItShows} />
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">
                  What it means in context:
                </p>
                <RichTextNarrative content={chart.whatItMeansInContext} />
              </div>
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}
