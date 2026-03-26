"use client";

import { SiteButton } from "@/app/components/SiteButton";
import {
  PageInset,
  PageShell,
  pageDescriptionWideClassName,
  pageMetaLabelClassName,
} from "@/app/components/page-chrome";
import { parseExternalTarget } from "@/lib/external-navigation";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type LeavingPageClientProps = {
  target: string | null;
};

function FaviconPGlyph() {
  return (
    <svg
      viewBox="0 0 16 21"
      aria-hidden
      className="z-10 h-[11rem] w-auto fill-current text-black dark:text-white lg:h-[14.5rem]"
    >
      <path d="M0.99 9.36C0.9 9.81 0.94 10.27 1.09 10.69H1.65C1.64 10.67 1.64 10.64 1.64 10.61C1.65 10.37 1.72 10.13 1.88 9.95C1.97 9.85 2.08 9.78 2.19 9.72C2.31 9.67 2.44 9.64 2.57 9.63C2.83 9.6 3.35 9.61 3.35 9.61C3.48 9.61 3.62 9.61 3.76 9.61V14.1C2.34 14.83 1.13 15.97 0.36 17.37H0.91C1.68 16.54 2.68 15.93 3.76 15.62V19.68V20.37H7.13H8.63V19.68V19.68V16.28C8.96 16.49 9.28 16.72 9.56 16.98L15.86 13.59V2.35C15.46 1.8 15.01 1.28 14.53 0.79C14.02 0.29 13.47 -0.17 12.89 -0.57L8.63 2.53V0H7.94V3.03L7.13 3.62V3.19C7.13 2.82 7.12 2.44 7.05 2.08C6.98 1.71 6.84 1.36 6.62 1.05C6.4 0.75 6.12 0.49 5.79 0.31C5.46 0.13 5.1 0.02 4.73 -0.02C4.13 -0.09 3.52 0.02 2.97 0.27C2.42 0.52 1.95 0.93 1.62 1.43C1.32 1.89 1.15 2.42 1.13 2.97H1.71C1.74 2.77 1.81 2.58 1.92 2.4C2.08 2.14 2.32 1.93 2.61 1.85C2.75 1.81 2.91 1.81 3.06 1.84C3.2 1.88 3.34 1.96 3.44 2.07C3.59 2.21 3.68 2.41 3.72 2.62C3.76 2.82 3.76 3.03 3.76 3.24V7.21C3.34 7.19 2.91 7.27 2.52 7.44C2.13 7.61 1.78 7.88 1.52 8.21C1.25 8.54 1.06 8.94 0.99 9.36ZM8.63 7.78V3.28L10.55 1.92C10.92 2.2 11.29 2.49 11.64 2.8C12.05 3.16 12.44 3.55 12.8 3.96V5.68ZM8.63 8.55L12.8 6.45V8.2L8.63 10.3ZM8.63 11.07L12.8 8.97V14.44L12.27 14.75C11.2 13.97 9.94 13.46 8.63 13.27ZM7.94 3.75V13.19C7.67 13.17 7.4 13.17 7.13 13.18V4.33ZM7.94 15.92V19.68H7.13V15.63C7.4 15.71 7.68 15.81 7.94 15.92Z" />
    </svg>
  );
}

export default function LeavingPageClient({
  target: targetParam,
}: LeavingPageClientProps) {
  const router = useRouter();
  const target = parseExternalTarget(targetParam);
  const destination = target?.href ?? "";

  const handleBack = () => {
    if (typeof window === "undefined") {
      router.push("/");
      return;
    }
    const referrer = document.referrer;
    if (referrer) {
      try {
        if (new URL(referrer).origin === window.location.origin) {
          router.back();
          return;
        }
      } catch {}
    }
    router.push("/");
  };

  return (
    <PageShell className="grid min-h-screen grid-cols-1 lg:min-h-[100dvh] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {/* Left Side: Palantir-inspired Globe/Logo Replacement */}
      <section className="relative flex items-center justify-center overflow-hidden border-b border-black/5 dark:border-white/5 lg:border-r lg:border-b-0">
        <div className="relative flex h-80 w-80 items-center justify-center lg:h-[480px] lg:w-[480px]">
          {/* Outer Circle */}
          <div className="absolute inset-0 rounded-full border border-black/[0.08] dark:border-white/[0.15]" />

          {/* Defined Wireframe Lines (Meridians & Parallels) */}
          <div className="absolute inset-0 scale-x-[0.3] rounded-full border border-black/[0.05] dark:border-white/[0.1]" />
          <div className="absolute inset-0 scale-x-[0.6] rounded-full border border-black/[0.05] dark:border-white/[0.1]" />
          <div className="absolute inset-0 scale-y-[0.3] rounded-full border border-black/[0.05] dark:border-white/[0.1]" />
          <div className="absolute inset-0 scale-y-[0.6] rounded-full border border-black/[0.05] dark:border-white/[0.1]" />

          {/* Angled "Defining" Lines */}
          <div className="absolute inset-0 rotate-[30deg] scale-x-[0.5] rounded-full border border-black/[0.03] dark:border-white/[0.05]" />
          <div className="absolute inset-0 -rotate-[30deg] scale-x-[0.5] rounded-full border border-black/[0.03] dark:border-white/[0.05]" />

          <FaviconPGlyph />
        </div>
      </section>

      {/* Right Side: Content */}
      <section className="flex items-center">
        <PageInset className="w-full py-12 sm:py-16 lg:py-20">
          <h1 className="max-w-[30rem] font-sans text-2xl font-normal leading-tight tracking-tight sm:text-3xl lg:text-4xl">
            You are leaving Police Force by the Numbers.
          </h1>

          <div
            className={cn(
              pageDescriptionWideClassName,
              "mt-6 max-w-[28rem] space-y-4 text-sm leading-relaxed opacity-70 sm:text-base",
            )}
          >
            <p>
              You are now leaving Police Force by the Numbers. Police Force by
              the Numbers does not endorse, has not verified, and is not
              responsible for, any content, views, products, services, or
              policies of any third-party websites, or for any verification or
              updates of such websites. Third-party websites may also include
              &quot;forward-looking statements&quot; which are inherently subject to risks
              and uncertainties, some of which cannot be predicted or
              quantified. Actual results could differ materially from those
              indicated in such forward-looking statements.
            </p>
            <p>
              Click ‘Continue’ to acknowledge the above and leave Police Force by the Numbers'
              website. If you don’t want to leave Police Force by the Numbers' website, simply
              click ‘Back’.
            </p>
          </div>

          <div className="mt-10 border-t border-black/10 pt-6 dark:border-white/10">
            <p className={pageMetaLabelClassName}>Destination</p>
            <p className="mt-2 break-all font-mono text-xs tracking-tight opacity-50 sm:text-sm">
              {destination || "Destination unverified"}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {target ? (
              <SiteButton
                asChild
                variant="action"
                className="min-w-[160px] cursor-pointer"
              >
                <a href={target.href} rel="noreferrer">
                  Continue
                </a>
              </SiteButton>
            ) : null}

            <SiteButton
              variant="action"
              onClick={handleBack}
              className="min-w-[160px] cursor-pointer"
            >
              Back
            </SiteButton>
          </div>
        </PageInset>
      </section>
    </PageShell>
  );
}
