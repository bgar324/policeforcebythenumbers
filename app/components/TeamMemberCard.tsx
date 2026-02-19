import Image from "next/image";

type TeamMemberCardProps = {
  name: string;
  role: string;
  bio?: string;
  researchResponsibility?: string;
  imageSrc?: string;
  emailHref?: string;
  linkedinHref?: string;
};

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 fill-current">
      <path d="M2 5h20v14H2V5zm2 2v.5L12 13l8-5.5V7H4zm16 10V9.8l-8 5.5-8-5.5V17h16z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 fill-current">
      <path d="M6.6 8.8H3.4V20h3.2V8.8zm.2-3.5A1.9 1.9 0 1 0 3 5.3a1.9 1.9 0 0 0 3.8 0zM20.6 13.6c0-3.4-1.8-5-4.2-5-1.9 0-2.8 1.1-3.3 1.8V8.8H9.9V20h3.2v-5.5c0-1.4.3-2.8 2-2.8s1.7 1.6 1.7 2.9V20h3.2v-6.4z" />
    </svg>
  );
}

function getInitials(name: string) {
  const cleaned = name.replace(",", " ").trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length < 2) {
    return parts[0]?.slice(0, 2).toUpperCase() ?? "PF";
  }
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export default function TeamMemberCard({
  name,
  role,
  bio,
  researchResponsibility,
  imageSrc,
  emailHref,
  linkedinHref,
}: TeamMemberCardProps) {
  const initials = getInitials(name);
  const bioText = bio?.trim();
  const researchText = researchResponsibility?.trim();
  const hasBio = Boolean(bioText);
  const hasResearchResponsibility = Boolean(researchText);
  const hasNarrative = hasBio || hasResearchResponsibility;

  return (
    <article className="group relative h-full">
      <div className="pointer-events-none absolute inset-0 border border-black bg-black opacity-0 transition-all duration-300 ease-out group-hover:translate-x-2 group-hover:translate-y-2 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col overflow-hidden border border-black bg-[linear-gradient(180deg,#ffffff_0%,#fafafa_100%)] transition-transform duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1 sm:flex-row">
        <div className="relative aspect-square w-full border-b border-black bg-zinc-100 sm:w-[190px] sm:flex-none sm:border-r sm:border-b-0">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={`${name} profile`}
              fill
              className="object-cover grayscale-[25%] saturate-[90%] transition-[filter] duration-300 ease-out group-hover:grayscale-0 group-hover:saturate-100"
              sizes="(max-width: 640px) 100vw, 190px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,#f3f3f3_0%,#e4e4e4_100%)]">
              <div className="border border-black bg-white/70 px-5 py-3 text-4xl font-medium tracking-[0.08em] text-black">
                {initials}
              </div>
            </div>
          )}
        </div>

        <div className="flex h-full flex-col p-5 sm:p-6">
          <header className="border-b border-black/20 pb-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/55">
              {role}
            </p>
            <h3 className="mt-2 break-words font-[family:var(--font-masthead)] text-[1.7rem] leading-tight tracking-tight sm:text-[1.95rem]">
              {name}
            </h3>

            <div className="mt-3 flex min-h-9 items-center gap-2">
              {emailHref ? (
                <a
                  href={emailHref}
                  aria-label={`Email ${name}`}
                  className="inline-flex h-9 w-9 items-center justify-center border border-black !text-black transition-colors duration-150 hover:bg-black hover:!text-white focus-visible:bg-black focus-visible:!text-white"
                >
                  <EmailIcon />
                </a>
              ) : null}

              {linkedinHref ? (
                <a
                  href={linkedinHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} LinkedIn`}
                  className="inline-flex h-9 w-9 items-center justify-center border border-black !text-black transition-colors duration-150 hover:bg-black hover:!text-white focus-visible:bg-black focus-visible:!text-white"
                >
                  <LinkedInIcon />
                </a>
              ) : null}
            </div>
          </header>

          <div className="mt-4 space-y-4">
            {hasNarrative ? (
              <>
                {hasBio ? (
                  <section className="space-y-2">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/55">Bio</p>
                    <p className="text-sm leading-relaxed text-black/80">{bioText}</p>
                  </section>
                ) : null}

                {hasResearchResponsibility ? (
                  <section className="space-y-2">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/55">
                      Responsibility
                    </p>
                    <p className="text-sm leading-relaxed text-black/80">{researchText}</p>
                  </section>
                ) : null}
              </>
            ) : (
              <div className="h-px bg-black/10" />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
