import Image from "next/image";
import landscapeImg from "../../public/images/prism_landscape.jpg";

const signals = [
  {
    title: "Memory",
    description: "Preserve continuity across ongoing community work.",
  },
  {
    title: "Knowledge",
    description: "Turn docs, meetings, and archives into usable context.",
  },
  {
    title: "Operator Workflows",
    description: "Make review, runtime actions, and coordination visible.",
  },
];

export function AppliedResearchSection() {
  return (
    <section
      id="use-cases"
      className="relative w-full border-t border-border scroll-mt-24 overflow-hidden"
    >
      <Image
        alt=""
        src={landscapeImg}
        fill
        className="object-cover object-center opacity-70"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,6,24,0.82)_0%,rgba(8,10,30,0.64)_35%,rgba(8,10,30,0.72)_100%)]" />
      <div className="relative z-10 max-w-6xl mx-auto py-24 px-6">
        <div className="max-w-4xl mb-12 bg-background/45 backdrop-blur-sm border border-border p-6 md:p-8">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">
            Why This Matters
          </p>
          <h2 className="text-4xl font-bold">Communities need more than chat history</h2>
          <p className="text-muted-foreground mt-4">
            Shared intelligence requires durable context. If meetings disappear,
            decisions fragment across threads, and AI only sees isolated prompts,
            the system never becomes useful at the community level.
          </p>
          <p className="text-foreground mt-6">
            Prism Stack is built around the idea that memory, knowledge, and
            operator control should be treated as infrastructure for
            communities, not as afterthoughts around a chatbot interface.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          {signals.map((signal) => (
            <div key={signal.title} className="bg-card/95 backdrop-blur-sm border border-border p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-primary mb-3">
                {signal.title}
              </p>
              <p className="text-sm text-muted-foreground">
                {signal.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
