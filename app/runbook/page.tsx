import Link from "next/link";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";

const setupSteps = [
  {
    number: "1",
    title: "Deploy the template",
    how: [
      "Deploy https://railway.com/deploy/prism-agent-stack into the target Railway workspace.",
      "Provide required variables during deploy or defer optional service values until after first boot.",
      "Discord requires application, bot, guild, and channel values. Codex runtime requires a GitHub token.",
    ],
    expect:
      "Railway creates the site, Prism Memory, Codex runtime, Discord adapter, and scheduled services.",
    confirm:
      "Project canvas includes site, prism-memory, codex-runtime, discord-adapter, and scheduled services.",
  },
  {
    number: "2",
    title: "Confirm site initialization",
    how: [
      "Use the site service public URL and ADMIN_PASSWORD from Railway variables.",
      "Authenticate to the admin view and let first-boot migrations complete.",
    ],
    expect:
      "Admin loads without manual database setup.",
    confirm:
      "Board renders and health reports the expected migration state.",
  },
  {
    number: "3",
    title: "Configure the Discord bot integration",
    eyebrow: "Optional",
    how: [
      "Create or reuse a Discord application at https://discord.com/developers.",
      "Enable the bot with Message Content Intent and install it with bot plus applications.commands scopes.",
      "Set the Discord application, bot, guild, and channel variables on discord-adapter.",
    ],
    expect:
      "The bot is present in the target guild with access to configured channels.",
    confirm:
      "PING returns pong in the configured channel.",
  },
  {
    number: "4",
    title: "Configure your GitHub integration",
    how: [
      "Create a fine-grained GitHub PAT for the Prism runtime account.",
      "Grant target repo access plus metadata, contents, issues, and pull requests permissions.",
      "Set TARGET_REPO_GITHUB_TOKEN on codex-runtime and register the first target repo in admin settings.",
    ],
    expect:
      "Codex runtime can authenticate to GitHub and the site has an initial repo target.",
    confirm:
      "The repository appears as an available target for new change requests.",
  },
  {
    number: "5",
    title: "Configure your Codex runtime",
    how: [
      "Authenticate Railway CLI locally.",
      "SSH into codex-runtime and run Codex device auth with CODEX_HOME on persistent storage.",
    ],
    code: `railway ssh -s codex-runtime
mkdir -p /data/codex
export CODEX_HOME=/data/codex
export PATH="/app/node_modules/.bin:$PATH"
codex login --device-auth`,
    expect:
      "Device auth stores Codex credentials under /data/codex so restarts do not require re-login.",
    confirm:
      "Reconnect, export CODEX_HOME=/data/codex, and run codex status.",
  },
  {
    number: "6",
    title: "Run the first smoke pass",
    how: [
      "Create a low-risk change request against the target repo.",
      "Verify clone, branch, edit, push, and pull request creation.",
      "Run PING and /prism-health in Discord if enabled.",
      "Exercise one test recording flow if meeting capture is enabled.",
    ],
    expect:
      "Site, runtime, GitHub token, Discord adapter, and optional recording flow prove end-to-end wiring.",
    confirm:
      "Pull request exists, bot responds, /prism-health is ready, and recording outputs links when enabled.",
  },
];

const envChecks = [
  "SITE_USE_LOCAL_APP_API=true on site",
  "PRISM_AGENT_DATA_ROOT=/data on site",
  "NEXT_PUBLIC_API_BASE_URL points to the site public domain",
  "TARGET_REPO_GITHUB_TOKEN is set on codex-runtime",
  "Discord application, bot, server, and channel variables are set on discord-adapter when Discord is enabled",
  "VOICE_DAVE_ENCRYPTION=true unless you have a proven reason to change it",
];

const smokeChecks = [
  "Admin login works with the configured password",
  "The board loads instead of returning admin API errors",
  "A CR can clone, branch, push, and open a PR against the target repo",
  "The bot returns pong on ping",
  "/prism-health reports ready state and current voice permissions",
  "A recording session produces transcript and summary links in Discord",
];

export default function RunbookPage() {
  return (
    <div className="flex-1 w-full flex flex-col">
      <Header />
      <section className="w-full border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-20 lg:py-24">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4">
            Deployment Runbook
          </p>
          <h1 className="text-4xl lg:text-6xl font-bold max-w-4xl mb-6">
            Stand up Prism Refactory without guessing through first boot.
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-8">
            Operator path for a fresh Prism Stack deployment: Railway template,
            site initialization, Discord setup, GitHub access, and first smoke
            checks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="holographic-shimmer-hover">
              <Link
                href="https://railway.com/deploy/prism-agent-stack"
                target="_blank"
                rel="noopener noreferrer"
              >
                Deploy on Railway
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link
                href="https://github.com/superprismio/prism-railway-template"
                target="_blank"
                rel="noopener noreferrer"
              >
                View the Stack Repo
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="w-full border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-16 grid gap-6">
          {setupSteps.map((step) => (
            <div
              key={step.title}
              className="bg-card border border-border p-6 lg:p-8"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-border bg-background font-mono text-sm text-primary">
                    {step.number}
                  </span>
                  <h2 className="text-2xl font-semibold">{step.title}</h2>
                </div>
                {step.eyebrow ? (
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    {step.eyebrow}
                  </span>
                ) : null}
              </div>
              <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">
                    Actions
                  </h3>
                  <ul className="space-y-3 text-muted-foreground leading-7">
                    {step.how.map((item) => (
                      <li key={item} className="border-t border-border pt-3 first:border-t-0 first:pt-0">
                        {item}
                      </li>
                    ))}
                  </ul>
                  {step.code ? (
                    <pre className="mt-5 overflow-x-auto border border-border bg-background p-4 text-sm leading-6">
                      <code>{step.code}</code>
                    </pre>
                  ) : null}
                </div>
                <div className="grid gap-5 content-start">
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">
                      Expected State
                    </h3>
                    <p className="text-muted-foreground leading-7">
                      {step.expect}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">
                      Validation
                    </h3>
                    <p className="text-muted-foreground leading-7">
                      {step.confirm}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-8">
          <div className="bg-card border border-border p-6 lg:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4">
              Required Env Checks
            </p>
            <ul className="space-y-4 text-muted-foreground">
              {envChecks.map((item) => (
                <li key={item} className="border-t border-border pt-4 first:border-t-0 first:pt-0">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card border border-border p-6 lg:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-4">
              First Smoke Checks
            </p>
            <ul className="space-y-4 text-muted-foreground">
              {smokeChecks.map((item) => (
                <li key={item} className="border-t border-border pt-4 first:border-t-0 first:pt-0">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="bg-card border border-border p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">
                Next
              </p>
              <h2 className="text-2xl font-semibold mb-2">
                Once the stack is healthy, move into real workflows.
              </h2>
              <p className="text-muted-foreground max-w-3xl">
                Add production repositories, run real change requests, and move
                Discord plus meeting capture out of the test channels.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="outline">
                <Link href="/">Back to Landing Page</Link>
              </Button>
              <Button asChild className="holographic-shimmer-hover">
                <Link
                  href="https://railway.com/deploy/prism-agent-stack"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open the Template
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
