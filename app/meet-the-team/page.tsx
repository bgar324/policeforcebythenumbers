import TeamMemberCard from "@/app/components/TeamMemberCard";

const TEAM_MEMBERS = [
  { name: "Mattin Aframian", role: "TBD" },
  { name: "Benjamin Garcia", role: "TBD" },
  { name: "Zoe Santos", role: "TBD" },
  { name: "Lily Sarkissian", role: "TBD" },
  { name: "Maelynn Vu", role: "TBD" },
  { name: "Elaine Xia", role: "TBD" },
];

function getContactSeeds(name: string) {
  const compact = name.toLowerCase().replace(",", "").replace(/\s+/g, ".");
  return {
    emailHref: `mailto:${compact}@example.com`,
    linkedinHref: `https://www.linkedin.com/in/${compact}`,
  };
}

export default function MeetTheTeamPage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] border-x border-black px-6 py-10 sm:px-10 sm:py-14">
      <header className="border-b border-black pb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">About</p>
        <h1 className="mt-4 font-[family:var(--font-masthead)] text-4xl font-medium leading-tight sm:text-6xl">
          Meet the Team
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/75">
          Researchers and collaborators building Police Force by the Numbers.
        </p>
      </header>

      <section className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {TEAM_MEMBERS.map((member) => {
          const contacts = getContactSeeds(member.name);
          return (
            <TeamMemberCard
              key={member.name}
              name={member.name}
              role={member.role}
              emailHref={contacts.emailHref}
              linkedinHref={contacts.linkedinHref}
            />
          );
        })}
      </section>
    </main>
  );
}
