import Image from "next/image";
import projectsImg from "../../public/images/sp_graphic-projects.png";
import spacesImg from "../../public/images/sp_graphic-spaces.png";
import extendImg from "../../public/images/sp_graphic-extend.png";

const capabilities = [
  {
    title: "Discord Ingestion",
    description:
      "Bring live community activity into a usable context layer instead of leaving it trapped in channels and threads.",
    active: true,
  },
  {
    title: "PrismBOT in Discord",
    description:
      "Give communities a live bot and agent interface inside Discord for summaries, retrieval, meeting flows, and operator-style interactions.",
    active: true,
  },
  {
    title: "Meeting Capture",
    description:
      "Turn voice meetings into transcripts, summaries, and durable artifacts that can be referenced later.",
    active: true,
  },
  {
    title: "Shared Memory",
    description:
      "Maintain rolling community memory instead of relying on scattered chat history and operator recollection.",
    active: true,
  },
  {
    title: "Knowledge Sync",
    description:
      "Sync docs and repos into a searchable knowledge surface that agents and contributors can use.",
    active: true,
  },
  {
    title: "Operator and Admin Workflows",
    description:
      "Run config, memory operations, runtime actions, and change-request workflows inside the same system instead of across disconnected tools.",
    active: true,
  },
];

export function ResearchAreasSection() {
  return (
    <section
      id="capabilities"
      className="w-full border-t border-border scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto py-24 px-6">
        <div className="mb-12">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">
            Core Capabilities
          </p>
          <h2 className="text-4xl font-bold">What the stack does</h2>
          <p className="text-muted-foreground mt-4">
            Prism Stack is designed to make community context usable, durable,
            and actionable.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((capability) => (
            <div key={capability.title} className="bg-card border border-border p-6">
              {capability.active && (
                <p className="font-mono text-xs text-primary mb-3">
                  ● Live Surface
                </p>
              )}
              <h3 className="font-semibold mb-2">{capability.title}</h3>
              <p className="text-sm text-muted-foreground">
                {capability.description}
              </p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          <Image src={spacesImg} alt="Shared context graphic" className="w-full h-auto" />
          <Image src={projectsImg} alt="Project workflow graphic" className="w-full h-auto" />
          <Image src={extendImg} alt="Extensible system graphic" className="w-full h-auto" />
        </div>
      </div>
    </section>
  );
}
