type Acknowledgement = {
  name: string;
  message: string;
};

const ACKNOWLEDGEMENTS: Acknowledgement[] = [
  {
    name: "Dr. Nicholas Sabo",
    message:
      "Thank you for an engaging and insightful quarter introducing us to digital humanities! Through your lectures and guidance, we were able to explore new tools, methods, and ways of thinking about data, power, and narrative. Your teaching helped us better understand how digital tools can be used to analyze and present complex social issues.",
  },
  {
    name: "Pietro Santachiara",
    message:
      "Thank you for your guidance and support throughout discussion sections and during the research process! Your feedback, patience, and willingness to answer our questions helped us navigate unfamiliar tools and strengthen our project. Your insights greatly improved both our analysis and our final presentation.",
  },
];

export default function AcknowledgementsPage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] border-x border-black px-6 py-10 sm:px-10 sm:py-14">
      <header className="border-b border-black pb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">
          About
        </p>
        <h1 className="mt-4 text-4xl font-medium leading-tight sm:text-6xl">
          Acknowledgements
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/75">
          We are grateful to the people who supported this project and guided our
          research process.
        </p>
      </header>

      <section className="mt-8 border border-black">
        {ACKNOWLEDGEMENTS.map((entry, index) => (
          <article
            key={entry.name}
            className={`px-5 py-6 sm:px-7 sm:py-7 ${
              index > 0 ? "border-t border-black" : ""
            }`}
          >
            <h2 className="text-xl font-semibold leading-tight sm:text-2xl">
              {entry.name}
            </h2>
            <p className="mt-3 max-w-4xl text-sm leading-relaxed text-black/80 sm:text-base">
              {entry.message}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
