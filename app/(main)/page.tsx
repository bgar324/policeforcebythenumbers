export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] border-x border-black font-[family:var(--font-nav)]">
      <section className="border-b border-black px-6 py-12 sm:px-10 sm:py-16">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">Home</p>
        <h1 className="mt-5 max-w-3xl font-[family:var(--font-masthead)] text-4xl font-semibold leading-[1.05] sm:text-6xl">
          Examining policing through data, narrative context, and public records.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-black/75">
          Police Force by the Numbers is a research/news-style publication focused on transparent metrics,
          historical trends, and institutional accountability.
        </p>
      </section>

      <section className="grid gap-0 sm:grid-cols-2">
        <article className="border-b border-black px-6 py-8 sm:border-r sm:px-10">
          <h2 className="font-[family:var(--font-masthead)] text-3xl font-semibold">Latest Narrative</h2>
          <p className="mt-4 text-sm leading-relaxed text-black/75">
            Start with the Introduction to understand the timeline and social context behind this project.
          </p>
        </article>

        <article className="border-b border-black px-6 py-8 sm:px-10">
          <h2 className="font-[family:var(--font-masthead)] text-3xl font-semibold">Dataset Notes</h2>
          <p className="mt-4 text-sm leading-relaxed text-black/75">
            Review source data, collection methods, and critique sections before drawing conclusions.
          </p>
        </article>
      </section>

      <section className="px-6 py-10 sm:px-10 sm:py-14">
        <h2 className="font-[family:var(--font-masthead)] text-2xl font-semibold sm:text-3xl">Research Feed</h2>
        <div className="mt-6 space-y-5 border-l border-black pl-5">
          {[
            "Department-level staffing and overtime trend lines.",
            "Policy shifts tied to major legal and political events.",
            "Force incidents compared against demographic baselines.",
            "Methodology updates and source verification notes.",
          ].map((entry) => (
            <p key={entry} className="text-sm leading-relaxed text-black/80">
              {entry}
            </p>
          ))}
        </div>
      </section>
    </main>
  );
}
