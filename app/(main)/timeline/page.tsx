import {
  PageHeader,
  PageSection,
  PageShell,
} from "@/app/components/page-chrome";

export default function TimelinePage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Core"
        title="Timeline"
        description="This timeline situates our project within major U.S. events, including mass shootings, presidential elections, the COVID-19 pandemic, and key police accountability moments, to show how national context shaped public discourse on policing and violence."
      >
        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-black/60">
          2016 to 2023
        </p>
      </PageHeader>

      <PageSection withBorder={false} innerClassName="pt-8 sm:pt-10">
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
      </PageSection>
    </PageShell>
  );
}
