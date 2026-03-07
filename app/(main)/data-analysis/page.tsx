import ShootingsViz from "@/app/components/ShootingsViz";
import TableauEmbeds from "@/app/components/TableauEmbeds";

export default function DataAnalysisPage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] border-x border-black py-10 sm:py-14">
      <header className="px-6 sm:px-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">
          Narrative
        </p>
        <h1 className="mt-4 text-4xl font-medium leading-tight sm:text-6xl">
          Data Analysis
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/75">
          Research questions, visual evidence, and chart-specific interpretation
          for our police force analysis.
        </p>
      </header>

      <section id="question-1" className="mt-10 border-t border-black scroll-mt-20">
        <div className="px-6 pt-8 sm:px-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">
            Research Question 1
          </p>
          <h2 className="mt-3 text-2xl font-medium leading-tight sm:text-3xl">
            How have fatal police shootings changed after the
            pandemic? Have they increased? Decreased?
          </h2>

          <div className="mt-6">
            <TableauEmbeds ids={["fatal-over-time", "post-pandemic-increase"]} />
          </div>
        </div>
      </section>

      <section id="question-2" className="mt-12 border-t border-black scroll-mt-20">
        <div className="px-6 pt-8 sm:px-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">
            Research Question 2
          </p>
          <h2 className="mt-3 text-2xl font-medium leading-tight sm:text-3xl">
            How has the racial distribution of people killed in
            fatal police shootings in the United States changed from 2015 to
            the present?
          </h2>

          <div className="mt-6">
            <TableauEmbeds
              ids={[
                "racial-distribution-over-time",
                "racial-composition-by-year",
              ]}
            />
          </div>
        </div>
      </section>

      <section id="question-3" className="mt-12 border-t border-black scroll-mt-20">
        <div className="px-6 pt-8 sm:px-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">
            Research Question 3
          </p>
          <h2 className="mt-3 text-2xl font-medium leading-tight sm:text-3xl">
            How does the likelihood that a shooting is marked as
            mental-illness-related differ across agency types and states, and
            what incident context (
            <span className="font-mono">threat_type</span>,{" "}
            <span className="font-mono">armed_with</span>,{" "}
            <span className="font-mono">flee_status</span>) are most associated
            with the mental illness label?
          </h2>

          <div className="mt-8">
            <ShootingsViz />
          </div>
        </div>
      </section>
    </main>
  );
}
