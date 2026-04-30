"use client";

import Image from "next/image";
import Link from "next/link";
import heroImg from "../../public/images/superprism-0.png";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="w-full">
      <Image
        alt="Prism Stack hero background"
        className="absolute lg:pl-52 inset-x-0 w-full object-left -z-10 object-cover overflow-visible min-h-[560px] top-0"
        priority
        src={heroImg}
      />
      <div className="relative z-0 w-full min-h-[calc(100vh-6rem)] flex items-end">
        <div className="flex flex-col gap-5 lg:gap-8 w-full max-w-full px-8 lg:px-20 pt-28 lg:pt-20 pb-14 lg:pb-20 xl:pb-24">
          <p className="text-4xl lg:text-6xl max-w-2xl text-muted-foreground">
            Prism Refactory.
            <br />
            Infrastructure for Collaborative AI Communities.
          </p>
          <p className="text-base lg:text-2xl max-w-2xl">
            <i>
              Prism Refactory helps communities turn{" "}
              <strong className="text-foreground">
                chat, meetings, docs, and repos into shared context
              </strong>
              . Start with Discord. Build toward durable community memory,
              knowledge, and operator workflows without giving up control over
              infrastructure or data.
            </i>
          </p>
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Built on the Prism Stack. Open source. Self-hostable. Discord-first.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-3">
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
                View the Repo
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/runbook">Open the Runbook</Link>
            </Button>
            <Link
              href="#workflow"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              See the workflow
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
