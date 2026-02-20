import TeamMemberCard from "@/app/components/TeamMemberCard";

type TeamMember = {
  name: string;
  role: string;
  bio?: string;
  researchResponsibility?: string;
  email?: string;
  linkedin?: string;
  imageSrc?: string;
};

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Mattin Aframian",
    role: "Data specialist",
    email: "mattinaframian@gmail.com",
    linkedin: "https://www.linkedin.com/in/mattin-aframian",
    imageSrc: undefined,
    bio : "Hi, my name is Mattin Aframian. I'm a third year, doubling majoring in Statistics & Data Science and Cognitive Science.",
  },
  {
    name: "Benjamin Garcia",
    role: "Web Developer",
    email: "btgarcia@ucla.edu",
    bio : "Hello, my name is Benjamin Garcia and I am a third year Computer Science major.",
    researchResponsibility : "As the Web Developer, I led the development and deployment of the website, building it with React and Tailwind from the ground up.",
    linkedin: "https://www.linkedin.com/in/btgarcia05",
    imageSrc: "/static/team-members/Benjamin_Garcia.jpg",
  },
  {
    name: "Zoe Santos",
    role: "Content Developer",
    email: "zoesantos@g.ucla.edu",
    linkedin: "https://www.linkedin.com/in/zoe-santos-9708a0261/",
    imageSrc: undefined,
    bio: "Hello. My name is Zoe Santos. I'm a fourth year Statistics & Data Science Major with a Film, Television, and Digital Media minor",
    researchResponsibility : "As the Content Developer, I led the creation of our visual content to ensure the audience's visual understanding of our project."
  },
  {
    name: "Lily Sarkissian",
    role: "Editor",
    email: "lilysarkissian9@g.ucla.edu",
    linkedin: "https://www.linkedin.com/in/lily-sarkissian-1678a63b1/",
    imageSrc: "/static/team-members/Lily_Sarkissian.jpg",
    bio: "Hello! My name is Lily Sarkissian and I'm a third year Bioengineering major with a Technical Breadth in Digital Humanities.",
    researchResponsibility : "As the Editor, I concentrated on editing all of our written and visual content in order to maintain consistency across our data visualizations and helped ensure that a coherent narrative was present within our project."
  },
  {
    name: "Maelynn Vu",
    role: "Project Manager",
    email: "maevu@g.ucla.edu",
    linkedin: "https://www.linkedin.com/in/maelynn-vu-076012283/",
    imageSrc: undefined,
    bio: "Hi there! My name is Maelynn Vu. I'm a fourth year Psychology Major and Digital Humanities minor.",
    researchResponsibility: "As the Project Manager, I coordinated meetings, organized our workflow, and kept deadlines on track. I also contributed to research and writing while overseeing the project’s overall direction to ensure our analysis and final presentation stayed cohesive and aligned with our goals."
  },
  {
    name: "Elaine Xia",
    role: "Data Specialist",
    email: "xhy0331@.ucla.edu",
    linkedin: "https://www.linkedin.com/in/elaine-xia-91184735a/",
    imageSrc: "/static/team-members/Elaine_Xia.jpg",
    bio: "Hi, my name is Elaine Xia. I'm a second year double majored in Cognitive Science and Statistics & Data Science.",
    researchResponsibility : "As the Data Specialist, I cleaned and structured our datasets, conducted exploratory data analysis, and created visualizations using Tableau and R to help illustrating patterns in our data."
  },
];

export default function MeetTheTeamPage() {
  return (
    <main className="mx-auto w-full max-w-[1200px] border-x border-black px-6 py-10 sm:px-10 sm:py-14">
      <header className="border-b border-black pb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70">
          About
        </p>
        <h1 className="mt-4 text-4xl font-medium leading-tight sm:text-6xl">
          Meet the Team
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/75">
          The team behind Police Force by the Numbers.
        </p>
      </header>

      <section className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2">
        {TEAM_MEMBERS.map((member) => (
          <TeamMemberCard
            key={member.name}
            name={member.name}
            role={member.role}
            bio={member.bio}
            researchResponsibility={member.researchResponsibility}
            emailHref={member.email ? `mailto:${member.email}` : undefined}
            linkedinHref={member.linkedin}
            imageSrc={member.imageSrc}
          />
        ))}
      </section>
    </main>
  );
}
