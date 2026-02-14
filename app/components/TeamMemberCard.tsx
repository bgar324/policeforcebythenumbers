import Image from "next/image";

type TeamMemberCardProps = {
  name: string;
  role: string;
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
  imageSrc,
  emailHref = "",
  linkedinHref = "",
}: TeamMemberCardProps) {
  const initials = getInitials(name);

  return (
    <article className="group relative mx-auto w-full max-w-[320px]">
      <div className="pointer-events-none absolute inset-0 border border-black bg-black transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:translate-y-2" />

      <div className="relative border border-black bg-white transition-transform duration-300 ease-out group-hover:-translate-x-2 group-hover:-translate-y-2">
        <div className="relative aspect-[4/5] border-b border-black bg-zinc-100">
          {imageSrc ? (
            <Image src={imageSrc} alt={`${name} profile`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 320px" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#f2f2f2_0%,#e6e6e6_100%)]">
              <div className="border border-black px-5 py-3  text-4xl font-medium tracking-[0.08em] text-black">
                {initials}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-5 px-6 py-6 text-center">
          <h3 className=" text-[1.85rem] font-medium leading-tight tracking-tight">
            {name}
          </h3>
          <p className="text-xl leading-none text-black/65">{role}</p>

          <div className="flex items-center justify-center gap-6">
            <a
              href={emailHref}
              aria-label={`Email ${name}`}
              className="inline-flex h-10 w-10 items-center justify-center border border-black !text-black transition-colors duration-150 hover:bg-black hover:!text-white focus-visible:bg-black focus-visible:!text-white"
            >
              <EmailIcon />
            </a>
            <a
              href={linkedinHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} LinkedIn`}
              className="inline-flex h-10 w-10 items-center justify-center border border-black !text-black transition-colors duration-150 hover:bg-black hover:!text-white focus-visible:bg-black focus-visible:!text-white"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
