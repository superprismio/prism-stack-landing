import Link from "next/link";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";

const setupSteps = [
  {
    number: "1",
    title: "Deploy the template",
    how: [
      "Open https://railway.com/deploy/prism-agent-stack and sign in to the Railway workspace where you want the stack to live.",
      "Click Deploy. Railway will create the site, Prism Memory, Codex runtime, Discord adapter, and scheduled jobs for you.",
      "Configure variables now if you already have them. The Discord adapter needs bot and channel details, and Codex runtime needs a GitHub token.",
      "You can leave optional values blank during first deploy and return to each service's Variables tab later.",
      "Click the final Deploy button on Railway to create the project.",
    ],
    expect:
      "Railway should create a new project with all Prism Stack services visible in the project canvas.",
    confirm:
      "Open the Railway project and confirm the site, prism-memory, codex-runtime, discord-adapter, and scheduled services exist.",
  },
  {
    number: "2",
    title: "Confirm site initialization",
    how: [
      "Open the site service in Railway.",
      "Find the public URL in the Settings tab.",
      "Find the temporary admin password in the Variables tab under ADMIN_PASSWORD.",
      "Visit the site URL, open the admin view, and log in with that password.",
    ],
    expect:
      "The admin view should load without manual database work or local setup.",
    confirm:
      "The board should render, and the health endpoint should report the expected first-boot migrations.",
  },
  {
    number: "3",
    title: "Configure the Discord bot integration",
    eyebrow: "Optional",
    how: [
      "Create or open a Discord application at https://discord.com/developers.",
      "Copy the Application ID from the General Information page.",
      "Open the Bot page, create a bot if needed, copy the token, and enable the Message Content Intent toggle.",
      "Open the Installation page and update Default Install Settings so the app can be installed with the bot and applications.commands scopes.",
      "Use the generated invite link to add the bot to your server. You will need permission to add apps to that server.",
      "In Railway, open the discord-adapter service and add the Discord application, bot, server, and channel values in the Variables tab.",
    ],
    expect:
      "The bot should appear in your Discord server and have access to the channels you configured.",
    confirm:
      "Send PING in the configured channel. The bot should respond with pong.",
  },
  {
    number: "4",
    title: "Configure your GitHub integration",
    how: [
      "Create a GitHub personal access token for the account Prism should use when cloning, branching, pushing, and opening pull requests. GitHub's guide lives at https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens.",
      "Use a fine-grained token when possible. Give it access to the target repository and the metadata, contents, issues, and pull requests permissions Prism needs.",
      "In Railway, open the codex-runtime service and add the token in the Variables tab as TARGET_REPO_GITHUB_TOKEN.",
      "Open the Refactory site admin settings and add your first target repository.",
    ],
    expect:
      "Codex runtime should be able to authenticate to GitHub and the site should know which repository to operate on first.",
    confirm:
      "Save the repository in the site settings and verify it appears as an available target for new change requests.",
  },
  {
    number: "5",
    title: "Configure your Codex runtime",
    how: [
      "Make sure you have a Codex account ready before logging into the runtime.",
      "Install and authenticate the Railway CLI locally if you have not already.",
      "SSH into the codex-runtime service and run the Codex device login from persistent storage.",
    ],
    code: `railway ssh -s codex-runtime
mkdir -p /data/codex
export CODEX_HOME=/data/codex
export PATH="/app/node_modules/.bin:$PATH"
codex login --device-auth`,
    expect:
      "The device login should complete in your browser, and Codex credentials should be stored under /data/codex so they survive service restarts.",
    confirm:
      "Reconnect with railway ssh -s codex-runtime, export CODEX_HOME=/data/codex, and run codex status to confirm the runtime is authenticated.",
  },
  {
    number: "6",
    title: "Run the first smoke pass",
    how: [
      "Log into the admin view and confirm the board loads.",
      "Create a small change request against the target repository. Use a harmless docs or text change for the first pass.",
      "Watch the job move through clone, branch, edit, push, and pull request creation.",
      "In Discord, send PING and run /prism-health if slash commands are enabled.",
      "If you plan to use meeting capture, complete one short recording flow in a test voice channel.",
    ],
    expect:
      "The stack should prove that the site, runtime, GitHub token, Discord adapter, and optional recording flow are wired together.",
    confirm:
      "You should have a created pull request, a responsive Discord bot, a healthy /prism-health result, and transcript or summary links if recording is enabled.",
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
            This is the operator path for a fresh Prism Stack deployment:
            Railway template, site initialization, Discord setup, GitHub access,
            and the first end-to-end smoke checks.
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
                href="https://github.com/raid-guild/prism-railway-template"
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
                    How
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
                      What to expect
                    </h3>
                    <p className="text-muted-foreground leading-7">
                      {step.expect}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-3">
                      How to confirm
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
                Link your target repository, run the first change request, and
                start using Discord and meeting capture against live community
                activity rather than a blank template.
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
