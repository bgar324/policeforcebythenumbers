import LeavingPageClient from "@/app/leaving/LeavingPageClient";

type LeavingPageProps = {
  searchParams: Promise<{
    target?: string | string[] | undefined;
  }>;
};

export default async function LeavingPage({
  searchParams,
}: LeavingPageProps) {
  const resolvedSearchParams = await searchParams;
  const targetValue = resolvedSearchParams.target;

  return (
    <LeavingPageClient
      target={Array.isArray(targetValue) ? targetValue[0] : targetValue ?? null}
    />
  );
}
