import { PageHeader, PageShell } from "@/app/components/page-chrome";

type PlaceholderPageProps = {
  title: string;
  subtitle?: string;
};

export default function PlaceholderPage({
  title,
  subtitle = "Placeholder content for this section.",
}: PlaceholderPageProps) {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Section"
        title={title}
        titleClassName="mt-4 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl"
        description={subtitle}
        descriptionClassName="mt-5 max-w-2xl text-base leading-relaxed text-black/75"
      />
    </PageShell>
  );
}
