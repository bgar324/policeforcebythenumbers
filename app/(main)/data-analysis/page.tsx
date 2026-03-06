import ShootingsViz from "@/app/components/ShootingsViz";

export default function DataAnalysisPage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] border-x border-black px-6 py-10 sm:px-10 sm:py-14">
      <header className="border-b border-black pb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">
          Narrative
        </p>
        <h1 className="mt-4 text-4xl font-medium leading-tight sm:text-6xl">
          Data Analysis
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/75">
          Visual analysis of police shootings across states, threat type, flee
          status, and whether subjects were armed.
        </p>
      </header>

      <section className="mt-8">
        <ShootingsViz />
      </section>
    </main>
  );
}
