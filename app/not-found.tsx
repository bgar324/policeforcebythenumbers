import TransitionLink from "@/app/components/transition/TransitionLink";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-[420px] border border-black p-10 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/50">
          404
        </p>
        <h1 className="mt-3 font-[family:var(--font-masthead)] text-4xl font-semibold leading-none">
          Page not found
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-black/60">
          This page doesn&#39;t exist or has been moved.
        </p>
        <TransitionLink
          href="/"
          className="mt-6 inline-block border border-black bg-black px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-150 hover:bg-white hover:text-black"
        >
          Go home
        </TransitionLink>
      </div>
    </div>
  );
}
