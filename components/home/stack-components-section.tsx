const components = [
  {
    title: "discord-adapter",
    label: "Community Interface",
    description:
      "Connects the stack to Discord. It handles live bot interaction, chat and meeting ingestion, and voice-based artifact capture so community activity can feed the rest of the system.",
    bullets: [
      "PrismBOT in Discord",
      "chat and thread ingestion",
      "voice meeting capture and artifacts",
    ],
  },
  {
    title: "codex-runtime",
    label: "Agent Runtime",
    description:
      "Runs Codex-backed agent workflows behind a service boundary. It gives the stack a reusable execution layer for operator chat, change-request workflows, and other future transports.",
    bullets: [
      "shared runtime endpoint",
      "persistent auth and workspace state",
      "agent execution for admin and bot flows",
    ],
  },
  {
    title: "prism-memory",
    label: "Memory + Knowledge",
    description:
      "Owns normalized ingest, rolling memory, knowledge retrieval, and ops pipelines. This is the context layer that turns community activity into reusable artifacts and searchable knowledge.",
    bullets: [
      "memory inbox and rolling context",
      "knowledge sync and retrieval",
      "ops runs for memory and knowledge",
    ],
  },
  {
    title: "site",
    label: "Operator Surface",
    description:
      "Provides the web app, admin workspace, and app API. This is where operators review requests, manage settings, inspect workflows, and interact with the stack as a system.",
    bullets: [
      "admin workspace",
      "change request workflow",
      "settings, memory access, and app state",
    ],
  },
];

export function StackComponentsSection() {
  return (
    <section className="w-full border-t border-border">
      <div className="max-w-6xl mx-auto py-24 px-6">
        <div className="mb-12">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">
            Stack Components
          </p>
          <h2 className="text-4xl font-bold">Each service has a clear role</h2>
          <p className="text-muted-foreground mt-4 max-w-3xl">
            Prism Stack is designed as a set of focused services rather than one
            opaque AI app. That makes it easier to operate, adapt, and extend.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {components.map((component) => (
            <div key={component.title} className="bg-card border border-border p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-primary mb-3">
                {component.label}
              </p>
              <h3 className="text-2xl font-semibold mb-3">{component.title}</h3>
              <p className="text-sm text-muted-foreground mb-5">
                {component.description}
              </p>
              <ul className="space-y-2">
                {component.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="text-sm text-foreground flex items-start gap-2"
                  >
                    <span className="text-primary mt-0.5">•</span>
                    {bullet}
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
