export default function TimelinePage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] border-x border-black py-10 sm:py-14">
      <header className="border-b border-black pb-8">
        <div className="px-6 sm:px-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">
            Core
          </p>
          <h1 className="mt-4 text-4xl font-medium leading-tight sm:text-6xl">
            Timeline
          </h1>
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-black/60">
            2016 to 2023
          </p>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-black/75">
            This timeline situates our project within major U.S. events,
            including mass shootings, presidential elections, the COVID-19
            pandemic, and key police accountability moments, to show how
            national context shaped public discourse on policing and violence.
          </p>
        </div>
      </header>

      <section className="mt-8 px-6 sm:px-10">
        <div className="border border-black">
          <iframe
            src="https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=v2%3A2PACX-1vRfK2PjloX2RwqcVcUgiO-r75I75-N-B6Fdq4RcrG5ZzMXydvZQetW1l9ikXuqVoDE4f-ZPR99VuNHx&font=Default&lang=en&initial_zoom=2&width=100%25&height=650"
            width="100%"
            height="650"
            allowFullScreen
            frameBorder={0}
            title="Police Force by the Numbers Timeline"
            className="w-full"
          />
        </div>
      </section>
    </main>
  );
}
