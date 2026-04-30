import Link from "next/link";
import { Button } from "@/components/ui/button";

const startOptions = [
  {
    title: "Deploy the Template",
    description: "Start with the current Railway-based stack and adapt it to your community workflows.",
  },
  {
    title: "Explore the Architecture",
    description:
      "Understand how Discord, memory, knowledge, and runtime services fit together.",
  },
  {
    title: "Shape the Next Layer",
    description:
      "Use the current stack as a base for broader transports, policies, and operator tooling.",
  },
];

export function ContactSection() {
  return (
    <section
      id="start"
      className="w-full border-t border-border scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto py-24 px-6">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4">Start with the stack</h2>
          <p className="text-muted-foreground">
            Prism Stack is meant to be deployed, inspected, adapted, and pushed
            into real community workflows.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {startOptions.map((option) => (
            <div key={option.title} className="bg-card border border-border p-6">
              <h3 className="font-semibold mb-2">{option.title}</h3>
              <p className="text-sm text-muted-foreground">
                {option.description}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Button className="holographic-shimmer-hover" asChild>
            <Link href="https://railway.com/deploy/prism-agent-stack" target="_blank" rel="noopener noreferrer">
              Deploy on Railway
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/runbook">
              Open the Runbook
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="https://github.com/raid-guild/prism-railway-template" target="_blank" rel="noopener noreferrer">
              View the Stack Repo
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="https://github.com/superprismio/prism-stack-landing" target="_blank" rel="noopener noreferrer">
              View the Landing Repo
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
