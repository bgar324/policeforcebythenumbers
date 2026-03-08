import ShootingsViz from "@/app/components/ShootingsViz";
import TableauEmbeds from "@/app/components/TableauEmbeds";
import {
  PageHeader,
  PageInset,
  PageShell,
  pageEyebrowClassName,
} from "@/app/components/page-chrome";

export default function DataAnalysisPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Narrative"
        title="Data Analysis"
        description="Research questions, visual evidence, and chart-specific interpretation for our police force analysis."
      />

      <section id="question-1" className="border-b border-black scroll-mt-20">
        <PageInset className="py-10 sm:py-12">
          <p className={pageEyebrowClassName}>
            Research Question 1
          </p>
          <h2 className="mt-3 text-2xl font-medium leading-tight sm:text-3xl">
            How have fatal police shootings changed after the
            pandemic? Have they increased? Decreased?
          </h2>

          <div className="mt-6">
            <TableauEmbeds ids={["fatal-over-time", "post-pandemic-increase"]} />
          </div>
        </PageInset>
      </section>

      <section id="question-2" className="border-b border-black scroll-mt-20">
        <PageInset className="py-10 sm:py-12">
          <p className={pageEyebrowClassName}>
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
        </PageInset>
      </section>

      <section id="question-3" className="scroll-mt-20">
        <PageInset className="py-10 sm:py-12">
          <p className={pageEyebrowClassName}>
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
        </PageInset>
      </section>
    </PageShell>
  );
}
