"use client";

import { useEffect, useState } from "react";
import { TABLEAU_VISUALIZATIONS } from "@/app/components/analysis-visualization-data";

const TABLEAU_EMBED_QUERY =
  "?:showVizHome=no&:embed=y&:tabs=no&:toolbar=no&:showShareOptions=false&:display_count=n&:language=en-US&publish=yes";

type TableauEmbedsProps = {
  ids?: string[];
  includeDescriptionPlaceholders?: boolean;
  showNarratives?: boolean;
};

export default function TableauEmbeds({
  ids,
  includeDescriptionPlaceholders = true,
  showNarratives = true,
}: TableauEmbedsProps) {
  const [embedDevice, setEmbedDevice] = useState<"desktop" | "phone">(
    "desktop",
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");

    const updateDevice = () => {
      setEmbedDevice(mediaQuery.matches ? "phone" : "desktop");
    };

    updateDevice();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateDevice);
      return () => mediaQuery.removeEventListener("change", updateDevice);
    }

    mediaQuery.addListener(updateDevice);
    return () => mediaQuery.removeListener(updateDevice);
  }, []);

  const views = ids
    ? TABLEAU_VISUALIZATIONS.filter((view) => ids.includes(view.id))
    : TABLEAU_VISUALIZATIONS;

  return (
    <div className={showNarratives ? "space-y-8" : "space-y-0"}>
      {views.map((view) => (
        <article key={view.id} className={showNarratives ? "space-y-4" : ""}>
          <div className="border border-black">
            <iframe
              src={`https://public.tableau.com/views/${view.path}${TABLEAU_EMBED_QUERY}&:device=${embedDevice}`}
              title={view.title}
              className="h-[360px] w-full min-[420px]:h-[420px] sm:h-[520px] lg:h-[620px]"
              width="100%"
              loading="lazy"
              allowFullScreen
            />
          </div>

          {showNarratives ? (
            <div className="space-y-4 border border-black px-4 py-4 sm:px-5">
              <h3 className="text-xl font-medium leading-tight">
                {view.visualizationHeading}
              </h3>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">
                  Chart type &amp; what it shows:
                </p>
                <p className="mt-2 text-sm leading-relaxed text-black/80">
                  {view.chartTypeAndWhatItShows}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">
                  What it means in context:
                </p>
                <p className="mt-2 text-sm leading-relaxed text-black/80">
                  {view.whatItMeansInContext}
                </p>
              </div>
            </div>
          ) : includeDescriptionPlaceholders ? null : null}
        </article>
      ))}
    </div>
  );
}
