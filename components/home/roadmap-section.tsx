const roadmapLanes = [
  {
    title: "More Inputs",
    description:
      "Expand beyond Discord with additional source adapters and ingestion surfaces so more community context can flow into the stack.",
    items: ["Slack and Telegram adapters", "broader document and archive inputs", "more community-native ingestion paths"],
  },
  {
    title: "More Runtime Options",
    description:
      "Keep the runtime layer modular so communities can choose how agent execution and model-backed behavior are provided.",
    items: ["pluggable harness support", "external runtime/provider options", "clearer backend boundaries"],
  },
  {
    title: "More Control",
    description:
      "Make configuration, review, and operations easier to manage without losing the system-level visibility that communities need.",
    items: ["richer operator workflows", "policy and config through chat", "stronger self-hosted deployment paths"],
  },
];

export function RoadmapSection() {
  return (
    <section className="w-full border-t border-border">
      <div className="max-w-6xl mx-auto py-24 px-6">
        <div className="mb-12 max-w-4xl">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">
            Roadmap
          </p>
          <h2 className="text-4xl font-bold mb-4">
            Discord-first is the starting point, not the boundary
          </h2>
          <p className="text-muted-foreground">
            The current stack is meant to be useful now, but also modular enough
            to expand into more sources, more runtime choices, and more operator
            control over time.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roadmapLanes.map((lane) => (
            <div key={lane.title} className="bg-card border border-border p-6">
              <h3 className="text-2xl font-semibold mb-3">{lane.title}</h3>
              <p className="text-sm text-muted-foreground mb-5">
                {lane.description}
              </p>
              <ul className="space-y-2">
                {lane.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-foreground flex items-start gap-2"
                  >
                    <span className="text-primary mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
