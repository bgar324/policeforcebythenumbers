import {
  PageHeader,
  PageShell,
  pageMetaLabelClassName,
} from "@/app/components/page-chrome";

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
    <PageShell>
      <PageHeader
        eyebrow="About"
        title="Acknowledgements"
        description="We are grateful to the people who supported this project and guided our research process."
      />

      <section>
        {ACKNOWLEDGEMENTS.map((entry, index) => (
          <article
            key={entry.name}
            className={`grid gap-0 lg:grid-cols-[180px_1fr] ${
              index < ACKNOWLEDGEMENTS.length - 1 ? "border-b border-black" : ""
            }`}
          >
            <aside className="border-b border-black px-6 py-6 sm:px-10 lg:border-r lg:border-b-0 lg:px-6 lg:py-8">
              <p className={pageMetaLabelClassName}>Acknowledgement</p>
              <p className="mt-3 text-3xl font-semibold leading-none">
                {String(index + 1).padStart(2, "0")}
              </p>
            </aside>

            <div className="px-6 py-8 sm:px-10 sm:py-8">
              <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">
                {entry.name}
              </h2>
              <p className="mt-4 max-w-4xl text-base leading-relaxed text-black/80">
                {entry.message}
              </p>
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
