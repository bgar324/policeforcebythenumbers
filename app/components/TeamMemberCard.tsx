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
    <svg viewBox="0 0 16 16" aria-hidden className="h-5 w-5 fill-current">
      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zM4.943 13.394V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.016-.71-.52-1.248-1.343-1.248S2.4 3.226 2.4 3.934c0 .694.522 1.248 1.327 1.248zM13.458 13.394V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193V6.17H6.127c.03.678 0 7.225 0 7.225h2.401V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865z" />
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
