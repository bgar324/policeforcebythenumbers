import TeamMemberCard from "@/app/components/TeamMemberCard";
import { PageHeader, PageShell } from "@/app/components/page-chrome";

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
    imageSrc: "/static/team-members/Mattin_Aframian.jpg",
    bio : "Hi, my name is Mattin Aframian. I'm a third year, doubling majoring in Statistics & Data Science and Cognitive Science.",
    researchResponsibility : "As the Data Specialist, I created and cloned a Github repository for the group. I additionally used R to clean and filter through the data to prep for the creation of visualizations. "
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
    imageSrc: "/static/team-members/Zoe_Santos.jpg",
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
    imageSrc: "/static/team-members/Maelynn_Vu.jpg",
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
    <PageShell>
      <PageHeader
        eyebrow="About"
        title="Meet the Team"
        description="The team behind Police Force by the Numbers."
      />

      <section className="px-6 py-8 sm:px-10 sm:py-10">
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
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
        </div>
      </section>
    </PageShell>
  );
}
