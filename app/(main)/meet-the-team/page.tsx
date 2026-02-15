import TeamMemberCard from "@/app/components/TeamMemberCard";

type TeamMember = {
  name: string;
  role: string;
  email?: string; 
  linkedin?: string; 
  imageSrc?: string; 
};

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Mattin Aframian",
    role: "TBD",
    email: undefined,
    linkedin: undefined,
    imageSrc: undefined,
  },
  {
    name: "Benjamin Garcia",
    role: "Web Developer",
    email: "btgarcia@ucla.edu",
    linkedin: "https://www.linkedin.com/in/btgarcia05",
    imageSrc: undefined,
  },
  {
    name: "Zoe Santos",
    role: "Project Manager",
    email: "zoesantos@g.ucla.edu",
    linkedin: "https://www.linkedin.com/in/zoe-santos-9708a0261/",
    imageSrc: undefined,
  },
  {
    name: "Lily Sarkissian",
    role: "TBD",
    email: undefined,
    linkedin: undefined,
    imageSrc: undefined,
  },
  {
    name: "Maelynn Vu",
    role: "Project Manager",
    email: "maevu@g.ucla.edu",
    linkedin: "https://www.linkedin.com/in/maelynn-vu-076012283/",
    imageSrc: undefined,
  },
  {
    name: "Elaine Xia",
    role: "TBD",
    email: undefined,
    linkedin: undefined,
    imageSrc: undefined,
  },
];

export default function MeetTheTeamPage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] border-x border-black px-6 py-10 sm:px-10 sm:py-14">
      <header className="border-b border-black pb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">
          About
        </p>
        <h1 className="mt-4 font-[family:var(--font-masthead)] text-4xl font-medium leading-tight sm:text-6xl">
          Meet the Team
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/75">
          Researchers and collaborators building Police Force by the Numbers.
        </p>
      </header>

      <section className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {TEAM_MEMBERS.map((member) => (
          <TeamMemberCard
            key={member.name}
            name={member.name}
            role={member.role}
            emailHref={member.email ? `mailto:${member.email}` : undefined}
            linkedinHref={member.linkedin}
            imageSrc={member.imageSrc}
          />
        ))}
      </section>
    </main>
  );
}
