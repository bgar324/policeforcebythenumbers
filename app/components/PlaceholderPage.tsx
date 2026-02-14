type PlaceholderPageProps = {
  title: string;
  subtitle?: string;
};

export default function PlaceholderPage({
  title,
  subtitle = "Placeholder content for this section.",
}: PlaceholderPageProps) {
  return (
    <main className="mx-auto w-full max-w-[1100px] border-x border-black px-6 py-10 font-[family:var(--font-nav)] sm:px-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">Section</p>
      <h1 className="mt-4 font-[family:var(--font-masthead)] text-4xl font-semibold leading-tight sm:text-5xl">
        {title}
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-black/75">{subtitle}</p>
    </main>
  );
}
