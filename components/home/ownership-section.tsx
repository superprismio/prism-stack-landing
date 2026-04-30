const ownershipPoints = [
  {
    title: "Fully open source",
    description:
      "The stack is inspectable and modifiable. You can understand what it is doing and adapt it to your own workflows.",
  },
  {
    title: "Self-hostable",
    description:
      "Start with Railway, but keep the option to run the system on infrastructure you control as your requirements evolve.",
  },
  {
    title: "You own the stack",
    description:
      "Memory, knowledge, agent runtime, and workflow surfaces are part of your deployment, not just a hosted chatbot account.",
  },
];

export function OwnershipSection() {
  return (
    <section className="w-full border-t border-border">
      <div className="max-w-6xl mx-auto py-24 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.4fr] gap-16 items-start">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">
              Ownership
            </p>
            <h2 className="text-4xl font-bold mb-6">
              Open source infrastructure, not a closed assistant box
            </h2>
            <p className="text-muted-foreground">
              Prism Stack is meant to be deployed, operated, and adapted by the
              communities that use it. That matters when privacy, sovereignty,
              custom workflow logic, and long-term context continuity are part of
              the problem.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ownershipPoints.map((point) => (
              <div key={point.title} className="bg-card border border-border p-6">
                <h3 className="font-semibold mb-2">{point.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
